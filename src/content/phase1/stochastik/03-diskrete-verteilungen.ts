import type { Lesson } from '../../../types'

export const diskreteVerteilungen: Lesson = {
  id: 'p1.diskrete-verteilungen',
  title: 'Diskrete Verteilungen',
  conceptTags: ['bernoulli', 'binomial', 'categorical', 'distribution', 'discrete'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Wichtige diskrete Verteilungen\n\n**Bernoulli$(p)$**: eine Münze — $P(X=1)=p$, $P(X=0)=1-p$.\n\n**Binomial$(n,p)$**: $k$ Erfolge in $n$ unabhängigen Versuchen:\n$$P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$$\n\n**Kategorisch$(\\mathbf{p})$**: eine Seite des $K$-seitigen Würfels — $P(X=k) = p_k$, $\\sum_k p_k = 1$.',
      },
      {
        kind: 'math',
        content:
          '<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px">\n  <text x="5" y="14" font-size="10" fill="#6366f1">Binomial(10, 0,3)</text>\n  <line x1="15" y1="95" x2="310" y2="95" stroke="#888" stroke-width="1"/>\n  <line x1="15" y1="95" x2="15" y2="10" stroke="#888" stroke-width="1"/>\n  <rect x="18" y="82" width="18" height="13" fill="#6366f1" opacity="0.7"/>\n  <rect x="40" y="60" width="18" height="35" fill="#6366f1" opacity="0.7"/>\n  <rect x="62" y="35" width="18" height="60" fill="#6366f1" opacity="0.8"/>\n  <rect x="84" y="23" width="18" height="72" fill="#6366f1" opacity="0.9"/>\n  <rect x="106" y="30" width="18" height="65" fill="#6366f1" opacity="0.8"/>\n  <rect x="128" y="48" width="18" height="47" fill="#6366f1" opacity="0.7"/>\n  <rect x="150" y="67" width="18" height="28" fill="#6366f1" opacity="0.6"/>\n  <rect x="172" y="80" width="18" height="15" fill="#6366f1" opacity="0.5"/>\n  <rect x="194" y="87" width="18" height="8" fill="#6366f1" opacity="0.4"/>\n  <rect x="216" y="91" width="18" height="4" fill="#6366f1" opacity="0.3"/>\n  <rect x="238" y="93" width="18" height="2" fill="#6366f1" opacity="0.2"/>\n  <text x="18" y="108" font-size="8" fill="#888">0  1  2  3  4  5  6  7  8  9 10</text>\n</svg>',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die **kategorische Verteilung** ist die Ausgabe jedes Klassifikators — Softmax erzeugt ihre Parameter $\\mathbf{p}$. Cross-Entropy-Loss ist der negative Log-Likelihood einer kategorischen Verteilung.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Bernoulli als Baustein\n\nJede Klassifikation in 2 Klassen ist Bernoulli: $y \\sim \\text{Bernoulli}(\\sigma(z))$.\n\nSigmoid $\\sigma(z) = 1/(1+e^{-z})$ gibt $p \\in (0,1)$.\n\n### Kategorisch — Verallgemeinerung\n\n$K = 2$: Kategorisch$(p_1, p_2)$ = Bernoulli$(p_1)$.\n\n$K > 2$: Softmax-Ausgabe $\\hat{y} = \\text{softmax}(z) \\in \\Delta^{K-1}$ (Simplex).\n\nOne-Hot-Label $y \\in \\{e_1, \\dots, e_K\\}$ → $P(Y = k) = \\hat{y}_k$.\n\n### Cross-Entropy-Loss\n\nFür ein kategorisches Modell mit Label $k^*$:\n$$\\ell = -\\ln P(Y = k^*) = -\\ln \\hat{y}_{k^*}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Binomial in der Fehleranalyse**:\n\n$n = 100$ Test-Samples, Fehlerrate $p = 0{,}05$.\n\n$X \\sim \\text{Binomial}(100, 0{,}05)$: Anzahl Fehler.\n\n$E[X] = np = 5$, $\\text{Var}(X) = np(1-p) = 4{,}75$, $\\text{SD} \\approx 2{,}18$.\n\n95%-Intervall: $5 \\pm 2 \\cdot 2{,}18 \\approx [0{,}6, 9{,}4]$ — erwartet 0–9 Fehler bei 95% der Testläufe.',
      },
    ],
    practice: [
      {
        id: 'p1.dv.ex1',
        difficulty: 1,
        conceptTags: ['bernoulli'],
        type: 'mc',
        prompt: 'Ein Neuron feuert mit $p = 0{,}8$ (Dropout-Mask). Was ist $P(\\text{aktiv})$?',
        options: ['$0{,}8$', '$0{,}2$', '$0{,}5$', '$0{,}64$'],
        answer: '$0{,}8$',
        hints: [
          'Bernoulli$(p)$: $P(X=1)=p$.',
          'Aktiv = Ereignis $X=1$.',
          '$P(\\text{aktiv}) = p = 0{,}8$.',
        ],
        explanation:
          'Bernoulli$(0{,}8)$: $P(\\text{aktiv})=0{,}8$, $P(\\text{gedroppt})=0{,}2$.',
      },
      {
        id: 'p1.dv.ex2',
        difficulty: 2,
        conceptTags: ['binomial'],
        type: 'mc',
        prompt: '$X \\sim \\text{Binomial}(10, 0{,}3)$. Was ist $E[X]$?',
        options: ['$3$', '$0{,}3$', '$7$', '$30$'],
        answer: '$3$',
        hints: [
          '$E[X] = np$ für Binomial$(n, p)$.',
          '$n = 10$, $p = 0{,}3$.',
          '$E[X] = 10 \\cdot 0{,}3 = 3$.',
        ],
        explanation:
          '$E[\\text{Binomial}(n,p)] = np = 10 \\cdot 0{,}3 = 3$. Im Schnitt 3 Erfolge von 10 Versuchen.',
      },
      {
        id: 'p1.dv.ex3',
        difficulty: 2,
        conceptTags: ['categorical'],
        type: 'mc',
        prompt: 'Softmax-Output: $\\hat{y} = (0{,}6, 0{,}3, 0{,}1)$ für Klassen $(A, B, C)$. Wie lautet der Cross-Entropy-Loss für wahres Label $A$?',
        options: [
          '$-\\ln(0{,}6) \\approx 0{,}51$',
          '$-\\ln(0{,}3) \\approx 1{,}20$',
          '$-(0{,}6 \\ln 0{,}6 + 0{,}3 \\ln 0{,}3 + 0{,}1 \\ln 0{,}1)$',
          '$0{,}6$',
        ],
        answer: '$-\\ln(0{,}6) \\approx 0{,}51$',
        hints: [
          'Cross-Entropy für wahres Label $k^*$: $\\ell = -\\ln \\hat{y}_{k^*}$.',
          'Wahres Label $A$ → $k^* = A$, $\\hat{y}_A = 0{,}6$.',
          '$\\ell = -\\ln(0{,}6) \\approx 0{,}511$.',
        ],
        explanation:
          '$\\ell = -\\ln \\hat{y}_A = -\\ln(0{,}6) \\approx 0{,}51$. Cross-Entropy bestraft niedrige Wahrscheinlichkeit für die wahre Klasse.',
      },
      {
        id: 'p1.dv.ex4',
        difficulty: 3,
        conceptTags: ['binomial', 'distribution'],
        type: 'mc',
        prompt: '$X \\sim \\text{Binomial}(100, 0{,}05)$. Was ist $\\text{Var}(X)$?',
        options: ['$4{,}75$', '$5$', '$0{,}05$', '$0{,}2375$'],
        answer: '$4{,}75$',
        hints: [
          '$\\text{Var}(X) = np(1-p)$ für Binomial$(n,p)$.',
          '$n=100$, $p=0{,}05$, $1-p=0{,}95$.',
          '$100 \\cdot 0{,}05 \\cdot 0{,}95 = 4{,}75$.',
        ],
        explanation:
          '$\\text{Var}(\\text{Binomial}(100, 0{,}05)) = 100 \\cdot 0{,}05 \\cdot 0{,}95 = 4{,}75$. SD $\\approx 2{,}18$ → Fehleranzahl schwankt typisch zwischen 0 und 9.',
      },
      {
        id: 'p1.dv.ex5',
        difficulty: 3,
        conceptTags: ['categorical', 'bernoulli'],
        type: 'mc',
        prompt: 'Binäre Klassifikation: $\\hat{y} = \\sigma(z) = 0{,}9$, wahres Label $y = 1$. Binärer Cross-Entropy-Loss?',
        options: [
          '$-\\ln(0{,}9) \\approx 0{,}105$',
          '$-\\ln(0{,}1) \\approx 2{,}30$',
          '$0{,}9$',
          '$-(0{,}9 \\ln 0{,}9 + 0{,}1 \\ln 0{,}1)$',
        ],
        answer: '$-\\ln(0{,}9) \\approx 0{,}105$',
        hints: [
          'Binärer CE: $\\ell = -[y \\ln \\hat{y} + (1-y)\\ln(1-\\hat{y})]$.',
          'Mit $y=1$: $\\ell = -\\ln \\hat{y} = -\\ln 0{,}9$.',
          '$-\\ln(0{,}9) \\approx 0{,}105$.',
        ],
        explanation:
          'Für $y=1$: $\\ell = -\\ln \\hat{y} = -\\ln(0{,}9) \\approx 0{,}105$. Modell ist sicher (0,9) und richtig → niedriger Loss.',
      },
      {
        id: 'p1.dv.ex6',
        difficulty: 4,
        conceptTags: ['categorical'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Warum ist Cross-Entropy-Loss äquivalent zu negativem Log-Likelihood unter dem kategorischen Modell?',
        options: [
          'Kategorisches Modell: $P(Y=k^* \\mid x) = \\hat{y}_{k^*}$. NLL $= -\\ln \\hat{y}_{k^*}$ = Cross-Entropy.',
          'Weil Softmax stetig und differenzierbar ist.',
          'Weil MSE und CE für Klassifikation gleich sind.',
          'Nur für Binärklassifikation, nicht allgemein.',
        ],
        answer:
          'Kategorisches Modell: $P(Y=k^* \\mid x) = \\hat{y}_{k^*}$. NLL $= -\\ln \\hat{y}_{k^*}$ = Cross-Entropy.',
        hints: [
          '$P(Y=k \\mid x) = \\hat{y}_k$ (Softmax-Output).',
          'Negative Log-Likelihood: $\\text{NLL} = -\\ln P(Y=k^* \\mid x)$.',
          '$= -\\ln \\hat{y}_{k^*}$ = Cross-Entropy-Loss.',
        ],
        explanation:
          'Cross-Entropy ist der NLL des kategorischen Modells. Training mit CE = MLE des kategorischen Modells. Generalisierung in Lektion 09.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Diskrete Verteilungen in PyTorch\n\n```python\nfrom torch.distributions import Bernoulli, Binomial, Categorical\n\n# Bernoulli: Dropout-Maske\nmask = Bernoulli(0.8).sample((batch_size, hidden_dim))\n\n# Kategorisch: Sampling aus Sprachmodell\nlogits = model(input_ids)  # (batch, vocab)\nprobs = logits.softmax(dim=-1)\nnext_token = Categorical(probs).sample()  # Token ziehen\n\n# Cross-Entropy direkt:\nloss = F.cross_entropy(logits, labels)  # = -log_softmax(logits)[labels]\n```',
      },
      {
        kind: 'callout',
        content:
          'Binomial$(n, p)$ mit großem $n$ und moderatem $p$ ist approximativ $\\mathcal{N}(np, np(1-p))$ (Zentraler Grenzwertsatz). Das erklärt, warum Gaußverteilungen überall auftauchen: viele unabhängige Bernoulli-Ereignisse summieren sich.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.dv.card1',
      front: 'Bernoulli$(p)$ — PMF und Erwartungswert?',
      back: '$P(X=1)=p$, $P(X=0)=1-p$. $E[X]=p$, $\\text{Var}(X)=p(1-p)$.',
      conceptTags: ['bernoulli'],
    },
    {
      id: 'p1.dv.card2',
      front: 'Binomial$(n,p)$ — Erwartungswert und Varianz?',
      back: '$E[X] = np$, $\\text{Var}(X) = np(1-p)$.',
      conceptTags: ['binomial'],
    },
    {
      id: 'p1.dv.card3',
      front: 'Warum ist Cross-Entropy der NLL des kategorischen Modells?',
      back: '$P(Y=k\\mid x) = \\hat{y}_k$ → NLL $= -\\ln \\hat{y}_{k^*}$ = CE-Loss.',
      conceptTags: ['categorical'],
    },
  ],

  learningOutcome:
    'Du kannst Bernoulli-, Binomial-, kategorische und Poisson-Verteilung definieren, ihre Parameter und Kenngrößen berechnen und erklären, warum Cross-Entropy-Loss direkt die negative Log-Likelihood des kategorischen Modells ist.',

  description:
    'Diskrete Verteilungen sind die Bausteine binärer Klassifikation, Mehrklassen-Klassifikation und Sequenzmodellierung. Bernoulli für 0/1-Entscheidungen, Kategorisch für Softmax-Ausgaben, Binomial für Fehlerraten — diese Verteilungen stecken in jedem ML-Training-Loop.',

  conceptSteps: [
    {
      title: 'Bernoulli-Verteilung — die binäre Entscheidung',
      preprompt: 'Ein Neuron feuert oder feuert nicht. Eine E-Mail ist Spam oder kein Spam. Was haben diese Situationen gemeinsam?',
      body: 'Die **Bernoulli-Verteilung** Bernoulli$(p)$ modelliert ein binäres Ergebnis:\n\n$$P(X = 1) = p, \\qquad P(X = 0) = 1 - p$$\n\nParameterisierung durch die Erfolgswahrscheinlichkeit $p \\in [0,1]$.\n\n$$\\mathbb{E}[X] = p, \\qquad \\text{Var}(X) = p(1-p)$$\n\nVarianz ist maximal bei $p = 0{,}5$ (maximale Unsicherheit) und null bei $p=0$ oder $p=1$ (Sicherheit).',
      miniExample: 'Binäre Klassifikation: $\\hat{y} = \\sigma(z) \\in (0,1)$ ist der Parameter der Bernoulli-Verteilung für Label $Y$.',
    },
    {
      title: 'Binomial — $n$ unabhängige Bernoullis',
      body: 'Die **Binomial-Verteilung** Binomial$(n, p)$ zählt die Erfolge in $n$ unabhängigen Bernoulli-Versuchen:\n\n$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad k = 0, 1, \\ldots, n$$\n\n$$\\mathbb{E}[X] = np, \\qquad \\text{Var}(X) = np(1-p)$$\n\nIn ML: Anzahl korrekt klassifizierter Samples unter einer Bernoulli-Fehlerrate.',
      miniExample: '100 Test-Samples, Fehlerrate $p = 0{,}05$: $\\mathbb{E}[\\text{Fehler}] = 5$, $\\text{SD} \\approx 2{,}18$.',
    },
    {
      title: 'Kategorische Verteilung — der $K$-seitige Würfel',
      body: 'Die **kategorische Verteilung** Kategorisch$(\\mathbf{p})$ ist die Verallgemeinerung von Bernoulli auf $K$ Klassen:\n\n$$P(X = k) = p_k, \\quad k = 1,\\ldots,K, \\qquad \\sum_{k=1}^K p_k = 1$$\n\nParameter: Wahrscheinlichkeitsvektor $\\mathbf{p} = (p_1, \\ldots, p_K)$ im Wahrscheinlichkeitssimplex $\\Delta^{K-1}$.\n\n**Softmax** erzeugt genau diesen Vektor aus Logits $z$:\n\n$$p_k = \\text{softmax}(z)_k = \\frac{e^{z_k}}{\\sum_{j} e^{z_j}}$$',
      miniExample: 'Sprachmodell: $K = 50{.}000$ Tokens. Softmax-Output $\\mathbf{p}$ = PMF der kategorischen Verteilung über das Vokabular.',
    },
    {
      title: 'Poisson-Verteilung — seltene Ereignisse',
      body: 'Die **Poisson-Verteilung** Poisson$(\\lambda)$ modelliert die Anzahl seltener Ereignisse in einem festen Zeitraum:\n\n$$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad k = 0, 1, 2, \\ldots$$\n\n$$\\mathbb{E}[X] = \\text{Var}(X) = \\lambda$$\n\nBesonderheit: Erwartungswert und Varianz sind gleich.\n\nIn ML: Modellierung von Anfrageraten, Klickzahlen, Token-Häufigkeiten in seltenen Ereignissen.',
      miniExample: 'Durchschnittlich $\\lambda = 3$ Fehler pro Batch. $P(\\text{kein Fehler}) = e^{-3} \\approx 0{,}05$.',
    },
    {
      title: 'Entropie diskreter Verteilungen',
      body: 'Die **Entropie** $H(p)$ misst die Unsicherheit einer diskreten Verteilung:\n\n$$H(p) = -\\sum_{k=1}^K p_k \\ln p_k$$\n\n- Gleichverteilung: maximale Entropie $H = \\ln K$\n- Deterministische Verteilung (ein $p_k = 1$): $H = 0$\n- Bernoulli$(0{,}5)$: $H = \\ln 2 \\approx 0{,}693$ (maximale Unsicherheit)\n\nEntropie ist die untere Schranke für die durchschnittliche Code-Länge (Shannon).',
      miniExample: 'Softmax-Output $(0{,}9, 0{,}05, 0{,}05)$: niedrige Entropie → Modell ist zuversichtlich. $(0{,}33, 0{,}33, 0{,}34)$: hohe Entropie → Modell ist unsicher.',
      selfCheck: 'Warum ist die Entropie der Gleichverteilung maximal? (Alle Klassen gleich wahrscheinlich = maximale Unsicherheit.)',
    },
    {
      title: 'ML: Cross-Entropy-Loss als Log-Likelihood',
      body: 'Das kategorische Modell setzt $P(Y = k \\mid x) = \\hat{y}_k$. Für Sample $(x_i, y_i = k^*)$:\n\n$$-\\ln P(y_i \\mid x_i, \\theta) = -\\ln \\hat{y}_{k^*}$$\n\nDurchschnittlicher NLL über $n$ Samples:\n\n$$\\mathcal{L}(\\theta) = -\\frac{1}{n}\\sum_{i=1}^n \\ln \\hat{y}_{k_i^*} = \\text{CE-Loss}$$\n\n**Cross-Entropy-Training = MLE des kategorischen Modells**. Jedes neuronale Netz für Klassifikation macht nichts anderes als MLE unter der kategorischen Verteilung.',
      selfCheck: 'Was passiert mit dem CE-Loss, wenn $\\hat{y}_{k^*} \\to 1$? (CE $= -\\ln(1) = 0$ — perfekte Vorhersage, Loss = 0.)',
    },
  ],

  codeBridges: [
    {
      title: 'torch.distributions: Bernoulli, Categorical; Cross-Entropy',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F
from torch.distributions import Bernoulli, Categorical, Binomial

# --- Bernoulli: Dropout-Maske ---
p_keep = 0.8  # 80% der Neuronen bleiben aktiv
mask = Bernoulli(probs=p_keep).sample((4, 128))  # (batch, hidden)
print(mask.mean())  # ≈ 0.8

# --- Kategorisch: Sampling aus einem Sprachmodell ---
logits = torch.randn(50_000)           # Vokabular-Größe 50k
probs  = logits.softmax(dim=0)         # PMF der kategorischen Verteilung
dist   = Categorical(probs=probs)
next_token = dist.sample()             # Token ziehen
log_p_token = dist.log_prob(next_token)  # NLL dieses Tokens

# --- Cross-Entropy-Loss = NLL des kategorischen Modells ---
batch_logits = torch.randn(32, 10)     # Logits: 32 Samples, 10 Klassen
labels       = torch.randint(0, 10, (32,))  # wahre Klassen

# torch berechnet: -log_softmax(logits)[labels] (numerisch stabil)
loss = F.cross_entropy(batch_logits, labels)

# Äquivalent manuell:
probs_batch = batch_logits.softmax(dim=1)
nll_manual = -probs_batch[range(32), labels].log().mean()
print(torch.allclose(loss, nll_manual, atol=1e-5))  # True

# --- Binomial: Fehlerrate schätzen ---
n_samples, p_error = 100, 0.05
b = Binomial(total_count=n_samples, probs=p_error)
print(f"E[Fehler]={b.mean:.1f}, Std={b.variance.sqrt():.2f}")`,
      annotation: '`F.cross_entropy` ist numerisch stabil durch `log_softmax`-Trick. Manuell: `probs.log()` kann zu $-\\infty$ führen bei sehr kleinen Werten. `log_prob` der Categorical entspricht direkt dem NLL $= -\\ln \\hat{y}_{k^*}$.',
    },
  ],

  derivations: [
    {
      claim: 'Cross-Entropy-Loss ist der NLL des kategorischen Modells',
      reasoning:
        'Kategorisches Modell: $P(Y=k \\mid x, \\theta) = \\hat{y}_k = \\text{softmax}(f_\\theta(x))_k$. Für Sample $(x_i, y_i)$ mit wahrem Label $k_i^*$ (One-Hot $y_i$): $-\\ln P(y_i \\mid x_i, \\theta) = -\\ln \\hat{y}_{k_i^*} = -\\sum_k y_{ik} \\ln \\hat{y}_{ik} = H(y_i, \\hat{y}_i)$ (Cross-Entropy mit One-Hot-Label). Durchschnitt über $n$ Samples: $\\mathcal{L} = \\frac{1}{n}\\sum_i H(y_i, \\hat{y}_i)$ = CE-Loss. Training mit CE = MLE des kategorischen Modells.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Bernoulli$(p)$ und Binomial$(1, p)$ sind verschieden',
      correct: 'Binomial$(1, p)$ = Bernoulli$(p)$ — Bernoulli ist Spezialfall von Binomial',
      explanation:
        'Binomial$(n=1, p)$ zählt Erfolge in einem einzigen Versuch — identisch zu Bernoulli. Kategorisch mit $K=2$ ist ebenfalls äquivalent zu Bernoulli.',
    },
    {
      wrong: 'Entropie $H(p)$ und Cross-Entropy $H(p, q)$ sind dasselbe',
      correct: 'Entropie $H(p) = -\\sum_k p_k \\ln p_k$; Cross-Entropy $H(p, q) = -\\sum_k p_k \\ln q_k$',
      explanation:
        'Entropie $H(p)$ misst die Unsicherheit der wahren Verteilung $p$. Cross-Entropy $H(p, q)$ misst, wie gut $q$ die Verteilung $p$ kodiert. CE-Loss = Cross-Entropy zwischen One-Hot-Label (wahre Verteilung) und Softmax-Output (Modellverteilung).',
    },
    {
      wrong: 'Poisson-Verteilung hat immer Varianz = Erwartungswert in der Praxis',
      correct: 'Das gilt nur für die theoretische Poisson-Verteilung; reale Daten können über- oder unterdispers sein',
      explanation:
        'Reale Zähldaten zeigen oft Überdispersion (Varianz > Erwartungswert). Negative-Binomial-Verteilung verallgemeinert Poisson auf überdisperse Zähldaten — relevant für Text-Token-Häufigkeiten.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "The Binomial Distribution, Clearly Explained" (YouTube)',
      type: 'video',
      note: 'Visuell klare Erklärung; zeigt Verbindung zu Bernoulli',
    },
    {
      title: 'MML Book, Kapitel 6.3: "Sum Rule, Product Rule, and Bayes Theorem"',
      type: 'book',
      note: 'Kontext der diskreten Verteilungen in probabilistischer Modellierung',
    },
    {
      title: 'Deep Learning Book (Goodfellow et al.), Kapitel 3: "Probability and Information Theory"',
      type: 'book',
      note: 'Freier Online-Zugang; Kapitel 3.9 behandelt Entropie und CE direkt',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'requires',
      hint: 'PMF-Konzept ist Voraussetzung: Bernoulli, Binomial und Kategorisch sind konkrete PMFs.',
    },
    {
      lessonId: 'p1.erwartungswert-varianz',
      relation: 'extends',
      hint: '$\\mathbb{E}[X] = np$ für Binomial und Var$(X) = p(1-p)$ für Bernoulli werden mit allgemeinen Rechenregeln hergeleitet.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'Cross-Entropy-Loss = NLL des kategorischen Modells = MLE; Lektion 09 verallgemeinert dies.',
    },
    {
      lessonId: 'p1.bedingte-wahrscheinlichkeit',
      relation: 'see-also',
      hint: 'Autoregressive Sprachmodelle faktorisieren die kategorische Verteilung über Sequenzen via Kettenregel.',
    },
  ],

  reflection: 'Jedes Mal, wenn du `F.cross_entropy` aufrufst, implementierst du MLE unter dem kategorischen Modell. Jede Dropout-Maske ist ein Sample aus Bernoulli. **Was hat dich am meisten überrascht: die enge Verbindung zwischen CE-Loss und Likelihood, oder dass Poisson-Varianz gleich dem Erwartungswert ist?**',
}
