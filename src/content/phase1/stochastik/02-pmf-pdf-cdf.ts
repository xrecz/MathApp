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

  learningOutcome:
    'Du kannst PMF, PDF und CDF formal definieren und unterscheiden, erklären warum PDF-Werte größer als 1 sein können, und den Zusammenhang zwischen Gauß-MLE und MSE-Loss herleiten.',

  description:
    'PMF, PDF und CDF sind die drei Sprachen, in denen Wahrscheinlichkeitsverteilungen beschrieben werden. In ML tauchen sie überall auf: Softmax-Ausgaben sind PMFs, Sampling in generativen Modellen nutzt CDFs, und die Likelihood-Funktion ist das Produkt von PDF-Werten.',

  conceptSteps: [
    {
      title: 'PMF — Wahrscheinlichkeitsmassefunktion (diskret)',
      preprompt: 'Stell dir einen fairen Würfel vor. Kannst du die Wahrscheinlichkeit jedes Ergebnisses als Funktion aufschreiben?',
      body: 'Die **PMF** (Probability Mass Function) ordnet jedem möglichen Wert einer diskreten ZV seine Wahrscheinlichkeit zu:\n\n$$P(X = k) \\geq 0, \\qquad \\sum_{k} P(X = k) = 1$$\n\nSie "verteilt die Masse 1" auf alle möglichen Werte — daher der Name.',
      visual: `<svg viewBox="0 0 200 100" width="200" height="100" aria-label="PMF Balkendiagramm Würfel">
        <rect x="0" y="0" width="200" height="100" rx="6" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <text x="10" y="14" fill="rgb(156 163 175)" font-size="9">PMF: fairer Würfel P(X=k)=1/6</text>
        <line x1="15" y1="85" x2="185" y2="85" stroke="rgb(75 85 99)" stroke-width="1"/>
        <rect x="18" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <rect x="42" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <rect x="66" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <rect x="90" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <rect x="114" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <rect x="138" y="52" width="18" height="33" fill="rgb(99 102 241)" rx="2"/>
        <text x="23" y="96" fill="rgb(156 163 175)" font-size="8">1</text>
        <text x="47" y="96" fill="rgb(156 163 175)" font-size="8">2</text>
        <text x="71" y="96" fill="rgb(156 163 175)" font-size="8">3</text>
        <text x="95" y="96" fill="rgb(156 163 175)" font-size="8">4</text>
        <text x="119" y="96" fill="rgb(156 163 175)" font-size="8">5</text>
        <text x="143" y="96" fill="rgb(156 163 175)" font-size="8">6</text>
        <text x="162" y="60" fill="rgb(167 243 208)" font-size="8">≈0,167</text>
      </svg>`,
      miniExample: 'Würfel: $P(X=1)=P(X=2)=\\cdots=P(X=6)=1/6$. Summe: $6 \\cdot 1/6 = 1$ ✓',
      selfCheck: 'Was bedeutet es, dass die Summe aller PMF-Werte 1 ergibt? (Eines der Ereignisse muss eintreten — Sicherheit.)',
    },
    {
      title: 'PDF — Dichtefunktion (stetig)',
      body: 'Bei stetigen ZVn gibt es überabzählbar viele Werte — jeder einzelne hat Wahrscheinlichkeit **null**.\n\nDie **PDF** (Probability Density Function) $f(x)$ ist eine **Dichte**, keine Wahrscheinlichkeit:\n\n$$f(x) \\geq 0, \\qquad \\int_{-\\infty}^{\\infty} f(x)\\, dx = 1$$\n\nWahrscheinlichkeit = **Fläche** unter der Kurve:\n\n$$P(a \\leq X \\leq b) = \\int_a^b f(x)\\, dx$$\n\n**Wichtig**: $f(x)$ kann größer als 1 sein! Es ist eine Dichte, keine Wahrscheinlichkeit.',
      miniExample: 'Gleichverteilung auf $[0, 0{,}5]$: $f(x) = 2$ — Dichte $> 1$, aber $\\int_0^{0{,}5} 2\\, dx = 1$ ✓',
      selfCheck: 'Warum gilt $P(X = x_0) = 0$ für jedes einzelne $x_0$ bei stetigen ZVn? (Ein Punkt hat Breite null — das Integral über einen Punkt ergibt null.)',
    },
    {
      title: 'CDF — aufgelaufene Wahrscheinlichkeit',
      body: 'Die **CDF** (Cumulative Distribution Function) gibt die Wahrscheinlichkeit an, dass $X$ höchstens den Wert $x$ annimmt:\n\n$$F(x) = P(X \\leq x)$$\n\nEigenschaften: $F$ ist monoton steigend, $F(-\\infty) = 0$, $F(+\\infty) = 1$.\n\nFür stetige ZV: $F(x) = \\int_{-\\infty}^x f(t)\\, dt$ und $F\'(x) = f(x)$.\n\nFür diskrete ZV: $F(k) = \\sum_{j \\leq k} P(X = j)$ — Treppenfunktion.',
      miniExample: 'Würfel-CDF: $F(3) = P(X \\leq 3) = 3/6 = 0{,}5$. $F(6) = 1$. Treppenförmig in Schritten von $1/6$.',
    },
    {
      title: 'Verbindung PMF / PDF / CDF',
      body: 'Die drei Beschreibungen sind äquivalent — jede enthält dieselbe Information:\n\n| | PMF | PDF | CDF |\n|---|---|---|---|\n| Typ | diskret | stetig | beide |\n| Notation | $P(X=k)$ | $f(x)$ | $F(x)$ |\n| Normierung | $\\sum_k P(X=k)=1$ | $\\int f(x)dx=1$ | $F(\\infty)=1$ |\n| Beziehung | — | $F\'(x)=f(x)$ | $F(x)=\\int_{-\\infty}^x f$ |\n\nCDF → PDF: ableiten. PDF → CDF: integrieren. CDF → PMF: Sprünge ablesen.',
      selfCheck: 'Wie berechnet man $P(a < X \\leq b)$ aus der CDF? ($F(b) - F(a)$)',
    },
    {
      title: 'ML: Softmax als PMF; Sampling in Generativen Modellen',
      body: '**Softmax als PMF**: Der Softmax-Output $\\hat{y} = \\text{softmax}(z)$ definiert eine gültige PMF über $K$ Klassen:\n\n$$\\hat{y}_k \\geq 0, \\qquad \\sum_{k=1}^K \\hat{y}_k = 1$$\n\n**Sampling**: Um Text zu generieren, zieht das Modell Token-IDs aus der PMF $\\hat{y}$.\n\n**CDF-Trick** (Inverse CDF / Quantile-Sampling): Um aus CDF $F$ zu sampeln:\n1. Ziehe $u \\sim \\text{Uniform}(0,1)$\n2. Berechne $x = F^{-1}(u)$\n\nDieser Trick steckt in vielen Sampling-Algorithmen.',
      miniExample: 'Softmax-Output $(0{,}7, 0{,}2, 0{,}1)$: Klasse 0 mit $P=0{,}7$, Klasse 1 mit $P=0{,}2$, Klasse 2 mit $P=0{,}1$.',
    },
    {
      title: 'ML: Log-Likelihood und Warum Log?',
      body: 'Die **Likelihood** für i.i.d.-Daten ist ein Produkt von PDF-Werten:\n\n$$\\mathcal{L}(\\theta) = \\prod_{i=1}^n f(x_i \\mid \\theta)$$\n\nDas Produkt wird schnell winzig (numerischer Underflow). Daher: **Log-Likelihood**:\n\n$$\\ell(\\theta) = \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)$$\n\nFür $\\mathcal{N}(\\mu, \\sigma^2)$:\n\n$$\\ell(\\mu) = -\\frac{1}{2\\sigma^2}\\sum_i(x_i - \\mu)^2 + \\text{const}$$\n\nMaximieren $\\ell$ = Minimieren von $\\sum_i(x_i-\\mu)^2$ = **MSE**.',
      selfCheck: 'Warum ist Log-Likelihood äquivalent zur Likelihood für Optimierung? (Logarithmus ist monoton steigend — Argmax ändert sich nicht.)',
    },
  ],

  codeBridges: [
    {
      title: 'torch.distributions: PMF/PDF/CDF und Sampling',
      lang: 'python',
      code: `import torch
from torch.distributions import Normal, Bernoulli, Categorical

# --- PMF (diskret): Bernoulli ---
d_bern = Bernoulli(probs=0.7)
print(d_bern.log_prob(torch.tensor(1.0)))  # ln P(X=1) = ln(0.7) ≈ -0.357
print(d_bern.sample((5,)))                  # 5 Samples: 0 oder 1

# --- PDF (stetig): Normalverteilung ---
d_norm = Normal(loc=0.0, scale=1.0)
print(d_norm.log_prob(torch.tensor(0.0)))  # ln f(0) = ln(1/sqrt(2π)) ≈ -0.919
# Achtung: log_prob gibt ln f(x) — kann > 0 sein (Dichte > 1)!
d_narrow = Normal(loc=0.0, scale=0.1)
print(d_narrow.log_prob(torch.tensor(0.0)))  # ≈ +1.38 (Dichte ≫ 1)

# --- CDF ---
print(d_norm.cdf(torch.tensor(0.0)))   # F(0) = 0.5 (Symmetrie)
print(d_norm.cdf(torch.tensor(1.96)))  # F(1.96) ≈ 0.975

# --- Sampling aus Kategorischer Verteilung (PMF = Softmax-Output) ---
logits = torch.tensor([2.0, 0.5, -0.5])      # Rohausgaben des Modells
probs = torch.softmax(logits, dim=0)          # → PMF
next_token = Categorical(probs).sample()      # Sampling aus PMF
log_p = Categorical(probs).log_prob(next_token)  # NLL dieses Tokens`,
      annotation: '`log_prob` statt `prob` — das Produkt vieler $p_i < 1$ kann zu Float-Underflow führen. Summe der Log-Wahrscheinlichkeiten bleibt numerisch handhabbar. Wichtig: `log_prob` einer PDF kann positiv sein (wenn Dichte $> 1$) — das ist kein Fehler.',
    },
  ],

  derivations: [
    {
      claim: 'PDF-Werte können größer als 1 sein, ohne die Axiome zu verletzen',
      reasoning:
        'Die Normierungsaxiom für PDFs lautet $\\int_{-\\infty}^{\\infty} f(x)\\, dx = 1$ — die Fläche ist 1. Auf einem sehr kleinen Intervall $[a, a+\\epsilon]$ kann $f(x) \\cdot \\epsilon \\approx 1$ gelten, obwohl $f(x) \\gg 1$. Beispiel: $f(x) = 2$ auf $[0, 0{,}5]$ — Dichte doppelt so hoch wie bei Gleichverteilung auf $[0,1]$, aber $\\int_0^{0{,}5} 2\\, dx = 1$. Die "Wahrscheinlichkeit" eines Intervals ist immer in $[0,1]$, aber die Dichte an einem Punkt kann beliebig groß sein.',
    },
    {
      claim: 'Log-Likelihood für Gauß-Modell ergibt MSE',
      reasoning:
        'Für $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$ gilt $f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp(-\\frac{(x-\\mu)^2}{2\\sigma^2})$. Log-Likelihood für Daten $x_1,\\ldots,x_n$: $\\ell(\\mu) = \\sum_i \\ln f(x_i) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_i(x_i-\\mu)^2$. Maximieren über $\\mu$: die Konstante entfällt, minimiere $\\sum_i(x_i-\\mu)^2$ → das ist MSE. MLE unter Gauß-Annahme = MSE-Minimierung.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$f(x) = P(X = x)$ — die PDF ist eine Wahrscheinlichkeit',
      correct: '$f(x)$ ist eine Dichte; $P(X = x) = 0$ für stetige ZV',
      explanation:
        'Bei stetigen ZVn ist jeder einzelne Punkt ein Maß-null-Ereignis. Die PDF $f(x)$ gibt die "Dichte" der Wahrscheinlichkeit an einem Punkt an — Wahrscheinlichkeit entsteht erst durch Integration über ein Intervall.',
    },
    {
      wrong: 'PMF und PDF sind dasselbe, nur verschiedene Namen',
      correct: 'PMF gilt für diskrete ZV (Summe = 1); PDF gilt für stetige ZV (Integral = 1)',
      explanation:
        'PMF-Werte sind echte Wahrscheinlichkeiten $\\in [0,1]$. PDF-Werte sind Dichten, können $> 1$ sein. Man darf nicht "PMF einer Normalverteilung" oder "PDF eines Würfels" sagen.',
    },
    {
      wrong: 'P(A|B) = P(B|A)',
      correct: 'P(A|B) und P(B|A) sind im Allgemeinen verschieden — Bayes-Fehler!',
      explanation:
        'Diese Verwechslung heißt "Prosecutor\'s Fallacy". Beispiel: $P(\\text{positiver Test} \\mid \\text{krank}) = 0{,}95$ ≠ $P(\\text{krank} \\mid \\text{positiver Test})$. Letzteres hängt vom Prior $P(\\text{krank})$ ab — Bayes-Theorem berechnet es.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Probability vs Likelihood" (YouTube)',
      type: 'video',
      note: 'Klare Unterscheidung zwischen Wahrscheinlichkeit (Fläche) und Likelihood (Funktion von θ) — fundamental für MLE',
    },
    {
      title: 'Seeing Theory: "Probability Distributions" — seeing-theory.brown.edu',
      type: 'article',
      note: 'Interaktive Visualisierungen von PMF, PDF und CDF; zum Anfassen',
    },
    {
      title: 'MML Book (Deisenroth et al.), Kapitel 6.2: "Discrete and Continuous Probabilities"',
      type: 'book',
      note: 'Rigoroses ML-Mathe; kostenloser PDF auf mml-book.github.io',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.zufallsvariablen',
      relation: 'requires',
      hint: 'Zufallsvariablen (diskret vs. stetig) sind die Grundlage für PMF vs. PDF.',
    },
    {
      lessonId: 'p1.diskrete-verteilungen',
      relation: 'extends',
      hint: 'Konkrete PMFs: Bernoulli, Binomial, Kategorisch — die häufigsten diskreten Verteilungen in ML.',
    },
    {
      lessonId: 'p1.kontinuierliche-verteilungen',
      relation: 'extends',
      hint: 'Konkrete PDFs: Normalverteilung, Gleichverteilung, Exponentialverteilung.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'MLE maximiert das Produkt der PDF/PMF-Werte — die Log-Likelihood-Verbindung zu Loss-Funktionen.',
    },
  ],

  reflection: 'PMF, PDF und CDF sind drei Linsen auf dieselbe Verteilung. Der entscheidende Unterschied: **PDF ist keine Wahrscheinlichkeit**. Jedes Mal, wenn du `log_prob` in PyTorch aufrufst, arbeitest du mit der Log-Dichte — die kann positiv sein und das ist völlig korrekt. **Was hat dich mehr überrascht: dass PDF-Werte > 1 sein können, oder dass Gauß-MLE direkt MSE ergibt?**',
}
