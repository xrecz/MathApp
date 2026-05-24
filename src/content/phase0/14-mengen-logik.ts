import type { Lesson } from '../../types'

export const mengenLogik: Lesson = {
  id: 'p0.mengen-logik',
  title: 'Mengen & Quantoren',
  conceptTags: ['set', 'logic', 'quantifier', 'notation'],
  estimatedMinutes: 10,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Mengen & mathematische Logik\n\nEine **Menge** ist eine Sammlung von Objekten. Mengen beschreiben in ML z.B. Trainingsdaten, erlaubte Parameterwerte oder Klassen. **Quantoren** drücken aus, ob etwas für alle oder nur für manche Elemente gilt.',
      },
      {
        kind: 'math',
        content:
          '$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\qquad x \\in A \\text{ (x ist Element von A)} \\qquad x \\notin A$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Jedes ML-Paper und jedes Lehrbuch (z.B. Goodfellows "Deep Learning") nutzt diese Notation auf jeder Seite. Sie zu lesen ist genauso wichtig wie Code zu lesen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Standardmengen\n\n- $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$ — natürliche Zahlen\n- $\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$ — ganze Zahlen\n- $\\mathbb{Q}$ — rationale Zahlen (Brüche)\n- $\\mathbb{R}$ — reelle Zahlen (alle Zahlen auf der Zahlengeraden)\n\n### Mengenoperationen\n\n- $A \\cup B$ — Vereinigung (alles aus A oder B)\n- $A \\cap B$ — Schnittmenge (nur was in beiden ist)',
      },
      {
        kind: 'text',
        content:
          '### Quantoren\n\n- $\\forall x \\in M: P(x)$ — "Für alle $x$ in $M$ gilt $P(x)$"\n- $\\exists x \\in M: P(x)$ — "Es gibt mindestens ein $x$ in $M$, für das $P(x)$ gilt"',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $\\forall x \\in \\mathbb{R}: x^2 \\geq 0$\n\nBedeutung: "Für alle reellen Zahlen ist das Quadrat nicht-negativ." — Wahr!\n\n**Beispiel**: $\\exists x \\in \\mathbb{R}: x^2 = 4$\n\nBedeutung: "Es gibt eine reelle Zahl, deren Quadrat 4 ist." — Wahr ($x = 2$).',
      },
    ],
    practice: [
      {
        id: 'p0.menge.ex1',
        difficulty: 1,
        conceptTags: ['set', 'membership'],
        type: 'mc',
        prompt: '$5 \\in \\mathbb{N}$?',
        options: ['Ja, wahr', 'Nein, falsch'],
        answer: 'Ja, wahr',
        hints: [
          '$\\mathbb{N}$ sind die natürlichen Zahlen: $1, 2, 3, \\ldots$',
          'Ist 5 eine natürliche Zahl?',
          'Ja — 5 ist positiv und ganzzahlig.',
        ],
        explanation: '$5 \\in \\mathbb{N}$ ist wahr: 5 ist eine natürliche Zahl.',
      },
      {
        id: 'p0.menge.ex2',
        difficulty: 1,
        conceptTags: ['set', 'membership'],
        type: 'mc',
        prompt: '$-3 \\in \\mathbb{N}$?',
        options: ['Nein, falsch', 'Ja, wahr'],
        answer: 'Nein, falsch',
        hints: [
          '$\\mathbb{N}$ enthält nur positive ganze Zahlen: $1, 2, 3, \\ldots$',
          'Negative Zahlen sind nicht in $\\mathbb{N}$.',
          '$-3 \\in \\mathbb{Z}$, aber $-3 \\notin \\mathbb{N}$.',
        ],
        explanation: '$-3 \\notin \\mathbb{N}$: natürliche Zahlen sind positiv. $-3 \\in \\mathbb{Z}$ (ganze Zahlen).',
        misconceptions: {
          'Ja, wahr': '$\\mathbb{N}$ enthält nur positive Zahlen ($1, 2, 3, \\ldots$), keine negativen.',
        },
      },
      {
        id: 'p0.menge.ex3',
        difficulty: 2,
        conceptTags: ['quantifier'],
        type: 'mc',
        prompt: 'Was bedeutet $\\forall x \\in \\mathbb{R}: x^2 \\geq 0$?',
        options: [
          'Für alle reellen $x$ ist $x^2$ nicht-negativ',
          'Für manche reellen $x$ ist $x^2$ nicht-negativ',
          'Es gibt ein $x$, sodass $x^2 = 0$',
          '$x^2$ ist immer positiv',
        ],
        answer: 'Für alle reellen $x$ ist $x^2$ nicht-negativ',
        hints: [
          '$\\forall$ bedeutet "für alle".',
          'Die Aussage gilt für jede reelle Zahl $x$.',
          'Quadrieren ist immer $\\geq 0$ (bei $x=0$ ist $x^2 = 0$).',
        ],
        explanation: '$\\forall$ = "für alle". $x^2 \\geq 0$ gilt für jede reelle Zahl (auch $0^2 = 0$).',
        misconceptions: {
          '$x^2$ ist immer positiv': 'Nicht ganz: für $x = 0$ gilt $x^2 = 0$, also nicht strikt positiv.',
        },
      },
      {
        id: 'p0.menge.ex4',
        difficulty: 3,
        conceptTags: ['quantifier'],
        type: 'mc',
        prompt: 'Was bedeutet $\\exists x \\in \\mathbb{R}: x^2 = 4$?',
        options: [
          'Es gibt mindestens eine reelle Zahl, deren Quadrat 4 ist',
          'Alle reellen Zahlen haben Quadrat 4',
          'Keine reelle Zahl hat Quadrat 4',
          'Es gibt genau eine reelle Zahl mit Quadrat 4',
        ],
        answer: 'Es gibt mindestens eine reelle Zahl, deren Quadrat 4 ist',
        hints: [
          '$\\exists$ bedeutet "es existiert mindestens ein".',
          'Ist die Aussage wahr? $2^2 = 4$ — ja, es gibt solche Zahlen.',
          '(Sogar zwei: $x = 2$ und $x = -2$.)',
        ],
        explanation:
          '$\\exists$ = "es existiert". Es gibt tatsächlich zwei: $x = 2$ und $x = -2$. Mindestens eine reicht.',
        misconceptions: {
          'Es gibt genau eine reelle Zahl mit Quadrat 4': '$\\exists$ bedeutet "mindestens eine", nicht "genau eine".',
        },
      },
      {
        id: 'p0.menge.ex5',
        difficulty: 4,
        conceptTags: ['quantifier', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Was sagt $\\forall i: p_i \\in [0, 1]$ über eine Wahrscheinlichkeitsverteilung aus?',
        options: [
          'Alle Wahrscheinlichkeiten liegen zwischen 0 und 1',
          'Mindestens eine Wahrscheinlichkeit ist 1',
          'Die Summe aller $p_i$ ist 1',
          'Alle $p_i$ sind gleich',
        ],
        answer: 'Alle Wahrscheinlichkeiten liegen zwischen 0 und 1',
        hints: [
          '$\\forall i$ bedeutet "für alle Indizes $i$".',
          '$p_i \\in [0, 1]$ bedeutet: jedes einzelne $p_i$ ist zwischen 0 und 1.',
          'Das ist eine notwendige (aber nicht hinreichende!) Bedingung für eine Wahrscheinlichkeitsverteilung.',
        ],
        explanation:
          '$\\forall i: p_i \\in [0, 1]$ heißt: jede Einzelwahrscheinlichkeit ist zwischen 0 und 1. Für eine vollständige Verteilung muss noch $\\sum_i p_i = 1$ gelten.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Notation in ML-Papern\n\nWenn du ein ML-Paper liest, stehen diese Symbole überall. Einige typische Formeln aus echten Papern:',
      },
      {
        kind: 'text',
        content:
          '- $\\forall (x, y) \\in \\mathcal{D}: \\hat{y} = f(x)$ — Vorhersage für alle Datenpunkte\n- $\\exists w^* \\in \\mathbb{R}^n: L(w^*) \\leq L(w) \\;\\forall w$ — es gibt ein globales Minimum\n- $w \\in \\mathbb{R}^d$ — Gewichtsvektor im $d$-dimensionalen Raum',
      },
      {
        kind: 'callout',
        content:
          'Diese Notation ist das "Alphabet" der Mathematik. Wer sie nicht lesen kann, kann keine ML-Theorie verstehen — genauso wie man Python nicht verstehen kann, wenn man Variablen und Schleifen nicht kennt.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.menge.card1',
      front: '$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$ — was ist was?',
      back: 'Natürliche, ganze, rationale, reelle Zahlen.',
      conceptTags: ['set'],
    },
    {
      id: 'p0.menge.card2',
      front: 'Was bedeutet $\\forall$?',
      back: '"Für alle" — gilt für jedes Element der Menge.',
      conceptTags: ['quantifier'],
    },
    {
      id: 'p0.menge.card3',
      front: 'Was bedeutet $\\exists$?',
      back: '"Es existiert mindestens ein" — reicht, wenn es ein einziges Beispiel gibt.',
      conceptTags: ['quantifier'],
    },
  ],

  learningOutcome:
    'Du kannst Mengennotation lesen und schreiben, Boolesche Operationen anwenden und Quantoren ($\\forall$, $\\exists$) korrekt interpretieren — das Rüstzeug für ML-Theorie.',

  description:
    'Mengen und Logik sind das "Alphabet" der Mathematik. Von ML-Papern bis zu Loss-Formeln — wer diese Notation nicht lesen kann, kann keine mathematische KI-Theorie verstehen. Du lernst Mengenoperationen, Boolesche Logik und Quantoren.',

  conceptSteps: [
    {
      title: 'Was ist eine Menge?',
      preprompt: 'Du trainierst ein Modell auf Hunde- und Katzenbildern. Wie würdest du die Menge "alle Trainingsbilder" und die Teilmenge "alle Hundebilder" mathematisch beschreiben?',
      body: 'Eine **Menge** ist eine ungeordnete Sammlung eindeutiger Objekte:\n\n$$A = \\{1, 2, 3\\} \\qquad B = \\{x \\in \\mathbb{R} \\mid x > 0\\}$$\n\nNotation:\n- $x \\in A$: "$x$ ist Element von $A$"\n- $x \\notin A$: "$x$ ist nicht Element von $A$"\n- $A \\subseteq B$: "$A$ ist Teilmenge von $B$" (jedes Element von $A$ ist in $B$)\n- $|A|$: Kardinalität (Anzahl der Elemente)\n\nStandardmengen: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$',
      miniExample: '$\\mathcal{D} = \\{(x_1, y_1), \\ldots, (x_n, y_n)\\}$ — Trainingsdatensatz als Menge von Paaren',
      selfCheck: 'Ist $\\{1, 2, 3\\}$ gleich $\\{3, 1, 2\\}$? (Ja — Mengen sind ungeordnet.)',
    },
    {
      title: 'Mengenoperationen: ∪ ∩ \\',
      body: 'Die drei Grundoperationen:\n\n$$A \\cup B = \\{x \\mid x \\in A \\text{ oder } x \\in B\\} \\quad \\text{(Vereinigung)}$$\n\n$$A \\cap B = \\{x \\mid x \\in A \\text{ und } x \\in B\\} \\quad \\text{(Schnittmenge)}$$\n\n$$A \\setminus B = \\{x \\mid x \\in A \\text{ und } x \\notin B\\} \\quad \\text{(Differenz)}$$\n\nIn ML: Klassen-Mengen schneiden sich nicht (Ausnahme: Multi-Label-Klassifikation). Training, Validation und Test-Sets sind paarweise disjunkt: $T \\cap V = \\emptyset$.',
      visual: `<svg viewBox="0 0 260 110" width="260" height="110" aria-label="Venn-Diagramm">
        <rect x="0" y="0" width="260" height="110" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <circle cx="95" cy="55" r="42" fill="rgb(96 165 250)" fill-opacity="0.25" stroke="rgb(96 165 250)" stroke-width="1.5"/>
        <circle cx="155" cy="55" r="42" fill="rgb(134 239 172)" fill-opacity="0.25" stroke="rgb(134 239 172)" stroke-width="1.5"/>
        <text x="68" y="50" fill="rgb(96 165 250)" font-size="10" font-family="monospace">A</text>
        <text x="183" y="50" fill="rgb(134 239 172)" font-size="10" font-family="monospace">B</text>
        <text x="118" y="50" fill="rgb(251 191 36)" font-size="9" font-family="monospace">A∩B</text>
        <text x="70" y="95" fill="rgb(156 163 175)" font-size="9">nur A</text>
        <text x="178" y="95" fill="rgb(156 163 175)" font-size="9">nur B</text>
        <text x="105" y="95" fill="rgb(251 191 36)" font-size="9">beide</text>
      </svg>`,
      miniExample: '$A = \\{1,2,3,4\\}$, $B = \\{3,4,5,6\\}$: $A \\cap B = \\{3,4\\}$, $A \\cup B = \\{1,2,3,4,5,6\\}$',
      selfCheck: 'Was ist $A \\setminus B$ für obige Mengen? ($A \\setminus B = \\{1, 2\\}$ — was in $A$ aber nicht in $B$ ist.)',
    },
    {
      title: 'Venn-Diagramme und Mengenlehre',
      body: 'Venn-Diagramme visualisieren Mengenbeziehungen:\n\n- **Disjunkte Mengen**: $A \\cap B = \\emptyset$ — Kreise überlappen nicht\n- **Teilmenge**: $A \\subseteq B$ — $A$-Kreis liegt komplett in $B$-Kreis\n- **Komplementmenge**: $\\bar{A} = \\mathbb{R} \\setminus A$ — alles außerhalb von $A$\n\n**De Morgan-Gesetze** (wichtig für Logik):\n$$\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B} \\qquad \\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}$$',
      miniExample: 'Train/Val/Test-Split: $\\mathcal{D} = T \\cup V \\cup E$ mit $T \\cap V = T \\cap E = V \\cap E = \\emptyset$',
    },
    {
      title: 'Boolesche Logik: AND, OR, NOT',
      body: 'Boolesche Algebra ist die Logik des Computers — und früher Neuronaler Netze:\n\n| A | B | A AND B | A OR B | NOT A |\n|---|---|---------|--------|-------|\n| 0 | 0 | 0 | 0 | 1 |\n| 0 | 1 | 0 | 1 | 1 |\n| 1 | 0 | 0 | 1 | 0 |\n| 1 | 1 | 1 | 1 | 0 |\n\nBeziehung zu Mengen: AND = $\\cap$, OR = $\\cup$, NOT = Komplement.\n\n**Historisch**: McCulloch-Pitts-Neuronen (1943) konnten AND/OR implementieren — die Grundidee des modernen Neurons.',
      selfCheck: 'XOR (exklusives OR): wahr wenn genau eine Eingabe wahr ist. Kann ein einzelnes lineares Neuron XOR lernen? (Nein — XOR ist nicht linear trennbar, deshalb braucht man mehrschichtige Netze.)',
    },
    {
      title: 'Quantoren: ∀ und ∃',
      body: 'Quantoren drücken aus, für *wie viele* Elemente etwas gilt:\n\n$$\\forall x \\in M: P(x) \\quad \\text{"Für alle } x \\text{ in } M \\text{ gilt } P(x)"}$$\n\n$$\\exists x \\in M: P(x) \\quad \\text{"Es gibt mindestens ein } x \\text{ in } M \\text{ mit } P(x)"}$$\n\n**Negation**:\n$$\\neg(\\forall x: P(x)) \\equiv \\exists x: \\neg P(x)$$\n$$\\neg(\\exists x: P(x)) \\equiv \\forall x: \\neg P(x)$$\n\nBeispiel: Um zu zeigen, dass ein Modell **nicht** für alle Eingaben funktioniert, reicht ein **Gegenbeispiel** ($\\exists$).',
      miniExample: '$\\forall (x, y) \\in \\mathcal{D}_{\\text{test}}: \\hat{y}(x) \\neq y$ — das Modell liegt auf allen Testbeispielen falsch (ein schlechtes Modell!)',
      selfCheck: 'Negiere $\\forall x \\in \\mathbb{R}: x^2 \\geq 0$. (Da dies wahr ist, ist die Negation falsch: $\\exists x \\in \\mathbb{R}: x^2 < 0$ — und in der Tat gibt es kein solches reelles $x$.)',
    },
    {
      title: 'ML: Klassen, Datensätze und Entscheidungsgrenzen',
      body: 'In ML beschreiben Mengen die Struktur der Daten:\n\n$$\\mathcal{D} = \\{(x_i, y_i)\\}_{i=1}^n \\quad x_i \\in \\mathbb{R}^d, \\; y_i \\in \\mathcal{Y}$$\n\nDie **Entscheidungsgrenze** eines Klassifikators teilt den Feature-Raum $\\mathbb{R}^d$:\n$$C_k = \\{x \\in \\mathbb{R}^d \\mid f(x) = k\\} \\quad \\text{(Region für Klasse } k\\text{)}$$\n\n**Verlustfunktion als Menge**:\n$$\\mathcal{L}(w) = \\frac{1}{|\\mathcal{D}|} \\sum_{(x,y) \\in \\mathcal{D}} \\ell(f_w(x), y)$$\n\nDie Notation $\\sum_{(x,y) \\in \\mathcal{D}}$ sagt: "iteriere über alle Elemente der Menge $\\mathcal{D}$".',
      selfCheck: 'Was bedeutet $w^* = \\arg\\min_{w \\in \\mathbb{R}^d} \\mathcal{L}(w)$? (Die optimalen Gewichte $w^*$ sind das Element aus $\\mathbb{R}^d$, das den Loss minimiert.)',
    },
  ],

  derivations: [
    {
      claim: 'De Morgan: $\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$',
      reasoning:
        '$x \\in \\overline{A \\cup B}$ bedeutet $x \\notin (A \\cup B)$, also $x \\notin A$ und $x \\notin B$, also $x \\in \\bar{A}$ und $x \\in \\bar{B}$, also $x \\in \\bar{A} \\cap \\bar{B}$. Beide Richtungen funktionieren, also sind die Mengen gleich.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\{1, 2, 3\\} = \\{1, 2, 2, 3\\}$ ist eine andere Menge',
      correct: 'Mengen enthalten jedes Element nur einmal: $\\{1, 2, 2, 3\\} = \\{1, 2, 3\\}$',
      explanation:
        'Mengen haben keine Duplikate und keine Reihenfolge. Im Gegensatz dazu hat eine **Liste** (in Python: `[1, 2, 2, 3]`) Duplikate und Reihenfolge.',
    },
    {
      wrong: '$\\exists x: P(x)$ bedeutet "genau ein $x$"',
      correct: '$\\exists x: P(x)$ bedeutet "mindestens ein $x$"',
      explanation:
        'Für "genau ein" schreibt man $\\exists! x: P(x)$. Das normale $\\exists$ ist erfüllt, auch wenn viele $x$ die Bedingung erfüllen.',
    },
    {
      wrong: '$A \\cup B$ und $A \\cap B$ verwechseln',
      correct: '$\\cup$ = Vereinigung (alles), $\\cap$ = Schnitt (gemeinsam)',
      explanation:
        'Merkhilfe: $\\cup$ sieht aus wie ein "U" (Union = Vereinigung = alles zusammen). $\\cap$ ist das Gegenteil — nur das, was sich überschneidet.',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: "Basic set operations"',
      type: 'video',
      note: 'Visuelle Einführung in Vereinigung, Schnittmenge und Venn-Diagramme',
    },
    {
      title: 'Serlo: "Mengen" — serlo.org',
      type: 'article',
      note: 'Deutsche Einführung mit interaktiven Aufgaben zu Mengenoperationen',
    },
    {
      title: 'Goodfellow et al.: "Deep Learning", Kapitel 2.1 — Notation',
      type: 'article',
      note: 'Zeigt, wie Mengen-Notation in einem echten ML-Lehrbuch eingesetzt wird',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.notation',
      relation: 'extends',
      hint: 'Notation-Lektion vertieft Summenzeichen und Funktionssignaturen — baut auf Mengennotation auf.',
    },
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'see-also',
      hint: 'Wahrscheinlichkeitsräume sind Mengen mit Maß — $P: \\mathcal{F} \\to [0,1]$ auf einer Sigma-Algebra.',
    },
    {
      lessonId: 'p1.zufallsvariablen',
      relation: 'see-also',
      hint: 'Zufallsvariablen sind Funktionen auf Mengen (Ereignisraum → reelle Zahlen).',
    },
  ],

  reflection: 'Du hast gelernt: **Mengen und Logik** sind das Fundament, auf dem die gesamte ML-Theorie aufbaut. $\\forall, \\exists, \\cup, \\cap$ tauchen in jedem ML-Paper auf. Was hat sich für dich durch diese Lektion geändert, wenn du eine mathematische Formel siehst?',
}
