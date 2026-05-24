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
    'Du kannst den Logarithmus als Umkehrfunktion der Potenz erklären, die drei Logarithmengesetze anwenden und verstehen, warum Log-Wahrscheinlichkeiten und der LogSumExp-Trick in ML numerisch stabil sind.',

  description:
    'Der Logarithmus ist die Umkehrfunktion der Potenz — und er ist überall in ML. Cross-Entropy-Loss, Softmax-Stabilisierung und Information-Theorie bauen alle auf dem Logarithmus auf. Du lernst die Gesetze, die Intuition und den entscheidenden LogSumExp-Trick.',

  conceptSteps: [
    {
      title: 'Was ist ein Logarithmus?',
      preprompt: 'Wie viele Mal muss man 2 mit sich selbst multiplizieren, um 1024 zu erhalten? Was wäre eine kompakte Schreibweise für diese Frage?',
      body: 'Der **Logarithmus** dreht die Potenz um: statt $a^c = b$ zu berechnen, fragt er "welches $c$ ergibt $b$?".\n\n$$\\log_a(b) = c \\quad \\Leftrightarrow \\quad a^c = b$$\n\n$a$ heißt **Basis**, $b$ heißt **Numerus** (muss positiv sein), $c$ ist das Ergebnis.\n\n**Wichtige Spezialfälle**:\n- $\\log_2(8) = 3$, weil $2^3 = 8$\n- $\\log_{10}(1000) = 3$, weil $10^3 = 1000$\n- $\\ln(e^5) = 5$, weil $e^5 = e^5$',
      miniExample: '$\\log_2(32) = 5$, weil $2^5 = 32$.',
      selfCheck: 'Was ist $\\log_3(81)$? (Antwort: 4, weil $3^4 = 81$.)',
    },
    {
      title: 'Die drei Logarithmengesetze',
      preprompt: 'Wenn $\\log$ eine Potenz umkehrt — was passiert dann mit dem Potenzgesetz $a^m \\cdot a^n = a^{m+n}$, wenn man $\\log$ davon nimmt?',
      body: 'Die Logarithmengesetze folgen direkt aus den Potenzgesetzen:\n\n$$\\log(a \\cdot b) = \\log a + \\log b \\qquad \\text{(Produkt → Summe)}$$\n\n$$\\log\\!\\left(\\frac{a}{b}\\right) = \\log a - \\log b \\qquad \\text{(Quotient → Differenz)}$$\n\n$$\\log(a^n) = n \\cdot \\log a \\qquad \\text{(Exponent → Faktor)}$$\n\nDer Logarithmus macht aus Produkten Summen — das ist sein großer Vorteil für Berechnungen.',
      miniExample: '$\\ln(0{,}25) = \\ln\\!\\left(\\frac{1}{4}\\right) = \\ln(1) - \\ln(4) = 0 - \\ln(4) \\approx -1{,}386$',
      selfCheck: 'Vereinfache $\\log(a^3 \\cdot b^2)$ mithilfe der Gesetze. (Antwort: $3\\log a + 2\\log b$.)',
    },
    {
      title: 'Der natürliche Logarithmus ln',
      body: 'Der **natürliche Logarithmus** $\\ln$ hat die Basis $e \\approx 2{,}718$ (Eulersche Zahl). Er ist in Analysis und ML der Standard-Logarithmus:\n\n$$\\ln(x) = \\log_e(x)$$\n\nWichtige Werte:\n$$\\ln(1) = 0 \\qquad \\ln(e) = 1 \\qquad \\ln(e^x) = x$$\n\nUmkehrung: $e^{\\ln(x)} = x$\n\nDie Ableitung ist besonders schön: $\\frac{d}{dx}\\ln(x) = \\frac{1}{x}$.',
      miniExample: '$\\ln(e^3) = 3$, $\\ln(1) = 0$, $e^{\\ln(7)} = 7$.',
      selfCheck: 'Warum ist $\\ln(0)$ nicht definiert? (Antwort: kein $c$ erfüllt $e^c = 0$, da $e^c > 0$ immer gilt.)',
    },
    {
      title: 'Basis-Wechsel zwischen Logarithmen',
      body: 'Manchmal muss man zwischen Basen wechseln. Die **Basis-Wechsel-Formel**:\n\n$$\\log_a(x) = \\frac{\\ln(x)}{\\ln(a)} = \\frac{\\log_b(x)}{\\log_b(a)}$$\n\nIn der Praxis: In ML und Python rechnet man fast immer mit $\\ln$ (`torch.log`, `np.log`). Wenn du $\\log_2$ brauchst:\n\n$$\\log_2(x) = \\frac{\\ln(x)}{\\ln(2)} \\approx \\frac{\\ln(x)}{0{,}693}$$',
      miniExample: '$\\log_2(8) = \\frac{\\ln(8)}{\\ln(2)} = \\frac{3\\ln(2)}{\\ln(2)} = 3$.',
    },
    {
      title: 'Log-Skala — warum logarithmisch?',
      body: 'Auf einer **linearen Skala** sind gleiche Abstände gleich groß. Auf einer **Log-Skala** repräsentieren gleiche Abstände gleiche Faktoren:\n\n$$1, 10, 100, 1000 \\quad \\to \\quad \\log_{10}: \\quad 0, 1, 2, 3$$\n\nLog-Skala ist nützlich, wenn Werte viele Größenordnungen überspannen: Wahrscheinlichkeiten ($10^{-100}$ bis $1$), Loss-Kurven, Frequenzen.\n\nWenn $\\hat{y} = 0{,}001$, ist $\\ln(0{,}001) \\approx -6{,}9$ — viel besser zu rechnen als $10^{-1000}$.',
      miniExample: 'Wahrscheinlichkeit einer Sequenz von 100 Tokens: $P = \\prod_{t=1}^{100} p_t$. Als $\\log P = \\sum_{t=1}^{100} \\ln(p_t)$ — kein Underflow!',
      selfCheck: 'Warum verwendet man $\\log P$ statt $P$ bei Wahrscheinlichkeiten sehr langer Sequenzen? (Antwort: Produkte sehr kleiner Zahlen führen zu numerischem Underflow; Logarithmen machen Produkte zu Summen.)',
    },
    {
      title: 'ML: Cross-Entropy-Loss und LogSumExp',
      body: '**Cross-Entropy-Loss** für Klassifikation (eine richtige Klasse):\n\n$$L = -\\ln(\\hat{y}_{\\text{richtig}})$$\n\nBei $\\hat{y} \\to 1$: $L \\to 0$ (kein Fehler). Bei $\\hat{y} \\to 0$: $L \\to +\\infty$ (maximale Strafe).\n\n**LogSumExp-Trick** für Softmax-Stabilität:\n\n$$\\text{softmax}_i(z) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$$\n\nProblem: $e^{1000}$ läuft über. Lösung: Subtrahiere das Maximum:\n\n$$\\text{logsumexp}(z) = m + \\ln\\!\\left(\\sum_j e^{z_j - m}\\right), \\quad m = \\max_j z_j$$',
      miniExample: '$(z_1, z_2, z_3) = (1000, 999, 998)$ → ohne Trick: Overflow. Mit Trick: $m=1000$, dann $e^0 + e^{-1} + e^{-2}$ — problemlos.',
      selfCheck: 'Warum ist Cross-Entropy eine stärkere Strafe für falsche Vorhersagen als MSE? (Antwort: $-\\ln(\\hat{y}) \\to +\\infty$ wenn $\\hat{y} \\to 0$; MSE wächst nur quadratisch.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Cross-Entropy und LogSumExp',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# Cross-Entropy-Loss intern: -ln(p_richtig)
logits = torch.tensor([2.0, 1.0, 0.5])   # Rohausgabe des Modells
label  = torch.tensor([0])                 # Klasse 0 ist richtig

# PyTorch rechnet intern: log(softmax(logits))[label]
loss_fn = nn.CrossEntropyLoss()
loss = loss_fn(logits.unsqueeze(0), label)
# loss ≈ 0.418

# Manuell: LogSumExp-Trick für numerisch stabiles log(softmax)
z = logits
m = z.max()                             # Subtraktion des Maximums
log_sum_exp = m + torch.log(           # = ln(sum(e^(z-m))) + m
    torch.exp(z - m).sum()
)
log_p_0 = z[0] - log_sum_exp           # = log(softmax(z))[0]
manual_loss = -log_p_0                  # Cross-Entropy = -log(p_richtig)

# torch.logsumexp macht genau diesen Trick:
stable = torch.logsumexp(z, dim=0)     # numerisch stabil`,
      annotation: '`nn.CrossEntropyLoss` erwartet rohe Logits (nicht Softmax-Output) und rechnet intern den LogSumExp-Trick. `torch.logsumexp` implementiert $m + \\ln(\\sum e^{z_i - m})$ — ein direktes Logarithmengesetz angewendet.',
    },
  ],

  derivations: [
    {
      claim: '$\\log(a \\cdot b) = \\log a + \\log b$',
      reasoning:
        'Seien $\\alpha = \\log_c(a)$ und $\\beta = \\log_c(b)$, also $a = c^\\alpha$ und $b = c^\\beta$. Dann gilt $a \\cdot b = c^\\alpha \\cdot c^\\beta = c^{\\alpha + \\beta}$ (Potenzgesetz). Logarithmiert: $\\log_c(a \\cdot b) = \\alpha + \\beta = \\log_c(a) + \\log_c(b)$.',
    },
    {
      claim: 'LogSumExp-Trick: numerische Stabilität',
      reasoning:
        'Für $m = \\max_j z_j$ gilt: $\\ln\\!\\left(\\sum_j e^{z_j}\\right) = \\ln\\!\\left(e^m \\sum_j e^{z_j - m}\\right) = m + \\ln\\!\\left(\\sum_j e^{z_j - m}\\right)$. Da $z_j - m \\leq 0$ für alle $j$, sind alle Terme $e^{z_j - m} \\in (0, 1]$ — kein Overflow möglich.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\log(a + b) = \\log a + \\log b$',
      correct: '$\\log(a \\cdot b) = \\log a + \\log b$',
      explanation:
        'Der Logarithmus macht aus **Produkten** Summen, nicht aus Summen! $\\log(a + b)$ lässt sich nicht weiter vereinfachen.',
    },
    {
      wrong: '$\\ln(0) = 0$',
      correct: '$\\ln(0)$ ist nicht definiert ($\\to -\\infty$)',
      explanation:
        'Da $e^x > 0$ für alle $x$, gibt es kein $c$ mit $e^c = 0$. In ML: wenn das Modell $\\hat{y} = 0$ für die richtige Klasse vorhersagt, wird der Cross-Entropy-Loss unendlich groß — maximale Strafe.',
    },
    {
      wrong: 'In PyTorch `nn.CrossEntropyLoss` auf Softmax-Output anwenden',
      correct: '`nn.CrossEntropyLoss` direkt auf rohe Logits anwenden',
      explanation:
        '`nn.CrossEntropyLoss` wendet intern bereits `log_softmax` an. Softmax davor anzuwenden führt zu doppelter Normalisierung und falschen Gradienten.',
    },
  ],

  furtherResources: [
    {
      title: 'BetterExplained: "Demystifying the Natural Logarithm (ln)"',
      type: 'article',
      note: 'Intuitive Einführung: Logarithmus als "Wachstumszähler"',
    },
    {
      title: '3Blue1Brown: "e to the i pi" (YouTube)',
      type: 'video',
      note: 'Warum $e$ und $\\ln$ so natürlich sind — visuell, 5 Minuten',
    },
    {
      title: 'Serlo: "Logarithmus" — serlo.org/mathe/logarithmus',
      type: 'article',
      note: 'Deutsche Referenz mit allen Gesetzen und Übungsaufgaben',
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
      hint: '$\\ln$ und $e^x$ sind Umkehrfunktionen — du brauchst $e^x$ um $\\ln$ zu verstehen.',
    },
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'extends',
      hint: 'Log-Wahrscheinlichkeiten ($\\ln P$) vermeiden Underflow bei kleinen Wahrscheinlichkeiten.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'Maximum-Likelihood-Schätzung maximiert die Log-Likelihood — direkte Anwendung dieser Lektion.',
    },
  ],

  reflection: 'Du hast gelernt: **Logarithmus** ist nicht nur eine mathematische Kuriosität — er ist das Fundament von Cross-Entropy, numerischer Stabilität und Informationstheorie in ML. Der LogSumExp-Trick rettet jeden Softmax vor dem Overflow. Wann hast du das nächste Mal in PyTorch-Code einen `log` gesehen?',
}
