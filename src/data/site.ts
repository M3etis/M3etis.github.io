import type { Lang } from '../i18n/utils';

export const site = {
  url: 'https://m3etis.is-a.dev',
  email: 'm3etis@gmail.com',
  github: 'https://github.com/M3etis',
  githubHandle: 'M3etis',
  repo: 'https://github.com/M3etis/M3etis.github.io',
  telegram: 'https://t.me/m3etis',
  telegramHandle: 'm3etis',
  cv: {
    ru: '/cv/vladislav-li-cv-ru.pdf',
    en: '/cv/vladislav-li-cv-en.pdf',
  } satisfies Record<Lang, string>,
};
