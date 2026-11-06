import type { L } from '../i18n/utils';

export type Job = {
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, undefined = present
  role: L;
  org: L;
  place?: L;
  url?: string;
  points: L[];
};

/* Only the roles that support the AI Product Engineer positioning get a full entry;
   2003–2016 is compressed into one line (`earlier`). Source: CV and the owner's answers. */
export const jobs: Job[] = [
  {
    start: '2026-08',
    role: { ru: 'Senior Frontend Developer', en: 'Senior Frontend Developer' },
    org: { ru: 'Alem.AI Foundation', en: 'Alem.AI Foundation' },
    place: { ru: 'Офис продуктовой разработки', en: 'Product Development Office' },
    points: [{ ru: 'Фронтенд-разработка', en: 'Frontend development' }],
  },
  {
    start: '2017-03',
    end: '2026-06',
    role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' },
    org: { ru: 'ТОО «Kompra»', en: 'Kompra LLP' },
    place: { ru: 'Астана', en: 'Astana' },
    url: 'https://kompra.kz',
    points: [
      {
        ru: 'Разработал и поддерживал дизайн-систему: компоненты, документация, правила использования',
        en: 'Built and maintained the design system: components, documentation, usage guidelines',
      },
      { ru: 'Фронтенд и мобильные версии kompra.kz и zakupki.kz', en: 'Frontend and mobile versions of kompra.kz and zakupki.kz' },
      { ru: 'HTML-письма табличной вёрсткой, корпоративный блог, лендинги', en: 'Table-based HTML emails, corporate blog, landing pages' },
    ],
  },
];

export const sideProjects: L = {
  ru: '2017–2026, параллельно с основной работой — фронтенд в сторонних проектах: zakup.sk.kz, e-shanyraq, equral, go-cargo, go-tender.',
  en: '2017–2026, alongside the main job — frontend for third-party projects: zakup.sk.kz, e-shanyraq, equral, go-cargo, go-tender.',
};

export const earlier: L = {
  ru: '2003–2016 — директор дизайн-студии «City-Advertising» (порталы госорганов Кызылординской области, платформа закупок для СП «КазГерМунай»), веб-мастер ДВД Кызылординской области, администратор баз Oracle в «Казахтелекоме», системный администратор.',
  en: '2003–2016 — director of the City-Advertising design studio (portals for Kyzylorda region agencies, a procurement platform for KazGerMunai JV), webmaster at the regional police department, Oracle DBA at Kazakhtelecom, system administrator.',
};

export const education: L = {
  ru: 'КГУ им. Коркыт-Ата, инженер-системотехник, 2006',
  en: 'Korkyt Ata Kyzylorda University, systems engineer, 2006',
};

const monthsRu = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatMonth = (ym: string, lang: 'ru' | 'en'): string => {
  const [y, m] = ym.split('-').map(Number);
  return `${(lang === 'ru' ? monthsRu : monthsEn)[m - 1]} ${y}`;
};
