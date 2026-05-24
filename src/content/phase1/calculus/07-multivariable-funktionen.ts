import type { Lesson } from '../../../types'

export const multivariableFunktionen: Lesson = {
  id: 'p1.multivariable-funktionen',
  title: 'Funktionen mehrerer Variablen',
  conceptTags: ['multivariable', 'level-set', 'contour', 'loss-landscape'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## $f: \\mathbb{R}^n \\to \\mathbb{R}$ — Funktion mehrerer Variablen\n\nEine Funktion $f(x_1, \\dots, x_n)$ nimmt einen Vektor $x \\in \\mathbb{R}^n$ entgegen und gibt eine reelle Zahl zurück.\n\n**Beispiel**: $f(x, y) = x^2 + y^2$ — der Abstand zum Ursprung im Quadrat.\n\nFür $n \\leq 2$ noch visualisierbar; für größere $n$ rein algebraisch behandelt.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-70 -70 140 140" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="0" cy="0" r="45" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.4"/>
          <circle cx="0" cy="0" r="30" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.6"/>
          <circle cx="0" cy="0" r="15" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.9"/>
          <circle cx="0" cy="0" r="4" fill="#6366f1"/>
          <line x1="-65" y1="0" x2="65" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-65" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <text x="16" y="-13" fill="#6366f1" font-size="8">f=1</text>
          <text x="31" y="-28" fill="#6366f1" font-size="8">f=4</text>
          <text x="46" y="-43" fill="#6366f1" font-size="8">f=9</text>
          <text x="48" y="10" fill="#374151" font-size="8">x</text>
          <text x="5" y="-55" fill="#374151" font-size="8">y</text>
          <text x="-65" y="75" fill="#9ca3af" font-size="7">Konturplot f(x,y)=x²+y²: konzentrische Kreise</text>
        </svg>`,
        caption: 'Konturplot von f(x,y) = x²+y²: Höhenlinien sind konzentrische Kreise um das Minimum bei (0,0)',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Eine Loss-Funktion mit $n$ Modell-Gewichten ist $L: \\mathbb{R}^n \\to \\mathbb{R}$. Für GPT-3 mit 175 Milliarden Parametern: $L: \\mathbb{R}^{175 \\times 10^9} \\to \\mathbb{R}$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Level-Sets (Höhenlinien)\n\nEin **Level-Set** zur Höhe $c$ ist die Menge $\\{(x,y) : f(x,y) = c\\}$.\n\nFür $f(x,y) = x^2 + y^2$: Level-Sets bei $c = 1, 4, 9$ sind Kreise mit Radius $1, 2, 3$.\n\nKonturplots zeigen diese Level-Sets in der 2D-Draufsicht — wie Höhenschichtlinien auf Landkarten.\n\n### Loss-Landschaft\n\nDie "Loss-Landschaft" ist der Graph von $L$ über dem Parameterraum. Gradient Descent navigiert diese Landschaft bergab. In $> 2D$ nicht visualisierbar — aber dieselbe Mathematik.',
      },
      {
        kind: 'worked-example',
        content:
          '**Drei Funktionen $\\mathbb{R}^2 \\to \\mathbb{R}$**:\n\n$f_1(x,y) = x^2 + y^2$ — Paraboloid, Minimum bei Ursprung\n\n$f_2(x,y) = xy$ — Sattel-Fläche, kein globales Minimum/Maximum\n\n$f_3(x,y) = \\sin(x) \\cos(y)$ — periodische Wellenlandschaft, viele lokale Extrema\n\n$f_3$ ist wie die Loss-Landschaft eines nicht-konvexen Netzes — viele lokale Minima.',
      },
    ],
    practice: [
      {
        id: 'p1.multi.ex1',
        difficulty: 1,
        conceptTags: ['multivariable'],
        type: 'numeric',
        prompt: '$f(x, y) = x^2 + y^2$, $f(3, 4) = ?$',
        answer: 25,
        hints: [
          'Einsetzen: $3^2 + 4^2 = ?$',
          '$9 + 16 = ?$',
          '$= 25$.',
        ],
        explanation: '$f(3,4) = 9 + 16 = 25$. Geometrisch: das Quadrat des Abstands von $(3,4)$ zum Ursprung.',
      },
      {
        id: 'p1.multi.ex2',
        difficulty: 2,
        conceptTags: ['level-set'],
        type: 'mc',
        prompt: 'Level-Sets von $f(x,y) = x^2 + y^2$ sind?',
        options: [
          'Konzentrische Kreise um den Ursprung',
          'Horizontale Geraden',
          'Parallele Geraden mit Steigung 1',
          'Parabeln',
        ],
        answer: 'Konzentrische Kreise um den Ursprung',
        hints: [
          '$f(x,y) = c$ bedeutet $x^2 + y^2 = c$.',
          'Das ist die Gleichung eines Kreises mit Radius $\\sqrt{c}$.',
          'Verschiedene $c$ → verschiedene Kreise mit gemeinsamem Mittelpunkt.',
        ],
        explanation: '$x^2 + y^2 = c$ definiert Kreise mit Radius $\\sqrt{c}$ — konzentrisch um den Ursprung.',
      },
      {
        id: 'p1.multi.ex3',
        difficulty: 2,
        conceptTags: ['multivariable'],
        type: 'numeric',
        prompt: '$f(x, y) = xy$, $f(2, 3) = ?$',
        answer: 6,
        hints: [
          'Einsetzen: $2 \\cdot 3 = ?$',
          '$= 6$.',
          'Einfaches Produkt.',
        ],
        explanation: '$f(2,3) = 2 \\cdot 3 = 6$.',
      },
      {
        id: 'p1.multi.ex4',
        difficulty: 3,
        conceptTags: ['contour'],
        type: 'mc',
        prompt: 'Welche Form hat ein 3D-Plot von $f(x,y) = x^2 + y^2$?',
        options: [
          'Paraboloid — Schale/Trichter nach oben, Minimum bei $(0,0,0)$',
          'Sattel — hat kein globales Minimum',
          'Ebene — linearer Anstieg',
          'Kugel — sphärische Oberfläche',
        ],
        answer: 'Paraboloid — Schale/Trichter nach oben, Minimum bei $(0,0,0)$',
        hints: [
          'Bei $(0,0)$: $f = 0$ — kleinster Wert.',
          'Je weiter vom Ursprung: $f$ wächst quadratisch.',
          'Rotationssymmetrische Schale = Paraboloid.',
        ],
        explanation: '$x^2 + y^2 \\geq 0$ mit Gleichheit nur bei $(0,0)$. Der 3D-Graph ist ein nach oben geöffnetes Paraboloid.',
      },
      {
        id: 'p1.multi.ex5',
        difficulty: 4,
        conceptTags: ['loss-landscape'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Die Loss-Funktion eines Netzes mit 1M Gewichten ist eine Funktion:',
        options: [
          '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}$',
          '$L: \\mathbb{R} \\to \\mathbb{R}^{1{,}000{,}000}$',
          '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}^{1{,}000{,}000}$',
          '$L: \\mathbb{R}^{1{,}000{,}000 \\times 1{,}000{,}000} \\to \\mathbb{R}$',
        ],
        answer: '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}$',
        hints: [
          'Input: alle Gewichte — ein Vektor im $\\mathbb{R}^n$.',
          'Output: ein Skalar (der Loss-Wert).',
          '$L: \\mathbb{R}^n \\to \\mathbb{R}$ mit $n = 1.000.000$.',
        ],
        explanation: '$L$ nimmt alle Gewichte (ein Punkt im $\\mathbb{R}^n$) und gibt eine Zahl (den Loss) zurück. Gradient Descent navigiert durch diesen $n$-dimensionalen Raum.',
      },
      {
        id: 'p1.multi.ex6',
        difficulty: 4,
        conceptTags: ['loss-landscape'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Konturplot der Loss-Landschaft — was zeigen die Höhenlinien?',
        options: [
          'Bereiche gleichen Loss-Werts',
          'Richtungen des Gradienten',
          'Punkte, an denen der Loss gleich 0 ist',
          'Lernkurven über die Zeit',
        ],
        answer: 'Bereiche gleichen Loss-Werts',
        hints: [
          'Höhenlinien / Level-Sets: $\\{w : L(w) = c\\}$ für verschiedene $c$.',
          'Analog zu Höhenschichtlinien auf einer Landkarte.',
          'Dicht liegende Linien → steiler Gradient; weite Linien → flacher Gradient.',
        ],
        explanation:
          'Konturlinien verbinden Punkte gleichen Loss-Werts. Gradient Descent bewegt sich orthogonal zu den Konturlinien bergab. Enge Kurven = steiler Hang; weite Kurven = flaches Gelände.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Die Loss-Landschaft\n\nDie Loss-Landschaft eines neuronalen Netzes ist eine hochdimensionale Funktion. Mathematische Forschung zeigt:\n\n- Viele lokale Minima, aber die meisten sind ähnlich gut (für hinreichend überparametrisierte Netze)\n- Sattelpunkte sind häufiger als lokale Maxima — "echte" Fallen sind selten\n- Gradient Descent endet typischerweise in "flachen" Regionen (großer Nullraum der Hessischen) — das korreliert mit guter Generalisierung\n\nAll das spielt sich in einem Raum ab, den wir nicht visualisieren können, aber dessen Mathematik direkt aus dieser Lektion folgt.',
      },
      {
        kind: 'callout',
        content:
          'Die "Loss-Landschaft"-Visualisierungen (z.B. das berühmte Bild von Li et al. 2018) sind Projektionen des hochdimensionalen Raums auf 2D — sie zeigen also nur einen winzigen Ausschnitt. Trotzdem geben sie intuitive Einsichten in Regularisierung und Batch-Größe.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.multi.card1',
      front: 'Notation für Funktion mehrerer Variablen?',
      back: '$f: \\mathbb{R}^n \\to \\mathbb{R}$ — nimmt Vektor, gibt Skalar.',
      conceptTags: ['multivariable'],
    },
    {
      id: 'p1.multi.card2',
      front: 'Was ist ein Level-Set?',
      back: 'Menge $\\{x : f(x) = c\\}$ — Bereich gleichen Funktionswerts.',
      conceptTags: ['level-set'],
    },
    {
      id: 'p1.multi.card3',
      front: 'Was ist die Loss-Landschaft?',
      back: 'Loss als Funktion aller Modell-Gewichte: $L: \\mathbb{R}^n \\to \\mathbb{R}$.',
      conceptTags: ['loss-landscape'],
    },
  ],

  learningOutcome:
    'Du verstehst Funktionen mehrerer Variablen als mehrdimensionale Gebirge, kannst Höhenlinien interpretieren, erkennst die Loss-Landschaft als hochdimensionale Funktion und verstehst warum Visualisierungen von ML-Modellen immer Projektionen sind.',

  description:
    'Multivariable Funktionen erweitern die Differentialrechnung von einer auf mehrere Variablen. In ML ist das der direkte Schritt vom 1D-Gradient auf den Gradient-Vektor und schließlich auf Backpropagation. Die Loss-Landschaft eines neuronalen Netzes ist eine Funktion von Millionen Variablen — deren Geometrie bestimmt, wie gut Gradient Descent konvergiert.',

  conceptSteps: [
    {
      title: 'Von einer zu mehreren Variablen: $f: \\mathbb{R}^n \\to \\mathbb{R}$',
      body: 'Eine Funktion $f: \\mathbb{R}^n \\to \\mathbb{R}$ nimmt einen Vektor $x = (x_1, \\ldots, x_n)$ als Eingabe und gibt eine reelle Zahl zurück. Beispiele: $f(x, y) = x^2 + y^2$ (Paraboloid), $f(x, y) = \\sin(x) \\cos(y)$ (Welle), $L(w_1, w_2) = $ MSE-Loss als Funktion zweier Gewichte. In ML: $L: \\mathbb{R}^n \\to \\mathbb{R}$ mit $n = $ Anzahl der Modell-Parameter.',
      preprompt: 'Wie unterscheidet sich eine Funktion $f(x, y)$ von $f(x)$?',
      miniExample:
        'Einfache Loss-Funktion: $L(w_1, w_2) = (w_1 - 2)^2 + (w_2 - 3)^2$. Minimum bei $(w_1, w_2) = (2, 3)$ mit $L = 0$. Die Loss-Landschaft ist ein 3D-Paraboloid — runder, einziger Trichter nach unten.',
      selfCheck: 'Wie viele Achsen hat die Loss-Landschaft eines Netzes mit 1000 Parametern?',
    },
    {
      title: 'Höhenlinien und Level-Sets: die 2D-Kartenansicht',
      body: 'Ein Level-Set (Höhenlinie) ist die Menge $\\{x \\in \\mathbb{R}^n : f(x) = c\\}$ für eine Konstante $c$. Für $f: \\mathbb{R}^2 \\to \\mathbb{R}$ sind Level-Sets Kurven in der Ebene — wie Höhenlinien auf einer topographischen Karte. Der Gradient $\\nabla f$ steht senkrecht auf diesen Höhenlinien und zeigt in Richtung stärkster Zunahme.',
      visual: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="background:rgb(17 24 39);border:1px solid rgb(55 65 81);border-radius:8px;padding:8px">
  <text x="10" y="20" fill="#9ca3af" font-size="11" font-family="monospace">L(w1,w2) = (w1-150)² + (w2-100)² — Höhenlinien</text>
  <ellipse cx="150" cy="100" rx="10" ry="8" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <ellipse cx="150" cy="100" rx="25" ry="20" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
  <ellipse cx="150" cy="100" rx="45" ry="36" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <ellipse cx="150" cy="100" rx="68" ry="54" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <ellipse cx="150" cy="100" rx="92" ry="74" fill="none" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="150" cy="100" r="4" fill="#34d399"/>
  <text x="158" y="96" fill="#34d399" font-size="9">Minimum</text>
  <!-- Gradient arrows (perpendicular to contours) -->
  <line x1="195" y1="100" x2="165" y2="100" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="150" y1="155" x2="150" y2="125" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="185" y1="135" x2="165" y2="118" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arr)"/>
  <defs>
    <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="#ffffff"/>
    </marker>
  </defs>
  <text x="200" y="130" fill="#9ca3af" font-size="9">∇L ⊥ Höhenlinien</text>
  <text x="200" y="145" fill="#9ca3af" font-size="9">GD folgt -∇L</text>
</svg>`,
      preprompt: 'Was zeigen Höhenlinien auf einer Landkarte, und wie übertragen wir das auf Loss-Funktionen?',
      miniExample:
        'Paraboloid $L(w_1, w_2) = w_1^2 + 4w_2^2$: elliptische Höhenlinien. Der Gradient zeigt radial nach außen, senkrecht zu den Ellipsen. GD-Schritt: bewegt sich entlang $-\\nabla L$ — durch die Ellipsen hindurch zum Zentrum.',
      selfCheck: 'Warum zeigt der Gradient immer senkrecht auf die Höhenlinien?',
    },
    {
      title: 'Graphen und Schnitte: 3D-Gebirge als Konzept',
      body: 'Den Graphen einer Funktion $f: \\mathbb{R}^2 \\to \\mathbb{R}$ kann man als Gebirge visualisieren: $(x, y, f(x, y))$ definiert eine Fläche im 3D-Raum. Schnitte durch das Gebirge (eine Variable konstant) sind 1D-Funktionen. Die partiellen Ableitungen sind Steigungen dieser Schnitte. Für $n > 2$: der Graph liegt in $(n+1)$-dimensionalem Raum — nicht visualisierbar, aber die Konzepte bleiben dieselben.',
      preprompt: 'Wie visualisiert man eine Funktion von zwei Variablen?',
      miniExample:
        'Loss-Landschaft von ResNet-56 (Li et al. 2018): projiziert auf 2D-Ebene sieht es glatt aus (ein Trichter). ResNet-110 ohne Skip Connections: chaotisch, viele Täler. Skip Connections "glätten" die Loss-Landschaft — das erklärt bessere Konvergenz.',
      selfCheck: 'Was bedeutet "flache Region" in der Loss-Landschaft für die Generalisierung?',
    },
    {
      title: 'Sattelpunkte: die häufigste Falle in hochdimensionaler Optimierung',
      body: 'Ein Sattelpunkt ist ein Punkt mit $\\nabla f(x^*) = 0$, aber weder Minimum noch Maximum. In 2D: ein Pass zwischen zwei Bergen. In hochdimensionaler Optimierung (ML) sind Sattelpunkte häufiger als echte lokale Minima: für einen zufälligen kritischen Punkt mit $\\nabla L = 0$ ist die Wahrscheinlichkeit, dass alle Eigenwerte der Hesse-Matrix positiv sind (= echtes Minimum), exponentiell klein in der Dimension. GD entkommt Sattelpunkten, da numerische Fehler asymmetrische Gradienten erzeugen.',
      preprompt: 'Wie unterscheidet sich ein Sattelpunkt von einem Minimum?',
      miniExample:
        '$f(x, y) = x^2 - y^2$: Gradient $(2x, -2y) = (0,0)$ bei $(0,0)$. In $x$-Richtung: Minimum. In $y$-Richtung: Maximum. Das ist ein Sattelpunkt. GD: wenn man leicht aus der Mitte gerät, läuft GD in $y$-Richtung weg.',
      selfCheck: 'Warum sind Sattelpunkte in hochdimensionaler Optimierung ein größeres Problem als lokale Minima?',
    },
    {
      title: 'Loss-Landschaft neuronaler Netze: hochdimensionale Realität',
      body: 'Die Loss-Landschaft $L: \\mathbb{R}^n \\to \\mathbb{R}$ eines neuronalen Netzes mit $n$ Parametern liegt in einem $(n+1)$-dimensionalen Raum. Typische $n$: GPT-2 (117M), LLaMA-7B (7 Milliarden). Erkenntnisse aus der Forschung: (1) viele ähnlich gute Minima ("Permutationssymmetrie"); (2) flache Minima generalisieren besser als scharfe; (3) SGD-Rauschen hilft, scharfe Minima zu verlassen; (4) Batch Normalization glättet die Landschaft.',
      preprompt: 'Was bedeutet "überparametrisiert" für die Struktur der Loss-Landschaft?',
      miniExample:
        'Flat vs. Sharp Minima: im flachen Minimum verändert sich der Loss kaum, wenn Gewichte leicht verschoben werden (gute Generalisierung). Im scharfen Minimum: kleine Verschiebungen → großer Loss-Anstieg (Overfitting). SGD mit großem Batch-Size tendiert zu scharfen Minima — ein Grund, warum kleine Batches oft besser generalisieren.',
      selfCheck: 'Warum kann man die Loss-Landschaft mit $10^9$ Parametern nicht wirklich visualisieren?',
    },
  ],

  codeBridges: [
    {
      title: 'Multivariable Funktionen, Höhenlinien und Gradient Descent in 2D',
      lang: 'python',
      code: `import torch
import numpy as np

# === Multivariable Funktion und ihr Gradient ===
def loss_2d(w1, w2):
    """L(w1, w2) = (w1-2)^2 + 4*(w2-3)^2 — Elliptisches Paraboloid"""
    return (w1 - 2)**2 + 4 * (w2 - 3)**2

# Gradient analytisch:
# ∂L/∂w1 = 2(w1-2), ∂L/∂w2 = 8(w2-3)
def grad_2d(w1, w2):
    return 2*(w1-2), 8*(w2-3)

# Mit Autograd:
w1 = torch.tensor(5.0, requires_grad=True)
w2 = torch.tensor(5.0, requires_grad=True)
L = loss_2d(w1, w2)
L.backward()
print(f"Gradient: (∂L/∂w1={w1.grad.item():.1f}, ∂L/∂w2={w2.grad.item():.1f})")
# Analytisch: (6, 16) — identisch

# === Gradient Descent in 2D ===
print("\\nGradient Descent auf elliptischem Paraboloid:")
print(f"{'t':>3}  {'w1':>6}  {'w2':>6}  {'L':>8}")
w1_val, w2_val = 5.0, 5.0
eta = 0.1

for t in range(15):
    g1, g2 = grad_2d(w1_val, w2_val)
    w1_val -= eta * g1  # GD-Update
    w2_val -= eta * g2
    L_val = loss_2d(w1_val, w2_val)
    if t % 3 == 0:
        print(f"{t:>3}  {w1_val:>6.3f}  {w2_val:>6.3f}  {L_val:>8.4f}")

print(f"Minimum bei (w1={w1_val:.4f}, w2={w2_val:.4f}), L={loss_2d(w1_val,w2_val):.6f}")
# Konvergiert gegen (2, 3)

# === Höhenlinie: Level-Set berechnen ===
# Welche (w1, w2) haben L = 4?
# (w1-2)^2 + 4*(w2-3)^2 = 4 → Ellipse mit Halbachsen a=2, b=1
t_vals = np.linspace(0, 2*np.pi, 100)
w1_curve = 2 + 2 * np.cos(t_vals)   # Halbachse 2 in w1-Richtung
w2_curve = 3 + 1 * np.sin(t_vals)   # Halbachse 1 in w2-Richtung
print(f"\\nHöhenlinie L=4: Ellipse mit Halbachsen 2 (w1) und 1 (w2)")
print(f"Gradient am Punkt (4, 3): {grad_2d(4, 3)} — senkrecht auf Ellipse!")`,
      annotation:
        'Der Gradient $(2(w_1-2), 8(w_2-3))$ zeigt radial nach außen und senkrecht auf die elliptischen Höhenlinien. Die Halbachse in $w_2$-Richtung ist halb so groß ($1$ statt $2$), weil der Koeffizient $4$ die Krümmung erhöht — GD konvergiert in $w_2$-Richtung viermal schneller.',
    },
  ],

  derivations: [
    {
      claim: 'Warum zeigt der Gradient senkrecht auf Höhenlinien',
      reasoning:
        'Eine Höhenlinie ist $\\{x : f(x) = c\\}$. Sei $\\gamma(t)$ eine Kurve auf der Höhenlinie: $f(\\gamma(t)) = c$ für alle $t$. Ableitung nach $t$: $\\frac{d}{dt}f(\\gamma(t)) = \\nabla f(\\gamma(t)) \\cdot \\gamma\'(t) = 0$. Das bedeutet: $\\nabla f$ ist orthogonal zu jedem Tangentialvektor $\\gamma\'(t)$ der Höhenlinie. Also steht $\\nabla f$ senkrecht auf der Höhenlinie — für beliebige mehrdimensionale Funktionen.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Die Loss-Landschaft ist ein 3D-Gebirge (wie man es visualisiert).',
      correct: 'Die Loss-Landschaft hat $n+1$ Dimensionen ($n$ = Parameteranzahl + Loss). Visualisierungen sind immer 2D-Projektionen.',
      explanation:
        'Visualisierungen zeigen nur einen Bruchteil der wahren Geometrie. Bei $10^9$ Parametern ist der Raum $10^9$-dimensional — völlig jenseits menschlicher Vorstellungskraft.',
    },
    {
      wrong: 'Gradient Descent findet immer das globale Minimum.',
      correct: 'GD findet ein lokales Minimum oder Sattelpunkt — nur für konvexe Funktionen ist das globale Minimum garantiert.',
      explanation:
        'Für neuronale Netze ist die Loss-Landschaft nichtkonvex mit vielen lokalen Minima. In der Praxis sind die meisten lokalen Minima ähnlich gut (Permutationssymmetrie, Überparametrisierung).',
    },
    {
      wrong: 'Ein Sattelpunkt stoppt Gradient Descent dauerhaft.',
      correct: 'GD "rutscht" durch Sattelpunkte, weil numerische Rauscheffekte asymmetrische Gradienten erzeugen.',
      explanation:
        'Sattelpunkte sind selten echte Stopppunkte. SGD-Rauschen (Mini-Batches) hilft besonders gut beim Entkommen — ein weiterer Vorteil gegenüber reinem (Full-Batch) GD.',
    },
  ],

  furtherResources: [
    {
      title: 'Li et al.: "Visualizing the Loss Landscape of Neural Nets" (2018)',
      type: 'article',
      note: 'Original-Paper mit 2D-Projektionen der Loss-Landschaft — zeigt den Effekt von Skip Connections auf die Konvergenz.',
    },
    {
      title: '3Blue1Brown: Multivariable Calculus — Visualizing multivariable functions (YouTube)',
      type: 'video',
      note: 'Intuitive Einführung in 3D-Graphen, Höhenlinien und partiellen Ableitungen mit herausragenden Animationen.',
    },
    {
      title: 'Khan Academy: Multivariable Calculus',
      type: 'exercise',
      note: 'Strukturierter Kurs mit visuellen Übungen zu multivariablen Funktionen und Höhenlinien.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.ableitung-konzept', relation: 'requires', hint: 'Partielle Ableitungen sind Ableitungen von 1D-Schnitten durch die multivariable Funktion.' },
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'extends', hint: 'Partielle Ableitungen und Gradient: die Werkzeuge für multivariable Differentialrechnung.' },
    { lessonId: 'p1.extrema-taylor', relation: 'extends', hint: 'Extrema-Bedingungen verallgemeinern sich auf $\\nabla f = 0$ im Mehrdimensionalen.' },
    { lessonId: 'p1.jacobi-hesse', relation: 'see-also', hint: 'Hesse-Matrix beschreibt die Krümmung der multivariablen Funktion.' },
  ],

  reflection: 'Flache Minima generalisieren besser als scharfe Minima — aber warum? Was sagt die Geometrie der Loss-Landschaft über das Modell aus? Und warum könnte das erklären, warum viele unterschiedliche Initialisierungen am Ende zu ähnlich guten Modellen führen?',
}
