import type { createLanguageTools, Locale } from './locale';

type ErrorMessages = Record<Locale, { layout: Record<string, string>; error: Record<string, string> }>;

export function initializeLanguage(
  tools: ReturnType<typeof createLanguageTools>,
  messages: ErrorMessages | null,
) {
  const storageKey = 'naranjo-language';
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    // Browser privacy settings can disable storage without disabling navigation.
  }
  const address = new URL(location.href);
  const explicitLocale = address.searchParams.get('_lang');
  const preferred = tools.resolveLocale(saved, navigator.languages);
  const isError = messages !== null;
  const redirect = tools.languageRedirect({ pathname: address.pathname, locale: preferred, explicitLocale, isError });
  if (redirect) {
    document.documentElement.dataset.languagePending = '';
    address.pathname = redirect;
    location.replace(address.href);
    return;
  }

  let locale = document.documentElement.lang as Locale;
  if (isError) {
    locale = explicitLocale === 'en' || explicitLocale === 'es' ? explicitLocale
      : /^\/es(?:\/|$)/.test(address.pathname) ? 'es' : preferred;
    document.documentElement.lang = locale;
    document.documentElement.dataset.languagePending = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll<HTMLAnchorElement>('[data-language-choice]');
    const scrollStorageKey = 'naranjo-language-scroll';
    const readingSections = () => Array.from(document.querySelectorAll<HTMLElement>('main > section, main > article, main .prose h2'));
    const captureScroll = () => {
      const sections = readingSections();
      const section = sections.findLastIndex((element) => element.getBoundingClientRect().top <= 1);
      if (section === -1) return { section, progress: window.scrollY };
      const start = sections[section].getBoundingClientRect().top + window.scrollY;
      const nextSection = sections[section + 1];
      const end = nextSection ? nextSection.getBoundingClientRect().top + window.scrollY : document.documentElement.scrollHeight;
      return { section, progress: Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start))) };
    };
    try {
      const pending = sessionStorage.getItem(scrollStorageKey);
      sessionStorage.removeItem(scrollStorageKey);
      const position = pending ? JSON.parse(pending) : null;
      if (position?.pathname === location.pathname && Number.isInteger(position.section) && position.section >= -1
        && Number.isFinite(position.progress) && position.progress >= 0 && (position.section === -1 || position.progress <= 1)) {
        // Wait for images with reserved dimensions to settle before restoring progress.
        window.addEventListener('load', () => window.requestAnimationFrame(() => {
          const sections = readingSections();
          if (position.section >= sections.length) return;
          let top = position.progress;
          if (position.section >= 0) {
            const start = sections[position.section].getBoundingClientRect().top + window.scrollY;
            const nextSection = sections[position.section + 1];
            const end = nextSection ? nextSection.getBoundingClientRect().top + window.scrollY : document.documentElement.scrollHeight;
            top = start + position.progress * Math.max(1, end - start);
          }
          window.scrollTo({ top, behavior: 'instant' });
          const section = sections[position.section];
          if (section?.tagName === 'SECTION' && section.id) {
            const destination = new URL(location.href);
            destination.hash = section.id;
            history.replaceState(null, '', destination.href);
            updateChoiceLinks();
          }
        }), { once: true });
      }
    } catch {
      // Section anchors still work when session storage is blocked or invalid.
    }
    const updateControls = () => {
      choices.forEach((choice) => {
        if (choice.dataset.languageChoice === locale) choice.setAttribute('aria-current', 'page');
        else choice.removeAttribute('aria-current');
      });
    };
    const updateChoiceLinks = () => {
      choices.forEach((choice) => {
        const destination = new URL(location.href);
        if (!isError) destination.pathname = tools.localePath(destination.pathname, choice.dataset.languageChoice as Locale);
        destination.searchParams.set('_lang', choice.dataset.languageChoice!);
        choice.href = destination.href;
      });
    };
    const applyErrorLanguage = () => {
      if (!messages) return;
      document.documentElement.lang = locale;
      const dictionary = messages[locale];
      const attributes = { text: null, aria: 'aria-label', content: 'content', light: 'data-light-label', dark: 'data-dark-label' };
      for (const [kind, attribute] of Object.entries(attributes)) {
        document.querySelectorAll<HTMLElement>(`[data-language-${kind}]`).forEach((element) => {
          const [section, key] = element.getAttribute(`data-language-${kind}`)!.split('.');
          const translation = dictionary[section as 'layout' | 'error'][key];
          if (attribute) element.setAttribute(attribute, translation);
          else element.textContent = translation;
        });
      }
      document.querySelectorAll<HTMLAnchorElement>('[data-language-link]').forEach((link) => {
        const destination = new URL(link.dataset.languageLink!, location.origin);
        destination.pathname = tools.localePath(destination.pathname, locale);
        link.href = destination.pathname + destination.search + destination.hash;
      });
      document.dispatchEvent(new Event('naranjo:language'));
    };
    const preserveExplicitChoice = () => {
      if (explicitLocale !== 'en' && explicitLocale !== 'es') return;
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
        if (link.dataset.languageChoice || link.getAttribute('href')?.startsWith('#')) return;
        const destination = new URL(link.href, location.href);
        if (destination.origin !== location.origin) return;
        destination.searchParams.set('_lang', explicitLocale);
        link.href = destination.href;
      });
    };
    applyErrorLanguage();
    preserveExplicitChoice();
    delete document.documentElement.dataset.languagePending;
    updateControls();
    updateChoiceLinks();
    window.addEventListener('hashchange', updateChoiceLinks);
    const selectLanguage = (choice: Locale) => {
      let storageAvailable = true;
      saved = choice;
      try {
        localStorage.setItem(storageKey, saved);
      } catch {
        storageAvailable = false;
      }
      locale = tools.resolveLocale(saved, navigator.languages);
      if (isError) {
        const destination = new URL(location.href);
        destination.searchParams.set('_lang', choice);
        history.replaceState(null, '', destination.href);
        applyErrorLanguage();
        updateControls();
        updateChoiceLinks();
        if (!storageAvailable) {
          document.querySelectorAll<HTMLAnchorElement>('[data-language-link]').forEach((link) => {
            const destination = new URL(link.href, location.href);
            destination.searchParams.set('_lang', choice);
            link.href = destination.href;
          });
        }
        return;
      }
      const destination = new URL(location.href);
      destination.pathname = tools.localePath(destination.pathname, locale);
      destination.searchParams.delete('_lang');
      if (!storageAvailable) destination.searchParams.set('_lang', choice);
      if (destination.href !== location.href) {
        const position = captureScroll();
        const section = readingSections()[position.section];
        destination.hash = section?.tagName === 'SECTION' ? section.id : '';
        try {
          sessionStorage.setItem(scrollStorageKey, JSON.stringify({ ...position, pathname: destination.pathname }));
          // Native fragment scrolling can run after restoration in Safari.
          destination.hash = '';
        } catch {
          // Navigate to the current section even when the precise position cannot be saved.
        }
        location.assign(destination.href);
      }
      else {
        updateControls();
      }
    };
    choices.forEach((choice) => choice.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectLanguage(choice.dataset.languageChoice as Locale);
    }));
  }, { once: true });
}
