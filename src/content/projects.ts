import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/locale';

export async function getLocalizedProjects(locale: Locale) {
  const projects = await getCollection('work');
  for (const project of projects) {
    for (const language of ['en', 'es']) {
      const translations = projects.filter((candidate) => candidate.data.projectId === project.data.projectId && candidate.data.locale === language);
      if (translations.length !== 1) {
        throw new Error(`Project ${project.data.projectId} must have exactly one ${language} translation.`);
      }
    }
  }
  return projects.filter((project) => project.data.locale === locale);
}
