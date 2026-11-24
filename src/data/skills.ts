import type { L } from '../i18n/utils';

/** Grouped by the job they do. `key` items are the everyday core, shown in large type;
    `rest` goes in priority order. */
export type SkillGroup = { id: string; title: string; context: L; key: L[]; rest: string[] };

const same = (s: string): L => ({ ru: s, en: s });

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    context: {
      ru: 'Продуктовые интерфейсы с 2017 года: дизайн-системы, мобильные версии, интерфейсы AI-продуктов.',
      en: 'Product interfaces since 2017: design systems, mobile versions, interfaces for AI products.',
    },
    key: [same('TypeScript'), same('React'), same('Angular')],
    rest: [
      'Three.js',
      'GSAP',
      'D3',
      'Next.js',
      'Vite',
      'React Query',
      'Redux Toolkit',
      'Zustand',
      'RxJS',
      'SCSS',
      'Tailwind CSS',
      'Feature-Sliced Design',
      'Vitest',
      'Playwright',
      'Mobile-first',
      'WCAG',
      'Astro',
      'Electron',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    context: {
      ru: 'Локальные модели в закрытом контуре, ответы по схеме, поиск по базе знаний и проверка результата.',
      en: 'Local models inside a closed network, schema-bound answers, knowledge-base search and output verification.',
    },
    key: [{ ru: 'Ollama · локальные LLM', en: 'Ollama · local LLMs' }, same('RAG')],
    rest: [
      'vLLM',
      'llama.cpp',
      'Qwen',
      'Structured output (JSON Schema)',
      'Tool calling',
      'Text-to-SQL',
      'pgvector',
      'bge-m3',
      'Prompt engineering',
      'Faster-Whisper',
      'Edge-TTS',
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    context: {
      ru: 'Соединяю модель с данными и устройствами: API, стриминг, офлайн-синхронизация, аналитические базы.',
      en: 'Connecting models to data and devices: APIs, streaming, offline sync, analytical databases.',
    },
    key: [same('Python · FastAPI'), same('PostgreSQL')],
    rest: ['REST', 'WebSocket / SSE', 'Spring Boot', 'Kotlin Multiplatform', 'DuckDB', 'SQLite', 'JWT'],
  },
  {
    id: 'tooling',
    title: 'Tooling & Practices',
    context: {
      ru: 'Установка в один клик, воспроизводимые сборки, разработка с ИИ-ассистентами.',
      en: 'One-click installs, reproducible builds, AI-assisted development.',
    },
    key: [],
    rest: ['Git', 'GitHub Actions', 'Docker Compose', 'Figma', 'Amplitude', 'Swift · AppKit', 'Lua', 'Shell', 'AI-assisted development (Claude Code, Codex)'],
  },
];
