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
}
