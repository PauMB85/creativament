/** Enllaços de la navegació principal. L'`href` ha de coincidir amb l'`id` de la secció. */
export const navLinks = [
  { href: '#inici', label: 'Inici' },
  { href: '#qui-som', label: 'Qui som' },
  { href: '#que-fem', label: 'Què fem' },
  { href: '#acompanyem', label: 'A qui acompanyem' },
  { href: '#metode', label: 'El mètode' },
  { href: '#calendari', label: 'Calendari' },
  { href: '#setmanal', label: 'Creativament setmanal' },
  { href: '#contacte', label: 'Contacte' },
] as const;

export const values = [
  {
    icon: '⌁',
    color: 'green',
    title: 'Intervenció personalitzada',
    text: 'Plans adaptats a cada persona i a cada etapa de la vida.',
  },
  {
    icon: '◎',
    color: 'peach',
    title: 'Basat en evidència',
    text: 'Ens fonamentem en la ciència i en l\'experiència professional.',
  },
  {
    icon: '♡',
    color: 'pink',
    title: 'Mirada integral',
    text: 'Emocions, pensament, cos, relacions i creativitat.',
  },
  {
    icon: '⌒',
    color: 'lilac',
    title: 'Entorn segur i acollidor',
    text: 'Espais on sentir-se bé, expressar-se i créixer.',
  },
] as const;

export const audiences = [
  {
    number: '01',
    title: 'Infants i adolescents',
    text: 'Aprenentatge, emocions, autoestima, talent i habilitats socials.',
  },
  {
    number: '02',
    title: 'Adults',
    text: 'Autoconeixement, creativitat, regulació emocional i benestar.',
  },
  {
    number: '03',
    title: 'Famílies',
    text: 'Orientació, acompanyament i eines útils per al dia a dia.',
  },
  {
    number: '04',
    title: 'Escoles i professionals',
    text: 'Formació, assessorament i programes amb base científica.',
  },
] as const;
