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

  learningOutcome:
    'Du kannst partielle Ableitungen berechnen, den Gradient-Vektor aufstellen und geometrisch interpretieren, und einen vollständigen Gradient-Descent-Loop in PyTorch implementieren.',

  description:
    'Partielle Ableitungen verallgemeinern die Ableitung auf Funktionen mehrerer Variablen: man leitet nach einer Variable ab und hält alle anderen fest. Der Gradient sammelt alle partiellen Ableitungen in einem Vektor — er zeigt in Richtung stärkster Zunahme. In ML: der Gradient des Loss bezüglich aller Parameter ist das Herzstück von Backpropagation und Gradient Descent.',

  conceptSteps: [
    {
      title: 'Partielle Ableitung: eine Variable, andere einfrieren',
      body: 'Die partielle Ableitung $\\frac{\\partial f}{\\partial x_i}(x)$ ist die Ableitung von $f$ nach $x_i$, wobei alle anderen Variablen konstant gehalten werden. Rezept: behandle alle anderen Variablen als Konstanten und leite nach $x_i$ ab — genau wie im 1D-Fall. Notation: $\\partial$ statt $d$ (Curly-d), um zu signalisieren "partiell".',
      preprompt: 'Wie unterscheidet sich die partielle Ableitung von der gewöhnlichen Ableitung?',
      miniExample:
        '$f(x, y) = x^2 y + 3xy^2$. $\\frac{\\partial f}{\\partial x} = 2xy + 3y^2$ (behandle $y$ als Konstante). $\\frac{\\partial f}{\\partial y} = x^2 + 6xy$ (behandle $x$ als Konstante).',
      selfCheck: 'Berechne $\\frac{\\partial}{{\\partial w_2}}[(w_1 x_1 + w_2 x_2 - y)^2]$.',
    },
    {
      title: 'Gradient: alle partiellen Ableitungen als Vektor',
      body: 'Der Gradient $\\nabla f(x) = \\left(\\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\ldots, \\frac{\\partial f}{\\partial x_n}\\right)$ ist der Vektor aller partiellen Ableitungen. Er zeigt in die Richtung stärkster Zunahme von $f$ im Punkt $x$. Der Betrag $\\|\\nabla f(x)\\|$ gibt an, wie steil der Anstieg ist. In ML: $\\nabla_w L$ ist der Gradient des Loss bezüglich aller Parameter — das ist, was Backprop berechnet.',
      preprompt: 'Wie hängen partielle Ableitungen und der Gradient zusammen?',
      miniExample:
        '$L(w_1, w_2) = (w_1-2)^2 + (w_2-3)^2$. $\\nabla L = (2(w_1-2), 2(w_2-3))$. Bei $(w_1, w_2) = (3, 4)$: $\\nabla L = (2, 2)$ — zeigt weg vom Minimum $(2, 3)$, Betrag $\\|\\nabla L\\| = 2\\sqrt{2} \\approx 2{,}83$.',
      selfCheck: 'Warum zeigt der Gradient immer in Richtung stärkster Zunahme, nicht Abnahme?',
    },
    {
      title: 'Gradient Descent: immer entgegen dem Gradient bergab',
      body: 'Update-Regel: $w \\leftarrow w - \\eta \\nabla L(w)$. Das $\\eta > 0$ (Lernrate) bestimmt die Schrittgröße. Intuition: $\\nabla L$ zeigt bergauf; $-\\nabla L$ zeigt bergab. Der Schritt $-\\eta \\nabla L$ ist ein kleiner Schritt bergab. Konvergenz: für konvexe $L$ und hinreichend kleines $\\eta$ konvergiert GD gegen das globale Minimum. Für neuronale Netze: lokale Minima oder Sattelpunkte.',
      preprompt: 'Was passiert, wenn die Lernrate zu groß oder zu klein ist?',
      miniExample:
        'MSE-Loss lineare Regression: $L(w) = \\frac{1}{n}\\|Xw - y\\|^2$. $\\nabla_w L = \\frac{2}{n} X^T(Xw - y)$. Update: $w \\leftarrow w - \\eta \\cdot \\frac{2}{n} X^T(Xw - y)$. Das ist Gradient Descent für lineare Regression — analytische Lösung ist $w^* = (X^TX)^{-1}X^Ty$.',
      selfCheck: 'Was bedeutet $\\nabla L(w^*) = 0$ für den Trainingsfortschritt?',
    },
    {
      title: 'Richtungsableitung: Ableitung in beliebiger Richtung',
      body: 'Die Richtungsableitung $D_v f(x) = \\nabla f(x) \\cdot v$ (für einen Einheitsvektor $v$) gibt an, wie stark $f$ sich ändert, wenn man sich in Richtung $v$ bewegt. Maximiert über alle $v$: $\\max_{\\|v\\|=1} D_v f = \\|\\nabla f\\|$, erreicht für $v = \\nabla f / \\|\\nabla f\\|$. Das beweist: der Gradient zeigt in Richtung stärkster Zunahme.',
      preprompt: 'Was bedeutet die Richtungsableitung geometrisch?',
      miniExample:
        '$f(x, y) = x^2 + y^2$, Punkt $(1, 1)$. $\\nabla f = (2, 2)$. In Richtung $v = (1,0)$: $D_v f = 2$. In Richtung $v = (0,1)$: $D_v f = 2$. In Richtung $v = (1,1)/\\sqrt{2}$: $D_v f = (2,2) \\cdot (1,1)/\\sqrt{2} = 4/\\sqrt{2} = 2\\sqrt{2} \\approx 2{,}83$ — maximal.',
      selfCheck: 'In welche Richtung sinkt $f$ am steilsten?',
    },
    {
      title: 'Gradient in der Praxis: PyTorch Autograd',
      body: 'In PyTorch berechnet `loss.backward()` den Gradienten $\\nabla_w L$ für alle Parameter mit `requires_grad=True`. Die Gradienten werden in `param.grad` gespeichert. Der Standard-GD-Update: `param.data -= lr * param.grad`. In der Praxis: Optimizer-Klassen (`torch.optim.SGD`, `Adam`) übernehmen das Update. `optimizer.step()` = ein GD-Schritt. `optimizer.zero_grad()` = Gradienten zurücksetzen (Akkumulierung verhindern).',
      preprompt: 'Warum muss man Gradienten vor jedem `backward()`-Aufruf zurücksetzen?',
      miniExample:
        '```python\nfor batch_x, batch_y in dataloader:\n    optimizer.zero_grad()   # Gradienten nullen\n    pred = model(batch_x)   # Forward Pass\n    loss = criterion(pred, batch_y)  # Loss berechnen\n    loss.backward()         # Gradienten berechnen\n    optimizer.step()        # GD-Update\n```',
      selfCheck: 'Was passiert, wenn man `optimizer.zero_grad()` vergisst?',
    },
  ],

  codeBridges: [
    {
      title: 'Partielle Ableitungen, Gradient und vollständiger GD-Training-Loop in PyTorch',
      lang: 'python',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

# === Partielle Ableitungen via Autograd ===
# f(x, y) = x^2 * y + 3*x*y^2
x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(1.0, requires_grad=True)
f = x**2 * y + 3 * x * y**2
f.backward()
# ∂f/∂x = 2xy + 3y^2, bei (2,1): 2*2*1 + 3*1 = 7
# ∂f/∂y = x^2 + 6xy, bei (2,1): 4 + 12 = 16
print(f"∂f/∂x = {x.grad.item()} (analytisch: 7)")
print(f"∂f/∂y = {y.grad.item()} (analytisch: 16)")

# === Gradient-Vektor: Loss lineare Regression ===
# L(w) = (1/n) * ||Xw - y||^2, Gradient: (2/n) * X^T(Xw - y)
torch.manual_seed(42)
n, d = 50, 3
X = torch.randn(n, d)    # (50, 3) Datenpunkte
w_true = torch.tensor([1.0, -2.0, 0.5])
y_data = X @ w_true + 0.1 * torch.randn(n)  # Zieldaten

w = torch.zeros(d, requires_grad=True)  # Startgewichte

# Manueller Gradient
with torch.no_grad():
    pred = X @ w
    grad_manual = 2/n * X.T @ (pred - y_data)
    print(f"\\nGradient ∇L (manuell): {grad_manual.numpy().round(4)}")

# Autograd-Gradient
loss = ((X @ w - y_data)**2).mean()
loss.backward()
print(f"Gradient ∇L (autograd): {w.grad.numpy().round(4)}")  # Identisch!

# === Vollständiger GD-Training-Loop ===
print("\\nGradient Descent Training (lineare Regression):")
w = nn.Parameter(torch.zeros(d))  # Trainierbare Parameter
optimizer = optim.SGD([w], lr=0.1)

for epoch in range(50):
    optimizer.zero_grad()           # Gradienten zurücksetzen
    pred = X @ w                    # Forward Pass
    loss = ((pred - y_data)**2).mean()  # MSE-Loss
    loss.backward()                 # Backward Pass: ∇_w L
    optimizer.step()                # GD-Update: w -= η * ∇L

    if epoch % 10 == 0:
        print(f"  Epoch {epoch:2d}: Loss={loss.item():.4f}, w={w.data.numpy().round(3)}")

print(f"\\nZielgewichte:  {w_true.numpy()}")
print(f"Gelernte:      {w.data.numpy().round(3)}")`,
      annotation:
        'Der manuelle und Autograd-Gradient sind identisch — Autograd implementiert exakt die analytische partielle Ableitung. Der Training-Loop zeigt das Standard-Muster: `zero_grad → forward → backward → step`. Mit `optim.SGD` berechnet `.step()` das Update $w \\leftarrow w - \\eta \\nabla L$.',
    },
  ],

  derivations: [
    {
      claim: 'Gradient des MSE-Loss für lineare Regression: $\\nabla_w L = \\frac{2}{n}X^T(Xw - y)$',
      reasoning:
        '$L(w) = \\frac{1}{n}\\|Xw - y\\|^2 = \\frac{1}{n}(Xw-y)^T(Xw-y)$. Expandieren: $= \\frac{1}{n}(w^TX^TXw - 2y^TXw + y^Ty)$. Gradient: $\\nabla_w L = \\frac{2}{n}(X^TXw - X^Ty) = \\frac{2}{n}X^T(Xw - y)$. Bei $\\nabla_w L = 0$: Normalengleichung $X^TXw = X^Ty$ → analytische Lösung $w^* = (X^TX)^{-1}X^Ty$. GD approximiert diese Lösung iterativ.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Partielle Ableitung nach $x$ berücksichtigt auch Terme, die nur $y$ enthalten.',
      correct: 'Bei der partiellen Ableitung nach $x$ werden alle anderen Variablen als Konstanten behandelt — Terme nur in $y$ haben Ableitung $0$ nach $x$.',
      explanation:
        'Beispiel: $\\frac{\\partial}{{\\partial x}}(x^2 + y^2) = 2x$ — der Term $y^2$ fällt weg, weil $y$ als Konstante gilt.',
    },
    {
      wrong: '`optimizer.zero_grad()` muss nicht aufgerufen werden.',
      correct: 'PyTorch akkumuliert Gradienten standardmäßig. Immer `zero_grad()` vor `backward()` aufrufen, sonst addieren sich Gradienten über Schritte.',
      explanation:
        'Das ist eine Designentscheidung für Spezialanwendungen wie RNNs (wo Akkumulierung gewünscht ist). Im Standard-Training ist es ein Bug.',
    },
    {
      wrong: 'Der Gradient $\\nabla L$ zeigt in Richtung Minimum.',
      correct: 'Der Gradient zeigt in Richtung stärkster Zunahme. GD geht entgegen dem Gradienten: $w \\leftarrow w - \\eta \\nabla L$ (Minus!)',
      explanation:
        'Merkhilfe: wenn du bergab willst, gehst du in die Richtung, die am steilsten abfällt — das ist $-\\nabla L$, nicht $+\\nabla L$.',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: Partial Derivatives',
      type: 'exercise',
      note: 'Interaktive Einführung in partielle Ableitungen mit Visualisierungen und schrittweisen Übungsaufgaben.',
    },
    {
      title: 'PyTorch: Autograd Tutorial (official)',
      type: 'article',
      note: 'Offizielles Tutorial zu automatischem Differenzieren, Grad-Tape und vollständigem Training-Loop.',
    },
    {
      title: 'Sebastian Ruder: "An overview of gradient descent optimization algorithms"',
      type: 'article',
      note: 'Umfassender Überblick über GD-Varianten (SGD, Momentum, Adam, RMSprop) mit Intuition und Vergleich.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.multivariable-funktionen', relation: 'requires', hint: 'Partielle Ableitungen definieren sich auf multivariablen Funktionen.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'extends', hint: 'Backpropagation verallgemeinert den Gradienten auf geschachtelte Funktionen.' },
    { lessonId: 'p1.jacobi-hesse', relation: 'extends', hint: 'Jacobi-Matrix ist der Gradient für vektorwertige Funktionen; Hesse ist der Gradient des Gradienten.' },
    { lessonId: 'p1.extrema-taylor', relation: 'see-also', hint: 'Stationäre Punkte $\\nabla L = 0$ sind Kandidaten für Minima im Mehrdimensionalen.' },
  ],

  reflection: 'Der Gradient-Descent-Update $w \\leftarrow w - \\eta \\nabla L$ behandelt alle Parameter gleich (selbe Lernrate). Was ist die Schwäche davon? Und wie verbessert Adam das, indem er unterschiedliche effektive Lernraten pro Parameter verwendet?',
}
