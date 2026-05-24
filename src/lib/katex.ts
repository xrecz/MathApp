import katex from 'katex'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'

const DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$',  right: '$',  display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
]

export function renderMath(el: HTMLElement): void {
  renderMathInElement(el, {
    delimiters: DELIMITERS,
    throwOnError: false,
    errorColor: '#cc0000',
    strict: false,
  })
}

export function texToHtml(tex: string, display = false): string {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false })
  } catch {
    return tex
  }
}
