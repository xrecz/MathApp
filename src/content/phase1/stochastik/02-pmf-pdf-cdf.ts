import type { Lesson } from '../../../types'

export const pmfPdfCdf: Lesson = {
  id: 'p1.pmf-pdf-cdf',
  title: 'PMF, PDF & CDF',
  conceptTags: ['pmf', 'pdf', 'cdf', 'probability', 'distribution'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Drei Wege, eine Verteilung zu beschreiben\n\n**PMF** (Probability Mass Function): für diskrete ZV\n$$P(X = k) \\geq 0, \\quad \\sum_k P(X = k) = 1$$\n\n**PDF** (Probability Density Function): für stetige ZV\n$$f(x) \\geq 0, \\quad \\int_{-\\infty}^{\\infty} f(x)\\, dx = 1$$\n\n**CDF** (Cumulative Distribution Function): für beide\n$$F(x) = P(X \\leq x)$$',
      },
      {
        kind: 'math',
        content:
          '<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px">\n  <text x="10" y="15" font-size="11" fill="#6366f1">PMF — Würfel</text>\n  <line x1="20" y1="100" x2="180" y2="100" stroke="#888" stroke-width="1"/>\n  <line x1="20" y1="100" x2="20" y2="15" stroke="#888" stroke-width="1"/>\n  <rect x="28" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <rect x="52" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <rect x="76" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <rect x="100" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <rect x="124" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <rect x="148" y="66" width="18" height="34" fill="#6366f1" opacity="0.8"/>\n  <text x="30" y="112" font-size="9" fill="#888">1</text>\n  <text x="54" y="112" font-size="9" fill="#888">2</text>\n  <text x="78" y="112" font-size="9" fill="#888">3</text>\n  <text x="102" y="112" font-size="9" fill="#888">4</text>\n  <text x="126" y="112" font-size="9" fill="#888">5</text>\n  <text x="150" y="112" font-size="9" fill="#888">6</text>\n  <text x="200" y="15" font-size="11" fill="#10b981">CDF — Würfel</text>\n  <line x1="200" y1="100" x2="340" y2="100" stroke="#888" stroke-width="1"/>\n  <line x1="200" y1="100" x2="200" y2="15" stroke="#888" stroke-width="1"/>\n  <polyline points="200,100 220,100 220,83 240,83 240,67 260,67 260,50 280,50 280,33 300,33 300,17 330,17" stroke="#10b981" stroke-width="2" fill="none"/>\n  <text x="202" y="112" font-size="8" fill="#888">1 2 3 4 5 6</text>\n</svg>',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die CDF der Normalverteilung $\\Phi(x)$ erscheint in der Fehleranalyse. PDF-Werte tauchen in der Likelihood $\\mathcal{L}(\\theta) = \\prod_i f(x_i \\mid \\theta)$ auf — Maximum-Likelihood-Schätzung maximiert das Produkt der PDF-Werte.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### PDF: Dichte ist keine Wahrscheinlichkeit!\n\n$f(x)$ kann größer als 1 sein — es ist eine **Dichte**.\n\nWahrscheinlichkeit = Fläche unter der Kurve:\n$$P(a \\leq X \\leq b) = \\int_a^b f(x)\\, dx$$\n\n### CDF — die Stammfunktion der PDF\n\n$$F(x) = \\int_{-\\infty}^x f(t)\\, dt \\quad \\Rightarrow \\quad F\'(x) = f(x)$$\n\n$F$ ist monoton steigend, $F(-\\infty) = 0$, $F(+\\infty) = 1$.\n\n### Diskrete CDF\n\n$$F(k) = P(X \\leq k) = \\sum_{j \\leq k} P(X = j)$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Likelihood einer Gaußverteilung**:\n\nDaten $x_1, \\dots, x_n \\sim \\mathcal{N}(\\mu, 1)$ (bekannte Varianz). PDF:\n\n$$f(x \\mid \\mu) = \\frac{1}{\\sqrt{2\\pi}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2}\\right)$$\n\nLikelihood: $\\mathcal{L}(\\mu) = \\prod_{i=1}^n f(x_i \\mid \\mu)$\n\nLog-Likelihood: $\\ell(\\mu) = -\\frac{1}{2}\\sum_i (x_i - \\mu)^2 + \\text{const}$\n\nMaximum: $\\hat{\\mu} = \\frac{1}{n}\\sum_i x_i$ — der **Stichprobenmittelwert**.',
      },
    ],
    practice: [
      {
        id: 'p1.pmf.ex1',
        difficulty: 1,
        conceptTags: ['pmf'],
        type: 'mc',
        prompt: 'Was muss für eine gültige PMF gelten?',
        options: [
          '$P(X = k) \\geq 0$ für alle $k$ und $\\sum_k P(X = k) = 1$',
          '$P(X = k) \\leq 1$ für alle $k$ und Summe $\\leq 1$',
          '$P(X = k) > 0$ für alle $k$',
          'Integral über alle $k$ gleich 1',
        ],
        answer: '$P(X = k) \\geq 0$ für alle $k$ und $\\sum_k P(X = k) = 1$',
        hints: [
          'PMF-Werte sind Wahrscheinlichkeiten → nicht negativ.',
          'Alle Ereignisse zusammen haben Wahrscheinlichkeit 1.',
          'Einzelne Werte können 0 sein (Ereignis mit Wahrscheinlichkeit 0).',
        ],
        explanation:
          'PMF-Axiome: (1) $P(X=k) \\geq 0$, (2) $\\sum_k P(X=k) = 1$. Einige Werte können 0 sein.',
      },
      {
        id: 'p1.pmf.ex2',
        difficulty: 2,
        conceptTags: ['pdf'],
        type: 'mc',
        prompt: 'Welche Aussage über die PDF $f(x)$ einer stetigen ZV ist korrekt?',
        options: [
          '$f(x)$ kann größer als 1 sein, aber $\\int f(x)\\, dx = 1$',
          '$f(x) \\leq 1$ immer, da $f(x)$ eine Wahrscheinlichkeit ist',
          '$f(x) = P(X = x)$ für alle $x$',
          '$f(x)$ muss monoton sein',
        ],
        answer: '$f(x)$ kann größer als 1 sein, aber $\\int f(x)\\, dx = 1$',
        hints: [
          'PDF ist eine Dichte, keine Wahrscheinlichkeit.',
          '$P(X = x) = 0$ für jedes einzelne $x$ bei stetigen ZVn.',
          'Integral $= 1$, aber der Integrand kann $> 1$ sein.',
        ],
        explanation:
          '$f(x)$ ist eine Dichte: $f(x) \\geq 0$ und $\\int f(x)\\, dx = 1$, aber $f(x) > 1$ ist erlaubt (z. B. Gleichverteilung auf $[0, 0{,}5]$ hat $f(x) = 2$).',
      },
      {
        id: 'p1.pmf.ex3',
        difficulty: 2,
        conceptTags: ['cdf'],
        type: 'mc',
        prompt: 'Wie hängt die CDF $F(x)$ mit der PDF $f(x)$ zusammen?',
        options: [
          '$F(x) = \\int_{-\\infty}^x f(t)\\, dt$ und $F\'(x) = f(x)$',
          '$f(x) = \\int_{-\\infty}^x F(t)\\, dt$',
          '$F(x) = f(x)^2$',
          '$F(x) = 1 - f(x)$',
        ],
        answer: '$F(x) = \\int_{-\\infty}^x f(t)\\, dt$ und $F\'(x) = f(x)$',
        hints: [
          'CDF = kumulierte Wahrscheinlichkeit bis $x$.',
          'Kumulieren = aufintegrieren.',
          'Ableitung der CDF ergibt die PDF.',
        ],
        explanation:
          '$F(x) = P(X \\leq x) = \\int_{-\\infty}^x f(t)\\, dt$. Die PDF ist die Ableitung der CDF: $f(x) = F\'(x)$.',
      },
      {
        id: 'p1.pmf.ex4',
        difficulty: 3,
        conceptTags: ['cdf', 'probability'],
        type: 'mc',
        prompt:
          'Gleichverteilung $X \\sim \\text{Uniform}(0, 2)$, also $f(x) = 0{,}5$ für $x \\in [0,2]$. Was ist $P(0{,}5 \\leq X \\leq 1{,}5)$?',
        options: ['$0{,}5$', '$0{,}25$', '$1$', '$0{,}75$'],
        answer: '$0{,}5$',
        hints: [
          '$P(a \\leq X \\leq b) = \\int_a^b f(x)\\, dx$.',
          '$\\int_{0{,}5}^{1{,}5} 0{,}5\\, dx = 0{,}5 \\cdot (1{,}5 - 0{,}5)$.',
          '$= 0{,}5 \\cdot 1 = 0{,}5$.',
        ],
        explanation:
          '$P(0{,}5 \\leq X \\leq 1{,}5) = 0{,}5 \\cdot 1 = 0{,}5$. Das Intervall $[0{,}5, 1{,}5]$ hat Länge 1, multipliziert mit Dichte $0{,}5$.',
      },
      {
        id: 'p1.pmf.ex5',
        difficulty: 3,
        conceptTags: ['pdf', 'probability'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Log-Likelihood für $x_1=1, x_2=2, x_3=3$ unter $\\mathcal{N}(\\mu=2, \\sigma^2=1)$?',
        options: [
          '$-\\frac{1}{2}[(1-2)^2 + (2-2)^2 + (3-2)^2] + \\text{const} = -1 + \\text{const}$',
          '$-\\frac{1}{2}[1 + 2 + 3] + \\text{const}$',
          '$-(1+2+3) + \\text{const}$',
          '$\\frac{1}{3}(1+2+3) = 2$',
        ],
        answer:
          '$-\\frac{1}{2}[(1-2)^2 + (2-2)^2 + (3-2)^2] + \\text{const} = -1 + \\text{const}$',
        hints: [
          '$\\ell(\\mu) = -\\frac{1}{2\\sigma^2}\\sum_i(x_i - \\mu)^2 + \\text{const}$.',
          'Mit $\\sigma^2=1$, $\\mu=2$: Abweichungen sind $(-1)^2, 0^2, 1^2$.',
          'Summe der Quadrate: $1+0+1=2$, also $-\\frac{1}{2} \\cdot 2 = -1$.',
        ],
        explanation:
          '$\\ell(\\mu=2) = -\\frac{1}{2}(1+0+1) = -1 + \\text{const}$. Die Log-Likelihood des Gaußmodells ist negatives MSE — Maximieren der Likelihood ≡ Minimieren des MSE.',
      },
      {
        id: 'p1.pmf.ex6',
        difficulty: 4,
        conceptTags: ['pdf', 'cdf'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Welche Verbindung besteht zwischen MLE einer Gaußverteilung und MSE-Loss?',
        options: [
          'MLE unter Gauß-Annahme ist äquivalent zu MSE-Minimierung — Log-Likelihood = $-\\text{MSE} + \\text{const}$',
          'MLE unter Gauß-Annahme ist äquivalent zu MAE-Minimierung',
          'MLE und MSE haben keine Verbindung',
          'MLE unter Gauß ergibt Cross-Entropy-Loss',
        ],
        answer:
          'MLE unter Gauß-Annahme ist äquivalent zu MSE-Minimierung — Log-Likelihood = $-\\text{MSE} + \\text{const}$',
        hints: [
          '$\\ell(\\theta) = -\\frac{1}{2\\sigma^2}\\sum_i(y_i - f_\\theta(x_i))^2 + \\text{const}$.',
          'Maximieren von $\\ell$ = Minimieren von $\\sum_i(y_i - f_\\theta(x_i))^2$.',
          'Das ist genau MSE (skaliert).',
        ],
        explanation:
          'Gaußmodell $p(y\\mid x,\\theta) = \\mathcal{N}(f_\\theta(x), \\sigma^2)$ → Log-Likelihood $\\propto -\\text{MSE}$. MSE-Minimierung = Gauß-MLE. Analogie: Kategorisches Modell → Cross-Entropy-MLE (Lektion 09).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## PMF/PDF in der ML-Toolchain\n\n`torch.distributions` stellt PMF/PDF/CDF als Methoden bereit:\n\n```python\nfrom torch.distributions import Normal, Bernoulli\nd = Normal(loc=0, scale=1)\nd.log_prob(x)   # ln f(x) — numerisch stabiler als f(x)\nd.cdf(x)        # F(x)\nd.sample()      # Zieht x ~ N(0,1)\n```\n\n`log_prob` statt `prob` verwenden — Produkt von Wahrscheinlichkeiten wird numerisch 0 (Underflow), Summe von Log-Wahrscheinlichkeiten bleibt handhabbar.',
      },
      {
        kind: 'callout',
        content:
          'Überprüfe: $\\sum_k P(X=k) = 1$ (PMF) und $\\int f(x)\\, dx = 1$ (PDF). Numerisch: Torch-Distributionen garantieren das intern. Beim manuellen Implementieren (z. B. benutzerdefinierte Verteilung) immer normalisieren!',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.pmf.card1',
      front: 'Unterschied PMF vs. PDF?',
      back: 'PMF: für diskrete ZV, $P(X=k) \\geq 0$, Summe=1. PDF: für stetige ZV, $f(x)\\geq 0$, kann $>1$ sein, Integral=1.',
      conceptTags: ['pmf', 'pdf'],
    },
    {
      id: 'p1.pmf.card2',
      front: 'Was ist die CDF $F(x)$?',
      back: '$F(x) = P(X \\leq x)$. Für stetige ZV: $F(x) = \\int_{-\\infty}^x f(t)\\, dt$, $F\'(x) = f(x)$.',
      conceptTags: ['cdf'],
    },
    {
      id: 'p1.pmf.card3',
      front: 'Verbindung zwischen Gauß-MLE und MSE?',
      back: 'Log-Likelihood unter $\\mathcal{N}(f_\\theta(x), \\sigma^2)$ ist $\\propto -\\text{MSE}$. MLE maximieren = MSE minimieren.',
      conceptTags: ['pdf', 'probability'],
    },
  ],
}
