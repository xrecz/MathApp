import type { Lesson } from '../../../types'

export const mle: Lesson = {
  id: 'p1.mle',
  title: 'Maximum-Likelihood-Schätzung (MLE)',
  conceptTags: ['mle', 'likelihood', 'log-likelihood', 'cross-entropy', 'optimization'],
  estimatedMinutes: 18,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Maximum-Likelihood-Schätzung\n\nGegeben Daten $D = \\{x_1, \\ldots, x_n\\}$, wähle Parameter $\\theta$, die die Likelihood maximieren:\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\prod_{i=1}^n P(x_i \\mid \\theta)$$\n\nÄquivalent: **Log-Likelihood** maximieren (Logarithmus ist monoton):\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\ln P(x_i \\mid \\theta)$$\n\n= $\\arg\\min_\\theta$ **negativeLog-Likelihood (NLL)**.',
      },
      {
        kind: 'math',
        content:
          '$$\\text{Cross-Entropy: } H(p, q) = -\\sum_k p_k \\ln q_k$$\n\n$$\\text{MLE für kategor. Modell: } \\hat{\\theta} = \\arg\\min_\\theta \\frac{1}{n}\\sum_i H(y_i, \\hat{y}_i) = \\arg\\min_\\theta \\text{CE-Loss}$$\n\n$$\\boxed{\\text{Cross-Entropy-Loss} \\equiv \\text{NLL des kategorischen Modells} \\equiv \\text{MLE}}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Kernpunkt**: Cross-Entropy-Training eines Klassifikators **ist** MLE. Das minimierte CE-Loss ist der NLL des kategorischen Modells $P(y \\mid x, \\theta) = \\text{softmax}(f_\\theta(x))$. Das verbindet statistisches Fundament (MLE) mit praktischem Training.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### MLE-Herleitung für Klassifikation\n\nModell: $P(y = k \\mid x, \\theta) = \\hat{y}_k = \\text{softmax}(f_\\theta(x))_k$.\n\nLikelihood für einen Sample $(x_i, y_i = k^*)$:\n\n$P(y_i \\mid x_i, \\theta) = \\hat{y}_{k^*}$\n\nLog-Likelihood über $n$ Samples:\n\n$\\ell(\\theta) = \\sum_{i=1}^n \\ln \\hat{y}_{k_i^*}$\n\nNLL (als Loss minimiert):\n\n$\\mathcal{L}(\\theta) = -\\frac{1}{n}\\sum_{i=1}^n \\ln \\hat{y}_{k_i^*} = \\frac{1}{n}\\sum_{i=1}^n H(y_i, \\hat{y}_i)$\n\n### Cross-Entropy = NLL\n\nMit One-Hot $y_i$ ($y_{ik} = 1$ für wahre Klasse $k^*$, sonst 0):\n\n$H(y_i, \\hat{y}_i) = -\\sum_k y_{ik} \\ln \\hat{y}_{ik} = -\\ln \\hat{y}_{k_i^*}$',
      },
      {
        kind: 'worked-example',
        content:
          '**MLE für Gauß — ergibt MSE**:\n\nModell: $y \\mid x, \\theta \\sim \\mathcal{N}(f_\\theta(x), \\sigma^2)$.\n\nLog-Likelihood:\n\n$\\ell(\\theta) = -\\frac{1}{2\\sigma^2}\\sum_i (y_i - f_\\theta(x_i))^2 + \\text{const}$\n\nMaximieren $\\ell$ = Minimieren $\\sum_i (y_i - f_\\theta(x_i))^2$ = **MSE-Loss**.\n\n**Zusammenfassung**:\n- Gauß-Modell → MLE → **MSE**\n- Kategorisches Modell → MLE → **Cross-Entropy**\n- Laplace-Modell $\\propto e^{-|x|/b}$ → MLE → **MAE**',
      },
    ],
    practice: [
      {
        id: 'p1.mle.ex1',
        difficulty: 1,
        conceptTags: ['mle'],
        type: 'mc',
        prompt: 'Was maximiert MLE?',
        options: [
          '$P(D \\mid \\theta)$ — Wahrscheinlichkeit der Daten unter dem Modell',
          '$P(\\theta \\mid D)$ — Posterior',
          '$P(\\theta)$ — Prior',
          '$P(D)$ — Evidenz',
        ],
        answer: '$P(D \\mid \\theta)$ — Wahrscheinlichkeit der Daten unter dem Modell',
        hints: [
          'MLE = Maximum **Likelihood** Estimation.',
          'Likelihood = $P(\\text{Daten} \\mid \\theta)$.',
          'Kein Prior → kein Posterior.',
        ],
        explanation:
          'MLE: $\\hat{\\theta} = \\arg\\max_\\theta P(D \\mid \\theta)$. \"Welche Parameter machen die beobachteten Daten am wahrscheinlichsten?\"',
      },
      {
        id: 'p1.mle.ex2',
        difficulty: 2,
        conceptTags: ['log-likelihood'],
        type: 'mc',
        prompt:
          'Warum optimiert man Log-Likelihood statt Likelihood?',
        options: [
          'Produkt von Wahrscheinlichkeiten → numerischer Underflow; Log-Transformation: Produkt → Summe',
          'Log-Likelihood ist immer größer als Likelihood',
          'Log-Likelihood ist einfacher zu differenzieren für alle Modelle',
          'Maximierung und Minimierung sind nicht äquivalent ohne Log',
        ],
        answer:
          'Produkt von Wahrscheinlichkeiten → numerischer Underflow; Log-Transformation: Produkt → Summe',
        hints: [
          '$\\prod_i p_i$ mit $p_i < 1$: bei $n=1000$ wird das Produkt winzig (Underflow).',
          '$\\ln \\prod_i p_i = \\sum_i \\ln p_i$ — stabil.',
          'Logarithmus ist monoton → Argmax bleibt gleich.',
        ],
        explanation:
          '$\\ln$ ist monoton steigend: $\\arg\\max \\ln f = \\arg\\max f$. Produkt von kleinen Zahlen → Underflow; Summe von Log-Wahrscheinlichkeiten → numerisch stabil.',
      },
      {
        id: 'p1.mle.ex3',
        difficulty: 2,
        conceptTags: ['cross-entropy', 'mle'],
        type: 'mc',
        prompt:
          'CE-Loss: $\\mathcal{L} = -\\frac{1}{n}\\sum_i \\ln \\hat{y}_{k_i^*}$. Was ist $\\hat{y}_{k_i^*}$?',
        options: [
          'Modell-Wahrscheinlichkeit für die wahre Klasse von Sample $i$',
          'One-Hot-Label',
          'Vorhersage-Konfidenz der falschen Klasse',
          'Durchschnitt aller Softmax-Ausgaben',
        ],
        answer: 'Modell-Wahrscheinlichkeit für die wahre Klasse von Sample $i$',
        hints: [
          '$k_i^*$ = wahre Klasse von Sample $i$.',
          '$\\hat{y}_{k_i^*}$ = Softmax-Ausgabe für diese wahre Klasse.',
          'CE straft niedrige Wahrscheinlichkeit für die wahre Klasse.',
        ],
        explanation:
          '$\\hat{y}_{k^*}$ = $P(y = k^* \\mid x_i, \\theta)$ = Modell-Konfidenz für die wahre Klasse. CE-Loss = $-\\ln$(Konfidenz für wahre Klasse) → Maximiere Konfidenz für wahre Klassen.',
      },
      {
        id: 'p1.mle.ex4',
        difficulty: 3,
        conceptTags: ['mle', 'cross-entropy'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Welches Verlustmaß ergibt sich aus MLE unter dem Gauß-Modell $p(y\\mid x,\\theta) = \\mathcal{N}(f_\\theta(x), \\sigma^2)$?',
        options: [
          'MSE: $\\frac{1}{n}\\sum_i (y_i - f_\\theta(x_i))^2$',
          'Cross-Entropy',
          'MAE: $\\frac{1}{n}\\sum_i |y_i - f_\\theta(x_i)|$',
          'Hinge-Loss',
        ],
        answer: 'MSE: $\\frac{1}{n}\\sum_i (y_i - f_\\theta(x_i))^2$',
        hints: [
          '$\\ell(\\theta) = -\\frac{1}{2\\sigma^2}\\sum_i(y_i - f_\\theta(x_i))^2 + \\text{const}$.',
          'Maximiere $\\ell$ = minimiere $\\sum_i(y_i - f_\\theta(x_i))^2$.',
          '= MSE-Loss.',
        ],
        explanation:
          'Gauß-Modell → NLL = MSE (bis auf Skalierung). MSE-Training setzt implizit Gauß-Annahme auf Residuen voraus.',
      },
      {
        id: 'p1.mle.ex5',
        difficulty: 3,
        conceptTags: ['cross-entropy', 'log-likelihood'],
        type: 'mc',
        prompt:
          'Sample: Softmax-Output $(0{,}1, 0{,}8, 0{,}1)$, wahres Label = Klasse 2. NLL?',
        options: [
          '$-\\ln(0{,}8) \\approx 0{,}223$',
          '$-\\ln(0{,}1) \\approx 2{,}303$',
          '$0{,}8$',
          '$-(0{,}1\\ln 0{,}1 + 0{,}8 \\ln 0{,}8 + 0{,}1 \\ln 0{,}1)$',
        ],
        answer: '$-\\ln(0{,}8) \\approx 0{,}223$',
        hints: [
          'NLL = $-\\ln P(y = k^* \\mid x, \\theta)$.',
          'Wahre Klasse = 2, $\\hat{y}_2 = 0{,}8$.',
          '$-\\ln(0{,}8) \\approx 0{,}223$.',
        ],
        explanation:
          'NLL $= -\\ln(0{,}8) \\approx 0{,}223$. Modell ist zuversichtlich (0,8) und richtig → niedriger Loss. Bei $\\hat{y}_2 = 0{,}01$ wäre NLL $= -\\ln(0{,}01) \\approx 4{,}6$.',
      },
      {
        id: 'p1.mle.ex6',
        difficulty: 4,
        conceptTags: ['mle', 'cross-entropy'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: KL-Divergenz $D_{\\text{KL}}(p \\| q) = \\sum_k p_k \\ln(p_k/q_k)$. Wie hängt CE-Minimierung damit zusammen?',
        options: [
          '$H(p, q) = H(p) + D_{\\text{KL}}(p \\| q)$ — CE-Minimierung über $q$ ≡ KL-Minimierung, da $H(p)$ fest ist',
          'CE und KL sind vollständig unabhängig',
          'CE-Minimierung maximiert KL',
          'Nur äquivalent für Binärklassifikation',
        ],
        answer:
          '$H(p, q) = H(p) + D_{\\text{KL}}(p \\| q)$ — CE-Minimierung über $q$ ≡ KL-Minimierung, da $H(p)$ fest ist',
        hints: [
          '$H(p,q) = -\\sum_k p_k \\ln q_k$.',
          '$D_{\\text{KL}}(p\\|q) = \\sum_k p_k \\ln(p_k/q_k) = -\\sum_k p_k \\ln q_k + \\sum_k p_k \\ln p_k$.',
          '$= H(p,q) - H(p)$. Da $H(p)$ fest: minimiere $H(p,q)$ ≡ minimiere $D_{\\text{KL}}$.',
        ],
        explanation:
          '$H(p,q) = H(p) + D_{\\text{KL}}(p\\|q)$. CE-Minimierung über $q$ bei festem $p$ = KL-Minimierung = \"bringe Modellverteilung $q$ näher an wahre Verteilung $p$\".',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## MLE in modernen LLMs\n\n**Pretraining**: Autoregressive MLE — $\\mathcal{L} = -\\sum_t \\ln P(w_t \\mid w_{<t}, \\theta)$.\n\n**Fine-Tuning (SFT)**: MLE auf Demonstrations-Daten (Instruction-following Pairs).\n\n**RLHF**: Verlässt MLE — optimiert Reward-Modell statt Likelihood. Aber: PPO-Schritt beinhaltet KL-Penalty gegen MLE-Policy.\n\n**Label Smoothing**: Weiche Labels $y_{\\text{smooth}} = (1-\\epsilon) y_\\text{one-hot} + \\epsilon/K$ — CE mit weichen Labels verhindert Overconfidence.',
      },
      {
        kind: 'callout',
        content:
          'Triad der Verlustfunktionen:\n\n| Modell | Verteilung | Loss |\n|--------|-----------|------|\n| Regression | Gauß | MSE |\n| Klassifikation | Kategorisch | Cross-Entropy |\n| Robust Regression | Laplace | MAE |\n\nWahl der Verlustfunktion = Wahl des Rauschmodells.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.mle.card1',
      front: 'Was ist MLE?',
      back: '$\\hat{\\theta} = \\arg\\max_\\theta \\prod_i P(x_i \\mid \\theta) = \\arg\\max_\\theta \\sum_i \\ln P(x_i \\mid \\theta)$.',
      conceptTags: ['mle'],
    },
    {
      id: 'p1.mle.card2',
      front: 'Cross-Entropy-Loss = was?',
      back: 'NLL des kategorischen Modells = MLE für Klassifikatoren. $\\mathcal{L} = -\\frac{1}{n}\\sum_i \\ln \\hat{y}_{k_i^*}$.',
      conceptTags: ['cross-entropy', 'mle'],
    },
    {
      id: 'p1.mle.card3',
      front: 'Welcher Loss ergibt sich aus MLE unter Gauß-Modell?',
      back: 'MSE: $\\mathcal{L} = \\frac{1}{n}\\sum_i(y_i - f_\\theta(x_i))^2$.',
      conceptTags: ['mle', 'log-likelihood'],
    },
  ],

  learningOutcome:
    'Du kannst MLE formal definieren, Log-Likelihood herleiten, MLE für Normal- und Binomialverteilung berechnen und beweisen, dass Cross-Entropy-Loss der negative Log-Likelihood des kategorischen Modells ist.',

  description:
    'Maximum Likelihood Estimation ist das statistische Fundament des ML-Trainings. Jedes Mal, wenn du ein neuronales Netz mit Cross-Entropy trainierst, führst du MLE durch. MSE-Regression ist MLE unter Gauß-Annahme. Das zu verstehen bedeutet, Loss-Funktionen nicht mehr als willkürliche Entscheidungen, sondern als probabilistische Aussagen zu sehen.',

  conceptSteps: [
    {
      title: 'Was ist Likelihood?',
      preprompt: 'Du hast eine Münze 10 Mal geworfen und 7 Mal Kopf erhalten. Welche Münze (welcher Wert von $p$) macht dieses Ergebnis am "wahrscheinlichsten"?',
      body: 'Die **Likelihood** $\\mathcal{L}(\\theta)$ beantwortet die Frage: "Wie gut erklärt Parameter $\\theta$ die beobachteten Daten?"\n\nFür i.i.d. Daten $D = \\{x_1, \\ldots, x_n\\}$:\n\n$$\\mathcal{L}(\\theta) = P(D \\mid \\theta) = \\prod_{i=1}^n P(x_i \\mid \\theta)$$\n\nDas ist das Produkt der Wahrscheinlichkeiten/Dichten der einzelnen Beobachtungen unter dem Modell mit Parameter $\\theta$.\n\n**MLE**: Wähle $\\hat{\\theta}$ so, dass die Likelihood maximal wird:\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\mathcal{L}(\\theta)$$',
      miniExample: '3 Münzwürfe: Kopf, Kopf, Zahl. Likelihood für $\\theta = 0{,}7$: $0{,}7 \\cdot 0{,}7 \\cdot 0{,}3 = 0{,}147$. Für $\\theta = 0{,}5$: $0{,}5^3 = 0{,}125$. $\\theta = 0{,}7$ ist wahrscheinlicher.',
    },
    {
      title: 'Likelihood vs. Wahrscheinlichkeit',
      body: 'Ein kritischer Unterschied, der oft verwechselt wird:\n\n| | Wahrscheinlichkeit | Likelihood |\n|---|---|---|\n| Frage | $P(D \\mid \\theta)$ bei festem $\\theta$ | $\\mathcal{L}(\\theta) = P(D \\mid \\theta)$ bei festem $D$ |\n| Variable | $D$ variiert | $\\theta$ variiert |\n| Summe | $\\sum_D P(D \\mid \\theta) = 1$ | $\\int \\mathcal{L}(\\theta)\\, d\\theta \\neq 1$ im Allg. |\n| Normierung | Gültige Verteilung über $D$ | **Keine** Verteilung über $\\theta$ |\n\n**Wichtig**: Die Likelihood ist keine Wahrscheinlichkeit über $\\theta$. Sie misst die Kompatibilität der Daten mit dem Parameter.',
      selfCheck: 'Kann $\\mathcal{L}(\\theta) > 1$ sein? (Ja — für kontinuierliche Daten ist es eine Dichte, keine Wahrscheinlichkeit.)',
    },
    {
      title: 'Log-Likelihood — warum Log?',
      body: 'Das Produkt $\\prod_{i=1}^n P(x_i \\mid \\theta)$ bei $n = 1000$: winzige Zahlen → numerischer **Underflow**.\n\nLösung: **Log-Likelihood** $\\ell(\\theta) = \\ln \\mathcal{L}(\\theta)$:\n\n$$\\ell(\\theta) = \\sum_{i=1}^n \\ln P(x_i \\mid \\theta)$$\n\nVorteile:\n1. **Numerisch stabil**: Summe statt Produkt\n2. **Gleiches Argmax**: $\\ln$ ist monoton → $\\arg\\max \\ell = \\arg\\max \\mathcal{L}$\n3. **Einfachere Algebra**: $\\ln(e^{-x^2/2}) = -x^2/2$ statt $e^{-x^2/2}$\n4. **Additivität**: $\\ln \\prod_i = \\sum_i \\ln$',
      miniExample: '$n=1000$ Samples, $P(x_i \\mid \\theta) = 0{,}1$: Likelihood $= 10^{-1000}$ (Underflow!). Log-Likelihood $= 1000 \\cdot \\ln(0{,}1) = -2302{,}6$ (stabil).',
    },
    {
      title: 'MLE: Ableiten und Nullsetzen',
      body: 'MLE löst $\\frac{d}{d\\theta} \\ell(\\theta) = 0$ (notwendige Bedingung für Maximum).\n\n**Allgemeines Vorgehen**:\n1. Schreibe Log-Likelihood $\\ell(\\theta) = \\sum_i \\ln P(x_i \\mid \\theta)$\n2. Leite nach $\\theta$ ab: $\\frac{d\\ell}{d\\theta} = 0$\n3. Löse nach $\\hat{\\theta}$ auf\n4. Prüfe: Ist es ein Maximum? ($\\frac{d^2\\ell}{d\\theta^2} < 0$)\n\nFür mehrere Parameter: Gradient $\\nabla_\\theta \\ell(\\theta) = 0$ (Gleichungssystem).',
      miniExample: 'Bernoulli: $\\ell(p) = k \\ln p + (n-k) \\ln(1-p)$. $\\frac{d\\ell}{dp} = k/p - (n-k)/(1-p) = 0$ → $\\hat{p} = k/n$ — relativer Anteil der Erfolge.',
    },
    {
      title: 'MLE für Normalverteilung',
      body: 'Daten $x_1, \\ldots, x_n \\sim \\mathcal{N}(\\mu, \\sigma^2)$ (beide unbekannt). Log-Likelihood:\n\n$$\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi) - \\frac{n}{2}\\ln(\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - \\mu)^2$$\n\n**MLE-Schätzer**:\n$$\\hat{\\mu}_{\\text{MLE}} = \\frac{1}{n}\\sum_i x_i = \\bar{x} \\qquad \\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum_i (x_i - \\bar{x})^2$$\n\n**Achtung**: $\\hat{\\sigma}^2_{\\text{MLE}}$ teilt durch $n$, nicht $n-1$ — der MLE für Varianz ist **verzerrt** (biased)!',
      selfCheck: 'Warum ist $\\hat{\\sigma}^2_{\\text{MLE}}$ verzerrt? ($\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{n-1}{n}\\sigma^2 \\neq \\sigma^2$ — Bessel-Korrektur $\\frac{1}{n-1}$ behebt das.)',
    },
    {
      title: 'ML: Cross-Entropy-Loss IST negatives MLE',
      body: 'Kategorisches Modell: $P(y = k \\mid x, \\theta) = \\hat{y}_k = \\text{softmax}(f_\\theta(x))_k$.\n\nLog-Likelihood über $n$ Samples:\n\n$$\\ell(\\theta) = \\sum_{i=1}^n \\ln P(y_i \\mid x_i, \\theta) = \\sum_{i=1}^n \\ln \\hat{y}_{k_i^*}$$\n\nNegative Log-Likelihood (NLL) als Verlust:\n\n$$\\mathcal{L}_{\\text{NLL}}(\\theta) = -\\frac{1}{n}\\sum_i \\ln \\hat{y}_{k_i^*} = \\frac{1}{n}\\sum_i H(y_i, \\hat{y}_i) = \\mathcal{L}_{\\text{CE}}$$\n\n$$\\boxed{\\text{Training mit Cross-Entropy} \\equiv \\text{MLE des kategorischen Modells}}$$\n\n| Modell | Loss | Probabilistische Deutung |\n|---|---|---|\n| Gauß | MSE | MLE $\\mathcal{N}(f_\\theta, \\sigma^2)$ |\n| Kategorisch | CE | MLE Kategorisch$(\\hat{y})$ |\n| Laplace | MAE | MLE $\\text{Laplace}(f_\\theta, b)$ |',
      selfCheck: 'Was passiert mit dem CE-Loss, wenn das Modell perfekt sicher für die wahre Klasse ist? ($\\hat{y}_{k^*} = 1 \\Rightarrow \\mathcal{L}_{\\text{CE}} = -\\ln(1) = 0$)',
    },
    {
      title: 'MLE und KL-Divergenz',
      body: 'MLE hat eine tiefere Bedeutung: Es minimiert die **KL-Divergenz** zwischen der Datenverteilung $p_{\\text{data}}$ und dem Modell $p_\\theta$:\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\min_\\theta D_{\\text{KL}}(p_{\\text{data}} \\| p_\\theta) = \\arg\\min_\\theta -\\mathbb{E}_{p_{\\text{data}}}[\\ln p_\\theta(x)]$$\n\nDa $\\mathbb{E}_{p_{\\text{data}}}[\\ln p_\\theta(x)] \\approx \\frac{1}{n}\\sum_i \\ln p_\\theta(x_i)$ (empirischer Erwartungswert):\n\n$$\\Rightarrow \\text{MLE} \\approx \\arg\\min_\\theta D_{\\text{KL}}(p_{\\text{data}} \\| p_\\theta)$$\n\nTraining = Annähern der Modellverteilung an die Datenverteilung.',
      selfCheck: 'Was bedeutet $D_{\\text{KL}}(p \\| q) = 0$? (Die Verteilungen $p$ und $q$ sind identisch — das Modell hat die Datenverteilung perfekt gelernt.)',
    },
  ],

  codeBridges: [
    {
      title: 'MLE von Hand für Binomial; torch.nn.CrossEntropyLoss als NLL',
      lang: 'python',
      code: `import torch
import torch.nn as nn
import numpy as np
from scipy.optimize import minimize_scalar

# --- MLE für Binomialverteilung ---
# Daten: 100 Münzwürfe, 63 Kopf
n_trials, n_heads = 100, 63

# Log-Likelihood als Funktion von p
def neg_log_likelihood_binomial(p):
    if p <= 0 or p >= 1:
        return float('inf')
    # log L(p) = k*log(p) + (n-k)*log(1-p) + const
    return -(n_heads * np.log(p) + (n_trials - n_heads) * np.log(1 - p))

# Numerische Optimierung
result = minimize_scalar(neg_log_likelihood_binomial, bounds=(0.01, 0.99), method='bounded')
p_mle = result.x
print(f"MLE p = {p_mle:.4f}")   # ≈ 0.6300 = 63/100 (analytisch!)
print(f"Analytisch: {n_heads/n_trials:.4f}")  # identisch

# --- CrossEntropyLoss als NLL (kategorisches Modell) ---
# Direkte Verknüpfung: F.cross_entropy = NLL des kategorischen Modells
batch = 4
n_classes = 3
logits = torch.tensor([
    [2.0, 0.5, -0.5],  # Sample 0: Klasse 0 bevorzugt
    [0.5, 2.0, -0.5],  # Sample 1: Klasse 1 bevorzugt
    [0.1, 0.1, 3.0],   # Sample 2: Klasse 2 bevorzugt
    [1.0, 1.0, 1.0],   # Sample 3: unsicher
])
labels = torch.tensor([0, 1, 2, 0])  # wahre Klassen

# CrossEntropy = NLL des kategorischen Modells
ce_loss = nn.CrossEntropyLoss()(logits, labels)
print(f"CE Loss (NLL): {ce_loss.item():.4f}")

# Manuell: -1/n * sum_i log(softmax(logits)[i, label[i]])
probs = logits.softmax(dim=1)
nll_manual = -probs[range(batch), labels].log().mean()
print(f"NLL manuell:   {nll_manual.item():.4f}")  # identisch!

# Gauß-MLE = MSE (numerisch bestätigt)
y_pred = torch.tensor([1.5, 2.5, 0.5, 3.0])
y_true = torch.tensor([1.0, 2.0, 1.0, 3.0])
mse = nn.MSELoss()(y_pred, y_true)
gauß_nll = -torch.distributions.Normal(y_pred, 1.0).log_prob(y_true).mean()
print(f"MSE:      {mse.item():.4f}")
print(f"Gauß-NLL: {gauß_nll.item():.4f}")  # MSE + const`,
      annotation: '`nn.CrossEntropyLoss` berechnet intern `log_softmax + NLLLoss` für numerische Stabilität. Der `log_softmax`-Trick verhindert Overflow bei großen Logits. Direkte Verbindung: $\\mathcal{L}_{\\text{CE}} = -\\frac{1}{n}\\sum_i \\ln \\text{softmax}(f_\\theta(x_i))_{k_i^*}$ = NLL des kategorischen Modells.',
    },
  ],

  derivations: [
    {
      claim: 'MLE für Normalverteilung: $\\hat{\\mu} = \\bar{x}$ und $\\hat{\\sigma}^2 = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$',
      reasoning:
        '$\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_i(x_i-\\mu)^2$. Ableitung nach $\\mu$: $\\frac{\\partial \\ell}{\\partial \\mu} = \\frac{1}{\\sigma^2}\\sum_i(x_i - \\mu) = 0 \\Rightarrow \\hat{\\mu} = \\bar{x}$. Ableitung nach $\\sigma^2$: $\\frac{\\partial \\ell}{\\partial \\sigma^2} = -\\frac{n}{2\\sigma^2} + \\frac{1}{2(\\sigma^2)^2}\\sum_i(x_i-\\bar{x})^2 = 0 \\Rightarrow \\hat{\\sigma}^2 = \\frac{1}{n}\\sum_i(x_i-\\bar{x})^2$ (geteilt durch $n$, nicht $n-1$).',
    },
    {
      claim: 'MLE minimiert KL-Divergenz $D_{\\text{KL}}(p_{\\text{data}} \\| p_\\theta)$',
      reasoning:
        '$D_{\\text{KL}}(p_{\\text{data}} \\| p_\\theta) = \\mathbb{E}_{p_{\\text{data}}}[\\ln p_{\\text{data}}(x)] - \\mathbb{E}_{p_{\\text{data}}}[\\ln p_\\theta(x)]$. Der erste Term ist die Entropie von $p_{\\text{data}}$ — unabhängig von $\\theta$. Minimiere über $\\theta$: $\\arg\\min_\\theta D_{\\text{KL}} = \\arg\\max_\\theta \\mathbb{E}_{p_{\\text{data}}}[\\ln p_\\theta(x)] \\approx \\arg\\max_\\theta \\frac{1}{n}\\sum_i \\ln p_\\theta(x_i) = \\hat{\\theta}_{\\text{MLE}}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'MLE ist immer der beste Schätzer',
      correct: 'MLE ist konsistent und asymptotisch effizient, aber kann für kleine $n$ stark overfitting zeigen',
      explanation:
        'Für kleine Datensätze kann MLE die Varianz maximieren (Overfitting). Beispiel: 3 Münzwürfe, 3 Kopf → $\\hat{p}_{\\text{MLE}} = 1{,}0$ — unrealistisch. MAP mit informiertem Prior gibt robustere Schätzung.',
    },
    {
      wrong: 'Likelihood $\\mathcal{L}(\\theta)$ ist eine Wahrscheinlichkeit und summiert zu 1',
      correct: 'Likelihood ist keine Verteilung über $\\theta$ — $\\int \\mathcal{L}(\\theta) d\\theta$ ist im Allgemeinen $\\neq 1$',
      explanation:
        'Likelihoodwerte selbst sind nicht direkt interpretierbar (nur relativ). Wichtig ist der Vergleich: $\\mathcal{L}(\\theta_1) > \\mathcal{L}(\\theta_2)$ bedeutet $\\theta_1$ erklärt die Daten besser. Erst durch Bayes-Theorem und Normierung ergibt sich eine Wahrscheinlichkeit über $\\theta$ (der Posterior).',
    },
    {
      wrong: 'Cross-Entropy-Loss = Entropie der Ausgabeverteilung',
      correct: 'Cross-Entropy-Loss = Cross-Entropy zwischen One-Hot-Label und Softmax-Ausgabe = NLL',
      explanation:
        'Entropie: $H(p) = -\\sum_k p_k \\ln p_k$ (nur $p$). Cross-Entropy: $H(p, q) = -\\sum_k p_k \\ln q_k$ (zwei Verteilungen). CE-Loss nutzt die wahre Verteilung (One-Hot) als $p$ und die Modellverteilung (Softmax) als $q$.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Maximum Likelihood, clearly explained" (YouTube)',
      type: 'video',
      note: 'Schrittweise Herleitung für Normalverteilung; sehr zugänglich',
    },
    {
      title: 'StatQuest: "Cross Entropy and Log Loss" (YouTube)',
      type: 'video',
      note: 'Direkte Verbindung zwischen Cross-Entropy und NLL; ML-Perspektive',
    },
    {
      title: 'Goodfellow et al., Kapitel 5.5: "Maximum Likelihood Estimation"',
      type: 'book',
      note: 'Freier Online-Zugang; Kapitel 5.5.1 behandelt KL-Divergenz-Verbindung',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'requires',
      hint: 'Likelihood = Produkt von PDF/PMF-Werten — PMF/PDF-Konzept ist Voraussetzung.',
    },
    {
      lessonId: 'p1.bayes-theorem',
      relation: 'requires',
      hint: 'MLE ist MAP mit Uniform-Prior — Bayes-Theorem liefert die probabilistische Einbettung.',
    },
    {
      lessonId: 'p1.map-regularisierung-bias-variance',
      relation: 'extends',
      hint: 'MAP verallgemeinert MLE durch einen Prior — Lektion 10 zeigt, wie das Regularisierung ergibt.',
    },
    {
      lessonId: 'p1.diskrete-verteilungen',
      relation: 'see-also',
      hint: 'Cross-Entropy-Loss ist MLE des kategorischen Modells — Bernoulli/Kategorisch-Verteilung als Grundlage.',
    },
  ],

  reflection: 'MLE ist keine neue Idee für ML — es ist das statistische Prinzip, das Training **definiert**. Cross-Entropy ist nicht willkürlich: es ist die einzig logische Konsequenz der Gauß- oder kategorischen Annahme auf den Residuen. **Welche Verbindung hat dich am meisten überrascht: MSE = Gauß-MLE, oder CE = kategorisches MLE?**',
}
