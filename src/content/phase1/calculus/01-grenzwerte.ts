import type { Lesson } from '../../../types'

export const grenzwerte: Lesson = {
  id: 'p1.grenzwerte',
  title: 'Grenzwerte (intuitiv)',
  conceptTags: ['limit', 'continuity', 'asymptote', 'infinity'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Grenzwerte — "kommt beliebig nahe heran"\n\n"$x$ strebt gegen $a$" bedeutet: $x$ wird beliebig nahe an $a$ herangebracht, ohne $a$ zu erreichen. Der **Grenzwert** $\\lim_{x \\to a} f(x)$ fragt: Wohin strebt $f(x)$?\n\nKlassisches Beispiel: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — obwohl der Ausdruck bei $x=0$ nicht definiert ist!',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-70 -50 140 90" width="220" height="140" xmlns="http://www.w3.org/2000/svg">
          <line x1="-65" y1="0" x2="65" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-45" x2="0" y2="40" stroke="#374151" stroke-width="0.5"/>
          <path d="M -60,-30 C -40,-20 -20,-5 -5,-0.5 M 5,0.5 C 20,5 40,20 60,30"
                fill="none" stroke="#6366f1" stroke-width="2"/>
          <circle cx="0" cy="0" r="3" fill="white" stroke="#6366f1" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="1.5" fill="#ef4444"/>
          <text x="5" y="-10" fill="#ef4444" font-size="8">Grenzwert = 1</text>
          <text x="35" y="-28" fill="#6366f1" font-size="8">sin(x)/x</text>
          <text x="-62" y="38" fill="#9ca3af" font-size="7">Funktion bei 0 undefiniert, Grenzwert = 1</text>
        </svg>`,
        caption: 'sin(x)/x → 1 für x → 0: der Grenzwert existiert, obwohl f(0) undefiniert ist',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Sigmoid-Asymptoten, die e-Funktion und Taylor-Approximationen basieren alle auf Grenzwerten. Die Sättigung von $\\sigma(x) \\to 1$ für $x \\to \\infty$ ist die mathematische Wurzel des Vanishing-Gradient-Problems.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Intuition statt $\\varepsilon$-$\\delta$\n\n"$\\lim_{x \\to a} f(x) = L$" bedeutet: je näher $x$ an $a$ kommt, desto näher kommt $f(x)$ an $L$ heran. Wir können $L$ so genau bestimmen wie wir wollen.\n\n### Wichtige Grenzwerte\n\n$\\lim_{x \\to \\infty} \\frac{1}{x} = 0$ \\quad $\\lim_{x \\to \\infty} e^x = \\infty$ \\quad $\\lim_{x \\to -\\infty} e^x = 0$\n\n$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}718$ — Definition der Euler-Zahl!\n\n### Stetigkeit\n\n"Zeichne den Graphen ohne den Stift abzusetzen." Formal: $f$ stetig in $a$, wenn $\\lim_{x \\to a} f(x) = f(a)$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Sigma-Asymptoten**: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$\n\nFür $x \\to \\infty$: $e^{-x} \\to 0$, also $\\sigma(x) \\to \\frac{1}{1+0} = 1$.\n\nFür $x \\to -\\infty$: $e^{-x} \\to \\infty$, also $\\sigma(x) \\to \\frac{1}{1+\\infty} = 0$.\n\nSigmoid hat also zwei horizontale Asymptoten: $y = 0$ und $y = 1$.',
      },
    ],
    practice: [
      {
        id: 'p1.lim.ex1',
        difficulty: 1,
        conceptTags: ['limit'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to 2} (x + 3) = ?$',
        answer: 5,
        hints: [
          'Stetige Funktion: einfach $x = 2$ einsetzen.',
          '$f(x) = x + 3$ ist ein Polynom — überall stetig.',
          '$2 + 3 = 5$.',
        ],
        explanation: 'Für stetige Funktionen: $\\lim_{x \\to a} f(x) = f(a)$. Also $\\lim_{x \\to 2}(x+3) = 2+3 = 5$.',
      },
      {
        id: 'p1.lim.ex2',
        difficulty: 2,
        conceptTags: ['infinity'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to \\infty} \\frac{1}{x} = ?$',
        answer: 0,
        hints: [
          'Je größer $x$, desto kleiner $1/x$.',
          'Für $x = 1000$: $1/1000 = 0{,}001$. Für $x = 10^6$: $10^{-6}$.',
          'Gegen unendlich: Grenzwert ist 0.',
        ],
        explanation: '$\\frac{1}{x}$ wird beliebig klein, wenn $x$ wächst: $\\lim_{x \\to \\infty} \\frac{1}{x} = 0$.',
      },
      {
        id: 'p1.lim.ex3',
        difficulty: 2,
        conceptTags: ['asymptote'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to \\infty} e^{-x} = ?$',
        answer: 0,
        hints: [
          '$e^{-x} = \\frac{1}{e^x}$.',
          '$e^x \\to \\infty$ für $x \\to \\infty$.',
          '$\\frac{1}{e^x} \\to 0$.',
        ],
        explanation: '$e^{-x} = 1/e^x$. Da $e^x \\to \\infty$, gilt $e^{-x} \\to 0$. Das ist die rechte Asymptote der Sigmoid-Funktion.',
      },
      {
        id: 'p1.lim.ex4',
        difficulty: 3,
        conceptTags: ['limit'],
        type: 'numeric',
        prompt:
          '$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = ?$ (Näherung auf 2 Nachkommastellen)',
        answer: 2.72,
        acceptedAlternatives: ['2,72', 'e', '2.718', '2,718'],
        hints: [
          'Dieser Grenzwert definiert eine wichtige mathematische Konstante.',
          'Für $n = 100$: $(1{,}01)^{100} \\approx 2{,}705$. Für $n = 1000$: $\\approx 2{,}717$.',
          'Im Grenzwert: $e \\approx 2{,}718$.',
        ],
        explanation:
          '$\\lim_{n \\to \\infty}(1 + 1/n)^n = e \\approx 2{,}718$ — die Euler-Zahl. Eine der wichtigsten Konstanten der Mathematik.',
      },
      {
        id: 'p1.lim.ex5',
        difficulty: 3,
        conceptTags: ['asymptote', 'limit'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\lim_{x \\to \\infty} \\sigma(x) = ?$ für $\\sigma(x) = \\frac{1}{1+e^{-x}}$',
        answer: 1,
        hints: [
          'Für $x \\to \\infty$: was passiert mit $e^{-x}$?',
          '$e^{-x} \\to 0$, also $1 + e^{-x} \\to 1$.',
          '$\\frac{1}{1} = 1$.',
        ],
        explanation:
          'Für $x \\to \\infty$: $e^{-x} \\to 0$, daher $\\sigma(x) = \\frac{1}{1+e^{-x}} \\to \\frac{1}{1} = 1$. Obere Asymptote der Sigmoid-Funktion.',
      },
      {
        id: 'p1.lim.ex6',
        difficulty: 4,
        conceptTags: ['asymptote', 'limit'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\lim_{x \\to -\\infty} \\sigma(x) = ?$',
        answer: 0,
        hints: [
          'Für $x \\to -\\infty$: was passiert mit $e^{-x}$?',
          '$-x \\to +\\infty$, also $e^{-x} \\to \\infty$.',
          '$\\frac{1}{1 + \\infty} = 0$.',
        ],
        explanation:
          'Für $x \\to -\\infty$: $e^{-x} = e^{+|x|} \\to \\infty$, also $\\sigma(x) \\to 0$. Untere Asymptote. Beide Asymptoten ($0$ und $1$) machen Sigmoid ideal für Wahrscheinlichkeits-Ausgaben in $[0,1]$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sigmoid-Asymptoten und das Vanishing-Gradient-Problem\n\nDie Sigmoid-Funktion hat zwei Asymptoten: $\\sigma(x) \\to 1$ für $x \\to \\infty$ und $\\sigma(x) \\to 0$ für $x \\to -\\infty$. In den Sättigungsbereichen (weit weg von 0) wird die Ableitung sehr klein:\n\n$\\sigma\'(x) = \\sigma(x)(1-\\sigma(x)) \\to 0$ in beiden Richtungen.\n\nIn einem tiefen Netz mit Sigmoid-Aktivierungen wird der Gradient bei jedem Layer durch einen Faktor $\\leq 0{,}25$ multipliziert. Nach 10 Layers ist der Gradient um Faktor $0{,}25^{10} \\approx 10^{-6}$ geschrumpft — der **Vanishing Gradient**.',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Calculus" Folge 7 visualisiert Grenzwerte sehr intuitiv — empfehlenswert als Ergänzung.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.lim.card1',
      front: '$\\lim_{n \\to \\infty}(1 + 1/n)^n$?',
      back: '$e \\approx 2{,}718$ — Definition der Euler-Zahl.',
      conceptTags: ['limit'],
    },
    {
      id: 'p1.lim.card2',
      front: '$\\lim_{x \\to \\infty} \\sigma(x)$?',
      back: '$1$ — Sigmoid sättigt nach oben.',
      conceptTags: ['asymptote'],
    },
    {
      id: 'p1.lim.card3',
      front: '$\\lim_{x \\to -\\infty} \\sigma(x)$?',
      back: '$0$ — Sigmoid sättigt nach unten.',
      conceptTags: ['asymptote'],
    },
  ],

  learningOutcome:
    'Du verstehst Grenzwerte intuitiv als "beliebig nahe herankommen", kannst Grenzwerte stetiger Funktionen durch Einsetzen berechnen, erkennst Asymptoten von Sigmoid und Softmax, und verstehst wie sättigende Aktivierungsfunktionen zum Vanishing-Gradient-Problem führen.',

  description:
    'Grenzwerte sind das Fundament der Analysis: Ableitungen, Integrale und Stetigkeit sind alle als Grenzwerte definiert. Intuitiv fragt ein Grenzwert, wohin ein Funktionswert strebt — nicht welchen Wert die Funktion annimmt. In ML erscheinen Grenzwerte bei Aktivierungsfunktionen (Asymptoten), der Euler-Zahl (Softmax, Adam-Optimizer) und der Konvergenz von Lernalgorithmen.',

  conceptSteps: [
    {
      title: 'Was ist ein Grenzwert? Die Grundintuition',
      body: '"$\\lim_{x \\to a} f(x) = L$" bedeutet: wenn $x$ beliebig nahe an $a$ herankommt (von beiden Seiten), kommt $f(x)$ beliebig nahe an $L$ heran. Wichtig: $x$ erreicht $a$ nie — es ist die **Annäherung**, nicht der Wert selbst. Deshalb kann der Grenzwert existieren, auch wenn $f(a)$ undefiniert ist (z.B. $\\frac{\\sin x}{x}$ bei $x = 0$).',
      preprompt: 'Was ist der Unterschied zwischen "sich annähern" und "erreichen"?',
      miniExample:
        '$f(x) = \\frac{x^2 - 1}{x - 1} = x + 1$ für $x \\neq 1$: Bei $x = 1$ gibt es eine Nullstelle im Nenner — $f(1)$ undefiniert. Aber $\\lim_{x \\to 1} f(x) = 2$ — der Grenzwert existiert.',
      selfCheck: 'Kann ein Grenzwert existieren, wenn die Funktion dort nicht definiert ist? Gib ein Beispiel.',
    },
    {
      title: 'Grenzwerte berechnen: Regeln und wichtige Fälle',
      body: 'Drei Strategien: (1) Stetige Funktion → einfach einsetzen: $\\lim_{x \\to 2} x^2 = 4$. (2) $\\frac{0}{0}$-Form → kürzen oder L\'Hôpital: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. (3) $x \\to \\infty$ → höchste Potenzen dominieren: $\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2} = 3$. Rechenregeln: Summen, Produkte, Quotienten von Grenzwerten sind Grenzwerte der Summen/Produkte/Quotienten (wenn Nenner $\\neq 0$).',
      preprompt: 'Was bedeutet die "0/0"-Form, und warum ist sie problematisch?',
      miniExample:
        '$\\lim_{x \\to \\infty} \\frac{2x^2 + 3x}{x^2 - 1}$: Durch $x^2$ dividieren → $\\lim_{x \\to \\infty} \\frac{2 + 3/x}{1 - 1/x^2} = \\frac{2 + 0}{1 - 0} = 2$. Höchste Potenzen dominieren.',
      selfCheck: 'Berechne $\\lim_{x \\to \\infty} \\frac{5x^3 + 2}{x^3}$.',
    },
    {
      title: 'Stetigkeit: Funktion ohne Lücken und Sprünge',
      body: 'Eine Funktion $f$ ist stetig in $a$, wenn drei Bedingungen erfüllt sind: (1) $f(a)$ ist definiert; (2) $\\lim_{x \\to a} f(x)$ existiert; (3) beide sind gleich: $\\lim_{x \\to a} f(x) = f(a)$. Intuitiv: der Graph kann ohne Stiftabheben gezeichnet werden. In ML: alle gängigen Aktivierungsfunktionen (ReLU, Sigmoid, Tanh, GELU) sind stetig — wichtig für Gradientenfluss.',
      preprompt: 'Was unterscheidet eine stetige von einer unstetigen Funktion?',
      miniExample:
        'ReLU: $f(x) = \\max(0, x)$ ist stetig überall — auch in $x=0$, weil $f(0) = 0 = \\lim_{x \\to 0} f(x)$. Aber die **Ableitung** ist in $x=0$ unstetig: links $0$, rechts $1$. ReLU ist stetig, aber nicht differenzierbar in $0$.',
      selfCheck: 'Ist die Stufenfunktion $f(x) = 0$ für $x < 0$ und $f(x) = 1$ für $x \\geq 0$ stetig in $x = 0$?',
    },
    {
      title: 'Wichtige Grenzwerte: $e$, $\\sin x / x$, Asymptoten',
      body: 'Drei wichtige Grenzwerte aus ML-Sicht:\n1. $\\lim_{n \\to \\infty}(1 + 1/n)^n = e \\approx 2{,}718$ — Definition der Euler-Zahl; taucht in Softmax, $e^x$, Adam-Optimizer auf\n2. $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — Grundlage für Taylor-Entwicklungen\n3. $\\lim_{x \\to \\pm\\infty} \\sigma(x) = \\{1, 0\\}$ — Sigmoid-Asymptoten, Ursache des Vanishing Gradient',
      preprompt: 'Wo kommt die Euler-Zahl $e$ in ML-Algorithmen vor?',
      miniExample:
        'Adam-Optimizer: $\\hat{m} = m / (1 - \\beta_1^t)$, $\\hat{v} = v / (1 - \\beta_2^t)$. Die Korrekturfaktoren $(1-\\beta^t)^{-1}$ nähern sich $1$ für große $t$ — Grenzwert-Argument. Mit $\\beta_1 = 0{,}9$: $(1 - 0{,}9^{10})^{-1} \\approx 1{,}055$, $(1 - 0{,}9^{100})^{-1} \\approx 1{,}0$.',
      selfCheck: 'Warum hat Sigmoid zwei Asymptoten, aber keine endlichen Grenzwerte?',
    },
    {
      title: 'Konvergenz in ML: Wenn Algorithmen "gegen etwas streben"',
      body: 'Grenzwerte formalisieren Konvergenz: eine Folge $w_0, w_1, w_2, \\ldots$ konvergiert gegen $w^*$, wenn $\\lim_{t \\to \\infty} w_t = w^*$. Gradient Descent konvergiert (unter Bedingungen) gegen ein lokales Minimum: $\\lim_{t \\to \\infty} L(w_t) = L^*$. Die Lernrate $\\eta$ bestimmt, ob die Folge konvergiert (klein genug $\\eta$) oder divergiert (zu groß $\\eta$). SGD-Loss springt — konvergiert nicht im strengen Sinn, aber im Zeitmittel.',
      preprompt: 'Was bedeutet es, dass ein Algorithmus "konvergiert"?',
      miniExample:
        'Geometrische Folge: $w_t = w_0 \\cdot r^t$ konvergiert gegen $0$ wenn $|r| < 1$. Gradient Descent auf $L(w) = w^2$: $w_{t+1} = w_t - \\eta \\cdot 2w_t = (1 - 2\\eta)w_t$. Konvergiert für $\\eta < 1/2$ mit Rate $(1-2\\eta)^t$.',
      selfCheck: 'Was passiert mit der Folge $w_t = (1 - 2\\eta)^t w_0$ wenn $\\eta > 1/2$?',
    },
  ],

  codeBridges: [
    {
      title: 'Grenzwerte numerisch beobachten und Sigmoid-Konvergenz',
      lang: 'python',
      code: `import numpy as np
import torch

# === Grenzwert numerisch beobachten ===
# lim_{x->0} sin(x)/x = 1
print("sin(x)/x für kleines x:")
for h in [1.0, 0.1, 0.01, 0.001, 0.0001]:
    val = np.sin(h) / h
    print(f"  h={h:.4f}: sin(h)/h = {val:.8f}")
# Output zeigt: Annäherung an 1.0

# lim_{n->inf} (1 + 1/n)^n = e
print("\\n(1 + 1/n)^n für großes n:")
for n in [1, 10, 100, 1000, 10000, 100000]:
    val = (1 + 1/n)**n
    print(f"  n={n:6d}: {val:.8f}  (e = {np.e:.8f})")

# === Sigmoid-Asymptoten ===
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

print("\\nSigmoid-Grenzwerte:")
for x in [-100, -10, -1, 0, 1, 10, 100]:
    print(f"  σ({x:4d}) = {sigmoid(x):.8f}")

# === SGD-Konvergenz auf L(w) = w^2 ===
# L'(w) = 2w; Update: w <- w - eta * 2w = w(1 - 2*eta)
eta = 0.1  # Lernrate
w = 5.0    # Startwert
print(f"\\nSGD auf L(w)=w^2, eta={eta}, w_0={w}")
for t in range(10):
    grad = 2 * w          # L'(w) = 2w
    w = w - eta * grad    # Gradient-Descent-Schritt
    loss = w**2
    print(f"  t={t}: w={w:.4f}, L(w)={loss:.6f}")
# Konvergenzfaktor: (1 - 2*eta)^t = 0.8^t`,
      annotation:
        'Numerisches Beobachten von Grenzwerten zeigt, wie schnell Folgen konvergieren. Die Konvergenzrate $(1 - 2\\eta)^t$ ist exponentiell — das ist der Grund, warum Gradient Descent linear konvergiert auf quadratischen Funktionen.',
    },
  ],

  derivations: [
    {
      claim: '$\\lim_{n\\to\\infty}(1+1/n)^n = e$',
      reasoning: 'Definiere $a_n = (1 + 1/n)^n$ und nehme den natürlichen Logarithmus: $\\ln(a_n) = n \\cdot \\ln(1 + 1/n)$. Für kleines $t$ gilt $\\ln(1+t) \\approx t - t^2/2 + \\dots$, also mit $t = 1/n$: $n \\cdot \\ln(1 + 1/n) \\approx n \\cdot (1/n - 1/(2n^2) + \\dots) = 1 - 1/(2n) + \\dots \\to 1$. Daher $\\ln(a_n) \\to 1$ und $a_n \\to e^1 = e$. Die Euler-Zahl ist durch diesen Grenzwert definiert.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\lim_{x \\to a} f(x) = f(a)$ gilt immer — man setzt einfach ein.',
      correct: 'Das gilt nur für stetige Funktionen. Erst prüfen: ist $f$ stetig in $a$? Bei $0/0$-Formen muss man kürzen oder L\'Hôpital anwenden.',
      explanation: 'Die Identität $\\lim_{x \\to a} f(x) = f(a)$ ist äquivalent zur Stetigkeit von $f$ in $a$ — sie ist keine allgemeine Regel.',
    },
    {
      wrong: '"$x \\to \\infty$" bedeutet "$x = \\infty$", also rechnet man mit $\\infty$ als Zahl.',
      correct: '$\\infty$ ist keine reelle Zahl. "$x \\to \\infty$" bedeutet: $x$ wächst ohne Schranke — der Grenzwert beschreibt das Verhalten für beliebig große $x$.',
      explanation: 'Ausdrücke wie "$\\infty - \\infty$" oder "$0 \\cdot \\infty$" sind keine gültigen Rechenoperationen, sondern unbestimmte Ausdrücke.',
    },
    {
      wrong: 'Sigmoid "erreicht 1" für sehr große $x$ — also kann man $\\sigma(x) = 1$ setzen.',
      correct: '$\\sigma(x) < 1$ für alle endlichen $x$. Es strebt gegen 1, aber erreicht es nie — der Unterschied zwischen Asymptote und tatsächlichem Wert.',
      explanation: 'In Float32: `sigmoid(100) = 1.0` wegen Runden — aber mathematisch ist der Wert nie exakt 1. Das führt zu `log(0) = -inf` wenn man unvorsichtig mit NLL arbeitet.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: Essence of Calculus — Limits',
      type: 'video',
      note: 'Folge 7 der Serie: herausragende Visualisierung wie Grenzwerte die formale Grundlage für Ableitungen und Integrale bilden.',
    },
    {
      title: 'Khan Academy: Limits and Continuity',
      type: 'exercise',
      note: 'Strukturierter Kurs mit Übungsaufgaben zu allen Grenzwert-Techniken — ideal als Ergänzung.',
    },
    {
      title: 'Paul\'s Online Math Notes: Limits',
      type: 'article',
      note: 'Kompakte Referenz mit allen wichtigen Grenzwert-Techniken, Rechenregeln und kommentierten Beispielen.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.ableitung-konzept', relation: 'extends', hint: 'Die Ableitung ist als Grenzwert des Differenzenquotienten definiert.' },
    { lessonId: 'p1.extrema-taylor', relation: 'extends', hint: 'Taylor-Reihen verwenden Grenzwerte zur Approximation glatter Funktionen.' },
    { lessonId: 'p0.funktionen-und-graphen', relation: 'requires', hint: 'Grenzwerte brauchen Verständnis von Funktionen und ihren Graphen.' },
    { lessonId: 'p1.ml-ableitungen', relation: 'see-also', hint: 'Vanishing Gradient: Grenzwert der Sigmoid-Ableitung bei Sättigung.' },
  ],

  reflection: 'Sigmoid "sättigt" in den Asymptoten — die Ableitung wird beliebig klein. Warum löst ReLU dieses Problem? Und warum hat ReLU dafür ein anderes Problem (Dying ReLU)? Was sagt uns das über den Zusammenhang zwischen Grenzwerten und dem Trainieren tiefer Netze?',
}
