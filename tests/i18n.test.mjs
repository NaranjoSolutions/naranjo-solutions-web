import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { createLanguageTools, resolveLocale, localePath, languageRedirect } from '../src/i18n/locale.ts';
import { initializeLanguage } from '../src/i18n/browser.ts';
import { translations } from '../src/i18n/translations.ts';

function browser(options = {}) {
  const session = new Map(options.pendingScroll ? [['naranjo-language-scroll', options.pendingScroll]] : []);
  const scrolls = [];
  const storage = new Map(options.saved ? [['naranjo-language', options.saved]] : []);
  const events = new Map();
  const changes = [];
  const attributes = new Map();
  const text = { textContent: '', getAttribute: () => 'error.description' };
  const metadata = { setAttribute: (name, value) => attributes.set(name, value), getAttribute: () => 'error.title' };
  const link = { href: '/', dataset: { languageLink: '/' }, getAttribute() { return this.href; } };
  const skipLink = { href: '#main-content', dataset: {}, getAttribute() { return this.href; } };
  const choices = ['es', 'en'].map((locale) => ({
    dataset: { languageChoice: locale }, attributes: new Map(),
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
    addEventListener: (eventName, callback) => events.set(`${locale}:${eventName}`, callback),
  }));
  const address = new URL(options.url ?? 'https://example.test/');
  const viewport = {
    scrollY: options.scrollY ?? 0,
    addEventListener: (name, callback) => events.set(name, callback),
    requestAnimationFrame: (callback) => callback(),
    scrollTo: ({ top }) => { viewport.scrollY = top; scrolls.push(top); },
  };
  const sections = (options.sections ?? (address.hash ? [{ id: address.hash.slice(1), top: 0 }] : [])).map((section) => ({
    id: section.id, tagName: section.tagName ?? 'SECTION',
    getBoundingClientRect: () => ({ top: section.top - viewport.scrollY }),
  }));
  const document = {
    documentElement: { lang: address.pathname.startsWith('/es/') ? 'es' : 'en', dataset: {}, scrollHeight: options.scrollHeight ?? 10000 },
    addEventListener: (name, callback) => events.set(name, callback),
    dispatchEvent: () => {},
    querySelectorAll: (query) => query === 'main > section, main > article, main .prose h2' ? sections : query === '[data-language-choice]' ? choices : query === '[data-language-text]' ? [text]
      : query === '[data-language-content]' ? [metadata]
      : query === '[data-language-link]' ? [link] : query === 'a[href]' ? [link, skipLink] : [],
  };
  const context = {
    document, URL, Event,
    navigator: { languages: options.languages ?? ['en-US'] },
    location: { href: address.href, origin: address.origin, pathname: address.pathname, replace: (url) => changes.push(['replace', url]), assign: (url) => changes.push(['assign', url]) },
    window: viewport,
    sessionStorage: {
      getItem: (key) => { if (options.blockedSession) throw new Error('Blocked'); return session.get(key) ?? null; },
      setItem: (key, value) => { if (options.blockedSession) throw new Error('Blocked'); session.set(key, value); },
      removeItem: (key) => { if (options.blockedSession) throw new Error('Blocked'); session.delete(key); },
    },
    localStorage: {
      getItem: (key) => { if (options.blocked) throw new Error('Blocked'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if (options.blocked) throw new Error('Blocked'); storage.set(key, value); },
      removeItem: (key) => { if (options.blocked) throw new Error('Blocked'); storage.delete(key); },
    },
  };
  context.history = { replaceState: (_historyState, _historyTitle, url) => { context.location.href = url; } };
  const messages = options.error ? {
    en: { layout: translations.en.layout, error: translations.en.error },
    es: { layout: translations.es.layout, error: translations.es.error },
  } : null;
  runInNewContext(`(${initializeLanguage.toString()})((${createLanguageTools.toString()})(), ${JSON.stringify(messages)});`, context);
  if (events.has('DOMContentLoaded')) events.get('DOMContentLoaded')();
  if (events.has('load')) events.get('load')();
  const select = (value) => events.get(`${value}:click`)({ preventDefault() {} });
  return { storage, session, scrolls, document, choices, changes, select, text, attributes, link, skipLink, location: context.location, events };
}

test('browser preferences use the first supported language and regional variants', () => {
  assert.equal(resolveLocale(null, ['es-CR', 'en']), 'es');
  assert.equal(resolveLocale(null, ['ES-mx']), 'es');
  assert.equal(resolveLocale(null, ['fr', 'es-ES', 'en']), 'es');
  assert.equal(resolveLocale(null, ['en-GB', 'es']), 'en');
  assert.equal(resolveLocale(null, ['fr', 'de']), 'en');
  assert.equal(resolveLocale(null, []), 'en');
});

test('saved choices override the browser; invalid choices are ignored', () => {
  assert.equal(resolveLocale('en', ['es']), 'en');
  assert.equal(resolveLocale('es', ['en']), 'es');
  assert.equal(resolveLocale('invalid', ['es']), 'es');
  assert.equal(resolveLocale('system', ['en']), 'en');
});

test('localized paths retain project identity without repeated prefixes', () => {
  assert.equal(localePath('/', 'es'), '/es/');
  assert.equal(localePath('/es/', 'en'), '/');
  assert.equal(localePath('/work/orthopedic-spine/', 'es'), '/es/work/orthopedic-spine/');
  assert.equal(localePath('/es/work/orthopedic-spine/', 'es'), '/es/work/orthopedic-spine/');
  assert.equal(localePath('/estimate/', 'en'), '/estimate/');
});

test('explicit Spanish routes, explicit choices and errors never auto-redirect', () => {
  for (const pathname of ['/es/', '/es/work/orthopedic-spine/', '/es']) {
    assert.equal(languageRedirect({ pathname, locale: 'en', explicitLocale: null, isError: false }), null);
  }
  for (const explicitLocale of ['en', 'es']) {
    assert.equal(languageRedirect({ pathname: '/', locale: 'es', explicitLocale, isError: false }), null);
  }
  assert.equal(languageRedirect({ pathname: '/missing/', locale: 'es', explicitLocale: null, isError: true }), null);
  assert.equal(languageRedirect({ pathname: '/', locale: 'en', explicitLocale: null, isError: false }), null);
});

test('early redirects preserve query parameters and anchors and cannot loop', () => {
  const initial = browser({ languages: ['es-CR'], url: 'https://example.test/work/orthopedic-spine/?campaign=launch#contact' });
  assert.deepEqual(initial.changes, [['replace', 'https://example.test/es/work/orthopedic-spine/?campaign=launch#contact']]);
  const destination = browser({ languages: ['es-CR'], url: initial.changes[0][1] });
  assert.deepEqual(destination.changes, []);
  assert.equal(destination.choices[0].attributes.get('aria-current'), 'page');
});

test('manual selection persists and opens the equivalent page', () => {
  const page = browser({ url: 'https://example.test/work/orthopedic-spine/?campaign=launch#contact' });
  page.select('es');
  assert.equal(page.storage.get('naranjo-language'), 'es');
  assert.deepEqual(page.changes, [['assign', 'https://example.test/es/work/orthopedic-spine/?campaign=launch']]);
  const destination = browser({ url: page.changes[0][1], sections: [{ id: 'contact', top: 100 }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.equal(destination.location.href, 'https://example.test/es/work/orthopedic-spine/?campaign=launch#contact');
});

test('explicit Spanish visits do not change a saved English choice', () => {
  const page = browser({ saved: 'en', url: 'https://example.test/es/' });
  assert.equal(page.storage.get('naranjo-language'), 'en');
  assert.equal(page.choices[0].attributes.get('aria-current'), 'page');
  assert.deepEqual(page.changes, []);
});

test('blocked storage preserves an English selection across reloads and links', () => {
  const page = browser({ blocked: true, languages: ['es'], url: 'https://example.test/es/?campaign=launch#work' });
  page.select('en');
  assert.deepEqual(page.changes, [['assign', 'https://example.test/?campaign=launch&_lang=en']]);
  const english = browser({ blocked: true, languages: ['es'], url: page.changes[0][1], sections: [{ id: 'work', top: 100 }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.equal(new URL(english.location.href).hash, '#work');
  assert.deepEqual(english.changes, []);
  assert.equal(english.choices[1].attributes.get('aria-current'), 'page');
  assert.equal(new URL(english.link.href).searchParams.get('_lang'), 'en');
});

test('404 pages localize in place and update recovery links and metadata', () => {
  const page = browser({ error: true, languages: ['es'], url: 'https://example.test/missing/?campaign=launch' });
  assert.deepEqual(page.changes, []);
  assert.equal(page.document.documentElement.lang, 'es');
  assert.equal(page.text.textContent, translations.es.error.description);
  assert.equal(page.attributes.get('content'), translations.es.error.title);
  assert.equal(page.link.href, '/es/');
  assert.equal('languagePending' in page.document.documentElement.dataset, false);
  page.select('en');
  assert.deepEqual(page.changes, []);
  assert.equal(page.document.documentElement.lang, 'en');
  assert.equal(page.link.href, '/');
});

test('Spanish 404 paths take precedence over a saved English choice', () => {
  const page = browser({ error: true, saved: 'en', url: 'https://example.test/es/missing/' });
  assert.equal(page.document.documentElement.lang, 'es');
  assert.equal(page.storage.get('naranjo-language'), 'en');
  assert.deepEqual(page.changes, []);
});


test('native language links preserve query parameters and follow hash changes', () => {
  const page = browser({ url: 'https://example.test/work/orthopedic-spine/?campaign=launch#work' });
  assert.equal(page.choices[0].href, 'https://example.test/es/work/orthopedic-spine/?campaign=launch&_lang=es#work');
  assert.equal(page.choices[1].href, 'https://example.test/work/orthopedic-spine/?campaign=launch&_lang=en#work');
  page.location.href = 'https://example.test/work/orthopedic-spine/?campaign=launch#contact';
  page.events.get('hashchange')();
  assert.equal(new URL(page.choices[0].href).hash, '#contact');
});

test('404 language choices survive reloads with conflicting markers and blocked storage', () => {
  for (const blocked of [false, true]) {
    for (const pathname of ['/missing/', '/es/missing/']) {
      const page = browser({ error: true, blocked, url: `https://example.test${pathname}?campaign=launch&_lang=en#main-content` });
      page.select('es');
      assert.equal(page.location.href, `https://example.test${pathname}?campaign=launch&_lang=es#main-content`);
      const reloaded = browser({ error: true, blocked, saved: page.storage.get('naranjo-language'), url: page.location.href });
      assert.equal(reloaded.document.documentElement.lang, 'es');
      reloaded.select('en');
      const english = browser({ error: true, blocked, saved: reloaded.storage.get('naranjo-language'), url: reloaded.location.href });
      assert.equal(english.document.documentElement.lang, 'en');
      assert.deepEqual(english.changes, []);
    }
  }
});


test('404 skip links keep the current language after switching', () => {
  const page = browser({ error: true, url: 'https://example.test/missing/?campaign=launch&_lang=en' });
  page.select('es');
  assert.equal(page.skipLink.href, '#main-content');
  const destination = new URL(page.skipLink.href, page.location.href);
  assert.equal(destination.searchParams.get('_lang'), 'es');
  assert.equal(destination.hash, '#main-content');
});


test('language switching uses the actual section instead of a stale contact anchor', () => {
  const page = browser({ url: 'https://example.test/?campaign=launch#contact', scrollY: 1400,
    sections: [{ id: '', top: 100 }, { id: 'services', top: 1000 }, { id: 'contact', top: 3000 }] });
  page.select('es');
  assert.deepEqual(page.changes, [['assign', 'https://example.test/es/?campaign=launch']]);
  assert.deepEqual(JSON.parse(page.session.get('naranjo-language-scroll')), { pathname: '/es/', section: 1, progress: 0.2 });
  const destination = browser({ url: page.changes[0][1],
    sections: [{ id: '', top: 100 }, { id: 'services', top: 1200 }, { id: 'contact', top: 3400 }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.equal(new URL(destination.location.href).hash, '#services');
  assert.equal(new URL(destination.choices[1].href).hash, '#services');
  assert.deepEqual(destination.scrolls, [1640]);
});

test('switching at the top clears a stale anchor and restores the top', () => {
  const page = browser({ url: 'https://example.test/#contact', sections: [{ id: '', top: 100 }] });
  page.select('es');
  assert.deepEqual(page.changes, [['assign', 'https://example.test/es/']]);
  const destination = browser({ url: page.changes[0][1], sections: [{ id: '', top: 130 }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.deepEqual(destination.scrolls, [0]);
  assert.equal(destination.session.has('naranjo-language-scroll'), false);
});

test('restoration preserves progress within a section when translated heights change', () => {
  const page = browser({ url: 'https://example.test/es/', scrollY: 1900,
    sections: [{ id: '', top: 100 }, { id: 'work', top: 1000 }, { id: 'services', top: 4000 }] });
  page.select('en');
  const destination = browser({ url: page.changes[0][1], scrollY: 1100,
    sections: [{ id: '', top: 120 }, { id: 'work', top: 1100 }, { id: 'services', top: 3100 }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.deepEqual(destination.scrolls, [1700]);
});

test('case-study reading position follows heading order across languages', () => {
  const page = browser({ url: 'https://example.test/work/orthopedic-spine/', scrollY: 1700,
    sections: [{ id: '', top: 100, tagName: 'ARTICLE' }, { id: 'the-project', top: 1500, tagName: 'H2' }, { id: 'what-i-built', top: 2000, tagName: 'H2' }] });
  page.select('es');
  const destination = browser({ url: page.changes[0][1],
    sections: [{ id: '', top: 100, tagName: 'ARTICLE' }, { id: 'el-proyecto', top: 1800, tagName: 'H2' }, { id: 'lo-que-construi', top: 2400, tagName: 'H2' }],
    pendingScroll: page.session.get('naranjo-language-scroll') });
  assert.deepEqual(destination.scrolls, [2040]);
});

test('blocked session storage falls back to the current section anchor', () => {
  const page = browser({ blockedSession: true, url: 'https://example.test/#contact', scrollY: 1500,
    sections: [{ id: '', top: 100 }, { id: 'services', top: 1000 }, { id: 'contact', top: 3000 }] });
  page.select('es');
  assert.deepEqual(page.changes, [['assign', 'https://example.test/es/#services']]);
});

test('unrelated, malformed and invalid scroll records do not move the page', () => {
  for (const pendingScroll of ['invalid json', JSON.stringify({ pathname: '/es/other/', section: 0, progress: 0.5 }),
    JSON.stringify({ pathname: '/es/', section: -2, progress: 0 }),
    JSON.stringify({ pathname: '/es/', section: 0, progress: 2 }),
    JSON.stringify({ pathname: '/es/', section: 99, progress: 0.5 })]) {
    const page = browser({ url: 'https://example.test/es/', pendingScroll, sections: [{ id: '', top: 100 }] });
    assert.deepEqual(page.scrolls, []);
    assert.equal(page.session.has('naranjo-language-scroll'), false);
  }
});
