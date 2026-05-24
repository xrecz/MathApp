import type { Lesson } from '../../types'

export const ungleichungen: Lesson = {
  id: 'p0.ungleichungen',
  title: 'Ungleichungen',
  conceptTags: ['inequality', 'constraint', 'interval'],
  estimatedMinutes: 10,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Ungleichungen\n\nUngleichungen beschreiben Wertebereiche statt exakter Gleichheit. Im ML stecken sie überall: Lernrate $\\eta > 0$, Wahrscheinlichkeit $p \\in [0, 1]$, Gewichts-Clipping $w \\in [-c, c]$.',
      },
      {
        kind: 'math',
        content:
          '$$x + 3 > 5 \\quad \\Rightarrow \\quad x > 2 \\qquad \\text{Lösung: alle } x \\text{ rechts von } 2$$',
      },
      {
        kind: 'callout',
        content:
          '**Wichtigste Regel**: Multiplizierst oder dividierst du mit einer **negativen** Zahl, dreht sich das Ungleichungszeichen um! $-x > 2 \\Rightarrow x < -2$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Lösen wie eine Gleichung — bis auf die Vorzeichen-Regel\n\nSchritt-für-Schritt:\n1. Gleiche Terme zusammenfassen.\n2. Variablen auf eine Seite bringen.\n3. Bei Division/Multiplikation mit $< 0$: **Zeichen umdrehen**.\n\n**Intervall-Notation**:\n- $[a, b]$: beide Enden inklusive ($a \\leq x \\leq b$)\n- $(a, b)$: beide Enden exklusive ($a < x < b$)\n- $[a, \\infty)$: ab $a$ aufwärts',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $-2x \\leq 6$\n\nDividiere durch $-2$ — Zeichen dreht sich: $x \\geq -3$\n\n**Beispiel 2**: $3x + 1 < 10$\n\n$3x < 9$ → $x < 3$. Lösung: $(-\\infty, 3)$.',
      },
    ],
    practice: [
      {
        id: 'p0.ineq.ex1',
        difficulty: 1,
        conceptTags: ['inequality'],
        type: 'mc',
        prompt: 'Lösung von $x + 3 > 5$?',
        options: ['$x > 2$', '$x < 2$', '$x > 8$', '$x = 2$'],
        answer: '$x > 2$',
        hints: [
          'Subtrahiere 3 auf beiden Seiten.',
          '$x + 3 - 3 > 5 - 3$',
          '$x > 2$.',
        ],
        explanation: '$x + 3 > 5 \\Rightarrow x > 5 - 3 = 2$.',
        misconceptions: {
          '$x < 2$': 'Das Zeichen dreht sich nur bei Multiplikation/Division durch eine negative Zahl.',
        },
      },
      {
        id: 'p0.ineq.ex2',
        difficulty: 2,
        conceptTags: ['inequality', 'sign-flip'],
        type: 'mc',
        prompt: 'Lösung von $-2x \\leq 6$?',
        options: ['$x \\geq -3$', '$x \\leq -3$', '$x \\geq 3$', '$x \\leq 3$'],
        answer: '$x \\geq -3$',
        hints: [
          'Dividiere durch $-2$ — Zeichen dreht sich!',
          '$-2x \\leq 6 \\div (-2)$: das $\\leq$ wird zu $\\geq$.',
          '$x \\geq -3$.',
        ],
        explanation:
          'Division durch $-2$ (negativ) → Zeichen dreht sich: $x \\geq \\frac{6}{-2} = -3$.',
        misconceptions: {
          '$x \\leq -3$': 'Division durch eine negative Zahl dreht das Ungleichungszeichen um!',
        },
      },
      {
        id: 'p0.ineq.ex3',
        difficulty: 2,
        conceptTags: ['constraint', 'probability'],
        type: 'mc',
        prompt: 'Wahrscheinlichkeiten $p$ erfüllen welche Ungleichung?',
        options: ['$0 \\leq p \\leq 1$', '$0 < p < 1$', '$p \\geq 0$', '$p \\leq 1$'],
        answer: '$0 \\leq p \\leq 1$',
        hints: [
          'Eine Wahrscheinlichkeit von 0 (unmöglich) und 1 (sicher) sind erlaubt.',
          'Also sind beide Grenzen inklusive.',
          '$p \\in [0, 1]$, geschrieben als $0 \\leq p \\leq 1$.',
        ],
        explanation:
          'Wahrscheinlichkeiten dürfen 0 (unmögliches Ereignis) und 1 (sicheres Ereignis) annehmen, daher $0 \\leq p \\leq 1$.',
        misconceptions: {
          '$0 < p < 1$': 'Das würde $p=0$ und $p=1$ ausschließen — beide sind gültige Wahrscheinlichkeiten.',
        },
      },
      {
        id: 'p0.ineq.ex4',
        difficulty: 3,
        conceptTags: ['interval', 'notation'],
        type: 'mc',
        prompt: 'Welches Intervall beschreibt $-1 < x \\leq 5$?',
        options: ['$(-1, 5]$', '$[-1, 5]$', '$(-1, 5)$', '$[-1, 5)$'],
        answer: '$(-1, 5]$',
        hints: [
          'Runde Klammer = exklusive (Grenze nicht enthalten).',
          'Eckige Klammer = inklusive (Grenze enthalten).',
          '$-1$ ist exklusiv (runde Klammer), $5$ ist inklusive (eckige Klammer): $(-1, 5]$.',
        ],
        explanation: '$-1 < x \\leq 5$: linke Grenze offen (runde Klammer), rechte Grenze geschlossen (eckige Klammer).',
        misconceptions: {
          '$[-1, 5]$': '[$-1$ müsste inklusive sein, aber die Bedingung ist $x > -1$, also exklusiv.',
        },
      },
      {
        id: 'p0.ineq.ex5',
        difficulty: 4,
        conceptTags: ['constraint', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Eine Lernrate $\\eta$ muss für Gradient Descent positiv sein. Welche Bedingung gilt?',
        options: ['$\\eta > 0$', '$\\eta \\geq 0$', '$\\eta < 0$', '$\\eta = 0{,}01$'],
        answer: '$\\eta > 0$',
        hints: [
          'Bei $\\eta = 0$ bewegt sich nichts — das ist kein Lernen.',
          'Bei $\\eta < 0$ würde das Modell in die falsche Richtung laufen.',
          'Strikt positiv, also $\\eta > 0$.',
        ],
        explanation:
          '$\\eta > 0$: strikt größer als 0 (nicht nur $\\geq 0$, denn $\\eta = 0$ bedeutet kein Update). Typische Werte: $0{,}001$ bis $0{,}1$.',
        misconceptions: {
          '$\\eta \\geq 0$': '$\\eta = 0$ ist nicht sinnvoll — kein Update, kein Training.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Constraints in der Optimierung\n\nML-Optimierung ist oft **Constrained Optimization**: wir minimieren eine Funktion unter Nebenbedingungen, die als Ungleichungen formuliert sind.',
      },
      {
        kind: 'math',
        content:
          '$$\\min_w L(w) \\quad \\text{s.t.} \\quad \\|w\\|_1 \\leq C$$',
      },
      {
        kind: 'callout',
        content:
          'L1-Regularisierung (Lasso) ist genau das: minimiere den Loss, aber bleib unter einem Budget $C$ für die Summe der absoluten Gewichte. Langrange-Multiplikatoren und KKT-Bedingungen sind die Werkzeuge dafür — gebaut auf dem Fundament, das du gerade gelegt hast.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.ineq.card1',
      front: 'Wann dreht eine Ungleichung das Zeichen?',
      back: 'Bei Multiplikation oder Division mit einer negativen Zahl.',
      conceptTags: ['inequality'],
    },
    {
      id: 'p0.ineq.card2',
      front: 'Was bedeutet $x \\in [a, b]$?',
      back: '$a \\leq x \\leq b$ — beide Enden inklusive.',
      conceptTags: ['interval'],
    },
    {
      id: 'p0.ineq.card3',
      front: 'Wertebereich einer Wahrscheinlichkeit?',
      back: '$p \\in [0, 1]$',
      conceptTags: ['constraint', 'probability'],
    },
  ],

  learningOutcome:
    'Du kannst lineare Ungleichungen und Betragsungleichungen lösen, Lösungsmengen in Intervallnotation angeben und verstehst, wie Constraints in ML-Optimierung und Gradienten-Clipping auf Ungleichungen beruhen.',

  description:
    'Ungleichungen beschreiben Wertebereiche und Einschränkungen: Lernraten müssen positiv sein ($\\eta > 0$), Wahrscheinlichkeiten liegen in $[0,1]$, und Gradienten-Clipping begrenzt Gradienten auf $|g| \\leq c$. In der ML-Optimierung formuliert man Nebenbedingungen als Ungleichungen — das Fundament der konstrained Optimierung.',

  conceptSteps: [
    {
      title: 'Was ist eine Ungleichung?',
      preprompt: 'Du bestellst Pizza und hast maximal 15 Euro. Eine Pizza kostet $3x + 2$ Euro. Für welche Anzahl $x$ reicht dein Geld noch?',
      body: 'Eine **Ungleichung** beschreibt eine Beziehung zwischen Größen, die nicht gleich, sondern **kleiner oder größer** ist:\n\n$$<, \\;\\leq, \\;>, \\;\\geq$$\n\nIm Gegensatz zu Gleichungen ($=$ hat einzelne Lösung) haben Ungleichungen oft **Lösungsmengen** — Intervalle oder Bereiche.\n\n**Intervallnotation**:\n- $[a, b]$: $a \\leq x \\leq b$ (beide Grenzen inklusive)\n- $(a, b)$: $a < x < b$ (beide exklusiv)\n- $[a, \\infty)$: $x \\geq a$',
      miniExample: '$x > 3$: alle $x$ rechts von $3$ — Lösungsmenge $(3, \\infty)$.',
      selfCheck: 'Was ist der Unterschied zwischen $x > 2$ und $x \\geq 2$? (Ersteres schließt $2$ aus, letzteres schließt $2$ ein.)',
    },
    {
      title: 'Lineare Ungleichungen lösen',
      body: 'Lineare Ungleichungen löst man **wie eine lineare Gleichung**, mit einer wichtigen Ausnahme:\n\n$$\\boxed{\\text{Division/Multiplikation mit } < 0 \\text{ dreht das Zeichen um!}}$$\n\n**Vorgehen**:\n1. Terme zusammenfassen\n2. Variable isolieren\n3. Bei negativem Faktor: Zeichen umdrehen\n\n$$-2x \\leq 6 \\quad \\xrightarrow{\\div(-2)} \\quad x \\geq -3$$',
      miniExample: '$3x + 1 < 10 \\Rightarrow 3x < 9 \\Rightarrow x < 3$. Lösungsmenge: $(-\\infty, 3)$.',
      selfCheck: 'Löse $-x > 5$. (Division durch $-1$, Zeichen dreht: $x < -5$.)',
    },
    {
      title: 'Betragsungleichungen',
      body: 'Der **Betrag** $|x|$ gibt den Abstand von null — immer $\\geq 0$.\n\n$$|x| < c \\quad \\Leftrightarrow \\quad -c < x < c \\quad (c > 0)$$\n\n$$|x| > c \\quad \\Leftrightarrow \\quad x < -c \\text{ oder } x > c$$\n\nMerkhilfe: "$|x| < c$" bedeutet "innerhalb von $c$" (ein Intervall); "$|x| > c$" bedeutet "außerhalb von $c$" (zwei Bereiche).',
      miniExample: '$|x - 3| \\leq 2 \\Rightarrow -2 \\leq x - 3 \\leq 2 \\Rightarrow 1 \\leq x \\leq 5$. Lösungsmenge: $[1, 5]$.',
      selfCheck: 'Was bedeutet $|w| \\leq 5$ für ein Gewicht $w$? (Das Gewicht darf maximal $\\pm 5$ betragen — Gradienten-Clipping!)',
    },
    {
      title: 'Schnitt- und Vereinigungsmengen von Lösungen',
      body: '**Und-Verknüpfung** (beide Bedingungen gleichzeitig): Schnittmenge $\\cap$\n\n$$x > 1 \\text{ und } x < 5 \\quad \\Leftrightarrow \\quad x \\in (1, 5)$$\n\n**Oder-Verknüpfung** (mindestens eine Bedingung): Vereinigung $\\cup$\n\n$$x < -2 \\text{ oder } x > 3 \\quad \\Leftrightarrow \\quad x \\in (-\\infty, -2) \\cup (3, \\infty)$$',
      miniExample: 'Wahrscheinlichkeit $p$: $p \\geq 0$ und $p \\leq 1$ — Schnittmenge: $p \\in [0, 1]$.',
    },
    {
      title: 'ML-Anwendung: Constraints und Gradienten-Clipping',
      body: '**Constraints** in der ML-Optimierung:\n\n$$\\min_w L(w) \\quad \\text{s.t.} \\quad \\|w\\|_2 \\leq C$$\n\nDas "s.t." (subject to) bedeutet: minimiere $L(w)$, aber halte die Ungleichung ein.\n\n**Gradienten-Clipping**: Begrenzt den Gradienten bei sehr großen Werten:\n\n$$g \\leftarrow g \\cdot \\min\\!\\left(1, \\frac{c}{\\|g\\|}\\right) \\quad \\text{sodass } \\|g\\| \\leq c$$\n\nOhne Clipping können Gradienten explodieren — die Ungleichung $\\|g\\| \\leq c$ verhindert das.\n\n**Lernrate**: $0 < \\eta < \\frac{2}{\\lambda_{\\max}}$ (Stabilitätsbedingung für Gradient Descent).',
      miniExample: 'Gradient $g = 10$, Clipping bei $c = 1$: $g \\leftarrow 10 \\cdot \\min(1, \\frac{1}{10}) = 10 \\cdot 0{,}1 = 1$.',
      selfCheck: 'Warum ist $\\eta > 0$ notwendig, aber nicht $\\eta \\geq 0$? (Bei $\\eta = 0$ gibt es kein Update — kein Lernen.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Gradienten-Clipping und Constraint-Prüfungen',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# Modell mit großen Gradienten (z.B. durch exploding gradients)
model = nn.Linear(10, 1)
x = torch.randn(5, 10)
y = torch.randn(5, 1)
loss = ((model(x) - y) ** 2).mean()
loss.backward()

# Gradienten-Clipping: ||g|| <= max_norm
# Ungleichung: skaliere g so, dass ||g|| <= 1.0
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
# Danach: ||grad|| <= 1.0 (Ungleichung erfüllt)

# Constraint-Prüfungen als Ungleichungen
eta = 0.01
assert eta > 0, "Lernrate muss positiv sein"  # eta > 0

p_softmax = torch.softmax(torch.randn(5), dim=0)
# Prüfe: alle Wahrscheinlichkeiten in [0, 1]
assert (p_softmax >= 0).all() and (p_softmax <= 1).all()
# Prüfe: Summe = 1
assert torch.isclose(p_softmax.sum(), torch.tensor(1.0))`,
      annotation: '`clip_grad_norm_` implementiert $\\|g\\| \\leq c$ — eine Betragsungleichung für Vektoren. `assert eta > 0` ist buchstäblich die Ungleichung $\\eta > 0$ als Code. Die Softmax-Prüfung bestätigt $p \\in [0, 1]$ für jede Ausgabe — Wahrscheinlichkeiten als Ungleichungen.',
    },
  ],

  derivations: [
    {
      claim: 'Warum dreht sich das Zeichen bei Division durch eine negative Zahl?',
      reasoning:
        'Sei $a < b$. Dann gilt $-a > -b$ (auf der Zahlengeraden: $a$ liegt links von $b$, also liegt $-a$ rechts von $-b$). Allgemein: Multiplizieren mit $-1$ spiegelt die Zahlengeraden an $0$, was die Reihenfolge umkehrt. Formal: $a < b \\Rightarrow a - b < 0 \\Rightarrow -(b - a) < 0$, und beim Dividieren durch $c < 0$: $\\frac{a}{c} > \\frac{b}{c}$ (beide Seiten werden negiert und die Ordnung kehrt sich um).',
    },
  ],

  commonMistakes: [
    {
      wrong: '$-2x \\leq 6 \\Rightarrow x \\leq -3$',
      correct: '$-2x \\leq 6 \\Rightarrow x \\geq -3$ (Zeichen dreht sich!)',
      explanation:
        'Division durch $-2$ dreht das Ungleichungszeichen um. Das wird am häufigsten vergessen!',
    },
    {
      wrong: '$|x| < 5 \\Rightarrow x < 5$',
      correct: '$|x| < 5 \\Rightarrow -5 < x < 5$',
      explanation:
        'Betragsungleichung bedeutet Abstand von null kleiner als $5$ — das ist ein beidseitiges Intervall!',
    },
    {
      wrong: '$(1, 5)$ bedeutet der Punkt $(1, 5)$',
      correct: '$(1, 5)$ als Intervall bedeutet $1 < x < 5$',
      explanation:
        'Kontext entscheidet: In der Mengenlehre ist $(1, 5)$ das offene Intervall. Als Koordinatenpaar ist $(1, 5)$ ein Punkt. Im Kontext von Ungleichungen immer Intervall.',
    },
  ],

  furtherResources: [
    {
      title: 'Serlo: "Ungleichungen" — serlo.org/mathe/ungleichungen',
      type: 'article',
      note: 'Deutsche Referenz mit Lösungsverfahren und Intervallnotation',
    },
    {
      title: 'Khan Academy: "Solving inequalities" (Video-Serie)',
      type: 'video',
      note: 'Schritt-für-Schritt mit der Vorzeichenregel; Betragsungleichungen',
    },
    {
      title: 'Goodfellow et al.: Deep Learning, Kap. 4 "Numerical Computation"',
      type: 'article',
      note: 'Erklärt Gradienten-Clipping und numerische Stabilitätsbedingungen als Ungleichungen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.lineare-funktionen',
      relation: 'requires',
      hint: 'Lineare Ungleichungen werden genau wie lineare Gleichungen umgeformt — plus die Vorzeichenregel.',
    },
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'see-also',
      hint: 'Wahrscheinlichkeiten erfüllen $p \\in [0, 1]$ — die wichtigste Ungleichung in der Stochastik.',
    },
    {
      lessonId: 'p1.map-regularisierung-bias-variance',
      relation: 'extends',
      hint: 'L1- und L2-Regularisierung formulieren das Optimierungsproblem als constrained Minimierung — gebaut auf Ungleichungen.',
    },
    {
      lessonId: 'p0.betraege',
      relation: 'see-also',
      hint: 'Beträge und Betragsungleichungen gehen Hand in Hand.',
    },
  ],

  reflection: 'Ungleichungen sind die "Grenzen" des maschinellen Lernens — buchstäblich. Jede Lernrate hat eine obere Stabilitätsgrenze, jedes Gewicht kann geclippt werden, jede Wahrscheinlichkeit liegt in $[0, 1]$. Wenn Gradienten explodieren (loss = NaN), ist oft eine Ungleichung verletzt. Welche Ungleichung hält ein stabiles Training am Laufen?',
}
