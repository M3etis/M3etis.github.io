import type { ImageMetadata } from 'astro';
import type { L } from '../i18n/utils';
import clamkeep from '../assets/projects/clamkeep.png';
import wezterm from '../assets/projects/wezterm.png';

/*
 * Every fact below comes from the project's README or docs (ONK 2.0: README and docs/ai-module.md;
 * Offline Sales Analytics: README). Unconfirmed items carry the `TODO: подтвердить` marker.
 */

export type ProjectLink = { kind: 'code' | 'live' | 'releases'; href: string };

export type CaseStudy = {
  id: string;
  title: string;
  kicker: L;
  role: L;
  problem: L;
  solution: L;
  aiux: L[];
  results: L[];
  stack: string[];
  links: ProjectLink[];
  isPrivate?: boolean;
  preview: 'onk-review' | 'osa-chat';
};

export type Tool = {
  id: string;
  title: string;
  kicker: L;
  summary: L;
  stack: string[];
  links: ProjectLink[];
  image: ImageMetadata;
  alt: L;
};

export const cases: CaseStudy[] = [
  {
    id: 'onk',
    title: 'ОНК 2.0',
    kicker: { ru: 'ИИ в закрытом контуре, где ошибка дорога', en: 'AI inside a closed network, where mistakes are costly' },
    role: { ru: 'Автор идеи, full-stack-разработка и интеграции', en: 'Idea author, full-stack development and integrations' },
    problem: {
      ru: 'Комиссия собирает анкеты в учреждениях без связи. Данные нельзя отправлять в облако, а выводы должны опираться на нормы.',
      en: 'A commission collects questionnaires in facilities with no connectivity. Data cannot go to the cloud, and findings must rest on regulations.',
    },
    solution: {
      ru: 'Офлайн-приложение для Android и iOS, сервер синхронизации, веб-админка и ИИ-модуль на локальной модели — всё внутри контура.',
      en: 'An offline Android and iOS app, a sync server, a web admin and an AI module on a local model — all inside the network.',
    },
    aiux: [
      { ru: 'ИИ готовит черновик: в предписание попадает только принятое или исправленное человеком', en: 'AI drafts, a human decides: only accepted or edited items reach the order' },
      { ru: 'Проверка цитат: норма должна дословно совпасть с фрагментом базы знаний', en: 'Quote check: a cited norm must match a knowledge-base fragment word for word' },
      { ru: 'Ответ строго по JSON Schema, персональные данные удаляются до модели', en: 'Answers strictly follow a JSON Schema; personal data is removed before the model' },
      { ru: 'Чат с данными через инструменты только на чтение, с журналом', en: 'Chat with data through read-only tools, with an audit log' },
      { ru: 'Каждый запуск сохраняет модель, версию промпта и снимок базы знаний', en: 'Every run stores the model, prompt version and knowledge-base snapshot' },
    ],
    results: [
      {
        ru: 'Анализ посещения на Apple M4 / 16 ГБ — около 110 секунд, основания подтверждены цитатами',
        en: 'A visit analysis on Apple M4 / 16 GB takes about 110 seconds, with grounds confirmed by quotes',
      },
      { ru: 'Сервер вместе с моделью ставится двойным щелчком на Windows и macOS', en: 'Server and model install with a double-click on Windows and macOS' },
      { ru: 'TODO: подтвердить — статус внедрения и число пользователей', en: 'TODO: подтвердить — rollout status and number of users' },
    ],
    stack: ['React', 'TypeScript', 'Kotlin Multiplatform', 'Spring Boot', 'PostgreSQL + pgvector', 'Ollama / vLLM'],
    links: [],
    isPrivate: true,
    preview: 'onk-review',
  },
  {
    id: 'osa',
    title: 'Offline Sales Analytics',
    kicker: { ru: 'Аналитика продаж на локальной LLM', en: 'Sales analytics on a local LLM' },
    role: { ru: 'Автор, full-stack', en: 'Author, full-stack' },
    problem: {
      ru: 'Отчёты нужны людям, которые не пишут SQL, а коммерческие данные нельзя отдавать внешнему ИИ.',
      en: 'Reports are needed by people who do not write SQL, and commercial data cannot go to an external AI.',
    },
    solution: {
      ru: 'Вопрос → интент → SQL от Qwen 2.5 → проверка → DuckDB → ответ с графиком. Есть десктоп-версия на Electron.',
      en: 'Question → intent → SQL from Qwen 2.5 → validation → DuckDB → answer with a chart. Ships as an Electron desktop app.',
    },
    aiux: [
      { ru: 'Стриминг ответа по WebSocket, прогресс SQL и отмена запроса', en: 'Answers streamed over WebSocket, SQL progress and cancellation' },
      { ru: 'Сгенерированный SQL виден в ответе; выполняются только SELECT и WITH', en: 'The generated SQL is shown in the answer; only SELECT and WITH run' },
      { ru: 'Уточняющие вопросы, оценка ответа и повтор запроса', en: 'Clarifying questions, answer rating and retry' },
      { ru: 'Статус сервисов: бэкенд и модель', en: 'Service status: backend and model' },
      { ru: 'Голосовой ввод и озвучка, экспорт в DOCX', en: 'Voice input and spoken answers, DOCX export' },
    ],
    results: [
      { ru: 'Данные не покидают компьютер пользователя', en: 'Data never leaves the user’s machine' },
      { ru: 'Словарь колонок EN↔RU на 350+ записей', en: 'An EN↔RU column dictionary with 350+ entries' },
      { ru: 'Установка одним скриптом на macOS, Linux и Windows', en: 'One-script install on macOS, Linux and Windows' },
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'DuckDB', 'Ollama', 'Electron'],
    links: [
      { kind: 'live', href: 'https://m3etis.is-a.dev/Offline-Sales-Analytics/' },
      { kind: 'code', href: 'https://github.com/M3etis/Offline-Sales-Analytics' },
    ],
    preview: 'osa-chat',
  },
];

