import type { Lesson } from '../../types'

export const quadratischeFunktionen: Lesson = {
  id: 'p0.quadratische-funktionen',
  title: 'Quadratische Funktionen & Parabeln',
  conceptTags: ['function', 'quadratic', 'parabola', 'vertex'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Quadratische Funktionen\n\nEine **quadratische Funktion** hat die Form $f(x) = ax^2 + bx + c$. Ihr Graph ist eine **Parabel**. Der Parameter $a$ bestimmt, ob sie nach oben ($a > 0$, Minimum) oder unten ($a < 0$, Maximum) öffnet.',
      },
      {
        kind: 'math',
        content:
          '$$f(x) = a(x - h)^2 + k \\quad \\text{Scheitelpunktform: Scheitel bei } (h, k)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der MSE-Loss als Funktion eines einzelnen Gewichts $w$ ist eine Parabel. Das Minimum der Parabel — der Scheitelpunkt — ist genau das, was Gradient Descent sucht.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Standardform → Scheitelpunktform\n\nDurch **vollständige Quadratergänzung** lässt sich $f(x) = ax^2 + bx + c$ in die Scheitelpunktform $a(x-h)^2 + k$ umschreiben.\n\n**Scheitel**: $h = -\\frac{b}{2a}$, $k = f(h)$\n\n**Symmetrie**: Die Parabel ist symmetrisch um $x = h$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = x^2 - 4x + 7$\n\nScheitel: $h = \\frac{4}{2} = 2$, $k = f(2) = 4 - 8 + 7 = 3$\n\nScheitelpunktform: $f(x) = (x-2)^2 + 3$. Minimum: 3.',
      },
    ],
    practice: [
      {
        id: 'p0.parab.ex1',
        difficulty: 1,
        conceptTags: ['function', 'quadratic'],
        type: 'numeric',
        prompt: 'Berechne $f(3)$ für $f(x) = x^2$.',
        answer: 9,
        hints: [
          'Setze $x = 3$ ein.',
          '$f(3) = 3^2$',
          '$3^2 = 9$.',
        ],
        explanation: '$f(3) = 3^2 = 9$.',
      },
      {
        id: 'p0.parab.ex2',
        difficulty: 2,
        conceptTags: ['parabola', 'opening'],
        type: 'mc',
        prompt: 'Öffnet $f(x) = -2x^2 + 1$ nach oben oder nach unten?',
        options: ['Nach unten (Maximum)', 'Nach oben (Minimum)'],
        answer: 'Nach unten (Maximum)',
        hints: [
          'Der Koeffizient vor $x^2$ bestimmt die Öffnungsrichtung.',
          'Ist $a = -2$ positiv oder negativ?',
          '$a = -2 < 0$ → Parabel öffnet nach unten, hat ein Maximum.',
        ],
        explanation: '$a = -2 < 0$ → Parabel öffnet nach unten, Scheitelpunkt ist ein Maximum.',
        misconceptions: {
          'Nach oben (Minimum)': '$a < 0$ bedeutet nach unten geöffnet, nicht oben.',
        },
      },
      {
        id: 'p0.parab.ex3',
        difficulty: 2,
        conceptTags: ['vertex'],
        type: 'numeric',
        prompt: 'Was ist der Minimalwert (y-Wert des Scheitels) von $f(x) = (x-2)^2 + 5$?',
        answer: 5,
        hints: [
          'Die Scheitelpunktform ist $a(x-h)^2 + k$ — der Scheitel ist bei $(h, k)$.',
          'Hier ist $h = 2$ und $k = ?$.',
          '$k = 5$, also ist das Minimum $y = 5$.',
        ],
        explanation: 'Scheitelpunktform: $(x-2)^2 + 5$. Scheitel bei $(2, 5)$, Minimalwert $= 5$.',
      },
      {
        id: 'p0.parab.ex4',
        difficulty: 3,
        conceptTags: ['vertex', 'quadratic'],
        type: 'numeric',
        prompt: 'Berechne den Minimalwert von $f(x) = x^2 - 4x + 7$.',
        answer: 3,
        hints: [
          'Vollständige Quadratergänzung: $x^2 - 4x + 7 = (x-2)^2 + ?$',
          '$(x-2)^2 = x^2 - 4x + 4$, also $x^2 - 4x + 7 = (x-2)^2 + 3$.',
          'Minimalwert ist $k = 3$ (bei $x = 2$).',
        ],
        explanation:
          '$x^2 - 4x + 7 = (x-2)^2 + 3$. Scheitel bei $(2, 3)$, Minimum $= 3$.',
      },
      {
        id: 'p0.parab.ex5',
        difficulty: 4,
        conceptTags: ['quadratic', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Loss-Funktion $L(w) = (w - 2)^2$. Welches $w$ minimiert den Loss?',
        answer: 2,
        hints: [
          'Das ist eine Parabel in Scheitelpunktform.',
          'Scheitel der Parabel $(w-2)^2 + 0$ ist bei $w = 2$.',
          'Das Minimum ist bei $w = 2$, dort ist $L = 0$.',
        ],
        explanation:
          '$L(w) = (w-2)^2$ hat Minimum bei $w = 2$ (Scheitel der Parabel). Dort ist $L = 0$ — perfekte Vorhersage.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Parabeln und Gradient Descent\n\nIm einfachsten Fall — ein Parameter $w$, quadratische Loss-Funktion — sieht Gradient Descent so aus: Du stehst auf der Parabel und gehst immer in Richtung des steilsten Abstiegs, bis du unten bist (beim Scheitelpunkt).',
      },
      {
        kind: 'math',
        content:
          '$$w_{t+1} = w_t - \\eta \\cdot \\underbrace{\\frac{dL}{dw}}_{\\text{Steigung der Parabel}}$$',
      },
      {
        kind: 'callout',
        content:
          'In hochdimensionalen Räumen (Millionen Gewichte in einem LLM) ist die "Parabel" zu einer hochdimensionalen Fläche geworden — aber das Prinzip ist identisch. Der Scheitelpunkt wird zum Minimum in vielen Dimensionen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.parab.card1',
      front: 'Scheitelpunktform einer Parabel?',
      back: '$f(x) = a(x-h)^2 + k$, Scheitel bei $(h, k)$.',
      conceptTags: ['parabola', 'vertex'],
    },
    {
      id: 'p0.parab.card2',
      front: 'Wann öffnet die Parabel nach unten?',
      back: 'Wenn $a < 0$.',
      conceptTags: ['parabola'],
    },
    {
      id: 'p0.parab.card3',
      front: 'Wo liegt das Minimum von $f(x) = (x-c)^2$?',
      back: 'Bei $x = c$ (Scheitelpunkt).',
      conceptTags: ['vertex', 'quadratic'],
    },
  ],
}
