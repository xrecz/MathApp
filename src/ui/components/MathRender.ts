import { renderMath } from '../../lib/katex'

export class MathRender extends HTMLElement {
  static observedAttributes = ['content', 'display']

  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }

  render() {
    const content = this.getAttribute('content') ?? this.textContent ?? ''
    const display = this.hasAttribute('display')

    if (display) {
      this.innerHTML = `<div class="katex-display">${renderMarkdown(content)}</div>`
    } else {
      this.innerHTML = renderMarkdown(content)
    }
    renderMath(this)
  }
}

customElements.define('math-render', MathRender)

export function renderMarkdown(text: string): string {
  // Basic escape
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  let html = escaped
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-2">')

  // Handle table-like content (simple pass-through)
  if (html.includes('|')) {
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim() && !c.match(/^[-\s]+$/))
      return `<span class="inline-block">${cells.map(c => `<span class="px-2">${c.trim()}</span>`).join(' | ')}</span>`
    })
  }

  return `<p class="mb-2">${html}</p>`
}

export function renderBlock(kind: string, content: string, caption?: string): string {
  const captionHtml = caption
    ? `<p class="text-xs text-gray-400 mt-1 text-center">${caption}</p>`
    : ''

  switch (kind) {
    case 'math':
      return `<div class="my-4 overflow-x-auto text-center math-block">${content}${captionHtml}</div>`
    case 'callout':
      return `<div class="card border border-brand-500/30 bg-brand-900/20 my-4">
        <div class="text-sm math-block">${renderMarkdown(content)}</div>
      </div>${captionHtml}`
    case 'worked-example':
      return `<div class="card border border-yellow-500/30 bg-yellow-900/10 my-4">
        <div class="text-sm math-block">${renderMarkdown(content)}</div>
      </div>${captionHtml}`
    case 'svg':
      return `<div class="my-4 flex justify-center">${content}${captionHtml}</div>`
    default:
      return `<div class="math-block my-2">${renderMarkdown(content)}</div>${captionHtml}`
  }
}
