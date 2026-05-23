declare global {
  interface Window {
    katex: {
      renderToString(tex: string, opts?: Record<string, unknown>): string
      render(tex: string, el: HTMLElement, opts?: Record<string, unknown>): void
    }
    renderMathInElement?: (el: HTMLElement, opts?: Record<string, unknown>) => void
  }
}

const KATEX_OPTS = {
  throwOnError: false,
  displayMode: false,
  strict: false,
}

export function renderMath(el: HTMLElement): void {
  if (!window.renderMathInElement) return
  window.renderMathInElement(el, {
    ...KATEX_OPTS,
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
  })
}

export function texToHtml(tex: string, display = false): string {
  if (!window.katex) return tex
  try {
    return window.katex.renderToString(tex, { ...KATEX_OPTS, displayMode: display })
  } catch {
    return tex
  }
}

