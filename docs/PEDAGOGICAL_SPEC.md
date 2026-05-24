# Pädagogische Spezifikation — MathLab DE Phase O

## Zielgruppe

Senior IT-Sysadmin, Mathe-Niveau Realschule 10. Klasse. Lernziel: ML/Deep Learning
verstehen. Lernt mobil (iPhone), Sessions 20–30 Min. Bevorzugt Deutsche Sprache mit
englischen ML-Fachbegriffen.

**Kernbedürfnis**: Verständnis, nicht Auswendiglernen. „Warum gilt das?" vor „Was gilt."

---

## Die 9 Pflichtbestandteile einer guten Lektion

### 1. Einordnung (Einstieg)

- 1–2 Sätze: Was lernst du, wozu brauchst du das?
- Verbindung zur Vorlektion (Aufbau) und zur Nachfolgenden (Ausblick)
- Konkreter ML-Vorausweis: nicht Schlagwort, sondern 1 Anwendungssatz

**Vorlage**:
> In dieser Lektion lernst du, wie [Konzept] funktioniert und warum es die Grundlage
> für [Folgekonzept] ist. Im ML brauchst du das konkret, wenn [konkreter Anwendungsfall].

### 2. Intuition vor Formalismus

- Anschauliches Bild ZUERST, dann Formel
- Geometrische Bedeutung wenn möglich
- Alltagsanalogie wenn anwendbar
- SVG-Visualisierung wenn sinnvoll (Vektoren, Ableitungen, Verteilungen)

**Testfrage**: Kann der Lerner das Konzept ohne Formeln erklären?

### 3. Schrittweiser Aufbau

- 2–4 Konzept-Schritte pro Lektion, nicht ein dicker Block
- Jeder Schritt: 1 Konzept + 1 Beispiel + 1 Mini-Erkenntnis
- Notation einführen bevor sie genutzt wird
- Komplexität steigern: einfachstes Beispiel zuerst

### 4. Herleitungen statt Behauptungen (`derivations`-Feld)

Jede zentrale Regel hat eine kurze Begründung.

**Format im Schema**:
```ts
derivations: [
  {
    claim: '$a^0 = 1$ gilt für alle $a \\neq 0$',
    reasoning: 'Weil $\\frac{a^n}{a^n} = 1$ und gleichzeitig $\\frac{a^n}{a^n} = a^{n-n} = a^0$.'
  }
]
```

**Pflicht-Herleitungen nach Thema**:

| Thema | Herleitung |
|-------|-----------|
| Potenzen | $a^0 = 1$ (via Kürzen), $a^{1/n} = \sqrt[n]{a}$ (via Potenzierung) |
| Ableitung | Differenzenquotient → Grenzwert |
| Sigmoid | $\sigma'(x) = \sigma(x)(1-\sigma(x))$ via Quotientenregel |
| Matrixmult. | Assoziativität via Komposition linearer Abbildungen |
| Eigenwerte | Warum $\det(A-\lambda I)=0$ (Nicht-Trivialitätsbedingung) |
| MLE | Warum Log-Likelihood = CE-Loss (Monotonie + NLL) |

### 5. Häufige Fehler (`commonMistakes`-Feld)

1–3 typische Fehler explizit benennen.

**Format im Schema**:
```ts
commonMistakes: [
  {
    wrong: '$a^m + a^n = a^{m+n}$',
    correct: '$a^m \\cdot a^n = a^{m+n}$',
    explanation: 'Exponenten addieren sich nur bei **Multiplikation** gleicher Basen, nicht bei Addition.'
  }
]
```

Typische Fehlerquellen:
- Verwechslung Addition/Multiplikation (Potenzgesetze)
- Vorzeichen bei negativen Exponenten
- Transponieren vs. Invertieren
- „$f'(g(x))$" vs. Kettenregel-Vollständigkeit
- Kovarianzmatrix ≠ Korrelationsmatrix

### 6. ML-Brücke vertieft (`deepenBlock`)

Nicht nur Schlagwort. Mindestens:
- Konkrete Situation (welches Modell, welcher Layer, welcher Schritt)
- Warum dieser Mathe-Baustein nötig ist
- Was passiert, wenn man ihn nicht hat
- 3–5 Sätze

**Testfrage**: Kann der Lerner erklären, wo genau im Training dieses Konzept auftaucht?

### 7. Aufgaben (unverändert oder ergänzt)

