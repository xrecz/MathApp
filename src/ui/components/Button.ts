export class AppButton extends HTMLElement {
  static observedAttributes = ['variant', 'disabled', 'label']

  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }

  render() {
    const variant = this.getAttribute('variant') ?? 'primary'
    const disabled = this.hasAttribute('disabled')
    const label = this.getAttribute('label') ?? this.textContent ?? ''
    const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

    this.innerHTML = `<button class="${cls} w-full" ${disabled ? 'disabled' : ''}>${label}</button>`

    this.querySelector('button')?.addEventListener('click', (e) => {
      if (!disabled) this.dispatchEvent(new CustomEvent('app-click', { bubbles: true, detail: e }))
    })
  }
}

customElements.define('app-button', AppButton)
