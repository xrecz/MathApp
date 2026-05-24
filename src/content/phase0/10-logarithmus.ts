import type { Lesson } from '../../types'

export const logarithmus: Lesson = {
  id: 'p0.logarithmus',
  title: 'Logarithmus',
  conceptTags: ['logarithm', 'inverse', 'log-laws', 'cross-entropy'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Logarithmus — Umkehrung der Potenz\n\n$\\log_a(b) = c$ bedeutet: $a^c = b$. Der Logarithmus fragt: "Welche Potenz brauche ich, um $b$ aus der Basis $a$ zu erhalten?"\n\nWichtigste Spezialfälle: $\\ln = \\log_e$ (natürlicher Log), $\\log_{10}$, $\\log_2$.',
      },
      {
        kind: 'math',
        content:
          '$$\\ln(e^x) = x \\qquad e^{\\ln(x)} = x \\qquad \\ln(1) = 0 \\qquad \\ln(e) = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Cross-Entropy-Loss $L = -\\sum_i y_i \\log \\hat{y}_i$ ist der Standard-Loss für Klassifikation — von logistischer Regression bis GPT. Er basiert komplett auf dem Logarithmus.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Logarithmengesetze\n\nDiese Regeln gelten für jeden Logarithmus (jede Basis):',
      },
      {
        kind: 'math',
        content:
          '$$\\log(a \\cdot b) = \\log a + \\log b \\qquad \\log\\!\\left(\\frac{a}{b}\\right) = \\log a - \\log b \\qquad \\log(a^n) = n \\cdot \\log a$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $\\log_2(8) = ?$\n\n$2^3 = 8$, also $\\log_2(8) = 3$.\n\n**Beispiel 2**: $\\ln(e^5) = 5$ (Umkehrfunktion)\n\n**Beispiel 3**: Cross-Entropy, perfekte Vorhersage ($\\hat{y} = 1$):\n\n$-\\ln(1) = 0$ ← kein Fehler, kein Loss.',
      },
    ],
    practice: [
      {
        id: 'p0.log.ex1',
        difficulty: 1,
        conceptTags: ['logarithm'],
        type: 'numeric',
        prompt: 'Was ist $\\log_2(8)$?',
        answer: 3,
        hints: [
          '$\\log_2(8)$ fragt: "2 hoch wie viel ergibt 8?"',
          '$2^1 = 2$, $2^2 = 4$, $2^3 = ?$',
          '$2^3 = 8$, also $\\log_2(8) = 3$.',
        ],
        explanation: '$2^3 = 8$, daher $\\log_2(8) = 3$.',
      },
      {
        id: 'p0.log.ex2',
        difficulty: 2,
        conceptTags: ['logarithm', 'natural'],
        type: 'numeric',
        prompt: 'Was ist $\\ln(1)$?',
        answer: 0,
        hints: [
          '$\\ln(x) = \\log_e(x)$.',
          '$e^0 = 1$ — Basis hoch 0 ist immer 1.',
          '$\\ln(1) = 0$.',
        ],
        explanation: '$e^0 = 1$, also $\\ln(1) = 0$.',
      },
      {
        id: 'p0.log.ex3',
        difficulty: 2,
        conceptTags: ['logarithm', 'natural'],
        type: 'numeric',
        prompt: 'Was ist $\\ln(e)$?',
        answer: 1,
        hints: [
          '$\\ln$ ist die Umkehrfunktion von $e^x$.',
          '$e^1 = e$.',
          '$\\ln(e) = 1$.',
        ],
        explanation: '$\\ln(e) = \\log_e(e) = 1$, weil $e^1 = e$.',
      },
      {
        id: 'p0.log.ex4',
        difficulty: 3,
        conceptTags: ['log-laws'],
        type: 'mc',
        prompt: '$\\log(a \\cdot b) = ?$',
        options: ['$\\log a + \\log b$', '$\\log a \\cdot \\log b$', '$\\log a - \\log b$', '$\\log(a+b)$'],
        answer: '$\\log a + \\log b$',
        hints: [
          'Das ist das erste Logarithmengesetz.',
          'Logarithmus macht aus Produkten Summen.',
          '$\\log(a \\cdot b) = \\log a + \\log b$.',
        ],
        explanation: 'Logarithmengesetz: $\\log(a \\cdot b) = \\log a + \\log b$.',
        misconceptions: {
          '$\\log a \\cdot \\log b$': 'Das Produkt von Logs ist keine gültige Vereinfachung.',
        },
      },
      {
        id: 'p0.log.ex5',
        difficulty: 3,
        conceptTags: ['logarithm', 'cross-entropy'],
        type: 'numeric',
        prompt:
          'Berechne $-\\ln(0{,}5)$ — der Cross-Entropy-Loss für ein "50%-sicheres" Beispiel. Auf 2 Nachkommastellen.',
        answer: 0.69,
        acceptedAlternatives: ['0,69', '0.693', '0,693'],
        hints: [
          '$\\ln(0{,}5) = \\ln(1/2) = \\ln(1) - \\ln(2) = 0 - \\ln(2)$.',
          '$\\ln(2) \\approx 0{,}693$.',
          '$-\\ln(0{,}5) = \\ln(2) \\approx 0{,}69$.',
        ],
        explanation:
          '$-\\ln(0{,}5) = \\ln(2) \\approx 0{,}693$. Je weniger sicher das Modell, desto höher der Loss.',
      },
      {
        id: 'p0.log.ex6',
        difficulty: 4,
        conceptTags: ['logarithm', 'cross-entropy', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein Klassifikator trifft perfekt: $\\hat{y} = 1$ für die richtige Klasse. Wie groß ist der Cross-Entropy-Loss $-\\ln(\\hat{y})$?',
        options: ['0', '1', '$\\infty$', '$-1$'],
        answer: '0',
        hints: [
          '$-\\ln(1) = ?$',
          '$\\ln(1) = 0$.',
          '$-\\ln(1) = 0$ — kein Fehler, kein Loss.',
        ],
        explanation:
          '$-\\ln(1) = 0$. Perfekte Vorhersage → Loss = 0. Umgekehrt: $-\\ln(0) = +\\infty$ — maximale Strafe.',
        misconceptions: {
          '1': '$\\ln(1) = 0$, nicht 1. $\\ln(e) = 1$.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Cross-Entropy — warum Logarithmus?\n\nDer Standard-Loss für Klassifikation ist:\n\n$L = -\\sum_i y_i \\log \\hat{y}_i$\n\nFür die richtige Klasse ist $y_i = 1$, alle anderen $y_i = 0$. Also vereinfacht sich das zu:\n\n$L = -\\log \\hat{y}_{\\text{richtig}}$',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{y} \\to 1 \\Rightarrow L = -\\ln(1) = 0 \\qquad \\hat{y} \\to 0 \\Rightarrow L = -\\ln(0) \\to +\\infty$$',
      },
      {
        kind: 'callout',
        content:
          'Je sicherer das Modell richtig liegt, desto kleiner der Loss. Je sicherer es falsch liegt, desto näher kommt der Loss an $+\\infty$ — eine sehr starke Bestrafung. Das ist der Grund, warum Cross-Entropy im Training schneller lernt als MSE.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.log.card1',
      front: 'Was bedeutet $\\log_a(b) = c$?',
      back: '$a^c = b$ — Logarithmus ist die Umkehrung der Potenz.',
      conceptTags: ['logarithm'],
    },
    {
      id: 'p0.log.card2',
      front: 'Logarithmengesetz für Produkte?',
      back: '$\\log(a \\cdot b) = \\log a + \\log b$',
      conceptTags: ['log-laws'],
    },
    {
      id: 'p0.log.card3',
      front: 'Cross-Entropy-Loss (eine Klasse)?',
      back: '$L = -\\ln(\\hat{y})$, wobei $\\hat{y}$ die vorhergesagte Wahrscheinlichkeit der richtigen Klasse ist.',
      conceptTags: ['cross-entropy'],
    },
  ],
}
