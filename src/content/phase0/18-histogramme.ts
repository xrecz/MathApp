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
}
