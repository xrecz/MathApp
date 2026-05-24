import type { Lesson } from '../../../types'

export const erwartungswertVarianz: Lesson = {
  id: 'p1.erwartungswert-varianz',
  title: 'Erwartungswert & Varianz',
  conceptTags: ['expectation', 'variance', 'standard-deviation', 'linearity', 'bias-variance'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Erwartungswert und Varianz\n\n**Erwartungswert** (diskret): $E[X] = \\sum_k k \\cdot P(X=k)$\n\n**Erwartungswert** (stetig): $E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\, dx$\n\n**Varianz**: $\\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$\n\n**Standardabweichung**: $\\text{SD}(X) = \\sqrt{\\text{Var}(X)}$ — gleiche Einheit wie $X$.',
      },
      {
        kind: 'math',
        content:
          '$$E[aX + b] = aE[X] + b \\qquad \\text{(Linearität)}$$\n$$\\text{Var}(aX + b) = a^2 \\text{Var}(X) \\qquad \\text{(Verschiebung ändert Varianz nicht)}$$\n$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) \\quad \\text{falls } X \\perp Y$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: $E[\\text{Loss}]$ zerleg in **Bias$^2$** (systematischer Fehler) + **Varianz** (Instabilität) + **irreduzibles Rauschen**. Overfitting = hohe Varianz; Underfitting = hoher Bias. Diese Dekomposition erklärt Regularisierung in Lektion 10.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Linearität des Erwartungswerts\n\n$E[aX + b] = aE[X] + b$ — gilt immer, auch für abhängige ZVn.\n\n$E[X + Y] = E[X] + E[Y]$ — gilt immer.\n\n**Achtung**: $E[XY] = E[X]E[Y]$ nur falls $X \\perp Y$ (unabhängig).\n\n### Verschiebungsformel\n\n$$\\text{Var}(X) = E[X^2] - (E[X])^2$$\n\nNützlich für Berechnungen — quadratischen Mittelwert minus Quadrat des Mittelwerts.\n\n### Stichproben-Schätzer\n\n$\\hat{\\mu} = \\bar{X} = \\frac{1}{n}\\sum_i X_i$ — erwartungstreu: $E[\\bar{X}] = \\mu$.\n\n$\\hat{\\sigma}^2 = \\frac{1}{n-1}\\sum_i (X_i - \\bar{X})^2$ — Bessel-Korrektur für Erwartungstreue.',
      },
      {
        kind: 'worked-example',
        content:
          '**Bias-Varianz-Dekomposition (Preview)**:\n\nFür Modell $\\hat{f}$ und wahre Funktion $f$:\n\n$E[(y - \\hat{f}(x))^2] = \\underbrace{(E[\\hat{f}(x)] - f(x))^2}_{\\text{Bias}^2} + \\underbrace{\\text{Var}(\\hat{f}(x))}_{\\text{Varianz}} + \\underbrace{\\sigma^2}_{\\text{Rauschen}}$\n\n**Einfaches Modell** (Underfitting): $\\text{Bias}^2 \\uparrow$, $\\text{Var} \\downarrow$.\n\n**Komplexes Modell** (Overfitting): $\\text{Bias}^2 \\downarrow$, $\\text{Var} \\uparrow$.\n\nOptimum: Balance zwischen beiden.',
      },
    ],
    practice: [
      {
        id: 'p1.ev.ex1',
        difficulty: 1,
        conceptTags: ['expectation'],
        type: 'mc',
        prompt: '$X$ nimmt Werte $\\{1, 2, 3\\}$ mit Wahrscheinlichkeiten $\\{0{,}2, 0{,}5, 0{,}3\\}$. Was ist $E[X]$?',
        options: ['$2{,}1$', '$2$', '$1{,}5$', '$3$'],
        answer: '$2{,}1$',
        hints: [
          '$E[X] = \\sum_k k \\cdot P(X=k)$.',
          '$= 1 \\cdot 0{,}2 + 2 \\cdot 0{,}5 + 3 \\cdot 0{,}3$.',
          '$= 0{,}2 + 1{,}0 + 0{,}9 = 2{,}1$.',
        ],
        explanation:
          '$E[X] = 1(0{,}2) + 2(0{,}5) + 3(0{,}3) = 0{,}2 + 1{,}0 + 0{,}9 = 2{,}1$. Der Erwartungswert muss nicht im Wertebereich von $X$ liegen.',
      },
      {
        id: 'p1.ev.ex2',
        difficulty: 1,
        conceptTags: ['linearity'],
        type: 'mc',
        prompt: '$E[X] = 3$. Was ist $E[2X + 1]$?',
        options: ['$7$', '$6$', '$8$', '$4$'],
        answer: '$7$',
        hints: [
          'Linearität: $E[aX + b] = aE[X] + b$.',
          '$a=2$, $b=1$, $E[X]=3$.',
          '$E[2X+1] = 2 \\cdot 3 + 1 = 7$.',
        ],
        explanation:
          '$E[2X+1] = 2E[X]+1 = 2 \\cdot 3 + 1 = 7$. Linearität gilt ohne Bedingungen — sehr nützlich.',
      },
      {
        id: 'p1.ev.ex3',
        difficulty: 2,
        conceptTags: ['variance'],
        type: 'mc',
        prompt: '$\\text{Var}(X) = 4$. Was ist $\\text{Var}(3X + 5)$?',
        options: ['$36$', '$17$', '$4$', '$12$'],
        answer: '$36$',
        hints: [
          '$\\text{Var}(aX + b) = a^2 \\text{Var}(X)$.',
          'Additive Konstante ändert Varianz nicht.',
          '$\\text{Var}(3X+5) = 9 \\cdot 4 = 36$.',
        ],
        explanation:
          '$\\text{Var}(3X+5) = 3^2 \\cdot \\text{Var}(X) = 9 \\cdot 4 = 36$. Skalierung quadriert die Varianz; Verschiebung (+5) ändert Varianz nicht.',
      },
      {
        id: 'p1.ev.ex4',
        difficulty: 2,
        conceptTags: ['variance', 'standard-deviation'],
        type: 'mc',
        prompt: 'Verschiebungsformel: $E[X^2] = 10$, $E[X] = 2$. Was ist $\\text{Var}(X)$?',
        options: ['$6$', '$8$', '$10$', '$4$'],
        answer: '$6$',
        hints: [
          '$\\text{Var}(X) = E[X^2] - (E[X])^2$.',
          '$= 10 - 2^2 = 10 - 4$.',
          '$= 6$.',
        ],
        explanation:
          '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 10 - 4 = 6$. Die Verschiebungsformel ist oft einfacher als direkte Berechnung.',
      },
      {
        id: 'p1.ev.ex5',
        difficulty: 3,
        conceptTags: ['expectation', 'bias-variance'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein einfaches Modell (1 Parameter) hat Bias $= 2$ und Varianz $= 0{,}5$. Ein komplexes Modell hat Bias $= 0{,}5$ und Varianz $= 4$. Welches hat kleineren erwarteten Fehler (ohne Rauschen)?',
        options: [
          'Einfaches Modell: $2^2 + 0{,}5 = 4{,}5$ vs. komplexes: $0{,}5^2 + 4 = 4{,}25$ — komplexes ist besser',
          'Einfaches Modell: $2 + 0{,}5 = 2{,}5$ vs. komplexes: $0{,}5 + 4 = 4{,}5$ — einfaches ist besser',
          'Beide haben denselben Fehler',
          'Unmöglich ohne Daten zu vergleichen',
        ],
        answer:
          'Einfaches Modell: $2^2 + 0{,}5 = 4{,}5$ vs. komplexes: $0{,}5^2 + 4 = 4{,}25$ — komplexes ist besser',
        hints: [
          'Erwarteter Fehler = $\\text{Bias}^2 + \\text{Varianz} + \\text{Rauschen}$.',
          'Einfach: $2^2 + 0{,}5 = 4{,}5$.',
          'Komplex: $(0{,}5)^2 + 4 = 0{,}25 + 4 = 4{,}25$.',
        ],
        explanation:
          'Fehler = Bias² + Varianz. Einfach: 4+0,5=4,5. Komplex: 0,25+4=4,25. Das komplexere Modell gewinnt hier knapp — Bias-Varianz-Trade-off ist nicht immer trivial.',
      },
      {
        id: 'p1.ev.ex6',
        difficulty: 4,
        conceptTags: ['expectation', 'variance'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Mini-Batch-Gradient $g_B = \\frac{1}{B}\\sum_{i \\in B} \\nabla \\ell_i$. Falls $\\text{Var}(\\nabla \\ell_i) = \\sigma^2$ und Samples unabhängig, was ist $\\text{Var}(g_B)$?',
        options: [
          '$\\frac{\\sigma^2}{B}$ — Varianz skaliert mit $1/B$',
          '$B \\cdot \\sigma^2$',
          '$\\sigma^2$ — unabhängig von Batch-Größe',
          '$\\frac{\\sigma^2}{B^2}$',
        ],
        answer: '$\\frac{\\sigma^2}{B}$ — Varianz skaliert mit $1/B$',
        hints: [
          '$g_B = \\frac{1}{B}\\sum_i \\nabla \\ell_i$. Varianz des Durchschnitts.',
          '$\\text{Var}(\\frac{1}{B}\\sum_i X_i) = \\frac{1}{B^2} \\cdot B \\cdot \\sigma^2 = \\frac{\\sigma^2}{B}$.',
          'Größerer Batch → kleinere Gradient-Varianz.',
        ],
        explanation:
          '$\\text{Var}(g_B) = \\sigma^2/B$. Doppelter Batch halbiert Gradient-Varianz → stabileres Training. Aber: 2× mehr Berechnungszeit. Optimale Batch-Größe ist ein empirisches Trade-off.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Erwartungswert und Varianz in der Praxis\n\n**Gradient-Varianz**: `torch.var(grads)` über Mini-Batch-Gradienten zeigt, ob Training stabil ist. Hohe Varianz → kleinere Lernrate oder größere Batches.\n\n**Gewichts-Statistiken**: `model.weight.mean()` und `model.weight.std()` nach Training. Sollten nach BatchNorm ≈ 0 / 1 sein.\n\n**Adam**: $m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t$ schätzt $E[g]$; $v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2$ schätzt $E[g^2]$. Effektive Lernrate $\\hat{m}_t/\\sqrt{\\hat{v}_t}$ = Gradient / SD des Gradienten.',
      },
      {
        kind: 'callout',
        content:
          'Adam adaptiert Lernraten pro Parameter: $\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\hat{m}_t/(\\sqrt{\\hat{v}_t}+\\epsilon)$. Das ist im Wesentlichen ein geschätzter Erwartungswert geteilt durch Standardabweichung — Normierung des Gradienten.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.ev.card1',
      front: 'Verschiebungsformel für Varianz?',
      back: '$\\text{Var}(X) = E[X^2] - (E[X])^2$.',
      conceptTags: ['variance'],
    },
    {
      id: 'p1.ev.card2',
      front: 'Wie skaliert Gradient-Varianz mit Batch-Größe $B$?',
      back: '$\\text{Var}(g_B) = \\sigma^2/B$ — größerer Batch → stabilere Gradienten.',
      conceptTags: ['variance'],
    },
    {
      id: 'p1.ev.card3',
      front: 'Bias-Varianz-Dekomposition des Fehlers?',
      back: '$E[\\text{Fehler}] = \\text{Bias}^2 + \\text{Varianz} + \\text{Rauschen}$.',
      conceptTags: ['bias-variance'],
    },
  ],

  learningOutcome:
    'Du kannst Erwartungswert und Varianz berechnen, die Linearitätsregel und Verschiebungsformel anwenden und erklären, wie Bias und Varianz eines Schätzers mit dem Erwartungswert-Kalkül zusammenhängen.',

  description:
    'Erwartungswert und Varianz sind die zwei wichtigsten Kenngrößen einer Zufallsvariablen — Lage und Streuung. In ML stecken sie in jedem Optimierungsschritt: der Gradient ist ein Schätzer (mit Bias und Varianz), Adam schätzt beide, und der Bias-Varianz-Trade-off beschreibt fundamentale Grenzen des Lernens.',

  conceptSteps: [
    {
      title: 'Erwartungswert als gewichteter Durchschnitt',
      preprompt: 'Du wirfst 1000 Mal einen fairen Würfel und berechnest den Durchschnitt. Was nähert sich der Durchschnitt mit wachsender Anzahl an?',
      body: 'Der **Erwartungswert** $\\mathbb{E}[X]$ ist der langfristige Durchschnittswert:\n\n$$\\mathbb{E}[X] = \\sum_k k \\cdot P(X = k) \\quad \\text{(diskret)}$$\n\n$$\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\, dx \\quad \\text{(stetig)}$$\n\nDas Gesetz der großen Zahlen garantiert: $\\bar{X}_n \\to \\mathbb{E}[X]$ für $n \\to \\infty$.',
      miniExample: 'Fairer Würfel: $\\mathbb{E}[X] = \\frac{1}{6}(1+2+3+4+5+6) = 3{,}5$. Kein Würfelwurf ergibt 3,5 — der Erwartungswert muss nicht im Wertebereich liegen.',
      selfCheck: 'Kann der Erwartungswert außerhalb des Wertebereichs von $X$ liegen? (Ja — z.B. Würfel: 3,5 ist kein Augenwert.)',
    },
    {
      title: 'Rechenregeln: Linearität des Erwartungswerts',
      body: 'Die **Linearität** ist die wichtigste Eigenschaft des Erwartungswerts:\n\n$$\\mathbb{E}[aX + b] = a\\mathbb{E}[X] + b \\qquad \\text{(immer)}$$\n\n$$\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y] \\qquad \\text{(immer, auch abhängig!)}$$\n\n**Achtung**: $\\mathbb{E}[XY] = \\mathbb{E}[X] \\cdot \\mathbb{E}[Y]$ gilt **nur** bei Unabhängigkeit.\n\nDie Linearität gilt bedingungslos — auch bei abhängigen Zufallsvariablen.',
      miniExample: '$\\mathbb{E}[3X + 2] = 3 \\cdot \\mathbb{E}[X] + 2$. Für Würfel: $3 \\cdot 3{,}5 + 2 = 12{,}5$.',
      selfCheck: 'Warum gilt $\\mathbb{E}[X+Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ auch für abhängige ZVn? (Definition: $\\mathbb{E}[X+Y] = \\int\\int (x+y) f(x,y) dx dy = \\int x f_X(x) dx + \\int y f_Y(y) dy$.)',
    },
    {
      title: 'Varianz als Streuungsmaß',
      body: 'Die **Varianz** misst die durchschnittliche quadratische Abweichung vom Erwartungswert:\n\n$$\\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$$\n\nRechenregeln:\n$$\\text{Var}(aX + b) = a^2 \\text{Var}(X) \\qquad \\text{(Verschiebung ändert Varianz nicht!)}$$\n\n$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) \\qquad \\text{(nur bei Unabhängigkeit)}$$',
      miniExample: 'Würfel: $\\mathbb{E}[X^2] = \\frac{1}{6}(1+4+9+16+25+36) = \\frac{91}{6} \\approx 15{,}17$. $\\text{Var}(X) = 15{,}17 - 3{,}5^2 = 15{,}17 - 12{,}25 \\approx 2{,}92$.',
    },
    {
      title: 'Standardabweichung und Kovarianz (Grundidee)',
      body: 'Die **Standardabweichung** $\\text{SD}(X) = \\sqrt{\\text{Var}(X)}$ hat dieselbe Einheit wie $X$ — damit direkt interpretierbar.\n\nDie **Kovarianz** misst den linearen Zusammenhang zwischen zwei ZVn:\n\n$$\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mathbb{E}[X])(Y - \\mathbb{E}[Y])] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]$$\n\n$\\text{Cov}(X, Y) > 0$: tendieren zusammen zu steigen. $< 0$: gegenläufig. $= 0$: linear unkorreliert (nicht unbedingt unabhängig!).',
      miniExample: '$X = Y$: $\\text{Cov}(X, X) = \\mathbb{E}[(X-\\mu)^2] = \\text{Var}(X)$. Die Kovarianzmatrix hat Varianzen auf der Diagonale.',
      selfCheck: 'Warum ist Unkorreliertheit ($\\text{Cov}=0$) schwächer als Unabhängigkeit? ($X, Y$ können nichtlinear abhängig sein, obwohl $\\text{Cov}=0$.)',
    },
    {
      title: 'ML: Bias und Varianz als $\\mathbb{E}[\\cdot]$ und $\\text{Var}[\\cdot]$',
      body: 'Für ein Modell $\\hat{f}$ mit zufälligem Trainingsset $D$:\n\n$$\\text{Bias}[\\hat{f}(x)] = \\mathbb{E}_D[\\hat{f}(x)] - f(x)$$\n\nDer Bias ist der **systematische Fehler** — wie weit liegt der Erwartungswert der Vorhersage vom wahren Wert?\n\n$$\\text{Var}[\\hat{f}(x)] = \\mathbb{E}_D[(\\hat{f}(x) - \\mathbb{E}_D[\\hat{f}(x)])^2]$$\n\nDie Varianz ist die **Instabilität** — wie stark schwankt das Modell über verschiedene Trainingssets?\n\n**Gesamtfehler** = $\\text{Bias}^2 + \\text{Var} + \\sigma^2$ (irreduzibles Rauschen)',
      selfCheck: 'Ein Modell gibt immer $\\hat{y} = 0$ aus. Was ist sein Bias, was seine Varianz? (Bias = $|\\mathbb{E}[\\hat{y}] - y| = |y|$; Varianz = 0 — kein Schwanken zwischen Trainingssets.)',
    },
    {
      title: 'ML: Gradient-Varianz und Adam',
      body: 'Der **Mini-Batch-Gradient** $g_B = \\frac{1}{B}\\sum_{i \\in \\mathcal{B}} \\nabla \\ell_i$ ist ein Schätzer des wahren Gradienten:\n\n$$\\mathbb{E}[g_B] = \\nabla \\mathcal{L} \\qquad \\text{(erwartungstreu)}$$\n\n$$\\text{Var}(g_B) = \\frac{\\sigma^2_g}{B} \\qquad \\text{(skaliert mit } 1/B\\text{)}$$\n\n**Adam** schätzt $\\mathbb{E}[g]$ und $\\mathbb{E}[g^2]$ (exponentielles Glätten):\n\n$$m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t \\approx \\mathbb{E}[g_t]$$\n\n$$v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2 \\approx \\mathbb{E}[g_t^2]$$\n\nEffektive Lernrate: $\\hat{m}_t / \\sqrt{\\hat{v}_t} \\approx \\mathbb{E}[g]/\\text{SD}(g)$ — normierter Gradient.',
    },
  ],

  codeBridges: [
    {
      title: 'torch.mean / torch.var; Bias-Varianz-Analyse in Python',
      lang: 'python',
      code: `import torch
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# --- Erwartungswert und Varianz mit Torch ---
X = torch.tensor([1.0, 2.0, 3.0])
probs = torch.tensor([0.2, 0.5, 0.3])

E_X = (X * probs).sum()               # E[X] = 2.1
E_X2 = (X**2 * probs).sum()           # E[X²] = 4.9
var_X = E_X2 - E_X**2                 # Var(X) = 4.9 - 4.41 = 0.49
print(f"E[X]={E_X:.2f}, Var(X)={var_X:.3f}")

# --- Gradient-Varianz skaliert mit 1/B ---
true_gradient = 2.0
n_experiments = 1000
for B in [1, 8, 64, 512]:
    batch_grads = torch.normal(true_gradient, 1.0, (n_experiments, B))
    avg_grads = batch_grads.mean(dim=1)  # Durchschnitt über Batch
    print(f"B={B:4d}: Var(g_B) = {avg_grads.var():.4f}  (theory: {1/B:.4f})")

# --- Bias-Varianz-Dekomposition empirisch ---
def bias_variance_analysis(degree_list, n_trials=200, n_train=20):
    np.random.seed(42)
    x_test = np.linspace(0, 1, 100).reshape(-1, 1)
    y_true = np.sin(2 * np.pi * x_test).ravel()

    for degree in degree_list:
        preds = []
        for _ in range(n_trials):
            x_train = np.random.rand(n_train, 1)
            y_train = np.sin(2*np.pi*x_train).ravel() + np.random.normal(0, 0.1, n_train)
            poly = PolynomialFeatures(degree)
            model = LinearRegression().fit(poly.fit_transform(x_train), y_train)
            preds.append(model.predict(poly.transform(x_test)))
        preds = np.array(preds)
        bias2 = ((preds.mean(axis=0) - y_true)**2).mean()
        variance = preds.var(axis=0).mean()
        print(f"Grad {degree}: Bias²={bias2:.4f}, Var={variance:.4f}, Total={bias2+variance:.4f}")

bias_variance_analysis([1, 3, 10])`,
      annotation: '`torch.var` berechnet die Stichprobenvarianz (Bessel-Korrektur, $n-1$). Für populationsbasierte Varianz: `torch.var(x, unbiased=False)`. Adam-Parameter $\\beta_1=0{,}9$ und $\\beta_2=0{,}999$ sind Standardwerte — sie kontrollieren, wie stark ältere Gradienten "vergessen" werden.',
    },
  ],

  derivations: [
    {
      claim: 'Verschiebungsformel: $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$',
      reasoning:
        '$\\text{Var}(X) = \\mathbb{E}[(X-\\mu)^2]$ mit $\\mu = \\mathbb{E}[X]$. Ausklammern: $\\mathbb{E}[X^2 - 2\\mu X + \\mu^2] = \\mathbb{E}[X^2] - 2\\mu \\mathbb{E}[X] + \\mu^2 = \\mathbb{E}[X^2] - 2\\mu^2 + \\mu^2 = \\mathbb{E}[X^2] - \\mu^2 = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$.',
    },
    {
      claim: 'Mini-Batch-Gradient-Varianz: $\\text{Var}(g_B) = \\sigma^2/B$',
      reasoning:
        '$g_B = \\frac{1}{B}\\sum_{i=1}^B \\nabla \\ell_i$ mit unabhängigen $\\nabla \\ell_i$, $\\text{Var}(\\nabla \\ell_i) = \\sigma^2$. Dann: $\\text{Var}(g_B) = \\text{Var}(\\frac{1}{B}\\sum_i \\nabla \\ell_i) = \\frac{1}{B^2} \\cdot B \\cdot \\sigma^2 = \\frac{\\sigma^2}{B}$. Größerer Batch → kleinere Gradient-Varianz → stabileres Training, aber mehr Rechenaufwand pro Schritt.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\mathbb{E}[XY] = \\mathbb{E}[X] \\cdot \\mathbb{E}[Y]$ gilt immer',
      correct: '$\\mathbb{E}[XY] = \\mathbb{E}[X] \\cdot \\mathbb{E}[Y]$ gilt nur bei **Unabhängigkeit**',
      explanation:
        'Für abhängige ZVn gilt nur $\\mathbb{E}[X+Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ (Linearität). Das Produkt ist komplizierter: $\\mathbb{E}[XY] = \\mathbb{E}[X]\\mathbb{E}[Y] + \\text{Cov}(X,Y)$.',
    },
    {
      wrong: 'Unkorreliert ($\\text{Cov}(X,Y) = 0$) bedeutet unabhängig',
      correct: 'Unabhängigkeit impliziert Unkorreliertheit, aber nicht umgekehrt',
      explanation:
        'Gegenbeispiel: $X \\sim \\text{Uniform}(-1,1)$, $Y = X^2$. Dann $\\text{Cov}(X, Y) = \\mathbb{E}[X \\cdot X^2] - \\mathbb{E}[X]\\mathbb{E}[X^2] = 0$ (wegen Symmetrie), aber $Y$ hängt vollständig von $X$ ab.',
    },
    {
      wrong: 'Varianz ändert sich bei Verschiebung: $\\text{Var}(X+5) > \\text{Var}(X)$',
      correct: '$\\text{Var}(X+b) = \\text{Var}(X)$ — additive Konstanten ändern die Varianz nicht',
      explanation:
        'Varianz misst Streuung um den Mittelwert. Verschiebung bewegt Mittelwert mit, Streuung bleibt gleich. Nur Skalierung ändert Varianz: $\\text{Var}(aX) = a^2 \\text{Var}(X)$.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Bias and Variance" (YouTube)',
      type: 'video',
      note: 'Klare visuelle Erklärung der Bias-Varianz-Dekomposition mit Bullseye-Analogie',
    },
    {
      title: 'MML Book, Kapitel 6.4: "Moments of a Distribution"',
      type: 'book',
      note: 'Erwartungswert, Varianz und höhere Momente; Verbindung zu ML-Schätzern',
    },
    {
      title: 'Goodfellow et al., Kapitel 5.4: "Estimators, Bias and Variance"',
      type: 'book',
      note: 'Deep Learning Book; freier Online-Zugang; direkte ML-Perspektive',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.zufallsvariablen',
      relation: 'requires',
      hint: 'Zufallsvariablen sind die Objekte, auf die Erwartungswert und Varianz angewendet werden.',
    },
    {
      lessonId: 'p1.kovarianz-multivariate-gauss',
      relation: 'extends',
      hint: 'Kovarianzmatrix $\\Sigma$ verallgemeinert Var$(X)$ auf mehrere ZVn — Lektion 06.',
    },
    {
      lessonId: 'p1.map-regularisierung-bias-variance',
      relation: 'extends',
      hint: 'Bias-Varianz-Tradeoff wird in Lektion 10 mit MAP-Regularisierung verbunden.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'MLE-Schätzer sind erwartungstreu für viele Modelle — Bias = 0, aber Varianz kann hoch sein.',
    },
  ],

  reflection: 'Erwartungswert und Varianz sind mehr als Kenngrößen — sie sind Operatoren, die den Kern des Lernens beschreiben. Der Bias-Varianz-Tradeoff ist nicht akademisch: er erklärt, warum größere Modelle ohne Regularisierung überanpassen. **Was hat dich mehr überrascht: dass Linearität des Erwartungswerts auch für abhängige ZVn gilt, oder der 1/B-Skalierungseffekt für Gradienten?**',
}
