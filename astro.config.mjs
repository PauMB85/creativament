// @ts-check
import { defineConfig } from 'astro/config';

/**
 * GitHub Pages serveix el lloc dins d'un subdirectori (/creativament/), mentre
 * que el domini definitiu el servirà a l'arrel. La variable d'entorn
 * GITHUB_PAGES només l'activa el workflow de desplegament de previsualització,
 * així que el build de producció no queda afectat.
 */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? 'https://paumb85.github.io' : 'https://creativament.com',
  base: isGitHubPages ? '/creativament' : '/',
});
