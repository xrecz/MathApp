import type { Lesson } from '../../../types'

export const partielleAbleitungenGradient: Lesson = {
  id: 'p1.partielle-ableitungen-gradient',
  title: 'Partielle Ableitungen & Gradient',
  conceptTags: ['partial-derivative', 'gradient', 'steepest-ascent', 'gradient-descent'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Partielle Ableitung — eine Variable gleichzeitig\n\n$\\frac{\\partial f}{\\partial x_i}$: leite $f$ nach $x_i$ ab, alle anderen Variablen bleiben **konstant**.\n\n**Gradient** $\\nabla f$ versammelt alle partiellen Ableitungen in einem Vektor:\n\n$\\nabla f(x) = \\left(\\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_n}\\right)$\n\n$\\nabla f$ zeigt in Richtung des **steilsten Anstiegs**.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-70 -70 140 140" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="55" fill="none" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="0" cy="0" r="40" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.4"/>
          <circle cx="0" cy="0" r="25" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.6"/>
          <circle cx="0" cy="0" r="10" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.9"/>
          <line x1="-65" y1="0" x2="65" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-65" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <circle cx="30" cy="-20" r="3" fill="#ef4444"/>
          <line x1="30" y1="-20" x2="54" y2="-36" stroke="#ef4444" stroke-width="2"
                marker-end="url(#grad-arrow)"/>
          <defs>
            <marker id="grad-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/>
            </marker>
          </defs>
          <text x="56" y="-33" fill="#ef4444" font-size="8">∇f</text>
          <text x="32" y="-8" fill="#374151" font-size="7">(30,−20)</text>
          <text x="-65" y="75" fill="#9ca3af" font-size="7">Gradient zeigt radial nach außen (weg vom Minimum)</text>
        </svg>`,
        caption: 'Gradient ∇f von f(x,y)=x²+y² am Punkt (30,−20): zeigt radial nach außen = Richtung steilsten Anstiegs',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gradient Descent: $w \\leftarrow w - \\eta \\nabla L$. Der negative Gradient zeigt bergab — genau das ist der Update-Schritt.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Partielle Ableitung — Technik\n\nAlles außer der Ableitungsvariable wird als Konstante behandelt.\n\n$f(x, y) = x^2 + 3xy + y^2$:\n\n$\\frac{\\partial f}{\\partial x} = 2x + 3y \\quad$ (y als Konstante: $3y$ bleibt, $y^2$ verschwindet)\n\n$\\frac{\\partial f}{\\partial y} = 3x + 2y \\quad$ (x als Konstante: $x^2$ verschwindet, $3x$ bleibt)\n\n$\\nabla f(1, 1) = (2 + 3, 3 + 2) = (5, 5)$\n\n### Geometrische Bedeutung\n\n$\\nabla f$ zeigt in Richtung **steilsten Anstiegs**. $-\\nabla f$ zeigt **steilsten Abstieg** — das ist Gradient Descent.',
      },
      {
        kind: 'worked-example',
        content:
          '**Gradient-Descent-Schritt**:\n\n$f(x, y) = x^2 + y^2$, Startpunkt $(3, 4)$, Lernrate $\\eta = 0{,}1$.\n\n$\\nabla f(3,4) = (2 \\cdot 3, 2 \\cdot 4) = (6, 8)$\n\nUpdate: $(x, y) \\leftarrow (3, 4) - 0{,}1 \\cdot (6, 8) = (3 - 0{,}6, 4 - 0{,}8) = (2{,}4, 3{,}2)$\n\n$f(2{,}4, 3{,}2) = 5{,}76 + 10{,}24 = 16 < f(3,4) = 25$ ✓ — Loss gesunken!',
      },
    ],
    practice: [
      {
        id: 'p1.grad.ex1',
        difficulty: 1,
        conceptTags: ['partial-derivative'],
        type: 'mc',
        prompt: '$f(x, y) = x^2 + y^2$. $\\frac{\\partial f}{\\partial x} = ?$',
        options: ['$2x$', '$2y$', '$2x + 2y$', '$x^2$'],
        answer: '$2x$',
        hints: [
          'Nach $x$ ableiten, $y$ als Konstante behandeln.',
          '$(x^2)\' = 2x$, $(y^2)\' = 0$ (da $y$ konstant).',
          '$\\frac{\\partial f}{\\partial x} = 2x$.',
        ],
        explanation: '$\\frac{\\partial}{\\partial x}(x^2 + y^2) = 2x + 0 = 2x$. Das $y^2$ verschwindet, weil $y$ als Konstante gilt.',
      },
      {
        id: 'p1.grad.ex2',
        difficulty: 2,
        conceptTags: ['gradient'],
        type: 'mc',
        prompt: 'Gradient von $f(x, y) = x^2 + y^2$?',
        options: ['$(2x, 2y)$', '$(x^2, y^2)$', '$(2, 2)$', '$(x, y)$'],
        answer: '$(2x, 2y)$',
        hints: [
          '$\\nabla f = (\\partial f/\\partial x, \\partial f/\\partial y)$.',
          '$\\partial f/\\partial x = 2x$, $\\partial f/\\partial y = 2y$.',
          '$\\nabla f = (2x, 2y)$.',
        ],
        explanation: '$\\nabla f(x,y) = (2x, 2y)$. Am Punkt $(3,4)$: $\\nabla f = (6, 8)$ — zeigt radial nach außen vom Ursprung (wo das Minimum liegt).',
      },
      {
        id: 'p1.grad.ex3',
        difficulty: 2,
        conceptTags: ['partial-derivative'],
        type: 'numeric',
        prompt: '$f(x, y) = 3x + 4y$. $\\frac{\\partial f}{\\partial y} = ?$',
        answer: 4,
        hints: [
          'Nach $y$ ableiten, $x$ als Konstante.',
          '$(3x)\' = 0$ (Konstante bzgl. $y$). $(4y)\' = 4$.',
          '$\\frac{\\partial f}{\\partial y} = 4$.',
        ],
        explanation: '$\\frac{\\partial}{\\partial y}(3x + 4y) = 4$. Bei linearen Funktionen: die partielle Ableitung ist der jeweilige Koeffizient.',
      },
      {
        id: 'p1.grad.ex4',
        difficulty: 3,
        conceptTags: ['gradient'],
        type: 'numeric',
        prompt:
          '$\\nabla f(1, 1)$ für $f(x,y) = x^2 + y^2$ — erste Komponente?',
        answer: 2,
        hints: [
          '$\\nabla f = (2x, 2y)$.',
          'Bei $(x,y) = (1,1)$: erste Komponente $= 2 \\cdot 1$.',
          '$= 2$.',
        ],
        explanation: '$\\nabla f(1,1) = (2 \\cdot 1, 2 \\cdot 1) = (2, 2)$. Der Gradient zeigt diagonal nach außen.',
      },
      {
        id: 'p1.grad.ex5',
        difficulty: 3,
        conceptTags: ['steepest-ascent'],
        type: 'mc',
        prompt: 'In welche Richtung zeigt $\\nabla f$?',
        options: [
          'Richtung steilsten Anstiegs',
          'Richtung steilsten Abstiegs',
          'Parallel zur nächsten Höhenlinie',
          'In Richtung des Minimums',
        ],
        answer: 'Richtung steilsten Anstiegs',
        hints: [
          'Gradient Descent geht in Richtung $-\\nabla f$.',
          'Wenn $-\\nabla f$ bergab führt, muss $+\\nabla f$ bergauf führen.',
          'Gradient = Richtung steilsten **Anstiegs**.',
        ],
        explanation: '$\\nabla f$ zeigt in Richtung steilsten **Anstiegs**. Deshalb ist der Gradient-Descent-Update $-\\nabla f$ — entgegen dem Gradient, bergab.',
      },
      {
        id: 'p1.grad.ex6',
        difficulty: 4,
        conceptTags: ['gradient-descent'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Gradient-Descent-Update-Formel?',
        options: [
          '$w \\leftarrow w - \\eta \\nabla L$',
          '$w \\leftarrow w + \\eta \\nabla L$',
          '$w \\leftarrow w - \\eta L$',
          '$w \\leftarrow \\eta \\nabla L$',
        ],
        answer: '$w \\leftarrow w - \\eta \\nabla L$',
        hints: [
          'Gradient zeigt bergauf → wir gehen in die **Gegenrichtung** bergab.',
          'Lernrate $\\eta > 0$ skaliert den Schritt.',
          'Minus-Zeichen ist entscheidend!',
        ],
        explanation: '$w \\leftarrow w - \\eta \\nabla L$: der negative Gradient zeigt bergab. Lernrate $\\eta$ kontrolliert Schrittgröße.',
      },
      {
        id: 'p1.grad.ex7',
        difficulty: 4,
        conceptTags: ['gradient-descent'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: $L(w_1, w_2) = w_1^2 + w_2^2$ bei $(2, 3)$, Lernrate $\\eta = 0{,}1$. Wert von $w_1$ nach einem Update?',
        answer: 1.6,
        acceptedAlternatives: ['1,6'],
        hints: [
          '$\\nabla L = (2w_1, 2w_2) = (4, 6)$ bei $(2,3)$.',
          'Update $w_1$: $2 - 0{,}1 \\cdot 4 = 2 - 0{,}4$.',
          '$= 1{,}6$.',
        ],
        explanation: '$\\nabla L(2,3) = (4, 6)$. Update: $w_1 \\leftarrow 2 - 0{,}1 \\cdot 4 = 1{,}6$, $w_2 \\leftarrow 3 - 0{,}1 \\cdot 6 = 2{,}4$. Neuer Loss: $1{,}6^2 + 2{,}4^2 = 2{,}56 + 5{,}76 = 8{,}32 < 13$ ✓.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gradient Descent — der Kernalgorithmus des ML\n\nIn jedem Training-Schritt:\n\n1. **Forward Pass**: Berechne $L = $ Loss$(w)$\n2. **Backward Pass**: Berechne $\\nabla_w L$ für alle Parameter $w$ (via Backpropagation)\n3. **Update**: $w \\leftarrow w - \\eta \\nabla_w L$\n4. Wiederhole für jede Mini-Batch\n\nFür GPT-4 (spekulativ ~1T Parameter): Schritt 2 berechnet $\\nabla L \\in \\mathbb{R}^{10^{12}}$ — jede Komponente ist eine partielle Ableitung. Das passiert tausende Male pro Sekunde auf GPU-Clustern.',
      },
      {
        kind: 'callout',
        content:
          'Der Gradient steht **senkrecht** auf den Höhenlinien (Level-Sets). Das ist der geometrische Kern: entlang einer Höhenlinie ändert sich $f$ nicht. Der steilste Abstieg muss deshalb orthogonal zur Höhenlinie verlaufen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.grad.card1',
      front: 'Definition partielle Ableitung?',
      back: '$\\partial f/\\partial x_i$: Ableitung nach $x_i$, alle anderen Variablen konstant.',
      conceptTags: ['partial-derivative'],
    },
    {
      id: 'p1.grad.card2',
      front: 'Definition Gradient?',
      back: '$\\nabla f = (\\partial f/\\partial x_1, \\dots, \\partial f/\\partial x_n)$ — Vektor aller partiellen Ableitungen.',
      conceptTags: ['gradient'],
    },
    {
      id: 'p1.grad.card3',
      front: 'Gradient-Descent-Update?',
      back: '$w \\leftarrow w - \\eta \\nabla L$ — entgegen dem Gradient bergab.',
      conceptTags: ['gradient-descent'],
    },
  ],
}
