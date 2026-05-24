# Hotfix H — Diagnose

## Blocking Step

`deploy.yml` enthält nach Phase G6 diesen Step:

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run E2E tests
  run: npx playwright test --project=desktop-chrome
  env:
    CI: true
```

## Root Cause

`playwright.config.ts` konfiguriert `webServer.command: 'npm run dev'` mit
`reuseExistingServer: !process.env['CI']`. In CI ist `CI=true` → kein Reuse →
Playwright versucht Dev-Server zu starten. Das schlägt fehl weil:

1. Dev-Server braucht Zeit, Playwright-Timeout zu kurz
2. E2E-Tests erwarten `/MathApp/`-Base-Path aber ohne korrekte Server-Config
3. Playwright-Browser-Download (~600 MB) kann in CI scheitern oder langsam sein

## Fehlerhaftes Design

Deploy-Workflow blockiert durch E2E-Tests, die:
- Infrastruktur-Probleme (Browser-Download) haben können
- Flaky sein können (Timings, Netzwerk)
- Keinen Grund haben, Production-Deploy zu blockieren

## Fix

Deploy von E2E entkoppeln:
- `deploy.yml`: nur Unit-Tests + Build (deterministisch, schnell)
- `e2e.yml`: separater Workflow, `continue-on-error: true`, informativ
