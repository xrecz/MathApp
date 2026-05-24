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

  learningOutcome:
    'Du kannst die Determinante als Volumen-/Flächenskalierungsfaktor interpretieren, für $2 \\times 2$- und $3 \\times 3$-Matrizen berechnen, ihre Eigenschaften anwenden und erklären, warum $\\det = 0$ Singularität bedeutet und wie die Jacobi-Determinante bei Normalizing Flows auftaucht.',

  description:
    'Die Determinante misst, wie stark eine lineare Abbildung Flächen und Volumina streckt oder staucht. $\\det A = 0$ bedeutet: die Abbildung kollabiert den Raum — keine Inverse möglich. In der Gauß\'schen Normalverteilung, bei Normalizing Flows und beim charakteristischen Polynom der Eigenwerte ist die Determinante zentral.',

  conceptSteps: [
    {
      title: 'Determinante als Fläche: der $2 \\times 2$-Fall',
      preprompt: 'Zwei Vektoren spannen ein Parallelogramm auf. Wie groß ist seine Fläche?',
      body: 'Für $A = \\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix}$: die Spaltenvektoren $(a,c)^T$ und $(b,d)^T$ spannen ein Parallelogramm auf.\n\n$$\\det A = ad - bc$$\n\n$|\\det A|$ = Flächeninhalt des Parallelogramms.\n\n$\\det A > 0$: Orientierung erhalten; $\\det A < 0$: Orientierung umgekehrt (Spiegelung).',
      visual: `<svg viewBox="-10 -10 200 160" width="280" height="200" aria-label="Parallelogramm mit Fläche det(A)">
        <rect x="-10" y="-10" width="200" height="160" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="130" x2="180" y2="130" stroke="rgb(55 65 81)" stroke-width="0.5"/>
        <line x1="10" y1="10" x2="10" y2="140" stroke="rgb(55 65 81)" stroke-width="0.5"/>
        <defs>
          <marker id="d1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="rgb(248 113 113)"/></marker>
          <marker id="d2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="rgb(74 222 128)"/></marker>
        </defs>
        <polygon points="10,130 90,130 120,50 40,50" fill="rgb(99 102 241)" fill-opacity="0.15" stroke="rgb(99 102 241)" stroke-width="1"/>
        <line x1="10" y1="130" x2="90" y2="130" stroke="rgb(248 113 113)" stroke-width="2" marker-end="url(#d1)"/>
        <line x1="10" y1="130" x2="40" y2="50" stroke="rgb(74 222 128)" stroke-width="2" marker-end="url(#d2)"/>
        <text x="45" y="100" fill="rgb(99 102 241)" font-size="10">Fläche = |det A|</text>
        <text x="95" y="145" fill="rgb(248 113 113)" font-size="9">a</text>
        <text x="22" y="85" fill="rgb(74 222 128)" font-size="9">b</text>
      </svg>`,
      miniExample: '$A = \\begin{pmatrix}3 & 1 \\\\ 2 & 4\\end{pmatrix}$: $\\det A = 12 - 2 = 10$. Fläche des Parallelogramms = 10.',
    },
    {
      title: 'Berechnung für $3 \\times 3$: Sarrus-Regel',
      body: 'Für $3 \\times 3$-Matrizen gilt die **Sarrus-Regel** (Entwicklung nach erster Zeile):\n\n$$\\det\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)$$\n\n**Merkregel**: Plus-Plus-Plus (Hauptdiagonalen), Minus-Minus-Minus (Nebendiagonalen).\n\nDie geometrische Bedeutung bleibt: $|\\det A|$ = Volumen des von den Spaltenvektoren aufgespannten Spats.',
    },
    {
      title: 'Eigenschaften der Determinante',
      body: 'Wichtige Rechenregeln:\n\n$$\\det(AB) = \\det(A) \\cdot \\det(B) \\qquad \\det(A^T) = \\det(A)$$\n\n$$\\det(A^{-1}) = \\frac{1}{\\det A} \\qquad \\det(cA) = c^n \\det(A) \\text{ für } A \\in \\mathbb{R}^{n \\times n}$$\n\n**Zeilen-Operationen**:\n- Zeile skalieren mit $c$: Determinante wird mit $c$ multipliziert\n- Zeilen tauschen: Vorzeichen ändert sich\n- Vielfaches einer Zeile addieren: Determinante unverändert',
      selfCheck: 'Warum gilt $\\det(A) = \\det(A^T)$? Was sagt das geometrisch über Zeilen- vs. Spaltenvektoren?',
    },
    {
      title: '$\\det = 0$: Singularität und Kollaps',
      body: '**Fundamentaler Zusammenhang**:\n\n$$\\det A = 0 \\quad \\Leftrightarrow \\quad A \\text{ singulär} \\quad \\Leftrightarrow \\quad A^{-1} \\text{ existiert nicht}$$\n\n$$\\Leftrightarrow \\quad \\text{rang}(A) < n \\quad \\Leftrightarrow \\quad A\\mathbf{x} = \\vec{0} \\text{ hat nichttriviale Lösung}$$\n\nGeometrisch: $\\det A = 0$ ↔ die Abbildung kollabiert Fläche/Volumen auf 0 — der Raum wird auf eine niedrigere Dimension abgebildet.',
    },
    {
      title: 'Determinante und Eigenwerte',
      body: '**Charakteristisches Polynom**: Die Eigenwerte von $A$ sind genau die Nullstellen von:\n\n$$p(\\lambda) = \\det(A - \\lambda I) = 0$$\n\n**Verbindung**: $\\det A = \\prod_{i=1}^n \\lambda_i$ (Produkt aller Eigenwerte).\n\nKonsequenz: $\\det A = 0 \\Leftrightarrow$ mindestens ein Eigenwert ist 0.',
    },
    {
      title: 'ML: Kovarianzmatrix und Normalizing Flows',
      body: '**Multivariate Normalverteilung**:\n\n$$p(\\mathbf{x}) = \\frac{1}{(2\\pi)^{n/2} |\\det \\Sigma|^{1/2}} \\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\mu)^T \\Sigma^{-1}(\\mathbf{x}-\\mu)\\right)$$\n\n$|\\det \\Sigma|$ normiert die Dichte — ohne es wäre $\\int p(\\mathbf{x}) d\\mathbf{x} \\neq 1$.\n\n**Normalizing Flows**: Transformiere $z \\sim p_Z$ zu $x = f(z)$:\n\n$$p_X(x) = p_Z(f^{-1}(x)) \\cdot |\\det J_{f^{-1}}(x)|$$\n\nDie **Jacobi-Determinante** $|\\det J|$ korrigiert die Volumenverzerrung.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch/NumPy: Determinante und Kovarianzmatrix',
      lang: 'python',
      code: `import torch
import numpy as np

# --- 1. Determinante berechnen ---
A = torch.tensor([[3.0, 1.0],
                  [2.0, 4.0]])
det_A = torch.linalg.det(A)   # = 3*4 - 1*2 = 10

# Geometrische Probe: Parallelogramm-Fläche
col1 = A[:, 0]   # (3, 2)
col2 = A[:, 1]   # (1, 4)
# Fläche = |a*d - b*c| = |det(A)|
print(f"|det| = {det_A.abs():.2f}")  # 10.0

# --- 2. Multiplikativität: det(AB) = det(A)*det(B) ---
B = torch.tensor([[2.0, 0.0], [0.0, 3.0]])
AB = A @ B
print(torch.allclose(
    torch.linalg.det(AB),
    torch.linalg.det(A) * torch.linalg.det(B)
))  # True

# --- 3. Kovarianzmatrix und ihre Determinante ---
np.random.seed(42)
X = np.random.randn(100, 2) @ np.array([[2, 1], [0, 1]])  # korrelierte Daten
Sigma = np.cov(X.T)               # 2×2 Kovarianzmatrix
det_Sigma = np.linalg.det(Sigma)  # > 0 (PSD → nicht singulär)

# Normierungskonstante der multivariaten Normalverteilung
n = 2
norm_const = (2 * np.pi)**(-n/2) * det_Sigma**(-0.5)
print(f"Kovarianz det: {det_Sigma:.4f}, Normierungskonstante: {norm_const:.4f}")

# --- 4. Singulärmatrix ---
A_sing = torch.tensor([[2.0, 4.0], [1.0, 2.0]])  # Spalten parallel
print(f"Singular? det={torch.linalg.det(A_sing):.6f}")  # ≈ 0`,
      annotation: '`torch.linalg.det(A)` berechnet die Determinante numerisch (LU-Zerlegung). Die Formel $|\\det A|$ = Parallelogramm-Fläche ist direkt nachprüfbar. `np.cov(X.T)` berechnet die empirische Kovarianzmatrix; ihre Determinante erscheint in der multivariaten Normalverteilung $\\mathcal{N}(\\mu, \\Sigma)$. Für numerische Stabilität arbeitet man oft mit $\\log |\\det A|$ statt $|\\det A|$ direkt — `torch.linalg.slogdet` gibt Vorzeichen und Log-Determinante zurück.',
    },
  ],

  derivations: [
    {
      claim: '$\\det(AB) = \\det(A) \\cdot \\det(B)$',
      reasoning:
        'Geometrisch: $AB$ komposiert zunächst $B$ (skaliert Volumen um $|\\det B|$) und dann $A$ (skaliert nochmals um $|\\det A|$). Insgesamt wird das Volumen um $|\\det A| \\cdot |\\det B|$ skaliert — also $|\\det(AB)| = |\\det A| \\cdot |\\det B|$. Das Vorzeichen ergibt sich analog aus der Orientierungserhaltung/-umkehrung.',
    },
    {
      claim: '$\\det A = \\prod_i \\lambda_i$ (Produkt der Eigenwerte)',
      reasoning:
        'Für diagonalisierbares $A = P\\Lambda P^{-1}$: $\\det A = \\det(P\\Lambda P^{-1}) = \\det(P) \\det(\\Lambda) \\det(P^{-1}) = \\det(P) \\det(\\Lambda) / \\det(P) = \\det(\\Lambda) = \\prod_i \\lambda_i$. Der Trick: $\\det(P) \\cdot \\det(P^{-1}) = \\det(PP^{-1}) = \\det(I) = 1$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\det(A + B) = \\det A + \\det B$',
      correct: 'Die Determinante ist **nicht** additiv: $\\det(A + B) \\neq \\det A + \\det B$',
      explanation: 'Die Determinante ist nicht linear in der Matrix, sondern multilinear in den Zeilen/Spalten. $(A+B)$ ergibt eine völlig neue geometrische Form.',
    },
    {
      wrong: '$\\det(cA) = c \\cdot \\det A$ für eine $3 \\times 3$-Matrix',
      correct: '$\\det(cA) = c^3 \\det A$ für eine $3 \\times 3$-Matrix (allgemein $c^n$ für $n \\times n$)',
      explanation: 'Jede der $n$ Zeilen wird mit $c$ skaliert — das multipli­ziert die Determinante $n$-mal mit $c$. Bei $n=3$: $\\det(cA) = c^3 \\det A$.',
    },
    {
      wrong: 'Die Determinante misst die "Größe" einer Matrix wie eine Norm',
      correct: 'Die Determinante ist ein Volumen-Skalierungsfaktor, keine Norm',
      explanation: 'Normen sind immer nicht-negativ. Die Determinante kann negativ sein (Orientierungsumkehr). Zudem ist $\\det(A + B)$ nicht durch $\\det A + \\det B$ beschränkt.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "The determinant" (Essence of Linear Algebra, Ep. 6)',
      type: 'video',
      note: 'Die geometrische Volumen-Interpretation ist hier unvergesslich visualisiert',
    },
    {
      title: 'MML Book, Kapitel 4.1: "Determinant and Trace"',
      type: 'book',
      note: 'Enthält auch $n \\times n$-Determinante über Permutationen und Leibniz-Formel',
    },
    {
      title: 'Rezende & Mohamed (2015): "Variational Inference with Normalizing Flows"',
      type: 'article',
      note: 'Anwendung der Jacobi-Determinante für flexible Wahrscheinlichkeitsdichten',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'extends',
      hint: 'Das charakteristische Polynom $\\det(A - \\lambda I) = 0$ verbindet Determinante und Eigenwerte direkt.',
    },
    {
      lessonId: 'p1.inverse-transponierte',
      relation: 'requires',
      hint: 'Invertierbarkeit ↔ $\\det A \\neq 0$: die Determinante entscheidet über die Existenz der Inversen.',
    },
    {
      lessonId: 'p1.spektraltheorem',
      relation: 'see-also',
      hint: 'Für PSD-Matrizen gilt $\\det A = \\prod \\lambda_i \\geq 0$ — Kovarianzmatrizen haben nichtnegative Determinante.',
    },
    {
      lessonId: 'p1.jacobi-hesse',
      relation: 'see-also',
      hint: 'Die Jacobi-Determinante in Normalizing Flows ist die Determinante der Jacobi-Matrix der Transformation.',
    },
  ],

  reflection: 'Die Determinante ist der ultimative "Linearitäts-Detektor": sie verrät, ob eine Abbildung injektiv ist ($\\det \\neq 0$) oder Information vernichtet ($\\det = 0$). In der multivariaten Normalverteilung und in Normalizing Flows ist sie die entscheidende Korrektur für Volumenverzerrungen. **Was verrät $\\det \\Sigma$ über eine Kovarianzmatrix geometrisch?**',
}
