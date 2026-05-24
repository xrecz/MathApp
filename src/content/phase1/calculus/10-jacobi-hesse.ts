import type { Lesson } from '../../../types'

export const jacobiHesse: Lesson = {
  id: 'p1.jacobi-hesse',
  title: 'Jacobi-Matrix & Hesse-Matrix',
  conceptTags: ['jacobian', 'hessian', 'second-derivative', 'curvature', 'convexity'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Verallgemeinerungen der Ableitung\n\n**Jacobi-Matrix** $J$: für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ — alle partiellen Ableitungen:\n\n$J_{ij} = \\frac{\\partial f_i}{\\partial x_j} \\quad \\Rightarrow \\quad J \\in \\mathbb{R}^{m \\times n}$\n\n**Hesse-Matrix** $H = \\nabla^2 f$: für $f: \\mathbb{R}^n \\to \\mathbb{R}$ — alle zweiten partiellen Ableitungen:\n\n$H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\quad \\Rightarrow \\quad H \\in \\mathbb{R}^{n \\times n}$, symmetrisch.',
      },
      {
        kind: 'math',
        content:
          '$$J = \\begin{pmatrix}\\frac{\\partial f_1}{\\partial x_1} & \\cdots & \\frac{\\partial f_1}{\\partial x_n}\\\\ \\vdots & \\ddots & \\vdots\\\\ \\frac{\\partial f_m}{\\partial x_1} & \\cdots & \\frac{\\partial f_m}{\\partial x_n}\\end{pmatrix} \\qquad H = \\begin{pmatrix}\\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2}\\\\ \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2}\\end{pmatrix}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Hesse-Matrix beschreibt die Krümmung der Loss-Landschaft. Positiv-definite Hesse ⇔ lokales Minimum (Spektraltheorem aus Phase D!). Newton-Verfahren nutzt $H^{-1} \\nabla f$ — quasi optimaler Schritt, aber zu teuer für große Netze.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Jacobi — die Matrix-Verallgemeinerung des Gradienten\n\nFür $f: \\mathbb{R}^2 \\to \\mathbb{R}^2$ mit $f(x,y) = (x^2, xy)$:\n\n$J = \\begin{pmatrix} \\frac{\\partial(x^2)}{\\partial x} & \\frac{\\partial(x^2)}{\\partial y}\\\\ \\frac{\\partial(xy)}{\\partial x} & \\frac{\\partial(xy)}{\\partial y}\\end{pmatrix} = \\begin{pmatrix}2x & 0\\\\ y & x\\end{pmatrix}$\n\n### Hesse — zweite Ableitungen und Krümmung\n\nFür $f(x,y) = x^2 + 3xy + y^2$:\n\n$H = \\begin{pmatrix}\\frac{\\partial^2 f}{\\partial x^2} & \\frac{\\partial^2 f}{\\partial x \\partial y}\\\\ \\frac{\\partial^2 f}{\\partial y \\partial x} & \\frac{\\partial^2 f}{\\partial y^2}\\end{pmatrix} = \\begin{pmatrix}2 & 3\\\\ 3 & 2\\end{pmatrix}$\n\n**Konvexitätstest**: $f$ konvex ⇔ $H$ überall positiv semidefinit ⇔ alle Eigenwerte von $H \\geq 0$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Krümmungsanalyse von $f(x,y) = x^2 + y^2$**:\n\n$H = \\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$ — Diagonalmatrix\n\nEigenwerte: $\\lambda_1 = \\lambda_2 = 2 > 0$ → **positiv definit** → globales Minimum bei $(0,0)$.\n\n**Newton-Verfahren** (multivariat): $x_{n+1} = x_n - H^{-1} \\nabla f$.\n\n$H^{-1} = \\frac{1}{2}I$. Bei $(3,4)$: $\\nabla f = (6,8)$. Newton-Schritt: $(3,4) - \\frac{1}{2}(6,8) = (0,0)$ — **in einem Schritt!**',
      },
    ],
    practice: [
      {
        id: 'p1.hesse.ex1',
        difficulty: 1,
        conceptTags: ['jacobian'],
        type: 'mc',
        prompt: 'Für $f: \\mathbb{R}^3 \\to \\mathbb{R}^2$, welche Dimension hat die Jacobi-Matrix?',
        options: ['$2 \\times 3$', '$3 \\times 2$', '$2 \\times 2$', '$3 \\times 3$'],
        answer: '$2 \\times 3$',
        hints: [
          '$J_{ij} = \\partial f_i / \\partial x_j$.',
          '$i$ läuft über Ausgaben: $1, \\dots, m = 2$.',
          '$j$ läuft über Eingaben: $1, \\dots, n = 3$. Also $m \\times n = 2 \\times 3$.',
        ],
        explanation: 'Jacobi für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$: $J \\in \\mathbb{R}^{m \\times n} = \\mathbb{R}^{2 \\times 3}$. Zeilen = Outputs, Spalten = Inputs.',
      },
      {
        id: 'p1.hesse.ex2',
        difficulty: 2,
        conceptTags: ['hessian'],
        type: 'mc',
        prompt: '"Die Hesse-Matrix ist immer symmetrisch (für ausreichend glatte $f$)." — Wahr oder falsch?',
        options: [
          'Wahr — Satz von Schwarz: gemischte partielle Ableitungen sind gleich',
          'Falsch — nur für konvexe Funktionen',
          'Falsch — nur für lineare Funktionen',
          'Wahr — aber nur in einer Dimension',
        ],
        answer: 'Wahr — Satz von Schwarz: gemischte partielle Ableitungen sind gleich',
        hints: [
          'Satz von Schwarz (Clairaut): $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$.',
          'Das bedeutet $H_{ij} = H_{ji}$ — symmetrisch.',
          'Gilt für alle zweimal stetig differenzierbaren Funktionen.',
        ],
        explanation: 'Satz von Schwarz: Reihenfolge der partiellen Ableitungen vertauschbar → $H_{ij} = H_{ji}$ → $H$ symmetrisch. Damit gilt das Spektraltheorem: reelle Eigenwerte, orthogonale Eigenvektoren.',
      },
      {
        id: 'p1.hesse.ex3',
        difficulty: 2,
        conceptTags: ['convexity'],
        type: 'mc',
        prompt: 'Wann ist $f: \\mathbb{R}^n \\to \\mathbb{R}$ konvex?',
        options: [
          'Wenn die Hesse-Matrix überall positiv-semidefinit ist',
          'Wenn die Hesse-Matrix überall positiv-definit ist',
          'Wenn der Gradient überall $\\neq 0$ ist',
          'Wenn $f$ ein eindeutiges Minimum hat',
        ],
        answer: 'Wenn die Hesse-Matrix überall positiv-semidefinit ist',
        hints: [
          'Konvex: $x^T H x \\geq 0$ für alle $x$ (PSD-Bedingung).',
          'PSD ↔ alle Eigenwerte $\\geq 0$.',
          'Positiv-definit ($\\lambda > 0$) ist strenger — impliziert strenge Konvexität.',
        ],
        explanation: '$f$ konvex ⇔ $H(x) \\succeq 0$ für alle $x$ (PSD). Streng konvex: $H(x) \\succ 0$ (PD). Für lineare Regression: $H = X^T X \\succeq 0$ immer → Loss konvex → ein globales Minimum.',
      },
      {
        id: 'p1.hesse.ex4',
        difficulty: 3,
        conceptTags: ['hessian'],
        type: 'mc',
        prompt: 'Hesse-Matrix von $f(x, y) = x^2 + y^2$?',
        options: [
          '$\\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$',
          '$\\begin{pmatrix}2x & 0\\\\ 0 & 2y\\end{pmatrix}$',
          '$\\begin{pmatrix}2 & 2\\\\ 2 & 2\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$',
        hints: [
          '$\\frac{\\partial^2 f}{\\partial x^2} = 2$, $\\frac{\\partial^2 f}{\\partial y^2} = 2$.',
          '$\\frac{\\partial^2 f}{\\partial x \\partial y} = 0$ (keine gemischten Terme).',
          '$H = \\text{diag}(2, 2)$.',
        ],
        explanation: '$H = \\begin{pmatrix}2&0\\\\0&2\\end{pmatrix} = 2I$. Eigenwerte beide $2 > 0$ → positiv definit → striktes globales Minimum bei $(0,0)$.',
      },
      {
        id: 'p1.hesse.ex5',
        difficulty: 3,
        conceptTags: ['hessian', 'convexity'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Eigenwerte der Hesse-Matrix aus Aufgabe 4?',
        options: [
          '$\\{2, 2\\}$ — positiv-definit, also globales Minimum',
          '$\\{0, 0\\}$ — singulär, kein Minimum',
          '$\\{2, -2\\}$ — indefinit, Sattelpunkt',
          '$\\{1, 1\\}$ — Einheitsmatrix',
        ],
        answer: '$\\{2, 2\\}$ — positiv-definit, also globales Minimum',
        hints: [
          '$H = 2I$. Eigenwerte von $cI$ sind $c$ (mit Vielfachheit $n$).',
          'Beide Eigenwerte $= 2 > 0$ → positiv definit.',
          'PD → striktes Minimum (Spektraltheorem, Phase D!).',
        ],
        explanation: '$H = 2I$ hat Eigenwerte $2, 2 > 0$ → PD → $f(x,y) = x^2+y^2$ hat ein striktes globales Minimum bei $(0,0)$. Der Zusammenhang PD ↔ Minimum kommt direkt aus dem Spektraltheorem.',
      },
      {
        id: 'p1.hesse.ex6',
        difficulty: 4,
        conceptTags: ['hessian', 'jacobian'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Newton-Verfahren in mehreren Dimensionen — Update-Formel?',
        options: [
          '$x_{n+1} = x_n - H^{-1} \\nabla f$',
          '$x_{n+1} = x_n - \\nabla f$',
          '$x_{n+1} = x_n - H \\nabla f$',
          '$x_{n+1} = x_n + H^{-1} \\nabla f$',
        ],
        answer: '$x_{n+1} = x_n - H^{-1} \\nabla f$',
        hints: [
          'Newton: minimiere Taylor-Quadratisierung $f(x) \\approx f(x_n) + \\nabla f^T (x-x_n) + \\frac{1}{2}(x-x_n)^T H (x-x_n)$.',
          'Ableitung nach $(x-x_n)$: $\\nabla f + H(x-x_n) = 0 \\Rightarrow x-x_n = -H^{-1}\\nabla f$.',
          '$x_{n+1} = x_n - H^{-1}\\nabla f$.',
        ],
        explanation: 'Newton minimiert die quadratische Taylor-Näherung → $x_{n+1} = x_n - H^{-1}\\nabla f$. Für $f(x,y) = x^2+y^2$ bei $(3,4)$: $H^{-1}\\nabla f = \\frac{1}{2}(6,8) = (3,4)$. Ein Schritt → Minimum $(0,0)$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Jacobi und Hesse in der Praxis\n\n**Jacobi**: `torch.autograd.functional.jacobian(f, x)` berechnet $J$, aber **wird selten direkt konstruiert** — $O(nm)$ Speicher. Stattdessen: VJP/JVP in $O(n+m)$.\n\n**Hesse**: `torch.autograd.functional.hessian(f, x)` — $O(n^2)$ Speicher. Bei $n = 10^9$ Parametern: $4 \\times 10^{18}$ Bytes. Unmöglich.\n\n→ **First-Order-Methoden dominieren**: Adam, SGD nutzen nur Gradienten. Die Hesse ist theoretisch zentral (Konvexität, Konvergenzanalyse), aber praktisch nie direkt berechnet.',
      },
      {
        kind: 'callout',
        content:
          'Bei linearer Regression $L(w) = \\|Xw - y\\|^2$: $H = 2X^T X$ — konstant, PSD. Loss ist konvex → eindeutiges globales Minimum. Konvex-Analyse via Hesse erklärt, warum lineare Regression immer konvergiert — im Gegensatz zu tiefen Netzen mit nicht-konvexer Landschaft.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.hesse.card1',
      front: 'Definition Jacobi-Matrix?',
      back: '$J_{ij} = \\partial f_i / \\partial x_j \\in \\mathbb{R}^{m \\times n}$ für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$.',
      conceptTags: ['jacobian'],
    },
    {
      id: 'p1.hesse.card2',
      front: 'Definition Hesse-Matrix?',
      back: '$H_{ij} = \\partial^2 f / (\\partial x_i \\partial x_j)$, symmetrisch, $\\in \\mathbb{R}^{n \\times n}$ für $f: \\mathbb{R}^n \\to \\mathbb{R}$.',
      conceptTags: ['hessian'],
    },
    {
      id: 'p1.hesse.card3',
      front: 'Konvexitätstest via Hesse?',
      back: '$f$ konvex ⇔ $H$ überall positiv-semidefinit (alle Eigenwerte $\\geq 0$).',
      conceptTags: ['convexity'],
    },
  ],

  learningOutcome:
    'Du verstehst Jacobi-Matrix als Verallgemeinerung des Gradienten und Hesse-Matrix als Matrix der zweiten Ableitungen, kannst Konvexität via Eigenwerte der Hesse-Matrix beurteilen, und verstehst warum Newton-Verfahren und Hesse-basierte Optimierung für große Netze unpraktisch sind.',

  description:
    'Jacobi- und Hesse-Matrix sind die zweite und dritte Stufe der Differentialrechnung: Gradient (1. Ordnung) → Jacobi (1. Ordnung, vektorwertig) → Hesse (2. Ordnung). In ML erscheinen sie in der Konvexitätsanalyse, im Newton-Verfahren und bei der Krümmung der Loss-Landschaft. Praktisch werden sie meist nur implizit verwendet (Hesse-Vektor-Produkte, Adam als diagonale Hesse-Approximation).',

  conceptSteps: [
    {
      title: 'Jacobi-Matrix: der Gradient für vektorwertige Funktionen',
      body: 'Für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ ist die Jacobi-Matrix $J \\in \\mathbb{R}^{m \\times n}$ mit $J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$. Spezialfälle: $m=1$ → Gradient $\\nabla f$ (Zeilen-Vektor). $m=n$ → quadratische Jacobi-Matrix. Geometrisch: die Jacobi-Matrix ist die beste lineare Approximation von $f$ in der Nähe eines Punkts — sie verallgemeinert die Ableitung auf mehrdimensionale Funktionen.',
      preprompt: 'Was ist der Gradient einer skalaren Funktion, und wie erweitert man ihn auf vektorwertige Funktionen?',
      miniExample:
        '$f(x_1, x_2) = \\begin{pmatrix}x_1^2 + x_2 \\\\ x_1 x_2\\end{pmatrix}$: $J = \\begin{pmatrix}2x_1 & 1 \\\\ x_2 & x_1\\end{pmatrix}$. Bei $(1, 2)$: $J = \\begin{pmatrix}2 & 1 \\\\ 2 & 1\\end{pmatrix}$ — singuläre Matrix, Abbildung kollabiert in Richtung $(1, -2)$.',
      selfCheck: 'Was ist die Jacobi-Matrix einer linearen Abbildung $f(x) = Ax$?',
    },
    {
      title: 'Jacobi in ML: Gradienten durch Schichten',
      body: 'In neuronalen Netzen ist $\\frac{\\partial a^{(l)}}{\\partial a^{(l-1)}}$ die Jacobi-Matrix der $l$-ten Schicht. Für einen vollverbundenen Layer mit Sigmoid-Aktivierung: $J^{(l)} = \\text{diag}(\\sigma\'(z^{(l)})) \\cdot W^{(l)} \\in \\mathbb{R}^{n_l \\times n_{l-1}}$. Backprop propagiert $\\delta^{(l)} = (J^{(l)})^T \\delta^{(l+1)}$ — den Gradienten durch die Jacobi rückwärts. VJP (Vector-Jacobian-Product) berechnet $(J^T v)$ ohne $J$ explizit zu bauen.',
      preprompt: 'Was ist der Zusammenhang zwischen Jacobi-Matrix und Backpropagation?',
      miniExample:
        'Für Softmax: $J_{ij} = a_i(\\delta_{ij} - a_j)$ — eine $K \\times K$ Matrix (Klassen). Bei $K = 10000$ Vokabular: $J \\in \\mathbb{R}^{10000 \\times 10000}$ — $10^8$ Einträge, $400$ MB. PyTorch berechnet $(J^T v)$ ohne $J$ zu speichern: $O(K)$ statt $O(K^2)$.',
      selfCheck: 'Wie berechnet man ein Jacobi-Vektor-Produkt $J^T v$ effizienter als durch Aufbau von $J$?',
    },
    {
      title: 'Hesse-Matrix: zweite Ableitungen und Krümmung',
      body: 'Die Hesse-Matrix $H \\in \\mathbb{R}^{n \\times n}$ hat Einträge $H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$. Eigenschaften: (1) $H$ ist symmetrisch für zweimal stetig differenzierbare Funktionen (Schwartz-Satz: $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$); (2) $H$ beschreibt die Krümmung — ob die Funktion lokal konvex, konkav oder gemischt ist; (3) $H = J(\\nabla f)$ — Jacobi des Gradienten.',
      preprompt: 'Was bedeutet es, wenn eine Funktion an einem Punkt positive Krümmung hat?',
      miniExample:
        '$f(x, y) = x^2 + 2xy + 3y^2$. $H = \\begin{pmatrix}2 & 2 \\\\ 2 & 6\\end{pmatrix}$. Eigenwerte: $\\lambda_1 \\approx 1{,}17$, $\\lambda_2 \\approx 6{,}83$ — beide positiv. $f$ ist überall konvex. Gradient Descent konvergiert garantiert zum Minimum.',
      selfCheck: 'Was bedeutet es für die Loss-Landschaft, wenn die Hesse-Matrix indefinit ist (positive und negative Eigenwerte)?',
    },
    {
      title: 'Konvexitäts-Test via Eigenwerte der Hesse-Matrix',
      body: 'Eine Funktion $f: \\mathbb{R}^n \\to \\mathbb{R}$ ist konvex genau dann, wenn ihre Hesse-Matrix $H(x)$ überall positiv-semidefinit (PSD) ist: alle Eigenwerte $\\lambda_i(H) \\geq 0$. Strenge Konvexität: alle $\\lambda_i > 0$. Nicht-konvex: mindestens ein $\\lambda_i < 0$ (Sattelpunkt-Richtung). In ML: lineare Regression (MSE) ist konvex ($H = 2X^TX$ ist PSD). Neuronale Netze: nicht-konvex.',
      preprompt: 'Was ist der Zusammenhang zwischen PSD-Matrizen und Konvexität?',
      miniExample:
        '$L(w) = \\|Xw - y\\|^2$. $H = 2X^TX$: PSD per Definition (Gram-Matrix). Alle Eigenwerte $\\geq 0$ → $L$ ist konvex → GD konvergiert zum globalen Minimum. $H$ ist PD wenn $X$ vollen Rang hat (Spalten linear unabhängig).',
      selfCheck: 'Welche Loss-Funktionen in ML sind konvex, welche nicht?',
    },
    {
      title: 'Newton-Verfahren und Hesse-basierte Optimierung',
      body: 'Newton-Schritt: $w \\leftarrow w - H(w)^{-1} \\nabla L(w)$. Vorteil: berücksichtigt Krümmung — quadratische Konvergenz. Nachteil: $H \\in \\mathbb{R}^{n \\times n}$ mit $n = 10^9$: $4 \\times 10^{18}$ Bytes (4 Exabyte) unmöglich zu speichern. Alternativen: L-BFGS (approximiert $H^{-1}$ mit $O(mn)$ Speicher, $m$ = Vektorzahl), Adam (approximiert $\\text{diag}(H)$ via quadrierte Gradienten).',
      preprompt: 'Was ist der mathematische Vorteil von Newton, und warum ist er praktisch oft nicht anwendbar?',
      miniExample:
        'L-BFGS-B: Standard-Optimizer für mittelgroße Probleme ($n \\leq 10^6$). In PyTorch: `torch.optim.LBFGS`. Für konvexe Probleme (lineare Regression, logistische Regression): schneller als Adam. Für tiefe Netze: zu teuer pro Schritt, Mini-Batch-Stochastizität macht Hesse-Approximation schlecht.',
      selfCheck: 'Warum funktioniert L-BFGS mit Mini-Batches schlechter als mit dem vollen Datensatz?',
    },
    {
      title: 'Eigenwerte der Hesse-Matrix: Geometrie der Loss-Landschaft',
      body: 'Die Eigenwerte der Hesse-Matrix $H$ beschreiben die Krümmung in den Eigenvektor-Richtungen: großes $\\lambda$ → steile Kurve; kleines $\\lambda \\approx 0$ → flache Richtung. In tiefen Netzen: die Hesse-Matrix hat typischerweise einige sehr große und viele sehr kleine Eigenwerte. Das erklärt, warum GD mit einheitlicher Lernrate langsam ist (zu klein für steile Richtungen, zu groß für flache). Adam skaliert die Lernrate pro Dimension anhand von $\\hat{v}_t \\approx \\text{diag}(H)$.',
      preprompt: 'Was bedeutet ein Eigenwert $\\approx 0$ der Hesse-Matrix geometrisch?',
      miniExample:
        '$L(w_1, w_2) = w_1^2 + 100 w_2^2$: $H = \\text{diag}(2, 200)$, Konditionszahl $\\kappa = 200/2 = 100$. GD mit $\\eta = 0{,}01$: in $w_1$-Richtung Schritt $0{,}02$ (zu klein), in $w_2$-Richtung Schritt $2{,}0$ (Überschießen!). Newton: $w_1 \\leftarrow w_1 - \\frac{\\nabla_1}{2}$, $w_2 \\leftarrow w_2 - \\frac{\\nabla_2}{200}$ — beide konvergieren in einem Schritt.',
      selfCheck: 'Wie verhängt die Konditionszahl der Hesse-Matrix die Konvergenzrate von GD?',
    },
    {
      title: 'Hesse-Vektor-Produkte: praktische Hesse-Nutzung',
      body: 'Auch wenn $H$ selbst nicht berechnet werden kann, sind Hesse-Vektor-Produkte $Hv$ (für einen Vektor $v$) effizient berechenbar: $Hv = \\frac{\\partial}{\\partial w}(\\nabla L \\cdot v)$ — durch doppeltes Differenzieren. Das nennt sich "R-Operator" oder "forward-over-reverse" AD. Anwendungen: konjugiertes Gradientenverfahren (ohne $H$ zu invertieren), spektrale Norm (größter Eigenwert via Power-Iteration), Hessian-Vektor-Produkte für Curvature-aware Optimizer.',
      preprompt: 'Wie kann man mit der Hesse-Matrix rechnen ohne sie je zu speichern?',
      miniExample:
        '```python\nimport torch\nf_x = model(x)\nloss = criterion(f_x, y)\ng = torch.autograd.grad(loss, model.parameters(), create_graph=True)\n# Hesse-Vektor-Produkt Hv:\nHv = torch.autograd.grad(g, model.parameters(), v)  # ohne H zu bauen\n```',
      selfCheck: 'Warum sind Hesse-Vektor-Produkte $O(n)$ teuer statt $O(n^2)$?',
    },
  ],

  codeBridges: [
    {
      title: 'Jacobi-Matrix und Hesse-Matrix mit PyTorch Autograd',
      lang: 'python',
      code: `import torch
from torch.autograd.functional import jacobian, hessian

# === Jacobi-Matrix einer vektorwertigen Funktion ===
def f(x):
    """f: R^3 -> R^2"""
    return torch.stack([x[0]**2 + x[1], x[0]*x[1] + x[2]**2])

x0 = torch.tensor([1.0, 2.0, 3.0])
J = jacobian(f, x0)  # (2, 3) Matrix
print("Jacobi-Matrix von f bei (1,2,3):")
print(J.numpy())
# Analytisch: [[2x0, 1, 0], [x1, x0, 2x2]] bei (1,2,3) = [[2,1,0],[2,1,6]]

# === Hesse-Matrix einer skalaren Funktion ===
def loss_fn(w):
    """L(w) = w0^2 + 4*w1^2 + 2*w0*w1 — eine quadratische Form"""
    return w[0]**2 + 4*w[1]**2 + 2*w[0]*w[1]

w0 = torch.tensor([1.0, 1.0])
H = hessian(loss_fn, w0)  # (2, 2) Matrix
print("\\nHesse-Matrix von L:")
print(H.numpy())
# Analytisch: [[2, 2], [2, 8]] — konstant für quadratische Form!

# Eigenwerte der Hesse-Matrix (Konvexität prüfen)
eigvals = torch.linalg.eigvalsh(H)  # Nur für sym. Matrizen
print(f"Eigenwerte: {eigvals.numpy()}")
# Alle positiv → L ist streng konvex → eindeutiges globales Minimum

# === Konvexitäts-Check für MSE lineare Regression ===
torch.manual_seed(0)
n, d = 30, 5
X = torch.randn(n, d)
y = torch.randn(n)

def mse_loss(w):
    return ((X @ w - y)**2).mean()

w_test = torch.zeros(d)
H_mse = hessian(mse_loss, w_test)  # (5, 5)
H_mse_analytical = 2/n * X.T @ X  # Analytisch: 2/n * X^T X

print("\\nHesse von MSE:")
print(f"Numerisch:  {H_mse.numpy().diagonal().round(4)}")
print(f"Analytisch: {H_mse_analytical.numpy().diagonal().round(4)}")

eigvals_mse = torch.linalg.eigvalsh(H_mse)
print(f"Eigenwerte: {eigvals_mse.numpy().round(4)}")
print(f"Alle >= 0: {(eigvals_mse >= -1e-6).all().item()} → MSE ist konvex!")

# === Hesse-Vektor-Produkt (effizient, kein H aufbauen) ===
w = torch.randn(d, requires_grad=True)
v = torch.randn(d)  # Richtungsvektor

loss = mse_loss(w)
grad = torch.autograd.grad(loss, w, create_graph=True)[0]
# Hv = d/dw (grad · v): nur O(d) Operationen!
Hv = torch.autograd.grad((grad * v.detach()).sum(), w)[0]
print(f"\\nHesse-Vektor-Produkt Hv: {Hv.detach().numpy().round(4)}")
# Verifikation: H_mse_analytical @ v
print(f"Analytisch H@v:           {(H_mse_analytical @ v).numpy().round(4)}")`,
      annotation:
        '`torch.autograd.functional.hessian` ist für kleine Probleme gut — für große Netze unpraktisch ($O(n^2)$ Speicher). Hesse-Vektor-Produkte ($Hv$) sind $O(n)$ durch doppeltes Differenzieren und der Standard für Curvature-aware Methoden in der Praxis.',
    },
  ],

  derivations: [
    {
      claim: 'Warum ist die Hesse-Matrix symmetrisch (Schwartz-Theorem)',
      reasoning:
        'Für zweimal stetig differenzierbare Funktionen gilt der Satz von Schwartz: $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$. Das bedeutet: $H_{ij} = H_{ji}$ für alle $i, j$ — also $H = H^T$. Konsequenz: $H$ hat reelle Eigenwerte (Spektralsatz für symmetrische Matrizen). Konvexitäts-Äquivalenz: $f$ konvex $\\Leftrightarrow$ $H$ PSD $\\Leftrightarrow$ alle Eigenwerte $\\geq 0 \\Leftrightarrow$ $v^T H v \\geq 0$ für alle $v$. Die Eigenwerte sind direkt als Krümmungen in den Eigenvektor-Richtungen interpretierbar.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Die Jacobi-Matrix ist immer quadratisch ($m = n$).',
      correct: 'Jacobi $J \\in \\mathbb{R}^{m \\times n}$ ist quadratisch nur wenn $m = n$. Für $f: \\mathbb{R}^n \\to \\mathbb{R}$ ist $J$ ein Zeilenvektor $(1 \\times n)$.',
      explanation:
        'Für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ hat $J$ immer $m$ Zeilen (Output-Dimensionen) und $n$ Spalten (Input-Dimensionen). Nur für $m = n$ ist sie quadratisch.',
    },
    {
      wrong: 'Die Hesse-Matrix eines neuronalen Netzes ist positiv-definit.',
      correct: 'Die Loss-Funktion tiefer Netze ist nicht-konvex — die Hesse hat positive und negative Eigenwerte (Sattelpunkte, Indefinitheit).',
      explanation:
        'Nur bei konvexen Problemen (lineare Regression, logistische Regression) ist die Hesse PSD. Tiefe Netze sind hochgradig nichtkonvex — indefinite Hesse ist die Norm, nicht die Ausnahme.',
    },
    {
      wrong: '`torch.autograd.functional.hessian` ist der Standard für Hesse-Berechnungen in ML.',
      correct: 'Das ist nur für kleine Probleme ($n < 10^4$) praktikabel. Für große Modelle: Hesse-Vektor-Produkte via doppeltes Autograd.',
      explanation:
        'Die volle Hesse $H \\in \\mathbb{R}^{n \\times n}$ braucht $O(n^2)$ Speicher. Bei $n = 10^6$: $4$ TB. Hesse-Vektor-Produkte $Hv$ sind in $O(n)$ berechenbar ohne $H$ zu speichern.',
    },
  ],

  furtherResources: [
    {
      title: 'Goodfellow et al.: Deep Learning, Kap. 4.3 (Gradient-based Optimization)',
      type: 'book',
      note: 'Kanonische Behandlung von Jacobi, Hesse, Konvexität und Newton-Verfahren im ML-Kontext. Kostenlos online verfügbar.',
    },
    {
      title: 'Yann LeCun et al.: "Efficient BackProp" (1998)',
      type: 'article',
      note: 'Klassisches Paper über Second-Order-Methoden für neuronale Netze — zeigt Verbindungen zwischen Hesse-Diagonale und Adam-ähnlichen Methoden.',
    },
    {
      title: 'PyTorch: torch.autograd.functional Dokumentation',
      type: 'article',
      note: 'Offizielle API-Referenz für Jacobi, Hesse und Hesse-Vektor-Produkte mit Beispielen.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'requires', hint: 'Jacobi verallgemeinert den Gradienten; Hesse ist der Gradient des Gradienten.' },
    { lessonId: 'p1.spektraltheorem', relation: 'requires', hint: 'Hesse-Matrix ist symmetrisch → Spektralsatz anwendbar → reelle Eigenwerte → Konvexitätstest.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'requires', hint: 'Jacobi-Matrix ist das mathematische Objekt hinter der Backprop-Multiplikation.' },
    { lessonId: 'p1.extrema-taylor', relation: 'extends', hint: 'Newton-Verfahren nutzt die Hesse-Matrix zur Taylor-2.-Ordnung-Minimierung.' },
  ],

  reflection: 'Adam approximiert die Hesse-Diagonale durch quadrierte Gradienten. Welche Information der vollen Hesse-Matrix geht dabei verloren? Und wann könnte eine bessere Hesse-Approximation (z.B. K-FAC, Shampoo) gegenüber Adam Vorteile bieten — für welche Arten von Modellen oder Aufgaben?',
}
