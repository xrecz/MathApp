import type { Lesson } from '../../types'

export const exponentialfunktionen: Lesson = {
  id: 'p0.exponentialfunktionen',
  title: 'Exponentialfunktionen & die Zahl e',
  conceptTags: ['function', 'exponential', 'growth', 'euler'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Exponentialfunktionen\n\nBei $f(x) = a^x$ steht die Variable im **Exponenten** — das ist das Gegenteil von $f(x) = x^a$ (Potenzfunktion). Exponentialfunktionen wachsen dramatisch schnell. Die wichtigste Basis ist die **Euler-Zahl** $e \\approx 2{,}71828$.',
      },
      {
        kind: 'math',
        content: '$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2{,}71828$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die Sigmoid-Funktion $\\sigma(x) = \\frac{1}{1+e^{-x}}$ und Softmax basieren beide auf $e^x$. Sie sind die wichtigsten Aktivierungsfunktionen in neuronalen Netzen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Warum $e$?\n\n$e^x$ ist seine eigene Ableitung: $\\frac{d}{dx} e^x = e^x$. Das macht Ableitungen von Modellen (Backpropagation!) einfach berechenbar.\n\n**Verhalten**:\n- $e^0 = 1$\n- $e^x \\to \\infty$ für $x \\to +\\infty$\n- $e^{-x} \\to 0$ für $x \\to +\\infty$ (fällt zu 0)',
      },
      {
        kind: 'worked-example',
        content:
          '**Sigmoid**: $\\sigma(x) = \\frac{1}{1+e^{-x}}$\n\n$\\sigma(0) = \\frac{1}{1+e^0} = \\frac{1}{1+1} = 0{,}5$\n\n$\\sigma(\\infty) \\to \\frac{1}{1+0} = 1$ (wächst gegen 1)\n\n$\\sigma(-\\infty) \\to \\frac{1}{1+\\infty} = 0$ (fällt gegen 0)',
      },
    ],
    practice: [
      {
        id: 'p0.exp.ex1',
        difficulty: 1,
        conceptTags: ['exponential', 'euler'],
        type: 'numeric',
        prompt: 'Welchen Wert hat $e$ ungefähr? Gib auf 2 Nachkommastellen.',
        answer: 2.72,
        acceptedAlternatives: ['2.71', '2,71', '2,72', '2.718', '2,718'],
        hints: [
          '$e$ ist eine mathematische Konstante, ähnlich wie $\\pi$.',
          '$e \\approx 2{,}7...$',
          '$e \\approx 2{,}71828$, gerundet auf 2 Stellen: $2{,}72$.',
        ],
        explanation: '$e \\approx 2{,}71828$. Gerundet: $2{,}72$.',
      },
      {
        id: 'p0.exp.ex2',
        difficulty: 1,
        conceptTags: ['exponential'],
        type: 'numeric',
        prompt: 'Was ist $e^0$?',
        answer: 1,
        hints: [
          'Jede Basis hoch 0 ergibt 1.',
          '$a^0 = 1$ für alle $a \\neq 0$.',
          '$e^0 = 1$.',
        ],
        explanation: '$e^0 = 1$ — gilt für jede Basis: $a^0 = 1$.',
      },
      {
        id: 'p0.exp.ex3',
        difficulty: 2,
        conceptTags: ['exponential', 'growth'],
        type: 'mc',
        prompt: 'Welche Funktion wächst langfristig schneller als jedes Polynom?',
        options: ['$e^x$', '$x^{100}$', '$x^2 + 1000x$', '$\\ln(x)$'],
        answer: '$e^x$',
        hints: [
          'Polynome haben einen festen Grad, Exponentialfunktionen nicht.',
          '$e^x$ verdoppelt sich alle ~0,7 Einheiten.',
          'Für sehr großes $x$ überholt $e^x$ jedes Polynom.',
        ],
        explanation:
          '$e^x$ wächst schneller als jedes Polynom $x^n$, egal wie groß $n$ ist.',
      },
      {
        id: 'p0.exp.ex4',
        difficulty: 3,
        conceptTags: ['exponential', 'sigmoid', 'ml'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: Berechne $\\sigma(0) = \\frac{1}{1 + e^0}$.',
        answer: 0.5,
        acceptedAlternatives: ['0,5', '1/2', '0.50'],
        hints: [
          '$e^0 = 1$.',
          '$\\sigma(0) = \\frac{1}{1+1} = \\frac{1}{2}$.',
          '$\\frac{1}{2} = 0{,}5$.',
        ],
        explanation: '$\\sigma(0) = \\frac{1}{1+e^0} = \\frac{1}{1+1} = \\frac{1}{2} = 0{,}5$.',
      },
      {
        id: 'p0.exp.ex5',
        difficulty: 4,
        conceptTags: ['sigmoid', 'asymptote'],
        type: 'mc',
        prompt: 'Gegen welchen Wert nähert sich $\\sigma(x) = \\frac{1}{1+e^{-x}}$ für sehr großes positives $x$?',
        options: ['1', '0', '$\\infty$', '0,5'],
        answer: '1',
        hints: [
          'Für großes $x$ wird $e^{-x}$ sehr klein.',
          '$e^{-x} \\to 0$, also $\\sigma(x) = \\frac{1}{1+0} = ?$',
          '$\\frac{1}{1} = 1$.',
        ],
        explanation:
          'Für $x \\to +\\infty$: $e^{-x} \\to 0$, daher $\\sigma(x) \\to \\frac{1}{1+0} = 1$.',
        misconceptions: {
          '$\\infty$': 'Sigmoid ist beschränkt: $\\sigma(x) \\in (0, 1)$ für alle $x$.',
        },
      },
      {
        id: 'p0.exp.ex6',
        difficulty: 4,
        conceptTags: ['sigmoid', 'asymptote'],
        type: 'mc',
        prompt: 'Gegen welchen Wert nähert sich $\\sigma(x)$ für sehr großes negatives $x$?',
        options: ['0', '1', '$-\\infty$', '0,5'],
        answer: '0',
        hints: [
          'Für großes negatives $x$ wird $e^{-x} = e^{|x|}$ sehr groß.',
          '$\\sigma(x) = \\frac{1}{1 + \\text{(sehr große Zahl)}}$',
          'Nähert sich 0.',
        ],
        explanation:
          'Für $x \\to -\\infty$: $e^{-x} \\to \\infty$, daher $\\sigma(x) \\to 0$. Sigmoid liegt immer in $(0, 1)$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sigmoid und Softmax\n\n**Sigmoid** bringt eine beliebige reelle Zahl in $(0, 1)$ — perfekt für binäre Klassifikation (Wahrscheinlichkeit für eine Klasse).\n\n**Softmax** verallgemeinert das auf mehrere Klassen:',
      },
      {
        kind: 'math',
        content:
          '$$\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Klassifikationsmodell — von logistischer Regression bis GPT — endet mit Softmax oder Sigmoid. Du hast gerade die mathematische Grundlage dieser Funktionen verstanden.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.exp.card1',
      front: 'Wert von $e$?',
      back: '$e \\approx 2{,}71828$',
      conceptTags: ['euler'],
    },
    {
      id: 'p0.exp.card2',
      front: 'Sigmoid-Formel?',
      back: '$\\sigma(x) = \\frac{1}{1+e^{-x}}$',
      conceptTags: ['sigmoid'],
    },
    {
      id: 'p0.exp.card3',
      front: 'Sigmoid-Wertebereich?',
      back: '$(0, 1)$ — offen an beiden Enden.',
      conceptTags: ['sigmoid'],
    },
  ],

  learningOutcome:
    'Du kannst die Exponentialfunktion $f(x) = e^x$ beschreiben, ihren Graphen interpretieren und erkennst, warum Sigmoid und Softmax — die wichtigsten Aktivierungsfunktionen — direkt auf $e^x$ basieren.',

  description:
    'Die natürliche Exponentialfunktion $e^x$ ist die Mutter aller Aktivierungsfunktionen: Sigmoid $\\sigma(x) = 1/(1+e^{-x})$ normiert Ausgaben auf $(0,1)$, Softmax verallgemeinert das auf mehrere Klassen. Die einzigartige Eigenschaft $\\frac{d}{dx}e^x = e^x$ macht Backpropagation einfach berechenbar.',

  conceptSteps: [
    {
      title: 'Exponentielles Wachstum — Intuition',
      preprompt: 'Ein Virus infiziert täglich doppelt so viele Menschen wie am Vortag. Nach 10 Tagen sind es $2^{10} = 1024$ Fälle. Nach 30 Tagen? Was passiert bei kontinuierlichem statt täglichem Wachstum?',
      body: 'Bei **exponentiellem Wachstum** ist die Wachstumsrate proportional zur aktuellen Größe:\n\n$$\\frac{d}{dt} P(t) = r \\cdot P(t) \\quad \\Rightarrow \\quad P(t) = P_0 \\cdot e^{rt}$$\n\n- Wachstum ($r > 0$): $e^{rt} \\to \\infty$\n- Zerfall ($r < 0$): $e^{rt} \\to 0$\n- Der Unterschied zu $a^x$ (Potenzfunktion): die Variable steht im **Exponenten**',
      miniExample: 'Populationswachstum: $P(t) = 100 \\cdot e^{0{,}1t}$. Nach $t=10$: $P = 100 \\cdot e \\approx 272$.',
      selfCheck: 'Was ist $e^x$ für sehr großes $x$? Für sehr negatives $x$? ($e^x \\to \\infty$ bzw. $e^x \\to 0$.)',
    },
    {
      title: 'Die Euler-Zahl $e$ als natürliche Basis',
      body: 'Die **Euler-Zahl** $e \\approx 2{,}71828$ ist definiert als:\n\n$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$$\n\nWarum ist $e$ die "natürliche" Basis?\n\n- Als einzige Basis gilt: $\\frac{d}{dx} e^x = e^x$ (eigene Ableitung)\n- Das vereinfacht alle Berechnungen mit Ableitungen enorm\n- Alternative Definition: $e = \\sum_{k=0}^{\\infty} \\frac{1}{k!} = 1 + 1 + \\frac{1}{2} + \\frac{1}{6} + \\ldots$',
      miniExample: '$\\left(1 + \\frac{1}{1000}\\right)^{1000} \\approx 2{,}7169 \\approx e$',
      selfCheck: 'Warum ist $e^0 = 1$? ($a^0 = 1$ für alle $a \\neq 0$, gilt auch für $a = e$.)',
    },
    {
      title: 'Wachstum vs. Zerfall: Graph von $e^x$',
      body: 'Der Graph von $f(x) = e^x$:\n\n$$e^0 = 1, \\quad e^1 \\approx 2{,}72, \\quad e^{-1} \\approx 0{,}37, \\quad e^{-x} = \\frac{1}{e^x}$$\n\n- Immer **positiv**: $e^x > 0$ für alle $x \\in \\mathbb{R}$\n- Schneidet die y-Achse bei $(0, 1)$\n- Asymptote: $x \\to -\\infty \\Rightarrow e^x \\to 0$ (x-Achse von unten annähern)\n\n**Potenzgesetze** gelten auch für $e$:\n$$e^{a+b} = e^a \\cdot e^b \\qquad e^{-x} = \\frac{1}{e^x} \\qquad (e^x)^n = e^{nx}$$',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Graph von e^x">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="85" x2="250" y2="85" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="100" y1="5" x2="100" y2="95" stroke="rgb(75 85 99)" stroke-width="1"/>
        <path d="M 10,83 Q 60,80 100,65 Q 130,55 160,35 Q 190,15 220,5" stroke="rgb(134 239 172)" stroke-width="2" fill="none"/>
        <line x1="70" y1="45" x2="130" y2="85" stroke="rgb(251 191 36)" stroke-width="1.5" stroke-dasharray="4"/>
        <circle cx="100" cy="65" r="3" fill="rgb(251 191 36)"/>
        <text x="105" y="60" fill="rgb(251 191 36)" font-size="9" font-family="monospace">(0,1)</text>
        <text x="170" y="12" fill="rgb(134 239 172)" font-size="9" font-family="monospace">e^x</text>
        <text x="55" y="48" fill="rgb(251 191 36)" font-size="8" font-family="monospace">Steigung=1</text>
      </svg>`,
      miniExample: '$e^2 \\approx 7{,}39$, $e^{-2} \\approx 0{,}14$. Bei $x=0$ hat $e^x$ Steigung $1$ (da Ableitung $= e^0 = 1$).',
    },
    {
      title: 'Die Ableitung von $e^x$ — das besondere Merkmal',
      body: '$$\\boxed{\\frac{d}{dx} e^x = e^x}$$\n\n$e^x$ ist **seine eigene Ableitung** — keine andere Funktion hat diese Eigenschaft.\n\nDas bedeutet:\n- $\\frac{d}{dx} e^{ax} = a \\cdot e^{ax}$ (Kettenregel)\n- $\\frac{d}{dx} e^{f(x)} = f\'(x) \\cdot e^{f(x)}$\n\nWarum ist das für ML wichtig? Weil Sigmoid, Softmax und Cross-Entropy-Loss alle $e^x$ enthalten, und ihre Ableitungen (für Backpropagation) deshalb einfach zu berechnen sind.',
      miniExample: '$\\frac{d}{dx} e^{-x} = -e^{-x}$ (Kettenregel: $f(x) = -x$, $f\'(x) = -1$).',
      selfCheck: 'Was ist $\\frac{d}{dx} e^{3x}$? (Kettenregel: $3 \\cdot e^{3x}$.)',
    },
    {
      title: 'ML-Anwendung: Sigmoid und Softmax',
      body: '**Sigmoid** — normiert eine reelle Zahl auf $(0, 1)$:\n\n$$\\sigma(x) = \\frac{1}{1 + e^{-x}}$$\n\n- $\\sigma(0) = 0{,}5$, $\\sigma(\\infty) \\to 1$, $\\sigma(-\\infty) \\to 0$\n- Ableitung: $\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$ — elegant durch die $e^x$-Eigenschaft\n\n**Softmax** — normiert Vektoren zu Wahrscheinlichkeiten:\n\n$$\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$$\n\n**Cross-Entropy-Loss** kombiniert Logarithmus und $e^x$:\n\n$$L = -\\sum_i y_i \\log(\\text{softmax}(z_i))$$',
      miniExample: 'Sigmoid-Ableitung bei $x=0$: $\\sigma\'(0) = 0{,}5 \\cdot 0{,}5 = 0{,}25$ (maximale Sensitivität).',
      selfCheck: 'Warum summieren sich Softmax-Ausgaben zu 1? (Zähler und Nenner sind identisch wenn man alle aufsummiert: $\\frac{\\sum e^{z_j}}{\\sum e^{z_j}} = 1$.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: torch.exp, Sigmoid und Softmax',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# e^x in PyTorch
x = torch.tensor([0.0, 1.0, -1.0, 2.0])
exp_x = torch.exp(x)
print(exp_x)  # [1.0000, 2.7183, 0.3679, 7.3891] — e^0=1, e^1≈2.72, e^-1≈0.37

# Sigmoid: sigma(x) = 1 / (1 + e^-x)
sigma_manuell = 1 / (1 + torch.exp(-x))
sigma_pytorch = torch.sigmoid(x)
print(torch.allclose(sigma_manuell, sigma_pytorch))  # True ✓

# Sigmoid bei x=0: sollte 0.5 sein
print(torch.sigmoid(torch.tensor(0.0)))  # tensor(0.5000)

# Softmax: e^z_i / sum(e^z_j)
logits = torch.tensor([2.0, 1.0, 0.5])
softmax_manuell = torch.exp(logits) / torch.exp(logits).sum()
softmax_pytorch = torch.softmax(logits, dim=0)
print(softmax_manuell)         # [0.5765, 0.2120, 0.2114]
print(softmax_manuell.sum())   # tensor(1.0000) ✓`,
      annotation: '`torch.exp(x)` berechnet $e^x$ elementweise — genau $f(x) = e^x$. `1 / (1 + torch.exp(-x))` ist buchstäblich $\\sigma(x) = \\frac{1}{1+e^{-x}}$. `torch.exp(logits) / torch.exp(logits).sum()` zeigt die Bruchstruktur von Softmax direkt — Zähler durch Nenner.',
    },
  ],

  derivations: [
    {
      claim: '$\\frac{d}{dx} e^x = e^x$',
      reasoning:
        'Mit dem Differenzenquotienten: $\\lim_{h \\to 0} \\frac{e^{x+h} - e^x}{h} = e^x \\cdot \\lim_{h \\to 0} \\frac{e^h - 1}{h}$. Es gilt $\\lim_{h \\to 0} \\frac{e^h - 1}{h} = 1$ (Definition von $e$). Also $\\frac{d}{dx} e^x = e^x \\cdot 1 = e^x$.',
    },
    {
      claim: 'Ableitung von Sigmoid: $\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$',
      reasoning:
        '$\\sigma(x) = (1 + e^{-x})^{-1}$. Quotientenregel oder Kettenregel: $\\sigma\'(x) = \\frac{e^{-x}}{(1+e^{-x})^2} = \\frac{1}{1+e^{-x}} \\cdot \\frac{e^{-x}}{1+e^{-x}} = \\sigma(x) \\cdot (1 - \\sigma(x))$. Diese elegante Form macht Backpropagation durch Sigmoid effizient.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$e^{x+y} = e^x + e^y$',
      correct: '$e^{x+y} = e^x \\cdot e^y$',
      explanation:
        'Exponentialgesetze: Bei Addition im Exponenten wird **multipliziert**, nicht addiert. $e^{x+y} = e^x \\cdot e^y$ ist das Potenzgesetz $a^{m+n} = a^m \\cdot a^n$.',
    },
    {
      wrong: '$\\frac{d}{dx} e^{2x} = e^{2x}$',
      correct: '$\\frac{d}{dx} e^{2x} = 2e^{2x}$ (Kettenregel!)',
      explanation:
        'Bei $e^{f(x)}$ muss man die Kettenregel anwenden: $\\frac{d}{dx} e^{f(x)} = f\'(x) \\cdot e^{f(x)}$. Hier $f(x) = 2x$, also $f\'(x) = 2$.',
    },
    {
      wrong: 'Sigmoid kann Werte $\\geq 1$ oder $\\leq 0$ annehmen',
      correct: 'Sigmoid liegt strikt in $(0, 1)$ — nie $0$ oder $1$',
      explanation:
        '$e^{-x} > 0$ für alle $x$, also $1 + e^{-x} > 1$, also $\\sigma(x) = 1/(1+e^{-x}) < 1$. Und da $e^{-x} < \\infty$, gilt $\\sigma(x) > 0$.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "e to the i pi" (YouTube)',
      type: 'video',
      note: 'Intuition für die Euler-Zahl und warum $e$ so besonders ist; 5 Minuten',
    },
    {
      title: 'Khan Academy: "Exponential function differentiation" (Video)',
      type: 'video',
      note: 'Ableitung von $e^x$ und Kettenregel; Anwendungsbeispiele',
    },
    {
      title: 'Serlo: "Exponentialfunktionen" — serlo.org/mathe/exponentialfunktionen',
      type: 'article',
      note: 'Deutsche Referenz mit Graphen, Eigenschaften und Übungen zu $e^x$',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.logarithmus',
      relation: 'extends',
      hint: 'Der Logarithmus ist die Umkehrfunktion von $e^x$: $\\ln(e^x) = x$. Cross-Entropy nutzt $\\ln$.',
    },
    {
      lessonId: 'p0.erste-ableitungen',
      relation: 'requires',
      hint: 'Die Ableitung $\\frac{d}{dx} e^x = e^x$ braucht Ableitungsregeln und Kettenregel als Grundlage.',
    },
    {
      lessonId: 'p0.brueche',
      relation: 'see-also',
      hint: 'Softmax ist ein Bruch mit $e^x$ im Zähler und Nenner — Bruchrechnung und Exponentialfunktionen kombiniert.',
    },
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'extends',
      hint: 'Gaußsche Normalverteilung enthält $e^{-x^2/2}$ — Exponentialfunktion in der Statistik.',
    },
  ],

  reflection: '$e^x$ ist die einzige Funktion, die ihre eigene Ableitung ist. Das ist kein Zufall — $e$ ist genau so definiert, dass diese Eigenschaft gilt. Und sie macht Sigmoid, Softmax und Backpropagation elegant berechenbar. Welche Aktivierungsfunktion würdest du wählen, wenn $e^x$ nicht existieren würde — und was würde das für das Training bedeuten?',
}
