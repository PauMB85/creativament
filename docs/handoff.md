# Handoff: Creativament — web corporativa

## Resum

Web de Creativament (psicologia, creativitat i talent; infants, adolescents, adults, famílies i
escoles). **Una sola pàgina** amb vuit seccions ancorades, construïda amb **Astro 7.1.6**, sortida
estàtica i sense frameworks de UI. Contingut en català. Domini previst: `creativament.com`.

## Diferència important respecte d'un handoff de disseny

Aquí **el codi ja és producció**, no una referència a reconstruir. El que hi ha a `src/` és el lloc
real: components `.astro`, tokens CSS i dades tipades. No cal recrear res.

L'única peça que **sí** és referència són:

- `design/reference-home.png` — la maqueta visual aprovada.
- `prototype/` — la primera versió HTML/CSS/JS. Està **congelada**: serveix com a base de
  comparació visual, no s'hi toca. Les seves imatges són un symlink a `public/`, així que s'obre al
  navegador tal qual.

## Fidelitat

**Alta.** La migració a Astro es va verificar **píxel a píxel** contra el prototip a 1440 / 1000 /
600 / 375px (captures amb Chrome headless, hash idèntic). Hi ha **una sola desviació deliberada**:
les tres cremes gairebé iguals del prototip (`#fbf7f2` / `#fbf8f3` / `#fbf7f3`) es van unificar en
`--wash: #fbf7f3`, cosa que desplaça tres zones 1/255 per canal.

Qualsevol canvi visual futur es pot validar amb el mateix mètode: captura del build i comparació
contra `prototype/index.html`.

## Stack i comandes