export const tools: Tool[] = [
  {
    id: 'clamkeep',
    title: 'ClamKeep',
    kicker: { ru: 'Нативное приложение для macOS', en: 'Native macOS app' },
    summary: {
      ru: 'Mac не засыпает с закрытой крышкой: вручную, на время загрузок или пока работает выбранное приложение. Статистика системы через IOKit без root, интерфейс на трёх языках.',
      en: 'Keeps a Mac awake with the lid closed — on demand, during downloads or while a chosen app runs. System stats via IOKit without root, UI in three languages.',
    },
    stack: ['Swift', 'AppKit', 'IOKit'],
    links: [
      { kind: 'live', href: 'https://m3etis.is-a.dev/ClamKeep/' },
      { kind: 'code', href: 'https://github.com/M3etis/ClamKeep' },
      { kind: 'releases', href: 'https://github.com/M3etis/ClamKeep/releases/latest' },
    ],
    image: clamkeep,
    alt: {
      ru: 'Скриншот ClamKeep: меню со статистикой системы, окно настроек и установка helper.',
      en: 'ClamKeep screenshot: menu with system stats, settings window and helper setup.',
    },
  },
  {
    id: 'wezterm',
    title: 'WezTerm Pro Setup',
    kicker: { ru: 'Окружение терминала в один клик', en: 'A terminal environment in one click' },
    summary: {
      ru: 'Модульная конфигурация на Lua: статус-бар с git, Docker и версиями языков, tmux-подобные клавиши. Инсталлеры .exe, .dmg и .pkg ставят всё без зависимостей.',
      en: 'A modular Lua config: a status bar with git, Docker and language versions, tmux-style keys. .exe, .dmg and .pkg installers set it all up with no prerequisites.',
    },
    stack: ['Lua', 'WezTerm', 'Shell'],
    links: [
      { kind: 'live', href: 'https://m3etis.is-a.dev/WezTerm-Pro-Setup/' },
      { kind: 'code', href: 'https://github.com/M3etis/WezTerm-Pro-Setup' },
      { kind: 'releases', href: 'https://github.com/M3etis/WezTerm-Pro-Setup/releases' },
    ],
    image: wezterm,
    alt: {
      ru: 'WezTerm с темой Catppuccin Mocha: вкладки, две панели и статус-бар с git, Python, Node и Docker; подсказка по клавишам с лидером Ctrl+A и окно установщика для macOS.',
      en: 'WezTerm with the Catppuccin Mocha theme: tabs, two panes and a status bar with git, Python, Node and Docker; a Ctrl+A leader-key cheat sheet and the macOS installer window.',
    },
  },
];
