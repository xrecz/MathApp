import type { Lesson } from '../../types'

export const trigonometrie: Lesson = {
  id: 'p0.trigonometrie',
  title: 'Trigonometrie & Einheitskreis',
  conceptTags: ['trigonometry', 'sine', 'cosine', 'unit-circle', 'radian'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Einheitskreis & Winkelfunktionen\n\nDer **Einheitskreis** hat Radius 1. Für jeden Punkt auf dem Kreis gilt: $x = \\cos(\\theta)$ und $y = \\sin(\\theta)$, wobei $\\theta$ der Winkel ist.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-80 -80 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="60" stroke="#4b5563" stroke-width="1" fill="none"/>
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="-70" x2="0" y2="70" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="0" x2="42" y2="-42" stroke="#6366f1" stroke-width="2"/>
          <circle cx="42" cy="-42" r="3" fill="#f59e0b"/>
          <line x1="42" y1="0" x2="42" y2="-42" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3"/>
          <line x1="0" y1="0" x2="42" y2="0" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3"/>
          <text x="22" y="12" fill="#ef4444" font-size="9">cos θ</text>
          <text x="46" y="-20" fill="#10b981" font-size="9">sin θ</text>
          <text x="5" y="-20" fill="#6366f1" font-size="9">1</text>
        </svg>`,
        caption: 'Einheitskreis: cos = x-Koordinate, sin = y-Koordinate',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Sinusoidal Positional Encodings in Transformern (die Basis von ChatGPT, Claude, allen LLMs) nutzen $\\sin$ und $\\cos$ mit verschiedenen Frequenzen, um Tokens ihre Position in der Sequenz mitzugeben.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Bogenmaß vs. Grad\n\nWinkel lassen sich in Grad ($°$) oder **Bogenmaß** (Radiant) messen.\n\n$180° = \\pi$ Radiant $\\approx 3{,}14159$ Radiant\n\n$360° = 2\\pi$ Radiant\n\nML-Code nutzt immer Bogenmaß (z.B. `np.sin(np.pi / 2)`).',
      },
      {
        kind: 'text',
        content:
          '### Wichtige Werte\n\n| Winkel | Radiant | $\\sin$ | $\\cos$ |\n|--------|---------|--------|---------|\n| $0°$ | $0$ | $0$ | $1$ |\n| $90°$ | $\\pi/2$ | $1$ | $0$ |\n| $180°$ | $\\pi$ | $0$ | $-1$ |\n| $270°$ | $3\\pi/2$ | $-1$ | $0$ |\n\n**Pythagoras im Einheitskreis**: $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$',
      },
    ],
    practice: [
      {
        id: 'p0.trig.ex1',
        difficulty: 1,
        conceptTags: ['sine'],
        type: 'numeric',
        prompt: 'Was ist $\\sin(0)$?',
        answer: 0,
        hints: [
          'Schaue auf den Einheitskreis: bei $\\theta = 0$ liegt der Punkt auf der x-Achse.',
          'Die y-Koordinate des Punktes ist $\\sin(0)$.',
          'y-Koordinate bei $\\theta = 0$: y = 0.',
        ],
        explanation: 'Bei $\\theta = 0$ liegt der Punkt bei $(1, 0)$ auf dem Einheitskreis. $\\sin(0) = 0$.',
      },
      {
        id: 'p0.trig.ex2',
        difficulty: 1,
        conceptTags: ['cosine'],
        type: 'numeric',
        prompt: 'Was ist $\\cos(0)$?',
        answer: 1,
        hints: [
          'Bei $\\theta = 0$ liegt der Punkt bei $(1, 0)$.',
          'Die x-Koordinate ist $\\cos(0)$.',
          '$x = 1$, also $\\cos(0) = 1$.',
        ],
        explanation: 'Bei $\\theta = 0$: Punkt ist $(1, 0)$. $\\cos(0) = 1$.',
      },
      {
        id: 'p0.trig.ex3',
        difficulty: 2,
        conceptTags: ['sine', 'radian'],
        type: 'numeric',
        prompt: 'Was ist $\\sin(\\pi/2)$?',
        answer: 1,
        hints: [
          '$\\pi/2$ entspricht $90°$.',
          'Bei $90°$ zeigt der Punkt gerade nach oben: $(0, 1)$.',
          '$\\sin(\\pi/2) = 1$ (die y-Koordinate ist 1).',
        ],
        explanation: 'Bei $\\theta = \\pi/2 = 90°$: Punkt ist $(0, 1)$. $\\sin(\\pi/2) = 1$.',
      },
      {
        id: 'p0.trig.ex4',
        difficulty: 3,
        conceptTags: ['pythagorean-identity'],
        type: 'mc',
        prompt: 'Was gilt für $\\sin^2(x) + \\cos^2(x)$ für beliebiges $x$?',
        options: ['Immer 1', 'Immer 0', 'Hängt von $x$ ab', 'Immer 2'],
        answer: 'Immer 1',
        hints: [
          'Das ist der Satz des Pythagoras im Einheitskreis.',
          'Der Radius des Einheitskreises ist 1: $x^2 + y^2 = 1^2$.',
          '$\\cos^2(\\theta) + \\sin^2(\\theta) = 1$ für alle $\\theta$.',
        ],
        explanation: '$\\sin^2(x) + \\cos^2(x) = 1$ — immer. Das ist der trigonometrische Pythagoras.',
      },
      {
        id: 'p0.trig.ex5',
        difficulty: 3,
        conceptTags: ['radian'],
        type: 'mc',
        prompt: '$180°$ in Bogenmaß?',
        options: ['$\\pi$', '$2\\pi$', '$\\pi/2$', '$\\pi/4$'],
        answer: '$\\pi$',
        hints: [
          '$360° = 2\\pi$ — ein voller Kreis.',
          '$180° = $ halber Kreis $= \\pi$.',
          '$180° = \\pi \\approx 3{,}14$ Radiant.',
        ],
        explanation: '$180°$ entspricht dem halben Vollwinkel: $180° = \\pi$ Radiant.',
      },
      {
        id: 'p0.trig.ex6',
        difficulty: 4,
        conceptTags: ['cosine-similarity', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Zwei Vektoren haben Cosine-Similarity = 1. Was bedeutet das geometrisch?',
        options: [
          'Sie zeigen in dieselbe Richtung (Winkel 0)',
          'Sie sind orthogonal (Winkel 90°)',
          'Sie zeigen in entgegengesetzte Richtungen',
          'Sie haben dieselbe Länge',
        ],
        answer: 'Sie zeigen in dieselbe Richtung (Winkel 0)',
        hints: [
          'Cosine-Similarity ist $\\cos(\\theta)$, wobei $\\theta$ der Winkel zwischen den Vektoren ist.',
          '$\\cos(0) = 1$ — Winkel 0.',
          '$\\cos(0°) = 1$ bedeutet: Vektoren zeigen in dieselbe Richtung.',
        ],
        explanation:
          'Cosine-Similarity $= \\cos(\\theta)$. Für $\\theta = 0°$ gilt $\\cos(0) = 1$ — maximale Ähnlichkeit, identische Richtung.',
        misconceptions: {
          'Sie sind orthogonal (Winkel 90°)': '$\\cos(90°) = 0$, nicht 1. Orthogonale Vektoren haben Cosine-Similarity 0.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sinusoidal Positional Encodings\n\nIn Transformer-Modellen bekommt jeder Token eine **Positionscodierung** — eine Information, wo er in der Sequenz steht. Die Formel:',
      },
      {
        kind: 'math',
        content:
          '$$PE(\\text{pos}, 2i) = \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right) \\qquad PE(\\text{pos}, 2i+1) = \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Mal, wenn du mit GPT chattest, werden die Tokens durch diese Sinus- und Cosinus-Funktionen mit ihrer Position kodiert. Die Periodizität von $\\sin$ und $\\cos$ erlaubt es dem Modell, relative Abstände zwischen Tokens zu erkennen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.trig.card1',
      front: 'Pythagorean Identity?',
      back: '$\\sin^2(x) + \\cos^2(x) = 1$',
      conceptTags: ['trigonometry'],
    },
    {
      id: 'p0.trig.card2',
      front: '$180°$ in Bogenmaß?',
      back: '$\\pi$ Radiant',
      conceptTags: ['radian'],
    },
    {
      id: 'p0.trig.card3',
      front: 'Cosine-Similarity = 1 bedeutet?',
      back: 'Vektoren zeigen in dieselbe Richtung (Winkel 0°).',
      conceptTags: ['cosine-similarity'],
    },
  ],
}
