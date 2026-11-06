// Checks WCAG contrast of semantic token pairs in light, dark and the dark "stage" surface. Exits 1 on failure.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const prim = Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((m) => [m[1], m[2]]));

const block = (re) => {
  const m = css.match(re);
  if (!m) throw new Error('block not found: ' + re);
  return Object.fromEntries([...m[1].matchAll(/(--color-[\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
};
const resolve = (theme, v) => {
  const ref = v?.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(theme, theme[ref[1]] ?? prim[ref[1]]) : v;
};
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const light = block(/color-scheme: light;([\s\S]*?)--shadow-1/);
const dark = block(/:root\[data-theme='dark'\] \{([\s\S]*?)--shadow-1/);
// The stage only overrides some tokens; the rest are inherited from the light root.
const stage = { ...light, ...block(/\[data-surface='stage'\] \{([\s\S]*?)--shadow-2/) };

// [foreground, background, minimum ratio]
const pairs = [
  ['--color-text', '--color-bg', 4.5],
  ['--color-text', '--color-bg-alt', 4.5],
  ['--color-text-muted', '--color-bg', 4.5],
  ['--color-text-muted', '--color-bg-alt', 4.5],
  ['--color-text-muted', '--color-surface', 4.5],
  ['--color-text-subtle', '--color-bg', 4.5],
  ['--color-text-subtle', '--color-bg-alt', 4.5],
  ['--color-text-subtle', '--color-surface', 4.5],
  ['--color-text-muted', '--color-surface-2', 4.5],
  ['--color-accent', '--color-bg', 4.5],
  ['--color-accent', '--color-bg-alt', 4.5],
  ['--color-accent', '--color-surface', 4.5],
  ['--color-accent-contrast', '--color-accent-fill', 4.5],
  ['--color-accent-contrast', '--color-accent-hover', 4.5],
  ['--color-text', '--color-accent-soft', 4.5],
  ['--color-success', '--color-surface', 4.5],
  ['--color-warning', '--color-surface', 4.5],
  ['--color-danger', '--color-surface', 4.5],
];

let failed = 0;
for (const [name, theme] of Object.entries({ light, dark, stage })) {
  for (const [fg, bg, min] of pairs) {
    const r = ratio(resolve(theme, theme[fg]), resolve(theme, theme[bg]));
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)} (min ${min})`);
  }
}
process.exit(failed ? 1 : 0);
