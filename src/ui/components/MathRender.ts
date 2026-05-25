import { renderMath } from '../../lib/katex'
export { renderMarkdown, renderBlock } from '../../lib/markdown'
import { renderMarkdown } from '../../lib/markdown'

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