Node >= 22.12. Dependències **fixades a versió exacta** (`.npmrc` amb `save-exact=true`): astro
7.1.6, @astrojs/check 0.9.10, typescript 6.0.3.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/ (estàtic pur)
npm run preview   # serveix dist/
npm run check     # TypeScript + plantilles Astro
```

## Arquitectura

```
src/pages/index.astro          només composa seccions
src/layouts/BaseLayout.astro   <head>, fonts, Header, Footer, script de formularis
src/components/*.astro         una secció = un component (marcatge + estils + script)
src/data/*.ts                  contingut editable
src/icons/*.svg                icones Phosphor, importades com a component
src/styles/global.css          paleta + base + utilitats compartides
public/assets/images/          imatges (<img> amb rutes absolutes /assets/images/…)
```

**Regla d'estils**: `global.css` només conté la paleta, el reset i les utilitats que fan servir dues
o més seccions (`.container`, `.section`, `.btn`, `.eyebrow`, `.sr-only`). **Tota la resta va dins
del `<style>` del component**, amb les seves media queries incloses. Com que Astro fa scope dels
estils, un selector només afecta el marcatge del seu propi component.

## Inventari de components

| Component | Contingut | Notes |
|---|---|---|
| `Header` | logo, navegació, botó "Espai famílies" | sticky translúcid; menú hamburguesa per sota de 1050px; el botó de famílies s'amaga |
| `Hero` | eyebrow, titular, lead, dos botons, il·lustració | il·lustració amb `mix-blend-mode: multiply` sobre un halo radial |
| `Values` | 4 valors amb icona en cercle pastel | franja amb degradat horitzontal |
| `About` | eyebrow + titular + paràgraf centrat | |
| `Calendar` | filtres, mini-calendari del mes, 8 targetes d'activitat | única secció amb lògica de client |
| `Audience` | 4 targetes numerades | |
| `Resources` | 4 columnes: setmanal, recursos, newsletter, espai famílies | la 3a conté un formulari |
| `Contact` | text + formulari de 3 camps | |
| `Footer` | logo, enllaços legals, xarxes | |

## Contractes de dades

Tot el contingut editable viu a `src/data/`. **Editar-hi el copy, no als components.**

`site.ts` → `navLinks` (l'`href` ha de coincidir amb un `id` de secció real), `values`, `audiences`.

`activities.ts` → `activityFilters`, `activities`, `currentMonth`.

El contracte crític és el del calendari: el script de `Calendar.astro` compara
`.chip[data-filter]` amb `.event-card[data-category]` per cadena exacta i alterna la classe
`.hidden`; el valor `all` és un cas especial. Els dos costats es generen de les mateixes dades i el
tipus `ActivityCategory` fa que un valor invàlid **falli a `npm run check`**.

El tipus `BlobColor` limita les taques a les 8 classes existents. Afegir un color nou vol dir
afegir el token a `global.css`, la classe a `Calendar.astro` i el valor a la unió.

## Tokens

Autoritatius a [`src/styles/global.css`](../src/styles/global.css); documentats a
[`design-system.md`](design-system.md). **Cap component pot escriure un color literal** — la
comprovació és:

```bash
grep -rnE '#[0-9a-f]{3,8}|rgba?\(' src | grep -v global.css   # ha de tornar buit
```

Els colors amb transparència es guarden com a canals (`--cream-rgb: 255 253 249`) i es consumeixen
amb `rgb(var(--cream-rgb) / 0.93)`.

## To i contingut

Català, sentence case, frases curtes, sense emoji al copy (els emoji són il·lustració, no text).
Micro-etiquetes en majúscules. Crides a l'acció amb fletxa. Vegeu "Fonaments de contingut" al
design system.

## Interaccions

Tota la interactivitat són **tres scripts inline**, sense cap llibreria (0 KB de JS de tercers):

1. **Menú mòbil** (`Header.astro`) — alterna `.open` i sincronitza `aria-expanded`; es tanca en
   clicar qualsevol enllaç.
2. **Filtres del calendari** (`Calendar.astro`) — vegeu el contracte de dades.
3. **Formularis de demostració** (`BaseLayout.astro`) — intercepta el `submit` de qualsevol
   `form[data-demo-form]` i mostra un avís. Per connectar un formulari real: treure l'atribut
   `data-demo-form` i afegir el destí.

La navegació és tota per àncores amb scroll suau. No hi ha estat compartit ni enrutament.

## Assets

`public/assets/images/`: `logo.png`, `hero-art.png`, `weekly.png`, `resources.png`, `families.png`.
Fora del build: `design/reference-home.png` (maqueta) i `design/flowers.png` (no s'usa).

Icones a `src/icons/` (Phosphor, MIT), incrustades a l'HTML en temps de build via el suport natiu
de SVG d'Astro 7 — sense dependències ni peticions extra.

**Pendents**: originals en alta resolució (les actuals són extraccions del prototip), logo en SVG,
favicon i imatge Open Graph. No fem servir el pipeline d'imatges d'Astro (`<Image>`); adoptar-lo
implica moure els fitxers a `src/assets/`.

## Estat i properes passes

Fet: migració a Astro verificada, paleta centralitzada en tokens, contingut extret a `src/data/`,
`site` apuntant a `creativament.com`, build i `astro check` nets.

Per decidir amb el client:

1. Confirmar si `--yellow` i `--purple` són colors de marca o residu.
2. Contingut de la secció `#que-fem` (surt al menú i no existeix) i si "Espai famílies" ha de ser
   secció pròpia o pàgina.
3. Destí real dels formularis (correu, CRM, servei de newsletter) i text legal de consentiment.
4. Origen de les activitats: seguiran hardcodades, passaran a col·leccions de contingut d'Astro, o
   vindran d'un CMS? Això condiciona si el calendari es fa dinàmic.
5. Pàgines legals (avís legal, privacitat, cookies) i si cal banner de cookies.

Tècnicament pendent: sistematitzar l'escala tipogràfica i de radis, metadades socials i favicon,
i allotjar les tipografies al propi lloc per eliminar l'única connexió a un tercer.

Fet des de la primera versió d'aquest document: repositori a `github.com/PauMB85/creativament` amb
desplegament automàtic a GitHub Pages, pàgines legals, i una passada d'accessibilitat
(`:focus-visible`, `prefers-reduced-motion`, contrastos WCAG AA verificats, estat dels filtres
anunciat i àrees tàctils de 44px).

## Fitxers de referència

- [`README.md`](../README.md) — comandes i estructura.
- [`CLAUDE.md`](../CLAUDE.md) — convencions per a agents que treballin al repositori.
- [`docs/design-system.md`](design-system.md) — sistema visual complet.
- `design/reference-home.png` · `prototype/index.html` — referències visuals.
