# Creativament — web

Web corporativa de **Creativament** (psicologia, creativitat i talent per a infants, adolescents,
adults, famílies i escoles). Una sola pàgina amb vuit seccions ancorades, en català.

Lloc **estàtic** fet amb [Astro](https://astro.build) 7.1.6: sense frameworks de UI, sense CMS i
sense JavaScript de tercers. Tota la interactivitat són tres scripts d'una dotzena de línies.

## Posar-lo en marxa

Cal **Node.js >= 22.12** (requisit d'Astro 7).

```bash
npm install
npm run dev
```

| Comanda | Què fa |
|---|---|
| `npm run dev` | servidor de desenvolupament a http://localhost:4321 |
| `npm run build` | genera el lloc estàtic a `dist/` |
| `npm run preview` | serveix `dist/` per revisar el build real |
| `npm run check` | diagnòstics de TypeScript i de les plantilles Astro |

> Si canvies estils i el navegador no els agafa, reinicia `npm run dev`: en sessions llargues el
> servidor es pot quedar amb CSS antic tot i servir l'HTML nou.

## Com està organitzat

```
src/
  pages/index.astro       la pàgina: només composa seccions
  layouts/BaseLayout      <head>, tipografies, capçalera, peu
  components/             una secció = un component (marcatge + estils + script)
  data/                   el contingut editable
  icons/                  icones Phosphor en SVG
  styles/global.css       paleta de colors, base i utilitats compartides
public/assets/images/     imatges
docs/                     sistema de disseny i handoff
design/                   maqueta visual aprovada (no es publica)
prototype/                versió HTML original, congelada com a referència
```

Dues regles que expliquen la resta:

1. **Els estils viuen amb el seu component.** A `global.css` només hi ha la paleta, el reset i el
   que comparteixen dues o més seccions (`.container`, `.section`, `.btn`…). La resta va dins del
   `<style>` de cada component, media queries incloses.
2. **Cap component escriu un color literal.** Tots surten dels tokens de `:root`.

## On canvio què

| Vull canviar… | Fitxer |
|---|---|
| Textos d'una secció | el component corresponent a `src/components/` |
| Activitats del calendari | `src/data/activities.ts` |
| Menú, valors o públics | `src/data/site.ts` |
| Colors, tipografies, espaiat | `src/styles/global.css` |
| Estils d'una secció concreta | el `<style>` d'aquell component |
| Imatges | `public/assets/images/` |
| Icones | `src/icons/` (Phosphor; vegeu el sistema de disseny) |

## Comprovar que no has trencat res

```bash
npm run check    # tipus i plantilles
npm run build    # que compili
```

A més, `prototype/index.html` és la versió original i s'obre directament al navegador: serveix per
comparar visualment qualsevol canvi. La migració a Astro es va verificar píxel a píxel contra ell;
les desviacions intencionades des de llavors estan llistades a
[`CLAUDE.md`](CLAUDE.md#directories-that-are-not-part-of-the-build).

## Documentació

- [**Sistema de disseny**](docs/design-system.md) — paleta, tipografia, espaiat, especificació de
  cada component, to de veu i deute conegut.
- [**Handoff**](docs/handoff.md) — arquitectura, contractes de dades, estat del projecte i decisions
  obertes.
- [`CLAUDE.md`](CLAUDE.md) — convencions per a agents d'IA que treballin al repositori.

## Estat

Prototip navegable i complet visualment, **encara no connectat**:

- Les activitats del calendari són dades de demostració i el mini-calendari és estàtic.
- Els formularis no envien dades (mostren un avís).
- Les pàgines legals (avís legal, privacitat, cookies) apunten a `#`.
- Les imatges són extraccions del prototip; falten els originals en alta resolució, el logo en SVG,
  el favicon i la imatge per a xarxes.

La llista completa de decisions pendents és a l'apartat final del [handoff](docs/handoff.md).
