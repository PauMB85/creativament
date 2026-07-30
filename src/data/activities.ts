/**
 * Dades de demostració del calendari.
 *
 * `category` ha de coincidir exactament amb el `value` d'un filtre de
 * `activityFilters`: el filtratge del client compara les dues cadenes.
 */
export type ActivityCategory = 'infants' | 'adolescents' | 'adults' | 'families' | 'escoles';

/** Formes/colors decoratius disponibles per a la taca de fons de cada targeta. */
export type BlobColor = 'blue' | 'sky' | 'yellow' | 'blush' | 'coral' | 'pink' | 'mint' | 'cream';

/**
 * Icona (Phosphor duotone) que va dins de la taca. Cada nom ha de tenir el seu
 * fitxer a `src/icons/<nom>-duotone.svg` i estar registrat al mapa `icons` de
 * `Calendar.astro`.
 */
export type ActivityIcon =
  | 'plant'
  | 'balloon'
  | 'umbrella'
  | 'feather'
  | 'brain'
  | 'handshake'
  | 'house'
  | 'sparkle';

export interface Activity {
  category: ActivityCategory;
  blob: BlobColor;
  icon: ActivityIcon;
  weekday: string;
  day: string;
  month: string;
  title: string;
  audience: string;
  time: string;
  tag: string;
}

export const activityFilters: { value: 'all' | ActivityCategory; label: string }[] = [
  { value: 'all', label: 'Totes' },
  { value: 'infants', label: 'Infants' },
  { value: 'adolescents', label: 'Adolescents' },
  { value: 'adults', label: 'Adults' },
  { value: 'families', label: 'Famílies' },
  { value: 'escoles', label: 'Formacions i escoles' },
];

export const activities: Activity[] = [
  {
    category: 'infants',
    blob: 'blue',
    icon: 'plant',
    weekday: 'Dimarts',
    day: '04',
    month: 'Juny',
    title: "Taller d'art i emocions",
    audience: 'Infants (6–9 anys)',
    time: '17:30 – 18:45',
    tag: 'Infants',
  },
  {
    category: 'infants',
    blob: 'sky',
    icon: 'balloon',
    weekday: 'Dissabte',
    day: '08',
    month: 'Juny',
    title: 'Gestió emocional a través del joc',
    audience: 'Infants (8–11 anys)',
    time: '10:30 – 12:00',
    tag: 'Infants',
  },
  {
    category: 'adolescents',
    blob: 'yellow',
    icon: 'umbrella',
    weekday: 'Dijous',
    day: '13',
    month: 'Juny',
    title: "Tècniques d'estudi amb creativitat",
    audience: 'Adolescents (12–16 anys)',
    time: '17:00 – 18:30',
    tag: 'Adolescents',
  },
  {
    category: 'adults',
    blob: 'blush',
    icon: 'feather',
    weekday: 'Dissabte',
    day: '15',
    month: 'Juny',
    title: 'Artteràpia: expressar per sanar',
    audience: 'Adults',
    time: '10:30 – 12:30',
    tag: 'Adults',
  },
  {
    category: 'infants',
    blob: 'coral',
    icon: 'brain',
    weekday: 'Dimarts',
    day: '18',
    month: 'Juny',
    title: "Altes capacitats: grup d'enriquiment",
    audience: 'Infants (9–12 anys)',
    time: '17:30 – 19:00',
    tag: 'Infants',
  },
  {
    category: 'families',
    blob: 'pink',
    icon: 'handshake',
    weekday: 'Divendres',
    day: '21',
    month: 'Juny',
    title: 'Taller per a famílies: connexió i límits',
    audience: 'Famílies',
    time: '17:30 – 19:00',
    tag: 'Famílies',
  },
  {
    category: 'families',
    blob: 'mint',
    icon: 'house',
    weekday: 'Dissabte',
    day: '22',
    month: 'Juny',
    title: "Comprendre l'ansietat infantil",
    audience: 'Famílies',
    time: '10:30 – 12:30',
    tag: 'Famílies',
  },
  {
    category: 'escoles',
    blob: 'cream',
    icon: 'sparkle',
    weekday: 'Dimecres',
    day: '26',
    month: 'Juny',
    title: 'Formació per a docents: creativitat a l\'aula',
    audience: 'Docents i escoles',
    time: '16:30 – 18:30',
    tag: 'Formacions',
  },
];

/** Mes mostrat al mini-calendari (dades de demostració). */
export const currentMonth = {
  label: 'Juny 2026',
  /** Caselles buides abans del dia 1 (el mes comença en dissabte). */
  leadingBlanks: 5,
  totalDays: 30,
  selectedDay: 4,
};
