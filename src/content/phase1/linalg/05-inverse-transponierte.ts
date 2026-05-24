import type { Lesson } from '../../../types'

export const inverseTransponierte: Lesson = {
  id: 'p1.inverse-transponierte',
  title: 'Inverse, Transponierte & Identität',
  conceptTags: ['identity', 'inverse', 'transpose', 'orthogonal'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Drei fundamentale Matrix-Konzepte\n\n**Identitäts-Matrix $I$**: Diagonale 1, sonst 0 — $AI = IA = A$.\n\n**Inverse $A^{-1}$**: $A A^{-1} = A^{-1} A = I$ — macht die Abbildung rückgängig.\n\n**Transponierte $A^T$**: Zeilen ↔ Spalten, $(A^T)_{ij} = A_{ji}$.',
      },
      {
        kind: 'math',
        content:
          '$$A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix} \\quad \\text{für } A = \\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Backpropagation überträgt Gradienten via $W^T$ rückwärts durch das Netz. Orthogonale Matrizen ($Q^T = Q^{-1}$) erhalten Normen — wichtig für Initialisierung ohne Vanishing Gradients.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Rechenregeln\n\n$(AB)^T = B^T A^T$ — Reihenfolge umkehren!\n\n$(AB)^{-1} = B^{-1} A^{-1}$ — ebenfalls Reihenfolge umkehren\n\n$(A^T)^T = A$ und $(A^{-1})^{-1} = A$\n\n### Orthogonale Matrix\n\nEine Matrix $Q$ ist **orthogonal**, wenn $Q^T Q = Q Q^T = I$, d.h. $Q^T = Q^{-1}$.\n\nSpaltenvektoren von $Q$ sind orthonormal (Länge 1, paarweise senkrecht).\n\n**Wichtige Eigenschaft**: Orthogonale Matrizen erhalten L2-Normen: $\\|Qx\\|_2 = \\|x\\|_2$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Inverse 2×2**:\n\n$A = \\begin{pmatrix}2 & 1\\\\ 1 & 1\\end{pmatrix}$, $\\det A = 2 \\cdot 1 - 1 \\cdot 1 = 1$\n\n$A^{-1} = \\frac{1}{1}\\begin{pmatrix}1 & -1\\\\ -1 & 2\\end{pmatrix} = \\begin{pmatrix}1 & -1\\\\ -1 & 2\\end{pmatrix}$\n\nProbe: $A A^{-1} = \\begin{pmatrix}2&1\\\\ 1&1\\end{pmatrix}\\begin{pmatrix}1&-1\\\\ -1&2\\end{pmatrix} = \\begin{pmatrix}1&0\\\\ 0&1\\end{pmatrix} = I$ ✓',
      },
    ],
    practice: [
      {
        id: 'p1.inv.ex1',
        difficulty: 1,
        conceptTags: ['identity'],
        type: 'mc',
        prompt: 'Was ist $I \\cdot v$ für jeden Vektor $v$?',
        options: ['$v$', '$\\vec{0}$', '$2v$', 'Hängt von $I$ ab'],
        answer: '$v$',
        hints: [
          '$I$ ist die Einheitsmatrix: diagonal 1, sonst 0.',
          '$I$ verändert keinen Vektor.',
          '$Iv = v$ per Definition.',
        ],
        explanation: 'Die Identitäts-Matrix ist die neutrale Abbildung: $Iv = v$ für alle $v$.',
      },
      {
        id: 'p1.inv.ex2',
        difficulty: 2,
        conceptTags: ['transpose'],
        type: 'mc',
        prompt: 'Transponierte von $\\begin{pmatrix}1 & 2\\\\ 3 & 4\\end{pmatrix}$?',
        options: [
          '$\\begin{pmatrix}1 & 3\\\\ 2 & 4\\end{pmatrix}$',
          '$\\begin{pmatrix}4 & 3\\\\ 2 & 1\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 2\\\\ 3 & 4\\end{pmatrix}$',
          '$\\begin{pmatrix}2 & 1\\\\ 4 & 3\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}1 & 3\\\\ 2 & 4\\end{pmatrix}$',
        hints: [
          'Transponieren: Zeilen und Spalten tauschen.',
          'Zeile 1 $(1,2)$ wird Spalte 1; Zeile 2 $(3,4)$ wird Spalte 2.',
          '$\\begin{pmatrix}1 & 3\\\\ 2 & 4\\end{pmatrix}$.',
        ],
        explanation: '$(A^T)_{ij} = A_{ji}$: 1. Zeile $(1,2)$ wird 1. Spalte, 2. Zeile $(3,4)$ wird 2. Spalte.',
      },
      {
        id: 'p1.inv.ex3',
        difficulty: 2,
        conceptTags: ['inverse'],
        type: 'mc',
        prompt: 'Inverse von $\\text{diag}(2, 4)$?',
        options: [
          '$\\text{diag}(0{,}5,\\; 0{,}25)$',
          '$\\text{diag}(2,\\; 4)$',
          '$\\text{diag}(4,\\; 2)$',
          '$\\text{diag}(-2,\\; -4)$',
        ],
        answer: '$\\text{diag}(0{,}5,\\; 0{,}25)$',
        hints: [
          'Inverse einer Diagonalmatrix: Kehrwert jedes Eintrags.',
          '$1/2 = 0{,}5$ und $1/4 = 0{,}25$.',
          '$\\text{diag}(0{,}5, 0{,}25)$.',
        ],
        explanation: 'Diagonalmatrizen: Inverse = Kehrwert auf der Diagonale: $\\text{diag}(1/2, 1/4)$.',
      },
      {
        id: 'p1.inv.ex4',
        difficulty: 3,
        conceptTags: ['inverse', 'determinant'],
        type: 'mc',
        prompt: 'Wenn $\\det A = 0$, ist $A$ invertierbar?',
        options: ['Nein', 'Ja', 'Nur für symmetrische Matrizen'],
        answer: 'Nein',
        hints: [
          '$\\det A = 0$ bedeutet: die Matrix kollabiert mindestens eine Dimension.',
          'Man kann keine Dimension "un-kollabieren" — Inverse existiert nicht.',
          '$A^{-1}$ existiert ⇔ $\\det A \\neq 0$.',
        ],
        explanation: '$\\det A = 0$: Matrix ist singulär, nicht invertierbar. Informationen gehen verloren.',
      },
      {
        id: 'p1.inv.ex5',
        difficulty: 3,
        conceptTags: ['transpose', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Bei Backprop durch $y = Wx$ ($W \\in \\mathbb{R}^{m \\times n}$): wenn der Gradient bzgl. $y$ gleich $g \\in \\mathbb{R}^m$ ist, was ist der Gradient bzgl. $x$?',
        options: ['$W^T g$', '$Wg$', '$g^T W$', '$W^{-1} g$'],
        answer: '$W^T g$',
        hints: [
          'Kettenregel für lineare Abbildungen: $\\frac{\\partial}{\\partial x}(Wx) = W$.',
          'Gradient bzgl. $x$: Transponierte der Jacobi-Matrix angewendet auf $g$.',
          '$\\frac{\\partial L}{\\partial x} = W^T \\frac{\\partial L}{\\partial y} = W^T g$.',
        ],
        explanation:
          'Backprop durch $y = Wx$: Gradient $\\frac{\\partial L}{\\partial x} = W^T g$. Die Transponierte überträgt den Gradienten rückwärts.',
        misconceptions: {
          '$W^{-1} g$': '$W^{-1}$ existiert meist nicht ($W$ ist typischerweise nicht quadratisch). Backprop nutzt $W^T$, nicht $W^{-1}$.',
        },
      },
      {
        id: 'p1.inv.ex6',
        difficulty: 4,
        conceptTags: ['orthogonal', 'ml'],
        type: 'mc',
        prompt: '"Eine Rotationsmatrix erfüllt $R^T = R^{-1}$." — Wahr oder falsch?',
        options: ['Wahr — Rotationen sind orthogonale Matrizen', 'Falsch'],
        answer: 'Wahr — Rotationen sind orthogonale Matrizen',
        hints: [
          'Eine Rotation erhält Längen und Winkel → Spalten sind orthonormal.',
          'Orthogonale Matrix per Definition: $Q^T Q = I$, also $Q^T = Q^{-1}$.',
          'Rotationsmatrizen sind orthogonal.',
        ],
        explanation:
          'Rotationsmatrizen sind orthogonal: $R^T R = I$ → $R^T = R^{-1}$. Das macht geometrisch Sinn: die Umkehrung einer Rotation ist eine Rotation in entgegengesetzter Richtung.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Backpropagation via Transponierte\n\nIn einem Multi-Layer-Netz $y = W_2(W_1 x)$: der Gradient fließt rückwärts als $W_1^T (W_2^T g)$ — Transponierte in umgekehrter Reihenfolge. Das ist direkte Anwendung von $(AB)^T = B^T A^T$.',
      },
      {
        kind: 'text',
        content:
          '**Orthogonale Initialisierung**: Wenn Gewichts-Matrizen orthogonal initialisiert werden ($W^T W \\approx I$), bleiben L2-Normen der Aktivierungen beim Forward-Pass erhalten — kein Vanishing/Exploding Gradient in der Tiefe. Das ist der Grund für Kaiming-He-Initialisierung und verwandte Methoden.',
      },
      {
        kind: 'callout',
        content:
          '$(AB)^{-1} = B^{-1}A^{-1}$ und $(AB)^T = B^T A^T$ — beide Regeln drehen die Reihenfolge um. Das ist kein Zufall: sie spiegeln wider, wie sich Komposition von Abbildungen umkehrt.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.inv.card1',
      front: 'Definition Inverse?',
      back: '$A^{-1}$ mit $A A^{-1} = A^{-1} A = I$.',
      conceptTags: ['inverse'],
    },
    {
      id: 'p1.inv.card2',
      front: 'Wann ist $A$ invertierbar?',
      back: 'Wenn $\\det A \\neq 0$.',
      conceptTags: ['inverse'],
    },
    {
      id: 'p1.inv.card3',
      front: 'Regel $(AB)^T$?',
      back: '$B^T A^T$ — Reihenfolge umkehren.',
      conceptTags: ['transpose'],
    },
  ],

  learningOutcome:
    'Du kannst erklären, wann eine Matrix invertierbar ist, die Inverse für $2 \\times 2$-Matrizen berechnen, Rechenregeln für Transponierte und Inverse anwenden und erläutern, warum orthogonale Matrizen für numerische Stabilität in ML wichtig sind.',

  description:
    'Inverse, Transponierte und orthogonale Matrizen sind die "Gegenbewegungen" der Linearen Algebra. Die Inverse macht eine Abbildung rückgängig — aber nur wenn keine Information verloren geht. Die Transponierte trägt Gradienten rückwärts durch das Netz. Orthogonale Matrizen erhalten Normen — das Fundament numerisch stabiler Initialisierung.',

  conceptSteps: [
    {
      title: 'Was bedeutet Invertieren?',
      preprompt: 'Eine Abbildung kann man umkehren, wenn sie keine Information verliert. Wann ist das nicht möglich?',
      body: 'Die **inverse Matrix** $A^{-1}$ erfüllt:\n\n$$A A^{-1} = A^{-1} A = I$$\n\nSie macht die Abbildung $A$ rückgängig. Existiert nur für **quadratische** Matrizen und nur dann, wenn $A$ "bijektiv" ist — keine zwei verschiedenen Inputs landen auf demselben Output.\n\n**Geometrisch**: Eine Matrix kollabiert Volumen auf 0 (wenn $\\det A = 0$) — dann ist die Abbildung nicht umkehrbar.',
    },
    {
      title: 'Existenzbedingung: $\\det A \\neq 0$',
      body: 'Eine quadratische Matrix $A \\in \\mathbb{R}^{n \\times n}$ ist **invertierbar** genau dann, wenn:\n\n$$\\det A \\neq 0 \\quad \\Leftrightarrow \\quad \\text{rang}(A) = n \\quad \\Leftrightarrow \\quad A \\text{ hat keinen Nullraum (außer } \\vec{0}\\text{)}$$\n\nÄquivalente Bedingungen — alle dasselbe Phänomen:\n- Keine linear abhängigen Spalten\n- Voller Rang\n- Determinante $\\neq 0$\n- Nur triviale Lösung von $A\\mathbf{x} = \\vec{0}$',
      selfCheck: 'Warum ist eine singuläre Matrix ($\\det A = 0$) nicht invertierbar? Welche Information geht verloren?',
    },
    {
      title: 'Berechnung der Inversen für $2 \\times 2$',
      body: 'Für $A = \\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix}$ mit $\\det A = ad - bc \\neq 0$:\n\n$$A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}$$\n\n**Rechenregeln**:\n- $(AB)^{-1} = B^{-1} A^{-1}$ (Reihenfolge umkehren!)\n- $(A^{-1})^{-1} = A$\n- $(A^T)^{-1} = (A^{-1})^T$',
      miniExample: '$A = \\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$, $\\det A = 2-1 = 1$: $A^{-1} = \\begin{pmatrix}1&-1\\\\-1&2\\end{pmatrix}$. Probe: $AA^{-1} = I$ ✓.',
    },
    {
      title: 'Transponierte: Zeilen werden Spalten',
      body: 'Die **Transponierte** $A^T$ tauscht Zeilen und Spalten:\n\n$$(A^T)_{ij} = A_{ji} \\qquad A \\in \\mathbb{R}^{m \\times n} \\Rightarrow A^T \\in \\mathbb{R}^{n \\times m}$$\n\n**Rechenregeln** (merke: Reihenfolge umkehren!):\n- $(AB)^T = B^T A^T$\n- $(A^T)^T = A$\n- $(A + B)^T = A^T + B^T$\n\n**Symmetrische Matrix**: $A = A^T$ — Kovarianzmatrizen, Gram-Matrizen und Hessische sind immer symmetrisch.',
    },
    {
      title: 'Orthogonale Matrizen: $Q^T = Q^{-1}$',
      body: 'Eine Matrix $Q \\in \\mathbb{R}^{n \\times n}$ ist **orthogonal**, wenn:\n\n$$Q^T Q = Q Q^T = I \\quad \\Leftrightarrow \\quad Q^T = Q^{-1}$$\n\nSpalten (und Zeilen) von $Q$ sind **orthonormal**: paarweise senkrecht, Länge 1.\n\n**Schlüsseleigenschaft**: Orthogonale Matrizen erhalten L2-Normen:\n\n$$\\|Q\\mathbf{x}\\|_2 = \\|\\mathbf{x}\\|_2$$\n\nBeispiele: Rotationsmatrizen, Spiegelungsmatrizen, Householder-Matrizen.',
      selfCheck: 'Zeige: $\\|Q\\mathbf{x}\\|_2^2 = \\mathbf{x}^T Q^T Q \\mathbf{x} = \\mathbf{x}^T I \\mathbf{x} = \\|\\mathbf{x}\\|_2^2$.',
    },
    {
      title: 'ML: Normalengleichung und orthogonale Initialisierung',
      body: '**Lineare Regression** — Normalengleichung:\n\n$$X^T X \\hat{w} = X^T y \\qquad \\Rightarrow \\qquad \\hat{w} = (X^T X)^{-1} X^T y$$\n\nDas ist die **analytische Lösung** für $\\min_w \\|Xw - y\\|_2^2$.\n\n**Orthogonale Initialisierung** (Saxe et al., 2013): Wenn $W$ orthogonal initialisiert wird, bleibt die L2-Norm der Aktivierungen beim Forward-Pass erhalten — kein Vanishing/Exploding Gradient bei der Initialisierung.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Inverse, Transponierte und lineare Regression',
      lang: 'python',
      code: `import torch
import torch.linalg as LA

# --- 1. Inverse berechnen ---
A = torch.tensor([[2.0, 1.0],
                  [1.0, 1.0]])
A_inv = LA.inv(A)           # A^{-1}
print(A @ A_inv)             # ≈ [[1,0],[0,1]] = I

# --- 2. Transponierte ---
W = torch.randn(3, 5)        # 3×5-Matrix
W_T = W.T                    # 5×3-Matrix; W.T ist .transpose(0,1)
print((W @ W.T).shape)       # (3,3) — symmetrische Gram-Matrix

# --- 3. Normalengleichung: lineare Regression ---
# Minimiert ||Xw - y||^2 analytisch
torch.manual_seed(42)
n_samples, n_features = 100, 5
X = torch.randn(n_samples, n_features)
y = torch.randn(n_samples)

# Normalengleichung: w = (X^T X)^{-1} X^T y
XTX = X.T @ X                           # (5×5) symmetrisch, PSD
w_normal = LA.inv(XTX) @ X.T @ y       # analytische Lösung

# Numerisch stabiler: torch.linalg.lstsq
result = LA.lstsq(X, y)
w_lstsq = result.solution               # dasselbe Ergebnis, stabiler

# --- 4. Orthogonale Initialisierung ---
# Orthogonale Matrix: Q^T Q = I
Q, R = LA.qr(torch.randn(4, 4))        # QR-Zerlegung → Q ist orthogonal
print(torch.allclose(Q.T @ Q, torch.eye(4), atol=1e-6))  # True
x = torch.randn(4)
print(torch.allclose(LA.norm(Q @ x), LA.norm(x), atol=1e-5))  # True`,
      annotation: '`LA.inv(A)` berechnet $A^{-1}$ numerisch (LU-Zerlegung). Für lineare Regression nutze besser `LA.lstsq(X, y)` statt explizit $(X^T X)^{-1} X^T y$ — stabiler bei fast-singulären $X^T X$. `LA.qr` liefert eine orthogonale Matrix $Q$ (QR-Zerlegung). `torch.nn.init.orthogonal_` initialisiert Gewichtsmatrizen orthogonal — das ist direkte Anwendung des $\\|Q\\mathbf{x}\\|_2 = \\|\\mathbf{x}\\|_2$-Prinzips.',
    },
  ],

  derivations: [
    {
      claim: '$(AB)^{-1} = B^{-1} A^{-1}$ — Reihenfolge umkehren',
      reasoning:
        'Wir prüfen: $(B^{-1} A^{-1})(AB) = B^{-1}(A^{-1} A)B = B^{-1} I B = B^{-1} B = I$. Ebenso $(AB)(B^{-1} A^{-1}) = A(B B^{-1})A^{-1} = A I A^{-1} = I$. Da links und rechts $I$ ergibt, ist $B^{-1}A^{-1}$ die Inverse von $AB$. Intuition: Wenn man Abbildungen $A$ dann $B$ ausführt, muss man zum Umkehren erst $B$ rückgängig machen, dann $A$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$(AB)^{-1} = A^{-1} B^{-1}$ (gleiche Reihenfolge)',
      correct: '$(AB)^{-1} = B^{-1} A^{-1}$ (Reihenfolge umkehren)',
      explanation: 'Analog zu Schuhe-Socken: Zum Anziehen zuerst Socken, dann Schuhe. Zum Ausziehen: erst Schuhe, dann Socken. Die Reihenfolge der Umkehrung ist immer entgegengesetzt.',
    },
    {
      wrong: 'Backpropagation durch $y = Wx$ nutzt $W^{-1}$',
      correct: 'Backpropagation durch $y = Wx$ nutzt $W^T$, nicht $W^{-1}$',
      explanation: '$W$ ist typischerweise nicht quadratisch (z.B. $256 \\times 768$) und damit nicht invertierbar. Backprop nutzt die Transponierte: $\\partial L/\\partial x = W^T (\\partial L/\\partial y)$.',
    },
    {
      wrong: 'Jede quadratische Matrix ist invertierbar',
      correct: 'Nur quadratische Matrizen mit $\\det A \\neq 0$ sind invertierbar',
      explanation: 'Zum Beispiel: $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ ist quadratisch, aber $\\det = 0$ (Spalten parallel) — nicht invertierbar. Multikollinearität in Features führt zu nicht-invertierbarem $X^T X$.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Inverse matrices, column space and null space" (Essence of Linear Algebra, Ep. 7)',
      type: 'video',
      note: 'Geometrische Intuition: wann kollabiert eine Matrix den Raum — warum dann keine Inverse?',
    },
    {
      title: 'MML Book, Kapitel 2.3: "Inverse and Transpose"',
      type: 'book',
      note: 'Enthält auch Moore-Penrose-Pseudoinverse für nicht-quadratische Matrizen',
    },
    {
      title: 'Saxe et al. (2013): "Exact solutions to the nonlinear dynamics of learning in deep linear networks"',
      type: 'article',
      note: 'Originalpaper zur orthogonalen Initialisierung; erklärt theoretisch warum orthogonale Matrizen Gradienten erhalten',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.determinante',
      relation: 'requires',
      hint: 'Die Determinante entscheidet über die Existenz der Inversen: $A^{-1}$ existiert $\\Leftrightarrow$ $\\det A \\neq 0$.',
    },
    {
      lessonId: 'p1.lgs-gauss',
      relation: 'see-also',
      hint: 'Lineare Gleichungssysteme und Inverse sind eng verknüpft: $Ax = b \\Rightarrow x = A^{-1}b$ wenn invertierbar.',
    },
    {
      lessonId: 'p1.spektraltheorem',
      relation: 'see-also',
      hint: 'Orthogonale Matrizen spielen im Spektraltheorem die Hauptrolle: $A = Q\\Lambda Q^T$ mit orthogonaler $Q$.',
    },
    {
      lessonId: 'p1.multivariate-kettenregel-backprop',
      relation: 'see-also',
      hint: 'Backpropagation durch lineare Layer nutzt die Transponierte: $\\partial L/\\partial x = W^T g$.',
    },
  ],

  reflection: 'Die Inverse macht Abbildungen rückgängig — wenn möglich. Die Transponierte trägt Gradienten rückwärts. Orthogonale Matrizen erhalten alles. Drei Konzepte, die in jedem Aspekt des Deep Learnings auftauchen: Backpropagation, numerische Stabilität, lineare Regression. **Welches der drei findest du am elegantesten?**',
}
