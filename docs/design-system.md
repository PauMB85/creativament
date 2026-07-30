# Creativament — design system

Sistema visual de **Creativament** — psicologia, creativitat i talent per a infants, adolescents,
adults i famílies (Catalunya). La marca es llegeix com un **quadern d'activitats**: fons crema
càlid, tipografia amb serif expressiva, taques orgàniques de colors pastel i un rosa viu que marca
sempre l'acció.

Aquest document descriu el que **ja està construït** al repositori, no una proposta. Els valors
autoritatius viuen a [`src/styles/global.css`](../src/styles/global.css).

## Fonaments de contingut

- Copy en **català**. Registre proper i professional alhora: parlem de persones, no d'etiquetes
  ("Una mirada centrada en la persona, no en l'etiqueta").
- Frases curtes, en sentence case. Titulars declaratius, sense signes d'exclamació.
- Els titulars poden destacar **una o dues paraules clau** amb color (`<em>` verd, `<strong>` rosa):
  "Desenvolupem el _talent_ a través de la psicologia i la **creativitat**."
- Micro-etiquetes (eyebrow, nav, botons, tags) en **majúscules**, sempre curtes.
- Les crides a l'acció acaben amb fletxa: `Inscriu-te →`, `Veure tot el calendari →`.
- Evitem argot clínic i tecnicismes. Cada públic s'anomena pel seu nom: infants, adolescents,
  adults, famílies, escoles i professionals.

## Fonaments visuals

- **Clar i càlid per defecte.** Fons de pàgina crema (`--cream #fffdf9`), superfícies blanques
  (`--surface`), franges de secció en crema (`--wash #fbf7f3`). No hi ha tema fosc.
- **El rosa és sempre acció o accent** (`--pink #ef3d86`): botons primaris, enllaços, números,
  subratllat de navegació, dia seleccionat. No s'usa mai per a text llarg.
- **Els pastels són només decoració** (`--pastel-*`, `--blob-*`). Van darrere d'una icona, mai
  sota text.
- **Formes orgàniques**: les taques de les activitats fan servir un `border-radius` irregular
  (`48% 52% 63% 37% / 41% 36% 64% 59%`) que és una signatura de marca — no és un cercle.
- **Línies d'1px** (`--line`) per separar targetes i seccions; mai ombres dures.
- **Una sola ombra** (`--shadow: 0 18px 50px rgba(50,61,91,.08)`), reservada al hover de les
  targetes d'activitat i al menú mòbil desplegat.
- **Capçalera translúcida** enganxada a dalt: `rgb(var(--cream-rgb) / 0.93)` + `blur(16px)`.
- Composició centrada dins d'un contenidor de 1180px, amb molt d'aire vertical.

## Color

Paleta completa a `:root`. **Cap component escriu un color literal.**

**Marca** — `--pink #ef3d86` (acció/accent) · `--pink-dark #d92972` (hover) · `--green #82ae62`
(paraula destacada del titular) · `--yellow #f2b84d` i `--purple #7154bd` (declarats, encara sense ús)

**Text** — `--ink #18345f` (blau tinta, text principal) · `--ink-soft #53627a` (secundari) ·
`--text-on-brand #fff` (sobre rosa) · `--text-date #c99964` (dia de la setmana) ·
`--text-tag #758a63` (etiqueta de categoria)

**Superfícies i línies** — `--cream #fffdf9` · `--surface #fff` · `--wash #fbf7f3` ·
`--pink-wash #fff0f6` (hover del botó outline) · `--line #eadfd9` · `--line-soft #f0e7e1`

**Pastels d'icones de valors** — `--pastel-green #e7f0d8` · `--pastel-peach #fde4c5` ·
`--pastel-pink #fbd3df` · `--pastel-lilac #e7def5`

**Pastels de taques d'activitat** — `--blob-blue #b8d9dd` · `--blob-sky #d7edf0` ·
`--blob-yellow #f6d78f` · `--blob-blush #f6dce3` · `--blob-coral #e89a8b` · `--blob-mint #d9e8ce` ·
`--blob-cream #f7edcf` · (la rosa reutilitza `--pastel-pink`)

**Tons profunds de taca** — un per família, és el color de la icona que va dins i **mai s'usa com a
fons ni per a text**: `--blob-blue-deep #2f6b74` · `--blob-sky-deep #3b7c86` ·
`--blob-yellow-deep #8a6414` · `--blob-blush-deep #a24a67` · `--blob-coral-deep #8c3b2c` ·
`--blob-mint-deep #4f7038` · `--blob-cream-deep #96731f` · `--pastel-pink-deep #a03b62`

