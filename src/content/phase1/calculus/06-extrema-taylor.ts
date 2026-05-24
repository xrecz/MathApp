import type { Lesson } from '../../../types'

export const extremaTaylor: Lesson = {
  id: 'p1.extrema-taylor',
  title: 'Extrema & Taylor-Approximation',
  conceptTags: ['extremum', 'critical-point', 'taylor-series', 'newton-method'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Extrema und lokale Approximation\n\n**Stationärer Punkt**: $f\'(x) = 0$ — notwendige Bedingung für ein Extremum.\n\n**2. Ableitungstest**: $f\'\'(x) > 0$ → lokales Minimum; $f\'\'(x) < 0$ → lokales Maximum.\n\n**Taylor-Reihe**: $f(x) \\approx f(a) + f\'(a)(x-a) + \\frac{1}{2}f\'\'(a)(x-a)^2 + \\dots$\n\nJede glatte Funktion kann lokal durch ein Polynom approximiert werden.',
      },
      {
        kind: 'math',
        content:
          '$$f(x) = \\sum_{k=0}^{\\infty} \\frac{f^{(k)}(a)}{k!}(x-a)^k \\approx f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2}(x-a)^2$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gradient Descent = Taylor 1. Ordnung. Newton-Verfahren = Taylor 2. Ordnung (nutzt auch die Krümmung). Adam approximiert die 2. Ordnung diagonal.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Minimum finden\n\n1. $f\'(x) = 0$ lösen → stationäre Punkte\n2. $f\'\'(x) > 0$? → Minimum; $f\'\'(x) < 0$? → Maximum\n\n### Taylor-Approximationen\n\n**1. Ordnung** (linear): $f(x) \\approx f(a) + f\'(a)(x-a)$ — beste Gerade durch $(a, f(a))$\n\n**2. Ordnung** (quadratisch): $f(x) \\approx f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2}(x-a)^2$ — beste Parabel\n\n**Newton-Verfahren**: Minimiere die quadratische Approximation:\n\n$x_{n+1} = x_n - \\frac{f\'(x_n)}{f\'\'(x_n)}$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = x^3 - 3x$\n\n$f\'(x) = 3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$\n\n$f\'\'(x) = 6x$\n\nBei $x = 1$: $f\'\'(1) = 6 > 0$ → **lokales Minimum**.\nBei $x = -1$: $f\'\'(-1) = -6 < 0$ → **lokales Maximum**.\n\n**Taylor um $x=0$**: $\\sin(x) \\approx x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$. Für $x$ nahe 0: $\\sin(x) \\approx x$.',
      },
    ],
    practice: [
      {
        id: 'p1.taylor.ex1',
        difficulty: 1,
        conceptTags: ['critical-point'],
        type: 'numeric',
        prompt: '$f(x) = (x-3)^2$. Bei welchem $x$ ist $f\'(x) = 0$?',
        answer: 3,
        hints: [
          '$f\'(x) = 2(x-3)$.',
          '$2(x-3) = 0 \\Rightarrow x-3 = 0$.',
          '$x = 3$.',
        ],
        explanation: '$f\'(x) = 2(x-3) = 0 \\Rightarrow x = 3$. Das Minimum von $(x-3)^2$ liegt bei $x = 3$.',
      },
      {
        id: 'p1.taylor.ex2',
        difficulty: 2,
        conceptTags: ['critical-point', 'extremum'],
        type: 'mc',
        prompt: '$f(x) = x^3$ bei $x = 0$: $f\'(0) = 0$. Was liegt vor?',
        options: [
          'Kein Extremum — Sattelpunkt / Wendepunkt',
          'Lokales Minimum ($f\'\'(0) > 0$)',
          'Lokales Maximum ($f\'\'(0) < 0$)',
          'Globales Minimum',
        ],
        answer: 'Kein Extremum — Sattelpunkt / Wendepunkt',
        hints: [
          '$f\'(x) = 3x^2$, $f\'\'(x) = 6x$.',
          '$f\'\'(0) = 0$ — der Test versagt.',
          'Für $x^3$: links von 0 fallend, rechts von 0 steigend — Wendepunkt.',
        ],
        explanation: '$f\'\'(0) = 0$: der 2. Ableitungstest liefert keine Entscheidung. Für $x^3$ gibt es kein Extremum bei 0 — es ist ein Wendepunkt (Funktion wechselt die Krümmung).',
      },
      {
        id: 'p1.taylor.ex3',
        difficulty: 2,
        conceptTags: ['taylor-series'],
        type: 'mc',
        prompt: 'Taylor-Approximation 1. Ordnung von $f$ in $a$?',
        options: [
          '$f(a) + f\'(a)(x-a)$',
          '$f(a) + f\'\'(a)(x-a)^2$',
          '$f\'(a)(x-a)$',
          '$f(a) \\cdot f\'(a)$',
        ],
        answer: '$f(a) + f\'(a)(x-a)$',
        hints: [
          'Taylor 1. Ordnung = Tangentengleichung = lineare Approximation.',
          'Term 0: $f(a)$. Term 1: $f\'(a)(x-a)$.',
          '$f(a) + f\'(a)(x-a)$.',
        ],
        explanation: 'Taylor 1. Ordnung ist die Tangentengleichung: $y = f(a) + f\'(a)(x-a)$. Gradient Descent macht genau das — lokale Linearisierung.',
      },
      {
        id: 'p1.taylor.ex4',
        difficulty: 3,
        conceptTags: ['extremum', 'critical-point'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: MSE-Loss $L(w) = (w-5)^2$. Minimum bei $w = ?$',
        answer: 5,
        hints: [
          '$L\'(w) = 2(w-5)$.',
          'Minimum bei $L\'(w) = 0$: $w = 5$.',
          '$L\'\'(w) = 2 > 0$ → Minimum bestätigt.',
        ],
        explanation: '$L\'(w) = 2(w-5) = 0 \\Rightarrow w = 5$. $L\'\'(w) = 2 > 0$ → Minimum. Der Loss ist 0 bei $w = 5$ — Modell-Vorhersage stimmt exakt.',
      },
      {
        id: 'p1.taylor.ex5',
        difficulty: 3,
        conceptTags: ['taylor-series'],
        type: 'mc',
        prompt:
          'Taylor von $e^x$ in $0$ bis zur 2. Ordnung: $e^x \\approx 1 + x + ?$. Was steht für $?$?',
        options: ['$x^2/2$', '$x^2$', '$2x^2$', '$x^3/6$'],
        answer: '$x^2/2$',
        hints: [
          'Taylor 2. Ordnung: $f(0) + f\'(0) x + \\frac{f\'\'(0)}{2} x^2$.',
          '$(e^x)\'= e^x$, also $f\'\'(0) = e^0 = 1$.',
          '$\\frac{1}{2} x^2$.',
        ],
        explanation: '$e^x \\approx 1 + x + \\frac{x^2}{2}$. Für $x = 0{,}1$: $e^{0{,}1} \\approx 1{,}105$ — Näherung: $1 + 0{,}1 + 0{,}005 = 1{,}105$ ✓.',
      },
      {
        id: 'p1.taylor.ex6',
        difficulty: 4,
        conceptTags: ['newton-method'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Newton-Verfahren konvergiert quadratisch (sehr schnell). Warum wird es trotzdem kaum in Deep Learning genutzt?',
        options: [
          'Die Hesse-Matrix bei Millionen Parametern ist viel zu groß und teuer zu berechnen',
          'Newton-Verfahren divergiert immer bei nicht-konvexen Problemen',
          'Newton-Verfahren erfordert exakte Second-Order Gradienten, die nicht existieren',
          'Gradient Descent ist schneller pro Iteration',
        ],
        answer: 'Die Hesse-Matrix bei Millionen Parametern ist viel zu groß und teuer zu berechnen',
        hints: [
          'Newton: $x \\leftarrow x - H^{-1} \\nabla f$. $H$ = Hesse-Matrix.',
          'Bei $n$ Parametern: $H \\in \\mathbb{R}^{n \\times n}$, also $n^2$ Einträge.',
          'Für $n = 10^9$: $H$ hat $10^{18}$ Einträge — unvorstellbar groß.',
        ],
        explanation:
          'Bei einem Netz mit $10^9$ Parametern hat die Hesse-Matrix $10^{18}$ Einträge. Speichern (Float32): $4 \\times 10^{18}$ Bytes = $4$ Exabyte. Unmöglich. Quasi-Newton-Methoden (L-BFGS) approximieren $H^{-1}$ — trotzdem nur für mittelgroße Probleme praktisch.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Optimierungsalgorithmen als Taylor-Approximationen\n\n- **Gradient Descent**: Minimiere Taylor-Linearisierung → $w \\leftarrow w - \\eta \\nabla f$\n- **Newton**: Minimiere Taylor-Quadratisierung → $w \\leftarrow w - H^{-1} \\nabla f$\n- **Adam**: Approximiere $H$ diagonal via $\\hat{v}_t$ (EMA quadrierter Gradienten) → $w \\leftarrow w - \\eta \\nabla f / \\sqrt{\\hat{v}_t + \\varepsilon}$\n\nAdam ist der pragmatische Kompromiss: bessere Konvergenz als reines GD, aber ohne die quadratische Hesse-Matrix zu benötigen.',
      },
      {
        kind: 'callout',
        content:
          'Die Taylor-Entwicklung von $\\log(1-p)$ erklärt den Cross-Entropy-Loss: für kleine Fehler $(p \\approx y)$ ist $-\\log(1-p) \\approx p + p^2/2 + \\dots$ — die ersten Terme sind der L1/L2-Loss. Cross-Entropy und MSE sind lokal äquivalent für sehr kleine Fehler.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.taylor.card1',
      front: 'Notwendige Bedingung für Extremum?',
      back: "$f'(x) = 0$.",
      conceptTags: ['critical-point'],
    },
    {
      id: 'p1.taylor.card2',
      front: 'Hinreichende Bedingung für Minimum?',
      back: "$f'(x) = 0$ und $f''(x) > 0$.",
      conceptTags: ['extremum'],
    },
    {
      id: 'p1.taylor.card3',
      front: 'Taylor 1. Ordnung in $a$?',
      back: "$f(x) \\approx f(a) + f'(a)(x - a)$.",
      conceptTags: ['taylor-series'],
    },
  ],

  learningOutcome:
    'Du kennst die notwendigen und hinreichenden Bedingungen für Extrema, kannst Taylor-Reihen 1. und 2. Ordnung aufstellen, und verstehst wie Gradient Descent (1. Ordnung), Newton-Verfahren (2. Ordnung) und Adam aus Taylor-Approximationen folgen.',

  description:
    'Extrema und Taylor-Reihen sind das mathematische Fundament der Optimierung. Gradient Descent ist eine 1.-Ordnung-Taylorapproximation, das Newton-Verfahren eine 2.-Ordnung-Approximation, und Adam ist ein Kompromiss zwischen beiden. Das Verständnis der Taylor-Reihe erklärt, warum Optimierungsalgorithmen funktionieren und wo ihre Grenzen liegen.',

  conceptSteps: [
    {
      title: 'Kritische Punkte: notwendige Bedingung für Extrema',
      body: 'An einem Extremum (Minimum oder Maximum) ist die Tangente waagerecht: $f\'(x^*) = 0$. Das ist die **notwendige Bedingung** — aber nicht hinreichend. Auch Sattelpunkte erfüllen $f\'(x^*) = 0$. In mehrdimensionaler Optimierung: $\\nabla f(x^*) = 0$ (Gradient-Vektor ist null). In ML: Gradient Descent sucht nach solchen Punkten.',
      preprompt: 'Was ist der Unterschied zwischen einem Minimum, Maximum und Sattelpunkt?',
      miniExample:
        '$f(x) = x^3$: $f\'(x) = 3x^2 = 0$ bei $x = 0$. Aber $x = 0$ ist ein Sattelpunkt (Wendepunkt), kein Extremum. Deshalb braucht man hinreichende Bedingungen.',
      selfCheck: 'Ist $f\'(x^*) = 0$ immer ein Minimum? Was ist ein Gegenbeispiel?',
    },
    {
      title: 'Hinreichende Bedingungen: zweite Ableitung',
      body: 'Wenn $f\'(a) = 0$ und $f\'\'(a) > 0$: **lokales Minimum** (Kurve wölbt sich nach oben). Wenn $f\'(a) = 0$ und $f\'\'(a) < 0$: **lokales Maximum** (Kurve wölbt sich nach unten). Wenn $f\'(a) = 0$ und $f\'\'(a) = 0$: keine Aussage, höhere Ableitungen nötig. In ML (mehrdimensional): Hesse-Matrix $H$ positiv-definit → Minimum, indefinit → Sattelpunkt.',
      preprompt: 'Was sagt die zweite Ableitung über die Krümmung einer Funktion aus?',
      miniExample:
        '$f(x) = x^2 - 4x + 5 = (x-2)^2 + 1$. $f\'(x) = 2x - 4 = 0$ bei $x = 2$. $f\'\'(x) = 2 > 0$ → Minimum. Tatsächlich: $f(2) = 1$ ist der Minimalwert.',
      selfCheck: 'Was bedeutet $f\'\'(a) = 0$ für die hinreichende Bedingung?',
    },
    {
      title: 'Taylor-Reihe: Funktion durch Polynome approximieren',
      body: 'Eine glatte Funktion $f$ lässt sich in der Nähe eines Punkts $a$ durch ein Polynom approximieren:\n$$f(x) \\approx f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2}(x-a)^2 + \\frac{f\'\'\'(a)}{6}(x-a)^3 + \\dots$$\n1. Ordnung (linear): $f(x) \\approx f(a) + f\'(a)(x-a)$ — Tangentengleichung\n2. Ordnung (quadratisch): fügt Krümmungsterm hinzu\nDie Taylor-Reihe "beschreibt eine Funktion durch ihre Ableitungen in einem Punkt".',
      preprompt: 'Warum approximiert man eine Funktion durch ein Polynom?',
      miniExample:
        '$e^x$ bei $a = 0$: $e^0 = 1$, $e\' = e^0 = 1$, $e\'\' = 1$, usw. Taylor: $e^x \\approx 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots$ Bei $x = 0{,}1$: $\\approx 1{,}1052$ (exakt: $1{,}10517$).',
      selfCheck: 'Wie lautet die Taylor-Entwicklung von $\\sin(x)$ um $x = 0$?',
    },
    {
      title: 'Gradient Descent: Minimiere die Taylor-Linearisierung',
      body: 'Gradient Descent (1. Ordnung) approximiert $f$ lokal als Gerade: $f(x + d) \\approx f(x) + f\'(x) \\cdot d$. Um $f$ zu verkleinern, wähle $d$ in Gegenrichtung des Gradienten: $d = -\\eta \\cdot f\'(x)$. Das ist Taylor-Approximation 1. Ordnung mit dem Schritt in Richtung des stärksten Abstiegs. Problem: die Approximation gilt nur lokal — zu große $\\eta$ verlassen den Gültigkeitsbereich.',
      preprompt: 'Warum approximiert GD die Funktion nur 1. Ordnung?',
      miniExample:
        'Loss $L(w) = (w-3)^2 + 2$. Bei $w = 5$: $L = 6$, $L\' = 4$. GD-Schritt: $w \\leftarrow 5 - 0{,}1 \\cdot 4 = 4{,}6$. $L(4{,}6) = (4{,}6-3)^2 + 2 = 4{,}56$ — weniger als $6$. Taylor-Linearisierung: $L(5 - 0{,}4) \\approx 6 + 4 \\cdot (-0{,}4) = 4{,}4$ — etwas zu optimistisch.',
      selfCheck: 'Was passiert wenn die Lernrate $\\eta$ viel größer als $1/L\'\'$ ist?',
    },
    {
      title: 'Newton-Verfahren: Minimiere die Taylor-Quadratisierung',
      body: 'Newton (2. Ordnung): approximiere $f$ lokal als Parabel: $f(x+d) \\approx f(x) + f\'(x)d + \\frac{f\'\'(x)}{2}d^2$. Minimiere nach $d$: $0 = f\'(x) + f\'\'(x)d$, also $d = -f\'(x)/f\'\'(x)$. Newton-Schritt: $x \\leftarrow x - f\'(x)/f\'\'(x)$. Vorteil: konvergiert quadratisch (nicht linear wie GD). Nachteil: braucht $f\'\'$ (teuer in hochdimensional: $n^2$ Einträge in Hesse-Matrix).',
      preprompt: 'Warum ist die Hesse-Matrix im hochdimensionalen Fall so teuer?',
      miniExample:
        '$f(x) = (x-3)^2$: $f\' = 2(x-3)$, $f\'\' = 2$. Newton-Schritt bei $x_0 = 5$: $x_1 = 5 - 2(5-3)/2 = 5 - 2 = 3$. Ein Schritt zum Minimum! (Parabel ist exakt durch 2. Ordnung dargestellt.)',
      selfCheck: 'Warum braucht Newton auf einer Parabel immer genau einen Schritt?',
    },
    {
      title: 'Adam als pragmatischer Kompromiss',
      body: 'Adam approximiert die Hesse-Matrix diagonal: $\\text{diag}(H) \\approx \\hat{v}_t = \\frac{\\text{EMA}(g_t^2)}{1-\\beta_2^t}$ (Exponential Moving Average der quadrierten Gradienten). Adam-Update: $w \\leftarrow w - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\varepsilon} \\hat{m}_t$. Das ist Newton mit diagonaler Hesse-Approximation: adaptiv skalierte Lernraten pro Parameter. Teuer in $O(n)$ statt $O(n^2)$ für vollständige Hesse-Matrix.',
      preprompt: 'Was wäre die ideale Lernrate pro Parameter, wenn man die Hesse-Matrix kennte?',
      miniExample:
        'Parameter $w_1$ hat flache Loss-Landschaft (kleiner Gradient, kleine Krümmung): Adam gibt ihm große effektive Lernrate. Parameter $w_2$ mit steiler Landschaft: Adam gibt ihm kleine effektive Lernrate. Ohne Adam: einheitliche Lernrate für alle.',
      selfCheck: 'Warum kann Adam nicht die volle Hesse-Matrix nutzen?',
    },
  ],

  codeBridges: [
    {
      title: 'Taylor-Approximation und Gradient Descent vs. Newton auf einer Parabel',
      lang: 'python',
      code: `import torch
import numpy as np

# === Taylor-Approximation visualisieren ===
def f(x):
    return torch.exp(x)  # e^x — unendliche Taylor-Reihe

def taylor_order_n(x, a, n_terms):
    """Taylor-Approximation von e^x um a bis zur n-ten Ordnung"""
    result = torch.zeros_like(x)
    factorial = 1.0
    ea = np.exp(a)  # f^(k)(a) = e^a für alle k
    for k in range(n_terms):
        if k > 0:
            factorial *= k
        result += ea / factorial * (x - a)**k
    return result

x = torch.linspace(-2, 4, 100)
a = 0.0
for n in [1, 2, 3, 5]:
    approx = taylor_order_n(x, a, n)
    max_err = (approx - f(x)).abs().max().item()
    print(f"Taylor Ordnung {n}: Max-Fehler auf [-2,4] = {max_err:.4f}")

# === Gradient Descent vs. Newton auf f(w) = (w-3)^2 + 2 ===
print("\\nGD vs. Newton auf f(w) = (w-3)^2 + 2:")
print("-" * 50)

# Gradient Descent
w_gd = torch.tensor(7.0)
eta = 0.3
for t in range(6):
    grad = 2 * (w_gd - 3)  # f'(w) = 2(w-3)
    w_gd = w_gd - eta * grad
    loss = (w_gd - 3)**2 + 2
    print(f"GD   t={t}: w={w_gd.item():.4f}, L={loss.item():.4f}")

print()
# Newton-Verfahren
w_newton = torch.tensor(7.0)
for t in range(4):
    grad = 2 * (w_newton - 3)   # f'(w) = 2(w-3)
    hess = 2.0                   # f''(w) = 2 (konstant!)
    w_newton = w_newton - grad / hess  # Newton-Schritt
    loss = (w_newton - 3)**2 + 2
    print(f"Newton t={t}: w={w_newton.item():.4f}, L={loss.item():.4f}")
# Newton braucht auf Parabel genau 1 Schritt!

# === Adam-artiges Update (vereinfacht) ===
print("\\nAdam-ähnliches Update (diagonale Hesse-Approximation):")
w_adam = torch.tensor(7.0, requires_grad=True)
beta2 = 0.999
eta_adam = 0.5
v = torch.tensor(0.0)

for t in range(1, 7):
    with torch.no_grad():
        grad = 2 * (w_adam - 3)
    v = beta2 * v + (1 - beta2) * grad**2
    v_hat = v / (1 - beta2**t)  # Bias-Korrektur
    w_adam = w_adam - eta_adam / (torch.sqrt(v_hat) + 1e-8) * grad
    loss = (w_adam - 3)**2 + 2
    print(f"Adam t={t}: w={w_adam.item():.4f}, L={loss.item():.4f}, lr_eff={eta_adam/(torch.sqrt(v_hat)+1e-8):.4f}")`,
      annotation:
        'Newton konvergiert auf einer Parabel in genau einem Schritt, weil die 2. Taylor-Ordnung exakt ist. GD braucht viele Schritte (Rate abhängig von $\\eta$). Adam adaptiert die effektive Lernrate basierend auf der geschätzten Krümmung.',
    },
  ],

  derivations: [
    {
      claim: 'Newton-Schritt aus Taylor 2. Ordnung herleiten',
      reasoning:
        'Taylor 2. Ordnung: $f(x+d) \\approx f(x) + f\'(x)d + \\frac{f\'\'(x)}{2}d^2$. Minimiere nach $d$: Ableitung nach $d$ nullsetzen: $f\'(x) + f\'\'(x)d = 0 \\Rightarrow d^* = -f\'(x)/f\'\'(x)$. Newton-Update: $x \\leftarrow x - f\'(x)/f\'\'(x)$. Mehrdimensional: $x \\leftarrow x - H(x)^{-1}\\nabla f(x)$ mit Hesse-Matrix $H$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$f\'(a) = 0$ bedeutet immer ein Minimum.',
      correct: '$f\'(a) = 0$ ist nur eine notwendige, keine hinreichende Bedingung.',
      explanation: 'Auch Maxima und Sattelpunkte erfüllen $f\'(a) = 0$. Für ein Minimum muss zusätzlich $f\'\'(a) > 0$ gelten — der zweite Ableitungstest.',
    },
    {
      wrong: 'Die Taylor-Reihe approximiert eine Funktion überall gleich gut.',
      correct: 'Taylor approximiert nur lokal in der Nähe des Entwicklungspunkts.',
      explanation: 'Für große $|x-a|$ kann der Fehler beliebig groß werden. Der Konvergenzradius hängt von der Funktion ab — $\\sin(x)$ konvergiert überall, $1/(1-x)$ nur für $|x| < 1$.',
    },
    {
      wrong: 'Newton-Verfahren ist immer besser als Gradient Descent.',
      correct: 'Newton braucht die Hesse-Matrix — bei $n$ Parametern eine $n \\times n$ Matrix.',
      explanation: 'Für $10^6$ Parameter wäre $H \\in \\mathbb{R}^{10^6 \\times 10^6}$ — $10^{12}$ Einträge, unpraktikabel. Deshalb nutzt man in der Praxis L-BFGS (approximiert $H^{-1}$) oder Adam.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: Essence of Calculus — Taylor Series (YouTube)',
      type: 'video' as const,
      note: 'Folge 11: intuitive Erklärung der Taylor-Reihe mit geometrischen Animationen.',
    },
    {
      title: 'Nocedal & Wright: Numerical Optimization, Kap. 3 (Newton-Verfahren)',
      type: 'book' as const,
      note: 'Standardwerk für Optimierungsalgorithmen — Kapitel 3 behandelt Newton und Quasi-Newton.',
    },
    {
      title: 'Kingma & Ba: "Adam: A Method for Stochastic Optimization" (2014)',
      type: 'article' as const,
      note: 'Original-Paper zu Adam — erklärt die Verbindung zur diagonalen Hesse-Approximation.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.ableitung-konzept', relation: 'requires', hint: 'Extrema und Taylor basieren auf der Ableitung als Tangenten-Steigung.' },
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'extends', hint: 'Im Mehrdimensionalen: Gradient statt Ableitung, Hesse-Matrix statt zweite Ableitung.' },
    { lessonId: 'p1.jacobi-hesse', relation: 'extends', hint: 'Hesse-Matrix verallgemeinert die zweite Ableitung auf mehrere Variablen.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'see-also', hint: 'Adam nutzt exponentiell gemittelte Gradienten — Verbindung zu Backprop.' },
  ],

  reflection: 'Adam benutzt quadrierte Gradienten als Näherung für die Hesse-Diagonale. Was sind die Schwächen dieser Approximation? Wann könnte eine nicht-diagonale Hesse-Approximation (wie L-BFGS) sinnvoller sein?',
}
