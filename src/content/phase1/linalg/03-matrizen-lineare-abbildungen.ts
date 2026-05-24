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
}