**Regla tècnica**: els colors que necessiten transparència es guarden com a **llista de canals**
(`--cream-rgb: 255 253 249`) i es consumeixen amb `rgb(var(--cream-rgb) / 0.93)`; el token sòlid es
deriva dels canals. No fer servir sintaxi de color relatiu (`rgb(from …)`): renderitza diferent
dins del degradat radial del hero.

## Tipografia

- **Playfair Display** (`--serif`) 500/600 — titulars, números de data, títols de targeta.
  Sempre `font-weight: 500` i `line-height: 1.08` als titulars de secció.
- **DM Sans** (`--sans`) 400/500/600/700 — cos, navegació, botons, formularis. `line-height: 1.6`.
- Carregades des de Google Fonts amb `Georgia` / `Arial` com a alternativa de sistema.

| Ús | Mida | Família |
|---|---|---|
| Titular hero | `clamp(44px, 5vw, 68px)` → 43px a ≤650 | serif |
| Titular de secció (`.section h2`) | 44px → 36px a ≤650 | serif |
| Títol de targeta gran (públics) | 22px | serif |
| Títol d'activitat | 19px | serif |
| Número de dia | 34px | serif |
| Entrada / lead | 18px | sans |
| Cos secundari | 13–14px | sans |
| Micro-etiqueta (nav, botó, chip, tag) | 10–12px, majúscules | sans |

**Espaiat de lletra**: `0.04em` a les micro-etiquetes; `0.15em` a l'eyebrow rosa.

## Espaiat i graella

- Contenidor: `min(100% - 40px, 1180px)`; el marge baixa a 28px per sota de 650px.
- Padding de secció: **88px** vertical → **64px** a ≤650. Franges especials: valors 30px,
  recursos 62px, peu 32px.
- Graella de continguts: **4 columnes → 2 (≤1050px) → 1 (≤650px)**. Només dos breakpoints:
  `1050px` i `650px`.
- Alçada de capçalera: 92px → 78px a ≤650.
- Hero: graella 36% / 64% amb `min-height: 560px`; a ≤1050 passa a una columna.

## Components

| Component | Especificació |
|---|---|
| `.btn` | alçada mín. 48px, padding 0 22px, radi 6px, 12px/700 majúscules |
| `.btn-primary` | fons rosa, text blanc; hover `--pink-dark` + `translateY(-1px)` |
| `.btn-outline` | vora i text rosa; hover fons `--pink-wash` |
| `.chip` (filtre) | padding 10px 18px, radi 5px, 12px majúscules; actiu/hover → fons rosa |
| `.event-card` | radi 8px, padding 18px, alçada mín. 305px (275 a ≤650); hover puja 4px + `--shadow` |
| `.event-art` | taca de 115px amb icona duotone de 52px en to profund, opacitat 0.82, posicionada fora del marge dret |
| `.month-card` | radi 8px, 235px d'ample; **s'amaga per sota de 1050px** |
| `.value-icon` | cercle de 52px amb glif Unicode de 28px |
| `.audience-grid article` | radi `--radius` (18px), padding 28px, número serif rosa de 28px |
| `.resource-card` | columna amb divisòria d'1px a la dreta; imatge de 110px, paràgraf amb `min-height: 66px` |
| `.resource-card h3` | icona duotone de 26px en `--pink` **al costat del títol**, `line-height` 1.3 perquè quedin alineats quan el títol ocupa dues línies |
| Camps de formulari | radi 6px, padding 13px 14px, vora `--line` |
| `.main-nav a` | subratllat de 2px rosa que creix d'esquerra a dreta en 0.25s |

**Radis en ús**: 4 / 5 / 6 / 8 / 14 / 18px, 999px (botó de menú) i 50% (cercles). No estan
sistematitzats — vegeu Deute.

## Moviment

- Transicions de **0.2s** (botons) i **0.25s** (targetes, subratllat de navegació).
- Hover de targeta: `translateY(-4px)` + ombra. Hover de botó primari: `translateY(-1px)`.
- `scroll-behavior: smooth` global, perquè tota la navegació són àncores.
- No hi ha animacions d'entrada ni paral·laxi.

## Iconografia

Hi ha **tres capes** i cadascuna té la seva regla.

**1. Icones d'interfície i xarxes socials → [Phosphor](https://phosphoricons.com) (pes regular).**
Els fitxers viuen a [`src/icons/`](../src/icons/) i s'importen com a component, aprofitant el suport
natiu de SVG d'Astro 7:

