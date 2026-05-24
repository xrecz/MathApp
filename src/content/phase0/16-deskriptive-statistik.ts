import type { Lesson } from '../../types'

export const deskriptiveStatistik: Lesson = {
  id: 'p0.deskriptive-statistik',
  title: 'Mittelwert, Median & Varianz',
  conceptTags: ['statistics', 'mean', 'median', 'variance', 'std'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Kennzahlen einer Datenreihe\n\n**Mittelwert** beschreibt den Schwerpunkt der Daten. **Median** ist der mittlere Wert — robuster gegen Ausreißer. **Varianz** und **Standardabweichung** messen, wie weit die Daten streuen.',
      },
      {
        kind: 'math',
        content:
          '$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i \\qquad \\text{Var}(x) = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 \\qquad \\sigma = \\sqrt{\\text{Var}(x)}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Batch Normalization subtrahiert den Mittelwert und teilt durch die Standardabweichung — direkt diese Formeln. Feature-Standardisierung (Z-Score) nutzt dasselbe Prinzip.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Mittelwert vs. Median\n\nDer **Mittelwert** wird von Ausreißern stark beeinflusst. Beispiel: Gehälter in einem Büro, wo der CEO 10-mal so viel verdient wie alle anderen — der Mittelwert ist hoch, aber nicht repräsentativ.\n\nDer **Median** ist der mittlere Wert nach Sortierung — bei $n$ geraden Werten: Durchschnitt der beiden mittleren.',
      },
      {
        kind: 'worked-example',
        content:
          '**Datensatz**: ${2, 4, 4, 6, 14}$\n\nMittelwert: $\\bar{x} = \\frac{2+4+4+6+14}{5} = \\frac{30}{5} = 6$\n\nMedian: mittlerer Wert = 4\n\nVarianz: $\\frac{(2-6)^2 + (4-6)^2 + (4-6)^2 + (6-6)^2 + (14-6)^2}{5} = \\frac{16+4+4+0+64}{5} = \\frac{88}{5} = 17{,}6$',
      },
    ],
    practice: [
      {
        id: 'p0.stat.ex1',
        difficulty: 1,
        conceptTags: ['mean'],
        type: 'numeric',
        prompt: 'Berechne den Mittelwert von $\\{2, 4, 6\\}$.',
        answer: 4,
        hints: [
          'Mittelwert = Summe geteilt durch Anzahl.',
          '$\\frac{2 + 4 + 6}{3} = ?$',
          '$\\frac{12}{3} = 4$.',
        ],
        explanation: '$\\bar{x} = \\frac{2+4+6}{3} = \\frac{12}{3} = 4$.',
      },
      {
        id: 'p0.stat.ex2',
        difficulty: 2,
        conceptTags: ['median'],
        type: 'numeric',
        prompt: 'Median von $\\{1, 3, 7, 2, 5\\}$? (Sortiere zuerst!)',
        answer: 3,
        hints: [
          'Sortiere die Zahlen aufsteigend.',
          'Sortiert: $\\{1, 2, 3, 5, 7\\}$ — 5 Werte, mittlerer ist der 3.',
          'Mittlerer Wert = 3.',
        ],
        explanation: 'Sortiert: $\\{1, 2, 3, 5, 7\\}$. Mittlerer Wert (Position 3 von 5) = 3.',
      },
      {
        id: 'p0.stat.ex3',
        difficulty: 2,
        conceptTags: ['mean'],
        type: 'numeric',
        prompt: 'Mittelwert von $\\{0, 0, 0, 100\\}$?',
        answer: 25,
        hints: [
          '$\\frac{0+0+0+100}{4} = ?$',
          '$\\frac{100}{4} = 25$.',
          'Der Ausreißer 100 zieht den Mittelwert weit nach oben!',
        ],
        explanation: '$\\bar{x} = \\frac{100}{4} = 25$. Der Ausreißer verzerrt den Mittelwert stark.',
      },
      {
        id: 'p0.stat.ex4',
        difficulty: 3,
        conceptTags: ['median'],
        type: 'numeric',
        prompt: 'Median von $\\{0, 0, 0, 100\\}$?',
        answer: 0,
        hints: [
          'Bereits sortiert: $\\{0, 0, 0, 100\\}$.',
          '4 Werte — Median = Durchschnitt der 2. und 3. Position.',
          '2. Wert = 0, 3. Wert = 0. Durchschnitt = 0.',
        ],
        explanation:
          'Sortiert: $\\{0, 0, 0, 100\\}$. Median = Durchschnitt des 2. und 3. Wertes: $\\frac{0+0}{2} = 0$. Der Median ignoriert den Ausreißer!',
      },
      {
        id: 'p0.stat.ex5',
        difficulty: 3,
        conceptTags: ['variance'],
        type: 'numeric',
        prompt: 'Varianz von $\\{2, 2, 2\\}$?',
        answer: 0,
        hints: [
          'Erst Mittelwert: $\\bar{x} = 2$.',
          'Dann $(x_i - \\bar{x})^2$ für jedes $x_i$: $(2-2)^2 = 0$.',
          'Summe ist 0, Varianz ist 0.',
        ],
        explanation:
          'Alle Werte sind gleich → Abstand zum Mittelwert immer 0 → Varianz = 0. Keine Streuung.',
      },
      {
        id: 'p0.stat.ex6',
        difficulty: 4,
        conceptTags: ['std', 'normalization', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Z-Score-Normalisierung: $z = \\frac{x - \\bar{x}}{\\sigma}$. Berechne $z$ für $x = 8$, $\\bar{x} = 5$, $\\sigma = 3$.',
        answer: 1,
        hints: [
          '$z = \\frac{8 - 5}{3}$',
          '$\\frac{3}{3} = ?$',
          '$z = 1$. Der Wert liegt genau eine Standardabweichung über dem Mittelwert.',
        ],
        explanation:
          '$z = \\frac{8-5}{3} = \\frac{3}{3} = 1$. Nach Z-Normalisierung haben alle Features $\\bar{x} = 0$ und $\\sigma = 1$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Batch Normalization\n\nBatch Normalization (BatchNorm) ist eine der wichtigsten Techniken in modernen neuronalen Netzen. Für jede Schicht, pro Mini-Batch:',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{x}_i = \\frac{x_i - \\mu_{\\text{batch}}}{\\sqrt{\\sigma^2_{\\text{batch}} + \\epsilon}}$$',
      },
      {
        kind: 'callout',
        content:
          'Das ist exakt die Z-Score-Normalisierung — minus Mittelwert, geteilt durch Standardabweichung — auf die Aktivierungen einer Schicht angewendet. BatchNorm stabilisiert das Training und erlaubt höhere Lernraten. Du hast gerade verstanden, was dahintersteckt.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.stat.card1',
      front: 'Mittelwert-Formel?',
      back: '$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$',
      conceptTags: ['mean'],
    },
    {
      id: 'p0.stat.card2',
      front: 'Standardabweichung aus Varianz?',
      back: '$\\sigma = \\sqrt{\\text{Var}(x)}$',
      conceptTags: ['std'],
    },
    {
      id: 'p0.stat.card3',
      front: 'Z-Score-Formel?',
      back: '$z = \\frac{x - \\bar{x}}{\\sigma}$',
      conceptTags: ['normalization'],
    },
  ],

  learningOutcome:
    'Du kannst Mittelwert, Median, Varianz und Standardabweichung berechnen und interpretieren — und verstehst, wie Batch Normalization diese Konzepte auf neuronale Netze anwendet.',

  description:
    'Deskriptive Statistik beschreibt Daten mit Zahlen. Mittelwert und Varianz sind nicht nur Schulmathematik — sie stecken in Batch Normalization, Feature-Normalisierung und der Z-Score-Transformation, die jedes ML-Modell nutzt.',

  conceptSteps: [
    {
      title: 'Lagemaße: Mittelwert, Median, Modus',
      preprompt: 'Du analysierst Gehälter in einer Firma mit 9 normalen Angestellten (je 3000 €) und einem CEO (100.000 €). Welche Zahl beschreibt die "typische" Vergütung besser?',
      body: 'Lagemaße beschreiben, wo die Daten "liegen":\n\n**Mittelwert** (arithmetisches Mittel): empfindlich gegenüber Ausreißern\n$$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$$\n\n**Median**: der mittlere Wert nach Sortierung — robust gegen Ausreißer\n$$\\text{Median} = x_{(\\lceil n/2 \\rceil)} \\quad \\text{(bei ungeradem } n\\text{)}$$\n\n**Modus**: der häufigste Wert (kann mehrfach auftreten)\n\nBei symmetrischen Daten: Mittelwert = Median = Modus.',
      miniExample: '$\\{1, 2, 3, 4, 100\\}$: Mittelwert $= 22$, Median $= 3$ — der Ausreißer 100 wirft den Mittelwert weit',
      selfCheck: 'Wann ist der Median dem Mittelwert vorzuziehen? (Wenn Ausreißer vorhanden sind — z.B. bei Einkommensverteilungen.)',
    },
    {
      title: 'Streuungsmaße: Varianz und Standardabweichung',
      preprompt: 'Zwei Klassen haben beide Mittelwert 70 Punkte. Klasse A: alle zwischen 65–75, Klasse B: zwischen 20–100. Was unterscheidet sie noch?',
      body: '**Varianz**: mittlere quadratische Abweichung vom Mittelwert\n$$\\text{Var}(x) = \\sigma^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2$$\n\n**Standardabweichung**: Wurzel der Varianz — hat dieselbe Einheit wie $x$\n$$\\sigma = \\sqrt{\\text{Var}(x)} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2}$$\n\nWahrscheinlichkeit vs. Stichproben: Bei Stichproben oft $\\frac{1}{n-1}$ (korrigierte Stichprobenvarianz). PyTorch nutzt standardmäßig $\\frac{1}{n}$.',
      miniExample: '$\\{2, 4, 4, 4, 6\\}$: $\\bar{x} = 4$, $\\sigma^2 = \\frac{4+0+0+0+4}{5} = 1{,}6$, $\\sigma = \\sqrt{1{,}6} \\approx 1{,}26$',
      selfCheck: 'Warum wird Varianz quadriert statt Betrag zu nehmen? (Quadrat macht negative Abweichungen positiv und bestraft große Ausreißer stärker — und ist differenzierbar!)',
    },
    {
      title: 'Quartile, IQR und Boxplots',
      body: 'Quartile teilen sortierte Daten in vier gleich große Gruppen:\n\n$$Q_1 = 25\\text{-Perzentil} \\quad Q_2 = \\text{Median} \\quad Q_3 = 75\\text{-Perzentil}$$\n\n**Interquartilsabstand** $\\text{IQR} = Q_3 - Q_1$: misst Streuung der mittleren 50%\n\n**Ausreißer-Regel**: $x < Q_1 - 1{,}5 \\cdot \\text{IQR}$ oder $x > Q_3 + 1{,}5 \\cdot \\text{IQR}$\n\nIn ML: Box Plots helfen, Verteilungen von Loss-Werten über Subgruppen zu vergleichen — wichtig für Fairness-Analysen.',
      miniExample: '$\\{1, 2, 3, 4, 5, 6, 7, 8\\}$: $Q_1 = 2{,}5$, $Q_2 = 4{,}5$, $Q_3 = 6{,}5$, $\\text{IQR} = 4$',
    },
    {
      title: 'Normalisierung: Z-Score',
      body: 'Z-Score-Normalisierung bringt Daten auf **Mittelwert 0, Standardabweichung 1**:\n\n$$z_i = \\frac{x_i - \\bar{x}}{\\sigma}$$\n\nNach Normalisierung: $\\bar{z} = 0$ und $\\text{Std}(z) = 1$.\n\nWarum in ML?\n- Features auf unterschiedlichen Skalen (z.B. Alter 0–100, Gehalt 0–100.000) werden vergleichbar\n- Gradientenabstieg konvergiert schneller bei normierten Features\n- Voraussetzung für viele Algorithmen (z.B. KNN, SVM)',
      miniExample: 'Feature "Alter": $\\bar{x} = 30$, $\\sigma = 10$. Wert 40: $z = \\frac{40-30}{10} = 1$ (eine Standardabweichung über dem Mittelwert)',
      selfCheck: 'Was ist der Z-Score für den Mittelwert selbst ($x = \\bar{x}$)? ($z = 0$ — der Mittelwert liegt genau bei 0 nach Normalisierung.)',
    },
    {
      title: 'ML: Batch Normalization',
      body: 'Batch Normalization (BatchNorm) normiert Aktivierungen in neuronalen Netzen:\n\n$$\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\varepsilon}}$$\n\nDanach wird skaliert und verschoben mit **lernbaren Parametern** $\\gamma$ und $\\beta$:\n$$y_i = \\gamma \\hat{x}_i + \\beta$$\n\nWozu?\n- Verhindert **interne Kovarianz-Verschiebung**: Verteilung der Aktivierungen bleibt stabil\n- Erlaubt höhere Lernraten\n- Wirkt als leichte Regularisierung\n\nFormel: das ist Z-Score auf Mini-Batch-Ebene, mit $\\varepsilon \\approx 10^{-5}$ gegen Division durch 0.',
      miniExample: 'Mini-Batch Aktivierungen: $(1, 3, 5)$. $\\mu = 3$, $\\sigma = \\sqrt{8/3}$. Nach BatchNorm: $(-1{,}22,\\; 0,\\; 1{,}22)$',
      selfCheck: 'Warum braucht BatchNorm die lernbaren Parameter $\\gamma$ und $\\beta$? (Damit das Netz die Normalisierung "rückgängig" machen kann, falls die Aufgabe es erfordert.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Statistiken und Batch Normalization',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# Datensatz als Tensor
x = torch.tensor([2.0, 4.0, 4.0, 4.0, 6.0])

# Grundlegende Statistiken
mean = torch.mean(x)      # = 4.0  (Mittelwert)
var  = torch.var(x, unbiased=False)  # = 1.6  (Varianz, Nenner n)
std  = torch.std(x, unbiased=False)  # = 1.265 (Standardabweichung)

# Z-Score-Normalisierung: z = (x - mean) / std
z = (x - mean) / std
print(f"Z-Scores: {z}")      # [-1.58, 0, 0, 0, 1.58]
print(f"Mean z: {z.mean():.4f}")  # ≈ 0.0
print(f"Std  z: {z.std(unbiased=False):.4f}")  # ≈ 1.0

# Batch Normalization Layer
# Eingabe: (batch_size, features) = (4, 8)
batch = torch.randn(4, 8)
bn = nn.BatchNorm1d(num_features=8)  # 8 Features normieren

# Normiert jede Feature-Dimension über den Batch
output = bn(batch)
# Intern: (x - mu_batch) / sqrt(var_batch + eps) * gamma + beta
print(f"Output mean (per feature): {output.mean(dim=0).detach()}")  # ≈ 0`,
      annotation: '`torch.var(x, unbiased=False)` verwendet $\\frac{1}{n}$ (Population-Varianz). `unbiased=True` (Standard) verwendet $\\frac{1}{n-1}$ (Stichproben-Varianz). `nn.BatchNorm1d` normiert jede Feature-Dimension unabhängig über den Mini-Batch und wendet dann $\\gamma$ (scale) und $\\beta$ (shift) an — genau wie $y_i = \\gamma \\hat{x}_i + \\beta$.',
    },
  ],

  derivations: [
    {
      claim: 'Nach Z-Score-Normalisierung: $\\bar{z} = 0$ und $\\text{Var}(z) = 1$',
      reasoning:
        '$\\bar{z} = \\frac{1}{n} \\sum_i z_i = \\frac{1}{n} \\sum_i \\frac{x_i - \\bar{x}}{\\sigma} = \\frac{1}{n\\sigma} \\sum_i (x_i - \\bar{x}) = \\frac{1}{\\sigma} (\\bar{x} - \\bar{x}) = 0$. Für Varianz: $\\text{Var}(z) = \\text{Var}\\!\\left(\\frac{x - \\bar{x}}{\\sigma}\\right) = \\frac{1}{\\sigma^2} \\text{Var}(x) = \\frac{\\sigma^2}{\\sigma^2} = 1$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Mittelwert und Median sind immer ähnlich',
      correct: 'Bei schiefen Verteilungen oder Ausreißern können sie stark abweichen',
      explanation:
        'Einkommensverteilungen: Mittelwert oft 2–3× höher als Median (wenige Reiche ziehen ihn hoch). Im ML kann ein einzelnes schlechtes Trainingsbeispiel den Mittelwert-Loss stark erhöhen.',
    },
    {
      wrong: '$\\sigma$ und $\\sigma^2$ sind dasselbe',
      correct: '$\\sigma$ ist Standardabweichung, $\\sigma^2$ ist Varianz',
      explanation:
        'Varianz ist quadratisch — hat andere Einheiten als die Daten. Standardabweichung $\\sigma = \\sqrt{\\sigma^2}$ hat dieselbe Einheit wie die Daten. In ML-Formeln (z.B. BatchNorm) steht fast immer $\\sigma^2 + \\varepsilon$ unter der Wurzel.',
    },
    {
      wrong: 'Normalisierung macht alle Daten zwischen 0 und 1',
      correct: 'Z-Score-Normalisierung setzt Mittelwert = 0, Std = 1 — Werte können negativ sein',
      explanation:
        'Min-Max-Normalisierung $\\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$ skaliert auf $[0, 1]$. Z-Score-Normalisierung erzeugt Werte in $(-\\infty, +\\infty)$ mit $\\mu = 0$, $\\sigma = 1$. Beide haben Vor- und Nachteile.',
    },
  ],

  furtherResources: [
    {
      title: 'Ioffe & Szegedy: "Batch Normalization" (2015)',
      type: 'article',
      note: 'Das Original-Paper zu Batch Normalization — jetzt ist die Formel verständlich',
    },
    {
      title: 'Khan Academy: "Measures of spread" (Video)',
      type: 'video',
      note: 'Intuitive Einführung in Varianz und Standardabweichung mit Beispielen',
    },
    {
      title: 'Serlo: "Mittelwert, Median und Modus"',
      type: 'article',
      note: 'Deutsche Einführung mit vergleichenden Beispielen und Aufgaben',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.histogramme',
      relation: 'extends',
      hint: 'Histogramme visualisieren Verteilungen — Mittelwert und Standardabweichung beschreiben dieselben Verteilungen numerisch.',
    },
    {
      lessonId: 'p0.notation',
      relation: 'requires',
      hint: 'Summenzeichen $\\sum$ ist Voraussetzung zum Lesen der Mittelwert- und Varianzformel.',
    },
    {
      lessonId: 'p1.erwartungswert-varianz',
      relation: 'extends',
      hint: 'Phase 1 formalisiert Mittelwert und Varianz als Erwartungswert und Varianz von Zufallsvariablen.',
    },
    {
      lessonId: 'p1.kovarianz-multivariate-gauss',
      relation: 'see-also',
      hint: 'Kovarianz verallgemeinert Varianz auf mehrere Dimensionen — zentral für multivariate Gaussverteilungen.',
    },
  ],

  reflection: 'Du hast gelernt: **Mittelwert und Standardabweichung** sind nicht nur Schulstoff — sie stecken in jedem Training-Loop durch Batch Normalization. Wenn ein Modell nicht konvergiert, ist oft die Normalisierung das Problem. Welcher Aspekt der deskriptiven Statistik hat dir am meisten geholfen, ML besser zu verstehen?',
}
