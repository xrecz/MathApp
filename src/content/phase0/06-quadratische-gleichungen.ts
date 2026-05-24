import type { Lesson } from '../../types'

export const quadratischeGleichungen: Lesson = {
  id: 'p0.quadratische-gleichungen',
  title: 'Quadratische Gleichungen',
  conceptTags: ['equation', 'quadratic', 'pq-formula', 'roots'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Quadratische Gleichungen\n\nEine **quadratische Gleichung** hat die Form $ax^2 + bx + c = 0$. Sie kann 0, 1 oder 2 reelle Lösungen haben — bestimmt durch die **Diskriminante**.',
      },
      {
        kind: 'math',
        content:
          '$$x^2 + px + q = 0 \\quad \\Rightarrow \\quad x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die Suche nach dem Minimum einer Loss-Funktion bedeutet, die Nullstelle der Ableitung zu finden. Bei quadratischen Funktionen ist das genau eine quadratische Gleichung. Lineare Regression löst im Hintergrund solche Gleichungen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Lösungsverfahren\n\n**Rein quadratisch** ($bx$-Term fehlt): $x^2 = c$ → $x = \\pm\\sqrt{c}$\n\n**pq-Formel**: Für $x^2 + px + q = 0$ gilt $x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{(\\frac{p}{2})^2 - q}$',
      },
      {
        kind: 'text',
        content:
          '### Diskriminante $D$\n\n$D = (\\frac{p}{2})^2 - q$\n\n- $D > 0$: zwei verschiedene reelle Lösungen\n- $D = 0$: genau eine Lösung (Doppelwurzel)\n- $D < 0$: keine reelle Lösung',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $x^2 - 5x + 6 = 0$\n\n$p = -5$, $q = 6$: $x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\sqrt{\\frac{1}{4}} = \\frac{5}{2} \\pm \\frac{1}{2}$\n\n$x_1 = 3$, $x_2 = 2$',
      },
    ],
    practice: [
      {
        id: 'p0.quad.ex1',
        difficulty: 1,
        conceptTags: ['quadratic'],
        type: 'numeric',
        prompt: 'Löse $x^2 = 16$. Gib den positiven Wert an.',
        answer: 4,
        hints: [
          'Für $x^2 = c$ gilt $x = \\pm\\sqrt{c}$.',
          '$\\sqrt{16} = ?$',
          '$\\sqrt{16} = 4$, also $x = 4$ (positiver Wert).',
        ],
        explanation: '$x^2 = 16 \\Rightarrow x = \\pm\\sqrt{16} = \\pm 4$. Der positive Wert ist $4$.',
      },
      {
        id: 'p0.quad.ex2',
        difficulty: 2,
        conceptTags: ['quadratic', 'pq-formula'],
        type: 'mc',
        prompt: 'Welche Lösungen hat $x^2 - 5x + 6 = 0$?',
        options: ['$x = 2$ und $x = 3$', '$x = 1$ und $x = 6$', '$x = -2$ und $x = -3$', '$x = 5$ und $x = 1$'],
        answer: '$x = 2$ und $x = 3$',
        hints: [
          'Verwende die pq-Formel: $p = -5$, $q = 6$.',
          '$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\frac{1}{2}$',
          '$x_1 = 3$, $x_2 = 2$. Probe: $2 \\cdot 3 = 6$ ✓, $2+3 = 5$ ✓.',
        ],
        explanation:
          '$x^2 - 5x + 6 = 0$: pq-Formel mit $p=-5$, $q=6$ ergibt $x_1 = 3$, $x_2 = 2$.',
        misconceptions: {
          '$x = 1$ und $x = 6$': 'Probe: $1 + 6 = 7 \\neq 5$ — Summe stimmt nicht.',
        },
      },
      {
        id: 'p0.quad.ex3',
        difficulty: 3,
        conceptTags: ['quadratic', 'factoring'],
        type: 'numeric',
        prompt: 'Löse $x^2 + 4x = 0$. Welche der Lösungen ist nicht-negativ?',
        answer: 0,
        hints: [
          '$x^2 + 4x = x(x + 4) = 0$ — ausklammern!',
          'Entweder $x = 0$ oder $x + 4 = 0$.',
          'Die Lösungen sind $x = 0$ und $x = -4$. Die nicht-negative ist $0$.',
        ],
        explanation:
          '$x(x+4) = 0 \\Rightarrow x = 0$ oder $x = -4$. Die nicht-negative Lösung ist $0$.',
      },
      {
        id: 'p0.quad.ex4',
        difficulty: 3,
        conceptTags: ['quadratic', 'discriminant'],
        type: 'mc',
        prompt: 'Wie viele reelle Lösungen hat $x^2 + 2x + 5 = 0$?',
        options: ['Keine', 'Genau eine', 'Zwei'],
        answer: 'Keine',
        hints: [
          'Berechne die Diskriminante $D = (p/2)^2 - q$.',
          '$p = 2$, $q = 5$: $D = 1 - 5 = -4$.',
          '$D < 0$ bedeutet: keine reelle Lösung.',
        ],
        explanation: '$D = (1)^2 - 5 = -4 < 0$ — negative Diskriminante, keine reellen Lösungen.',
        misconceptions: {
          'Zwei': 'Nur wenn $D > 0$ gibt es zwei reelle Lösungen. Hier ist $D = -4 < 0$.',
        },
      },
      {
        id: 'p0.quad.ex5',
        difficulty: 4,
        conceptTags: ['quadratic', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Die Loss-Funktion $L(w) = (w-3)^2$ hat ihr Minimum bei welchem $w$?',
        answer: 3,
        hints: [
          '$(w-3)^2 \\geq 0$ immer. Wann wird es null?',
          '$L(w) = 0$ genau wenn $w - 3 = 0$.',
          '$w = 3$ ist das Minimum.',
        ],
        explanation:
          '$L(w) = (w-3)^2$ ist eine nach oben offene Parabel mit Scheitel/Minimum bei $w = 3$ (weil dort $L = 0$, der kleinste mögliche Wert).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Minimum = Nullstelle der Ableitung\n\nLineare Regression minimiert den MSE-Loss. Im einfachsten Fall (1 Parameter $w$, $n$ Datenpunkte) ist die Loss-Funktion eine nach oben offene Parabel. Ihr Minimum liegt dort, wo die Ableitung null wird:',
      },
      {
        kind: 'math',
        content:
          '$$L(w) = \\sum_{i=1}^n (w x_i - y_i)^2 \\quad \\Rightarrow \\quad \\frac{dL}{dw} = 0 \\quad \\Rightarrow \\quad w^* = \\frac{\\sum x_i y_i}{\\sum x_i^2}$$',
      },
      {
        kind: 'callout',
        content:
          'Das ist Realschulmathematik im Einsatz bei echter ML-Forschung. Jede lineare Regression, die du jemals trainierst, löst im Hintergrund genau solche Gleichungen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.quad.card1',
      front: 'pq-Formel für $x^2 + px + q = 0$?',
      back: '$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$',
      conceptTags: ['quadratic', 'pq-formula'],
    },
    {
      id: 'p0.quad.card2',
      front: 'Diskriminante $D < 0$ bedeutet?',
      back: 'Keine reelle Lösung.',
      conceptTags: ['quadratic', 'discriminant'],
    },
    {
      id: 'p0.quad.card3',
      front: 'Lösungen von $x^2 = a$?',
      back: '$x = \\pm\\sqrt{a}$ (nur reell wenn $a \\geq 0$).',
      conceptTags: ['quadratic'],
    },
  ],
}
