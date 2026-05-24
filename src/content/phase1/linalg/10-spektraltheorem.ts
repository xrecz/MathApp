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

  learningOutcome:
    'Du kannst den Spektraltheorem für symmetrische Matrizen formulieren und anwenden, positiv (semi-)definite Matrizen an ihren Eigenwerten erkennen, die Spektralzerlegung $A = Q\\Lambda Q^T$ interpretieren und erklären, warum Kovarianzmatrizen, Gram-Matrizen und Hessische immer PSD sind.',

  description:
    'Der Spektraltheorem ist einer der schönsten Sätze der Linearen Algebra: Jede symmetrische Matrix hat reelle Eigenwerte und orthonormale Eigenvektoren. Das ist keine Zufälligkeit — es ist das Fundament von PCA, der Konvexitätsanalyse von Loss-Funktionen und der Stabilität numerischer Algorithmen.',

  conceptSteps: [
    {
      title: 'Symmetrische Matrizen: die besondere Klasse',
      preprompt: 'Warum sind Kovarianzmatrizen, Hessische und Gram-Matrizen alle symmetrisch?',
      body: 'Eine Matrix $A \\in \\mathbb{R}^{n \\times n}$ ist **symmetrisch**, wenn $A = A^T$, d.h. $A_{ij} = A_{ji}$.\n\n**Beispiele**:\n- Kovarianzmatrix $\\Sigma = \\frac{1}{n} X^T X$: $(\\Sigma)^T = (X^T X)^T = X^T X = \\Sigma$ ✓\n- Hesse-Matrix $H_{ij} = \\partial^2 f/\\partial x_i \\partial x_j = H_{ji}$ (Satz von Schwarz) ✓\n- Gram-Matrix $K = XX^T$: $(XX^T)^T = X X^T = K$ ✓\n\nSymmetrische Matrizen haben außergewöhnliche Eigenschaften.',
    },
    {
      title: 'Spektraltheorem: die Hauptaussage',
      body: '**Spektraltheorem**: Jede symmetrische Matrix $A \\in \\mathbb{R}^{n \\times n}$ hat:\n\n1. Nur **reelle** Eigenwerte $\\lambda_1, \\dots, \\lambda_n \\in \\mathbb{R}$\n2. **Orthonormale** Eigenvektoren $q_1, \\dots, q_n$ (paarweise senkrecht, Länge 1)\n3. **Orthogonale Diagonalisierung**: $A = Q\\Lambda Q^T$\n\n$$Q = (q_1 | \\cdots | q_n) \\quad \\text{orthogonal}, \\quad \\Lambda = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$$',
    },
    {
      title: 'Orthogonale Diagonalisierung und Spektralzerlegung',
      body: 'Die Zerlegung $A = Q\\Lambda Q^T$ lässt sich als **Spektralzerlegung** schreiben:\n\n$$A = \\sum_{i=1}^n \\lambda_i q_i q_i^T$$\n\nJeder Term $\\lambda_i q_i q_i^T$ ist eine **Rang-1-Matrix** — eine "Schicht" der Abbildung.\n\nBedeutung: $A$ wirkt als gewichtete Summe von Projektionen auf die Eigenrichtungen.\n\n**Anwendung $A\\mathbf{x}$**: Projiziere $\\mathbf{x}$ auf jede Eigenrichtung, strecke mit $\\lambda_i$, rekombiniere.',
      miniExample: '$A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$: EVe $q_1 = (1,1)^T/\\sqrt{2}$, $q_2 = (1,-1)^T/\\sqrt{2}$. EWe $\\lambda_1=3$, $\\lambda_2=1$. Spektralzerlegung: $A = 3 q_1 q_1^T + 1 \\cdot q_2 q_2^T$.',
    },
    {
      title: 'Positiv semidefinite (PSD) Matrizen',
      body: 'Eine symmetrische Matrix $A$ ist:\n\n- **Positiv definit** (PD): $\\mathbf{x}^T A \\mathbf{x} > 0$ für alle $\\mathbf{x} \\neq \\vec{0}$ ↔ alle $\\lambda_i > 0$\n- **Positiv semidefinit** (PSD): $\\mathbf{x}^T A \\mathbf{x} \\geq 0$ für alle $\\mathbf{x}$ ↔ alle $\\lambda_i \\geq 0$\n- **Indefinit**: hat positive und negative Eigenwerte ↔ Sattelpunkt\n\n**Konvexitätstest**: Die Hesse-Matrix $H$ einer Funktion ist PSD ↔ die Funktion ist konvex.',
      selfCheck: 'Warum impliziert $\\mathbf{x}^T A \\mathbf{x} \\geq 0$ für alle $\\mathbf{x}$, dass alle Eigenwerte $\\geq 0$ sind?',
    },
    {
      title: 'PSD-Check: $X^T X$ ist immer PSD',
      body: 'Für **jede** Matrix $X \\in \\mathbb{R}^{m \\times n}$ gilt: $X^T X$ ist PSD.\n\n**Beweis**:\n\n$$\\mathbf{x}^T (X^T X) \\mathbf{x} = (X\\mathbf{x})^T (X\\mathbf{x}) = \\|X\\mathbf{x}\\|_2^2 \\geq 0$$\n\n**Konsequenz**: Alle Eigenwerte von $X^T X$ sind $\\geq 0$. Die Singulärwerte $\\sigma_i = \\sqrt{\\lambda_i(X^T X)} \\geq 0$ sind reell — SVD funktioniert immer.',
    },
    {
      title: 'ML: PSD-Matrizen überall in ML',
      body: 'Die wichtigsten PSD-Matrizen in ML:\n\n- **Kovarianzmatrix** $\\Sigma = \\frac{1}{n} X^T X$: PSD → reelle, nicht-negative Eigenwerte = Varianzen\n- **Gram-Matrix** $K = X X^T$: PSD → Kernel-Methoden (SVM, Gaussian Processes) funktionieren\n- **Hessische** des MSE: $H = \\frac{2}{n} X^T X$: PSD → Loss-Funktion der linearen Regression ist konvex\n- **Fisher-Information**: PSD → Cramér-Rao-Schranke wohldefiniert\n\nPSD = "kann man sicher optimieren" — alle lokalen Minima sind global.',
    },
  ],

  codeBridges: [
    {
      title: 'NumPy: Spektralzerlegung und PSD-Check',
      lang: 'python',
      code: `import numpy as np

# --- 1. Symmetrische Matrix diagonalisieren (Spektraltheorem) ---
A = np.array([[2.0, 1.0],
              [1.0, 2.0]])  # symmetrisch

# numpy.linalg.eigh: speziell für symmetrische/hermitesche Matrizen
# Garantiert reelle Eigenwerte, stabiler als eig
eigenvalues, eigenvectors = np.linalg.eigh(A)
# eigenvalues = [1., 3.] (aufsteigend sortiert)
# eigenvectors: Spalten sind orthonormale Eigenvektoren

# Probe: Spektralzerlegung A = Q Λ Q^T
Q = eigenvectors
Lambda = np.diag(eigenvalues)
A_reconstructed = Q @ Lambda @ Q.T
print(np.allclose(A, A_reconstructed))   # True

# --- 2. PSD-Check via Eigenwerte ---
def is_psd(M, tol=1e-8):
    """Prüfe ob M positiv semidefinit ist."""
    eigenvalues = np.linalg.eigh(M)[0]
    return np.all(eigenvalues >= -tol)

# Kovarianzmatrix aus Daten
np.random.seed(42)
X = np.random.randn(50, 4)
Sigma = (X.T @ X) / (len(X) - 1)   # empirische Kovarianzmatrix
print(f"Kovarianzmatrix ist PSD: {is_psd(Sigma)}")   # True

# --- 3. Spektralzerlegung als Rang-1-Summe ---
eigenvalues, Q = np.linalg.eigh(Sigma)
# A = Σ λ_i * q_i * q_i^T
A_approx = sum(eigenvalues[i] * np.outer(Q[:, i], Q[:, i])
               for i in range(len(eigenvalues)))
print(np.allclose(Sigma, A_approx))  # True

# --- 4. Rang-k-Approximation (bester Rang-k-Schnitt) ---
k = 2
A_k = sum(eigenvalues[-(i+1)] * np.outer(Q[:, -(i+1)], Q[:, -(i+1)])
          for i in range(k))
print(f"Approximationsfehler (Frobenius): {np.linalg.norm(Sigma - A_k, 'fro'):.4f}")`,
      annotation: '`np.linalg.eigh` ist für symmetrische Matrizen optimiert und garantiert reelle Eigenwerte (numerisch stabil). Verwende immer `eigh` statt `eig` für Kovarianzmatrizen und Hessische. Die Spektralzerlegung $A = \\sum_i \\lambda_i q_i q_i^T$ = `sum(...np.outer(q, q)...)` zeigt die Rang-1-Struktur. Der PSD-Check über Eigenwerte ist zuverlässiger als der Cholesky-Versuch (numerische Instabilität nahe der Grenze).',
    },
  ],

  derivations: [
    {
      claim: 'Eigenvektoren zu verschiedenen Eigenwerten einer symmetrischen Matrix sind orthogonal',
      reasoning:
        'Seien $\\lambda_1 \\neq \\lambda_2$ und $A q_1 = \\lambda_1 q_1$, $A q_2 = \\lambda_2 q_2$. Dann: $\\lambda_1 (q_1^T q_2) = (Aq_1)^T q_2 = q_1^T A^T q_2 = q_1^T A q_2 = q_1^T (\\lambda_2 q_2) = \\lambda_2 (q_1^T q_2)$. Also $(\\lambda_1 - \\lambda_2)(q_1^T q_2) = 0$. Da $\\lambda_1 \\neq \\lambda_2$: $q_1^T q_2 = 0$ — orthogonal!',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Jede reelle quadratische Matrix hat reelle Eigenwerte',
      correct: 'Nur symmetrische (und allgemeiner: selbstadjungierte) Matrizen haben garantiert reelle Eigenwerte',
      explanation: 'Rotationsmatrizen (z.B. $90°$-Rotation) sind nicht symmetrisch und haben komplexe Eigenwerte $\\pm i$. Der Spektraltheorem gilt nur für $A = A^T$.',
    },
    {
      wrong: 'Eine PSD-Matrix hat alle Einträge $\\geq 0$',
      correct: 'PSD bedeutet alle Eigenwerte $\\geq 0$, nicht alle Einträge $\\geq 0$',
      explanation: '$\\begin{pmatrix}2 & -1 \\\\ -1 & 2\\end{pmatrix}$ ist PSD (EWe: $1, 3$), hat aber negative Einträge. Umgekehrt kann eine Matrix mit allen positiven Einträgen indefinit sein.',
    },
    {
      wrong: 'Für den PSD-Check genügt es, die Diagonale zu prüfen',
      correct: 'PSD erfordert, alle Eigenwerte zu prüfen (oder Cholesky-Zerlegung zu versuchen)',
      explanation: 'Positive Diagonaleinträge sind notwendig, aber nicht hinreichend für PSD. Die korrekte Prüfung: `np.linalg.eigh(A)[0].min() >= 0` oder Cholesky-Zerlegung ohne Fehler.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Abstract vector spaces" (Essence of Linear Algebra, Ep. 15)',
      type: 'video',
      note: 'Vertieft den Zusammenhang zwischen Symmetrie und Eigenstrukturen',
    },
    {
      title: 'MML Book, Kapitel 4.2: "Eigendecomposition and Diagonalization"',
      type: 'book',
      note: 'Spektraltheorem und PSD-Matrizen rigoros, mit PCA-Anwendung',
    },
    {
      title: 'Trefethen & Bau: "Numerical Linear Algebra", Kapitel zur Hermiteschen Eigenwertzersetzung',
      type: 'book',
      note: 'Numerische Aspekte; warum eigh stabiler als eig für symmetrische Matrizen ist',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'requires',
      hint: 'Eigenwerte und Eigenvektoren sind die Grundlage des Spektraltheorems.',
    },
    {
      lessonId: 'p1.svd',
      relation: 'extends',
      hint: 'SVD verallgemeinert den Spektraltheorem auf beliebige (nicht-quadratische) Matrizen.',
    },
    {
      lessonId: 'p1.jacobi-hesse',
      relation: 'see-also',
      hint: 'Die Hesse-Matrix ist symmetrisch (Satz von Schwarz) — der Spektraltheorem garantiert reelle Krümmungseigenwerte.',
    },
    {
      lessonId: 'p1.determinante',
      relation: 'see-also',
      hint: 'Für symmetrische Matrizen: $\\det A = \\prod_i \\lambda_i \\geq 0$ (wenn PSD).',
    },
  ],

  reflection: 'Der Spektraltheorem macht symmetrische Matrizen zu den "zahmen" Matrizen der Linearen Algebra: reelle Eigenwerte, orthogonale Eigenrichtungen, alles wohldefiniert. Kovarianzmatrizen, Hessische, Gram-Matrizen — sie alle sind symmetrisch, und deshalb funktioniert PCA, funktioniert Konvexitätsanalyse, funktioniert Kernel-Methoden. **Welche dieser drei Anwendungen findest du am überraschendsten?**',
}
