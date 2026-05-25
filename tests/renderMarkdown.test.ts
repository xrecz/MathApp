import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../src/lib/markdown'

describe('renderMarkdown', () => {
  it('preserves inline math with \\| norm notation intact', () => {
    const html = renderMarkdown('Die Norm $\\|x\\| = 5$')
    expect(html).toContain('$\\|x\\| = 5$')
    expect(html).not.toContain('<span class="px-2">')
  })

  it('preserves display math with \\| norm notation intact', () => {
    const html = renderMarkdown('Formel:\n\n$$\\|x\\| = \\sqrt{x_1^2 + x_2^2}$$')
    expect(html).toContain('$$\\|x\\| = \\sqrt{x_1^2 + x_2^2}$$')
    expect(html).not.toContain('<span class="px-2">')
  })

  it('preserves inline math with \\frac intact', () => {
    const html = renderMarkdown('MSE: $\\frac{1}{n}\\|\\hat{y} - y\\|^2$')
    expect(html).toContain('$\\frac{1}{n}\\|\\hat{y} - y\\|^2$')
  })

  it('still processes actual markdown table rows', () => {
    const html = renderMarkdown('| A | B |\n| --- | --- |\n| 1 | 2 |')
    expect(html).toContain('<span class="px-2">')
  })

  it('renders bold text correctly', () => {
    const html = renderMarkdown('**Wichtig**: text')
    expect(html).toContain('<strong class="font-semibold">Wichtig</strong>')
  })

  it('renders bullet lists as <ul><li>', () => {
    const html = renderMarkdown('Items:\n- Eins\n- Zwei\n- Drei')
    expect(html).toContain('<ul')
    expect(html).toContain('<li>Eins</li>')
    expect(html).toContain('<li>Zwei</li>')
    expect(html).toContain('<li>Drei</li>')
  })

  it('renders bullet list items that contain math', () => {
    const html = renderMarkdown('- MSE: $\\frac{1}{n}\\|y\\|^2$\n- L2: $\\|w\\|^2$')
    expect(html).toContain('<li>')
    expect(html).toContain('$\\frac{1}{n}\\|y\\|^2$')
    expect(html).toContain('$\\|w\\|^2$')
    expect(html).not.toContain('<span class="px-2">')
  })

  it('HTML-escapes non-math content', () => {
    const html = renderMarkdown('a &lt; b und a > b')
    expect(html).toContain('&amp;lt;')
    expect(html).toContain('&gt;')
  })

  it('does not HTML-escape content inside math blocks', () => {
    const html = renderMarkdown('$a > b$')
    // > inside math must remain as-is for KaTeX to render it
    expect(html).toContain('$a > b$')
  })

  it('renders headings', () => {
    const html = renderMarkdown('## Überschrift')
    expect(html).toContain('<h2 class="text-xl font-bold mt-5 mb-2">Überschrift</h2>')
  })

  it('splits double newlines into paragraphs', () => {
    const html = renderMarkdown('Absatz 1\n\nAbsatz 2')
    expect(html).toContain('</p><p class="mb-2">')
  })
})
