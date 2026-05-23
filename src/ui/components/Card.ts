export class AppCard extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('card')) {
      this.classList.add('card')
    }
  }
}

customElements.define('app-card', AppCard)
