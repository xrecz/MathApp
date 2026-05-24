import type { Lesson } from '../../../types'

export const matrizenLineareAbbildungen: Lesson = {
  id: 'p1.matrizen-lineare-abbildungen',
  title: 'Matrizen als lineare Abbildungen',
  conceptTags: ['matrix', 'linear-map', 'transformation', 'basis'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Das zentrale Insight der Linearen Algebra\n\nEine $m \\times n$-Matrix $A$ **ist** eine lineare Abbildung $\\mathbb{R}^n \\to \\mathbb{R}^m$. Und umgekehrt: jede lineare Abbildung lässt sich als Matrix schreiben. Die **Spalten von $A$** sind die Bilder der Standard-Basisvektoren.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-10 -10 220 110" width="220" height="110" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="10" width="40" height="40" fill="none" stroke="#6b7280" stroke-width="1" stroke-dasharray="3"/>
          <line x1="0" y1="50" x2="40" y2="50" stroke="#ef4444" stroke-width="2"/>
          <line x1="0" y1="50" x2="0" y2="10" stroke="#10b981" stroke-width="2"/>
          <text x="14" y="65" fill="#9ca3af" font-size="9">Einheits-quadrat</text>
          <text x="52" y="35" fill="#9ca3af" font-size="14">→</text>
          <polygon points="70,90 130,90 110,10 50,10" fill="none" stroke="#6366f1" stroke-width="1.5"/>
          <line x1="70" y1="90" x2="130" y2="90" stroke="#ef4444" stroke-width="2"/>
          <line x1="70" y1="90" x2="50" y2="10" stroke="#10b981" stroke-width="2"/>
          <text x="150" y="30" fill="#ef4444" font-size="9">Spalte 1</text>
          <text x="150" y="50" fill="#10b981" font-size="9">Spalte 2</text>
        </svg>`,
        caption: 'Matrix transformiert Einheitsquadrat → Parallelogramm; Spalten = Bilder der Basisvektoren',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Ein Dense-Layer in einem neuronalen Netz berechnet $y = Wx + b$ — eine lineare Abbildung plus Bias. Bei einem Transformer: $W_Q$ projiziert den 768D-Embedding-Vektor auf einen 64D-Query-Vektor.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Lineare Abbildung\n\nEine Funktion $T$ ist linear, wenn gilt:\n\n$T(c_1 v + c_2 w) = c_1 T(v) + c_2 T(w)$\n\nDas bedeutet: Linearkombinationen bleiben erhalten.\n\n### Spalten = Basisbilder\n\nFür $A = \\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}$:\n\n$A \\cdot e_1 = A \\cdot \\begin{pmatrix}1\\\\ 0\\end{pmatrix} = \\begin{pmatrix}a\\\\ c\\end{pmatrix}$ (1. Spalte)\n\n$A \\cdot e_2 = A \\cdot \\begin{pmatrix}0\\\\ 1\\end{pmatrix} = \\begin{pmatrix}b\\\\ d\\end{pmatrix}$ (2. Spalte)',
      },
      {
        kind: 'worked-example',
        content:
          '**Rotation um $90°$** (gegen Uhrzeigersinn):\n\n$e_1 = (1,0) \\to (0,1)$ und $e_2 = (0,1) \\to (-1,0)$\n\nMatrix: $R_{90°} = \\begin{pmatrix}0 & -1\\\\ 1 & 0\\end{pmatrix}$\n\nProbe: $R \\cdot (1,0)^T = (0,1)^T$ ✓',
      },
    ],
    practice: [
      {
        id: 'p1.linmap.ex1',
        difficulty: 1,
        conceptTags: ['matrix'],
        type: 'mc',
        prompt:
          'Welche Matrix bildet $e_1 = (1,0)$ auf $(2,0)$ und $e_2 = (0,1)$ auf $(0,2)$ ab?',
        options: [
          '$\\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}$',
          '$\\begin{pmatrix}2 & 2\\\\ 0 & 0\\end{pmatrix}$',
          '$\\begin{pmatrix}0 & 2\\\\ 2 & 0\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$',
        hints: [
          'Die Spalten sind die Bilder der Basisvektoren.',
          '1. Spalte = Bild von $e_1 = (2,0)$. 2. Spalte = Bild von $e_2 = (0,2)$.',
          'Matrix: $\\begin{pmatrix}2 & 0\\\\ 0 & 2\\end{pmatrix}$ (Skalierung mit 2).',
        ],
        explanation: 'Spalten = Basisbilder: $(2,0)$ und $(0,2)$ → Diagonalmatrix $\\text{diag}(2,2)$.',
      },
      {
        id: 'p1.linmap.ex2',
        difficulty: 2,
        conceptTags: ['matrix', 'transformation'],
        type: 'mc',
        prompt:
          'Für $A = \\begin{pmatrix}2 & 0\\\\ 0 & 3\\end{pmatrix}$ und $v = (1, 1)^T$: was ist $Av$?',
        options: ['$(2, 3)$', '$(3, 2)$', '$(1, 1)$', '$(5, 5)$'],
        answer: '$(2, 3)$',
        hints: [
          'Matrix-Vektor-Multiplikation: jede Zeile mal Vektor.',
          '1. Komponente: $2 \\cdot 1 + 0 \\cdot 1 = 2$.',
          '2. Komponente: $0 \\cdot 1 + 3 \\cdot 1 = 3$.',
        ],
        explanation:
          '$\\begin{pmatrix}2 & 0\\\\ 0 & 3\\end{pmatrix}\\begin{pmatrix}1\\\\ 1\\end{pmatrix} = \\begin{pmatrix}2\\\\ 3\\end{pmatrix}$. Streckt x um 2, y um 3.',
      },
      {
        id: 'p1.linmap.ex3',
        difficulty: 2,
        conceptTags: ['rotation'],
        type: 'mc',
        prompt: 'Welche Matrix dreht Vektoren um $90°$ gegen den Uhrzeigersinn?',
        options: [
          '$\\begin{pmatrix}0 & -1\\\\ 1 & 0\\end{pmatrix}$',
          '$\\begin{pmatrix}0 & 1\\\\ -1 & 0\\end{pmatrix}$',
          '$\\begin{pmatrix}1 & 0\\\\ 0 & -1\\end{pmatrix}$',
          '$\\begin{pmatrix}-1 & 0\\\\ 0 & 1\\end{pmatrix}$',
        ],
        answer: '$\\begin{pmatrix}0 & -1\\\\ 1 & 0\\end{pmatrix}$',
        hints: [
          'Basisbilder: $e_1 = (1,0)$ rotiert zu $(0,1)$; $e_2 = (0,1)$ rotiert zu $(-1,0)$.',
          '1. Spalte = $(0,1)$, 2. Spalte = $(-1,0)$.',
          '$R = \\begin{pmatrix}0 & -1\\\\ 1 & 0\\end{pmatrix}$.',
        ],
        explanation: 'Rotation $90°$: $(1,0) \\to (0,1)$ und $(0,1) \\to (-1,0)$. Spalten-Anordnung ergibt $R$.',
        misconceptions: {
          '$\\begin{pmatrix}0 & 1\\\\ -1 & 0\\end{pmatrix}$': 'Das ist eine $90°$-Rotation im Uhrzeigersinn (umgekehrte Richtung).',
        },
      },
      {
        id: 'p1.linmap.ex4',
        difficulty: 3,
        conceptTags: ['linear-map'],
        type: 'mc',
        prompt:
          '"Eine lineare Abbildung schickt immer den Nullvektor auf den Nullvektor." — Wahr oder falsch?',
        options: ['Wahr', 'Falsch'],
        answer: 'Wahr',
        hints: [
          '$T(\\vec{0}) = T(0 \\cdot v) = 0 \\cdot T(v) = \\vec{0}$ (Linearität).',
          'Oder: Additivität: $T(\\vec{0}) = T(\\vec{0} + \\vec{0}) = T(\\vec{0}) + T(\\vec{0})$, also $T(\\vec{0}) = \\vec{0}$.',
          'Immer wahr für lineare Abbildungen.',
        ],
        explanation: 'Linearität: $T(\\vec{0}) = T(0 \\cdot \\vec{0}) = 0 \\cdot T(\\vec{0}) = \\vec{0}$.',
      },
      {
        id: 'p1.linmap.ex5',
        difficulty: 3,
        conceptTags: ['matrix', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein Dense-Layer bildet 768D-Eingabe auf 256D-Ausgabe ab (kein Bias). Welche Dimension hat die Gewichts-Matrix $W$?',
        options: ['$256 \\times 768$', '$768 \\times 256$', '$256 \\times 256$', '$768 \\times 768$'],
        answer: '$256 \\times 768$',
        hints: [
          'Eine $m \\times n$-Matrix bildet $\\mathbb{R}^n \\to \\mathbb{R}^m$ ab.',
          'Hier: $n = 768$ (Eingabe), $m = 256$ (Ausgabe).',
          '$W \\in \\mathbb{R}^{256 \\times 768}$.',
        ],
        explanation:
          '$y = Wx$ mit $x \\in \\mathbb{R}^{768}$ und $y \\in \\mathbb{R}^{256}$ braucht $W \\in \\mathbb{R}^{256 \\times 768}$.',
        misconceptions: {
          '$768 \\times 256$': 'Eine $768 \\times 256$-Matrix würde 256D-Eingabe auf 768D-Ausgabe abbilden — umgekehrt.',
        },
      },
      {
        id: 'p1.linmap.ex6',
        difficulty: 4,
        conceptTags: ['matrix', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: In einem Transformer projiziert $W_Q$ einen 768D-Token auf eine 64D-Query. Welche Dimension hat $W_Q$?',
        options: ['$64 \\times 768$', '$768 \\times 64$', '$64 \\times 64$', '$768 \\times 768$'],
        answer: '$64 \\times 768$',
        hints: [
          'Eingabe: 768D. Ausgabe: 64D.',
          'Matrix-Dimension: Ausgabe × Eingabe = $64 \\times 768$.',
          '$q = W_Q x$ mit $x \\in \\mathbb{R}^{768}$, $q \\in \\mathbb{R}^{64}$.',
        ],
        explanation:
          '$W_Q \\in \\mathbb{R}^{64 \\times 768}$: bildet 768D-Embedding auf 64D-Query ab.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Jedes neuronale Netz = Matrizen + Nichtlinearitäten\n\nEin typischer Dense-Layer: $y = \\sigma(Wx + b)$. Hier ist $W$ eine Matrix (lineare Abbildung), $b$ ein Bias-Vektor, $\\sigma$ eine nichtlineare Aktivierung (z.B. ReLU).\n\nEin Transformer-Block hat folgende Hauptmatrizen:\n- $W_Q, W_K, W_V \\in \\mathbb{R}^{d_k \\times d}$ — Attention-Projektionen\n- $W_O \\in \\mathbb{R}^{d \\times d}$ — Output-Projektion\n- $W_1 \\in \\mathbb{R}^{d_{ff} \\times d}$, $W_2 \\in \\mathbb{R}^{d \\times d_{ff}}$ — Feed-Forward',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Linear Algebra" Folge 3 (Linear transformations and matrices) ist hier Pflicht. Das Aha-Erlebnis "Spalten = Basisbilder" ist DER Schlüssel zum Verständnis, warum Matrix-Multiplikation so definiert ist, wie sie ist.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.linmap.card1',
      front: 'Was repräsentieren die Spalten einer Matrix?',
      back: 'Die Bilder der Standard-Basisvektoren $e_i$.',
      conceptTags: ['matrix'],
    },
    {
      id: 'p1.linmap.card2',
      front: 'Definition lineare Abbildung?',
      back: '$T(c_1 v + c_2 w) = c_1 T(v) + c_2 T(w)$.',
      conceptTags: ['linear-map'],
    },
    {
      id: 'p1.linmap.card3',
      front: 'Rotation um $90°$ gegen Uhrzeigersinn (2×2-Matrix)?',
      back: '$R = \\begin{pmatrix}0 & -1\\\\ 1 & 0\\end{pmatrix}$.',
      conceptTags: ['rotation'],
    },
  ],

  learningOutcome:
    'Du kannst erklären, warum Matrizen und lineare Abbildungen dasselbe sind, Matrizen aus Abbildungsvorschriften aufbauen (Spalten = Basisbilder), Transposition anwenden und die Rolle von Gewichtsmatrizen in neuronalen Netzen beschreiben.',

  description:
    'Das zentrale Aha-Erlebnis: Eine $m \\times n$-Matrix IST eine lineare Abbildung $\\mathbb{R}^n \\to \\mathbb{R}^m$ — und jede lineare Abbildung lässt sich als Matrix schreiben. Die Spalten der Matrix sind genau die Bilder der Basisvektoren. Dieses Verständnis ist der Schlüssel zu Dense-Layern, Attention-Projektionen und Backpropagation.',

  conceptSteps: [
    {
      title: 'Was ist eine lineare Abbildung?',
      preprompt: 'Welche Transformationen (Streckung, Rotation, Scherung) behalten gerade Linien und den Ursprung?',
      body: 'Eine Funktion $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ ist **linear**, wenn sie Addition und Skalarmultiplikation erhält:\n\n$$T(c_1 \\mathbf{v} + c_2 \\mathbf{w}) = c_1 T(\\mathbf{v}) + c_2 T(\\mathbf{w})$$\n\n**Konsequenz**: $T(\\vec{0}) = \\vec{0}$ immer. Geraden bleiben Geraden. Parallelogramme bleiben Parallelogramme.\n\nBeispiele: Rotation, Spiegelung, Streckung, Projektion — alles lineare Abbildungen.',
      visual: `<svg viewBox="-10 -10 220 110" width="300" height="140" aria-label="Lineare Abbildung: Einheitsquadrat zu Parallelogramm">
        <rect x="-10" y="-10" width="220" height="110" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <rect x="5" y="15" width="35" height="35" fill="none" stroke="rgb(75 85 99)" stroke-width="1" stroke-dasharray="3"/>
        <defs>
          <marker id="a1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="rgb(248 113 113)"/></marker>
          <marker id="a2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="rgb(74 222 128)"/></marker>
        </defs>
        <line x1="5" y1="50" x2="40" y2="50" stroke="rgb(248 113 113)" stroke-width="2" marker-end="url(#a1)"/>
        <line x1="5" y1="50" x2="5" y2="15" stroke="rgb(74 222 128)" stroke-width="2" marker-end="url(#a2)"/>
        <text x="42" y="42" fill="rgb(156 163 175)" font-size="13">→</text>
        <polygon points="60,80 100,80 120,30 80,30" fill="none" stroke="rgb(99 102 241)" stroke-width="1.5"/>
        <line x1="60" y1="80" x2="100" y2="80" stroke="rgb(248 113 113)" stroke-width="2"/>
        <line x1="60" y1="80" x2="80" y2="30" stroke="rgb(74 222 128)" stroke-width="2"/>
        <text x="125" y="45" fill="rgb(248 113 113)" font-size="8">Spalte 1 = A·e₁</text>
        <text x="125" y="60" fill="rgb(74 222 128)" font-size="8">Spalte 2 = A·e₂</text>
        <text x="125" y="75" fill="rgb(99 102 241)" font-size="8">Parallelogramm</text>
      </svg>`,
    },
    {
      title: 'Matrizen: Notation und Aufbau',
      body: 'Eine $m \\times n$-Matrix $A$ hat $m$ Zeilen und $n$ Spalten:\n\n$$A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn}\\end{pmatrix}$$\n\n**Schlüsselformel**: Anwendung auf Vektor $\\mathbf{x} \\in \\mathbb{R}^n$:\n\n$$(A\\mathbf{x})_i = \\sum_{j=1}^n a_{ij} x_j \\qquad \\Rightarrow \\qquad A\\mathbf{x} \\in \\mathbb{R}^m$$',
      miniExample: '$A = \\begin{pmatrix}2 & 0 \\\\ 0 & 3\\end{pmatrix}$, $\\mathbf{x} = (1,1)^T$: $A\\mathbf{x} = (2, 3)^T$ — streckt $x$-Koordinate um 2, $y$ um 3.',
    },
    {
      title: 'Spalten = Basisbilder (das zentrale Insight)',
      body: 'Der wichtigste Satz: Die **Spalten von $A$** sind genau die Bilder der Standardbasisvektoren:\n\n$$A \\cdot e_j = j\\text{-te Spalte von } A$$\n\nWarum? $A e_j$ selektiert die $j$-te Spalte (da $e_j$ überall 0 außer an Position $j$).\n\n**Konsequenz**: Um eine lineare Abbildung $T$ als Matrix aufzuschreiben, berechne $T(e_1), T(e_2), \\dots$ und setze als Spalten ein.',
      selfCheck: 'Wie lautet die Matrix der Spiegelung an der $x$-Achse? (Hinweis: $e_1 \\to e_1$, $e_2 \\to -e_2$)',
    },
    {
      title: 'Addition, Skalarmultiplikation und Transposition',
      body: '**Matrixaddition** (gleiche Dimensionen): komponentenweise.\n\n**Transposition**: Zeilen und Spalten tauschen:\n\n$$(A^T)_{ij} = A_{ji} \\qquad A \\in \\mathbb{R}^{m \\times n} \\Rightarrow A^T \\in \\mathbb{R}^{n \\times m}$$\n\nWichtige Regel: $(AB)^T = B^T A^T$ — Reihenfolge umkehren!\n\nEine **symmetrische Matrix** erfüllt $A = A^T$.',
    },
    {
      title: 'Identitätsmatrix und Skalierungsmatrizen',
      body: 'Die **Identitätsmatrix** $I_n$ ist das neutrale Element: $I_n \\mathbf{x} = \\mathbf{x}$.\n\n$$I_n = \\begin{pmatrix}1 & 0 & \\cdots \\\\ 0 & 1 & \\\\ \\vdots & & \\ddots\\end{pmatrix}$$\n\nEine **Diagonalmatrix** $D = \\text{diag}(d_1, \\dots, d_n)$ skaliert jede Koordinate unabhängig:\n\n$$D\\mathbf{x} = (d_1 x_1, d_2 x_2, \\dots, d_n x_n)^T$$',
    },
    {
      title: 'ML: $Wx + b$ als lineare Abbildung plus Bias',
      body: 'Ein **Dense-Layer** in einem neuronalen Netz:\n\n$$\\mathbf{y} = W\\mathbf{x} + \\mathbf{b} \\qquad W \\in \\mathbb{R}^{m \\times n}, \\quad \\mathbf{b} \\in \\mathbb{R}^m$$\n\n- $W$ ist die **Gewichtsmatrix** — eine lineare Abbildung $\\mathbb{R}^n \\to \\mathbb{R}^m$\n- $\\mathbf{b}$ ist der **Bias-Vektor** — macht es affin (nicht mehr durch Ursprung)\n\nIn einem Transformer: $W_Q \\in \\mathbb{R}^{64 \\times 768}$ projiziert 768D-Embeddings auf 64D-Queries.',
      miniExample: 'BERT Dense-Layer: $W \\in \\mathbb{R}^{3072 \\times 768}$ — projiziert Embeddings auf 4× größeres "Feed-Forward"-Netz.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Matrizen als lineare Abbildungen',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# Matrix als lineare Abbildung R^3 -> R^2
A = torch.tensor([[2.0, 0.0, 1.0],
                  [0.0, 3.0, -1.0]])  # 2x3-Matrix

x = torch.tensor([1.0, 1.0, 1.0])    # Vektor in R^3
y = A @ x                              # y = A·x ∈ R^2 = [3.0, 2.0]

# Transposition: (2×3) → (3×2)
A_T = A.T        # oder A.transpose(0, 1)
# Probe: A @ A.T ist symmetrisch (2x2)
C = A @ A.T      # [[5, -1], [-1, 10]] — symmetrisch!

# Dense Layer in PyTorch: y = W·x + b
# W ∈ R^{256×768}, b ∈ R^{256}
linear = nn.Linear(in_features=768, out_features=256)
token = torch.randn(768)              # ein Token-Embedding
output = linear(token)                # output ∈ R^{256}
print(f"W.shape: {linear.weight.shape}")   # torch.Size([256, 768])
print(f"b.shape: {linear.bias.shape}")     # torch.Size([256])

# Spalten = Basisbilder
e1 = torch.eye(3)[0]    # Standardbasisvektor e_1
col1_via_product = A @ e1  # = erste Spalte von A = [2.0, 0.0]
col1_direct = A[:, 0]      # = [2.0, 0.0] ✓`,
      annotation: 'Der `@`-Operator ist Matrix-Vektor-Multiplikation: `A @ x` berechnet $A\\mathbf{x}$. `nn.Linear(in, out)` erstellt eine $\\text{out} \\times \\text{in}$-Matrix plus Bias — Achtung: PyTorch speichert $W^T$ intern, wendet aber korrekt $Wx + b$ an. `A @ A.T` ist immer symmetrisch: $(AA^T)^T = (A^T)^T A^T = AA^T$.',
    },
  ],

  derivations: [
    {
      claim: 'Jede lineare Abbildung $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ ist durch ihre Werte auf der Standardbasis eindeutig bestimmt',
      reasoning:
        'Sei $\\mathbf{x} = \\sum_{j=1}^n x_j e_j$ (jeder Vektor ist Linearkombination der Basisvektoren). Dann $T(\\mathbf{x}) = T(\\sum_j x_j e_j) = \\sum_j x_j T(e_j)$ (Linearität). Also ist $T(\\mathbf{x})$ vollständig durch $T(e_1), \\dots, T(e_n)$ bestimmt. Setzt man $T(e_j)$ als $j$-te Spalte einer Matrix $A$, gilt $A\\mathbf{x} = T(\\mathbf{x})$ für alle $\\mathbf{x}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Eine $m \\times n$-Matrix bildet $\\mathbb{R}^m$ auf $\\mathbb{R}^n$ ab',
      correct: 'Eine $m \\times n$-Matrix bildet $\\mathbb{R}^n$ auf $\\mathbb{R}^m$ ab',
      explanation: 'Die Anzahl der Spalten bestimmt den Input-Raum ($n$), die Anzahl der Zeilen den Output-Raum ($m$). Merkhilfe: $A \\in \\mathbb{R}^{m \\times n}$, $\\mathbf{x} \\in \\mathbb{R}^n$, $A\\mathbf{x} \\in \\mathbb{R}^m$.',
    },
    {
      wrong: 'Lineare Abbildungen können den Ursprung verschieben',
      correct: 'Lineare Abbildungen bilden immer $\\vec{0}$ auf $\\vec{0}$ ab',
      explanation: 'Linearität: $T(\\vec{0}) = T(0 \\cdot \\vec{0}) = 0 \\cdot T(\\vec{0}) = \\vec{0}$. Dense-Layer mit Bias ($Wx + b$) ist **affin**, nicht linear — der Bias verschieb das Bild, durchbricht aber die Linearität.',
    },
    {
      wrong: 'Die Transponierte einer $(3 \\times 2)$-Matrix ist wieder $(3 \\times 2)$',
      correct: 'Die Transponierte einer $(3 \\times 2)$-Matrix ist $(2 \\times 3)$',
      explanation: 'Transponieren tauscht Zeilen und Spalten: $(A^T)_{ij} = A_{ji}$. Aus einer $(m \\times n)$-Matrix wird eine $(n \\times m)$-Matrix.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Linear transformations and matrices" (Essence of Linear Algebra, Ep. 3)',
      type: 'video',
      note: 'DAS Video zu Spalten als Basisbilder — animiert und unvergesslich',
    },
    {
      title: 'MML Book, Kapitel 2.2: "Matrices"',
      type: 'book',
      note: 'Rigoros; besonders Abschnitt zu linearen Abbildungen und deren Matrixdarstellung',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.vektoren-formal',
      relation: 'requires',
      hint: 'Vektoren in $\\mathbb{R}^n$ sind die Ein- und Ausgaben der linearen Abbildungen.',
    },
    {
      lessonId: 'p1.matrix-multiplikation',
      relation: 'extends',
      hint: 'Matrix-Multiplikation ist die Komposition zweier linearer Abbildungen — direkte Fortsetzung.',
    },
    {
      lessonId: 'p1.inverse-transponierte',
      relation: 'extends',
      hint: 'Inverse und Transponierte sind zentrale Operationen auf Matrizen/Abbildungen.',
    },
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'see-also',
      hint: 'Eigenvektoren sind die Richtungen, die eine lineare Abbildung nur streckt — die "natürlichen Achsen".',
    },
  ],

  reflection: 'Matrizen sind nicht nur Zahlentabellen — sie sind Transformationen. Jeder Dense-Layer, jede Attention-Projektion ist eine lineare Abbildung. Die Spalten verraten alles: wohin die Basisvektoren wandern. **Was überrascht dich an dem Zusammenhang "Spalten = Basisbilder"?**',
}
