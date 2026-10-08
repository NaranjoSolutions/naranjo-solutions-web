export type Locale = 'en' | 'es';

export function createLanguageTools() {
  function resolveLocale(saved: string | null, languages: readonly string[]): Locale {
    if (saved === 'en' || saved === 'es') return saved;
    for (const language of languages) {
      const locale = language.toLowerCase().split('-')[0];
      if (locale === 'en' || locale === 'es') return locale;
    }
    return 'en';
  }

  function localePath(pathname: string, locale: Locale): string {
    const unprefixed = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
    return locale === 'es' ? `/es${unprefixed}` : unprefixed;
  }

  function languageRedirect(options: {
    pathname: string;
    locale: Locale;
    explicitLocale: string | null;
    isError: boolean;
  }): string | null {
    if (options.isError || /^\/es(?:\/|$)/.test(options.pathname)
      || options.explicitLocale === 'en' || options.explicitLocale === 'es') return null;
    const destination = localePath(options.pathname, options.locale);
    return destination === options.pathname ? null : destination;
  }

  return { resolveLocale, localePath, languageRedirect };
}

export const { resolveLocale, localePath, languageRedirect } = createLanguageTools();
