import type { Lesson } from '../../types'

export const potenzenWurzeln: Lesson = {
  id: 'p0.potenzen-wurzeln',
  title: 'Potenzen & Wurzeln',
  conceptTags: ['exponent', 'power', 'root', 'algebra'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Potenzen & Wurzeln\n\nEine **Potenz** $a^n$ bedeutet: $a$ wird $n$-mal mit sich selbst multipliziert. Negative Exponenten drehen das um — aus dem Zähler wird ein Nenner. Bruch-Exponenten sind Wurzeln.',
      },
      {
        kind: 'math',
        content:
          '$$a^{-n} = \\frac{1}{a^n} \\qquad a^{1/n} = \\sqrt[n]{a} \\qquad a^0 = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die L2-Norm $\\|x\\| = \\sqrt{x_1^2 + x_2^2 + \\ldots}$ misst die Länge von Vektoren — z.B. die Distanz zwischen Embeddings in einem Sprachmodell.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Die 5 Potenzgesetze\n\nDiese Regeln gelten immer, solange die Basis $\\neq 0$ ist:',
      },
      {
        kind: 'math',
        content:
          '$$a^m \\cdot a^n = a^{m+n} \\qquad (a^m)^n = a^{m \\cdot n} \\qquad \\frac{a^m}{a^n} = a^{m-n}$$',
      },
      {
        kind: 'math',
        content: '$$a^{-n} = \\frac{1}{a^n} \\qquad a^{1/n} = \\sqrt[n]{a}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32$\n\n**Beispiel**: $4^{1/2} = \\sqrt{4} = 2$\n\n**Beispiel**: $3^{-2} = \\frac{1}{3^2} = \\frac{1}{9} \\approx 0{,}111$',
      },
    ],
    practice: [
      {
        id: 'p0.potenzen.ex1',
        difficulty: 1,
        conceptTags: ['exponent'],
        type: 'numeric',
        prompt: 'Berechne $3^4$.',
        answer: 81,
        hints: [
          '$3^4$ bedeutet $3 \\cdot 3 \\cdot 3 \\cdot 3$.',
          '$3 \\cdot 3 = 9$, dann $9 \\cdot 9 = ?$',
          '$9 \\cdot 9 = 81$.',
        ],
        explanation: '$3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.',
      },
      {
        id: 'p0.potenzen.ex2',
        difficulty: 2,
        conceptTags: ['exponent', 'algebra'],
        type: 'mc',
        prompt: 'Vereinfache $a^3 \\cdot a^2$.',
        options: ['$a^5$', '$a^6$', '$2a^5$', '$a^1$'],
        answer: '$a^5$',
        hints: [
          'Beim Multiplizieren von Potenzen mit gleicher Basis addiert man die Exponenten.',
          '$a^m \\cdot a^n = a^{m+n}$',
          '$a^3 \\cdot a^2 = a^{3+2} = a^5$.',
        ],
        explanation: '$a^3 \\cdot a^2 = a^{3+2} = a^5$ (Potenzgesetz: Exponent addieren).',
        misconceptions: {
          '$a^6$': 'Beim Multiplizieren addiert man Exponenten, nicht multipliziert: $3 + 2 = 5$, nicht $6$.',
        },
      },
      {
        id: 'p0.potenzen.ex3',
        difficulty: 2,
        conceptTags: ['root'],
        type: 'numeric',
        prompt: 'Berechne $\\sqrt{144}$.',
        answer: 12,
        hints: [
          'Welche Zahl ergibt quadriert 144?',
          '$10^2 = 100$, $12^2 = ?$',
          '$12 \\cdot 12 = 144$, also $\\sqrt{144} = 12$.',
        ],
        explanation: '$\\sqrt{144} = 12$, weil $12^2 = 144$.',
      },
      {
        id: 'p0.potenzen.ex4',
        difficulty: 3,
        conceptTags: ['exponent', 'negative'],
        type: 'numeric',
        prompt: 'Was ist $2^{-2}$? Gib die Dezimalzahl an.',
        answer: 0.25,
        acceptedAlternatives: ['0,25', '1/4', '0.25'],
        hints: [
          'Negativer Exponent bedeutet: Kehrwert bilden.',
          '$2^{-2} = \\frac{1}{2^2}$',
          '$\\frac{1}{4} = 0{,}25$.',
        ],
        explanation: '$2^{-2} = \\frac{1}{2^2} = \\frac{1}{4} = 0{,}25$.',
      },
      {
        id: 'p0.potenzen.ex5',
        difficulty: 4,
        conceptTags: ['root', 'norm'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Die L2-Norm des Vektors $(3, 4)$ ist $\\sqrt{3^2 + 4^2}$. Berechne sie.',
        answer: 5,
        hints: [
          'Berechne zuerst $3^2$ und $4^2$.',
          '$3^2 + 4^2 = 9 + 16 = 25$.',
          '$\\sqrt{25} = 5$.',
        ],
        explanation:
          '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Das ist der bekannte 3-4-5-Pythagoras-Satz.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## L2-Norm in ML\n\nDie L2-Norm $\\|x\\| = \\sqrt{\\sum_i x_i^2}$ ist die Standard-Distanz im ML. Sie steckt in drei wichtigen Konzepten:',
      },
      {
        kind: 'text',
        content:
          '**L2-Regularisierung (Weight Decay)**: Bestraft große Gewichte durch $\\lambda \\|w\\|^2$. Verhindert Overfitting.\n\n**Embedding-Distanz**: Wie ähnlich sind zwei Wörter oder Sätze? Misst man mit dem Abstand ihrer Embedding-Vektoren.\n\n**MSE-Loss**: $\\frac{1}{n} \\sum (\\hat{y}_i - y_i)^2$ ist im Kern das Quadrat der L2-Norm des Fehlers.',
      },
      {
        kind: 'callout',
        content:
          'Potenzen und Wurzeln sind nicht abstrakte Gymnasialstoff — sie stecken in jedem Trainingsschritt eines neuronalen Netzes.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.potenzen.card1',
      front: 'Was bedeutet $a^{-n}$?',
      back: '$\\frac{1}{a^n}$ — der Kehrwert der Potenz.',
      conceptTags: ['exponent'],
    },
    {
      id: 'p0.potenzen.card2',
      front: 'Wie schreibt man $\\sqrt{a}$ als Potenz?',
      back: '$a^{1/2}$',
      conceptTags: ['root'],
    },
    {
      id: 'p0.potenzen.card3',
      front: 'L2-Norm in $\\mathbb{R}^2$?',
      back: '$\\|x\\| = \\sqrt{x_1^2 + x_2^2}$',
      conceptTags: ['norm'],
    },
  ],

  learningOutcome:
    'Du kannst Potenzgesetze sicher anwenden, negative und gebrochene Exponenten interpretieren und die L2-Norm für ML-Vektoren berechnen.',

  description:
    'Du lernst die fünf Potenzgesetze sowie negative und gebrochene Exponenten kennen — und vor allem *warum* sie gelten. Das ist das Fundament für L2-Norm, Weight Decay und MSE-Loss in jedem ML-Modell.',

  conceptSteps: [
    {
      title: 'Was ist eine Potenz?',
      preprompt: 'Stell dir vor, du verdoppelst etwas immer wieder. $2 → 4 → 8 → 16$. Welches Muster siehst du?',
      body: 'Eine **Potenz** $a^n$ bedeutet: $a$ wird $n$-mal mit sich selbst multipliziert.\n\n$$a^n = \\underbrace{a \\cdot a \\cdot \\ldots \\cdot a}_{n \\text{ mal}}$$\n\n$a$ heißt **Basis**, $n$ heißt **Exponent**.',
      visual: `<svg viewBox="0 0 240 80" width="240" height="80" aria-label="Potenzen von 2">
        <rect x="0" y="0" width="240" height="80" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <text x="20" y="24" fill="rgb(156 163 175)" font-size="11" font-family="monospace">2¹ = 2</text>
        <text x="20" y="42" fill="rgb(134 239 172)" font-size="11" font-family="monospace">2² = 4</text>
        <text x="20" y="60" fill="rgb(96 165 250)" font-size="11" font-family="monospace">2³ = 8</text>
        <text x="130" y="24" fill="rgb(251 191 36)" font-size="11" font-family="monospace">2⁴ = 16</text>
        <text x="130" y="42" fill="rgb(251 191 36)" font-size="11" font-family="monospace">2⁵ = 32</text>
        <text x="130" y="60" fill="rgb(251 191 36)" font-size="11" font-family="monospace">2¹⁰ = 1024</text>
      </svg>`,
      miniExample: '**Beispiel**: $3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$',
    },
    {
      title: 'Warum gilt $a^0 = 1$?',
      preprompt: 'Was passiert, wenn man $2^3, 2^2, 2^1$ beobachtet — jedes Mal durch $2$ geteilt. Was kommt als nächstes?',
      body: 'Schau auf das **absteigende Muster** (jeweils $\\div a$):\n\n$$a^3 \\to a^2 \\to a^1 \\to a^0$$\n\n$$27 \\to 9 \\to 3 \\to \\,?$$\n\nDer nächste Schritt: $3 \\div 3 = 1$. Algebraisch:\n\n$$\\frac{a^n}{a^n} = 1 \\quad \\text{und} \\quad \\frac{a^n}{a^n} = a^{n-n} = a^0 \\quad \\Rightarrow \\quad a^0 = 1$$',
      miniExample: '$5^0 = 1$, $\\pi^0 = 1$, $(-7)^0 = 1$ — immer, solange Basis $\\neq 0$.',
      selfCheck: 'Warum funktioniert $0^0$ nicht? (Das Muster $0 \\div 0$ ist nicht definiert — $0^0$ ist ein Sonderfall.)',
    },
    {
      title: 'Negative Exponenten: der Kehrwert',
      body: 'Das Abstiegs-Muster geht weiter unter null:\n\n$$a^1 \\to a^0 \\to a^{-1} \\to a^{-2}$$\n$$3 \\to 1 \\to \\tfrac{1}{3} \\to \\tfrac{1}{9}$$\n\nAllgemein: $a^{-n} = \\dfrac{1}{a^n}$\n\nNegative Exponenten kehren um — der Zähler wird zum Nenner.',
      miniExample: '$2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8} = 0{,}125$',
      selfCheck: 'Warum macht $a^{-n}$ für $a = 0$ keinen Sinn?',
    },
    {
      title: 'Gebrochene Exponenten sind Wurzeln',
      body: 'Was bedeutet $a^{1/2}$? Wende das **Potenz-von-Potenz-Gesetz** an:\n\n$$(a^{1/2})^2 = a^{\\frac{1}{2} \\cdot 2} = a^1 = a$$\n\nDie Zahl, die quadriert $a$ ergibt, ist die Wurzel:\n\n$$a^{1/2} = \\sqrt{a} \\qquad a^{1/n} = \\sqrt[n]{a}$$\n\nAllgemein: $a^{m/n} = \\sqrt[n]{a^m}$',
      miniExample: '$8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4$',
    },
    {
      title: 'Die 5 Potenzgesetze im Überblick',
      body: '$$\\begin{aligned}\na^m \\cdot a^n &= a^{m+n} && \\text{(Basis gleich: addieren)}\\\\\n\\frac{a^m}{a^n} &= a^{m-n} && \\text{(Basis gleich: subtrahieren)}\\\\\n(a^m)^n &= a^{m \\cdot n} && \\text{(Potenz-von-Potenz: multiplizieren)}\\\\\n(ab)^n &= a^n b^n && \\text{(Produkt hoch n)}\\\\\na^{-n} &= \\frac{1}{a^n} && \\text{(negativ = Kehrwert)}\n\\end{aligned}$$',
      selfCheck: 'Welches Gesetz gilt für $(a^3)^4$? Warum ist es $a^{12}$ und nicht $a^7$?',
    },
    {
      title: 'ML-Anwendung: L2-Norm',
      body: 'Die **L2-Norm** eines Vektors $x = (x_1, x_2, \\ldots, x_n)$ ist:\n\n$$\\|x\\| = \\sqrt{x_1^2 + x_2^2 + \\cdots + x_n^2} = \\left(\\sum_{i=1}^n x_i^2\\right)^{1/2}$$\n\nDas ist Pythagoras in $n$ Dimensionen — und steckt überall in ML:\n\n- **MSE-Loss**: $\\frac{1}{n}\\|\\hat{y} - y\\|^2$\n- **Weight Decay**: $\\lambda \\|w\\|^2$ bestraft große Gewichte\n- **Embedding-Distanz**: $\\|e_1 - e_2\\|$ misst Ähnlichkeit',
      miniExample: 'Für $(3, 4)$: $\\|(3,4)\\| = \\sqrt{9 + 16} = \\sqrt{25} = 5$ (klassischer 3-4-5 Satz)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: L2-Norm & Weight Decay',
      lang: 'python',
      code: `import torch

# L2-Norm eines Vektors — entspricht ||x|| = sqrt(sum(x_i^2))
x = torch.tensor([3.0, 4.0])
norm = torch.norm(x)          # = 5.0   (Pythagoras in 2D)
norm_manual = (x ** 2).sum() ** 0.5  # selbe Berechnung: a^(1/2)

# Weight Decay in SGD — straft große Gewichte: lambda * ||w||^2
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    weight_decay=1e-4    # lambda = 0.0001; addiert grad += 2*lambda*w
)

# MSE Loss = (1/n) * ||y_hat - y||^2
y_hat = torch.tensor([2.5, 0.5, 2.0])
y     = torch.tensor([3.0, 0.0, 2.0])
mse   = ((y_hat - y) ** 2).mean()  # = 1/3 * (0.25 + 0.25 + 0) ≈ 0.167`,
      annotation: '`torch.norm(x)` berechnet $\\|x\\|_2$ (Standard). `x ** 2` wendet $a^n$ elementweise an — genau das Potenzgesetz $(ab)^n = a^n b^n$ bei gleicher Basis. `weight_decay` fügt $\\lambda \\cdot 2w$ zum Gradienten hinzu, was $\\frac{d}{dw}(\\lambda\\|w\\|^2) = 2\\lambda w$ entspricht.',
    },
  ],

  derivations: [
    {
      claim: '$a^0 = 1$ gilt für alle $a \\neq 0$',
      reasoning:
        'Schau auf das absteigende Muster: $a^3 \\to a^2 \\to a^1$ — jeder Schritt dividiert durch $a$. Der nächste Schritt: $a^1 \\div a = a/a = 1$. Algebraisch: $\\frac{a^n}{a^n} = 1$ (Bruch kürzen) und gleichzeitig $\\frac{a^n}{a^n} = a^{n-n} = a^0$ (Potenzgesetz). Beides muss gleich sein → $a^0 = 1$.',
    },
    {
      claim: '$a^{1/n} = \\sqrt[n]{a}$ für $a \\geq 0$',
      reasoning:
        'Wende das Potenz-von-Potenz-Gesetz an: $(a^{1/n})^n = a^{\\frac{1}{n} \\cdot n} = a^1 = a$. Die Zahl, die $n$-mal mit sich selbst multipliziert $a$ ergibt, ist per Definition $\\sqrt[n]{a}$. Also muss $a^{1/n} = \\sqrt[n]{a}$ sein.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$a^3 \\cdot a^4 = a^{12}$',
      correct: '$a^3 \\cdot a^4 = a^7$',
      explanation:
        'Bei Multiplikation gleicher Basen werden Exponenten **addiert** ($3+4=7$), nicht multipliziert. Multiplizieren gilt nur beim Potenz-von-Potenz-Gesetz: $(a^3)^4 = a^{12}$.',
    },
    {
      wrong: '$(a + b)^2 = a^2 + b^2$',
      correct: '$(a + b)^2 = a^2 + 2ab + b^2$',
      explanation:
        'Potenzen verteilen sich **nicht** über Addition! Das ist eine der häufigsten Fehlerquellen — auch im ML, z.B. beim Ausmultiplizieren von Termen im Gradientenabstieg.',
    },
    {
      wrong: '$(a^3)^4 = a^{3+4} = a^7$',
      correct: '$(a^3)^4 = a^{3 \\cdot 4} = a^{12}$',
      explanation:
        'Potenz-von-Potenz: Exponenten **multiplizieren** ($3 \\times 4 = 12$). Verwechslung mit dem Produkt-Gesetz ($a^m \\cdot a^n = a^{m+n}$) ist sehr häufig.',
    },
  ],

  furtherResources: [
    {
      title: 'BetterExplained: "Understanding Exponents (Why does 0^0 = 1?)"',
      type: 'article',
      note: 'Das "Expand-o-tron"-Modell macht Null- und Bruch-Exponenten wirklich intuitiv',
    },
    {
      title: 'Khan Academy: "The zeroth power" (Video)',
      type: 'video',
      note: 'Visuelles Abstiegs-Pattern; 3 Minuten',
    },
    {
      title: 'Serlo: "Potenzgesetze" — serlo.org/mathe/1867/potenzgesetze',
      type: 'article',
      note: 'Deutsche Referenz mit allen Regeln und Übungsaufgaben',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.logarithmus',
      relation: 'extends',
      hint: 'Logarithmus ist die Umkehrfunktion der Potenz — $a^x = y \\Leftrightarrow \\log_a y = x$.',
    },
    {
      lessonId: 'p0.vektoren',
      relation: 'extends',
      hint: 'Die L2-Norm $\\|x\\| = \\sqrt{\\sum x_i^2}$ verbindet Potenzen direkt mit Vektoren.',
    },
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'see-also',
      hint: 'Eigenwerte als Streckungsfaktoren: $Av = \\lambda v$ — $\\lambda$ verhält sich wie eine Potenz-Skalierung.',
    },
  ],

  reflection: 'Du hast gelernt: **Potenzgesetze** sind keine Regeln zum Auswendiglernen, sondern Konsequenzen aus dem Abstiegs-Muster. Die L2-Norm $\\|x\\| = (\\sum x_i^2)^{1/2}$ ist ein Bruch-Exponent — steckt in jedem Training-Loop. Welches Potenzgesetz hat dich am meisten überrascht?',
}
