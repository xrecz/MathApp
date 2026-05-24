import type { Lesson } from '../../types'

export const vektoren: Lesson = {
  id: 'p0.vektoren',
  title: 'Vektoren im Raum',
  conceptTags: ['vector', 'addition', 'scalar-multiplication', 'norm'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Vektoren\n\nEin **Vektor** $\\vec{v} = (v_1, v_2, \\ldots, v_n)$ ist eine geordnete Liste von Zahlen. Du kannst ihn als Pfeil im Raum, als Punkt oder als Liste denken — je nach Kontext.\n\nIn ML sind Vektoren das Grundobjekt: jedes Wort, jeder Satz, jedes Bild wird als Vektor dargestellt.',
      },
      {
        kind: 'math',
        content:
          '$$\\vec{a} + \\vec{b} = (a_1 + b_1,\\; a_2 + b_2) \\qquad c \\cdot \\vec{a} = (c \\cdot a_1,\\; c \\cdot a_2)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Embeddings sind Vektoren — ein Wort wie "Berlin" wird auf einen Punkt in einem 768-dimensionalen Raum abgebildet. Wörter mit ähnlicher Bedeutung liegen nahe beieinander.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Vektoroperationen\n\n**Addition**: komponentenweise — $(1, 2) + (3, 4) = (4, 6)$\n\n**Skalarmultiplikation**: jede Komponente mit der gleichen Zahl multiplizieren — $3 \\cdot (1, 2) = (3, 6)$\n\n**Länge (Norm)** via Pythagoras:',
      },
      {
        kind: 'math',
        content:
          '$$\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\ldots + v_n^2}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $\\vec{a} = (3, 4)$\n\n$\\|\\vec{a}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$\n\nEin **normalisierter Vektor** hat Länge 1: $\\hat{a} = \\frac{\\vec{a}}{\\|\\vec{a}\\|} = (0{,}6,\\; 0{,}8)$.',
      },
    ],
    practice: [
      {
        id: 'p0.vec.ex1',
        difficulty: 1,
        conceptTags: ['vector', 'addition'],
        type: 'mc',
        prompt: 'Ergebnis von $(1, 2) + (3, 4)$?',
        options: ['$(4, 6)$', '$(3, 8)$', '$(4, 8)$', '$(2, 6)$'],
        answer: '$(4, 6)$',
        hints: [
          'Vektoren werden komponentenweise addiert.',
          '$1 + 3 = ?$ und $2 + 4 = ?$',
          '$1 + 3 = 4$, $2 + 4 = 6$: $(4, 6)$.',
        ],
        explanation: '$(1, 2) + (3, 4) = (1+3, 2+4) = (4, 6)$.',
        misconceptions: {
          '$(4, 8)$': 'Nur die erste Komponente stimmt. Zweite: $2 + 4 = 6$, nicht 8.',
        },
      },
      {
        id: 'p0.vec.ex2',
        difficulty: 2,
        conceptTags: ['vector', 'scalar-multiplication'],
        type: 'mc',
        prompt: 'Ergebnis von $3 \\cdot (2, -1)$?',
        options: ['$(6, -3)$', '$(5, 2)$', '$(6, 3)$', '$(6, -1)$'],
        answer: '$(6, -3)$',
        hints: [
          'Skalarmultiplikation: jede Komponente mit 3 multiplizieren.',
          '$3 \\cdot 2 = 6$ und $3 \\cdot (-1) = ?$',
          '$3 \\cdot (-1) = -3$: $(6, -3)$.',
        ],
        explanation: '$3 \\cdot (2, -1) = (3 \\cdot 2, 3 \\cdot (-1)) = (6, -3)$.',
      },
      {
        id: 'p0.vec.ex3',
        difficulty: 2,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'Länge des Vektors $(3, 4)$?',
        answer: 5,
        hints: [
          'Verwende die Norm-Formel: $\\|v\\| = \\sqrt{v_1^2 + v_2^2}$.',
          '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16}$',
          '$\\sqrt{25} = 5$.',
        ],
        explanation: '$\\|(3,4)\\| = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
      },
      {
        id: 'p0.vec.ex4',
        difficulty: 3,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'Länge des Vektors $(1, 2, 2)$ in 3D?',
        answer: 3,
        hints: [
          '$\\|v\\| = \\sqrt{1^2 + 2^2 + 2^2}$',
          '$\\sqrt{1 + 4 + 4} = \\sqrt{9}$',
          '$\\sqrt{9} = 3$.',
        ],
        explanation: '$\\|(1,2,2)\\| = \\sqrt{1+4+4} = \\sqrt{9} = 3$.',
      },
      {
        id: 'p0.vec.ex5',
        difficulty: 4,
        conceptTags: ['norm', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Ein Embedding-Vektor hat Komponenten $(0{,}6,\\; 0{,}8)$. Was ist seine Länge?',
        answer: 1,
        acceptedAlternatives: ['1.0', '1,0', '1.00'],
        hints: [
          '$\\|v\\| = \\sqrt{0{,}6^2 + 0{,}8^2}$',
          '$0{,}36 + 0{,}64 = 1{,}00$',
          '$\\sqrt{1} = 1$. Das ist ein normalisierter Vektor!',
        ],
        explanation:
          '$\\sqrt{0{,}6^2 + 0{,}8^2} = \\sqrt{0{,}36 + 0{,}64} = \\sqrt{1} = 1$. Normalisierte Embedding-Vektoren haben immer Länge 1.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Embeddings sind Vektoren\n\nJedes LLM — GPT, Claude, Llama — verarbeitet Text als Vektoren. Ein Token wird in einen Embedding-Vektor umgewandelt. Das gesamte Modell rechnet dann nur noch mit Vektoroperationen:',
      },
      {
        kind: 'text',
        content:
          '- **Embedding-Schicht**: Wort → Vektor (z.B. $\\mathbb{R}^{768}$)\n- **Attention**: Skalarprodukte von Vektoren\n- **Feed-Forward**: Matrixmultiplikationen (Vektoren × Matrizen)\n- **Output**: Vektor → Wahrscheinlichkeitsverteilung über Tokens',
      },
      {
        kind: 'callout',
        content:
          'Alles, was in einem Sprachmodell passiert — von "Was kommt nach diesem Wort?" bis zu "Übersetze diesen Satz" — lässt sich als Abfolge von Vektoroperationen schreiben.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.vec.card1',
      front: 'Vektoraddition (Regel)?',
      back: 'Komponentenweise: $(a_1, a_2) + (b_1, b_2) = (a_1+b_1, a_2+b_2)$.',
      conceptTags: ['vector', 'addition'],
    },
    {
      id: 'p0.vec.card2',
      front: 'Norm in $\\mathbb{R}^n$?',
      back: '$\\|v\\| = \\sqrt{v_1^2 + v_2^2 + \\ldots + v_n^2}$',
      conceptTags: ['norm'],
    },
    {
      id: 'p0.vec.card3',
      front: 'Was ist ein normalisierter Vektor?',
      back: 'Ein Vektor mit Länge (Norm) 1.',
      conceptTags: ['norm'],
    },
  ],

  learningOutcome:
    'Du kannst Vektoren in $\\mathbb{R}^n$ addieren, skalieren und ihre Norm berechnen — und verstehst, warum Feature-Vektoren und Embeddings das Grundobjekt jedes ML-Modells sind.',

  description:
    'Ein Vektor ist mehr als eine Liste von Zahlen — er hat Richtung und Länge. Du lernst Vektoroperationen geometrisch und algebraisch verstehen und siehst, wie Embeddings, Feature-Vektoren und Gewichtsvektoren in ML alle als Vektoren im Raum leben.',

  conceptSteps: [
    {
      title: 'Was ist ein Vektor?',
      preprompt: 'Wenn du jemandem sagst "geh 3 Schritte nach rechts und 4 nach oben" — was hast du dann beschrieben?',
      body: 'Ein **Vektor** $\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{pmatrix}$ ist eine geordnete Liste von Zahlen.\n\nDrei Interpretationen:\n- **Geometrisch**: ein Pfeil im Raum mit Richtung und Länge\n- **Als Punkt**: eine Position im $n$-dimensionalen Raum\n- **Als Liste**: strukturierte Daten (Gewichte, Features, Embeddings)\n\nIn ML ist jedes Objekt letztendlich ein Vektor: ein Bild ($(28 \\times 28) = 784$ Pixel), ein Wort (768-dim Embedding), ein Datenpunkt ($d$ Features).',
      miniExample: '$\\vec{v} = (3, 4)$ — Pfeil 3 rechts, 4 hoch; Länge = 5',
      selfCheck: 'Was bedeutet $(0, 0, \\ldots, 0)$? (Der Nullvektor — kein Pfeil, der Ursprung.)',
    },
    {
      title: 'Vektoren als Pfeile — geometrisch',
      body: 'Ein Vektor als **Pfeil** startet beliebig und zeigt in eine feste Richtung:\n\n$$\\vec{a} + \\vec{b} \\text{ ist das Kräfteparallelogramm: erst } \\vec{a}, \\text{ dann } \\vec{b}$$\n\n$$c \\cdot \\vec{a} \\text{ streckt/staucht den Pfeil, ändert aber nicht die Richtung (für } c > 0\\text{)}$$',
      visual: `<svg viewBox="0 0 260 140" width="260" height="140" aria-label="Vektoraddition geometrisch">
        <rect x="0" y="0" width="260" height="140" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="20" y1="120" x2="240" y2="20" stroke="rgb(55 65 81)" stroke-width="1" stroke-dasharray="2"/>
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(134 239 172)"/>
          </marker>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(96 165 250)"/>
          </marker>
          <marker id="arr3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(251 191 36)"/>
          </marker>
        </defs>
        <line x1="30" y1="110" x2="118" y2="72" stroke="rgb(134 239 172)" stroke-width="2.5" marker-end="url(#arr1)"/>
        <text x="60" y="102" fill="rgb(134 239 172)" font-size="11" font-family="monospace">a⃗</text>
        <line x1="120" y1="72" x2="180" y2="32" stroke="rgb(96 165 250)" stroke-width="2.5" marker-end="url(#arr2)"/>
        <text x="158" y="64" fill="rgb(96 165 250)" font-size="11" font-family="monospace">b⃗</text>
        <line x1="30" y1="110" x2="178" y2="34" stroke="rgb(251 191 36)" stroke-width="2" stroke-dasharray="5" marker-end="url(#arr3)"/>
        <text x="88" y="82" fill="rgb(251 191 36)" font-size="11" font-family="monospace">a⃗+b⃗</text>
      </svg>`,
      miniExample: '$(1, 2) + (3, 1) = (4, 3)$ — erst Pfeil $(1,2)$, dann $(3,1)$ anfügen',
      selfCheck: 'Was ist geometrisch $\\vec{a} - \\vec{b}$? (Pfeil von der Spitze von $\\vec{b}$ zur Spitze von $\\vec{a}$.)',
    },
    {
      title: 'Rechenoperationen algebraisch',
      body: '**Vektoraddition** (komponentenweise):\n$$\\begin{pmatrix}a_1\\\\a_2\\end{pmatrix} + \\begin{pmatrix}b_1\\\\b_2\\end{pmatrix} = \\begin{pmatrix}a_1+b_1\\\\a_2+b_2\\end{pmatrix}$$\n\n**Skalarmultiplikation** (jede Komponente × Skalar):\n$$c \\cdot \\begin{pmatrix}a_1\\\\a_2\\end{pmatrix} = \\begin{pmatrix}c\\cdot a_1\\\\c\\cdot a_2\\end{pmatrix}$$\n\n**Norm** (Länge via Pythagoras):\n$$\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2}$$',
      miniExample: '$2 \\cdot (3, -1, 4) = (6, -2, 8)$; $\\|(3, 4)\\| = \\sqrt{9 + 16} = 5$',
      selfCheck: 'Was ist $\\|-\\vec{v}\\|$? (Gleich wie $\\|\\vec{v}\\|$ — Negieren ändert die Richtung, nicht die Länge.)',
    },
    {
      title: 'Linearkombinationen',
      body: 'Eine **Linearkombination** von Vektoren $\\vec{v}_1, \\ldots, \\vec{v}_k$ mit Koeffizienten $c_1, \\ldots, c_k$ ist:\n\n$$c_1 \\vec{v}_1 + c_2 \\vec{v}_2 + \\cdots + c_k \\vec{v}_k$$\n\nAlle Punkte, die so erreichbar sind, bilden einen **Vektorraum**.\n\nIn ML sind neuronale Netze letztlich Linearkombinationen von Features:\n$$\\hat{y} = w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n = \\vec{w} \\cdot \\vec{x}$$\n\n(plus Aktivierungsfunktionen für Nichtlinearität)',
      miniExample: 'Lineares Modell: $\\hat{y} = 0{,}5 x_1 - 0{,}3 x_2 + 0{,}8 x_3$ — Linearkombination der Feature-Werte',
    },
    {
      title: 'Vektoren in $\\mathbb{R}^n$',
      body: 'In der Praxis sind Vektoren hochdimensional:\n\n- **Features**: $\\vec{x} \\in \\mathbb{R}^d$ mit $d$ Features (z.B. $d = 784$ Pixel)\n- **Gewichte**: $\\vec{w} \\in \\mathbb{R}^d$ — Koeffizienten eines linearen Modells\n- **Embeddings**: Wort-Vektoren in $\\mathbb{R}^{768}$ (BERT) oder $\\mathbb{R}^{4096}$ (LLaMA)\n\nGeometrische Intuition aus 2D/3D bleibt gültig — auch in 768 Dimensionen gibt es Winkel, Abstände und Richtungen.',
      selfCheck: 'Ein Word2Vec-Embedding für "König" hat 300 Dimensionen. Ist das immer noch ein Vektor? (Ja — ein Element von $\\mathbb{R}^{300}$, alle Operationen gelten gleich.)',
    },
    {
      title: 'ML: Feature-Vektoren und Embeddings',
      body: '**Normalisierung** ist der wichtigste Schritt beim Arbeiten mit Vektoren in ML:\n\n$$\\hat{v} = \\frac{\\vec{v}}{\\|\\vec{v}\\|} \\qquad \\text{(Einheitsvektor, Länge = 1)}$$\n\nWozu?\n- **Cosine-Similarity** vergleicht Richtungen, nicht Längen — normalisierte Embeddings sind Standard\n- **Feature-Normalisierung**: Features auf gleiche Skala bringen, damit kein Feature dominiert\n- **Gradient-Clipping**: $\\frac{\\nabla L}{\\|\\nabla L\\|} \\cdot \\epsilon$ begrenzt die Schrittweite beim Training',
      miniExample: 'Normalisiere $(3, 4)$: $\\hat{v} = \\frac{(3, 4)}{5} = (0{,}6,\\; 0{,}8)$ — Länge 1 ✓',
      selfCheck: 'Warum hat jedes normalisierte Embedding $\\hat{v}$ die Eigenschaft $\\|\\hat{v}\\| = 1$? (Weil $\\|\\hat{v}\\| = \\frac{\\|\\vec{v}\\|}{\\|\\vec{v}\\|} = 1$.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Vektoroperationen und Embeddings',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# Vektoren in PyTorch: 1D-Tensoren
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])

# Addition: komponentenweise (Vektoraddition)
c = a + b   # tensor([5., 7., 9.])

# Skalarmultiplikation
d = 2.0 * a  # tensor([2., 4., 6.])

# L2-Norm: sqrt(sum(v_i^2))
norm_a = torch.norm(a)  # = sqrt(1+4+9) = sqrt(14) ≈ 3.742

# Normalisierung: v / ||v||
a_normalized = a / norm_a  # Länge 1
print(f"Länge normalisiert: {torch.norm(a_normalized):.4f}")  # 1.0000

# Embedding-Schicht: Wort-Index → Vektor
vocab_size = 10000
embed_dim = 64
embedding = nn.Embedding(vocab_size, embed_dim)

# Token-Index 42 → 64-dimensionaler Embedding-Vektor
token_id = torch.tensor(42)
embed_vec = embedding(token_id)  # Shape: (64,) — ein Vektor in R^64
print(f"Embedding-Shape: {embed_vec.shape}")`,
      annotation: '`torch.norm(a)` berechnet $\\|a\\|_2 = \\sqrt{\\sum a_i^2}$ (Standard-Norm). `nn.Embedding` ist eine Lookup-Tabelle: jeder Token-Index wird auf einen gelernten Vektor in $\\mathbb{R}^{\\text{embed\\_dim}}$ abgebildet. Division durch die Norm ergibt den Einheitsvektor — dasselbe wie $\\hat{v} = \\vec{v} / \\|\\vec{v}\\|$.',
    },
  ],

  derivations: [
    {
      claim: 'Normalisierung ergibt immer Länge 1',
      reasoning:
        'Berechne $\\|\\hat{v}\\|$ mit $\\hat{v} = \\vec{v}/\\|\\vec{v}\\|$: $\\|\\hat{v}\\| = \\|\\vec{v}/\\|\\vec{v}\\|\\;\\| = \\frac{1}{\\|\\vec{v}\\|} \\cdot \\|\\vec{v}\\| = 1$. Der Skalar $\\frac{1}{\\|\\vec{v}\\|}$ kann aus der Norm herausgezogen werden (Homogenität der Norm: $\\|c\\vec{v}\\| = |c| \\cdot \\|\\vec{v}\\|$).',
    },
  ],

  commonMistakes: [
    {
      wrong: '$(2, 3) + (1, 4) = (3, 12)$',
      correct: '$(2, 3) + (1, 4) = (3, 7)$',
      explanation:
        'Vektoren werden **komponentenweise addiert**, nicht multipliziert. $2+1 = 3$, $3+4 = 7$.',
    },
    {
      wrong: '$\\|(3, 4)\\| = 3 + 4 = 7$',
      correct: '$\\|(3, 4)\\| = \\sqrt{3^2 + 4^2} = 5$',
      explanation:
        'Die Norm ist **nicht** die Summe der Komponenten, sondern der Pythagoras: Quadrieren, summieren, Wurzel ziehen.',
    },
    {
      wrong: 'Ein Vektor in $\\mathbb{R}^{100}$ ist schwieriger zu berechnen als in $\\mathbb{R}^2$',
      correct: 'Alle Operationen funktionieren komponentenweise — gleiche Regeln, mehr Komponenten',
      explanation:
        'Vektoraddition, Skalarmultiplikation und Norm funktionieren in jeder Dimension gleich. Ein 100-dimensionaler Vektor ist nur eine längere Liste.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Vectors, what even are they?" (Essence of Linear Algebra, Video)',
      type: 'video',
      note: 'Die beste visuelle Einführung in Vektoren — 9 Minuten, unbedingt anschauen',
    },
    {
      title: 'The Illustrated Word2Vec — Jay Alammar',
      type: 'article',
      note: 'Zeigt anschaulich, wie Wörter als Vektoren dargestellt werden und warum das funktioniert',
    },
    {
      title: 'Serlo: "Vektoren in der Ebene"',
      type: 'article',
      note: 'Deutsche Einführung mit interaktiven Aufgaben',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.skalarprodukt',
      relation: 'extends',
      hint: 'Das Skalarprodukt misst den Winkel zwischen zwei Vektoren — Grundlage für Cosine-Similarity.',
    },
    {
      lessonId: 'p0.potenzen-wurzeln',
      relation: 'requires',
      hint: 'Die L2-Norm $\\|\\vec{v}\\| = \\sqrt{\\sum v_i^2}$ nutzt Potenzen und Wurzeln.',
    },
    {
      lessonId: 'p1.vektoren-formal',
      relation: 'extends',
      hint: 'Phase 1 formalisiert Vektoren als Elemente von Vektorräumen mit Basen und linearer Unabhängigkeit.',
    },
    {
      lessonId: 'p1.matrizen-lineare-abbildungen',
      relation: 'see-also',
      hint: 'Matrizen transformieren Vektoren — Vektoren sind das Eingabe-/Ausgabe-Objekt aller linearen Abbildungen.',
    },
  ],

  reflection: 'Du hast gelernt: **Vektoren** sind das universelle Grundobjekt des ML. Ob Bild, Text oder Tabellendaten — alles wird als Vektor dargestellt, bevor das Modell damit rechnet. Die Norm misst Länge, die Normalisierung schafft Vergleichbarkeit. Welche Anwendung hat dich am meisten überrascht?',
}
