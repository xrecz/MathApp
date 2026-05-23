import type { Lesson } from '../../types'

export const lineareFunktionen: Lesson = {
  id: 'p0.lineare-funktionen',
  title: 'Lineare Funktionen',
  conceptTags: ['linear', 'function', 'slope'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Lineare Funktionen\n\nEine **lineare Funktion** hat die Form $f(x) = mx + b$. Dabei ist $m$ die **Steigung** (wie steil die Gerade ist) und $b$ der **y-Achsen-Abschnitt** (wo die Gerade die y-Achse schneidet).',
      },
      {
        kind: 'math',
        content: '$$f(x) = mx + b$$',
      },
      {
        kind: 'text',
        content:
          '### Wertetabelle für $f(x) = 2x + 1$\n\n| x | -2 | -1 | 0 | 1 | 2 |\n|---|----|----|---|---|---|\n| f(x) | -3 | -1 | 1 | 3 | 5 |',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-60 -60 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <line x1="-50" y1="0" x2="140" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="-50" x2="0" y2="150" stroke="#6b7280" stroke-width="1"/>
          <line x1="-40" y1="90" x2="80" y2="-150" stroke="#6366f1" stroke-width="2"/>
          <text x="85" y="-5" fill="#6366f1" font-size="12">f(x)=2x+1</text>
          <text x="135" y="15" fill="#9ca3af" font-size="10">x</text>
          <text x="5" y="-45" fill="#9ca3af" font-size="10">y</text>
        </svg>`,
        caption: 'Graph von f(x) = 2x + 1',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Steigung aus zwei Punkten\n\nDie Steigung berechnet man aus zwei Punkten $(x_1, y_1)$ und $(x_2, y_2)$:',
      },
      {
        kind: 'math',
        content: '$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: Punkte $(1, 3)$ und $(3, 7)$\n\n$m = \\frac{7-3}{3-1} = \\frac{4}{2} = 2$\n\nMit $b = y_1 - m \\cdot x_1 = 3 - 2 \\cdot 1 = 1$ ergibt sich $f(x) = 2x + 1$.',
      },
      {
        kind: 'text',
        content:
          '### Punkt-Steigungsform\n\nWenn Steigung $m$ und ein Punkt $(x_0, y_0)$ bekannt sind:\n\n$y - y_0 = m(x - x_0)$',
      },
    ],
    practice: [
      {
        id: 'p0.linear.ex1',
        difficulty: 1,
        conceptTags: ['linear'],
        type: 'mc',
        prompt: 'Welche der folgenden Funktionen ist linear?',
        options: ['$f(x) = x^2$', '$f(x) = 3x + 2$', '$f(x) = \\sin(x)$', '$f(x) = \\frac{1}{x}$'],
        answer: '$f(x) = 3x + 2$',
        hints: [
          'Eine lineare Funktion hat die Form $f(x) = mx + b$.',
          'Kein Exponent, keine trigonometrische Funktion, kein Bruch mit x im Nenner.',
          '$3x + 2$ ist vom Typ $mx + b$ mit $m=3, b=2$.',
        ],
        explanation: '$f(x) = 3x + 2$ ist genau vom Typ $mx + b$ — das ist die Definition einer linearen Funktion.',
        misconceptions: {
          '$f(x) = x^2$': '$x^2$ ist eine quadratische, keine lineare Funktion.',
        },
      },
      {
        id: 'p0.linear.ex2',
        difficulty: 2,
        conceptTags: ['linear', 'evaluation'],
        type: 'numeric',
        prompt: 'Berechne $f(3)$ für $f(x) = 2x + 1$.',
        answer: 7,
        hints: [
          'Setze $x = 3$ in $f(x) = 2x + 1$ ein.',
          '$f(3) = 2 \\cdot 3 + 1 = ?$',
          '$6 + 1 = 7$.',
        ],
        explanation: '$f(3) = 2 \\cdot 3 + 1 = 6 + 1 = 7$.',
      },
      {
        id: 'p0.linear.ex3',
        difficulty: 2,
        conceptTags: ['slope'],
        type: 'numeric',
        prompt: 'Berechne die Steigung durch die Punkte $(1, 3)$ und $(4, 9)$.',
        answer: 2,
        hints: [
          'Verwende die Formel $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
          '$m = \\frac{9-3}{4-1} = \\frac{6}{3}$',
          '$\\frac{6}{3} = 2$.',
        ],
        explanation: '$m = \\frac{9-3}{4-1} = \\frac{6}{3} = 2$.',
      },
      {
        id: 'p0.linear.ex4',
        difficulty: 3,
        conceptTags: ['linear', 'intercept'],
        type: 'mc',
        prompt: 'Was ist der y-Achsen-Abschnitt von $f(x) = -3x + 5$?',
        options: ['$-3$', '$5$', '$3$', '$-5$'],
        answer: '$5$',
        hints: [
          'Der y-Achsen-Abschnitt ist der Wert von $f(0)$.',
          '$f(0) = -3 \\cdot 0 + 5 = ?$',
          '$f(0) = 5$, also $b = 5$.',
        ],
        explanation: 'In $f(x) = mx + b$ ist $b = 5$ der y-Achsen-Abschnitt. Probe: $f(0) = -3 \\cdot 0 + 5 = 5$.',
        misconceptions: {
          '$-3$': '$-3$ ist die Steigung $m$, nicht der y-Achsen-Abschnitt.',
        },
      },
      {
        id: 'p0.linear.ex5',
        difficulty: 4,
        conceptTags: ['linear', 'equation'],
        type: 'symbolic',
        prompt: 'Schreibe die Gleichung der Geraden durch $(0, 2)$ und $(1, 5)$ in der Form $f(x) = mx + b$.',
        answer: '3x+2',
        acceptedAlternatives: ['y=3x+2', 'f(x)=3x+2', '3x + 2', 'y = 3x + 2'],
        hints: [
          'Berechne die Steigung: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
          '$m = \\frac{5-2}{1-0} = 3$. Der y-Achsen-Abschnitt ist $b = 2$ (bei $x=0$).',
          '$f(x) = 3x + 2$.',
        ],
        explanation: '$m = \\frac{5-2}{1-0} = 3$, $b = 2$ (da der Punkt $(0,2)$ direkt auf der y-Achse liegt). Also $f(x) = 3x + 2$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Lineare Funktionen in ML\n\n**Lineare Regression** ist im einfachsten Fall genau eine lineare Funktion $\\hat{y} = mx + b$, deren Parameter $m$ und $b$ aus Daten **gelernt** werden. Das Perceptron — der Urvater aller neuronalen Netze — ist eine lineare Funktion plus Schwellenwert.',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{y} = w_1 x_1 + w_2 x_2 + \\ldots + w_n x_n + b = \\mathbf{w}^\\top \\mathbf{x} + b$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Neuron in einem neuronalen Netz berechnet im Kern eine **gewichtete Summe** seiner Eingaben — genau dasselbe, was du gerade mit $mx + b$ gelernt hast. Die "Gewichte" $w$ entsprechen der Steigung $m$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.linear.card1',
      front: 'Was beschreibt die allgemeine Form einer linearen Funktion?',
      back: '$f(x) = mx + b$, wobei $m$ die Steigung und $b$ der y-Achsen-Abschnitt ist.',
      conceptTags: ['linear'],
    },
    {
      id: 'p0.linear.card2',
      front: 'Wie berechnet man die Steigung aus zwei Punkten?',
      back: '$m = \\frac{y_2 - y_1}{x_2 - x_1}$',
      conceptTags: ['slope'],
    },
    {
      id: 'p0.linear.card3',
      front: 'Was ist die Punkt-Steigungsform einer Geraden?',
      back: '$y - y_0 = m(x - x_0)$, wobei $(x_0, y_0)$ ein bekannter Punkt auf der Geraden ist.',
      conceptTags: ['linear', 'slope'],
    },
  ],
}
