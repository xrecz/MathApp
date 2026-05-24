import type { Lesson } from '../../../types'

export const spektraltheorem: Lesson = {
  id: 'p1.spektraltheorem',
  title: 'Symmetrische Matrizen & Spektraltheorem',
  conceptTags: ['symmetric', 'spectral-theorem', 'psd', 'covariance', 'quadratic-form'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Symmetrische Matrizen — die schönste Klasse\n\nEine Matrix $A$ ist **symmetrisch**, wenn $A = A^T$, d.h. $A_{ij} = A_{ji}$.\n\n**Spektraltheorem**: Jede symmetrische Matrix $A \\in \\mathbb{R}^{n \\times n}$ hat:\n- Nur **reelle** Eigenwerte $\\lambda_i \\in \\mathbb{R}$\n- **Orthonormale** Eigenvektoren\n- Zerlegung $A = Q \\Lambda Q^T$ mit orthogonaler Matrix $Q$',
      },
      {
        kind: 'math',
        content:
          '$$A = Q \\Lambda Q^T = \\sum_{i=1}^n \\lambda_i q_i q_i^T \\quad (\\text{spektrale Zerlegung})$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Kovarianzmatrizen $\\Sigma = \\frac{1}{n} X^T X$ sind stets symmetrisch und **positiv semidefinit** (PSD). Das garantiert reelle, nicht-negative Eigenwerte — d.h. Varianzen sind nie negativ. PCA funktioniert deshalb immer.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Positiv (Semi-)Definit\n\nEine symmetrische Matrix $A$ ist:\n\n- **positiv definit** (PD): $x^T A x > 0$ für alle $x \\neq 0$ ↔ alle $\\lambda_i > 0$\n- **positiv semidefinit** (PSD): $x^T A x \\geq 0$ für alle $x$ ↔ alle $\\lambda_i \\geq 0$\n\n### Quadratische Form\n\n$x^T A x = \\sum_{i,j} A_{ij} x_i x_j$ — das ist der Ausdruck, der in Loss-Funktionen und Hessischen auftaucht.',
      },
      {
        kind: 'worked-example',
        content:
          '**Spektralzerlegung von $A = \\begin{pmatrix}2 & 1\\\\ 1 & 2\\end{pmatrix}$**:\n\nEigenwerte: $\\det(A - \\lambda I) = (2-\\lambda)^2 - 1 = 0 \\Rightarrow \\lambda = 3$ oder $\\lambda = 1$\n\nEV zu $\\lambda = 3$: $(A - 3I)v = 0 \\Rightarrow v_1 = \\frac{1}{\\sqrt{2}}(1,1)^T$\n\nEV zu $\\lambda = 1$: $v_2 = \\frac{1}{\\sqrt{2}}(1,-1)^T$ (orthogonal zu $v_1$)\n\n$A = 3 v_1 v_1^T + 1 \\cdot v_2 v_2^T$',
      },
    ],
    practice: [
      {
        id: 'p1.spektral.ex1',
        difficulty: 1,
        conceptTags: ['symmetric'],
        type: 'mc',
        prompt: 'Welche Matrix ist symmetrisch?',
        options: [
          '$\\begin{pmatrix}1 & 2\\\\ 2 & 3\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 2\\\\ 3 & 1\\end{pmatrix}$',
          '$\\begin{pmatrix}0 & 1\\\\ -1 & 0\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 0\\\\ 2 & 1\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}1 & 2\\\\ 2 & 3\\end{pmatrix}$',
        hints: [
          'Symmetrisch: $A = A^T$, d.h. $A_{12} = A_{21}$.',
          'Prüfe: Ist das $(1,2)$-Element gleich dem $(2,1)$-Element?',
          'Erste Matrix: $A_{12} = A_{21} = 2$ ✓',
        ],
        explanation: '$\\begin{pmatrix}1&2\\\\2&3\\end{pmatrix}^T = \\begin{pmatrix}1&2\\\\2&3\\end{pmatrix}$ ✓ — symmetrisch.',
      },
      {
        id: 'p1.spektral.ex2',
        difficulty: 2,
        conceptTags: ['covariance', 'symmetric'],
        type: 'mc',
        prompt: 'Warum ist $C = X^T X$ für $X \\in \\mathbb{R}^{m \\times n}$ stets symmetrisch?',
        options: [
          '$(X^T X)^T = X^T (X^T)^T = X^T X$ — Transponierte von $C$ ist $C$ selbst',
          'Weil $X$ symmetrisch ist',
          'Weil alle Einträge von $X$ positiv sind',
          '$X^T X$ ist nur für quadratisches $X$ symmetrisch',
        ],
        answer: '$(X^T X)^T = X^T (X^T)^T = X^T X$ — Transponierte von $C$ ist $C$ selbst',
        hints: [
          'Prüfe $(X^T X)^T = ?$',
          '$(AB)^T = B^T A^T$: $(X^T X)^T = X^T (X^T)^T = X^T X$.',
          'Ergebnis = $C$ selbst → symmetrisch.',
        ],
        explanation:
          '$(X^T X)^T = X^T (X^T)^T = X^T X$. Gilt für jede Matrix $X$, unabhängig von Dimensionen.',
      },
      {
        id: 'p1.spektral.ex3',
        difficulty: 2,
        conceptTags: ['psd'],
        type: 'mc',
        prompt: 'Eine PSD-Matrix hat...',
        options: [
          '...nur nicht-negative Eigenwerte ($\\lambda_i \\geq 0$)',
          '...nur positive Einträge',
          '...Determinante $> 0$',
          '...nur Eigenwerte gleich 1',
        ],
        answer: '...nur nicht-negative Eigenwerte ($\\lambda_i \\geq 0$)',
        hints: [
          'PSD: $x^T A x \\geq 0$ für alle $x$.',
          'Spektraltheorem: $x^T A x = \\sum_i \\lambda_i (q_i^T x)^2 \\geq 0$.',
          'Das erfordert $\\lambda_i \\geq 0$.',
        ],
        explanation: '$x^T A x = \\sum_i \\lambda_i (q_i^T x)^2 \\geq 0$ für alle $x$ ↔ alle $\\lambda_i \\geq 0$.',
      },
      {
        id: 'p1.spektral.ex4',
        difficulty: 3,
        conceptTags: ['quadratic-form'],
        type: 'numeric',
        prompt:
          'Quadratische Form $x^T A x$ für $A = \\begin{pmatrix}2 & 0\\\\ 0 & 3\\end{pmatrix}$, $x = (1, 1)^T$?',
        answer: 5,
        hints: [
          '$x^T A x = \\sum_{i,j} A_{ij} x_i x_j$.',
          'Für Diagonalmatrix: $x^T A x = \\sum_i A_{ii} x_i^2 = 2 \\cdot 1^2 + 3 \\cdot 1^2$.',
          '$= 2 + 3 = 5$.',
        ],
        explanation: '$x^T A x = 2 \\cdot 1^2 + 3 \\cdot 1^2 = 5$.',
      },
      {
        id: 'p1.spektral.ex5',
        difficulty: 3,
        conceptTags: ['spectral-theorem', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Bei PCA wird $C = \\frac{1}{m} X^T X$ eigendekomponiert. Was ist der Eigenvektor zu $\\lambda_{\\max}$?',
        options: [
          'Die erste Hauptkomponente (Richtung größter Varianz)',
          'Der Mittelwert der Datenpunkte',
          'Der am wenigsten informative Feature-Vektor',
          'Die Richtung mit minimaler Varianz',
        ],
        answer: 'Die erste Hauptkomponente (Richtung größter Varianz)',
        hints: [
          '$\\lambda_i$ = Varianz der Daten in Richtung des Eigenvektors $q_i$.',
          'Größter Eigenwert → größte Varianz.',
          'Erste Hauptkomponente erklärt den größten Teil der Varianz.',
        ],
        explanation:
          '$\\lambda_{\\max}$ entspricht der größten Varianz in der Datenprojektion. Der zugehörige EV $q_1$ ist die erste Hauptkomponente — die Richtung, die die meiste Information enthält.',
      },
      {
        id: 'p1.spektral.ex6',
        difficulty: 4,
        conceptTags: ['psd', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Adam optimiert mit $\\hat{v}_t$ (EMA der quadrierten Gradienten). Warum wird der Schritt $-g_t / \\sqrt{\\hat{v}_t}$ als "preconditioning" bezeichnet?',
        options: [
          'Es approximiert die Inverse der Hessischen diagonal — skaliert den Gradienten je Feature',
          'Es normiert den Gradienten auf Einheitslänge',
          'Es verhindert negative Lernraten',
          'Es berechnet die Hauptkomponenten des Gradienten',
        ],
        answer: 'Es approximiert die Inverse der Hessischen diagonal — skaliert den Gradienten je Feature',
        hints: [
          '$\\hat{v}_t \\approx \\mathbb{E}[g^2]$ approximiert die Diagonale der Hessischen.',
          '$1/\\sqrt{\\hat{v}_t}$ ist damit eine Diagonalnäherung von $H^{-1/2}$.',
          'Das ist ein diagonales Preconditioning — skaliert in Richtungen hoher Krümmung weniger.',
        ],
        explanation:
          'Adam dividiert durch $\\sqrt{\\hat{v}_t} \\approx$ Diagonale von $H^{1/2}$ — das approximiert den Newton-Schritt $-H^{-1} g$ diagonal. In Richtungen mit großer Krümmung (große EWe der Hessischen) wird der Schritt kleiner.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Spektralzerlegung in der Praxis\n\n$A = Q \\Lambda Q^T = \\sum_{i=1}^n \\lambda_i q_i q_i^T$\n\nJeder Term $\\lambda_i q_i q_i^T$ ist eine Rang-1-Matrix (äußeres Produkt). Die Spektralzerlegung schreibt jede symmetrische Matrix als **gewichtete Summe von Rang-1-Matrizen**.\n\nMit $k < n$ Termen erhält man die **beste Rang-$k$-Approximation** (Eckart-Young-Theorem).',
      },
      {
        kind: 'callout',
        content:
          'Das Spektraltheorem erklärt, warum Kovarianzmatrizen immer diagonalisierbar sind, warum PCA immer funktioniert, und warum Gram-Matrizen ($K = X X^T$) in Kernel-Methoden PSD sind. Es ist einer der Grundpfeiler des maschinellen Lernens.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.spektral.card1',
      front: 'Spektraltheorem (symmetrische Matrix)?',
      back: '$A = A^T \\Rightarrow A = Q \\Lambda Q^T$: reelle EWe, orthonormale EVe.',
      conceptTags: ['spectral-theorem'],
    },
    {
      id: 'p1.spektral.card2',
      front: 'Positiv semidefinit (PSD)?',
      back: '$x^T A x \\geq 0$ für alle $x$ ↔ alle $\\lambda_i \\geq 0$.',
      conceptTags: ['psd'],
    },
    {
      id: 'p1.spektral.card3',
      front: 'Warum ist $X^T X$ immer PSD?',
      back: '$x^T (X^T X) x = \\|Xx\\|_2^2 \\geq 0$ für alle $x$.',
      conceptTags: ['psd', 'covariance'],
    },
  ],
}
