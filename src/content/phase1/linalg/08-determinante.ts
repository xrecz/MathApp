import type { Lesson } from '../../../types'

export const determinante: Lesson = {
  id: 'p1.determinante',
  title: 'Determinante',
  conceptTags: ['determinant', 'area', 'volume', 'singular', 'cofactor'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Determinante — Maß für Volumenverzerrung\n\nDie Determinante $\\det A$ (oder $|A|$) misst, um welchen **Faktor** eine lineare Abbildung Flächen (2D) bzw. Volumina (3D) skaliert. Vorzeichen zeigt Orientierungsumkehr.\n\n$\\det A = 0$ ↔ Matrix ist **singulär** (nicht invertierbar) ↔ Fläche/Volumen kollabiert auf 0.',
      },
      {
        kind: 'math',
        content:
          '$$\\det\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix} = ad - bc \\qquad \\det\\begin{pmatrix}a & b & c\\\\ d & e & f\\\\ g & h & i\\end{pmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: In **Normalizing Flows** (generative Modelle) transformiert man Wahrscheinlichkeitsdichten. Der Jacobi-Determinante-Term $|\\det J_f|$ korrigiert die Volumenverzerrung — ohne ihn wäre die transformierte Dichte nicht normiert.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Wichtige Eigenschaften\n\n$\\det(AB) = \\det(A) \\cdot \\det(B)$\n\n$\\det(A^T) = \\det(A)$\n\n$\\det(A^{-1}) = 1 / \\det(A)$ (falls $A$ invertierbar)\n\n$\\det(cA) = c^n \\det(A)$ für $A \\in \\mathbb{R}^{n \\times n}$\n\n### Geometrische Bedeutung\n\nFür $A = \\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}$: $|\\det A|$ ist die Fläche des Parallelogramms, das von den Spaltenvektoren $(a,c)^T$ und $(b,d)^T$ aufgespannt wird.',
      },
      {
        kind: 'worked-example',
        content:
          '**Determinante 2×2**:\n\n$\\det\\begin{pmatrix}3 & 1\\\\ 2 & 4\\end{pmatrix} = 3 \\cdot 4 - 1 \\cdot 2 = 12 - 2 = 10$\n\nDie Spalten $(3,2)^T$ und $(1,4)^T$ spannen ein Parallelogramm der Fläche $10$ auf.\n\n**Singuläre Matrix**: $\\det\\begin{pmatrix}2 & 4\\\\ 1 & 2\\end{pmatrix} = 2 \\cdot 2 - 4 \\cdot 1 = 0$ — Spalten parallel!',
      },
    ],
    practice: [
      {
        id: 'p1.det.ex1',
        difficulty: 1,
        conceptTags: ['determinant'],
        type: 'numeric',
        prompt: '$\\det\\begin{pmatrix}5 & 2\\\\ 1 & 3\\end{pmatrix}$?',
        answer: 13,
        hints: [
          '$\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc$.',
          '$5 \\cdot 3 - 2 \\cdot 1 = 15 - 2$.',
          '$= 13$.',
        ],
        explanation: '$\\det = 5 \\cdot 3 - 2 \\cdot 1 = 15 - 2 = 13$.',
      },
      {
        id: 'p1.det.ex2',
        difficulty: 1,
        conceptTags: ['singular'],
        type: 'mc',
        prompt: 'Welche Matrix ist **singulär** ($\\det = 0$)?',
        options: [
          '$\\begin{pmatrix}2 & 4\\\\ 1 & 2\\end{pmatrix}$',
          '$\\begin{pmatrix}2 & 3\\\\ 1 & 2\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}$',
          '$\\begin{pmatrix}3 & 1\\\\ 0 & 2\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}2 & 4\\\\ 1 & 2\\end{pmatrix}$',
        hints: [
          '$\\det = ad - bc$. Suche $ad - bc = 0$.',
          '$2 \\cdot 2 - 4 \\cdot 1 = 4 - 4 = 0$.',
          'Erste Matrix ist singulär.',
        ],
        explanation: '$\\det\\begin{pmatrix}2&4\\\\1&2\\end{pmatrix} = 4 - 4 = 0$. Spalten $(2,1)^T$ und $(4,2)^T = 2 \\cdot (2,1)^T$ sind parallel.',
      },
      {
        id: 'p1.det.ex3',
        difficulty: 2,
        conceptTags: ['determinant'],
        type: 'numeric',
        prompt: '$\\det\\begin{pmatrix}2 & 0 & 0\\\\ 0 & 3 & 0\\\\ 0 & 0 & 5\\end{pmatrix}$?',
        answer: 30,
        hints: [
          'Für Diagonalmatrizen: $\\det = $ Produkt der Diagonaleinträge.',
          '$2 \\cdot 3 \\cdot 5 = ?$',
          '$= 30$.',
        ],
        explanation: 'Diagonalmatrix: $\\det = 2 \\cdot 3 \\cdot 5 = 30$.',
      },
      {
        id: 'p1.det.ex4',
        difficulty: 3,
        conceptTags: ['determinant'],
        type: 'mc',
        prompt: '$\\det(AB) = ?$ für $\\det A = 3$ und $\\det B = -2$.',
        options: ['$-6$', '$6$', '$1$', '$-1$'],
        answer: '$-6$',
        hints: [
          'Multiplikativität: $\\det(AB) = \\det A \\cdot \\det B$.',
          '$3 \\cdot (-2) = ?$',
          '$= -6$.',
        ],
        explanation: '$\\det(AB) = \\det A \\cdot \\det B = 3 \\cdot (-2) = -6$.',
      },
      {
        id: 'p1.det.ex5',
        difficulty: 3,
        conceptTags: ['area', 'determinant'],
        type: 'numeric',
        prompt:
          'Welche Fläche hat das Parallelogramm, das von $(1, 2)^T$ und $(3, 4)^T$ aufgespannt wird? (Betrag der Determinante)',
        answer: 2,
        hints: [
          'Bilde die Matrix mit diesen Vektoren als Spalten.',
          '$\\det\\begin{pmatrix}1 & 3\\\\ 2 & 4\\end{pmatrix} = 1 \\cdot 4 - 3 \\cdot 2 = 4 - 6 = -2$.',
          'Fläche = $|{-2}| = 2$.',
        ],
        explanation: '$|\\det\\begin{pmatrix}1&3\\\\2&4\\end{pmatrix}| = |4 - 6| = |-2| = 2$.',
      },
      {
        id: 'p1.det.ex6',
        difficulty: 4,
        conceptTags: ['determinant', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: In Normalizing Flows gilt die Change-of-Variables-Formel: $p_X(x) = p_Z(f(x)) \\cdot |\\det J_f(x)|$. Was passiert wenn $|\\det J_f| = 0$ irgendwo?',
        options: [
          'Die Transformation ist dort nicht invertierbar — der Flow kollabiert Volumen auf 0',
          'Die Wahrscheinlichkeitsdichte wird dort unendlich groß',
          'Die Dichte wird negativ',
          'Es gibt keinen Effekt auf $p_X$',
        ],
        answer: 'Die Transformation ist dort nicht invertierbar — der Flow kollabiert Volumen auf 0',
        hints: [
          '$\\det J_f = 0$ bedeutet: die Jacobi-Matrix ist singulär.',
          'Singuläre Jacobi-Matrix → Abbildung kollabiert lokal auf niedrigere Dimension.',
          'Nicht invertierbar → kein umkehrbarer Flow möglich.',
        ],
        explanation:
          '$|\\det J_f| = 0$: das Volumen wird auf 0 komprimiert — die Abbildung ist nicht lokal invertierbar. Normalizing Flows **müssen** Transformationen mit $\\det J_f \\neq 0$ überall verwenden.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Determinante und Eigenwerte\n\n$\\det A = \\prod_i \\lambda_i$ (Produkt aller Eigenwerte). Das erklärt:\n\n- $\\det A = 0$ ↔ mindestens ein Eigenwert ist 0 ↔ $A$ ist singulär\n- Für Rotationsmatrizen: $|\\det R| = 1$ (Rotation ändert kein Volumen)\n- Für Spiegelungsmatrizen: $\\det = -1$ (Orientierungsumkehr)',
      },
      {
        kind: 'callout',
        content:
          'Die Berechnung von $\\det A$ für große Matrizen über LU-Zerlegung kostet $O(n^3)$. Für $n = 10000$ (ein kleines Sprachmodell hat Matrizen mit $d = 4096$) ist das unpraktikabel. In ML berechnet man daher Determinanten so gut wie nie direkt.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.det.card1',
      front: '2×2-Determinante?',
      back: '$\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc$.',
      conceptTags: ['determinant'],
    },
    {
      id: 'p1.det.card2',
      front: 'Geometrische Bedeutung $\\det A$?',
      back: 'Skalierungsfaktor für Flächen/Volumina. $|\\det A|$ = Fläche des Spaltenvektoren-Parallelogramms.',
      conceptTags: ['area'],
    },
    {
      id: 'p1.det.card3',
      front: 'Multiplikativität der Determinante?',
      back: '$\\det(AB) = \\det A \\cdot \\det B$.',
      conceptTags: ['determinant'],
    },
  ],
}
