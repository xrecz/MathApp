# STATUS

## Phase A — Verifiziert am 2026-05-24

- Build: ✅ `npm run build` ohne Fehler
- Tests: 40/40 grün (srs, matcher, mastery, content.schema)
- Lektionen: 3 (Phase 0: Brüche, Lineare Funktionen, Erste Ableitungen)
- Service Worker: precached 41 Einträge (750.77 KiB unkomprimiert)
- Bundle-Size: ~59 KB gzipped initial JS-Chunk

---

## Phase B — Abgeschlossen am 2026-05-24

| Sub-Phase | Status | Beschreibung |
|-----------|--------|--------------|
| B0 | ✅ | Voraussetzungs-Check bestanden, STATUS.md erstellt |
| B1 | ✅ | Review-Queue vollständig (FSRS-6, Auto-Enrollment, 6 Integrationstests) |
| B2 | ✅ | Streak / XP / Daily-Goal (Dexie v2, gamification-Tabelle, v1→v2 Migration) |
| B3 | ✅ | Topic-Map-Screen (SVG-Graph, Mastery-Farben, Phase-Tabs, Bottom-Sheet) |
| B4 | ✅ | Backup-Reminder (>14 Tage Banner), BackupV2-Format, Import-Hardening |
| B5 | ✅ | UX-Polish (Haptics, Skeletons, Error Boundary, CSS-Animationen) |
| B6 | ✅ | PWA-Robustheit (Persistent Storage, Storage-Quota, SW-Update-Banner) |
| B7 | ✅ | iPhone-Checkliste in `docs/IPHONE_TEST_CHECKLIST.md` |

### Phase-B-Ergebnisse

- **Tests**: 70/70 grün (8 Test-Dateien; +4 neue: session, backup, srs.integration, topicmap)
- **Build**: ✅ sauber, keine TypeScript-Fehler (strict mode)
- **Bundle**: 198.92 kB → **63.44 KB gzipped** (Ziel: <500 KB ✅)
- **Precache**: 41 Einträge (774.91 KiB)
- **Neue Features**:
  - Dexie v2-Schema mit `gamification`- und `errors`-Tabelle
  - FSRS-6 Review-Queue mit Rating-Buttons und XP-Vergabe
  - Streak/XP/Daily-Goal mit SVG-Fortschrittsring auf HomeScreen
  - TopicMap SVG-Graph mit Bézier-Kanten und Mastery-Farbkodierung
  - BackupV2-Format (`version: 2`) mit v1-Migration und Validierung
  - Globale Error-Boundary mit rolling-50-Log in IndexedDB
  - SW-Update-Banner via `controllerchange`
  - Backup-Reminder-Banner (>14 Tage ohne Export)
  - 4-Tab-Bottom-Navigation mit Safe-Area-Support
  - CSS-Animationen: `block-transition`, `feedback-animate`, `answer-reveal`
  - `prefers-reduced-motion` respektiert

---

## Phase C — Abgeschlossen am 2026-05-24

| Sub-Phase | Status | Beschreibung |
|-----------|--------|--------------|
| C0 | ✅ | Voraussetzungs-Check, Stil-Analyse der Seed-Lektionen, Topic-Struktur in `phase0/index.ts` |
| C1 | ✅ | Rechen-Fundament: Potenzen & Wurzeln, Termumformungen, Quadratische Gleichungen, Ungleichungen |
| C2 | ✅ | Funktionen-Erweiterung: Quadratische Funktionen, Exponentialfunktionen, Logarithmus, Trigonometrie |
| C3 | ✅ | Vektoren-Brücke: Vektoren im Raum, Skalarprodukt & Cosine-Similarity |
| C4 | ✅ | Notation & Logik: Mengen & Quantoren, Mathematische ML-Notation |
| C5 | ✅ | Statistik-Grundlagen: Mittelwert/Median/Varianz, Wahrscheinlichkeit, Histogramme |

### Phase-C-Ergebnisse

- **Lektionen**: 18 gesamt (3 Seed + 15 neu)
- **Aufgaben**: 93 Übungsaufgaben (5–6 pro Lektion)
- **Review-Cards**: 54 gesamt (3 pro Lektion)
- **Tests**: 88/88 grün (+18 Schema-Tests für alle Lektionen)
- **Build**: ✅ sauber, keine TypeScript-Fehler (strict mode)
- **Bundle**: Initial-Chunk **27.30 KB gzipped** ✅ (Ziel: <100 KB)
- **Lazy-Chunk Phase 0**: 58.00 KB gzipped (Code-Split ✅)
- **Topics**: 5 (Rechen-Fundament, Funktionen, Vektoren, Notation & Logik, Statistik)
- **ML-Bezüge** (je Lektion):
  - L2-Norm, L2-Regularisierung (Potenzen)
  - MSE-Loss & Backpropagation (Termumformungen)
  - Lineare Regression, Minimum (Quadratische Gleichungen)
  - Lernraten-Constraint, KKT-Bedingungen (Ungleichungen)
  - Gradient Descent, Loss-Parabel (Quadratische Funktionen)
  - Sigmoid, Softmax (Exponentialfunktionen)
  - Cross-Entropy-Loss (Logarithmus)
  - Positional Encodings, Cosine-Similarity (Trigonometrie)
  - Embeddings, Vektorräume (Vektoren)
  - Attention-Mechanismus, QKV (Skalarprodukt)
  - Paper-Notation, Constraint-Formulierungen (Mengen & Logik)
  - argmax-Vorhersage, Funktionssignaturen (Notation)
  - Batch Normalization, Z-Score (Statistik)
  - Softmax-Output-Verteilung (Wahrscheinlichkeit)
  - Aktivierungs-Histogramme, Loss-Diagnose (Histogramme)
