/**
 * Prefixa una ruta amb el `base` del lloc.
 *
 * Cal per als desplegaments en subdirectori (GitHub Pages serveix el lloc a
 * `/creativament/`): Astro no reescriu les rutes absolutes del marcatge, així
 * que un `/assets/...` o un `/avis-legal/` escrits a mà hi donarien 404.
 */
function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * URL d'un fitxer de `public/`.
 *
 *   <img src={asset('assets/images/logo.png')} />
 *   → "/assets/images/logo.png"               al domini definitiu
 *   → "/creativament/assets/images/logo.png"  a GitHub Pages
 */
export function asset(path: string): string {
  return withBase(path);
}

/**
 * URL d'una pàgina interna. Amb barra final, per evitar la redirecció que fa
 * GitHub Pages quan falta.
 *
 *   <a href={route('avis-legal/')}>Avís legal</a>
 */
export function route(path: string): string {
  return withBase(path);
}
