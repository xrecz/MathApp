/**
 * Pure markdown-to-HTML helpers — no DOM dependencies, safe to unit-test in Node.
 *
 * IMPORTANT: after calling renderMarkdown(), always call renderMath(container) on
 * the element that received the result so KaTeX can process the restored math blocks.
 */

export function renderMarkdown(text: string): string {
  // Step 1: Extract math blocks to protect them from markdown transforms.
  // \| (LaTeX norm notation) inside $...$ would be mangled by the table-row
  // regex below if left in place. Replace with STX-delimited placeholders.
  const slots: string[] = []
  const safe = text.replace(
    /\$\$[\s\S]*?\$\$|\$[^\n$]+?\$/g,
    m => { slots.push(m); return `\x02${slots.length - 1}\x02` }
  )

  // Step 2: HTML-escape only the non-math portions
  const esc = safe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Step 3: Block transforms (headings + bold)
  let html = esc
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')

  // Step 4: Bullet list conversion — must run before paragraph splitting so that
  // '- item' lines are wrapped in <ul><li> before \n\n becomes </p><p>
  const lines = html.split('\n')
  let inList = false
  const out: string[] = []
  for (const line of lines) {
    if (line.startsWith('- ')) {
      if (!inList) { out.push('<ul class="my-2 space-y-1 list-disc list-inside">'); inList = true }
      out.push(`<li>${line.slice(2)}</li>`)
    } else {
      if (inList) { out.push('</ul>'); inList = false }
      out.push(line)
    }
  }
  if (inList) out.push('</ul>')
  html = out.join('\n')

  // Step 5: Paragraph splitting
  html = html.replace(/\n\n/g, '</p><p class="mb-2">')

  // Step 6: Markdown table rows — anchored to line start/end to avoid matching
  // LaTeX constructs like \| inside inline math
  html = html.replace(/^\|(.+)\|$/gm, match => {
    const cells = match.split('|').filter(c => c.trim() && !c.match(/^[-\s]+$/))
    return cells.length > 0
      ? `<span class="inline-block">${cells.map(c => `<span class="px-2">${c.trim()}</span>`).join(' | ')}</span>`
      : match
  })

  // Step 7: Restore math blocks (KaTeX auto-render will process them afterwards)
  html = html.replace(/\x02(\d+)\x02/g, (_, i) => slots[+i])

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
