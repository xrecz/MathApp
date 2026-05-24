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