```astro
import Envelope from '../icons/envelope.svg';
<Envelope aria-hidden="true" />
```

No hi ha cap dependència ni llibreria instal·lada: el SVG s'incrusta a l'HTML en temps de build (0 KB
de JS, 0 peticions). Les icones **no porten mida ni color propis**; els fixa el component amb
`fill: currentColor` i `width`/`height`, de manera que hereten la paleta. Actualment: 22px al peu,
18px als controls de mes; color `--ink` que passa a `--pink` en hover.

Per afegir-ne una de nova: descarregar el SVG de Phosphor en pes *regular*, desar-lo a `src/icons/`
amb el nom original, treure-li `width`/`height`/`fill` fixos i deixar-hi el `viewBox="0 0 256 256"`.
Phosphor és MIT i no requereix atribució. **No barrejar sets**: si una icona no hi és, buscar
l'equivalent dins de Phosphor abans de portar-ne una de fora.

**2. Il·lustració d'activitats i recursos → Phosphor pes _duotone_.** Abans hi havia emoji; es van
retirar perquè cada sistema operatiu els dibuixava diferent i el seu acabat brillant i tridimensional
xocava amb una paleta plana i mat.

- **Targetes d'activitat**: la icona va **dins de la taca orgànica**, a 52px. La calidesa la segueix
  aportant la taca; la icona pren el **to profund de la mateixa família** via `currentColor`, que
  fixa la classe de la taca (`.blue { background: var(--blob-blue); color: var(--blob-blue-deep) }`).
- **Targetes de recursos**: icona a 26px en `--pink` **dins del titular**, no a sobre.

La icona de cada activitat es tria a `src/data/activities.ts` amb el tipus `ActivityIcon`, i el mapa
`icons` de `Calendar.astro` la lliga al fitxer SVG. Afegir-ne una vol dir tocar els tres llocs.

Horitzó: si algun dia hi ha pressupost d'il·lustració, il·lustracions spot en l'estil aquarel·la de
`hero-art.png` dins de la taca serien millors que qualsevol set d'icones.

**3. Glifs decoratius de la secció de valors** (⌁ ◎ ♡ ⌒) dins dels cercles pastel. Són marques
abstractes heretades del prototip, no icones d'interfície. Canviar-los és decisió de disseny.

La fletxa `→` de les crides a l'acció es manté com a **text**: allà és un recurs tipogràfic.

## Accessibilitat

Base ja implementada i que cal preservar: enllaç de salt al contingut, `aria-expanded` sincronitzat
al menú mòbil, `aria-label` a navegació, controls de mes i xarxes socials, etiquetes `.sr-only` als
camps sense etiqueta visible, i `aria-hidden` a les il·lustracions decoratives i a la graella de dies.

Pendent de comprovar: contrast de `--text-date` (#c99964) i `--text-tag` (#758a63) sobre blanc, i
un estil de `:focus-visible` propi (ara depèn del navegador).

## Índex de fitxers

- [`src/styles/global.css`](../src/styles/global.css) — paleta, base i utilitats compartides
  (`.container`, `.section`, `.btn`, `.eyebrow`, `.sr-only`). **Font de veritat.**
- [`src/components/`](../src/components/) — una secció per component, amb els seus estils scoped i
  les seves media queries.
- [`src/data/`](../src/data/) — continguts editables (navegació, valors, públics, activitats).
- [`public/assets/images/`](../public/assets/images/) — imatges servides tal qual.
- `design/reference-home.png` — maqueta visual aprovada.
- `prototype/` — versió HTML original, congelada com a referència visual.

## Deute i decisions pendents

- **L'escala tipogràfica i d'espaiat no és sistemàtica.** Hi conviuen 10/11/12/13/14/16/18/19/20/
  22/28/30/34/36/43/44/45px i radis de 4/5/6/8/14/18px, heretats de l'extracció del prototip.
  Convertir-los en escala abans que el projecte creixi.
- `--yellow` i `--purple` estan definits i no s'usen enlloc: confirmar si són colors de marca o
  residu del prototip.
- `#que-fem` surt al menú però no existeix la secció; `#families` és un `id` sobre una targeta de
  recursos, no una secció pròpia.
- Les imatges són extraccions del prototip: cal substituir-les pels originals en alta resolució.
  No hi ha logo vectorial (SVG), ni favicon, ni imatge Open Graph.
- El calendari, el mes i els botons de mes anterior/següent són **estàtics**. Els formularis no
  envien dades.
- Falten pàgines legals reals (avís legal, privacitat, cookies apunten a `#`).
