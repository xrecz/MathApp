import type { Lesson } from '../../../types'

export const ableitungKonzept: Lesson = {
  id: 'p1.ableitung-konzept',
  title: 'Ableitung als Konzept',
  conceptTags: ['derivative', 'tangent', 'rate-of-change', 'linear-approximation'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Drei Perspektiven auf die Ableitung\n\n**Geometrisch**: Steigung der Tangente an die Kurve im Punkt $x$.\n\n**Physikalisch**: momentane Änderungsrate — Geschwindigkeit ist Ableitung der Position.\n\n**Algebraisch**: beste lineare Approximation der Funktion in der Nähe eines Punkts.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-20 -60 180 130" width="220" height="150" xmlns="http://www.w3.org/2000/svg">
          <line x1="-10" y1="0" x2="170" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-55" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <path d="M 5,55 Q 40,40 80,-10 Q 110,-50 145,-55" fill="none" stroke="#6366f1" stroke-width="2"/>
          <line x1="50" y1="20" x2="110" y2="-40" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="80" cy="-10" r="3" fill="#ef4444"/>
          <line x1="10" y1="52" x2="80" y2="-10" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="25" x2="80" y2="-10" stroke="#10b981" stroke-width="1" stroke-dasharray="3"/>
          <text x="115" y="-42" fill="#6366f1" font-size="9">f(x)</text>
          <text x="112" y="-28" fill="#ef4444" font-size="9">Tangente</text>
          <text x="8" y="60" fill="#f59e0b" font-size="8">Sekante (h groß)</text>
          <text x="42" y="33" fill="#10b981" font-size="8">Sekante (h klein)</text>
        </svg>`,
        caption: 'Sekante → Tangente wenn h → 0: die Ableitung als Grenzwert',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gradient Descent funktioniert, weil die Ableitung die Richtung lokal größter Änderung angibt — wir gehen in die Gegenrichtung bergab.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Differenzenquotient → Ableitung\n\n$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$\n\nDer Differenzenquotient $\\frac{f(x+h)-f(x)}{h}$ ist die Steigung der Sekante. Im Grenzwert $h \\to 0$ wird sie zur Tangente.\n\n### Tangentengleichung\n\nDie Tangente an $f$ im Punkt $a$:\n\n$y = f(a) + f\'(a)(x - a)$\n\nDas ist die **lineare Approximation** — in der Nähe von $a$ verhält sich $f$ wie eine Gerade.',
      },
      {
        kind: 'worked-example',
        content:
          '**Ableitung von $f(x) = x^2$ via Differenzenquotient**:\n\n$\\frac{f(x+h) - f(x)}{h} = \\frac{(x+h)^2 - x^2}{h} = \\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h$\n\nGrenzwert $h \\to 0$: $f\'(x) = 2x$.\n\nBei $x = 3$: $f\'(3) = 6$ — die Tangente hat Steigung $6$.',
      },
    ],
    practice: [
      {
        id: 'p1.deriv.ex1',
        difficulty: 1,
        conceptTags: ['derivative'],
        type: 'numeric',
        prompt: '$f(x) = x^2$. Was ist $f\'(3)$?',
        answer: 6,
        hints: [
          '$f\'(x) = 2x$ (Potenzregel).',
          '$f\'(3) = 2 \\cdot 3 = ?$',
          '$= 6$.',
        ],
        explanation: '$f\'(x) = 2x$, also $f\'(3) = 6$. Die Tangente an die Parabel bei $x=3$ hat Steigung 6.',
      },
      {
        id: 'p1.deriv.ex2',
        difficulty: 2,
        conceptTags: ['rate-of-change'],
        type: 'numeric',
        prompt: '$f(x) = 3x$. Die Ableitung ist konstant. Welcher Wert?',
        answer: 3,
        hints: [
          'Eine lineare Funktion hat konstante Steigung.',
          'Differenzenquotient: $\\frac{3(x+h) - 3x}{h} = \\frac{3h}{h} = 3$.',
          '$f\'(x) = 3$ für alle $x$.',
        ],
        explanation: '$f(x) = 3x$ ist eine Gerade mit Steigung 3 — also $f\'(x) = 3$ überall.',
      },
      {
        id: 'p1.deriv.ex3',
        difficulty: 2,
        conceptTags: ['tangent'],
        type: 'mc',
        prompt: 'Was beschreibt die Ableitung $f\'(a)$ geometrisch?',
        options: [
          'Die Steigung der Tangente an den Graphen von $f$ im Punkt $(a, f(a))$',
          'Die Fläche unter dem Graphen bis $x = a$',
          'Den Funktionswert $f(a)$',
          'Den Abstand des Graphen von der $x$-Achse',
        ],
        answer: 'Die Steigung der Tangente an den Graphen von $f$ im Punkt $(a, f(a))$',
        hints: [
          'Ableitung = Grenzwert des Differenzenquotienten = Steigung der Sekante im Grenzfall.',
          'Die Sekante wird zur Tangente wenn $h \\to 0$.',
          'Steigung der Tangente!',
        ],
        explanation: '$f\'(a)$ ist die Steigung der Tangente im Punkt $(a, f(a))$. Das ist die geometrische Bedeutung der Ableitung.',
      },
      {
        id: 'p1.deriv.ex4',
        difficulty: 3,
        conceptTags: ['linear-approximation'],
        type: 'numeric',
        prompt:
          'Lineare Approximation von $f(x) = x^2$ bei $a = 1$: $f(x) \\approx f(1) + f\'(1)(x-1) = ? + 2(x-1)$. Was steht für $?$?',
        answer: 1,
        hints: [
          'Tangentengleichung: $y = f(a) + f\'(a)(x-a)$.',
          '$f(1) = 1^2 = 1$.',
          'Also: $f(x) \\approx 1 + 2(x-1)$. Der erste Term ist $1$.',
        ],
        explanation: '$f(1) = 1$, $f\'(1) = 2$. Tangentengleichung: $y = 1 + 2(x-1)$. Bei $x = 1{,}1$: $y \\approx 1{,}2$ (exakt: $1{,}21$).',
      },
      {
        id: 'p1.deriv.ex5',
        difficulty: 3,
        conceptTags: ['derivative', 'rate-of-change'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Loss $L(w) = (w-2)^2$, Ableitung $L\'(w) = 2(w-2)$. Bei $w = 5$: $L\'(5) = ?$',
        answer: 6,
        hints: [
          '$L\'(w) = 2(w-2)$.',
          '$L\'(5) = 2(5-2) = 2 \\cdot 3$.',
          '$= 6$. Positiv → Loss steigt nach rechts → Gradient Descent bewegt $w$ nach links.',
        ],
        explanation: '$L\'(5) = 2(5-2) = 6 > 0$. Gradient Descent: $w \\leftarrow 5 - \\eta \\cdot 6$ — $w$ wird kleiner, bewegt sich zum Minimum bei $w=2$.',
      },
      {
        id: 'p1.deriv.ex6',
        difficulty: 4,
        conceptTags: ['derivative', 'rate-of-change'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: $f\'(x) > 0$ an einem Punkt. Gradient Descent führt den nächsten Schritt aus. Bewegt sich $x$ nach links oder rechts?',
        options: [
          'Nach links — entgegen dem positiven Gradienten bergab',
          'Nach rechts — in Richtung des positiven Gradienten bergauf',
          'Bleibt stehen — $f\'(x) > 0$ bedeutet Minimum',
          'Hängt von der Lernrate ab',
        ],
        answer: 'Nach links — entgegen dem positiven Gradienten bergab',
        hints: [
          'Gradient Descent: $x \\leftarrow x - \\eta f\'(x)$.',
          '$f\'(x) > 0$: wir ziehen einen positiven Wert ab.',
          '$x$ wird kleiner → nach links.',
        ],
        explanation:
          'Update: $x \\leftarrow x - \\eta f\'(x)$. Für $f\'(x) > 0$: $x$ wird um $\\eta \\cdot f\'(x) > 0$ reduziert — Bewegung nach links, bergab.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gradient Descent und die Ableitung\n\nGradient Descent ist die einfachste Anwendung der Ableitung in ML:\n\n$w \\leftarrow w - \\eta f\'(w)$\n\nWenn $f\'(w) > 0$: $f$ steigt nach rechts → Schritt nach links (bergab).\nWenn $f\'(w) < 0$: $f$ fällt nach rechts → Schritt nach rechts (bergab).\nWenn $f\'(w) = 0$: stationärer Punkt — möglicherweise Minimum.\n\nDie Lernrate $\\eta$ kontrolliert, wie groß der Schritt ist. Zu groß → überschießt. Zu klein → konvergiert langsam.',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Calculus" Folge 2 zeigt die drei Perspektiven (Steigung, Änderungsrate, lineare Approximation) sehr klar und mit herausragenden Visualisierungen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.deriv.card1',
      front: 'Differenzenquotient?',
      back: '$\\frac{f(x+h) - f(x)}{h}$, Grenzwert $h \\to 0$ ergibt $f\'(x)$.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p1.deriv.card2',
      front: 'Drei Perspektiven der Ableitung?',
      back: 'Tangenten-Steigung, momentane Änderungsrate, beste lineare Approximation.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p1.deriv.card3',
      front: 'Tangentengleichung an $f$ in $a$?',
      back: '$y = f(a) + f\'(a)(x - a)$.',
      conceptTags: ['linear-approximation'],
    },
  ],

  learningOutcome:
    'Du verstehst die Ableitung aus drei Perspektiven (Tangenten-Steigung, Änderungsrate, lineare Approximation), kannst den Differenzenquotienten aufstellen und im Grenzwert auswerten, und erkennst wie Gradient Descent die Ableitung nutzt um Loss-Funktionen zu minimieren.',

  description:
    'Die Ableitung ist das zentrale Konzept der Differentialrechnung und das Fundament von Backpropagation. Geometrisch ist sie die Steigung der Tangente, physikalisch die momentane Änderungsrate, algebraisch die beste lineare Approximation. Alle drei Perspektiven sind in ML präsent: Gradient Descent (Tangente am Loss-Gebirge), SGD-Update (Änderungsrate), Taylor-Approximation (lineare Näherung für Newton-Verfahren).',

  conceptSteps: [
    {
      title: 'Geometrische Perspektive: Sekante wird zur Tangente',
      body: 'Zeichne eine Sekante durch $(a, f(a))$ und $(a+h, f(a+h))$. Ihre Steigung ist der Differenzenquotient $\\frac{f(a+h)-f(a)}{h}$. Wenn $h \\to 0$, nähert sich die Sekante der Tangente. Die Ableitung $f\'(a) = \\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}$ ist die Steigung dieser Tangente.',
      preprompt: 'Was ist eine Sekante, und wie unterscheidet sie sich von einer Tangente?',
      miniExample:
        '$f(x) = x^2$ bei $a = 2$: Sekante für $h=1$: $(f(3)-f(2))/1 = (9-4)/1 = 5$. Für $h=0{,}1$: $(f(2{,}1)-f(2))/0{,}1 = 0{,}41/0{,}1 = 4{,}1$. Für $h \\to 0$: $f\'(2) = 4$.',
      selfCheck: 'Warum kann man die Steigung der Tangente nicht direkt als "Steigung durch zwei identische Punkte" berechnen?',
    },
    {
      title: 'Physikalische Perspektive: momentane Änderungsrate',
      body: 'Wenn $s(t)$ die Position beschreibt, ist $\\frac{s(t+h)-s(t)}{h}$ die Durchschnittsgeschwindigkeit im Interval $[t, t+h]$. Im Grenzwert $h \\to 0$ ergibt sich die momentane Geschwindigkeit $v(t) = s\'(t)$. Allgemein: $f\'(a)$ ist die Änderungsrate von $f$ bei $a$. In ML: der Gradient des Loss bezüglich eines Gewichts gibt an, wie stark der Loss sich ändert wenn das Gewicht leicht verändert wird.',
      preprompt: 'Was ist der Unterschied zwischen Durchschnittsgeschwindigkeit und Momentangeschwindigkeit?',
      miniExample:
        'Loss-Funktion $L(w) = (w - 3)^2$: $L\'(w) = 2(w-3)$. Bei $w = 5$: $L\'(5) = 4$. Das heißt: wenn $w$ um $0{,}01$ steigt, steigt der Loss um $\\approx 0{,}04$. Gradient Descent nutzt genau diese Information.',
      selfCheck: 'Was bedeutet $L\'(w) = 0$ für den Gradient Descent?',
    },
    {
      title: 'Algebraische Perspektive: beste lineare Approximation',
      body: 'Die Tangentengleichung $y = f(a) + f\'(a)(x-a)$ ist die beste Gerade, die $f$ in der Nähe von $a$ approximiert. "Beste" bedeutet: der Fehler $f(x) - [f(a) + f\'(a)(x-a)]$ geht schneller gegen $0$ als $|x-a|$ selbst. Diese lineare Approximation ist das Fundament von Taylor-Reihen und Newton-Optimierung.',
      preprompt: 'Warum approximiert man eine Funktion durch eine Gerade?',
      miniExample:
        '$\\sqrt{1{,}01} \\approx ?$ Mit Linearisierung: $f(x) = \\sqrt{x}$, $f\'(x) = 1/(2\\sqrt{x})$. Bei $a=1$: $f\'(1) = 0{,}5$. Also $\\sqrt{1{,}01} \\approx 1 + 0{,}5 \\cdot 0{,}01 = 1{,}005$. Exakt: $1{,}00499...$. Fehler $< 10^{-5}$.',
      selfCheck: 'Warum wird die lineare Approximation schlechter, je weiter man von $a$ entfernt ist?',
    },
    {
      title: 'Differenzenquotient: der Weg zur Ableitung',
      body: 'Die Ableitung wird formal als Grenzwert definiert:\n$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$\nUm Ableitungen zu berechnen, benutzen wir Ableitungsregeln (Potenzregel, Produktregel, Kettenregel) — nicht jedes Mal den Grenzwert von Hand. Aber zu verstehen, **dass** die Ableitung ein Grenzwert ist, ist der Schlüssel zu Autograd.',
      preprompt: 'Wie berechnet man $\\lim_{h\\to 0} \\frac{(x+h)^2 - x^2}{h}$?',
      miniExample:
        'Numerische Ableitung (finite differences): $f\'(x) \\approx \\frac{f(x + \\varepsilon) - f(x)}{\\varepsilon}$ für kleines $\\varepsilon$. In PyTorch: stattdessen Autograd — exakte Ableitung via Computational Graph, kein numerischer Fehler.',
      selfCheck: 'Was ist der Unterschied zwischen numerischer und symbolischer Ableitung?',
    },
    {
      title: 'Gradient Descent: die Ableitung in Aktion',
      body: 'Gradient Descent nutzt die Ableitung um Loss-Funktionen zu minimieren: $w \\leftarrow w - \\eta \\cdot f\'(w)$. Intuition: die Ableitung zeigt die Richtung, in der $f$ steigt. Wir gehen in die entgegengesetzte Richtung (bergab). Die Lernrate $\\eta$ kontrolliert die Schrittgröße. Konvergenz: wenn $\\eta$ klein genug ist und $f$ konvex ist, konvergiert GD zum globalen Minimum. Für nicht-konvexe Funktionen (neuronale Netze): Konvergenz zu einem lokalen Minimum.',
      preprompt: 'Warum geht man in die entgegengesetzte Richtung des Gradienten?',
      miniExample:
        'Loss-Landschaft: $L(w) = w^2 - 4w + 5 = (w-2)^2 + 1$. Minimum bei $w^* = 2$. Gradient: $L\'(w) = 2w - 4$. GD-Update mit $\\eta = 0{,}1$, Start $w_0 = 5$: $w_1 = 5 - 0{,}1 \\cdot 6 = 4{,}4$, $w_2 = 4{,}4 - 0{,}1 \\cdot 4{,}8 = 3{,}92$, ... → konvergiert zu $2$.',
      selfCheck: 'Was passiert, wenn $\\eta$ zu groß ist? Skizziere die Trajektorie.',
    },
    {
      title: 'Autograd: automatisches Differenzieren in PyTorch',
      body: 'PyTorch berechnet Ableitungen automatisch mit Computational Graphs. Jede Operation (`+`, `*`, `@`, `sin`, ...) auf Tensoren mit `requires_grad=True` wird im Graph gespeichert. `loss.backward()` traversiert den Graph rückwärts und berechnet alle Gradienten via Kettenregel. Das nennt sich "Reverse-Mode Automatic Differentiation" — exakt, kein numerischer Fehler.',
      preprompt: 'Wie kann ein Computer automatisch differenzieren, ohne symbolische Algebra zu kennen?',
      miniExample:
        '```python\nx = torch.tensor(3.0, requires_grad=True)\nL = x**2        # L = x^2\nL.backward()    # dL/dx = 2x\nprint(x.grad)   # tensor(6.) — exakt!\n```',
      selfCheck: 'Warum gibt `x.grad` nach `backward()` den exakten Wert, nicht einen numerischen Näherungswert?',
    },
  ],

  codeBridges: [
    {
      title: 'Differenzenquotient, numerische vs. automatische Differentiation',
      lang: 'python',
      code: `import torch
import numpy as np

# === Numerische Ableitung (Finite Differences) ===
def f(x):
    return x**2 - 3*x + 2

def numerische_ableitung(f, x, h=1e-5):
    """f'(x) ≈ (f(x+h) - f(x)) / h"""
    return (f(x + h) - f(x)) / h

x = 2.0
print(f"f(x) = x^2 - 3x + 2, f'(x) = 2x - 3")
print(f"Analytisch: f'({x}) = {2*x - 3}")

for h in [0.1, 0.01, 0.001, 0.0001, 1e-8, 1e-15]:
    approx = numerische_ableitung(f, x, h)
    fehler = abs(approx - (2*x - 3))
    print(f"h={h:.0e}: f'≈{approx:.8f}, Fehler={fehler:.2e}")
# Zu kleines h: Rundungsfehler in Float! Optimum ~1e-7

# === Automatische Differentiation mit PyTorch ===
x_torch = torch.tensor(2.0, requires_grad=True)
L = x_torch**2 - 3*x_torch + 2  # L = x^2 - 3x + 2
L.backward()  # dL/dx = 2x - 3
print(f"\\nAutograd: f'({x}) = {x_torch.grad.item()}")  # Exakt: 1.0

# Gradient Descent auf L(w) = (w - 2)^2 + 1
# Minimum bei w* = 2, L(w*) = 1
print("\\nGradient Descent Demo:")
w = torch.tensor(5.0, requires_grad=True)
eta = 0.1  # Lernrate

for t in range(15):
    # Forward Pass
    loss = (w - 2)**2 + 1

    # Backward Pass
    loss.backward()

    # Update (außerhalb des Graphs)
    with torch.no_grad():
        w -= eta * w.grad
        w.grad.zero_()  # Gradienten zurücksetzen!

    if t % 3 == 0:
        print(f"  t={t:2d}: w={w.item():.4f}, L={loss.item():.6f}")`,
      annotation:
        'Numerische Differentiation leidet unter Floating-Point-Rundungsfehlern für sehr kleine $h$. Autograd ist exakt, weil es die Kettenregel symbolisch auf den Computational Graph anwendet. `w.grad.zero_()` ist wichtig — sonst akkumulieren sich Gradienten über Steps.',
    },
  ],

  derivations: [
    {
      claim: 'Potenzregel: $(x^n)\' = nx^{n-1}$',
      reasoning: 'Via Differenzenquotient: $(x+h)^n = x^n + nx^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\dots + h^n$ (Binomialtheorem). Der Differenzenquotient ergibt $\\frac{(x+h)^n - x^n}{h} = nx^{n-1} + \\binom{n}{2}x^{n-2}h + \\dots + h^{n-1}$. Im Grenzwert $h \\to 0$ verschwinden alle Terme mit $h$, und es bleibt $(x^n)\' = nx^{n-1}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Ableitung $f\'(a)$ und Differenzenquotient $\\frac{f(b)-f(a)}{b-a}$ sind dasselbe.',
      correct: 'Der Differenzenquotient ist die Sekantensteigung (Durchschnitt über $[a,b]$). Die Ableitung ist der Grenzwert $\\lim_{b \\to a} \\frac{f(b)-f(a)}{b-a}$ — Tangente, nicht Sekante.',
      explanation: 'Den Unterschied verstehen ist zentral: Gradient Descent nutzt die exakte Tangente (via Autograd), nicht Sekanten-Näherungen.',
    },
    {
      wrong: '`w.grad` akkumuliert sich automatisch und zeigt nach jedem Step den richtigen Gradienten.',
      correct: 'Nach jedem `backward()` addiert PyTorch den Gradienten zu `w.grad`. Ohne `zero_grad()` / `w.grad.zero_()` summiert sich der Gradient über mehrere Steps auf.',
      explanation: 'Das akkumulierende Verhalten ist eigentlich nützlich (z.B. für Gradient Accumulation in großen Batches), aber ohne `zero_grad()` im Standard-Training-Loop ein häufiger Bug.',
    },
    {
      wrong: 'Numerische Differentiation (finite differences) ist genauso präzise wie Autograd.',
      correct: 'Finite differences leiden unter Rundungsfehlern: zu großes $h$ → Approximationsfehler; zu kleines $h$ → Float-Auslöschung. Autograd ist exakt (bis auf Float-Arithmetik der Grundoperationen).',
      explanation: 'In der Praxis: finite differences zum Gradient-Checking (Sanity-Check), Autograd für Training. `torch.autograd.gradcheck()` vergleicht beide.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: Essence of Calculus — Derivatives',
      type: 'video',
      note: 'Folge 2 der Serie: drei Perspektiven auf Ableitungen mit herausragenden Animationen — geometrisch, physikalisch, algebraisch.',
    },
    {
      title: 'PyTorch Autograd Tutorial (offiziell)',
      type: 'article',
      note: 'Offizielle Einführung in automatisches Differenzieren mit PyTorch: Computational Graphs, backward(), grad_fn.',
    },
    {
      title: 'Karpathy: "micrograd"',
      type: 'exercise',
      note: 'Minimale Autograd-Engine in ~100 Zeilen Python — implementiere selbst wie Computational Graphs und Backprop funktionieren.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.grenzwerte', relation: 'requires', hint: 'Die Ableitung ist als Grenzwert des Differenzenquotienten definiert.' },
    { lessonId: 'p1.ableitungsregeln', relation: 'extends', hint: 'Ableitungsregeln ersparen den Grenzwert-Beweis für jede Funktion.' },
    { lessonId: 'p1.ml-ableitungen', relation: 'extends', hint: 'Anwendung: Forward/Backward Pass durch die Ableitung verstehen.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'see-also', hint: 'Backpropagation verallgemeinert die Ableitung auf mehrere Variablen.' },
  ],

  reflection: 'Autograd und numerische Differentiation berechnen beide Ableitungen — aber unterschiedlich. Warum ist Autograd für Training neuronaler Netze besser als finite Differences? Und in welchen Fällen könnte numerische Differentiation trotzdem nützlich sein?',
}
