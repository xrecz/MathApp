# UX-Hotfix: Diagnose

## Befund UX0

### BUG-UX1 (Critical) — Buttons unter Bottom-Nav

**Ursache**: Alle Lesson-Action-Buttons verwenden `position: fixed; bottom: 24px (bottom-6)`.
Die Bottom-Nav ist `position: fixed; bottom: 0; height ≈ 56px (Inhalt) + env(safe-area-inset-bottom)`.
Auf iPhone (safe-area-inset-bottom ≈ 34px): Nav-Höhe ≈ 90px. Button bei bottom-6 = 24px ist
vollständig hinter der Nav verborgen.

Betroffene Screens:
- `renderIntro`: `fixed bottom-6 right-4 left-4` → Button "Starten" nicht sichtbar ❌
- `renderBlocks`: `fixed bottom-6 right-4 left-4` → Button "Weiter" nicht sichtbar ❌

Teilweise betroffen:
- `renderPractice`: `sticky bottom-0 pb-safe-4` → hat keinen z-index (Standard: auto/0),
  Bottom-Nav hat z-30 → Nav überlagert Submit-Button ❌

### BUG-UX2 — Lesson-Intro visuell mager

- Nur Emoji (📐 hardcoded), Titel, Meta-Zeile und Tags
- Kein Mastery-Indikator
- Keine Voraussetzungen
- Großer leerer Bereich zwischen Tags und Button

### BUG-UX3 — `#content` padding-bottom auch in Lesson-Flow

`#content` hat immer `pb-16` (64px Platz für Bottom-Nav). In Lesson-Screens ist
das unnötiger Leerraum unter dem letzten Content-Element.

---

## Fix-Plan

| Sub | Fix |
|-----|-----|
| UX1 | `data-in-lesson` auf body → Bottom-Nav per CSS ausblenden |
| UX1 | `.action-bar` CSS-Klasse: `position: sticky; bottom: 0; z-index: 20` |
| UX1 | Alle Lesson-Buttons von `fixed bottom-6…` auf `.action-bar` umstellen |
| UX2 | `renderIntro` neu: Hero (Emoji + Titel + Meta + Mastery-Dots) + Prereqs + Tags |
| UX3 | CSS: `body[data-in-lesson="true"] #content { padding-bottom: 0 }` |
