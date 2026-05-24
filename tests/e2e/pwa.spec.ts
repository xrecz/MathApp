import { test, expect } from '@playwright/test'

test('manifest exists and has required PWA fields', async ({ page }) => {
  const res = await page.goto('/manifest.webmanifest')
  expect(res?.status()).toBe(200)

  const manifest = await res?.json() as Record<string, unknown>
  expect(manifest['name']).toBeTruthy()
  expect(manifest['display']).toBe('standalone')
  expect(manifest['start_url']).toBeTruthy()
  expect(manifest['scope']).toBeTruthy()
  expect(manifest['id']).toBeTruthy()

  // Icons present
  const icons = manifest['icons'] as Array<Record<string, string>>
  expect(icons.length).toBeGreaterThanOrEqual(2)
})

test('apple-touch-icon link exists in HTML', async ({ page }) => {
  await page.goto('/')
  const touchIcon = page.locator('link[rel="apple-touch-icon"]')
  await expect(touchIcon).toHaveCount(1)
  const href = await touchIcon.getAttribute('href')
  expect(href).toBeTruthy()
})

test('apple-mobile-web-app-capable meta tag present', async ({ page }) => {
  await page.goto('/')
  const meta = page.locator('meta[name="apple-mobile-web-app-capable"]')
  await expect(meta).toHaveCount(1)
  const content = await meta.getAttribute('content')
  expect(content).toBe('yes')
})
