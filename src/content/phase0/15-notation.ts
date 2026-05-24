import type { Lesson } from '../../types'

export const notation: Lesson = {
  id: 'p0.notation',
  title: 'Mathematische Notation (ML-Spezifisch)',
  conceptTags: ['notation', 'sigma', 'sum', 'expectation', 'argmax'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## ML-Notation lesen\n\nML-Papers nutzen kompakte mathematische Notation. Die häufigsten Symbole: $\\sum$ (Summe), $\\prod$ (Produkt), $\\mathbb{E}[\\cdot]$ (Erwartungswert), $\\arg\\max$, $\\arg\\min$, $\\propto$ (proportional zu).',
      },
      {
        kind: 'math',
        content:
          '$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\ldots + x_n \\qquad f: \\mathbb{R}^n \\to \\mathbb{R}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: "$\\hat{y} = \\arg\\max_y P(y \\mid x)$" — Vorhersage = die Klasse mit höchster bedingter Wahrscheinlichkeit. Jeder Klassifikator macht das bei der Inferenz.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Summen-Zeichen $\\sum$\n\n$\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\ldots + a_n$\n\n**Lauf-Index** $i$: von 1 bis $n$. Jedes Mal wird $a_i$ addiert.\n\n### Funktionssignaturen\n\n$f: \\mathbb{R}^n \\to \\mathbb{R}$: nimmt einen $n$-dimensionalen Vektor, gibt einen Skalar zurück (typisch für Loss-Funktionen).\n\n$f: \\mathbb{R}^{m \\times n} \\to \\mathbb{R}^m$: nimmt eine Matrix, gibt einen Vektor zurück.',
      },
      {
        kind: 'worked-example',
        content:
          '**MSE-Loss als Summe**: $L(w) = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2$\n\nDas ist der Durchschnitt der quadrierten Fehler über alle $n$ Datenpunkte.\n\n**$\\arg\\max$**: $\\hat{y} = \\arg\\max_j p_j$ — wähle den Index $j$ mit dem größten $p_j$.',
      },
    ],
    practice: [
      {
        id: 'p0.nota.ex1',
        difficulty: 1,
        conceptTags: ['sum'],
        type: 'numeric',
        prompt: 'Berechne $\\sum_{i=1}^{4} i$ (Summe von 1 bis 4).',
        answer: 10,
        hints: [
          '$\\sum_{i=1}^{4} i = 1 + 2 + 3 + 4$',
          '$1 + 2 = 3$, dann $3 + 3 = 6$, dann $6 + 4 = ?$',
          '$6 + 4 = 10$.',
        ],
        explanation: '$\\sum_{i=1}^{4} i = 1 + 2 + 3 + 4 = 10$.',
      },
      {
        id: 'p0.nota.ex2',
        difficulty: 2,
        conceptTags: ['sum'],
        type: 'numeric',
        prompt: 'Berechne $\\sum_{i=1}^{3} i^2$ (Summe der Quadrate von 1 bis 3).',
        answer: 14,
        hints: [
          '$1^2 + 2^2 + 3^2$',
          '$1 + 4 + 9 = ?$',
          '$1 + 4 + 9 = 14$.',
        ],
        explanation: '$\\sum_{i=1}^{3} i^2 = 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14$.',
      },
      {
        id: 'p0.nota.ex3',
        difficulty: 2,
        conceptTags: ['notation', 'function'],
        type: 'mc',
        prompt: 'Was bedeutet $f: \\mathbb{R}^2 \\to \\mathbb{R}$?',
        options: [
          'Eine Funktion, die einen 2D-Vektor nimmt und eine Zahl zurückgibt',
          'Eine Funktion, die eine Zahl nimmt und einen 2D-Vektor zurückgibt',
          'Eine Funktion von reellen Zahlen zu reellen Zahlen',
          'Eine Funktion, die zwei Zahlen nimmt und zwei zurückgibt',
        ],
        answer: 'Eine Funktion, die einen 2D-Vektor nimmt und eine Zahl zurückgibt',
        hints: [
          '$\\mathbb{R}^2$ ist die Eingabe (ein 2D-Vektor).',
          '$\\to \\mathbb{R}$ ist die Ausgabe (eine einzelne reelle Zahl).',
          'Typisches Beispiel: eine Loss-Funktion mit 2 Parametern.',
        ],
        explanation:
          '$f: \\mathbb{R}^2 \\to \\mathbb{R}$ nimmt einen 2-dimensionalen Vektor und gibt einen Skalar aus.',
      },
      {
        id: 'p0.nota.ex4',
        difficulty: 3,
        conceptTags: ['argmax'],
        type: 'mc',
        prompt: 'Was bedeutet $\\arg\\max_x f(x)$?',
        options: [
          'Das $x$, bei dem $f$ am größten ist',
          'Der maximale Wert von $f$',
          'Das $x$, bei dem $f$ am kleinsten ist',
          'Die Ableitung von $f$',
        ],
        answer: 'Das $x$, bei dem $f$ am größten ist',
        hints: [
          '$\\arg$ steht für "Argument" — nicht den Wert, sondern die Eingabe.',
          '$\\max$ steht für Maximum.',
          '$\\arg\\max_x f(x)$ = das $x$, für das $f(x)$ maximal ist.',
        ],
        explanation:
          '$\\arg\\max_x f(x)$ gibt das $x$ zurück, nicht den Maximalwert. Beispiel: bei $f(x) = -(x-3)^2$ ist $\\arg\\max_x f(x) = 3$.',
        misconceptions: {
          'Der maximale Wert von $f$': 'Das wäre $\\max_x f(x)$. $\\arg\\max$ gibt das Argument (Eingabe), nicht den Wert.',
        },
      },
      {
        id: 'p0.nota.ex5',
        difficulty: 3,
        conceptTags: ['argmax', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Softmax-Output ist $(0{,}1,\\; 0{,}7,\\; 0{,}2)$ für (Hund, Katze, Vogel). Was ergibt $\\arg\\max$?',
        options: ['Katze (Index 1)', 'Hund (Index 0)', 'Vogel (Index 2)', '0,7'],
        answer: 'Katze (Index 1)',
        hints: [
          '$\\arg\\max$ sucht das Element mit dem höchsten Wert.',
          'Die Werte sind $0{,}1$, $0{,}7$, $0{,}2$. Welcher ist am größten?',
          '$0{,}7$ ist am größten, das ist Index 1 (Katze).',
        ],
        explanation:
          '$\\arg\\max(0{,}1, 0{,}7, 0{,}2) = 1$ (Index der Katze). Die Vorhersage ist "Katze".',
        misconceptions: {
          '0,7': 'Das ist $\\max$, nicht $\\arg\\max$. $\\arg\\max$ gibt den Index zurück, nicht den Wert.',
        },
      },
      {
        id: 'p0.nota.ex6',
        difficulty: 4,
        conceptTags: ['sum', 'cross-entropy'],
        type: 'mc',
        prompt:
          'Was bedeutet $\\sum_{i=1}^{n} y_i \\log \\hat{y}_i$ im Kontext von Cross-Entropy?',
        options: [
          'Summe der Log-Likelihoods: wie gut das Modell die Labels erklärt',
          'Summe aller Vorhersagen',
          'Mittelwert der Fehler',
          'Produkt aller Wahrscheinlichkeiten',
        ],
        answer: 'Summe der Log-Likelihoods: wie gut das Modell die Labels erklärt',
        hints: [
          '$y_i$ sind die wahren Labels, $\\hat{y}_i$ die Vorhersagen.',
          '$\\log \\hat{y}_i$ ist negativ (da $0 < \\hat{y}_i \\leq 1$), summiert über Klassen.',
          'Die Cross-Entropy ist $-\\sum y_i \\log \\hat{y}_i$ — negiert, damit wir minimieren.',
        ],
        explanation:
          '$\\sum y_i \\log \\hat{y}_i$ ist die Log-Likelihood. Cross-Entropy ist das Negative davon, damit wir minimieren können (weniger = besser).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Notation als Sprache\n\nEin typischer Satz aus einem ML-Paper: "$\\hat{y} = \\arg\\max_y P(y \\mid x)$". Übersetzt: "Die Vorhersage ist diejenige Klasse $y$, für die die bedingte Wahrscheinlichkeit gegeben $x$ maximal ist."',
      },
      {
        kind: 'text',
        content:
          'Oder aus dem Transformer-Paper: "$\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V$"\n\nJetzt kannst du lesen: das ist ein Softmax auf dem Produkt zweier Matrizen $Q$ und $K$, skaliert durch $\\sqrt{d_k}$, multipliziert mit $V$.',
      },
      {
        kind: 'callout',
        content:
          'Mit dieser Lektion hast du das Werkzeug, um ML-Papers zu lesen. Das ist eine echte Superkraft — die meisten Informatiker können ML-Code schreiben, aber nicht ML-Papers verstehen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.nota.card1',
      front: 'Was bedeutet $\\sum_{i=1}^{n} x_i$?',
      back: '$x_1 + x_2 + \\ldots + x_n$ — Summe aller $x_i$.',
      conceptTags: ['sum'],
    },
    {
      id: 'p0.nota.card2',
      front: '$f: \\mathbb{R}^n \\to \\mathbb{R}$ — was beschreibt das?',
      back: 'Funktion: $n$-dim Vektor → Skalar (typisch: Loss-Funktion).',
      conceptTags: ['notation', 'function'],
    },
    {
      id: 'p0.nota.card3',
      front: 'Was tut $\\arg\\max_x f(x)$?',
      back: 'Gibt das $x$ zurück, bei dem $f$ maximal ist (nicht den Maximalwert).',
      conceptTags: ['argmax'],
    },
  ],

  learningOutcome:
    'Du kannst $\\sum$, $\\prod$, $\\mathbb{E}$, $\\arg\\max$, $\\arg\\min$ und Funktionssignaturen lesen — und Loss-Formeln aus ML-Papers direkt entschlüsseln.',

  description:
    'Mathematische Notation ist die Sprache der ML-Theorie. Wer sie nicht lesen kann, ist ausgesperrt — wer sie beherrscht, kann echte Forschungspapiere verstehen. Diese Lektion macht dich flüssig in der wichtigsten ML-Notation.',

  conceptSteps: [
    {
      title: 'Summenzeichen $\\sum$ — kompakte Iteration',
      preprompt: 'Du berechnest den Mittelwert von $n$ Zahlen. Wie würdest du die Summe ohne "..." aufschreiben?',
      body: 'Das Summenzeichen $\\sum$ ist kompakte Notation für wiederholte Addition:\n\n$$\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n$$\n\n**Bestandteile**:\n- Laufindex $i$: von unterer Grenze (hier $1$) bis obere Grenze (hier $n$)\n- $a_i$: der Term, der für jeden Index berechnet wird\n\n**Varianten**:\n$$\\sum_{i \\in S} a_i \\quad \\text{(über Indexmenge)} \\qquad \\sum_{i=0}^{\\infty} a_i \\quad \\text{(unendliche Reihe)}$$',
      miniExample: '$\\sum_{i=1}^{4} i^2 = 1 + 4 + 9 + 16 = 30$',
      selfCheck: 'Schreibe $\\bar{x} = \\frac{1}{n}(x_1 + \\cdots + x_n)$ mit $\\sum$. ($\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i$)',
    },
    {
      title: 'Produktzeichen $\\prod$ und doppelte Summen',
      body: '**Produktzeichen** analog zu $\\sum$, aber mit Multiplikation:\n\n$$\\prod_{i=1}^{n} a_i = a_1 \\cdot a_2 \\cdots a_n$$\n\nIn ML erscheint $\\prod$ z.B. in der Likelihood:\n$$P(x_1, \\ldots, x_n) = \\prod_{i=1}^{n} P(x_i) \\quad \\text{(Unabhängigkeit)}$$\n\n**Doppelsummen** (z.B. über Matrix-Einträge):\n$$\\sum_{i=1}^{m} \\sum_{j=1}^{n} A_{ij} \\quad \\text{(Summe aller Matrixeinträge)}$$\n\nIn PyTorch: `loss.mean()` $= \\frac{1}{n} \\sum_{i=1}^n \\ell_i$.',
      miniExample: '$\\prod_{i=1}^{4} i = 1 \\cdot 2 \\cdot 3 \\cdot 4 = 24$ (Fakultät $4!$)',
      selfCheck: 'Warum wird Log-Likelihood $\\sum \\ln P(x_i)$ statt $\\prod P(x_i)$ gerechnet? (Numerische Stabilität: $\\prod$ von vielen kleinen Zahlen = Underflow; $\\sum \\ln$ bleibt in handhabaren Bereichen.)',
    },
    {
      title: 'Mengennotation und Funktionssignaturen',
      body: '**Funktionssignaturen** beschreiben Eingabe und Ausgabe:\n\n$$f: \\mathbb{R}^n \\to \\mathbb{R} \\quad \\text{(Vektor → Skalar, z.B. Loss)}$$\n$$f: \\mathbb{R}^{m \\times n} \\to \\mathbb{R}^m \\quad \\text{(Matrix → Vektor)}$$\n$$f: \\mathbb{R}^n \\to \\mathbb{R}^m \\quad \\text{(Vektor → Vektor, z.B. softmax)}$$\n\n**Indizierung**:\n- $w_i$ oder $w_{ij}$: $i$-te Komponente, $(i,j)$-ter Matrixeintrag\n- $x^{(k)}$: $k$-tes Datenpunkt (Hochstellung in Klammern = Beispiel-Index)\n- $x_i^{(k)}$: $i$-te Feature des $k$-ten Beispiels',
      miniExample: 'Cross-Entropy: $L: \\mathbb{R}^K \\times \\{1,\\ldots,K\\} \\to \\mathbb{R}$ — nimmt Logit-Vektor und Label, gibt Loss zurück',
    },
    {
      title: 'Normnotation: $\\|\\cdot\\|$, $|\\cdot|$',
      body: '**Norm** (Vektorgröße):\n$$\\|x\\|_2 = \\sqrt{\\sum_i x_i^2} \\quad \\text{(L2-Norm, Standard)}$$\n$$\\|x\\|_1 = \\sum_i |x_i| \\quad \\text{(L1-Norm, Summe der Beträge)}$$\n$$\\|x\\|_\\infty = \\max_i |x_i| \\quad \\text{(Maximum-Norm)}$$\n\n**Betrag** (Skalar): $|x| = $ Abstand von 0\n\n**Matrixnorm**: $\\|A\\|_F = \\sqrt{\\sum_{ij} A_{ij}^2}$ (Frobenius-Norm)\n\nIn ML: L2-Regularisierung = $\\lambda \\|w\\|_2^2$; L1 erzeugt Sparsität.',
      miniExample: '$\\|(1, -2, 2)\\|_2 = \\sqrt{1+4+4} = 3$; $\\|(1,-2,2)\\|_1 = 1+2+2 = 5$',
      selfCheck: 'Welche Norm berechnet `torch.norm(w)` standardmäßig? (L2-Norm.)',
    },
    {
      title: 'Erwartungswert $\\mathbb{E}$, Proportionalität $\\propto$',
      body: '**Erwartungswert** $\\mathbb{E}[X]$: Durchschnittswert einer Zufallsvariable:\n\n$$\\mathbb{E}_{x \\sim p}[f(x)] = \\int f(x) p(x)\\, dx \\quad \\text{oder} \\quad \\frac{1}{n}\\sum_{i=1}^n f(x_i)$$\n\nIn ML-Loss-Formeln:\n$$\\mathcal{L}(w) = \\mathbb{E}_{(x,y) \\sim \\mathcal{D}}[\\ell(f_w(x), y)]$$\n\n**Proportionalität** $\\propto$: Proportional, d.h. gleich bis auf Konstante:\n$$f(x) \\propto g(x) \\Leftrightarrow f(x) = c \\cdot g(x) \\text{ für Konstante } c$$\n\nIn Bayes: $P(\\theta \\mid x) \\propto P(x \\mid \\theta) P(\\theta)$ — man ignoriert die Normalisierungskonstante.',
      miniExample: '$\\mathbb{E}[\\text{Würfelwurf}] = \\frac{1+2+3+4+5+6}{6} = 3{,}5$',
    },
    {
      title: 'ML: Loss-Formeln lesen und verstehen',
      body: '**MSE-Loss** (Mean Squared Error):\n$$\\mathcal{L}_{\\text{MSE}}(w) = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2 = \\frac{1}{n} \\|\\hat{y} - y\\|_2^2$$\n\n**Cross-Entropy-Loss**:\n$$\\mathcal{L}_{\\text{CE}}(w) = -\\frac{1}{n} \\sum_{i=1}^{n} \\sum_{k=1}^{K} y_{ik} \\ln \\hat{y}_{ik}$$\n\n**Gradient-Update** (SGD):\n$$w_{t+1} = w_t - \\eta \\cdot \\frac{1}{|B|} \\sum_{i \\in B} \\nabla_w \\ell(f_w(x_i), y_i)$$\n\nJetzt kannst du jede dieser Formeln Zeichen für Zeichen lesen!',
      miniExample: '$w_{t+1} = w_t - 0{,}01 \\cdot \\nabla_w \\mathcal{L}$ — Lernrate $\\eta = 0{,}01$, Schritt in Richtung negativer Gradient',
      selfCheck: 'Was bedeutet $\\sum_{i \\in B}$ im SGD-Update? (Summe über alle Beispiele im aktuellen Mini-Batch $B$, nicht über alle Trainingsdaten.)',
    },
  ],

  derivations: [
    {
      claim: 'MSE-Loss $= \\frac{1}{n} \\|\\hat{y} - y\\|_2^2$',
      reasoning:
        '$\\frac{1}{n} \\sum_{i=1}^n (\\hat{y}_i - y_i)^2 = \\frac{1}{n} \\sum_{i=1}^n (\\hat{y} - y)_i^2 = \\frac{1}{n} \\|\\hat{y} - y\\|_2^2$, da $\\|v\\|_2^2 = \\sum_i v_i^2$ per Definition der L2-Norm. Die Vektornotation ist kompakter und zeigt direkt den geometrischen Bezug (L2-Distanz).',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\max_x f(x)$ ist dasselbe wie $\\arg\\max_x f(x)$',
      correct: '$\\max_x f(x)$ gibt den **Wert**, $\\arg\\max_x f(x)$ gibt das **Argument**',
      explanation:
        'Für $f(x) = -(x-3)^2$: $\\max_x f(x) = 0$ (der Maximalwert), aber $\\arg\\max_x f(x) = 3$ (das $x$, bei dem das Maximum erreicht wird).',
    },
    {
      wrong: '$\\sum_{i=1}^{n} c = c$ (eine Konstante summieren ergibt die Konstante)',
      correct: '$\\sum_{i=1}^{n} c = n \\cdot c$',
      explanation:
        'Eine Konstante summiert über $n$ Terme ergibt $n$-faches der Konstante. Beispiel: $\\sum_{i=1}^{5} 3 = 3 + 3 + 3 + 3 + 3 = 15 = 5 \\cdot 3$.',
    },
    {
      wrong: '$f: \\mathbb{R}^n \\to \\mathbb{R}^m$ bedeutet Dimension $n \\times m$',
      correct: 'Es bedeutet: Eingabe in $\\mathbb{R}^n$, Ausgabe in $\\mathbb{R}^m$',
      explanation:
        'Die Signatur beschreibt Eingabe- und Ausgabe-Raum, nicht eine Matrix-Dimension. $f: \\mathbb{R}^3 \\to \\mathbb{R}^2$ nimmt einen 3D-Vektor und gibt einen 2D-Vektor zurück.',
    },
  ],

  furtherResources: [
    {
      title: 'Mathematics for Machine Learning — Deisenroth et al. (Kapitel 1)',
      type: 'article',
      note: 'Kostenlos online; Kapitel 1 bietet einen vollständigen Notation-Überblick für ML',
    },
    {
      title: 'Deep Learning Notation Guide — Goodfellow et al.',
      type: 'article',
      note: 'Offizielle Notation-Konventionen aus dem Standard-Lehrbuch',
    },
    {
      title: 'Serlo: "Summenzeichen" — serlo.org',
      type: 'article',
      note: 'Deutsche Einführung mit interaktiven Übungen zum Summenzeichen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.mengen-logik',
      relation: 'requires',
      hint: 'Mengennotation ($\\in$, $\\forall$, $\\exists$) ist Voraussetzung für das Lesen von Loss-Formeln.',
    },
    {
      lessonId: 'p0.deskriptive-statistik',
      relation: 'see-also',
      hint: 'Mittelwert, Varianz und Standardabweichung nutzen $\\sum$ — direkte Anwendung der Notation.',
    },
    {
      lessonId: 'p1.partielle-ableitungen-gradient',
      relation: 'see-also',
      hint: 'Gradientenabstieg-Formel $w \\leftarrow w - \\eta \\nabla_w \\mathcal{L}$ verwendet alle Notationskonventionen aus dieser Lektion.',
    },
  ],

  reflection: 'Du hast gelernt: **Mathematische Notation** ist eine Sprache — und jetzt kannst du sie lesen. Loss-Formeln, Gradient-Updates, Erwartungswerte — alles davon ist jetzt entschlüsselbar. Welche Formel aus einem ML-Paper hat dich früher verwirrt, die du jetzt lesen kannst?',
}
