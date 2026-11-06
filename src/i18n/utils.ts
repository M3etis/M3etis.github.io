export const locales = ['ru', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'ru';

/** A string in every supported language. */
export type L = Record<Lang, string>;

/** Marker for facts that still need the owner's confirmation. Rendered with a dashed outline. */
export const TODO_PREFIX = 'TODO: подтвердить';

export const pick = (value: L, lang: Lang): string => value[lang];

export const isTodo = (s: string): boolean => s.startsWith(TODO_PREFIX);

export const langFromUrl = (url: URL): Lang => {
  const [, first] = url.pathname.split('/');
  return (locales as readonly string[]).includes(first) ? (first as Lang) : defaultLang;
};

export const pathFor = (lang: Lang, path = '/'): string =>
  lang === defaultLang ? path : `/${lang}${path === '/' ? '/' : path}`;
