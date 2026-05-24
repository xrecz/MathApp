# Phase G — Diagnose-Befunde

## Umgebung

- Build: `npm run build` → ✅ grün
- Tests: 124/124 grün
- KaTeX-Version: aus `node_modules/katex` (via vite-plugin-static-copy)
- vite.config.ts: `base: './'`

---

## BUG-1 (KRITISCH) — KaTeX rendert nicht

### Root Cause (verifiziert durch Code-Analyse)

`index.html` lädt **nur die KaTeX-CSS**, aber **keine KaTeX-JS-Scripts**:

```html
<!-- index.html — CSS ist da, aber kein <script> für JS! -->
<link rel="stylesheet" href="/katex/katex.min.css">
```

`vite-plugin-static-copy` kopiert `katex.min.js` und `auto-render.min.js` nach
`dist/katex/`, aber **kein `<script>`-Tag lädt sie jemals**.

Folge: `lib/katex.ts` prüft `if (!window.renderMathInElement) return` — da
`window.renderMathInElement` immer `undefined` ist, macht die Funktion nichts.
Alle `renderMath(el)`-Aufrufe in `LessonScreen.ts` (Zeilen 149, 210, 382) laufen
ins Leere.

Zusatzproblem: `/katex/katex.min.css` ist ein absoluter Pfad. Mit `base: './'`
und GitHub-Pages-Deployment unter `/MathApp/` würde der Browser
`https://domain/katex/katex.min.css` statt
`https://domain/MathApp/katex/katex.min.css` anfordern → 404.

### Fix

KaTeX als ES-Modul importieren — Vite bündelt CSS und Fonts automatisch.

---

## BUG-2 (KRITISCH) — PWA Standalone fehlerhaft

### Root Cause

`vite.config.ts` Manifest:
```ts
start_url: '.',   // relativ — iOS interpretiert unzuverlässig
scope: '.',       // relativ — iOS ignoriert oft relative Scopes
// kein 'id' Feld
```

Mit `base: './'` erzeugt vite-plugin-pwa ein `manifest.webmanifest`
mit `"start_url": "."`. Apple-iOS erwartet **absolute Pfade** für
`start_url`, `scope`, `id`.

Außerdem: `<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">` —
absoluter Pfad, der auf GitHub Pages (`/MathApp/`) 404 liefert.

---

## BUG-3 (HIGH) — Router ignoriert Base-Path

### Root Cause

`app.ts` Zeile 123:
```ts
const currentPath = window.location.pathname
// → '/MathApp/' auf GitHub Pages, aber Matching erwartet '/'
```

`navigate()` in `store.ts`:
```ts
window.history.pushState({}, '', path)  // path = '/', schreibt '/' statt '/MathApp/'
```

`popstate` Handler:
```ts
store.set('route', window.location.pathname)  // speichert '/MathApp/' statt '/'
```

Resultat: Nach `navigate('/')` ist URL `/`, nicht `/MathApp/`. Beim Neuladen → 404.

---

## BUG-4 (HIGH) — Submit-Button verdeckt

### Root Cause

`renderPractice` nutzt `sticky bottom-0` für den Action-Bar. Auf iOS Safari
(nicht-Standalone) mit unterer Toolbar deckt die Browser-UI den sticky-Container.

`pb-safe-4` (max(16px, var(--safe-bottom))) berücksichtigt den iOS Home-Indicator,
aber **nicht die Safari-Toolbar-Höhe** (~49px) im Nicht-Standalone-Modus.

`renderBlocks` und `renderIntro` nutzen `fixed bottom-6 right-4 left-4` — konsistenter,
aber auch ohne explizites `env(safe-area-inset-bottom)` bei Safari-Toolbar.

---

## BUG-5 (MEDIUM) — Update-/Backup-Banner unter Status-Bar

### Root Cause

`setupSWUpdateNotification` und `checkBackupReminder` in `main.ts` erstellen
Divs mit `fixed top-0 left-0 right-0`. `body { padding-top: var(--safe-top) }`
gilt nicht für `position: fixed` Elemente — diese beginnen absolut ab `top: 0`,
also unter der Status-Bar.

---

## Zusammenfassung Fix-Reihenfolge

| Prio | Bug | Fix |
|------|-----|-----|
| 1 | KaTeX JS fehlt | ES-Modul-Import in `lib/katex.ts`, `vite.config.ts` |
| 2 | Base-Path falsch | `base: '/MathApp/'`, Router-Fix, Manifest-Fix |
| 3 | Standalone-Mode | Manifest start_url/scope/id absolut |
| 4 | Safe-Area Banners | `padding-top: var(--safe-top)` auf fixed Elementen |
| 5 | Submit-Button | `pb-safe-4` + Hinweis auf BUG-2 als Haupt-Fix |
