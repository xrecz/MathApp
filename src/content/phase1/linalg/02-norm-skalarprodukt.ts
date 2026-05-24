import type { Lesson } from '../../../types'

export const normSkalarprodukt: Lesson = {
  id: 'p1.norm-skalarprodukt',
  title: 'Norm & Skalarprodukt (vertieft)',
  conceptTags: ['norm', 'dot-product', 'l1', 'l2', 'frobenius', 'cauchy-schwarz'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Normen — verschiedene Abstands-Konzepte\n\nEine **Norm** misst die Länge eines Vektors. Die drei wichtigsten für ML:',
      },
      {
        kind: 'math',
        content:
          '$$\\|v\\|_1 = \\sum_i |v_i| \\qquad \\|v\\|_2 = \\sqrt{\\sum_i v_i^2} \\qquad \\|v\\|_\\infty = \\max_i |v_i|$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: L1-Norm → Lasso-Regularisierung (sparse Gewichte), L2-Norm → Weight Decay (schrumpft alle Gewichte gleichmäßig), Frobenius-Norm → MSE für Matrizen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Geometrie der Einheitskugeln\n\nDie Einheitskugel $\\{v : \\|v\\| = 1\\}$ hat je nach Norm eine andere Form:',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-90 -60 180 120" width="180" height="120" xmlns="http://www.w3.org/2000/svg">
          <text x="-80" y="-48" fill="#9ca3af" font-size="9">L1</text>
          <text x="-20" y="-48" fill="#9ca3af" font-size="9">L2</text>
          <text x="42" y="-48" fill="#9ca3af" font-size="9">L∞</text>
          <polygon points="-70,0 -50,-20 -30,0 -50,20" fill="none" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="-20" cy="0" r="22" fill="none" stroke="#6366f1" stroke-width="1.5"/>
          <rect x="38" y="-22" width="44" height="44" fill="none" stroke="#10b981" stroke-width="1.5"/>
          <line x1="-90" y1="0" x2="90" y2="0" stroke="#374151" stroke-width="0.5"/>
        </svg>`,
        caption: 'Einheitskugeln von L1 (Raute), L2 (Kreis), L∞ (Quadrat)',
      },
      {
        kind: 'text',
        content:
          '### Cauchy-Schwarz-Ungleichung\n\n$|a \\cdot b| \\leq \\|a\\|_2 \\cdot \\|b\\|_2$\n\nGleichheit genau dann, wenn $a$ und $b$ parallel sind. Das ist die mathematische Grundlage dafür, dass Cosine-Similarity in $[-1, 1]$ liegt.\n\n### Frobenius-Norm für Matrizen\n\n$\\|A\\|_F = \\sqrt{\\sum_{i,j} a_{ij}^2}$ — L2-Norm aller Einträge.',
      },
    ],
    practice: [
      {
        id: 'p1.norm.ex1',
        difficulty: 1,
        conceptTags: ['l1'],
        type: 'numeric',
        prompt: 'L1-Norm von $(3, -4)$?',
        answer: 7,
        hints: [
          'L1-Norm: Summe der Beträge.',
          '$|3| + |-4| = ?$',
          '$3 + 4 = 7$.',
        ],
        explanation: '$\\|(3,-4)\\|_1 = |3| + |-4| = 3 + 4 = 7$.',
      },
      {
        id: 'p1.norm.ex2',
        difficulty: 1,
        conceptTags: ['l2'],
        type: 'numeric',
        prompt: 'L2-Norm von $(3, -4)$?',
        answer: 5,
        hints: [
          'L2-Norm: $\\sqrt{3^2 + (-4)^2}$.',
          '$9 + 16 = 25$.',
          '$\\sqrt{25} = 5$.',
        ],
        explanation: '$\\|(3,-4)\\|_2 = \\sqrt{9+16} = \\sqrt{25} = 5$.',
      },
      {
        id: 'p1.norm.ex3',
        difficulty: 1,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'L∞-Norm von $(3, -4)$?',
        answer: 4,
        hints: [
          'L∞-Norm: größter Betrag unter den Komponenten.',
          'Beträge: $|3| = 3$, $|-4| = 4$.',
          'Maximum: $4$.',
        ],
        explanation: '$\\|(3,-4)\\|_\\infty = \\max(3, 4) = 4$.',
      },
      {
        id: 'p1.norm.ex4',
        difficulty: 2,
        conceptTags: ['norm', 'ml'],
        type: 'mc',
        prompt: 'Welche Regularisierung produziert **sparse** Gewichte (viele exakt 0)?',
        options: ['L1 (Lasso)', 'L2 (Ridge / Weight Decay)', 'L∞', 'Keine'],
        answer: 'L1 (Lasso)',
        hints: [
          'L1-Regularisierung bestraft die Summe der Beträge der Gewichte.',
          'Die Rauten-Form der L1-Einheitskugel führt dazu, dass Optima auf Ecken liegen.',
          'Ecken der L1-Kugel → genau 0 Koordinaten → Sparsity.',
        ],
        explanation:
          'L1-Regularisierung (Lasso) erzeugt sparse Lösungen: viele Gewichte werden exakt 0. Grund: geometrisch treffen Niveau-Linien der Loss-Funktion die Rauten-förmige L1-Kugel oft an Ecken.',
        misconceptions: {
          'L2 (Ridge / Weight Decay)': 'L2 schrumpft alle Gewichte gleichmäßig in Richtung 0, aber nicht auf exakt 0.',
        },
      },
      {
        id: 'p1.norm.ex5',
        difficulty: 3,
        conceptTags: ['frobenius', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Frobenius-Norm der Matrix $\\begin{pmatrix}1 & 2\\\\ 2 & 1\\end{pmatrix}$? Auf 2 Nachkommastellen.',
        answer: 3.16,
        acceptedAlternatives: ['3,16', '3.162', '3,162'],
        hints: [
          'Frobenius-Norm: $\\|A\\|_F = \\sqrt{\\sum_{ij} a_{ij}^2}$.',
          '$1^2 + 2^2 + 2^2 + 1^2 = 1 + 4 + 4 + 1 = 10$.',
          '$\\sqrt{10} \\approx 3{,}162$.',
        ],
        explanation: '$\\|A\\|_F = \\sqrt{1+4+4+1} = \\sqrt{10} \\approx 3{,}16$.',
      },
      {
        id: 'p1.norm.ex6',
        difficulty: 4,
        conceptTags: ['l1', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Lasso-Regression fügt L1-Regularisierung zum MSE-Loss hinzu: $L = \\|Xw - y\\|_2^2 + \\lambda \\|w\\|_1$. Was bewirkt ein sehr großes $\\lambda$?',
        options: [
          'Fast alle Gewichte werden 0 (Überregularisierung)',
          'Der Loss wird minimiert ohne Einschränkung',
          'Alle Gewichte werden gleich groß',
          'Das Modell wird komplexer',
        ],
        answer: 'Fast alle Gewichte werden 0 (Überregularisierung)',
        hints: [
          'Großes $\\lambda$ gewichtet die L1-Strafe stark.',
          'Je größer $\\lambda$, desto stärker wird $\\|w\\|_1 = \\sum |w_i|$ bestraft.',
          'Extrem: $w = 0$ minimiert $\\|w\\|_1$ vollständig.',
        ],
        explanation:
          'Sehr großes $\\lambda$: die L1-Strafe dominiert, fast alle Gewichte werden auf 0 getrieben — das Modell underfittet (zu sparsam).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Normen als Design-Entscheidungen in ML\n\nDie Wahl der Norm ist eine fundamentale Design-Entscheidung:\n\n- **L2 (Weight Decay)**: Standard in neuronalen Netzen. Glatte Lösung, alle Gewichte klein, aber $\\neq 0$. In PyTorch: `optimizer = Adam(..., weight_decay=1e-4)`.\n- **L1 (Lasso)**: Feature-Selektion, sparse Repräsentationen. In Sparse Autoencodern (SAE) für LLM-Interpretability zentral.\n- **Frobenius**: Beim Matrix-Fine-Tuning (z.B. Adapter-Methoden) als Abstandsmaß.',
      },
      {
        kind: 'callout',
        content:
          'Cauchy-Schwarz garantiert $\\cos\\theta = \\frac{a \\cdot b}{\\|a\\|\\|b\\|} \\in [-1,1]$. Ohne Cauchy-Schwarz wäre Cosine-Similarity kein sinnvolles Ähnlichkeitsmaß.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.norm.card1',
      front: 'L1-Norm?',
      back: '$\\|v\\|_1 = \\sum_i |v_i|$ (Summe der Beträge).',
      conceptTags: ['l1'],
    },
    {
      id: 'p1.norm.card2',
      front: 'L2-Norm?',
      back: '$\\|v\\|_2 = \\sqrt{\\sum_i v_i^2}$ (euklidische Länge).',
      conceptTags: ['l2'],
    },
    {
      id: 'p1.norm.card3',
      front: 'Cauchy-Schwarz-Ungleichung?',
      back: '$|a \\cdot b| \\leq \\|a\\|_2 \\cdot \\|b\\|_2$.',
      conceptTags: ['cauchy-schwarz'],
    },
  ],

  learningOutcome:
    'Du kannst L1, L2 und Lp-Normen berechnen und geometrisch interpretieren, das Skalarprodukt und den Winkel zwischen Vektoren bestimmen, die Cauchy-Schwarz-Ungleichung anwenden und erklären, warum L1/L2-Regularisierung unterschiedliche Sparsity-Eigenschaften hat.',

  description:
    'Normen messen die Länge von Vektoren — aber welche Norm man wählt, hat drastische Auswirkungen auf Optimierung und Regularisierung in ML. L2 erzeugt glatte Lösungen, L1 erzeugt sparsame Gewichte. Das Skalarprodukt liefert Winkel und Ähnlichkeit — die Basis von Cosine-Similarity in Embedding-Modellen.',

  conceptSteps: [
    {
      title: 'L2-Norm: euklidische Länge',
      preprompt: 'Pythagoras in 2D: $\\sqrt{a^2 + b^2}$. Wie verallgemeinert sich das auf $n$ Dimensionen?',
      body: 'Die **L2-Norm** (euklidische Norm) verallgemeinert den Pythagoras-Satz:\n\n$$\\|\\mathbf{v}\\|_2 = \\sqrt{v_1^2 + v_2^2 + \\dots + v_n^2} = \\sqrt{\\sum_{i=1}^n v_i^2}$$\n\nDie **Einheitskugel** $\\{v : \\|v\\|_2 = 1\\}$ ist ein Kreis (2D) bzw. eine Kugel (3D).',
      visual: `<svg viewBox="-90 -70 180 140" width="300" height="230" aria-label="L1-Ball vs L2-Ball">
        <rect x="-90" y="-70" width="180" height="140" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <text x="-80" y="-52" fill="rgb(156 163 175)" font-size="9">L1-Ball (Raute)</text>
        <text x="-5" y="-52" fill="rgb(156 163 175)" font-size="9">L2-Ball (Kreis)</text>
        <line x1="-90" y1="0" x2="90" y2="0" stroke="rgb(55 65 81)" stroke-width="0.5"/>
        <polygon points="-55,0 -35,-25 -15,0 -35,25" fill="none" stroke="rgb(248 113 113)" stroke-width="1.5"/>
        <circle cx="35" cy="0" r="25" fill="none" stroke="rgb(99 102 241)" stroke-width="1.5"/>
        <text x="-65" y="40" fill="rgb(248 113 113)" font-size="8">sparse Ecken</text>
        <text x="15" y="40" fill="rgb(99 102 241)" font-size="8">glatte Kurve</text>
      </svg>`,
      miniExample: '$\\|(3, 4)\\|_2 = \\sqrt{9+16} = 5$ — klassisches 3-4-5-Dreieck.',
    },
    {
      title: 'L1-Norm und Lp-Normen',
      body: 'Die **L1-Norm** summiert die absoluten Beträge:\n\n$$\\|\\mathbf{v}\\|_1 = \\sum_{i=1}^n |v_i|$$\n\nAllgemein: **Lp-Norm** für $p \\geq 1$:\n\n$$\\|\\mathbf{v}\\|_p = \\left(\\sum_{i=1}^n |v_i|^p\\right)^{1/p}$$\n\nGrenzfall: $\\|\\mathbf{v}\\|_\\infty = \\max_i |v_i|$.\n\nDie Einheitskugeln haben verschiedene Formen: L1 = Raute (hat Ecken!), L2 = Kreis, L∞ = Quadrat.',
      selfCheck: 'Warum führen Ecken der L1-Einheitskugel zu sparsamen Lösungen in der Regularisierung?',
    },
    {
      title: 'Skalarprodukt: Länge und Winkel',
      body: 'Das **Skalarprodukt** (Dot Product) zweier Vektoren:\n\n$$\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^n a_i b_i = \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 \\cos\\theta$$\n\nDer Winkel $\\theta$ zwischen $\\mathbf{a}$ und $\\mathbf{b}$:\n\n$$\\cos\\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2}$$\n\nSenkrecht: $\\mathbf{a} \\cdot \\mathbf{b} = 0$. Gleiche Richtung: $\\cos\\theta = 1$. Entgegen: $\\cos\\theta = -1$.',
      miniExample: '$\\mathbf{a} = (1,0)$, $\\mathbf{b} = (1,1)/\\sqrt{2}$: $\\mathbf{a} \\cdot \\mathbf{b} = 1/\\sqrt{2}$, $\\cos\\theta = 1/\\sqrt{2}$, $\\theta = 45°$.',
    },
    {
      title: 'Cauchy-Schwarz-Ungleichung',
      body: '**Cauchy-Schwarz**: Für alle $\\mathbf{a}, \\mathbf{b} \\in \\mathbb{R}^n$ gilt:\n\n$$|\\mathbf{a} \\cdot \\mathbf{b}| \\leq \\|\\mathbf{a}\\|_2 \\cdot \\|\\mathbf{b}\\|_2$$\n\nGleichheit genau dann, wenn $\\mathbf{a}$ und $\\mathbf{b}$ parallel sind.\n\n**Konsequenz**: $\\cos\\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|} \\in [-1, 1]$ ist garantiert — Cosine-Similarity ist ein wohldefinierts Ähnlichkeitsmaß.',
      selfCheck: 'Warum würde Cosine-Similarity ohne Cauchy-Schwarz ihren Sinn verlieren?',
    },
    {
      title: 'L1 vs. L2: geometrische Bedeutung der Regularisierung',
      body: 'Bei Regularisierung minimiert man $L(w) + \\lambda \\|w\\|_p$:\n\n- **L2 (Ridge/Weight Decay)**: Einheitskugel ist rund → Optimum liegt typischerweise nicht auf Achsen → alle Gewichte klein, aber selten genau 0.\n- **L1 (Lasso)**: Einheitskugel ist Raute mit Ecken → Optimum trifft oft eine Ecke (wo eine Koordinate exakt 0) → **Sparsity**.\n\n$$\\lambda_\\text{L2}: \\|w\\|_2^2 = \\sum_i w_i^2 \\qquad \\lambda_\\text{L1}: \\|w\\|_1 = \\sum_i |w_i|$$',
    },
    {
      title: 'ML: Normen in LayerNorm und Cosine-Similarity',
      body: '**LayerNorm** normiert Aktivierungen auf Mittelwert 0 und Varianz 1:\n\n$$\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sigma} \\cdot \\gamma + \\beta$$\n\nDabei ist $\\sigma = \\|x - \\mu\\|_2 / \\sqrt{n}$ — eine L2-Norm.\n\n**Cosine-Similarity** in Retrieval und Attention:\n\n$$\\text{sim}(\\mathbf{q}, \\mathbf{k}) = \\frac{\\mathbf{q} \\cdot \\mathbf{k}}{\\|\\mathbf{q}\\|_2 \\|\\mathbf{k}\\|_2}$$\n\nAttention in Transformers verwendet $\\mathbf{Q} \\mathbf{K}^T / \\sqrt{d_k}$ — normiert durch $\\sqrt{d_k}$ statt durch Vektorlänge.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Normen, Skalarprodukt und Cosine-Similarity',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

v = torch.tensor([3.0, -4.0, 0.0])

# Verschiedene Normen
l1_norm  = torch.norm(v, p=1)       # |3| + |-4| + |0| = 7
l2_norm  = torch.norm(v, p=2)       # sqrt(9+16+0) = 5.0
l_inf    = torch.norm(v, p=float('inf'))  # max(3, 4, 0) = 4

# Skalarprodukt und Cosine-Similarity
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])
dot = torch.dot(a, b)               # 1*4 + 2*5 + 3*6 = 32
cos_sim = F.cosine_similarity(
    a.unsqueeze(0), b.unsqueeze(0)  # erwartet Batch-Dim
)  # dot / (||a|| * ||b||) ≈ 0.974

# L1/L2-Regularisierung im Loss
w = torch.randn(10, requires_grad=True)
loss_data = torch.tensor(1.5)       # Beispiel-Loss
lambda_l2 = 1e-4
lambda_l1 = 1e-4

loss_l2_reg = loss_data + lambda_l2 * torch.norm(w, p=2)**2   # Ridge
loss_l1_reg = loss_data + lambda_l1 * torch.norm(w, p=1)       # Lasso

# LayerNorm — nutzt intern L2-Norm zur Standardisierung
layer_norm = torch.nn.LayerNorm(normalized_shape=10)
x = torch.randn(5, 10)    # Batch=5, Features=10
out = layer_norm(x)        # Mittelwert≈0, Std≈1 pro Token`,
      annotation: '`torch.norm(v, p=1)` entspricht $\\|v\\|_1$, `p=2` entspricht $\\|v\\|_2$, `p=inf` entspricht $\\|v\\|_\\infty$. `F.cosine_similarity` berechnet $\\mathbf{a}\\cdot\\mathbf{b} / (\\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2)$ — die Cauchy-Schwarz-Ungleichung garantiert, dass das Ergebnis in $[-1,1]$ liegt. Bei L2-Regularisierung über `weight_decay` in Adam/SGD ist der Gradient-Beitrag $2\\lambda w$.',
    },
  ],

  derivations: [
    {
      claim: '$\\cos\\theta \\in [-1, 1]$ — Cauchy-Schwarz macht Cosine-Similarity wohldefiniert',
      reasoning:
        'Cauchy-Schwarz: $|\\mathbf{a} \\cdot \\mathbf{b}| \\leq \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2$. Division durch $\\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 > 0$ ergibt $|\\cos\\theta| \\leq 1$, also $\\cos\\theta \\in [-1,1]$. Gleichheit: $\\cos\\theta = 1$ wenn $\\mathbf{b} = c\\mathbf{a}$ mit $c > 0$ (selbe Richtung); $\\cos\\theta = -1$ wenn $c < 0$ (entgegengesetzt).',
    },
    {
      claim: 'L1-Regularisierung fördert sparsame Lösungen',
      reasoning:
        'Bei der Optimierung von $L(w) + \\lambda\\|w\\|_1$ wird das Minimum durch Subgradientenbedingungen charakterisiert. Für Koordinate $w_i$: $\\partial L/\\partial w_i + \\lambda \\cdot \\text{sign}(w_i) = 0$. Wenn $|\\partial L/\\partial w_i| < \\lambda$, wird $w_i = 0$ gesetzt. Geometrisch: Die Raute der L1-Kugel hat Ecken auf den Achsen — dort ist eine Koordinate 0.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'L2-Norm von $(3, 4)$ ist $3 + 4 = 7$',
      correct: 'L2-Norm von $(3, 4)$ ist $\\sqrt{3^2 + 4^2} = 5$',
      explanation: 'L2-Norm = $\\sqrt{\\sum v_i^2}$ (Pythagoras), nicht $\\sum |v_i|$ (das wäre L1). Der Unterschied ist geometrisch: L2 misst Luftlinie, L1 misst Stadtblock-Distanz.',
    },
    {
      wrong: 'Großes $\\lambda$ bei L1-Regularisierung verbessert immer die Generalisierung',
      correct: 'Zu großes $\\lambda$ treibt alle Gewichte auf 0 — das Modell underfittet',
      explanation: 'Regularisierung ist ein Trade-off zwischen Datenpräzision und Modellkomplexität. $\\lambda \\to \\infty$ → $w \\to 0$ → Vorhersage = Mittelwert → Underfitting.',
    },
    {
      wrong: 'Cosine-Similarity und Euklidische Distanz messen dasselbe',
      correct: 'Cosine-Similarity misst Winkel, Euklidische Distanz misst absoluten Abstand',
      explanation: 'Zwei Vektoren $v$ und $100v$ haben Cosine-Similarity 1 (gleiche Richtung), aber Euklidische Distanz $99\\|v\\|$. In Embedding-Modellen misst man oft Richtung (Cosine), nicht Länge.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Dot products and duality" (Essence of Linear Algebra, Ep. 9)',
      type: 'video',
      note: 'Geometrische Intuition für Skalarprodukt und Projektionen — der Dualitäts-Trick',
    },
    {
      title: 'MML Book, Kapitel 3.1–3.4: Normen, innere Produkte, orthogonale Projektionen',
      type: 'book',
      note: 'Rigoros mit ML-Motivation; kostenloser PDF auf mml-book.github.io',
    },
    {
      title: 'The Matrix Cookbook (Petersen & Pedersen) — Normen und Matrix-Normen',
      type: 'article',
      note: 'Kompakte Referenz für alle Normen, Ableitungen, Matrix-Identitäten; kostenloser PDF',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.vektoren-formal',
      relation: 'requires',
      hint: 'Vektoren als geordnete Tupel in $\\mathbb{R}^n$ sind die Grundlage für Normen und Skalarprodukt.',
    },
    {
      lessonId: 'p0.skalarprodukt',
      relation: 'requires',
      hint: 'Das Skalarprodukt aus Phase 0 wird hier formal vertieft und auf $\\mathbb{R}^n$ ausgedehnt.',
    },
    {
      lessonId: 'p1.spektraltheorem',
      relation: 'see-also',
      hint: 'Orthogonale Matrizen erhalten die L2-Norm — der Spektralsatz für symmetrische Matrizen nutzt Orthonormalbases.',
    },
    {
      lessonId: 'p1.jacobi-hesse',
      relation: 'see-also',
      hint: 'Die Hesse-Matrix und ihre Positiv-Definitheit sind eng verknüpft mit Normen und quadratischen Formen.',
    },
  ],

  reflection: 'Normen sind Werkzeuge, keine abstrakten Definitionen: L2 für glattes Lernen, L1 für Sparsity, Cosine-Similarity für semantische Ähnlichkeit. Die Cauchy-Schwarz-Ungleichung ist dabei das unsichtbare mathematische Rückgrat, das garantiert, dass Ähnlichkeitsmaße überhaupt Sinn ergeben. **Welche Norm erscheint dir für ML-Anwendungen am nützlichsten — und warum?**',
}