- Bestehende Aufgaben **niemals löschen** (Progress-Daten!)
- Schwierigkeitsstufen 1–5 prüfen: repräsentieren sie echte Progression?
- Optional: 1–2 Aufgaben ergänzen, die Herleitung/Anti-Patterns testen
- Alle Aufgaben-IDs eindeutig und namespaced halten

### 8. Review-Cards (unverändert oder ergänzt)

- Prüfen: Sind sie präzise, eindeutig prüfbar?
- Optional: 1 Card pro neuer Herleitung ergänzen (Formel + Begründung)
- IDs eindeutig halten

### 9. Weiterführende Quellen (`furtherResources`-Feld)

1–3 hochwertige Quellen, offline-nutzbar als Hinweis.

```ts
furtherResources: [
  {
    title: '3Blue1Brown: Eigenvectors and eigenvalues (Essence of Linear Algebra)',
    type: 'video',
    note: 'Sehr visuell, ideal als Einstieg'
  },
  {
    title: 'Serlo: Potenzgesetze — serlo.org/mathe/potenzgesetze',
    type: 'article'
  }
]
```

---

## Qualitäts-Checkliste pro Lektion

- [ ] Alle 9 Pflichtbestandteile erfüllt
- [ ] Intuition kommt vor Formalismus
- [ ] Mind. 1 Derivation, mind. 1 CommonMistake
- [ ] ML-Bezug: 3–5 Sätze, konkretes Modell/Schritt
- [ ] Aufgaben unberührt oder ergänzt
- [ ] Review-Cards unberührt oder ergänzt
- [ ] TypeScript-Compile sauber
- [ ] Quellen: ≥2 recherchiert, log in `docs/research-log/<id>.md`
- [ ] Mathematisch via Wikipedia gegengeprüft (zwei-Quellen-Regel)
- [ ] ZEIGEN-Block: unter ~1200 Tokens (iPhone-lesbar)
- [ ] Bundle-Size: +25% Soft-Limit

---

## Stil-Guide

- **Sprache**: Deutsch, locker-präzise. Englische ML-Terme (loss, gradient, layer) bleiben.
- **Anrede**: „du" (informell)
- **Formeln**: `$...$` für inline, `$$...$$` für Display. Deutsche Kommas: `0{,}5`
- **Emphatisch**: `**fett**` für Schlüsselbegriffe, `*kursiv*` für Betonung
- **Kein Fülltext**: jeder Satz trägt Information

## Quellen-Hierarchie

| Priorität | Quelle | Einsatz |
|-----------|--------|---------|
| 1 | serlo.org | Phase 0, Realschul-Grundlagen |
| 2 | khanacademy.org | Schritt-für-Schritt-Didaktik |
| 3 | 3blue1brown.com | Geometrische Intuition |
| 4 | mml-book.com | ML-Mathe-Verbindungen |
| 5 | paulsonlinemath.lamar.edu | Calculus-Details |
| 6 | en.wikipedia.org | Mathematische Korrektheit |

Immer zwei-Quellen-Regel: jede neue Behauptung in mind. 2 Quellen verifiziert.

---

## Schema-Referenz (Phase-O-Erweiterung)

```ts
interface Derivation {
  claim: string       // Die zu zeigende Aussage (Markdown+Math)
  reasoning: string   // Schritt-für-Schritt-Begründung (Markdown)
}

interface CommonMistake {
  wrong: string       // Falsche Version (Markdown)
  correct: string     // Richtige Version (Markdown)
  explanation: string // Kurze Erklärung warum (Markdown)
}

interface FurtherResource {
  title: string
  type: 'video' | 'article' | 'exercise' | 'book'
  note?: string
}

// In Lesson (alle optional, rückwärtskompatibel):
description?: string
derivations?: Derivation[]
commonMistakes?: CommonMistake[]
furtherResources?: FurtherResource[]
```

---

## Render-Verhalten

| Feld | Wird angezeigt in | UI-Element |
|------|-------------------|------------|
| `description` | Lesson-Intro-Screen | Unter Meta-Zeile |
| `derivations` | WORKED_EXAMPLE-Phase | `.derivation-card` (indigo border-left) |
| `commonMistakes` | CONCEPT-Phase | `.mistake-card` (rot border-left) |
| `furtherResources` | DEEPEN-Phase | Liste mit Typ-Icon |
