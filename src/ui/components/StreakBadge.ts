export class StreakBadge extends HTMLElement {
  static observedAttributes = ['count']

  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }

  render() {
    const count = parseInt(this.getAttribute('count') ?? '0', 10)
    const active = count > 0

    this.innerHTML = `
      <div class="flex items-center gap-1 px-2 py-1 rounded-lg ${active ? 'bg-orange-500/20' : 'bg-surface-700'}">
        <span class="text-lg" aria-hidden="true">${active ? '🔥' : '💤'}</span>
        <span class="font-bold text-sm ${active ? 'text-orange-400' : 'text-gray-500'}">${count}</span>
      </div>`
  }
}

customElements.define('streak-badge', StreakBadge)
