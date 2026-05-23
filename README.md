# MathLab DE — Offline-First iPhone-PWA für ML/DL-Mathematik

Lokaler Mathematik-Lernpfad: Realschule → ML/Deep Learning.
Keine API-Calls, kein Backend, kein Analytics. Alles lokal.

## Tech-Stack

- Vite 5 + TypeScript 5 (strict)
- vite-plugin-pwa 0.20 (autoUpdate Service Worker)
- Tailwind CSS 3 (dark-first, mobile-first)
- Dexie 4 (IndexedDB)
- ts-fsrs 5.3 (FSRS-6 SRS-Algorithmus)
- KaTeX 0.16 (lokal gebündelt, kein CDN)
- date-fns 3
- Vitest (Unit-Tests)

## Entwicklung

```bash
npm install
npm run dev -- --host 0.0.0.0
# Auf MSI: tailscale serve 5173 (oder tailscale funnel 5173)
# Auf iPhone: https://<hostname>.ts.net öffnen
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
npm run test:coverage
```

## Architektur-Entscheidungen

- **Vanilla TS + Web Components**: Kein Framework-Overhead, volle Kontrolle.
- **History-API-Routing**: `navigate(path)` via `lib/store.ts` triggert Screen-Render.
- **State**: Einfaches Pub/Sub über `src/lib/store.ts`.
- **Content als TypeScript-Module**: Alles statisch eingebaut, kein Nachladen.
- **FSRS-6**: ts-fsrs mit `request_retention: 0.9` und 36500 Tage max.
- **Mastery**: N-CCR=3 (proficient), N-CCR=5 bei Diff≥4 (mastered).
- **KaTeX**: Via `renderMathInElement` aus lokalem `/katex/contrib/auto-render.min.js`.

## Lernpfad-Phasen

| Phase | Inhalt |
|-------|--------|
| 0 | Grundlagen (Brüche, Lineare Funktionen, Ableitungen) |
| 1 | Lineare Algebra & Calculus (Stub) |
| 2 | Stochastik & Statistik (Stub) |
| 3 | ML-Kern (Stub) |
| 4 | Deep Learning & Spezialthemen (Stub) |

## Neue Lektionen hinzufügen

1. Datei in `src/content/phaseN/` anlegen (Typ `Lesson` aus `src/types.ts`)
2. In `src/content/phaseN/index.ts` in das `topics.lessons`-Array eintragen
3. `npm test` — Schema-Tests validieren automatisch

## Deployment (iPhone via Tailscale Funnel)

```bash
npm run build
npx serve dist -p 4173
tailscale funnel 4173
```
Öffne die Funnel-URL auf dem iPhone → "Zum Home-Bildschirm" → fertig.
