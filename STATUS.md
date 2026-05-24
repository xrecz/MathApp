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

---

## Phase D — Abgeschlossen am 2026-05-24

| Sub-Phase | Status | Beschreibung |
|-----------|--------|--------------|
| D1 | ✅ | Lektionen 01–02: Vektoren (formal), Norm & Skalarprodukt |
| D2 | ✅ | Lektionen 03–05: Matrizen, Matrix-Multiplikation, Inverse & Transponierte |
| D3 | ✅ | Lektionen 06–08: LGS & Gauß, Vektorräume/Basis/Rang, Determinante |
| D4 | ✅ | Lektionen 09–10: Eigenwerte & Eigenvektoren, Spektraltheorem |
| D5 | ✅ | Lektionen 11–12 + Aggregator + Schema-Tests |

### Phase-D-Ergebnisse

- **Lektionen**: 30 gesamt (18 Phase-0 + 12 Phase-1-LinAlg)
- **Aufgaben**: 75 neue Übungsaufgaben (5–7 pro Lektion, inkl. 7 in SVD)
- **Review-Cards**: 36 neu (3 pro Lektion)
- **Tests**: 102/102 grün
- **Build**: ✅ sauber, strict mode
- **Bundle**: Initial-Chunk 27.30 KB gzip ✅, Phase-1-LinAlg-Chunk 25.29 KB gzip ✅

---

## Phase E — Abgeschlossen am 2026-05-24

| Sub-Phase | Status | Beschreibung |
|-----------|--------|--------------|
| E0 | ✅ | Voraussetzungs-Check, Calculus-Verzeichnis, Topic-Integration |
| E1 | ✅ | Grundlagen: Grenzwerte, Ableitung als Konzept |
| E2 | ✅ | Regelwerk: Ableitungsregeln, Kettenregel |
| E3 | ✅ | ML-Funktionen: Aktivierungsableitungen, Extrema & Taylor |
| E4 | ✅ | Multivariate Calculus: Multivariable Funktionen, Partielle Ableitungen |
| E5 | ✅ | Backpropagation: Multivariate Kettenregel, Jacobi & Hesse |

### Phase-E-Ergebnisse

- **Lektionen**: 40 gesamt (18 Phase-0 + 12 LinAlg + 10 Calculus)
- **Aufgaben**: 62 neue Übungsaufgaben (5–7 pro Lektion)
- **Review-Cards**: 30 neu (3 pro Lektion)
- **Tests**: 113/113 grün
- **Build**: ✅ sauber, strict mode

---

## Phase F — Gestartet am 2026-05-24

| Sub-Phase | Status | Beschreibung |
|-----------|--------|--------------|
| F0 | ✅ | Voraussetzungs-Check, Stochastik-Verzeichnis, STATUS.md |
| F1 | ⬜ | Zufallsvariablen, PMF/PDF/CDF |
| F2 | ⬜ | Diskrete & Kontinuierliche Verteilungen |
| F3 | ⬜ | Erwartungswert & Varianz, Kovarianz & Multivariate Gauß |
| F4 | ⬜ | Bedingte Wahrscheinlichkeit, Bayes-Theorem |
| F5 | ⬜ | MLE (= Cross-Entropy), MAP & Regularisierung & Bias-Varianz |
