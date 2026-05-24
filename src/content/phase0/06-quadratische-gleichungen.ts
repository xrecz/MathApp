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

  learningOutcome:
    'Du kannst quadratische Gleichungen mit der pq-Formel und durch Ausklammern lösen, die Diskriminante interpretieren und erkennst quadratische Strukturen im Huber-Loss und MSE.',

  description:
    'Quadratische Gleichungen $ax^2 + bx + c = 0$ treten in ML bei der Analyse von Loss-Funktionen auf: Der MSE-Loss ist quadratisch in den Gewichten, und sein Minimum liegt genau dort, wo die Ableitung null ist — die Lösung einer quadratischen Gleichung. Wer die pq-Formel und Diskriminante beherrscht, versteht, warum konvexe Verlustfunktionen ein eindeutiges Minimum haben.',

  conceptSteps: [
    {
      title: 'Quadratische Gleichungen geometrisch verstehen',
      preprompt: 'Eine Parabel $f(x) = x^2 - 5x + 6$ schneidet die x-Achse. Wie viele Schnittpunkte kann eine Parabel maximal haben — und was bestimmt das?',
      body: 'Eine **quadratische Gleichung** $ax^2 + bx + c = 0$ fragt: Bei welchen $x$-Werten schneidet die Parabel die x-Achse?\n\n- Die Schnittpunkte heißen **Nullstellen** oder **Wurzeln**\n- Es gibt 0, 1 oder 2 reelle Lösungen\n- Das bestimmt die **Diskriminante**\n\n$$ax^2 + bx + c = 0 \\quad \\Leftrightarrow \\quad f(x) = 0$$',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Parabel mit Nullstellen">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="75" x2="250" y2="75" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="130" y1="10" x2="130" y2="95" stroke="rgb(75 85 99)" stroke-width="1"/>
        <path d="M 50,15 Q 130,130 210,15" stroke="rgb(99 102 241)" stroke-width="2" fill="none"/>
        <circle cx="80" cy="75" r="4" fill="rgb(134 239 172)"/>
        <circle cx="180" cy="75" r="4" fill="rgb(134 239 172)"/>
        <text x="68" y="90" fill="rgb(134 239 172)" font-size="9" font-family="monospace">x₁</text>
        <text x="168" y="90" fill="rgb(134 239 172)" font-size="9" font-family="monospace">x₂</text>
        <text x="155" y="25" fill="rgb(99 102 241)" font-size="9" font-family="monospace">f(x)=x²-5x+6</text>
        <text x="125" y="48" fill="rgb(251 191 36)" font-size="9" font-family="monospace">Min</text>
      </svg>`,
      miniExample: '$f(x) = x^2 - 5x + 6 = 0$: Nullstellen bei $x_1 = 2$ und $x_2 = 3$.',
    },
    {
      title: 'Die pq-Formel',
      body: 'Für die Normalform $x^2 + px + q = 0$ (führender Koeffizient $= 1$):\n\n$$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$\n\n**Merkhilfe**: "Minus $p$ halbe, plus-minus Wurzel aus $p$ halbe Quadrat minus $q$."\n\nFür allgemeines $ax^2 + bx + c = 0$ zuerst durch $a$ dividieren (sofern $a \\neq 0$).',
      miniExample: '$x^2 - 5x + 6 = 0$: $p=-5$, $q=6$. $x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\frac{1}{2}$. Also $x_1 = 3$, $x_2 = 2$.',
      selfCheck: 'Welche Lösungen hat $x^2 - 4 = 0$ (hier $p=0$, $q=-4$)? ($x_{1,2} = \\pm\\sqrt{4} = \\pm 2$.)',
    },
    {
      title: 'Die Diskriminante',
      body: 'Der Ausdruck unter der Wurzel bestimmt die Anzahl der Lösungen:\n\n$$D = \\left(\\frac{p}{2}\\right)^2 - q$$\n\n| $D > 0$ | Zwei verschiedene reelle Lösungen |\n|---------|-----------------------------------|\n| $D = 0$ | Genau eine Lösung (Doppelwurzel)  |\n| $D < 0$ | Keine reelle Lösung               |\n\nBei $D < 0$ gibt es nur **komplexe** Lösungen — in ML selten relevant.',
      miniExample: '$x^2 + 2x + 5 = 0$: $D = 1 - 5 = -4 < 0$ → keine reellen Lösungen.',
      selfCheck: 'Wie viele Nullstellen hat $f(x) = x^2 - 6x + 9$? ($D = 9 - 9 = 0$ → eine Nullstelle (Doppelwurzel bei $x = 3$).)',
    },
    {
      title: 'Quadratische Ergänzung',
      body: 'Die **quadratische Ergänzung** formt $x^2 + px + q$ in die Scheitelpunktform um:\n\n$$x^2 + px + q = \\left(x + \\frac{p}{2}\\right)^2 - \\frac{p^2}{4} + q$$\n\n**Vorgehen**:\n1. Koeffizient vor $x$ halbieren: $\\frac{p}{2}$\n2. Quadrat ergänzen: $+\\left(\\frac{p}{2}\\right)^2$\n3. Zum Ausgleich wieder subtrahieren\n\nDieses Verfahren liefert direkt die pq-Formel.',
      miniExample: '$x^2 - 4x + 7 = (x-2)^2 - 4 + 7 = (x-2)^2 + 3$. Minimum: $3$ bei $x=2$.',
    },
    {
      title: 'ML-Anwendung: Quadratischer Loss und sein Minimum',
      body: 'Der **MSE-Loss** als Funktion eines Gewichts $w$ ist quadratisch:\n\n$$L(w) = \\frac{1}{n}\\sum_{i=1}^n (wx_i - y_i)^2$$\n\nSein Minimum liegt bei $\\frac{dL}{dw} = 0$ — das ist eine **lineare Gleichung** in $w$ (weil $L$ quadratisch und $\\frac{dL}{dw}$ linear ist).\n\nDer **Huber-Loss** ist stückweise quadratisch:\n$$H_\\delta(r) = \\begin{cases} \\frac{1}{2}r^2 & |r| \\leq \\delta \\\\ \\delta(|r| - \\frac{\\delta}{2}) & |r| > \\delta \\end{cases}$$\n\nFür kleine Fehler ist er quadratisch (wie MSE), für große linear (robuster gegenüber Ausreißern).',
      miniExample: '$L(w) = (w - 3)^2$: Minimum bei $w = 3$ (Scheitelpunkt der Parabel). $\\frac{dL}{dw} = 2(w-3) = 0 \\Rightarrow w = 3$.',
    },
  ],

  codeBridges: [
    {
      title: 'NumPy: Quadratische Gleichung lösen und MSE-Minimum finden',
      lang: 'python',
      code: `import numpy as np

# Quadratische Gleichung lösen: x^2 - 5x + 6 = 0
# Koeffizienten: [a, b, c] für ax^2 + bx + c = 0
koeff = [1, -5, 6]
loesungen = np.roots(koeff)
print(loesungen)   # [3. 2.] ✓

# pq-Formel manuell
p, q = -5, 6
D = (p/2)**2 - q   # Diskriminante
if D > 0:
    x1 = -p/2 + np.sqrt(D)
    x2 = -p/2 - np.sqrt(D)
    print(f"x1={x1}, x2={x2}")  # x1=3.0, x2=2.0

# MSE-Minimum: analytisch (quadratische Ergänzung)
# L(w) = (w-3)^2 => Minimum bei w=3
# In der Praxis: Gradient auf null setzen: dL/dw = 2(w-3) = 0
w_optimal = 3.0   # exakte Lösung der quadratischen Gleichung`,
      annotation: '`np.roots([a,b,c])` löst $ax^2 + bx + c = 0$ intern mit der Quadratischen Formel. Das MSE-Minimum ist nichts anderes als die Lösung von $\\frac{dL}{dw} = 0$ — einer linearen Gleichung in $w$. Deshalb hat lineares MSE-Regression eine **geschlossene Lösung** (Normal-Gleichung), während nichtlineare Netze iterativ mit Gradient Descent optimiert werden.',
    },
  ],

  derivations: [
    {
      claim: 'Die pq-Formel folgt aus der quadratischen Ergänzung',
      reasoning:
        '$x^2 + px + q = 0$. Ergänze: $(x + \\frac{p}{2})^2 - \\frac{p^2}{4} + q = 0$. Umformen: $(x + \\frac{p}{2})^2 = \\frac{p^2}{4} - q$. Wurzel ziehen: $x + \\frac{p}{2} = \\pm\\sqrt{\\frac{p^2}{4} - q}$. Auflösen: $x = -\\frac{p}{2} \\pm \\sqrt{(\\frac{p}{2})^2 - q}$ — das ist die pq-Formel.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$x^2 - 5x + 6 = 0 \\Rightarrow x = 5$ und $x = 6$',
      correct: '$x_1 = 2$, $x_2 = 3$ (via pq-Formel oder Ausklammern)',
      explanation:
        'Die Koeffizienten $p$ und $q$ sind nicht direkt die Lösungen! Die Lösungen multipliziert ergeben $q$ und addiert ergeben $-p$: $x_1 + x_2 = 5$ und $x_1 \\cdot x_2 = 6$.',
    },
    {
      wrong: 'Bei $D < 0$ gibt es keine Lösungen',
      correct: 'Bei $D < 0$ gibt es keine **reellen** Lösungen, aber zwei komplexe',
      explanation:
        'Komplexe Zahlen erlauben auch negative Diskriminanten. Im ML-Kontext relevant: bestimmte Aktivierungsfunktionen haben komplexe Fixpunkte.',
    },
    {
      wrong: 'Die Lösungsformel für $2x^2 + 4x + 2 = 0$ direkt einsetzen',
      correct: 'Erst durch $a = 2$ dividieren: $x^2 + 2x + 1 = 0$, dann pq-Formel',
      explanation:
        'Die pq-Formel gilt für Normalform (führender Koeffizient $= 1$). Zuerst durch $a$ dividieren!',
    },
  ],

  furtherResources: [
    {
      title: 'Serlo: "Quadratische Gleichungen" — serlo.org/mathe/quadratische-gleichungen',
      type: 'article',
      note: 'Deutsche Referenz mit pq-Formel, Diskriminante und interaktiven Übungen',
    },
    {
      title: 'Khan Academy: "The quadratic formula" (Video)',
      type: 'video',
      note: 'Herleitung der Lösungsformel aus quadratischer Ergänzung; 10 Minuten',
    },
    {
      title: '3Blue1Brown: "Lockdown math: quadratics" (YouTube)',
      type: 'video',
      note: 'Geometrische Intuition der quadratischen Ergänzung',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.termumformungen',
      relation: 'requires',
      hint: 'Quadratische Ergänzung setzt Beherrschung der binomischen Formeln voraus.',
    },
    {
      lessonId: 'p0.quadratische-funktionen',
      relation: 'see-also',
      hint: 'Nullstellen der quadratischen Funktion $f(x) = ax^2 + bx + c$ sind genau die Lösungen der quadratischen Gleichung $ax^2 + bx + c = 0$.',
    },
    {
      lessonId: 'p0.erste-ableitungen',
      relation: 'see-also',
      hint: 'Das Minimum einer quadratischen Loss-Funktion liegt dort, wo die Ableitung null ist — das ergibt eine lineare Gleichung.',
    },
    {
      lessonId: 'p1.extrema-taylor',
      relation: 'extends',
      hint: 'Taylor-Entwicklung nähert beliebige Funktionen durch Polynome an — die quadratische Näherung ist besonders wichtig für Optimierung.',
    },
  ],

  reflection: 'Jedes Mal, wenn du lineares Regressionsmodell trainierst, löst der Computer im Hintergrund eine System quadratischer (und linearer) Gleichungen. Die Normal-Gleichung $(X^\\top X) w = X^\\top y$ hat eine direkte Lösung — weil $L(w)$ quadratisch ist. Warum braucht man trotzdem Gradient Descent für tiefe Netze?',
}
