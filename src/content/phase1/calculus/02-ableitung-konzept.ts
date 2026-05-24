import type { Lesson } from '../../../types'

export const ableitungKonzept: Lesson = {
  id: 'p1.ableitung-konzept',
  title: 'Ableitung als Konzept',
  conceptTags: ['derivative', 'tangent', 'rate-of-change', 'linear-approximation'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Drei Perspektiven auf die Ableitung\n\n**Geometrisch**: Steigung der Tangente an die Kurve im Punkt $x$.\n\n**Physikalisch**: momentane Änderungsrate — Geschwindigkeit ist Ableitung der Position.\n\n**Algebraisch**: beste lineare Approximation der Funktion in der Nähe eines Punkts.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-20 -60 180 130" width="220" height="150" xmlns="http://www.w3.org/2000/svg">
          <line x1="-10" y1="0" x2="170" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-55" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <path d="M 5,55 Q 40,40 80,-10 Q 110,-50 145,-55" fill="none" stroke="#6366f1" stroke-width="2"/>
          <line x1="50" y1="20" x2="110" y2="-40" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="80" cy="-10" r="3" fill="#ef4444"/>
          <line x1="10" y1="52" x2="80" y2="-10" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="25" x2="80" y2="-10" stroke="#10b981" stroke-width="1" stroke-dasharray="3"/>
          <text x="115" y="-42" fill="#6366f1" font-size="9">f(x)</text>
          <text x="112" y="-28" fill="#ef4444" font-size="9">Tangente</text>
          <text x="8" y="60" fill="#f59e0b" font-size="8">Sekante (h groß)</text>
          <text x="42" y="33" fill="#10b981" font-size="8">Sekante (h klein)</text>
        </svg>`,
        caption: 'Sekante → Tangente wenn h → 0: die Ableitung als Grenzwert',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gradient Descent funktioniert, weil die Ableitung die Richtung lokal größter Änderung angibt — wir gehen in die Gegenrichtung bergab.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Differenzenquotient → Ableitung\n\n$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$\n\nDer Differenzenquotient $\\frac{f(x+h)-f(x)}{h}$ ist die Steigung der Sekante. Im Grenzwert $h \\to 0$ wird sie zur Tangente.\n\n### Tangentengleichung\n\nDie Tangente an $f$ im Punkt $a$:\n\n$y = f(a) + f\'(a)(x - a)$\n\nDas ist die **lineare Approximation** — in der Nähe von $a$ verhält sich $f$ wie eine Gerade.',
      },
      {
        kind: 'worked-example',
        content:
          '**Ableitung von $f(x) = x^2$ via Differenzenquotient**:\n\n$\\frac{f(x+h) - f(x)}{h} = \\frac{(x+h)^2 - x^2}{h} = \\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h$\n\nGrenzwert $h \\to 0$: $f\'(x) = 2x$.\n\nBei $x = 3$: $f\'(3) = 6$ — die Tangente hat Steigung $6$.',
      },
    ],
    practice: [
      {
        id: 'p1.deriv.ex1',
        difficulty: 1,
        conceptTags: ['derivative'],
        type: 'numeric',
        prompt: '$f(x) = x^2$. Was ist $f\'(3)$?',
        answer: 6,
        hints: [
          '$f\'(x) = 2x$ (Potenzregel).',
          '$f\'(3) = 2 \\cdot 3 = ?$',
          '$= 6$.',
        ],
        explanation: '$f\'(x) = 2x$, also $f\'(3) = 6$. Die Tangente an die Parabel bei $x=3$ hat Steigung 6.',
      },
      {
        id: 'p1.deriv.ex2',
        difficulty: 2,
        conceptTags: ['rate-of-change'],
        type: 'numeric',
        prompt: '$f(x) = 3x$. Die Ableitung ist konstant. Welcher Wert?',
        answer: 3,
        hints: [
          'Eine lineare Funktion hat konstante Steigung.',
          'Differenzenquotient: $\\frac{3(x+h) - 3x}{h} = \\frac{3h}{h} = 3$.',
          '$f\'(x) = 3$ für alle $x$.',
        ],
        explanation: '$f(x) = 3x$ ist eine Gerade mit Steigung 3 — also $f\'(x) = 3$ überall.',
      },
      {
        id: 'p1.deriv.ex3',
        difficulty: 2,
        conceptTags: ['tangent'],
        type: 'mc',
        prompt: 'Was beschreibt die Ableitung $f\'(a)$ geometrisch?',
        options: [
          'Die Steigung der Tangente an den Graphen von $f$ im Punkt $(a, f(a))$',
          'Die Fläche unter dem Graphen bis $x = a$',
          'Den Funktionswert $f(a)$',
          'Den Abstand des Graphen von der $x$-Achse',
        ],
        answer: 'Die Steigung der Tangente an den Graphen von $f$ im Punkt $(a, f(a))$',
        hints: [
          'Ableitung = Grenzwert des Differenzenquotienten = Steigung der Sekante im Grenzfall.',
          'Die Sekante wird zur Tangente wenn $h \\to 0$.',
          'Steigung der Tangente!',
        ],
        explanation: '$f\'(a)$ ist die Steigung der Tangente im Punkt $(a, f(a))$. Das ist die geometrische Bedeutung der Ableitung.',
      },
      {
        id: 'p1.deriv.ex4',
        difficulty: 3,
        conceptTags: ['linear-approximation'],
        type: 'numeric',
        prompt:
          'Lineare Approximation von $f(x) = x^2$ bei $a = 1$: $f(x) \\approx f(1) + f\'(1)(x-1) = ? + 2(x-1)$. Was steht für $?$?',
        answer: 1,
        hints: [
          'Tangentengleichung: $y = f(a) + f\'(a)(x-a)$.',
          '$f(1) = 1^2 = 1$.',
          'Also: $f(x) \\approx 1 + 2(x-1)$. Der erste Term ist $1$.',
        ],
        explanation: '$f(1) = 1$, $f\'(1) = 2$. Tangentengleichung: $y = 1 + 2(x-1)$. Bei $x = 1{,}1$: $y \\approx 1{,}2$ (exakt: $1{,}21$).',
      },
      {
        id: 'p1.deriv.ex5',
        difficulty: 3,
        conceptTags: ['derivative', 'rate-of-change'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Loss $L(w) = (w-2)^2$, Ableitung $L\'(w) = 2(w-2)$. Bei $w = 5$: $L\'(5) = ?$',
        answer: 6,
        hints: [
          '$L\'(w) = 2(w-2)$.',
          '$L\'(5) = 2(5-2) = 2 \\cdot 3$.',
          '$= 6$. Positiv → Loss steigt nach rechts → Gradient Descent bewegt $w$ nach links.',
        ],
        explanation: '$L\'(5) = 2(5-2) = 6 > 0$. Gradient Descent: $w \\leftarrow 5 - \\eta \\cdot 6$ — $w$ wird kleiner, bewegt sich zum Minimum bei $w=2$.',
      },
      {
        id: 'p1.deriv.ex6',
        difficulty: 4,
        conceptTags: ['derivative', 'rate-of-change'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: $f\'(x) > 0$ an einem Punkt. Gradient Descent führt den nächsten Schritt aus. Bewegt sich $x$ nach links oder rechts?',
        options: [
          'Nach links — entgegen dem positiven Gradienten bergab',
          'Nach rechts — in Richtung des positiven Gradienten bergauf',
          'Bleibt stehen — $f\'(x) > 0$ bedeutet Minimum',
          'Hängt von der Lernrate ab',
        ],
        answer: 'Nach links — entgegen dem positiven Gradienten bergab',
        hints: [
          'Gradient Descent: $x \\leftarrow x - \\eta f\'(x)$.',
          '$f\'(x) > 0$: wir ziehen einen positiven Wert ab.',
          '$x$ wird kleiner → nach links.',
        ],
        explanation:
          'Update: $x \\leftarrow x - \\eta f\'(x)$. Für $f\'(x) > 0$: $x$ wird um $\\eta \\cdot f\'(x) > 0$ reduziert — Bewegung nach links, bergab.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gradient Descent und die Ableitung\n\nGradient Descent ist die einfachste Anwendung der Ableitung in ML:\n\n$w \\leftarrow w - \\eta f\'(w)$\n\nWenn $f\'(w) > 0$: $f$ steigt nach rechts → Schritt nach links (bergab).\nWenn $f\'(w) < 0$: $f$ fällt nach rechts → Schritt nach rechts (bergab).\nWenn $f\'(w) = 0$: stationärer Punkt — möglicherweise Minimum.\n\nDie Lernrate $\\eta$ kontrolliert, wie groß der Schritt ist. Zu groß → überschießt. Zu klein → konvergiert langsam.',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Calculus" Folge 2 zeigt die drei Perspektiven (Steigung, Änderungsrate, lineare Approximation) sehr klar und mit herausragenden Visualisierungen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.deriv.card1',
      front: 'Differenzenquotient?',
      back: '$\\frac{f(x+h) - f(x)}{h}$, Grenzwert $h \\to 0$ ergibt $f\'(x)$.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p1.deriv.card2',
      front: 'Drei Perspektiven der Ableitung?',
      back: 'Tangenten-Steigung, momentane Änderungsrate, beste lineare Approximation.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p1.deriv.card3',
      front: 'Tangentengleichung an $f$ in $a$?',
      back: '$y = f(a) + f\'(a)(x - a)$.',
      conceptTags: ['linear-approximation'],
    },
  ],
}
