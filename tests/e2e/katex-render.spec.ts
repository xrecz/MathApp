import { test, expect } from '@playwright/test'

test('home route loads without 404', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Seite nicht gefunden')).not.toBeVisible({ timeout: 5000 })
  await expect(page.locator('#app')).toBeVisible()
})

test('KaTeX renders in lesson p0.brueche', async ({ page }) => {
  await page.goto('/lesson/p0.brueche')
  // Wait for lesson content to appear
  await page.waitForSelector('.top-bar', { timeout: 10_000 })

  // Advance to content blocks (INTRO → CONCEPT)
  const startBtn = page.locator('#start-btn')
  if (await startBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await startBtn.click()
  }

  // Wait for math content to render
  await page.waitForTimeout(1000)

  // KaTeX rendered elements should exist
  const katexCount = await page.locator('.katex').count()
  expect(katexCount).toBeGreaterThan(0)

  // No raw LaTeX delimiters visible in text
  const bodyText = await page.locator('body').textContent() ?? ''
  expect(bodyText).not.toContain('\\frac')
  expect(bodyText).not.toContain('\\sqrt')
  expect(bodyText).not.toContain('\\sum')
})

test('manifest is loadable with correct standalone config', async ({ page }) => {
  const res = await page.goto('/manifest.webmanifest')
  expect(res?.status()).toBe(200)
  const manifest = await res?.json() as Record<string, unknown>
  expect(manifest['display']).toBe('standalone')
  const startUrl = String(manifest['start_url'] ?? '')
  expect(startUrl).toMatch(/MathApp/)
})

test('router handles base path correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Seite nicht gefunden')).not.toBeVisible({ timeout: 5000 })
})

test('router navigates to lesson and back', async ({ page }) => {
  await page.goto('/')
  // App should be interactive
  await expect(page.locator('#app')).toBeVisible()
  await page.goto('/lesson/p0.brueche')
  await page.waitForSelector('.top-bar', { timeout: 10_000 })
  // Back button should navigate home
  await page.locator('#back-btn').first().click()
  await page.waitForURL(/\/$/, { timeout: 5000 })
})
