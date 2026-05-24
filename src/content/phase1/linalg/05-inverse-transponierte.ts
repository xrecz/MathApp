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
}
