import type { Lesson } from '../../types'

export const histogramme: Lesson = {
  id: 'p0.histogramme',
  title: 'Histogramme & Verteilungen (intuitiv)',
  conceptTags: ['histogram', 'distribution', 'normal', 'data-viz'],
  estimatedMinutes: 10,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Daten visualisieren\n\nEin **Histogramm** zeigt, wie häufig Werte in bestimmten Bereichen vorkommen. Die wichtigste Verteilung ist die **Normalverteilung** — symmetrische Glockenkurve um den Mittelwert.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="0 0 200 100" width="200" height="100" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="90" x2="190" y2="90" stroke="#6b7280" stroke-width="1"/>
          <line x1="10" y1="10" x2="10" y2="90" stroke="#6b7280" stroke-width="1"/>
          <rect x="20" y="80" width="20" height="10" fill="#6366f1" opacity="0.7"/>
          <rect x="45" y="65" width="20" height="25" fill="#6366f1" opacity="0.7"/>
          <rect x="70" y="40" width="20" height="50" fill="#6366f1" opacity="0.7"/>
          <rect x="95" y="20" width="20" height="70" fill="#6366f1" opacity="0.9"/>
          <rect x="120" y="40" width="20" height="50" fill="#6366f1" opacity="0.7"/>
          <rect x="145" y="65" width="20" height="25" fill="#6366f1" opacity="0.7"/>
          <rect x="170" y="80" width="20" height="10" fill="#6366f1" opacity="0.7"/>
          <text x="95" y="99" fill="#9ca3af" font-size="8" text-anchor="middle">μ</text>
        </svg>`,
        caption: 'Normalverteilung — symmetrisch um den Mittelwert μ',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Verteilungen sind die Sprache der Statistik und des ML. In Phase 1c wirst du formale Verteilungen (Bernoulli, Gauß) kennenlernen. Histogramme sind das Werkzeug, um sie aus Daten zu schätzen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Histogramm konstruieren\n\n1. Wähle Bins (Intervalle)\n2. Zähle, wie viele Werte in jeden Bin fallen\n3. Zeichne Balken — Höhe = Häufigkeit\n\n### Normalverteilung\n\n- Symmetrisch um Mittelwert $\\mu$\n- $\\sigma$ (Standardabweichung) = "Breite" der Kurve\n- Großteil der Daten liegt in $[\\mu - 2\\sigma, \\mu + 2\\sigma]$ (95 %)',
      },
      {
        kind: 'text',
        content:
          '### Schiefe Verteilungen\n\n**Rechts-schief**: langer Schwanz nach rechts → Mittelwert >> Median (z.B. Einkommensverteilung)\n\n**Links-schief**: langer Schwanz nach links → Mittelwert << Median',
      },
    ],
    practice: [
      {
        id: 'p0.histo.ex1',
        difficulty: 1,
        conceptTags: ['histogram'],
        type: 'mc',
        prompt: 'Was zeigt die y-Achse eines Histogramms?',
        options: [
          'Häufigkeit (Anzahl Werte im Bin)',
          'Mittelwert der Werte',
          'Den Bin-Index',
          'Nichts — y-Achse ist immer leer',
        ],
        answer: 'Häufigkeit (Anzahl Werte im Bin)',
        hints: [
          'Ein Histogramm visualisiert, wie oft Werte in bestimmten Bereichen vorkommen.',
          'Die Balken-Höhe entspricht der Häufigkeit.',
          'y-Achse = Häufigkeit, x-Achse = Wertebereiche (Bins).',
        ],
        explanation: 'y-Achse = Häufigkeit (oder relative Häufigkeit/Dichte). Balken-Höhe = wie oft dieser Bereich vorkommt.',
      },
      {
        id: 'p0.histo.ex2',
        difficulty: 2,
        conceptTags: ['distribution', 'normal'],
        type: 'mc',
        prompt: 'Eine Verteilung ist symmetrisch um den Wert 10. Was gilt näherungsweise?',
        options: [
          'Mittelwert ≈ Median ≈ 10',
          'Nur der Median ist 10',
          'Mittelwert ist größer als 10',
          'Weder Mittelwert noch Median ist 10',
        ],
        answer: 'Mittelwert ≈ Median ≈ 10',
        hints: [
          'Bei einer symmetrischen Verteilung fallen Mittelwert und Median zusammen.',
          'Der Symmetrie-Mittelpunkt ist 10.',
          'Also: Mittelwert ≈ Median ≈ 10.',
        ],
        explanation: 'Bei symmetrischen Verteilungen (z.B. Normalverteilung) gilt Mittelwert = Median = Modalwert.',
      },
      {
        id: 'p0.histo.ex3',
        difficulty: 2,
        conceptTags: ['normal'],
        type: 'mc',
        prompt:
          '"In einer Normalverteilung sind Median und Mittelwert gleich." — Wahr oder falsch?',
        options: ['Wahr', 'Falsch'],
        answer: 'Wahr',
        hints: [
          'Die Normalverteilung ist symmetrisch um ihren Mittelwert.',
          'Bei Symmetrie: mittlerer Wert = Schwerpunkt.',
          'Median = Mittelwert für die Normalverteilung.',
        ],
        explanation: 'Wahr — die Normalverteilung ist perfekt symmetrisch, daher Mittelwert = Median.',
      },
      {
        id: 'p0.histo.ex4',
        difficulty: 3,
        conceptTags: ['skewness'],
        type: 'mc',
        prompt: 'Wenn Mittelwert >> Median, ist die Verteilung wahrscheinlich?',
        options: [
          'Rechts-schief (langer Schwanz nach rechts)',
          'Links-schief (langer Schwanz nach links)',
          'Normalverteilt',
          'Gleichmäßig verteilt',
        ],
        answer: 'Rechts-schief (langer Schwanz nach rechts)',
        hints: [
          'Ausreißer nach rechts (hohe Werte) ziehen den Mittelwert nach oben.',
          'Der Median bleibt stabiler bei Ausreißern.',
          'Mittelwert > Median → Schwanz nach rechts → rechts-schief.',
        ],
        explanation:
          'Hohe Ausreißer ziehen den Mittelwert nach rechts. Mittelwert > Median ist typisch für rechts-schiefe Verteilungen (z.B. Einkommensverteilung).',
      },
      {
        id: 'p0.histo.ex5',
        difficulty: 4,
        conceptTags: ['histogram', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Du möchtest die Verteilung der Loss-Werte über alle Testbeispiele visualisieren. Welches Werkzeug passt?',
        options: [
          'Histogramm (Loss-Werte in Bins aufteilen)',
          'Liniengraph (Loss-Wert über Epochen)',
          'Balkendiagramm (Klassen-Häufigkeit)',
          'Streudiagramm (zwei Features)',
        ],
        answer: 'Histogramm (Loss-Werte in Bins aufteilen)',
        hints: [
          'Wir wollen die Verteilung von Werten (Loss) sehen.',
          'Ein Histogramm zeigt, wie häufig welche Wertebereiche vorkommen.',
          'Liniengraphen zeigen Verläufe über die Zeit, kein Histogramm.',
        ],
        explanation:
          'Ein Histogramm der Loss-Werte zeigt, ob die meisten Fehler klein sind (Häufung bei 0) oder ob es viele große Fehler gibt — wichtig zur Modell-Diagnose.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Verteilungen in ML\n\nVerteilungen tauchen überall auf:\n\n- **Aktivierungsverteilung**: Wie verteilen sich die Ausgaben einer Schicht? Zu viele Nullen = "Dying ReLU"; zu viele Extremwerte = Gradientenexplosion.\n- **Gewichtsverteilung**: Sind die Gewichte nach dem Training noch gaußförmig? Ein Zeichen für Regularisierung.\n- **Loss-Verteilung über Testbeispiele**: Gibt es Subgruppen, die das Modell systematisch schlechter behandelt?',
      },
      {
        kind: 'callout',
        content:
          'Wer Histogramme und Verteilungen versteht, kann Modelle diagnostizieren. "Loss zu groß auf dieser Untergruppe" ist ein Histogramm-Befund. In Phase 1 und 2 wirst du diese Werkzeuge formalisieren und auf echte Daten anwenden.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.histo.card1',
      front: 'Was misst die y-Achse eines Histogramms?',
      back: 'Häufigkeit / Anzahl der Werte in diesem Bin.',
      conceptTags: ['histogram'],
    },
    {
      id: 'p0.histo.card2',
      front: 'Wie heißt die symmetrische Glockenkurve?',
      back: 'Normalverteilung (Gauß-Verteilung).',
      conceptTags: ['normal'],
    },
    {
      id: 'p0.histo.card3',
      front: 'Mittelwert >> Median bedeutet?',
      back: 'Rechts-schiefe Verteilung (langer Schwanz nach rechts).',
      conceptTags: ['skewness'],
    },
  ],

  learningOutcome:
    'Du kannst Histogramme lesen und erstellen, absolute und relative Häufigkeiten unterscheiden und die Normalverteilung intuitiv erkennen — und weißt, wie Histogramme beim Debuggen von ML-Modellen helfen.',

  description:
    'Histogramme machen unsichtbare Datenverteilungen sichtbar. Ob Loss-Werte, Gewichtsverteilungen oder Feature-Statistiken — ein Blick ins Histogramm verrät oft schnell, ob etwas mit dem Modell nicht stimmt.',

  conceptSteps: [
    {
      title: 'Was zeigt ein Histogramm?',
      preprompt: 'Du hast 1000 Loss-Werte von einem Modell. Wie kannst du auf einen Blick sehen, ob die meisten Fehler klein oder groß sind?',
      body: 'Ein **Histogramm** teilt die Werte in **Bins** (Intervalle) und zählt, wie viele Werte in jeden Bin fallen:\n\n1. Wähle Bins: $[0, 0{,}5)$, $[0{,}5, 1)$, $[1, 1{,}5)$, ...\n2. Zähle Häufigkeiten: wie viele Werte liegen in jedem Bin?\n3. Zeichne Balken: Höhe = Häufigkeit\n\n**x-Achse**: Wertebereiche (Bins)\n**y-Achse**: Häufigkeit (absolute oder relative)\n\nHistogramme unterscheiden sich von Balkendiagrammen: Bins sind zusammenhängende Intervalle über kontinuierliche Werte (kein Abstand zwischen Balken).',
      visual: `<svg viewBox="0 0 260 120" width="260" height="120" aria-label="Histogramm Beispiel">
        <rect x="0" y="0" width="260" height="120" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="30" y1="100" x2="245" y2="100" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="30" y1="10" x2="30" y2="100" stroke="rgb(55 65 81)" stroke-width="1"/>
        <rect x="35" y="88" width="28" height="12" fill="rgb(99 102 241)" fill-opacity="0.8"/>
        <rect x="65" y="72" width="28" height="28" fill="rgb(99 102 241)" fill-opacity="0.8"/>
        <rect x="95" y="42" width="28" height="58" fill="rgb(99 102 241)" fill-opacity="0.9"/>
        <rect x="125" y="22" width="28" height="78" fill="rgb(134 239 172)" fill-opacity="0.9"/>
        <rect x="155" y="40" width="28" height="60" fill="rgb(99 102 241)" fill-opacity="0.9"/>
        <rect x="185" y="70" width="28" height="30" fill="rgb(99 102 241)" fill-opacity="0.8"/>
        <rect x="215" y="88" width="28" height="12" fill="rgb(99 102 241)" fill-opacity="0.8"/>
        <text x="125" y="18" fill="rgb(251 191 36)" font-size="8" text-anchor="middle" font-family="monospace">μ</text>
        <text x="18" y="103" fill="rgb(156 163 175)" font-size="8">0</text>
        <text x="22" y="14" fill="rgb(156 163 175)" font-size="8">n</text>
        <text x="130" y="113" fill="rgb(156 163 175)" font-size="8" text-anchor="middle">Wert</text>
      </svg>`,
      miniExample: '$\\{1, 1, 2, 2, 2, 3, 4\\}$: Bin $[2,3)$ hat Häufigkeit 3 — der häufigste Bereich',
      selfCheck: 'Was sagt dir ein Bin mit sehr großer Balken-Höhe? (Viele Datenpunkte haben Werte in diesem Bereich — das ist der häufigste Bereich.)',
    },
    {
      title: 'Absolute vs. relative Häufigkeit',
      body: '**Absolute Häufigkeit**: Anzahl der Werte im Bin\n$$h_k = |\\{x_i \\mid x_i \\in \\text{Bin}_k\\}|$$\n\n**Relative Häufigkeit**: Anteil an allen Werten\n$$r_k = \\frac{h_k}{n}$$\n\n**Dichte**: relative Häufigkeit geteilt durch Bin-Breite $\\Delta$\n$$f_k = \\frac{r_k}{\\Delta}$$\n\nDichte-Histogramme haben den Vorteil: Fläche unter allen Balken = 1 (wie eine Wahrscheinlichkeitsdichte). Das erlaubt direkten Vergleich zwischen Datensätzen unterschiedlicher Größe.',
      miniExample: '100 Werte, 20 fallen in Bin $[1, 2)$: relative Häufigkeit $= 0{,}2 = 20\\%$; Dichte $= 0{,}2$',
      selfCheck: 'Summieren sich alle relativen Häufigkeiten zu 1? (Ja: $\\sum_k r_k = \\sum_k \\frac{h_k}{n} = \\frac{n}{n} = 1$.)',
    },
    {
      title: 'Klassenbreite und Verzerrung',
      body: 'Die **Wahl der Bin-Breite** beeinflusst das Bild stark:\n\n- **Zu wenige Bins** (zu breite): Information geht verloren, alles sieht flach aus\n- **Zu viele Bins** (zu schmale): Rauschen dominiert, kein Muster erkennbar\n- **Richtige Bin-Breite**: Struktur der Daten wird sichtbar\n\nFaustformeln für Bin-Anzahl $k$:\n$$k = \\lceil \\sqrt{n} \\rceil \\quad \\text{(Wurzelregel)} \\qquad k = \\lceil 1 + \\log_2 n \\rceil \\quad \\text{(Sturges)}$$\n\nIn Matplotlib/NumPy: `bins="auto"` wählt automatisch — gut für den Start.',
      miniExample: '100 Datenpunkte: Wurzelregel → $k = \\lceil\\sqrt{100}\\rceil = 10$ Bins; Sturges → $k = \\lceil 1 + \\log_2 100 \\rceil = 8$ Bins',
    },
    {
      title: 'Normalverteilung: Form erkennen',
      body: 'Die **Normalverteilung** (Gauß-Verteilung) ist die wichtigste Verteilung in Statistik und ML:\n\n$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)$$\n\n**Visuelle Merkmale**:\n- Symmetrische Glockenkurve\n- Höchster Punkt bei $\\mu$ (Mittelwert = Median = Modus)\n- 68-95-99,7-Regel: $\\approx 68\\%$ in $[\\mu-\\sigma, \\mu+\\sigma]$, $\\approx 95\\%$ in $[\\mu-2\\sigma, \\mu+2\\sigma]$\n\n**Warum Normal?** Zentraler Grenzwertsatz: Summen vieler unabhängiger Zufallsvariablen sind annähernd normalverteilt.',
      miniExample: 'Gewichte eines Modells nach Kaiming-Initialisierung: Histogramm zeigt Glockenkurve um 0',
      selfCheck: 'Was bedeutet eine schmalere Glockenkurve ($\\sigma$ kleiner)? (Die Daten streuen weniger — mehr Werte liegen nahe am Mittelwert.)',
    },
    {
      title: 'Schiefe und Kurtosis',
      body: '**Schiefe** (Skewness) beschreibt die Asymmetrie:\n- Rechts-schief (positiv): langer Schwanz rechts, Mittelwert > Median\n- Links-schief (negativ): langer Schwanz links, Mittelwert < Median\n- Symmetrisch (0): Normalverteilung\n\n**Kurtosis** beschreibt die "Schwanzdicke":\n- Hohe Kurtosis: schwere Tails, viele Ausreißer (leptokurtisch)\n- Niedrige Kurtosis: dünne Tails (platykurtisch)\n- Normalverteilung: Kurtosis = 3 (oder überschüssige Kurtosis = 0)\n\nIn ML: Loss-Verteilungen sind oft rechts-schief (viele kleine, wenige große Fehler).',
      miniExample: 'Einkommensverteilung: stark rechts-schief. Messfehler: oft symmetrisch, annähernd normal',
      selfCheck: 'Was sagt hohe Kurtosis in der Loss-Verteilung aus? (Es gibt einige wenige Trainingsbeispiele mit sehr hohem Loss — mögliche Fehler in den Labels oder "hard examples".)',
    },
    {
      title: 'ML: Histogramme von Gewichten und Aktivierungen',
      body: 'Histogramme sind ein Standard-Werkzeug beim **Debugging von Neuronalen Netzen**:\n\n**Gewichtsverteilung**: Sind Gewichte normalverteilt und nicht zu groß?\n- Zu viele Null-Gewichte → möglicherweise Dying Neurons\n- Wachsende Gewichte über Epochen → Gradient-Explosion\n\n**Aktivierungsverteilung**: Wie sehen die Layer-Outputs aus?\n- Alles nahe 0 bei ReLU → Dying ReLU Problem\n- Extreme Werte → Gradient-Explosion\n\n**Loss-Histogramm über Testdaten**: Gibt es Subgruppen mit systematisch höherem Loss?\n- Fairness-Analyse: verschiedene demographische Gruppen\n- Schwierige Beispiele identifizieren',
      miniExample: 'TensorBoard visualisiert Gewichts-Histogramme automatisch über Epochen — eine Gerade statt Glockenkurve ist ein Warnsignal',
      selfCheck: 'Was bedeutet eine bimodale (zweiglockige) Aktivierungsverteilung? (Zwei Gruppen von Aktivierungen mit unterschiedlichem Verhalten — könnte auf Strukturprobleme im Netz hinweisen.)',
    },
  ],

  codeBridges: [
    {
      title: 'Python/PyTorch: Histogramme für Modell-Diagnose',
      lang: 'python',
      code: `import torch
import torch.nn as nn
import matplotlib.pyplot as plt

# Einfaches Netz
model = nn.Sequential(nn.Linear(64, 128), nn.ReLU(), nn.Linear(128, 10))

# Gewichtsverteilung des ersten Layers als Histogramm
weights = model[0].weight.data.flatten()  # Shape: (128*64,) = 8192 Werte

# Statistiken
print(f"Mean:  {weights.mean():.4f}")   # Kaiming-Init → ≈ 0
print(f"Std:   {weights.std():.4f}")    # ≈ sqrt(2/64) ≈ 0.177
print(f"Min:   {weights.min():.4f}")
print(f"Max:   {weights.max():.4f}")

# Histogramm (matplotlib)
plt.hist(weights.numpy(), bins=50, density=True, color='steelblue', alpha=0.7)
plt.title("Gewichtsverteilung Layer 1")
plt.xlabel("Gewichtswert")
plt.ylabel("Dichte")
plt.show()

# PyTorch-eigene Histogramm-Funktion
hist = torch.histogram(weights, bins=20)
print(f"Häufigkeiten: {hist.hist[:5]}")   # erste 5 Bins
print(f"Bin-Grenzen: {hist.bin_edges[:6]}")`,
      annotation: '`.flatten()` macht den 2D-Gewichts-Tensor zu einer 1D-Liste — dann kann man ein Histogramm zeichnen. `density=True` normiert auf Dichte (Fläche = 1), damit Histogramme verschiedener Größen vergleichbar sind. `bins=50` — Sturges/Wurzelregel sagt hier $\\approx 90$, aber 50 reicht für erste Diagnose. `torch.histogram` ist die PyTorch-native Alternative ohne Matplotlib.',
    },
  ],

  derivations: [
    {
      claim: 'Relative Häufigkeiten summieren zu 1',
      reasoning:
        'Jeder Datenpunkt $x_i$ fällt in genau einen Bin (keine Überlappung, alle Werte abgedeckt). Daher: $\\sum_k h_k = n$. Damit: $\\sum_k r_k = \\sum_k \\frac{h_k}{n} = \\frac{1}{n} \\sum_k h_k = \\frac{n}{n} = 1$. Das macht relative Häufigkeiten zu Wahrscheinlichkeiten im empirischen Sinne.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Histogramm und Balkendiagramm sind dasselbe',
      correct: 'Histogramm: kontinuierliche Intervalle (keine Lücken). Balkendiagramm: kategorische Daten',
      explanation:
        'In einem Balkendiagramm (z.B. Klassenhäufigkeit: Hund/Katze/Vogel) gibt es logische Lücken zwischen Kategorien. In einem Histogramm sind die Bins zusammenhängende Intervalle über kontinuierliche Werte.',
    },
    {
      wrong: 'Mehr Bins ist immer besser',
      correct: 'Zu viele Bins führen zu Rauschen (Überanpassung an Stichprobe)',
      explanation:
        'Mit 1000 Datenpunkten und 500 Bins hat jeder Bin im Schnitt 2 Werte — das Histogramm zeigt Zufallsrauschen statt der echten Verteilung. Verwende Daumenregeln ($\\sqrt{n}$ oder Sturges) als Ausgangspunkt.',
    },
    {
      wrong: 'Normalverteilung heißt: alle Daten folgen ihr',
      correct: 'Viele natürliche Prozesse sind annähernd normal, aber viele sind es auch nicht',
      explanation:
        'Gewichte nach guter Initialisierung, Messfehler, Aktivierungen nach BatchNorm — oft annähernd normal. Einkommen, Loss-Werte, Latenz — oft rechts-schief. Immer ins Histogramm schauen!',
    },
  ],

  furtherResources: [
    {
      title: 'TensorBoard: Histogram Dashboard',
      type: 'article',
      note: 'Zeigt, wie PyTorch-Projekte Gewichts- und Aktivierungshistogramme über Epochen tracken',
    },
    {
      title: 'Khan Academy: "Histograms" (Video)',
      type: 'video',
      note: 'Grundlegende Einführung: Bins, Häufigkeiten und Interpretation — 6 Minuten',
    },
    {
      title: 'Matplotlib Histogram-Dokumentation',
      type: 'article',
      note: 'Alle Parameter von `plt.hist` erklärt mit interaktiven Beispielen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.deskriptive-statistik',
      relation: 'requires',
      hint: 'Mittelwert, Median und Standardabweichung sind die numerischen Beschreibungen dessen, was Histogramme visuell zeigen.',
    },
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'extends',
      hint: 'Histogramme schätzen Wahrscheinlichkeitsdichten empirisch — relative Häufigkeiten approximieren Wahrscheinlichkeiten.',
    },
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'extends',
      hint: 'Phase 1 formalisiert Wahrscheinlichkeitsdichten (PDF) und kumulative Verteilungen (CDF) — das kontinuierliche Pendant zum Histogramm.',
    },
    {
      lessonId: 'p1.kontinuierliche-verteilungen',
      relation: 'see-also',
      hint: 'Normalverteilung und andere kontinuierliche Verteilungen sind die theoretischen Modelle, die Histogramme approximieren.',
    },
  ],

  reflection: 'Du hast gelernt: **Histogramme** sind das erste Werkzeug beim Debugging von ML-Modellen. Bevor du irgendetwas veränderst, plotte die Verteilung deiner Daten, Gewichte und Loss-Werte. Was zeigt dein Modell, wenn du zum ersten Mal ein Gewichts-Histogramm siehst?',
}
