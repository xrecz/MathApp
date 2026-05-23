import type { Lesson } from '../../types'

export const ersteAbleitungen: Lesson = {
  id: 'p0.ableitungen',
  title: 'Erste Ableitungen',
  conceptTags: ['derivative', 'calculus', 'rate-of-change'],
  estimatedMinutes: 18,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Was ist eine Ableitung?\n\nDie Ableitung $f\'(x)$ beschreibt die **momentane Änderungsrate** einer Funktion an einem Punkt $x$. Geometrisch ist sie die Steigung der **Tangente** an den Graphen im Punkt $(x, f(x))$.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-20 -80 200 160" width="200" height="160" xmlns="http://www.w3.org/2000/svg">
          <line x1="-10" y1="0" x2="180" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="70" x2="0" y2="-70" stroke="#6b7280" stroke-width="1"/>
          <path d="M 10,40 Q 90,-60 170,40" stroke="#6366f1" stroke-width="2" fill="none"/>
          <line x1="50" y1="20" x2="140" y2="-40" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
          <circle cx="90" cy="-10" r="4" fill="#f59e0b"/>
          <text x="95" y="-15" fill="#f59e0b" font-size="10">Tangente</text>
          <text x="100" y="50" fill="#6366f1" font-size="10">f(x)=x²</text>
        </svg>`,
        caption: 'Tangente (gelb) berührt die Kurve im Punkt x',
      },
      {
        kind: 'text',
        content:
          '### Grenzwert-Definition\n\nDie Ableitung entsteht, wenn wir den Abstand zweier Punkte gegen Null gehen lassen (Sekante → Tangente):',
      },
      {
        kind: 'math',
        content:
          "$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$",
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Ableitungsregeln\n\nFür den Alltag reichen wenige Regeln aus:',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{d}{dx} x^n = n x^{n-1} \\quad \\text{(Potenzregel)}$$',
      },
      {
        kind: 'math',
        content:
          '$$(f + g)\' = f\' + g\' \\quad \\text{(Summenregel)}$$',
      },
      {
        kind: 'math',
        content: '$$(c \\cdot f)\' = c \\cdot f\' \\quad \\text{(konstanter Faktor)}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = 3x^2 + 2x$\n\n$f\'(x) = 3 \\cdot 2x^{2-1} + 2 \\cdot 1x^{1-1} = 6x + 2$',
      },
    ],
    practice: [
      {
        id: 'p0.ableitungen.ex1',
        difficulty: 1,
        conceptTags: ['derivative', 'power-rule'],
        type: 'mc',
        prompt: 'Was ist die Ableitung von $f(x) = x^2$?',
        options: ['$x$', '$2x$', '$x^3$', '$2$'],
        answer: '$2x$',
        hints: [
          'Nutze die Potenzregel: $\\frac{d}{dx} x^n = nx^{n-1}$.',
          'Mit $n=2$: $\\frac{d}{dx} x^2 = 2 \\cdot x^{2-1}$',
          '$2 \\cdot x^1 = 2x$.',
        ],
        explanation: 'Potenzregel: $\\frac{d}{dx} x^2 = 2x^{2-1} = 2x$.',
        misconceptions: {
          '$x$': 'Das wäre die Ableitung von $\\frac{x^2}{2}$, nicht von $x^2$.',
          '$2$': '$2$ wäre die zweite Ableitung (Ableitung von $2x$).',
        },
      },
      {
        id: 'p0.ableitungen.ex2',
        difficulty: 2,
        conceptTags: ['derivative', 'power-rule'],
        type: 'mc',
        prompt: 'Was ist die Ableitung von $f(x) = 5x^3$?',
        options: ['$5x^2$', '$15x^2$', '$5x^4$', '$15x$'],
        answer: '$15x^2$',
        hints: [
          'Potenzregel: $\\frac{d}{dx}(c \\cdot x^n) = c \\cdot n \\cdot x^{n-1}$.',
          '$5 \\cdot 3 \\cdot x^{3-1}$',
          '$15x^2$.',
        ],
        explanation: '$\\frac{d}{dx}(5x^3) = 5 \\cdot 3 \\cdot x^{3-1} = 15x^2$.',
      },
      {
        id: 'p0.ableitungen.ex3',
        difficulty: 2,
        conceptTags: ['derivative', 'evaluation'],
        type: 'numeric',
        prompt: 'Berechne $f\'(3)$ für $f(x) = x^2$.',
        answer: 6,
        hints: [
          'Bestimme zuerst $f\'(x)$.',
          "$f'(x) = 2x$. Setze $x = 3$ ein.",
          "$f'(3) = 2 \\cdot 3 = 6$.",
        ],
        explanation: "$f'(x) = 2x$, also $f'(3) = 2 \\cdot 3 = 6$.",
      },
      {
        id: 'p0.ableitungen.ex4',
        difficulty: 3,
        conceptTags: ['derivative', 'sum-rule'],
        type: 'symbolic',
        prompt: 'Berechne die Ableitung von $f(x) = 4x^3 + 2x$.',
        answer: '12x^2+2',
        acceptedAlternatives: ['12x²+2', '12x^2 + 2', '2+12x^2'],
        hints: [
          'Leite jeden Term einzeln ab (Summenregel).',
          '$\\frac{d}{dx}(4x^3) = 12x^2$ und $\\frac{d}{dx}(2x) = 2$.',
          "$f'(x) = 12x^2 + 2$.",
        ],
        explanation: "$f'(x) = 4 \\cdot 3x^2 + 2 \\cdot 1 = 12x^2 + 2$.",
      },
      {
        id: 'p0.ableitungen.ex5',
        difficulty: 4,
        conceptTags: ['derivative', 'evaluation', 'negative'],
        type: 'numeric',
        prompt: 'Berechne die Steigung von $f(x) = x^2$ bei $x = -1$.',
        answer: -2,
        hints: [
          "$f'(x) = 2x$.",
          "Setze $x = -1$ ein: $f'(-1) = 2 \\cdot (-1)$.",
          "$f'(-1) = -2$. Negative Steigung = Funktion fällt an dieser Stelle.",
        ],
        explanation:
          "$f'(x) = 2x$, $f'(-1) = 2 \\cdot (-1) = -2$. Die negative Steigung bedeutet, dass die Funktion an $x=-1$ fällt.",
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gradient Descent — das Herz des ML\n\n**Gradient Descent** ist die Lernregel aller neuronalen Netze. Sie nutzt die Ableitung der Loss-Funktion bezüglich der Gewichte, um diese iterativ zu verbessern.',
      },
      {
        kind: 'math',
        content:
          '$$w \\leftarrow w - \\eta \\frac{\\partial L}{\\partial w}$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Mal, wenn ein Modell trainiert wird, läuft im Hintergrund nichts anderes als das, was du gerade gelernt hast: **Ableitungen berechnen** und einen kleinen Schritt in Gegenrichtung der Steigung gehen. $\\eta$ (eta) ist die **Lernrate** — wie groß der Schritt ist.',
      },
      {
        kind: 'text',
        content:
          '### Intuition\n\nStell dir vor, du stehst auf einem hügeligen Gelände und willst ins Tal. Du schaust, in welche Richtung es am steilsten bergab geht (Gradient) und machst einen Schritt in genau diese Richtung. Das ist Gradient Descent.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.ableitungen.card1',
      front: 'Was beschreibt die Ableitung $f\'(x)$ geometrisch?',
      back: 'Die Steigung der Tangente an den Graphen von $f$ im Punkt $x$.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p0.ableitungen.card2',
      front: 'Wie lautet die Potenzregel der Differentiation?',
      back: '$\\frac{d}{dx} x^n = n x^{n-1}$',
      conceptTags: ['derivative', 'power-rule'],
    },
    {
      id: 'p0.ableitungen.card3',
      front: 'Was bedeutet eine negative Ableitung an einem Punkt?',
      back: 'Die Funktion fällt (hat eine negative Steigung) an diesem Punkt.',
      conceptTags: ['derivative'],
    },
  ],
}
