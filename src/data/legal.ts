/**
 * Dades identificatives que exigeix l'article 10 de la LSSI-CE i que fan servir
 * les tres pàgines legals.
 *
 * ⚠️ PENDENT: els camps buits surten a la web com a "[PENDENT: …]" en vermell,
 * a propòsit, perquè no es publiquin sense omplir. Ompliu-los aquí i prou:
 * cap text legal repeteix aquestes dades a mà.
 */
export const legalEntity = {
  /** Raó social, o nom i cognoms si és una persona física. */
  name: '',
  /** NIF o CIF. */
  taxId: '',
  /** Domicili complet (carrer, número, codi postal, població). */
  address: '',
  /** Correu de contacte publicat. */
  email: 'hola@creativament.cat',
  /** Telèfon de contacte (opcional). */
  phone: '',
  /** Domini definitiu del lloc, sense protocol. */
  domain: 'creativament.com',

  /** Només si és una societat: dades registrals. Deixeu-ho buit si és autònom. */
  registry: '',

  /**
   * La psicologia és una professió regulada: la LSSI obliga a publicar el
   * col·legi professional, el número de col·legiat i el títol acadèmic.
   */
  professionalBody: '',
  membershipNumber: '',
  academicDegree: '',
};

/**
 * Com es tracten les dades del formulari de contacte.
 *
 * ⚠️ PENDENT: ara mateix els formularis són una demostració i no envien res
 * (vegeu `data-demo-form` a BaseLayout.astro). Quan es connectin, cal
 * actualitzar aquests camps i revisar la política de privacitat.
 */
export const dataProcessing = {
  /** Si els formularis ja envien dades de debò. */
  formsActive: false,
  /** Qui rep o processa els enviaments (proveïdor de correu, CRM, newsletter…). */
  processors: '',
  /** Termini de conservació de les consultes. */
  retention: '',
};

/** Data de l'última revisió dels textos legals. */
export const lastUpdated = '';

/** Marca visualment els camps que encara falten per omplir. */
export function pending(value: string, label: string): string {
  return value.trim() === '' ? `[PENDENT: ${label}]` : value;
}
