import type { Lesson } from '../../types'

export const logarithmus: Lesson = {
  id: 'p0.logarithmus',
  title: 'Logarithmus',
  conceptTags: ['logarithm', 'inverse', 'log-laws', 'cross-entropy'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Logarithmus — Umkehrung der Potenz\n\n$\\log_a(b) = c$ bedeutet: $a^c = b$. Der Logarithmus fragt: "Welche Potenz brauche ich, um $b$ aus der Basis $a$ zu erhalten?"\n\nWichtigste Spezialfälle: $\\ln = \\log_e$ (natürlicher Log), $\\log_{10}$, $\\log_2$.',
      },
      {
        kind: 'math',
        content:
          '$$\\ln(e^x) = x \\qquad e^{\\ln(x)} = x \\qquad \\ln(1) = 0 \\qquad \\ln(e) = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Cross-Entropy-Loss $L = -\\sum_i y_i \\log \\hat{y}_i$ ist der Standard-Loss für Klassifikation — von logistischer Regression bis GPT. Er basiert komplett auf dem Logarithmus.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Logarithmengesetze\n\nDiese Regeln gelten für jeden Logarithmus (jede Basis):',
      },
      {
        kind: 'math',
        content:
          '$$\\log(a \\cdot b) = \\log a + \\log b \\qquad \\log\\!\\left(\\frac{a}{b}\\right) = \\log a - \\log b \\qquad \\log(a^n) = n \\cdot \\log a$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $\\log_2(8) = ?$\n\n$2^3 = 8$, also $\\log_2(8) = 3$.\n\n**Beispiel 2**: $\\ln(e^5) = 5$ (Umkehrfunktion)\n\n**Beispiel 3**: Cross-Entropy, perfekte Vorhersage ($\\hat{y} = 1$):\n\n$-\\ln(1) = 0$ ← kein Fehler, kein Loss.',
      },
    ],
    practice: [
      {
        id: 'p0.log.ex1',
        difficulty: 1,
        conceptTags: ['logarithm'],
        type: 'numeric',
        prompt: 'Was ist $\\log_2(8)$?',
        answer: 3,
        hints: [
          '$\\log_2(8)$ fragt: "2 hoch wie viel ergibt 8?"',
          '$2^1 = 2$, $2^2 = 4$, $2^3 = ?$',
          '$2^3 = 8$, also $\\log_2(8) = 3$.',
        ],
        explanation: '$2^3 = 8$, daher $\\log_2(8) = 3$.',
      },
      {
        id: 'p0.log.ex2',
        difficulty: 2,
        conceptTags: ['logarithm', 'natural'],
        type: 'numeric',
        prompt: 'Was ist $\\ln(1)$?',
        answer: 0,
        hints: [
          '$\\ln(x) = \\log_e(x)$.',
          '$e^0 = 1$ — Basis hoch 0 ist immer 1.',
          '$\\ln(1) = 0$.',
        ],
        explanation: '$e^0 = 1$, also $\\ln(1) = 0$.',
      },
      {
        id: 'p0.log.ex3',
        difficulty: 2,
        conceptTags: ['logarithm', 'natural'],
        type: 'numeric',
        prompt: 'Was ist $\\ln(e)$?',
        answer: 1,
        hints: [
          '$\\ln$ ist die Umkehrfunktion von $e^x$.',
          '$e^1 = e$.',
          '$\\ln(e) = 1$.',
        ],
        explanation: '$\\ln(e) = \\log_e(e) = 1$, weil $e^1 = e$.',
      },
      {
        id: 'p0.log.ex4',
        difficulty: 3,
        conceptTags: ['log-laws'],
        type: 'mc',
        prompt: '$\\log(a \\cdot b) = ?$',
        options: ['$\\log a + \\log b$', '$\\log a \\cdot \\log b$', '$\\log a - \\log b$', '$\\log(a+b)$'],
        answer: '$\\log a + \\log b$',
        hints: [
          'Das ist das erste Logarithmengesetz.',
          'Logarithmus macht aus Produkten Summen.',
          '$\\log(a \\cdot b) = \\log a + \\log b$.',
        ],
        explanation: 'Logarithmengesetz: $\\log(a \\cdot b) = \\log a + \\log b$.',
        misconceptions: {
          '$\\log a \\cdot \\log b$': 'Das Produkt von Logs ist keine gültige Vereinfachung.',
        },
      },
      {
        id: 'p0.log.ex5',
        difficulty: 3,
        conceptTags: ['logarithm', 'cross-entropy'],
        type: 'numeric',
        prompt:
          'Berechne $-\\ln(0{,}5)$ — der Cross-Entropy-Loss für ein "50%-sicheres" Beispiel. Auf 2 Nachkommastellen.',
        answer: 0.69,
        acceptedAlternatives: ['0,69', '0.693', '0,693'],
        hints: [
          '$\\ln(0{,}5) = \\ln(1/2) = \\ln(1) - \\ln(2) = 0 - \\ln(2)$.',
          '$\\ln(2) \\approx 0{,}693$.',
          '$-\\ln(0{,}5) = \\ln(2) \\approx 0{,}69$.',
        ],
        explanation:
          '$-\\ln(0{,}5) = \\ln(2) \\approx 0{,}693$. Je weniger sicher das Modell, desto höher der Loss.',
      },
      {
        id: 'p0.log.ex6',
        difficulty: 4,
        conceptTags: ['logarithm', 'cross-entropy', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein Klassifikator trifft perfekt: $\\hat{y} = 1$ für die richtige Klasse. Wie groß ist der Cross-Entropy-Loss $-\\ln(\\hat{y})$?',
        options: ['0', '1', '$\\infty$', '$-1$'],
        answer: '0',
        hints: [
          '$-\\ln(1) = ?$',
          '$\\ln(1) = 0$.',
          '$-\\ln(1) = 0$ — kein Fehler, kein Loss.',
        ],
        explanation:
          '$-\\ln(1) = 0$. Perfekte Vorhersage → Loss = 0. Umgekehrt: $-\\ln(0) = +\\infty$ — maximale Strafe.',
        misconceptions: {
          '1': '$\\ln(1) = 0$, nicht 1. $\\ln(e) = 1$.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Cross-Entropy — warum Logarithmus?\n\nDer Standard-Loss für Klassifikation ist:\n\n$L = -\\sum_i y_i \\log \\hat{y}_i$\n\nFür die richtige Klasse ist $y_i = 1$, alle anderen $y_i = 0$. Also vereinfacht sich das zu:\n\n$L = -\\log \\hat{y}_{\\text{richtig}}$',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{y} \\to 1 \\Rightarrow L = -\\ln(1) = 0 \\qquad \\hat{y} \\to 0 \\Rightarrow L = -\\ln(0) \\to +\\infty$$',
      },
      {
        kind: 'callout',
        content:
          'Je sicherer das Modell richtig liegt, desto kleiner der Loss. Je sicherer es falsch liegt, desto näher kommt der Loss an $+\\infty$ — eine sehr starke Bestrafung. Das ist der Grund, warum Cross-Entropy im Training schneller lernt als MSE.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.log.card1',
      front: 'Was bedeutet $\\log_a(b) = c$?',
      back: '$a^c = b$ — Logarithmus ist die Umkehrung der Potenz.',
      conceptTags: ['logarithm'],
    },
    {
      id: 'p0.log.card2',
      front: 'Logarithmengesetz für Produkte?',
      back: '$\\log(a \\cdot b) = \\log a + \\log b$',
      conceptTags: ['log-laws'],
    },
    {
      id: 'p0.log.card3',
      front: 'Cross-Entropy-Loss (eine Klasse)?',
      back: '$L = -\\ln(\\hat{y})$, wobei $\\hat{y}$ die vorhergesagte Wahrscheinlichkeit der richtigen Klasse ist.',
      conceptTags: ['cross-entropy'],
    },
  ],

  learningOutcome:
    'Du kannst Logarithmusgesetze sicher anwenden, den natürlichen Logarithmus interpretieren und verstehst, warum Cross-Entropy-Loss und der LogSumExp-Trick auf dem Logarithmus basieren.',

  description:
    'Der Logarithmus ist die Umkehrfunktion der Exponentialfunktion — und das heimliche Herzstück fast aller ML-Loss-Funktionen. Du lernst die Logarithmusgesetze, den natürlichen Logarithmus ln, Basiswechsel sowie die numerische Stabilität durch log-Wahrscheinlichkeiten kennen.',

  conceptSteps: [
    {
      title: 'Was ist ein Logarithmus?',
      preprompt: '$2^{10} = 1024$. Wenn dir jemand sagt "ich habe 1024 durch wiederholtes Verdoppeln aus 1 erzeugt" — wie oft hat er verdoppelt?',
      body: 'Der **Logarithmus** beantwortet die Frage: "Welche Potenz brauche ich?"\n\n$$\\log_a(b) = c \\quad \\Longleftrightarrow \\quad a^c = b$$\n\n$a$ heißt **Basis**, $b$ heißt **Numerus**, $c$ ist der Logarithmuswert.\n\nBeispiele:\n$$\\log_2(8) = 3 \\quad \\text{weil} \\quad 2^3 = 8$$\n$$\\log_{10}(1000) = 3 \\quad \\text{weil} \\quad 10^3 = 1000$$',
      miniExample: '$\\log_2(32) = 5$, weil $2^5 = 32$.',
      selfCheck: 'Was ist $\\log_3(81)$? (Antwort: 4, weil $3^4 = 81$.)',
    },
    {
      title: 'Die drei Logarithmusgesetze',
      preprompt: 'Logarithmus wandelt Multiplikation in Addition um — warum könnte das numerisch nützlich sein?',
      body: 'Diese drei Gesetze gelten für jede Basis:\n\n$$\\log(a \\cdot b) = \\log a + \\log b \\qquad \\text{(Produkt → Summe)}$$\n\n$$\\log\\!\\left(\\frac{a}{b}\\right) = \\log a - \\log b \\qquad \\text{(Quotient → Differenz)}$$\n\n$$\\log(a^n) = n \\cdot \\log a \\qquad \\text{(Potenz → Faktor)}$$\n\nMerkhilfe: Logarithmus "senkt" die Rechenebene — aus Potenz wird Multiplikation, aus Multiplikation wird Addition.',
      miniExample: '$\\log_2(32) = \\log_2(4 \\cdot 8) = \\log_2(4) + \\log_2(8) = 2 + 3 = 5$ ✓',
      selfCheck: 'Vereinfache $\\ln(e^{2x})$. (Antwort: $2x$, wegen des Potenz-Gesetzes.)',
    },
    {
      title: 'Der natürliche Logarithmus ln',
      body: 'Die wichtigste Basis in Analysis und ML ist die **Eulersche Zahl** $e \\approx 2{,}718$:\n\n$$\\ln(x) := \\log_e(x)$$\n\n**Schlüsseleigenschaften**:\n$$\\ln(e^x) = x \\qquad e^{\\ln(x)} = x \\qquad \\ln(1) = 0 \\qquad \\ln(e) = 1$$\n\n$\\ln$ und $e^x$ sind echte **Umkehrfunktionen** — sie heben sich gegenseitig auf. Wichtig: $\\ln(x)$ ist nur für $x > 0$ definiert.',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="ln Funktion">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="30" y1="10" x2="30" y2="90" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="20" y1="70" x2="250" y2="70" stroke="rgb(55 65 81)" stroke-width="1"/>
        <text x="20" y="8" fill="rgb(156 163 175)" font-size="9" font-family="monospace">ln(x)</text>
        <polyline points="31,90 40,76 55,68 75,62 100,56 130,51 165,47 200,43 240,40" stroke="rgb(134 239 172)" stroke-width="2" fill="none"/>
        <line x1="100" y1="10" x2="100" y2="90" stroke="rgb(99 102 241)" stroke-width="1" stroke-dasharray="3"/>
        <text x="97" y="8" fill="rgb(99 102 241)" font-size="8" font-family="monospace">e</text>
        <text x="102" y="54" fill="rgb(251 191 36)" font-size="8" font-family="monospace">ln(e)=1</text>
        <text x="32" y="68" fill="rgb(96 165 250)" font-size="8" font-family="monospace">ln(1)=0</text>
      </svg>`,
      miniExample: '$\\ln(e^3) = 3$; $\\;e^{\\ln(5)} = 5$',
      selfCheck: 'Warum gilt $\\ln(0)$ nicht? (Weil $e^x > 0$ für alle $x$ — also gibt es kein $x$ mit $e^x = 0$.)',
    },
    {
      title: 'Basiswechsel und log₂',
      body: 'Manchmal braucht man einen anderen Logarithmus (z.B. $\\log_2$ in der Informatik). Die **Basiswechselformel** hilft:\n\n$$\\log_a(x) = \\frac{\\ln(x)}{\\ln(a)} = \\frac{\\log_b(x)}{\\log_b(a)}$$\n\nIn Python/PyTorch gibt es nur `torch.log` (= $\\ln$), daher:\n\n$$\\log_2(x) = \\frac{\\ln(x)}{\\ln(2)} \\approx \\frac{\\ln(x)}{0{,}693}$$',
      miniExample: '$\\log_2(16) = \\frac{\\ln(16)}{\\ln(2)} = \\frac{4 \\ln 2}{\\ln 2} = 4$ ✓',
      selfCheck: 'Mit welchem Python-Code berechnet man $\\log_{10}(100)$? (`torch.log(x) / torch.log(torch.tensor(10.0))`)',
    },
    {
      title: 'Log-Skala: warum überhaupt?',
      body: 'Wenn Zahlen über viele Größenordnungen variieren (z.B. $10^{-6}$ bis $10^6$), hilft eine **logarithmische Skala**:\n\n- Training-Loss fällt oft von $2{,}3$ auf $0{,}001$ → y-Achse log-skaliert macht das sichtbar\n- Sehr kleine Wahrscheinlichkeiten ($10^{-40}$) werden durch $\\ln$ zu handhabbaren Zahlen ($-92$)\n- **Log-Wahrscheinlichkeiten** verhindert numerischen Underflow:\n\n$$\\ln P(x_1, x_2, \\ldots, x_n) = \\sum_i \\ln P(x_i)$$\n\nStatt $10^{-300} \\cdot 10^{-300} \\cdot \\ldots = 0$ (Underflow) rechnet man mit $-300 + (-300) + \\ldots$.',
      selfCheck: 'Warum ist $\\ln(10^{-300}) = -300 \\cdot \\ln(10) \\approx -690$ viel besser als $10^{-300}$ direkt zu speichern?',
    },
    {
      title: 'ML: Cross-Entropy-Loss und LogSumExp',
      body: '**Cross-Entropy-Loss** für Klassifikation:\n\n$$L = -\\sum_i y_i \\ln(\\hat{y}_i)$$\n\nFür eine richtige Klasse vereinfacht sich das zu $L = -\\ln(\\hat{y}_{\\text{richtig}})$.\n\nPerfekte Vorhersage: $-\\ln(1) = 0$; falsche sichere Vorhersage: $-\\ln(0) \\to \\infty$.\n\n**LogSumExp-Trick** für numerische Stabilität in Softmax:\n\n$$\\ln \\sum_j e^{z_j} = c + \\ln \\sum_j e^{z_j - c} \\qquad \\text{mit } c = \\max_j z_j$$\n\nOhne diesen Trick: $e^{1000}$ ist Overflow. Mit $c$: alle Terme $\\leq e^0 = 1$.',
      miniExample: '$-\\ln(0{,}5) = \\ln(2) \\approx 0{,}693$ — Loss für eine "50%-sichere" Vorhersage',
      selfCheck: 'Warum wird Cross-Entropy-Loss mit einem Minus-Zeichen gerechnet? (Weil $\\ln(\\hat{y}) \\leq 0$ für $\\hat{y} \\in [0,1]$ — das Minus macht den Loss positiv.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Cross-Entropy und LogSumExp',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

# Rohe Logits (nicht normalisiert)
logits = torch.tensor([2.0, 1.0, 0.1])

# Naive Softmax: e^2000 wäre Overflow — deshalb LogSumExp-Trick
# log_softmax = z_i - log(sum(exp(z_j)))
log_probs = F.log_softmax(logits, dim=0)
# = [2.0, 1.0, 0.1] - logsumexp([2.0, 1.0, 0.1])
# logsumexp = max + log(sum(exp(z - max))) -- numerisch stabil!

# Cross-Entropy-Loss = -log(p_richtige_klasse)
# torch.nn.CrossEntropyLoss kombiniert log_softmax + NLLLoss
label = torch.tensor(0)   # Klasse 0 ist richtig
ce_loss = F.cross_entropy(logits.unsqueeze(0), label.unsqueeze(0))
# Entspricht: -log_softmax(logits)[0]

# Manuell: negative log-likelihood
nll = -log_probs[label]
print(f"ce_loss: {ce_loss:.4f}, nll: {nll:.4f}")  # gleich!

# Wahrscheinlichkeiten aus log-Wahrscheinlichkeiten
probs = torch.exp(log_probs)
print(f"P(Klasse 0) = {probs[0]:.3f}")  # ~ 0.659`,
      annotation: '`F.log_softmax` verwendet intern den LogSumExp-Trick: $\\ln \\sum_j e^{z_j - c}$ mit $c = \\max z_j$. `F.cross_entropy` ist identisch mit $-\\ln(\\hat{y}_{\\text{richtig}})$ — direkt die Cross-Entropy-Formel. `torch.exp(log_probs)` kehrt den Logarithmus um: $e^{\\ln p} = p$.',
    },
  ],

  derivations: [
    {
      claim: '$\\log(a \\cdot b) = \\log a + \\log b$',
      reasoning:
        'Setze $\\log a = m$ und $\\log b = n$, also $a = 10^m$ und $b = 10^n$. Dann: $a \\cdot b = 10^m \\cdot 10^n = 10^{m+n}$. Daher $\\log(a \\cdot b) = m + n = \\log a + \\log b$. Logarithmus verwandelt Multiplikation (hohe Ebene) in Addition (niedrigere Ebene).',
    },
    {
      claim: '$-\\ln(\\hat{y}) \\to \\infty$ wenn $\\hat{y} \\to 0$',
      reasoning:
        'Für $\\hat{y} \\in (0, 1]$ gilt $\\ln(\\hat{y}) \\leq 0$, also $-\\ln(\\hat{y}) \\geq 0$. Wenn das Modell die falsche Klasse sicher vorhersagt ($\\hat{y} \\to 0$ für die richtige Klasse), dann $\\ln(\\hat{y}) \\to -\\infty$, also $-\\ln(\\hat{y}) \\to +\\infty$. Das gibt die stärkste mögliche Strafe — genau das wollen wir von einem Loss.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\log(a + b) = \\log a + \\log b$',
      correct: '$\\log(a \\cdot b) = \\log a + \\log b$',
      explanation:
        'Das Logarithmusgesetz gilt für **Produkte**, nicht für Summen. $\\log(a + b)$ lässt sich im Allgemeinen nicht vereinfachen.',
    },
    {
      wrong: '$\\ln(-5)$ ist definiert',
      correct: '$\\ln(x)$ ist nur für $x > 0$ definiert',
      explanation:
        'Da $e^x > 0$ für alle $x \\in \\mathbb{R}$, kann $\\ln(x)$ für $x \\leq 0$ keinen reellen Wert annehmen. In ML führt $\\log(0)$ zu $-\\infty$ — daher immer Clipping oder Epsilon addieren: $\\log(\\hat{y} + \\epsilon)$.',
    },
    {
      wrong: '$\\log_a(b) = \\frac{a}{b}$',
      correct: '$\\log_a(b) = c$ bedeutet $a^c = b$',
      explanation:
        'Logarithmus ist keine Division — er fragt nach dem Exponenten. $\\log_2(8) = 3$, weil $2^3 = 8$, nicht $2/8$.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "What is e?" (Video)',
      type: 'video',
      note: 'Intuitive Herleitung der Eulerschen Zahl und des natürlichen Logarithmus — 6 Minuten',
    },
    {
      title: 'BetterExplained: "Demystifying the Natural Logarithm"',
      type: 'article',
      note: 'Erklärt ln als "Zeit bis zum Wachstum von 1 auf x bei kontinuierlichem Wachstum"',
    },
    {
      title: 'Serlo: "Logarithmusgesetze" — serlo.org',
      type: 'article',
      note: 'Deutsche Referenz mit allen drei Gesetzen und interaktiven Übungen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.potenzen-wurzeln',
      relation: 'requires',
      hint: 'Logarithmus ist die Umkehrfunktion der Potenz — $a^x = y \\Leftrightarrow \\log_a y = x$.',
    },
    {
      lessonId: 'p0.exponentialfunktionen',
      relation: 'requires',
      hint: '$\\ln$ und $e^x$ sind Umkehrfunktionen voneinander — beide Lektionen gehören zusammen.',
    },
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'extends',
      hint: 'Log-Wahrscheinlichkeiten und Cross-Entropy-Loss basieren auf Logarithmus angewandt auf Wahrscheinlichkeiten.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'Maximum Likelihood Estimation maximiert Log-Likelihood — exakt $\\sum_i \\ln p(x_i)$.',
    },
  ],

  reflection: 'Du hast gelernt: **Logarithmus** verwandelt Produkte in Summen — und das macht ihn zum unverzichtbaren Werkzeug für numerische Stabilität in ML. Cross-Entropy-Loss, LogSumExp und Log-Wahrscheinlichkeiten — alles basiert auf diesem einen Konzept. Wo siehst du den Logarithmus noch in deinem ML-Alltag?',
}
