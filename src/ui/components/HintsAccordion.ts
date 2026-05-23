import { renderMath } from '../../lib/katex'
import { renderMarkdown } from './MathRender'

export class HintsAccordion extends HTMLElement {
  private hints: [string, string, string] = ['', '', '']
  private revealed = 0
  private onReveal?: (level: number) => void

  setHints(hints: [string, string, string], onReveal?: (level: number) => void): void {
    this.hints = hints
    this.revealed = 0
    this.onReveal = onReveal
    this.render()
  }

  connectedCallback() { this.render() }

  private render(): void {
    this.innerHTML = `
      <div class="mt-2">
        <div id="hints-list" class="space-y-2">
          ${this.hints.slice(0, this.revealed).map((h, i) =>
            `<div class="text-sm bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
              <span class="text-yellow-400 font-semibold">Hinweis ${i + 1}:</span>
              <span class="math-hint ml-1">${renderMarkdown(h)}</span>
            </div>`
          ).join('')}
        </div>
        ${this.revealed < 3 ? `
          <button id="hint-btn" class="btn-secondary text-sm w-full mt-2 text-yellow-400">
            💡 Hinweis ${this.revealed + 1} anzeigen
          </button>` : ''}
      </div>`

    this.querySelectorAll('.math-hint').forEach(el => renderMath(el as HTMLElement))
    this.querySelector('#hint-btn')?.addEventListener('click', () => this.revealNext())
  }

  private revealNext(): void {
    if (this.revealed >= 3) return
    this.revealed++
    this.onReveal?.(this.revealed)
    this.render()
  }
}

customElements.define('hints-accordion', HintsAccordion)
