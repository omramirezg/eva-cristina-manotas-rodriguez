import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const htmlPath = new URL('../index.html', import.meta.url);
const cssPath = new URL('../styles.css', import.meta.url);
const jsPath = new URL('../script.js', import.meta.url);
const html = readFileSync(htmlPath, 'utf8');

test('ships the web-ready identity assets and favicon', () => {
  assert.equal(existsSync(new URL('../assets/favicon.ico', import.meta.url)), true);
  assert.equal(existsSync(new URL('../assets/eva-hero.webp', import.meta.url)), true);
  assert.equal(existsSync(new URL('../assets/rose-watercolor.webp', import.meta.url)), true);
  assert.match(html, /<link[^>]+rel=["']icon["'][^>]+assets\/favicon\.ico/);
});

test('keeps the six requested destinations in the main navigation', () => {
  for (const destination of ['inicio', 'carta', 'quien', 'gestion', 'viene', 'votar']) {
    assert.match(html, new RegExp(`href=["']#${destination}["']`));
    assert.match(html, new RegExp(`id=["']${destination}["']`));
  }
});

test('uses Eva portrait and all supplied watercolor illustrations', () => {
  for (const asset of [
    'eva-hero.webp',
    'rose-watercolor.webp',
    'facultad-puerta-abierta.webp',
    'ballot-watercolor.webp',
    'campus-footer.webp',
  ]) {
    assert.match(html, new RegExp(`assets/${asset.replace('.', '\\.')}`));
  }
});

test('presents the verified consultation date without dead placeholder links', () => {
  assert.match(html, /jueves\s+17\s+de\s+septiembre\s+de\s+2026/i);
  assert.doesNotMatch(html, /miércoles\s+17\s+de\s+septiembre\s+de\s+2026/i);
  assert.doesNotMatch(html, /href=["']#["']/);
});

test('provides separate responsive styles and progressive enhancement', () => {
  assert.equal(existsSync(cssPath), true);
  assert.equal(existsSync(jsPath), true);

  const css = readFileSync(cssPath, 'utf8');
  const script = readFileSync(jsPath, 'utf8');

  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
});
