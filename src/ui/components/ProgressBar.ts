export class ProgressBar extends HTMLElement {
  static observedAttributes = ['value', 'max', 'label']

  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }

  render() {
    const value = parseFloat(this.getAttribute('value') ?? '0')
    const max   = parseFloat(this.getAttribute('max')   ?? '100')
    const label = this.getAttribute('label') ?? ''
    const pct   = max > 0 ? Math.round((value / max) * 100) : 0

    this.innerHTML = `
      <div class="flex items-center gap-2">
        ${label ? `<span class="text-xs text-gray-400 w-28 truncate">${label}</span>` : ''}
        <div class="progress-track flex-1">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="text-xs text-gray-400 w-8 text-right">${pct}%</span>
      </div>`
  }
}

customElements.define('progress-bar', ProgressBar)
