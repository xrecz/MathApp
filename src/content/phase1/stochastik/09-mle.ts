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
}
