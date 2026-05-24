import type { Lesson } from '../../types'

export const termumformungen: Lesson = {
  id: 'p0.termumformungen',
  title: 'Termumformungen & Binomische Formeln',
  conceptTags: ['algebra', 'binomial', 'simplification'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Termumformungen\n\nMit dem **Distributivgesetz** lassen sich Klammern auflösen und Terme vereinfachen. Die **binomischen Formeln** sind spezielle Kurzformeln für häufig auftretende Produkte.',
      },
      {
        kind: 'math',
        content:
          '$$(a+b)^2 = a^2 + 2ab + b^2 \\qquad (a-b)^2 = a^2 - 2ab + b^2 \\qquad (a+b)(a-b) = a^2 - b^2$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der MSE-Loss $(\\hat{y} - y)^2$ entwickelt sich zu $\\hat{y}^2 - 2\\hat{y}y + y^2$ — direkte Anwendung der 2. binomischen Formel. Beim Ableiten nach $\\hat{y}$ entsteht $2(\\hat{y} - y)$ — das ist der Gradient im Backpropagation-Schritt.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Distributivgesetz\n\nJeder Term in der Klammer wird mit dem Faktor davor multipliziert:',
      },
      {
        kind: 'math',
        content: '$$a(b + c) = ab + ac$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $2(x+3) = 2x + 6$\n\n**Beispiel 2**: $(a+b)^2 = (a+b)(a+b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$\n\n**Beispiel 3**: $(x+3)(x-3) = x^2 - 3^2 = x^2 - 9$ (3. binomische Formel)',
      },
    ],
    practice: [
      {
        id: 'p0.term.ex1',
        difficulty: 1,
        conceptTags: ['algebra'],
        type: 'mc',
        prompt: 'Was ergibt $2(x + 3)$?',
        options: ['$2x + 3$', '$2x + 6$', '$2x + 5$', '$x + 6$'],
        answer: '$2x + 6$',
        hints: [
          'Multipliziere den Faktor 2 mit jedem Term in der Klammer.',
          '$2 \\cdot x = 2x$ und $2 \\cdot 3 = ?$',
          '$2 \\cdot 3 = 6$, also $2x + 6$.',
        ],
        explanation: '$2(x+3) = 2 \\cdot x + 2 \\cdot 3 = 2x + 6$.',
        misconceptions: {
          '$2x + 3$': 'Die 3 muss auch mit 2 multipliziert werden: $2 \\cdot 3 = 6$.',
        },
      },
      {
        id: 'p0.term.ex2',
        difficulty: 2,
        conceptTags: ['binomial'],
        type: 'numeric',
        prompt:
          'Berechne $(5+2)^2$ mit der 1. binomischen Formel: $a^2 + 2ab + b^2$ mit $a=5$, $b=2$.',
        answer: 49,
        hints: [
          '$5^2 + 2 \\cdot 5 \\cdot 2 + 2^2$',
          '$25 + 20 + 4 = ?$',
          '$25 + 20 + 4 = 49$. Probe: $7^2 = 49$. ✓',
        ],
        explanation:
          '$(5+2)^2 = 5^2 + 2 \\cdot 5 \\cdot 2 + 2^2 = 25 + 20 + 4 = 49$. Direktes Nachrechnen: $7^2 = 49$.',
      },
      {
        id: 'p0.term.ex3',
        difficulty: 2,
        conceptTags: ['binomial'],
        type: 'mc',
        prompt: '$(a+b)^2 = ?$',
        options: ['$a^2 + b^2$', '$a^2 + 2ab + b^2$', '$a^2 - 2ab + b^2$', '$a^2 + ab + b^2$'],
        answer: '$a^2 + 2ab + b^2$',
        hints: [
          'Das ist die 1. binomische Formel.',
          'Ausmultiplizieren: $(a+b)(a+b) = a^2 + ab + ba + b^2$',
          '$ab + ba = 2ab$, also $a^2 + 2ab + b^2$.',
        ],
        explanation: '$(a+b)^2 = a^2 + 2ab + b^2$ (1. binomische Formel).',
        misconceptions: {
          '$a^2 + b^2$': 'Das mittlere Glied $2ab$ fehlt! $(a+b)^2 \\neq a^2 + b^2$.',
          '$a^2 - 2ab + b^2$': 'Das ist die 2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$.',
        },
      },
      {
        id: 'p0.term.ex4',
        difficulty: 3,
        conceptTags: ['binomial', 'simplification'],
        type: 'mc',
        prompt: 'Vereinfache $(x+3)(x-3)$.',
        options: ['$x^2 - 9$', '$x^2 + 9$', '$x^2 - 6x + 9$', '$x^2 + 6x - 9$'],
        answer: '$x^2 - 9$',
        hints: [
          'Das ist die 3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$.',
          'Hier: $a = x$, $b = 3$.',
          '$(x+3)(x-3) = x^2 - 3^2 = x^2 - 9$.',
        ],
        explanation: '3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$. Mit $a=x$, $b=3$: $x^2 - 9$.',
        misconceptions: {
          '$x^2 - 6x + 9$': 'Das wäre $(x-3)^2$. Hier stehen Plus UND Minus — das ist die 3. Formel.',
        },
      },
      {
        id: 'p0.term.ex5',
        difficulty: 3,
        conceptTags: ['binomial', 'ml'],
        type: 'mc',
        prompt: 'Entwickle $(\\hat{y} - y)^2$ (MSE-Loss-Term).',
        options: [
          '$\\hat{y}^2 - 2\\hat{y}y + y^2$',
          '$\\hat{y}^2 - y^2$',
          '$\\hat{y}^2 + y^2$',
          '$2\\hat{y} - 2y$',
        ],
        answer: '$\\hat{y}^2 - 2\\hat{y}y + y^2$',
        hints: [
          'Das ist die 2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$.',
          'Hier: $a = \\hat{y}$, $b = y$.',
          '$(\\hat{y} - y)^2 = \\hat{y}^2 - 2\\hat{y}y + y^2$.',
        ],
        explanation:
          '2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$. Mit $a=\\hat{y}$, $b=y$: $\\hat{y}^2 - 2\\hat{y}y + y^2$.',
      },
      {
        id: 'p0.term.ex6',
        difficulty: 4,
        conceptTags: ['binomial', 'factoring'],
        type: 'symbolic',
        prompt: 'Faktorisiere $a^2 - 25$ mithilfe der 3. binomischen Formel.',
        answer: '(a+5)(a-5)',
        acceptedAlternatives: ['(a-5)(a+5)', '(a+5)*(a-5)', '(a-5)*(a+5)'],
        hints: [
          '$25 = 5^2$, also $a^2 - 25 = a^2 - 5^2$.',
          '3. binomische Formel rückwärts: $a^2 - b^2 = (a+b)(a-b)$.',
          '$(a+5)(a-5)$.',
        ],
        explanation:
          '$a^2 - 25 = a^2 - 5^2 = (a+5)(a-5)$ — 3. binomische Formel als Faktorisierung.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## MSE und Backpropagation\n\nDer MSE-Loss (Mean Squared Error) ist $L = (\\hat{y} - y)^2$. Beim Training eines neuronalen Netzes berechnet Backpropagation die Ableitung nach $\\hat{y}$:',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{\\partial L}{\\partial \\hat{y}} = \\frac{\\partial}{\\partial \\hat{y}}(\\hat{y} - y)^2 = 2(\\hat{y} - y)$$',
      },
      {
        kind: 'callout',
        content:
          'Das Ergebnis $2(\\hat{y} - y)$ ist direkt aus der 2. binomischen Formel. Jedes Mal, wenn ein neuronales Netz trainiert wird und dabei MSE nutzt, steckt dieser Term im Update-Schritt: $w \\leftarrow w - \\eta \\cdot 2(\\hat{y} - y)$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.term.card1',
      front: '1. binomische Formel?',
      back: '$(a+b)^2 = a^2 + 2ab + b^2$',
      conceptTags: ['binomial'],
    },
    {
      id: 'p0.term.card2',
      front: '3. binomische Formel?',
      back: '$(a+b)(a-b) = a^2 - b^2$',
      conceptTags: ['binomial'],
    },
    {
      id: 'p0.term.card3',
      front: 'MSE-Loss-Formel (eine Stichprobe)?',
      back: '$L = (\\hat{y} - y)^2$',
      conceptTags: ['ml'],
    },
  ],
}
