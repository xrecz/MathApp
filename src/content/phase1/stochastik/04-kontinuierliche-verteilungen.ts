import type { Lesson } from '../../../types'

export const kontinuierlicheVerteilungen: Lesson = {
  id: 'p1.kontinuierliche-verteilungen',
  title: 'Kontinuierliche Verteilungen',
  conceptTags: ['normal-distribution', 'uniform', 'exponential', 'gaussian', 'pdf'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Wichtige stetige Verteilungen\n\n**Gleichverteilung** $\\text{Uniform}(a,b)$: $f(x) = \\frac{1}{b-a}$ für $x \\in [a,b]$.\n\n**Normalverteilung** $\\mathcal{N}(\\mu, \\sigma^2)$: Gaußglocke\n$$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}\\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)$$\n\n**Exponentialverteilung** $\\text{Exp}(\\lambda)$: $f(x) = \\lambda e^{-\\lambda x}$ für $x \\geq 0$.',
      },
      {
        kind: 'math',
        content:
          '<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px">\n  <text x="5" y="13" font-size="10" fill="#6366f1">N(0,1) — Gaußglocke</text>\n  <line x1="10" y1="100" x2="310" y2="100" stroke="#888" stroke-width="1"/>\n  <line x1="160" y1="100" x2="160" y2="10" stroke="#888" stroke-width="0.5" stroke-dasharray="4,2"/>\n  <path d="M10,99 C30,98 50,95 70,85 C90,72 110,45 130,22 C145,8 155,4 160,4 C165,4 175,8 190,22 C210,45 230,72 250,85 C270,95 290,98 310,99" stroke="#6366f1" stroke-width="2.5" fill="none"/>\n  <text x="152" y="115" font-size="9" fill="#888">μ=0</text>\n  <text x="80" y="115" font-size="9" fill="#888">-2σ</text>\n  <text x="115" y="115" font-size="9" fill="#888">-σ</text>\n  <text x="195" y="115" font-size="9" fill="#888">+σ</text>\n  <text x="225" y="115" font-size="9" fill="#888">+2σ</text>\n  <line x1="110" y1="100" x2="110" y2="38" stroke="#10b981" stroke-width="0.8" stroke-dasharray="3,2"/>\n  <line x1="210" y1="100" x2="210" y2="38" stroke="#10b981" stroke-width="0.8" stroke-dasharray="3,2"/>\n  <text x="105" y="33" font-size="8" fill="#10b981">68%</text>\n</svg>',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gewichts-Initialisierung $w \\sim \\mathcal{N}(0, \\sigma^2)$ oder $\\text{Uniform}(-r, r)$. Batch Normalization standardisiert auf $\\mathcal{N}(0,1)$. Die Normalverteilung ist Annahme hinter MSE-Loss und L2-Regularisierung (Gauß-Prior → MAP ≡ L2, Lektion 10).',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Standardnormalverteilung $\\mathcal{N}(0,1)$\n\n68-95-99,7-Regel:\n- $P(\\mu - \\sigma \\leq X \\leq \\mu + \\sigma) \\approx 68\\%$\n- $P(\\mu - 2\\sigma \\leq X \\leq \\mu + 2\\sigma) \\approx 95\\%$\n- $P(\\mu - 3\\sigma \\leq X \\leq \\mu + 3\\sigma) \\approx 99{,}7\\%$\n\n### Standardisierung\n\n$X \\sim \\mathcal{N}(\\mu, \\sigma^2)$ → $Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0,1)$\n\n**Batch Norm**: genau das! $\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$\n\n### Xavier-Initialisierung\n\n$w \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in}+n_{out}}\\right)$ — skaliert Varianz nach Schichtgröße, verhindert Vanishing/Exploding Gradients.',
      },
      {
        kind: 'worked-example',
        content:
          '**Gleichverteilung für Data Augmentation**:\n\nZufällige Rotation $\\theta \\sim \\text{Uniform}(-15°, 15°)$:\n\n$f(\\theta) = \\frac{1}{30}$ für $\\theta \\in [-15°, 15°]$.\n\n$E[\\theta] = 0°$ (kein systematischer Bias).\n\n$\\text{Var}(\\theta) = \\frac{(b-a)^2}{12} = \\frac{30^2}{12} = 75°^2$, $\\text{SD} \\approx 8{,}66°$.',
      },
    ],
    practice: [
      {
        id: 'p1.kv.ex1',
        difficulty: 1,
        conceptTags: ['normal-distribution'],
        type: 'mc',
        prompt: 'Wie viel Prozent der Werte einer $\\mathcal{N}(\\mu, \\sigma^2)$ liegen im Intervall $[\\mu-\\sigma, \\mu+\\sigma]$?',
        options: ['$\\approx 68\\%$', '$\\approx 95\\%$', '$\\approx 50\\%$', '$100\\%$'],
        answer: '$\\approx 68\\%$',
        hints: [
          '68-95-99,7-Regel der Normalverteilung.',
          '$1\\sigma$ um den Mittelwert ≈ 68%.',
          '$2\\sigma$ ≈ 95%, $3\\sigma$ ≈ 99,7%.',
        ],
        explanation:
          'Normalverteilung: ±1σ ≈ 68%, ±2σ ≈ 95%, ±3σ ≈ 99,7%. Diese Faustregel ist in ML allgegenwärtig.',
      },
      {
        id: 'p1.kv.ex2',
        difficulty: 2,
        conceptTags: ['normal-distribution'],
        type: 'mc',
        prompt: '$X \\sim \\mathcal{N}(5, 4)$ ($\\mu=5$, $\\sigma^2=4$). Was ist $Z = \\frac{X-5}{2}$?',
        options: [
          '$Z \\sim \\mathcal{N}(0, 1)$ — Standardnormalverteilung',
          '$Z \\sim \\mathcal{N}(5, 1)$',
          '$Z \\sim \\mathcal{N}(0, 4)$',
          '$Z$ ist nicht normalverteilt',
        ],
        answer: '$Z \\sim \\mathcal{N}(0, 1)$ — Standardnormalverteilung',
        hints: [
          'Standardisierung: $Z = (X - \\mu) / \\sigma$.',
          '$\\sigma = \\sqrt{\\sigma^2} = \\sqrt{4} = 2$.',
          '$Z \\sim \\mathcal{N}(0, 1)$.',
        ],
        explanation:
          '$Z = (X-\\mu)/\\sigma = (X-5)/2 \\sim \\mathcal{N}(0,1)$. Standardisierung auf $\\mathcal{N}(0,1)$ ist der Kern von Batch Normalization.',
      },
      {
        id: 'p1.kv.ex3',
        difficulty: 2,
        conceptTags: ['uniform'],
        type: 'mc',
        prompt: '$X \\sim \\text{Uniform}(a, b)$. Was ist $E[X]$?',
        options: [
          '$\\frac{a+b}{2}$',
          '$b - a$',
          '$\\frac{b-a}{2}$',
          '$\\sqrt{ab}$',
        ],
        answer: '$\\frac{a+b}{2}$',
        hints: [
          'Gleichverteilung: alle Werte in $[a,b]$ gleich wahrscheinlich.',
          'Erwartungswert = Mitte des Intervalls.',
          '$E[X] = \\frac{a+b}{2}$.',
        ],
        explanation:
          '$E[\\text{Uniform}(a,b)] = \\frac{a+b}{2}$ (Mittelpunkt des Intervalls). Für Glorot-Uniform: $a=-r$, $b=r$ → $E[w]=0$.',
      },
      {
        id: 'p1.kv.ex4',
        difficulty: 3,
        conceptTags: ['normal-distribution'],
        type: 'mc',
        prompt:
          'Xavier-Initialisierung: $w \\sim \\mathcal{N}(0, \\frac{2}{n_{\\text{in}}+n_{\\text{out}}})$. Ziel?',
        options: [
          'Varianz der Aktivierungen über Schichten konstant halten — verhindert Vanishing/Exploding Gradients',
          'Alle Gewichte auf 0 setzen',
          'Uniform-Verteilung approximieren',
          'Große Gewichte bevorzugen für schnelleres Training',
        ],
        answer:
          'Varianz der Aktivierungen über Schichten konstant halten — verhindert Vanishing/Exploding Gradients',
        hints: [
          'Tiefe Netze: Aktivierungen explodieren oder verschwinden ohne gute Initialisierung.',
          'Xavier wählt Varianz so, dass $\\text{Var}(a^{(l)}) \\approx \\text{Var}(a^{(l-1)})$.',
          'Das stabilisiert den Vorwärts- und Rückwärtsdurchlauf.',
        ],
        explanation:
          'Xavier-Init balanciert Varianz: $\\sigma^2 = 2/(n_{in}+n_{out})$. Hält Aktivierungsvarianz über Schichten stabil — fundamental für Training tiefer Netze.',
      },
      {
        id: 'p1.kv.ex5',
        difficulty: 3,
        conceptTags: ['normal-distribution', 'gaussian'],
        type: 'mc',
        prompt:
          'Batch Normalization berechnet $\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$. Welche Verteilung hat $\\hat{x}_i$ (approximativ)?',
        options: [
          '$\\mathcal{N}(0, 1)$ — standardnormalverteilt',
          '$\\mathcal{N}(\\mu_B, \\sigma_B^2)$',
          '$\\text{Uniform}(0, 1)$',
          'Keine spezifische Verteilung',
        ],
        answer: '$\\mathcal{N}(0, 1)$ — standardnormalverteilt',
        hints: [
          'Standardisierung $z = (x - \\mu)/\\sigma$ ergibt $\\mathcal{N}(0,1)$.',
          'BatchNorm tut genau das mit Batch-Statistiken.',
          '$\\epsilon$ stabilisiert numerisch.',
        ],
        explanation:
          'BatchNorm standardisiert die Aktivierungen auf $\\approx \\mathcal{N}(0,1)$. Das beschleunigt Training, verhindert innere Kovariatenverschiebung.',
      },
      {
        id: 'p1.kv.ex6',
        difficulty: 4,
        conceptTags: ['normal-distribution', 'gaussian'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Warum führt ein Gauß-Prior $p(w) = \\mathcal{N}(0, \\tau^2)$ auf Gewichten zur L2-Regularisierung?',
        options: [
          '$\\ln p(w) = -\\frac{w^2}{2\\tau^2} + \\text{const}$ — Log-Prior ist quadratische Strafe auf Gewichte',
          'Weil Gauß und L1 äquivalent sind',
          'Weil der Prior das Modell vereinfacht',
          'Nur wenn $\\tau^2 = 1$',
        ],
        answer:
          '$\\ln p(w) = -\\frac{w^2}{2\\tau^2} + \\text{const}$ — Log-Prior ist quadratische Strafe auf Gewichte',
        hints: [
          '$p(w) \\propto \\exp(-w^2/(2\\tau^2))$.',
          '$\\ln p(w) = -\\frac{w^2}{2\\tau^2} + \\text{const}$.',
          'MAP: maximiere $\\ln p(\\theta \\mid D) = \\ell(\\theta) + \\ln p(\\theta)$ → Regularisierung.',
        ],
        explanation:
          'Gauß-Prior: $\\ln p(w) \\propto -w^2$. In MAP-Schätzung kommt dieser Term als L2-Penalty: $\\ell_{\\text{MAP}} = \\ell_{\\text{MLE}} - \\lambda \\|w\\|^2$. Details in Lektion 10.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Normalverteilung — warum überall?\n\n**Zentraler Grenzwertsatz**: Summe von $n$ unabhängigen ZVn mit endlicher Varianz → $\\mathcal{N}$ für $n \\to \\infty$.\n\nGewichte = Summe vieler Gradienten-Updates → tendenziell normalverteilt.\n\nMini-Batch-Statistiken → $\\mathcal{N}$ für große Batches.\n\n**Maximum-Entropie**: $\\mathcal{N}(\\mu, \\sigma^2)$ maximiert die Entropie unter allen Verteilungen mit gegebenem $\\mu$ und $\\sigma^2$ — \"informationsärmste\" Verteilung bei bekannter Varianz.',
      },
      {
        kind: 'callout',
        content:
          'Numerisch: `torch.randn(shape)` zieht aus $\\mathcal{N}(0,1)$; `torch.rand(shape)` aus $\\text{Uniform}(0,1)$. `torch.normal(mean, std)` für allgemeine Normalverteilungen. Reparametrierung: $x = \\mu + \\sigma \\cdot \\varepsilon$, $\\varepsilon \\sim \\mathcal{N}(0,1)$ — nutzen VAEs für differenzierbare Sampling.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.kv.card1',
      front: 'Normalverteilung $\\mathcal{N}(\\mu, \\sigma^2)$ — PDF und 68-95-Regel?',
      back: '$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-(x-\\mu)^2/(2\\sigma^2)}$. ±1σ: 68%, ±2σ: 95%, ±3σ: 99,7%.',
      conceptTags: ['normal-distribution'],
    },
    {
      id: 'p1.kv.card2',
      front: 'Was macht Batch Normalization probabilistisch?',
      back: 'Standardisiert Aktivierungen auf $\\approx \\mathcal{N}(0,1)$: $\\hat{x} = (x-\\mu_B)/\\sqrt{\\sigma_B^2+\\epsilon}$.',
      conceptTags: ['normal-distribution', 'gaussian'],
    },
    {
      id: 'p1.kv.card3',
      front: 'Warum Xavier-Initialisierung $w \\sim \\mathcal{N}(0, 2/(n_{in}+n_{out}))$?',
      back: 'Hält Aktivierungsvarianz über Schichten konstant → verhindert Vanishing/Exploding Gradients.',
      conceptTags: ['normal-distribution'],
    },
  ],

  learningOutcome:
    'Du kannst Normalverteilung, Gleichverteilung und Exponentialverteilung definieren, die 68-95-99,7-Regel anwenden und erklären, warum der Zentrale Grenzwertsatz die Normalverteilung ubiquitär macht — mit direktem Bezug auf Gewichtsinitialisierung und Batch Normalization.',

  description:
    'Die Normalverteilung dominiert ML nicht zufällig: der Zentrale Grenzwertsatz macht sie universell, und ihre mathematischen Eigenschaften (maximale Entropie, einfache Konjugation) erklären, warum sie in Gewichtsinitialisierung, Loss-Funktionen und Priors auftaucht.',

  conceptSteps: [
    {
      title: 'Normalverteilung — Form und Parameter',
      preprompt: 'Stell dir die Größenverteilung von Menschen vor. Was macht diese Glockenkurve aus — was sind ihre wichtigsten Eigenschaften?',
      body: 'Die **Normalverteilung** $\\mathcal{N}(\\mu, \\sigma^2)$ ist die wichtigste stetige Verteilung:\n\n$$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)$$\n\n- $\\mu$ = Mittelwert (Lage des Gipfels)\n- $\\sigma^2$ = Varianz (Breite der Glocke)\n- $\\sigma$ = Standardabweichung\n\nSymmetrisch um $\\mu$, Gipfel bei $\\mu$, fällt exponentiell ab.',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Normalverteilungsglocke">
        <rect x="0" y="0" width="260" height="100" rx="6" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="85" x2="250" y2="85" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="130" y1="85" x2="130" y2="10" stroke="rgb(75 85 99)" stroke-width="0.8" stroke-dasharray="3,3"/>
        <path d="M10,84 C30,83 50,80 70,70 C90,57 108,32 120,16 C125,10 128,7 130,7 C132,7 135,10 140,16 C152,32 170,57 190,70 C210,80 230,83 250,84" stroke="rgb(99 102 241)" stroke-width="2.5" fill="none"/>
        <line x1="91" y1="85" x2="91" y2="38" stroke="rgb(16 185 129)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="169" y1="85" x2="169" y2="38" stroke="rgb(16 185 129)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="57" y1="85" x2="57" y2="72" stroke="rgb(251 191 36)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="203" y1="85" x2="203" y2="72" stroke="rgb(251 191 36)" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="125" y="97" fill="rgb(156 163 175)" font-size="9">μ</text>
        <text x="86" y="97" fill="rgb(16 185 129)" font-size="8">μ-σ</text>
        <text x="163" y="97" fill="rgb(16 185 129)" font-size="8">μ+σ</text>
        <text x="40" y="97" fill="rgb(251 191 36)" font-size="8">-2σ</text>
        <text x="198" y="97" fill="rgb(251 191 36)" font-size="8">+2σ</text>
        <text x="95" y="30" fill="rgb(16 185 129)" font-size="8">68%</text>
      </svg>`,
      miniExample: '$X \\sim \\mathcal{N}(170, 100)$: Körpergröße. $\\mu = 170$ cm, $\\sigma = 10$ cm.',
    },
    {
      title: 'Standardnormalverteilung und Standardisierung',
      body: 'Die **Standardnormalverteilung** $\\mathcal{N}(0, 1)$ hat $\\mu = 0$, $\\sigma = 1$.\n\n**Standardisierung**: Jede Normalverteilung lässt sich in $\\mathcal{N}(0,1)$ überführen:\n\n$$Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)$$\n\nDas ist die probabilistische Grundlage von **Batch Normalization**:\n\n$$\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$$\n\nBatch Norm standardisiert Aktivierungen auf $\\approx \\mathcal{N}(0,1)$ innerhalb eines Mini-Batches.',
      miniExample: '$X \\sim \\mathcal{N}(5, 4)$: $Z = (X-5)/2 \\sim \\mathcal{N}(0,1)$.',
    },
    {
      title: 'Die 68-95-99,7-Regel',
      body: 'Drei fundamentale Intervallwahrscheinlichkeiten:\n\n$$P(\\mu - \\sigma \\leq X \\leq \\mu + \\sigma) \\approx 68{,}3\\%$$\n$$P(\\mu - 2\\sigma \\leq X \\leq \\mu + 2\\sigma) \\approx 95{,}4\\%$$\n$$P(\\mu - 3\\sigma \\leq X \\leq \\mu + 3\\sigma) \\approx 99{,}7\\%$$\n\nIn ML: Werte außerhalb $3\\sigma$ sind selten — Anomalie-Detektion, Gradient-Clipping, Outlier-Analyse basieren auf dieser Intuition.',
      selfCheck: 'Wie viele Standardabweichungen entsprechen einem 95%-Konfidenzintervall? (Etwa $\\pm 1{,}96\\sigma$, oft vereinfacht auf $\\pm 2\\sigma$.)',
    },
    {
      title: 'Zentraler Grenzwertsatz',
      body: 'Der **Zentrale Grenzwertsatz** (ZGS) ist das fundamentale Theorem der Statistik:\n\n> Sei $X_1, X_2, \\ldots, X_n$ i.i.d. ZVn mit $\\mathbb{E}[X_i] = \\mu$ und $\\text{Var}(X_i) = \\sigma^2 < \\infty$. Dann gilt:\n\n$$\\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{für } n \\to \\infty$$\n\nDer Durchschnitt von vielen unabhängigen ZVn wird normalverteilt — egal welche Ausgangsverteilung!\n\n**Warum Normalverteilung überall?** Summen unabhängiger Beiträge → $\\mathcal{N}$ (Mini-Batch-Gradient = Summe von Gradienten).',
      selfCheck: 'Warum erklärt der ZGS, warum Gradienten in SGD oft annähernd normalverteilt sind? (Gradient = Durchschnitt über viele Samples → ZGS.)',
    },
    {
      title: 'Weitere stetige Verteilungen',
      body: '**Gleichverteilung** Uniform$(a, b)$:\n$$f(x) = \\frac{1}{b-a} \\text{ für } x \\in [a,b], \\quad \\mathbb{E}[X] = \\frac{a+b}{2}, \\quad \\text{Var}(X) = \\frac{(b-a)^2}{12}$$\n\n**Exponentialverteilung** Exp$(\\lambda)$:\n$$f(x) = \\lambda e^{-\\lambda x} \\text{ für } x \\geq 0, \\quad \\mathbb{E}[X] = 1/\\lambda, \\quad \\text{Var}(X) = 1/\\lambda^2$$\n\n**Gedächtnislosigkeit**: $P(X > s+t \\mid X > s) = P(X > t)$ — charakteristisch für Exp.',
      miniExample: 'Glorot-Uniform: $w \\sim \\text{Uniform}(-r, r)$ mit $r = \\sqrt{6/(n_{in}+n_{out})}$. Erwartungswert = 0 ✓',
    },
    {
      title: 'ML: Gewichtsinitialisierung und Kaiming-Init',
      body: 'Warum Normalverteilung für Gewichtsinitialisierung? ZGS: Ausgabe eines Neurons = Summe von $n_{in}$ Produkten $w_i x_i$ → konvergiert zu $\\mathcal{N}$ für großes $n_{in}$.\n\n**Xavier/Glorot-Initialisierung** (für Tanh/Sigmoid):\n$$w \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in} + n_{out}}\\right)$$\n\n**Kaiming/He-Initialisierung** (für ReLU — berücksichtigt, dass ReLU Hälfte der Neuronen auf 0 setzt):\n$$w \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in}}\\right)$$\n\nZiel: Varianz der Aktivierungen über Schichten konstant halten → kein Vanishing/Exploding Gradient.',
      selfCheck: 'Warum verwendet Kaiming-Init $2/n_{in}$ statt $1/n_{in}$ für ReLU? (ReLU setzt ≈ 50% auf null → effektive Eingangsanzahl halbiert sich → Varianz kompensieren.)',
    },
  ],

  codeBridges: [
    {
      title: 'torch.nn.init: Kaiming- und Xavier-Initialisierung; torch.distributions.Normal',
      lang: 'python',
      code: `import torch
import torch.nn as nn
from torch.distributions import Normal

# --- Gewichtsinitialisierung ---
layer = nn.Linear(256, 128)

# Xavier (Glorot) — für Sigmoid/Tanh
nn.init.xavier_normal_(layer.weight)   # N(0, 2/(n_in+n_out))
nn.init.xavier_uniform_(layer.weight)  # Uniform(-r, r), r=sqrt(6/(n_in+n_out))

# Kaiming (He) — Standard für ReLU
nn.init.kaiming_normal_(layer.weight, mode='fan_in', nonlinearity='relu')
# Varianz = 2/n_in (kompensiert ~50% ReLU-Nullen)

# Verifikation: Aktivierungsvarianz über Schichten
x = torch.randn(1000, 256)
with torch.no_grad():
    a = layer(x)  # Aktivierungen nach Schicht
    print(f"Input var:  {x.var():.3f}")   # ≈ 1.0
    print(f"Output var: {a.var():.3f}")   # sollte ≈ 1.0 sein bei Kaiming

# --- torch.distributions.Normal ---
d = Normal(loc=0.0, scale=1.0)

# Sampling: reparametrization trick
eps = d.sample((100,))          # ε ~ N(0,1)
mu, sigma = torch.tensor(2.0), torch.tensor(0.5)
x_samples = mu + sigma * eps    # x = μ + σ·ε ~ N(μ, σ²) — differenzierbar!

# 68-95-99,7-Regel numerisch überprüfen:
n = 100_000
samples = d.sample((n,))
print(f"±1σ: {(samples.abs() < 1).float().mean():.3f}")  # ≈ 0.683
print(f"±2σ: {(samples.abs() < 2).float().mean():.3f}")  # ≈ 0.954`,
      annotation: 'Kaiming-Init ist der Standard-Vorschlag in PyTorch für ReLU-Netze. Der Reparametrierungstrick $x = \\mu + \\sigma \\cdot \\varepsilon$ mit $\\varepsilon \\sim \\mathcal{N}(0,1)$ macht Sampling differenzierbar — das ist die Grundlage von Variational Autoencoders (VAE).',
    },
  ],

  derivations: [
    {
      claim: 'Kaiming-Initialisierung: Warum $\\sigma^2 = 2/n_{in}$ für ReLU?',
      reasoning:
        'Ziel: $\\text{Var}(a^{(l)}) = \\text{Var}(a^{(l-1)})$ über alle Schichten. Sei $a^{(l)} = \\text{ReLU}(W a^{(l-1)})$. Für ein Neuron: $z = \\sum_i w_i a_i$. Falls $w_i$ i.i.d. mit $\\mathbb{E}[w_i]=0$ und $a_i$ i.i.d.: $\\text{Var}(z) = n_{in} \\cdot \\text{Var}(w) \\cdot \\mathbb{E}[a^2]$. ReLU halbiert die Varianz (setzt ≈ 50% auf null): $\\mathbb{E}[(\\text{ReLU}(z))^2] \\approx \\frac{1}{2}\\text{Var}(z)$. Damit $\\text{Var nach ReLU} = \\text{Var vorher}$: $\\text{Var}(w) = 2/n_{in}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\mathcal{N}(\\mu, \\sigma)$ bedeutet Mittelwert $\\mu$ und Standardabweichung $\\sigma$',
      correct: 'In der Statistik-Konvention ist $\\mathcal{N}(\\mu, \\sigma^2)$ — der zweite Parameter ist die **Varianz** $\\sigma^2$, nicht die Standardabweichung',
      explanation:
        'PyTorch `Normal(loc, scale)` nutzt Standardabweichung (`scale`). Statistik-Literatur nutzt $\\mathcal{N}(\\mu, \\sigma^2)$. Immer prüfen, welche Konvention verwendet wird!',
    },
    {
      wrong: 'Zentraler Grenzwertsatz gilt für alle Verteilungen ohne Bedingungen',
      correct: 'ZGS erfordert endliche Varianz ($\\sigma^2 < \\infty$) und Unabhängigkeit',
      explanation:
        'Heavy-tailed Verteilungen (z. B. Cauchy) haben keine endliche Varianz → ZGS gilt nicht. In ML sind solche Fälle selten, aber Gradient-Explosions können ähnliche Effekte haben.',
    },
    {
      wrong: 'Xavier und Kaiming sind dasselbe',
      correct: 'Xavier für Sigmoid/Tanh: $\\sigma^2 = 2/(n_{in}+n_{out})$; Kaiming für ReLU: $\\sigma^2 = 2/n_{in}$',
      explanation:
        'ReLU setzt ≈ 50% der Aktivierungen auf null — das reduziert die effektive Varianz. Kaiming-Init kompensiert das mit dem Faktor 2. Xavier ignoriert diese Nichtlinearität.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "But what is the Central Limit Theorem?" (YouTube)',
      type: 'video',
      note: 'Visuelle Intuition des ZGS; warum Würfelsummen normalverteilt werden',
    },
    {
      title: 'He et al. (2015): "Delving Deep into Rectifiers" — arxiv.org/abs/1502.01852',
      type: 'article',
      note: 'Originalpaper der Kaiming-Initialisierung; erklärt die Herleitung für ReLU mathematisch',
    },
    {
      title: 'MML Book, Kapitel 6.4–6.5: "Gaussian Distribution and Exponential Family"',
      type: 'book',
      note: 'Warum Gauß die Maximum-Entropie-Verteilung bei bekannter Varianz ist',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'requires',
      hint: 'PDF-Konzept ist Voraussetzung: Normalverteilung ist eine konkrete PDF.',
    },
    {
      lessonId: 'p1.erwartungswert-varianz',
      relation: 'extends',
      hint: 'Erwartungswert $\\mu$ und Varianz $\\sigma^2$ sind die Parameter der Normalverteilung — Lektion 05 vertieft Rechenregeln.',
    },
    {
      lessonId: 'p1.kovarianz-multivariate-gauss',
      relation: 'extends',
      hint: 'Multivariate Normalverteilung verallgemeinert $\\mathcal{N}(\\mu, \\sigma^2)$ auf $\\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'MLE unter Gauß-Modell ergibt MSE-Loss — die probabilistische Begründung für Regressions-Loss.',
    },
  ],

  reflection: 'Die Normalverteilung ist nicht zufällig überall — der Zentrale Grenzwertsatz macht sie zur natürlichen Grenzverteilung von Summen. Jede Gewichtsinitialisierung, jede Batch-Norm-Schicht, jedes Gauß-Rauschmodell nutzt diese Tatsache. **Was hat dich mehr überrascht: die Universalität des ZGS, oder die exakte Herleitung der Kaiming-Initialisierung?**',
}
