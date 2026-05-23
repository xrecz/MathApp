import { hapticTap } from '../../lib/haptics'

const ROWS = [
  ['7', '8', '9', '/', '(', ')', '⌫'],
  ['4', '5', '6', '×', '^', '√', 'π'],
  ['1', '2', '3', '−', 'x', '=', '↵'],
  ['0', '.', ',', '+', 'y', 'abc', ''],
]

export class MathKeyboard extends HTMLElement {
  private target: HTMLInputElement | null = null

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick)
  }

  setTarget(input: HTMLInputElement): void {
    this.target = input
  }

  private render(): void {
    this.className = 'block bg-surface-800 border-t border-surface-600 p-2'
    this.innerHTML = ROWS.map(row =>
      `<div class="grid grid-cols-7 gap-1 mb-1">
        ${row.map(key => key
          ? `<button type="button" data-key="${key}" class="math-key flex items-center justify-center">${key}</button>`
          : `<span class="h-10"></span>`
        ).join('')}
      </div>`
    ).join('')
  }

  private handleClick = (e: Event) => {
    const target = (e.target as HTMLElement).closest('[data-key]') as HTMLElement | null
    if (!target) return
    const key = target.dataset['key'] ?? ''
    hapticTap()
    this.pressKey(key)
  }

  private pressKey(key: string): void {
    if (!this.target) return

    if (key === '⌫') {
      const val = this.target.value
      this.target.value = val.slice(0, -1)
    } else if (key === '↵') {
      this.target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      return
    } else if (key === 'abc') {
      this.target.focus()
      return
    } else {
      const insert = key === '×' ? '*' : key === '−' ? '-' : key
      const start = this.target.selectionStart ?? this.target.value.length
      const end = this.target.selectionEnd ?? start
      const val = this.target.value
      this.target.value = val.slice(0, start) + insert + val.slice(end)
      this.target.setSelectionRange(start + insert.length, start + insert.length)
    }

    this.target.dispatchEvent(new Event('input', { bubbles: true }))
    this.target.focus()
  }
}

customElements.define('math-keyboard', MathKeyboard)
