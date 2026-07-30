/**
 * Construeix la URL d'un fitxer de `public/` respectant el `base` del lloc.
 *
 * Cal per als desplegaments en subdirectori (GitHub Pages serveix el lloc a
 * `/creativament/`): Astro no reescriu els `src` absoluts del marcatge, així
 * que una ruta com `/assets/images/logo.png` hi donaria 404.
 *
 *   <img src={asset('assets/images/logo.png')} />
 *   → "/assets/images/logo.png"              al domini definitiu
 *   → "/creativament/assets/images/logo.png"  a GitHub Pages
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
