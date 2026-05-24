# Architektur-Entscheidungen

## Keine Zod-Dependency

**Entscheidung**: Eigene Type-Guards statt Zod für Backup-Validierung.

**Begründung**: Zod würde ~50 KB Bundle-Größe hinzufügen. Die Backup-Validierung ist
überschaubar (5 Felder, 2 Versionen) und lässt sich mit einer `typeof`-Prüffunktion
ausreichend absichern. Bei komplexerem Schema wäre Zod sinnvoll.

---

## Gamification-Tabelle vs. Settings

**Entscheidung**: Separate `gamification`-Tabelle (Dexie v2) statt Settings-Tabelle.

**Begründung**: XP/Streak sind häufig gelesen und geschrieben. Eine dedizierte
Tabelle mit `&key`-Primary-Key erlaubt atomare Updates und klare Migration.

---

## renderMarkdown in MathRender.ts

**Entscheidung**: `renderMarkdown` lebt in `ui/components/MathRender.ts`, nicht in `lib/katex.ts`.

**Begründung**: Die Funktion erzeugt HTML mit Tailwind-Klassen — das ist UI-Logik,
nicht Library-Logik. Importiert von Screens und HintsAccordion.

---

## Keine Graph-Library für TopicMap

**Entscheidung**: Eigene 100-LoC SVG-Darstellung ohne D3.js o.Ä.

**Begründung**: D3 würde ~200 KB hinzufügen. Das Layered-Layout ist trivial (Phase = X,
Topic-Index = Y). Für Phase 0 mit 2 Topics reicht das vollständig; für spätere Phasen
mit mehr Nodes kann man auf ein dediziertes Layout upgraden.
