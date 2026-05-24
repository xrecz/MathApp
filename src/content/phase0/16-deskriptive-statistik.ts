import type { Lesson } from '../../types'

export const deskriptiveStatistik: Lesson = {
  id: 'p0.deskriptive-statistik',
  title: 'Mittelwert, Median & Varianz',
  conceptTags: ['statistics', 'mean', 'median', 'variance', 'std'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Kennzahlen einer Datenreihe\n\n**Mittelwert** beschreibt den Schwerpunkt der Daten. **Median** ist der mittlere Wert — robuster gegen Ausreißer. **Varianz** und **Standardabweichung** messen, wie weit die Daten streuen.',
      },
      {
        kind: 'math',
        content:
          '$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i \\qquad \\text{Var}(x) = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 \\qquad \\sigma = \\sqrt{\\text{Var}(x)}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Batch Normalization subtrahiert den Mittelwert und teilt durch die Standardabweichung — direkt diese Formeln. Feature-Standardisierung (Z-Score) nutzt dasselbe Prinzip.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Mittelwert vs. Median\n\nDer **Mittelwert** wird von Ausreißern stark beeinflusst. Beispiel: Gehälter in einem Büro, wo der CEO 10-mal so viel verdient wie alle anderen — der Mittelwert ist hoch, aber nicht repräsentativ.\n\nDer **Median** ist der mittlere Wert nach Sortierung — bei $n$ geraden Werten: Durchschnitt der beiden mittleren.',
      },
      {
        kind: 'worked-example',
        content:
          '**Datensatz**: ${2, 4, 4, 6, 14}$\n\nMittelwert: $\\bar{x} = \\frac{2+4+4+6+14}{5} = \\frac{30}{5} = 6$\n\nMedian: mittlerer Wert = 4\n\nVarianz: $\\frac{(2-6)^2 + (4-6)^2 + (4-6)^2 + (6-6)^2 + (14-6)^2}{5} = \\frac{16+4+4+0+64}{5} = \\frac{88}{5} = 17{,}6$',
      },
    ],
    practice: [
      {
        id: 'p0.stat.ex1',
        difficulty: 1,
        conceptTags: ['mean'],
        type: 'numeric',
        prompt: 'Berechne den Mittelwert von $\\{2, 4, 6\\}$.',
        answer: 4,
        hints: [
          'Mittelwert = Summe geteilt durch Anzahl.',
          '$\\frac{2 + 4 + 6}{3} = ?$',
          '$\\frac{12}{3} = 4$.',
        ],
        explanation: '$\\bar{x} = \\frac{2+4+6}{3} = \\frac{12}{3} = 4$.',
      },
      {
        id: 'p0.stat.ex2',
        difficulty: 2,
        conceptTags: ['median'],
        type: 'numeric',
        prompt: 'Median von $\\{1, 3, 7, 2, 5\\}$? (Sortiere zuerst!)',
        answer: 3,
        hints: [
          'Sortiere die Zahlen aufsteigend.',
          'Sortiert: $\\{1, 2, 3, 5, 7\\}$ — 5 Werte, mittlerer ist der 3.',
          'Mittlerer Wert = 3.',
        ],
        explanation: 'Sortiert: $\\{1, 2, 3, 5, 7\\}$. Mittlerer Wert (Position 3 von 5) = 3.',
      },
      {
        id: 'p0.stat.ex3',
        difficulty: 2,
        conceptTags: ['mean'],
        type: 'numeric',
        prompt: 'Mittelwert von $\\{0, 0, 0, 100\\}$?',
        answer: 25,
        hints: [
          '$\\frac{0+0+0+100}{4} = ?$',
          '$\\frac{100}{4} = 25$.',
          'Der Ausreißer 100 zieht den Mittelwert weit nach oben!',
        ],
        explanation: '$\\bar{x} = \\frac{100}{4} = 25$. Der Ausreißer verzerrt den Mittelwert stark.',
      },
      {
        id: 'p0.stat.ex4',
        difficulty: 3,
        conceptTags: ['median'],
        type: 'numeric',
        prompt: 'Median von $\\{0, 0, 0, 100\\}$?',
        answer: 0,
        hints: [
          'Bereits sortiert: $\\{0, 0, 0, 100\\}$.',
          '4 Werte — Median = Durchschnitt der 2. und 3. Position.',
          '2. Wert = 0, 3. Wert = 0. Durchschnitt = 0.',
        ],
        explanation:
          'Sortiert: $\\{0, 0, 0, 100\\}$. Median = Durchschnitt des 2. und 3. Wertes: $\\frac{0+0}{2} = 0$. Der Median ignoriert den Ausreißer!',
      },
      {
        id: 'p0.stat.ex5',
        difficulty: 3,
        conceptTags: ['variance'],
        type: 'numeric',
        prompt: 'Varianz von $\\{2, 2, 2\\}$?',
        answer: 0,
        hints: [
          'Erst Mittelwert: $\\bar{x} = 2$.',
          'Dann $(x_i - \\bar{x})^2$ für jedes $x_i$: $(2-2)^2 = 0$.',
          'Summe ist 0, Varianz ist 0.',
        ],
        explanation:
          'Alle Werte sind gleich → Abstand zum Mittelwert immer 0 → Varianz = 0. Keine Streuung.',
      },
      {
        id: 'p0.stat.ex6',
        difficulty: 4,
        conceptTags: ['std', 'normalization', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Z-Score-Normalisierung: $z = \\frac{x - \\bar{x}}{\\sigma}$. Berechne $z$ für $x = 8$, $\\bar{x} = 5$, $\\sigma = 3$.',
        answer: 1,
        hints: [
          '$z = \\frac{8 - 5}{3}$',
          '$\\frac{3}{3} = ?$',
          '$z = 1$. Der Wert liegt genau eine Standardabweichung über dem Mittelwert.',
        ],
        explanation:
          '$z = \\frac{8-5}{3} = \\frac{3}{3} = 1$. Nach Z-Normalisierung haben alle Features $\\bar{x} = 0$ und $\\sigma = 1$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Batch Normalization\n\nBatch Normalization (BatchNorm) ist eine der wichtigsten Techniken in modernen neuronalen Netzen. Für jede Schicht, pro Mini-Batch:',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{x}_i = \\frac{x_i - \\mu_{\\text{batch}}}{\\sqrt{\\sigma^2_{\\text{batch}} + \\epsilon}}$$',
      },
      {
        kind: 'callout',
        content:
          'Das ist exakt die Z-Score-Normalisierung — minus Mittelwert, geteilt durch Standardabweichung — auf die Aktivierungen einer Schicht angewendet. BatchNorm stabilisiert das Training und erlaubt höhere Lernraten. Du hast gerade verstanden, was dahintersteckt.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.stat.card1',
      front: 'Mittelwert-Formel?',
      back: '$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$',
      conceptTags: ['mean'],
    },
    {
      id: 'p0.stat.card2',
      front: 'Standardabweichung aus Varianz?',
      back: '$\\sigma = \\sqrt{\\text{Var}(x)}$',
      conceptTags: ['std'],
    },
    {
      id: 'p0.stat.card3',
      front: 'Z-Score-Formel?',
      back: '$z = \\frac{x - \\bar{x}}{\\sigma}$',
      conceptTags: ['normalization'],
    },
  ],
}
