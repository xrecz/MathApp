import { describe, it, expect } from 'vitest'

// Mock import.meta.env.BASE_URL for each test scenario
// Tests exercise the toLogicalPath logic directly

function makeToLogicalPath(base: string) {
  const BASE = base.replace(/\/$/, '')
  return function toLogicalPath(pathname: string): string {
    if (BASE && pathname.startsWith(BASE)) {
      const stripped = pathname.slice(BASE.length)
      return stripped === '' ? '/' : stripped.startsWith('/') ? stripped : '/' + stripped
    }
    return pathname || '/'
  }
}

describe('toLogicalPath — base=/MathApp/', () => {
  const toLogicalPath = makeToLogicalPath('/MathApp/')

  it('/MathApp/ → /', () => {
    expect(toLogicalPath('/MathApp/')).toBe('/')
  })

  it('/MathApp → /', () => {
    expect(toLogicalPath('/MathApp')).toBe('/')
  })

  it('/MathApp/lesson/p0.brueche → /lesson/p0.brueche', () => {
    expect(toLogicalPath('/MathApp/lesson/p0.brueche')).toBe('/lesson/p0.brueche')
  })

  it('/MathApp/review → /review', () => {
    expect(toLogicalPath('/MathApp/review')).toBe('/review')
  })

  it('/MathApp/topics/0 → /topics/0', () => {
    expect(toLogicalPath('/MathApp/topics/0')).toBe('/topics/0')
  })

  it('/MathApp/profile → /profile', () => {
    expect(toLogicalPath('/MathApp/profile')).toBe('/profile')
  })
})

describe('toLogicalPath — base=/', () => {
  const toLogicalPath = makeToLogicalPath('/')

  it('/ → /', () => {
    expect(toLogicalPath('/')).toBe('/')
  })

  it('/lesson/p0.brueche → /lesson/p0.brueche', () => {
    expect(toLogicalPath('/lesson/p0.brueche')).toBe('/lesson/p0.brueche')
  })
})

describe('toLogicalPath — empty pathname', () => {
  const toLogicalPath = makeToLogicalPath('/MathApp/')

  it('empty string → /', () => {
    expect(toLogicalPath('')).toBe('/')
  })
})

describe('navigate URL construction', () => {
  function makeFullPath(base: string, path: string): string {
    const BASE = base.replace(/\/$/, '')
    return BASE + (path.startsWith('/') ? path : '/' + path)
  }

  it('/MathApp + / → /MathApp/', () => {
    expect(makeFullPath('/MathApp/', '/')).toBe('/MathApp/')
  })

  it('/MathApp + /lesson/p0.brueche → /MathApp/lesson/p0.brueche', () => {
    expect(makeFullPath('/MathApp/', '/lesson/p0.brueche')).toBe('/MathApp/lesson/p0.brueche')
  })

  it('/ + / → /', () => {
    expect(makeFullPath('/', '/')).toBe('/')
  })

  it('/ + /lesson/x → /lesson/x', () => {
    expect(makeFullPath('/', '/lesson/x')).toBe('/lesson/x')
  })
})
