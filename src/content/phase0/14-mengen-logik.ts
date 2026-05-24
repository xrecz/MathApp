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
}
