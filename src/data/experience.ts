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
   2003–2016 is compressed into one line (`earlier`) on the site; the PDF lists it in full
   (`earlierJobs`). Source: CV and the owner's answers. */
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
        ru: 'Разрабатывал интерфейсы продуктов компании — kompra.kz, zakupki.kz и decider.kz, включая мобильные версии',
        en: 'Built interfaces for the company’s products — kompra.kz, zakupki.kz and decider.kz, including mobile versions',
      },
      {
        ru: 'Разработал и поддерживал дизайн-систему: компоненты, документация, правила использования',
        en: 'Built and maintained the design system: components, documentation, usage guidelines',
      },
      { ru: 'Рассылки, корпоративный блог, лендинги', en: 'Email newsletters, corporate blog, landing pages' },
    ],
  },
];

export const sideProjects: L = {
  ru: '2017–2026, параллельно с основной работой — фронтенд в сторонних проектах: zakup.sk.kz, e-shanyraq, equral, go-cargo, go-tender.',
  en: '2017–2026, alongside the main job — frontend for third-party projects: zakup.sk.kz, e-shanyraq, equral, go-cargo, go-tender.',
};

/* Full 2003–2016 history for the PDF résumé (the "full version" the site links to).
   The site keeps it compressed into `earlier`. Source: hh.ru CV, 28 Jul 2026. */
export const earlierJobs: Job[] = [
  {
    start: '2010-03',
    end: '2016-07',
    role: { ru: 'Директор', en: 'Director' },
    org: { ru: 'Дизайн-студия «City-Advertising»', en: 'City-Advertising design studio' },
    place: { ru: 'Кызылорда', en: 'Kyzylorda' },
    points: [
      { ru: 'Привлечение клиентов и работа с ними, планирование и ведение проектов', en: 'Client acquisition and account management, project planning and delivery' },
      { ru: 'Разработка и поддержка сайтов', en: 'Website development and support' },
      {
        ru: 'Разработаны и поддерживались: портал Департамента внутренних дел, сайты Департамента дорожной полиции, Прокуратуры и Комитета уголовно-исполнительной системы Кызылординской области',
        en: 'Built and maintained: the portal of the regional Department of Internal Affairs, websites of the Road Police Department, the Prosecutor’s Office and the Penal System Committee of Kyzylorda region',
      },
      { ru: 'Сайт и платформа для проведения закупок для ТОО СП «КазГерМунай»', en: 'Website and procurement platform for KazGerMunai JV' },
    ],
  },
  {
    start: '2006-09',
    end: '2015-01',
    role: { ru: 'Веб-мастер, контент-менеджер', en: 'Webmaster, content manager' },
    org: { ru: 'ГУ «Департамент внутренних дел Кызылординской области»', en: 'Department of Internal Affairs of Kyzylorda region' },
    place: { ru: 'Кызылорда', en: 'Kyzylorda' },
    points: [
      { ru: 'Разработка и поддержка информационного портала', en: 'Development and support of the information portal' },
      { ru: 'Модуль для проведения государственных закупок', en: 'Public procurement module' },
      { ru: 'Модуль проверки нарушений по ГРНЗ (госномеру автомобиля)', en: 'Traffic violation lookup by licence plate number' },
    ],
  },
  {
    start: '2008-10',
    end: '2009-05',
    role: { ru: 'Администратор баз данных', en: 'Database administrator' },
    org: { ru: 'АО «Казахтелеком»', en: 'Kazakhtelecom JSC' },
    place: { ru: 'Кызылорда', en: 'Kyzylorda' },
    points: [
      { ru: 'Специалист 2-й категории группы поддержки программных комплексов, хелпдеск', en: 'Software support specialist (2nd grade), helpdesk' },
      { ru: 'Администрирование сервера на CentOS и БД Oracle', en: 'Administration of a CentOS server and Oracle database' },
      { ru: 'Поддержка регионального сайта компании', en: 'Support of the company’s regional website' },
    ],
  },
  {
    start: '2008-01',
    end: '2008-10',
    role: { ru: 'Веб-мастер', en: 'Webmaster' },
    org: { ru: 'ТОО «Ti-tech сервис»', en: 'Ti-tech Service LLP' },
    place: { ru: 'Кызылорда', en: 'Kyzylorda' },
    points: [{ ru: 'Разработка и поддержка сайтов', en: 'Website development and support' }],
  },
  {
    start: '2007-07',
    end: '2007-12',
    role: { ru: 'Веб-мастер', en: 'Webmaster' },
    org: { ru: 'ТОО «Shaka LTD»', en: 'Shaka LTD LLP' },
    points: [{ ru: 'Разработка и поддержка интернет-магазина компании', en: 'Development and support of the company’s online store' }],
  },
  {
    start: '2007-01',
    end: '2007-07',
    role: { ru: 'Веб-мастер, дизайнер', en: 'Webmaster, designer' },
    org: { ru: 'Рекламное агентство «Альянс-Т»', en: 'Alliance-T advertising agency' },
    points: [{ ru: 'Дизайн и вёрстка сайтов, работа с клиентами', en: 'Website design and markup, client work' }],
  },
  {
    start: '2003-01',
    end: '2007-01',
    role: { ru: 'Системный администратор', en: 'System administrator' },
    org: { ru: 'Рекламное агентство «Альянс-Т»', en: 'Alliance-T advertising agency' },
    points: [{ ru: 'Локальная сеть, техническая поддержка сотрудников', en: 'Local network, IT support for staff' }],
  },
];

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
