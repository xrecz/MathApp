import type { Lesson } from '../../../types'

export const erwartungswertVarianz: Lesson = {
  id: 'p1.erwartungswert-varianz',
  title: 'Erwartungswert & Varianz',
  conceptTags: ['expectation', 'variance', 'standard-deviation', 'linearity', 'bias-variance'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Erwartungswert und Varianz\n\n**Erwartungswert** (diskret): $E[X] = \\sum_k k \\cdot P(X=k)$\n\n**Erwartungswert** (stetig): $E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\, dx$\n\n**Varianz**: $\\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$\n\n**Standardabweichung**: $\\text{SD}(X) = \\sqrt{\\text{Var}(X)}$ — gleiche Einheit wie $X$.',
      },
      {
        kind: 'math',
        content:
          '$$E[aX + b] = aE[X] + b \\qquad \\text{(Linearität)}$$\n$$\\text{Var}(aX + b) = a^2 \\text{Var}(X) \\qquad \\text{(Verschiebung ändert Varianz nicht)}$$\n$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) \\quad \\text{falls } X \\perp Y$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: $E[\\text{Loss}]$ zerleg in **Bias$^2$** (systematischer Fehler) + **Varianz** (Instabilität) + **irreduzibles Rauschen**. Overfitting = hohe Varianz; Underfitting = hoher Bias. Diese Dekomposition erklärt Regularisierung in Lektion 10.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Linearität des Erwartungswerts\n\n$E[aX + b] = aE[X] + b$ — gilt immer, auch für abhängige ZVn.\n\n$E[X + Y] = E[X] + E[Y]$ — gilt immer.\n\n**Achtung**: $E[XY] = E[X]E[Y]$ nur falls $X \\perp Y$ (unabhängig).\n\n### Verschiebungsformel\n\n$$\\text{Var}(X) = E[X^2] - (E[X])^2$$\n\nNützlich für Berechnungen — quadratischen Mittelwert minus Quadrat des Mittelwerts.\n\n### Stichproben-Schätzer\n\n$\\hat{\\mu} = \\bar{X} = \\frac{1}{n}\\sum_i X_i$ — erwartungstreu: $E[\\bar{X}] = \\mu$.\n\n$\\hat{\\sigma}^2 = \\frac{1}{n-1}\\sum_i (X_i - \\bar{X})^2$ — Bessel-Korrektur für Erwartungstreue.',
      },
      {
        kind: 'worked-example',
        content:
          '**Bias-Varianz-Dekomposition (Preview)**:\n\nFür Modell $\\hat{f}$ und wahre Funktion $f$:\n\n$E[(y - \\hat{f}(x))^2] = \\underbrace{(E[\\hat{f}(x)] - f(x))^2}_{\\text{Bias}^2} + \\underbrace{\\text{Var}(\\hat{f}(x))}_{\\text{Varianz}} + \\underbrace{\\sigma^2}_{\\text{Rauschen}}$\n\n**Einfaches Modell** (Underfitting): $\\text{Bias}^2 \\uparrow$, $\\text{Var} \\downarrow$.\n\n**Komplexes Modell** (Overfitting): $\\text{Bias}^2 \\downarrow$, $\\text{Var} \\uparrow$.\n\nOptimum: Balance zwischen beiden.',
      },
    ],
    practice: [
      {
        id: 'p1.ev.ex1',
        difficulty: 1,
        conceptTags: ['expectation'],
        type: 'mc',
        prompt: '$X$ nimmt Werte $\\{1, 2, 3\\}$ mit Wahrscheinlichkeiten $\\{0{,}2, 0{,}5, 0{,}3\\}$. Was ist $E[X]$?',
        options: ['$2{,}1$', '$2$', '$1{,}5$', '$3$'],
        answer: '$2{,}1$',
        hints: [
          '$E[X] = \\sum_k k \\cdot P(X=k)$.',
          '$= 1 \\cdot 0{,}2 + 2 \\cdot 0{,}5 + 3 \\cdot 0{,}3$.',
          '$= 0{,}2 + 1{,}0 + 0{,}9 = 2{,}1$.',
        ],
        explanation:
          '$E[X] = 1(0{,}2) + 2(0{,}5) + 3(0{,}3) = 0{,}2 + 1{,}0 + 0{,}9 = 2{,}1$. Der Erwartungswert muss nicht im Wertebereich von $X$ liegen.',
      },
      {
        id: 'p1.ev.ex2',
        difficulty: 1,
        conceptTags: ['linearity'],
        type: 'mc',
        prompt: '$E[X] = 3$. Was ist $E[2X + 1]$?',
        options: ['$7$', '$6$', '$8$', '$4$'],
        answer: '$7$',
        hints: [
          'Linearität: $E[aX + b] = aE[X] + b$.',
          '$a=2$, $b=1$, $E[X]=3$.',
          '$E[2X+1] = 2 \\cdot 3 + 1 = 7$.',
        ],
        explanation:
          '$E[2X+1] = 2E[X]+1 = 2 \\cdot 3 + 1 = 7$. Linearität gilt ohne Bedingungen — sehr nützlich.',
      },
      {
        id: 'p1.ev.ex3',
        difficulty: 2,
        conceptTags: ['variance'],
        type: 'mc',
        prompt: '$\\text{Var}(X) = 4$. Was ist $\\text{Var}(3X + 5)$?',
        options: ['$36$', '$17$', '$4$', '$12$'],
        answer: '$36$',
        hints: [
          '$\\text{Var}(aX + b) = a^2 \\text{Var}(X)$.',
          'Additive Konstante ändert Varianz nicht.',
          '$\\text{Var}(3X+5) = 9 \\cdot 4 = 36$.',
        ],
        explanation:
          '$\\text{Var}(3X+5) = 3^2 \\cdot \\text{Var}(X) = 9 \\cdot 4 = 36$. Skalierung quadriert die Varianz; Verschiebung (+5) ändert Varianz nicht.',
      },
      {
        id: 'p1.ev.ex4',
        difficulty: 2,
        conceptTags: ['variance', 'standard-deviation'],
        type: 'mc',
        prompt: 'Verschiebungsformel: $E[X^2] = 10$, $E[X] = 2$. Was ist $\\text{Var}(X)$?',
        options: ['$6$', '$8$', '$10$', '$4$'],
        answer: '$6$',
        hints: [
          '$\\text{Var}(X) = E[X^2] - (E[X])^2$.',
          '$= 10 - 2^2 = 10 - 4$.',
          '$= 6$.',
        ],
        explanation:
          '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 10 - 4 = 6$. Die Verschiebungsformel ist oft einfacher als direkte Berechnung.',
      },
      {
        id: 'p1.ev.ex5',
        difficulty: 3,
        conceptTags: ['expectation', 'bias-variance'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein einfaches Modell (1 Parameter) hat Bias $= 2$ und Varianz $= 0{,}5$. Ein komplexes Modell hat Bias $= 0{,}5$ und Varianz $= 4$. Welches hat kleineren erwarteten Fehler (ohne Rauschen)?',
        options: [
          'Einfaches Modell: $2^2 + 0{,}5 = 4{,}5$ vs. komplexes: $0{,}5^2 + 4 = 4{,}25$ — komplexes ist besser',
          'Einfaches Modell: $2 + 0{,}5 = 2{,}5$ vs. komplexes: $0{,}5 + 4 = 4{,}5$ — einfaches ist besser',
          'Beide haben denselben Fehler',
          'Unmöglich ohne Daten zu vergleichen',
        ],
        answer:
          'Einfaches Modell: $2^2 + 0{,}5 = 4{,}5$ vs. komplexes: $0{,}5^2 + 4 = 4{,}25$ — komplexes ist besser',
        hints: [
          'Erwarteter Fehler = $\\text{Bias}^2 + \\text{Varianz} + \\text{Rauschen}$.',
          'Einfach: $2^2 + 0{,}5 = 4{,}5$.',
          'Komplex: $(0{,}5)^2 + 4 = 0{,}25 + 4 = 4{,}25$.',
        ],
        explanation:
          'Fehler = Bias² + Varianz. Einfach: 4+0,5=4,5. Komplex: 0,25+4=4,25. Das komplexere Modell gewinnt hier knapp — Bias-Varianz-Trade-off ist nicht immer trivial.',
      },
      {
        id: 'p1.ev.ex6',
        difficulty: 4,
        conceptTags: ['expectation', 'variance'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Mini-Batch-Gradient $g_B = \\frac{1}{B}\\sum_{i \\in B} \\nabla \\ell_i$. Falls $\\text{Var}(\\nabla \\ell_i) = \\sigma^2$ und Samples unabhängig, was ist $\\text{Var}(g_B)$?',
        options: [
          '$\\frac{\\sigma^2}{B}$ — Varianz skaliert mit $1/B$',
          '$B \\cdot \\sigma^2$',
          '$\\sigma^2$ — unabhängig von Batch-Größe',
          '$\\frac{\\sigma^2}{B^2}$',
        ],
        answer: '$\\frac{\\sigma^2}{B}$ — Varianz skaliert mit $1/B$',
        hints: [
          '$g_B = \\frac{1}{B}\\sum_i \\nabla \\ell_i$. Varianz des Durchschnitts.',
          '$\\text{Var}(\\frac{1}{B}\\sum_i X_i) = \\frac{1}{B^2} \\cdot B \\cdot \\sigma^2 = \\frac{\\sigma^2}{B}$.',
          'Größerer Batch → kleinere Gradient-Varianz.',
        ],
        explanation:
          '$\\text{Var}(g_B) = \\sigma^2/B$. Doppelter Batch halbiert Gradient-Varianz → stabileres Training. Aber: 2× mehr Berechnungszeit. Optimale Batch-Größe ist ein empirisches Trade-off.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Erwartungswert und Varianz in der Praxis\n\n**Gradient-Varianz**: `torch.var(grads)` über Mini-Batch-Gradienten zeigt, ob Training stabil ist. Hohe Varianz → kleinere Lernrate oder größere Batches.\n\n**Gewichts-Statistiken**: `model.weight.mean()` und `model.weight.std()` nach Training. Sollten nach BatchNorm ≈ 0 / 1 sein.\n\n**Adam**: $m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t$ schätzt $E[g]$; $v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2$ schätzt $E[g^2]$. Effektive Lernrate $\\hat{m}_t/\\sqrt{\\hat{v}_t}$ = Gradient / SD des Gradienten.',
      },
      {
        kind: 'callout',
        content:
          'Adam adaptiert Lernraten pro Parameter: $\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\hat{m}_t/(\\sqrt{\\hat{v}_t}+\\epsilon)$. Das ist im Wesentlichen ein geschätzter Erwartungswert geteilt durch Standardabweichung — Normierung des Gradienten.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.ev.card1',
      front: 'Verschiebungsformel für Varianz?',
      back: '$\\text{Var}(X) = E[X^2] - (E[X])^2$.',
      conceptTags: ['variance'],
    },
    {
      id: 'p1.ev.card2',
      front: 'Wie skaliert Gradient-Varianz mit Batch-Größe $B$?',
      back: '$\\text{Var}(g_B) = \\sigma^2/B$ — größerer Batch → stabilere Gradienten.',
      conceptTags: ['variance'],
    },
    {
      id: 'p1.ev.card3',
      front: 'Bias-Varianz-Dekomposition des Fehlers?',
      back: '$E[\\text{Fehler}] = \\text{Bias}^2 + \\text{Varianz} + \\text{Rauschen}$.',
      conceptTags: ['bias-variance'],
    },
  ],
}
