import type { Locale } from '../i18n/locale';
import { translations } from '../i18n/translations';

export const siteConfig = {
  brand: 'Naranjo Solutions',
  owner: { name: 'Alonso Villanueva' },
  contact: {
    url: 'https://alonsovndev.com/',
    display: 'alonsovndev.com',
    email: 'alonsonh94@gmail.com',
    phone: { number: '+50689599092', display: '+506 8959 9092' },
  },
};

export function getSiteConfig(locale: Locale) {
  const copy = translations[locale].site;
  return {
    ...siteConfig,
    description: copy.description,
    owner: { ...siteConfig.owner, role: copy.role, biography: copy.biography },
    contact: { ...siteConfig.contact, label: copy.contactLabel },
    services: copy.services,
  };
}
