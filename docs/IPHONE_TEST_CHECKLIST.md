# iPhone Test Checklist — Phase B

## Voraussetzungen (Entwickler-Setup)

```bash
# 1. MSI: Vite Dev-Server starten
npm run dev -- --host 0.0.0.0

# 2. Tailscale HTTPS-Tunnel (Port 5173)
tailscale serve --bg --https=443 5173
# → App ist unter https://<dein-hostname>.ts.net erreichbar

# 3. iPhone: Tailscale-App installiert, eingeloggt, MagicDNS aktiv
# 4. Safari: https://<hostname>.ts.net öffnen
```

---

## Installation

- [ ] PWA via Safari öffnen (HTTPS nötig für Service Worker)
- [ ] "Teilen → Zum Home-Bildschirm" funktioniert
- [ ] Icon korrekt angezeigt (kein Default-Globus)
- [ ] App startet im Standalone-Modus (keine Safari-UI sichtbar)
- [ ] Status-Bar lesbar (`black-translucent`)
- [ ] Safe-Area (Notch/Home-Indicator) wird respektiert — kein Inhalt darunter

---

## Lernfluss (🤖 automatisierbar)

- [x] Build ohne Fehler: `npm run build`
- [x] 70/70 Unit-Tests grün
- [ ] HomeScreen lädt schnell (< 1 s bei 4G)
- [ ] Tap auf Phase 0 → öffnet TopicMap
- [ ] Tap auf Lektion → öffnet LessonScreen
- [ ] INTRO-Screen: Lektion-Metadaten sichtbar, "Starten"-Button reagiert
- [ ] ZEIGEN-Block: KaTeX-Formeln rendern ohne FOUC
- [ ] BEISPIEL-Block: Worked-Example-Karte korrekt formatiert
- [ ] PRACTICE: Aufgabe 1 (MC) — Optionen tippbar auf Touch
- [ ] PRACTICE: Aufgabe 2 (Numeric) — Zahlentastatur öffnet sich automatisch
- [ ] PRACTICE: Aufgabe 5 (Symbolic) — Math-Keyboard erscheint
- [ ] Hint-Button: zeigt Hinweis Stufe 1 → 2 → 3 → dann deaktiviert
- [ ] Richtige Antwort: grüner Banner + `answer-reveal`-Animation
- [ ] Falsche Antwort: roter Banner + Misconception-Text erscheint
- [ ] Nach N-CCR=3 richtigen: DEEPEN-Block öffnet sich
- [ ] DEEPEN → COMPLETE: "Lektion abgeschlossen!"-Screen

---

## Persistenz (iPhone-seitig)

- [ ] App vollständig schließen (aus App-Switcher wischen) → erneut öffnen
- [ ] Fortschritt (Mastery-Level) noch da
- [ ] Streak-Counter korrekt
- [ ] XP-Counter korrekt
- [ ] Tagesziel-Ring zeigt richtigen Prozentsatz

---

## Offline (kritisch für PWA)

- [ ] iPhone in Flugmodus versetzen
- [ ] App vom Home-Screen starten → vollständig geladen
- [ ] Alle 3 Phase-0-Lektionen sind spielbar (kein Netzwerk-Fehler)
- [ ] KaTeX-Formeln rendern ohne Netzwerk
- [ ] Network-Tab in Safari Developer Tools: 0 externe Requests
- [ ] Service Worker aktiv: Application → Service Workers → "Activated"

---

## Review-Queue (FSRS)

- [ ] Nach Lektion-Abschluss: "Wiederholungen fällig"-Banner auf HomeScreen
- [ ] Review-Screen: Karten-Counter "X von Y" korrekt
- [ ] "Antwort zeigen" → Rückseite erscheint mit `answer-reveal`-Animation
- [ ] Rating-Buttons: "Nochmal" / "Schwer" / "Gut" / "Leicht" alle tippbar
- [ ] Nach Rating: nächste Karte erscheint oder "Alle Karten wiederholt!"
- [ ] App-Reload: Review-Schedule überlebt (Daten in IndexedDB)

---

## Backup & Daten

- [ ] Profil-Tab → "Backup exportieren": JSON-Datei wird in "Dateien" gespeichert
- [ ] JSON öffnen: enthält `version: 2`, `progress`, `reviewState`, `gamification`
- [ ] "Backup importieren": Datei auswählen → Bestätigung → Daten korrekt restored
- [ ] "Alles löschen": Bestätigung → App reset auf leer

---

## UX-Details

- [ ] Bottom-Navigation: 4 Tabs sichtbar, aktiver Tab hervorgehoben
- [ ] Bottom-Navigation: Touch-Targets groß genug (mind. 44×44 pt)
- [ ] Dark Mode: automatisch wenn iPhone auf "Dunkel" eingestellt
- [ ] Schriftgröße S/M/L im Profil umschaltbar, App reagiert sofort
- [ ] Backup-Banner nach >14 Tagen ohne Export sichtbar (Testbar: DB-Reset)
- [ ] SW-Update-Banner erscheint nach neuer Build-Version

---

## Lighthouse (Desktop Chrome DevTools, simuliertes Mobile)

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] PWA: Installable = ✓, Offline = ✓

---

## Bekannte Einschränkungen

- `navigator.vibrate()` wird von iOS Safari teils ignoriert — Haptics sind optional/best-effort
- KaTeX-Fonts werden aus dem Service-Worker-Cache geladen (kein CDN)
- IndexedDB-Quota auf iOS: ca. 50 % des freien Speicherplatzes (via `navigator.storage.estimate()` sichtbar)
