import type { Lesson } from '../../types'

export const termumformungen: Lesson = {
  id: 'p0.termumformungen',
  title: 'Termumformungen & Binomische Formeln',
  conceptTags: ['algebra', 'binomial', 'simplification'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Termumformungen\n\nMit dem **Distributivgesetz** lassen sich Klammern auflösen und Terme vereinfachen. Die **binomischen Formeln** sind spezielle Kurzformeln für häufig auftretende Produkte.',
      },
      {
        kind: 'math',
        content:
          '$$(a+b)^2 = a^2 + 2ab + b^2 \\qquad (a-b)^2 = a^2 - 2ab + b^2 \\qquad (a+b)(a-b) = a^2 - b^2$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der MSE-Loss $(\\hat{y} - y)^2$ entwickelt sich zu $\\hat{y}^2 - 2\\hat{y}y + y^2$ — direkte Anwendung der 2. binomischen Formel. Beim Ableiten nach $\\hat{y}$ entsteht $2(\\hat{y} - y)$ — das ist der Gradient im Backpropagation-Schritt.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Distributivgesetz\n\nJeder Term in der Klammer wird mit dem Faktor davor multipliziert:',
      },
      {
        kind: 'math',
        content: '$$a(b + c) = ab + ac$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $2(x+3) = 2x + 6$\n\n**Beispiel 2**: $(a+b)^2 = (a+b)(a+b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$\n\n**Beispiel 3**: $(x+3)(x-3) = x^2 - 3^2 = x^2 - 9$ (3. binomische Formel)',
      },
    ],
    practice: [
      {
        id: 'p0.term.ex1',
        difficulty: 1,
        conceptTags: ['algebra'],
        type: 'mc',
        prompt: 'Was ergibt $2(x + 3)$?',
        options: ['$2x + 3$', '$2x + 6$', '$2x + 5$', '$x + 6$'],
        answer: '$2x + 6$',
        hints: [
          'Multipliziere den Faktor 2 mit jedem Term in der Klammer.',
          '$2 \\cdot x = 2x$ und $2 \\cdot 3 = ?$',
          '$2 \\cdot 3 = 6$, also $2x + 6$.',
        ],
        explanation: '$2(x+3) = 2 \\cdot x + 2 \\cdot 3 = 2x + 6$.',
        misconceptions: {
          '$2x + 3$': 'Die 3 muss auch mit 2 multipliziert werden: $2 \\cdot 3 = 6$.',
        },
      },
      {
        id: 'p0.term.ex2',
        difficulty: 2,
        conceptTags: ['binomial'],
        type: 'numeric',
        prompt:
          'Berechne $(5+2)^2$ mit der 1. binomischen Formel: $a^2 + 2ab + b^2$ mit $a=5$, $b=2$.',
        answer: 49,
        hints: [
          '$5^2 + 2 \\cdot 5 \\cdot 2 + 2^2$',
          '$25 + 20 + 4 = ?$',
          '$25 + 20 + 4 = 49$. Probe: $7^2 = 49$. ✓',
        ],
        explanation:
          '$(5+2)^2 = 5^2 + 2 \\cdot 5 \\cdot 2 + 2^2 = 25 + 20 + 4 = 49$. Direktes Nachrechnen: $7^2 = 49$.',
      },
      {
        id: 'p0.term.ex3',
        difficulty: 2,
        conceptTags: ['binomial'],
        type: 'mc',
        prompt: '$(a+b)^2 = ?$',
        options: ['$a^2 + b^2$', '$a^2 + 2ab + b^2$', '$a^2 - 2ab + b^2$', '$a^2 + ab + b^2$'],
        answer: '$a^2 + 2ab + b^2$',
        hints: [
          'Das ist die 1. binomische Formel.',
          'Ausmultiplizieren: $(a+b)(a+b) = a^2 + ab + ba + b^2$',
          '$ab + ba = 2ab$, also $a^2 + 2ab + b^2$.',
        ],
        explanation: '$(a+b)^2 = a^2 + 2ab + b^2$ (1. binomische Formel).',
        misconceptions: {
          '$a^2 + b^2$': 'Das mittlere Glied $2ab$ fehlt! $(a+b)^2 \\neq a^2 + b^2$.',
          '$a^2 - 2ab + b^2$': 'Das ist die 2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$.',
        },
      },
      {
        id: 'p0.term.ex4',
        difficulty: 3,
        conceptTags: ['binomial', 'simplification'],
        type: 'mc',
        prompt: 'Vereinfache $(x+3)(x-3)$.',
        options: ['$x^2 - 9$', '$x^2 + 9$', '$x^2 - 6x + 9$', '$x^2 + 6x - 9$'],
        answer: '$x^2 - 9$',
        hints: [
          'Das ist die 3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$.',
          'Hier: $a = x$, $b = 3$.',
          '$(x+3)(x-3) = x^2 - 3^2 = x^2 - 9$.',
        ],
        explanation: '3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$. Mit $a=x$, $b=3$: $x^2 - 9$.',
        misconceptions: {
          '$x^2 - 6x + 9$': 'Das wäre $(x-3)^2$. Hier stehen Plus UND Minus — das ist die 3. Formel.',
        },
      },
      {
        id: 'p0.term.ex5',
        difficulty: 3,
        conceptTags: ['binomial', 'ml'],
        type: 'mc',
        prompt: 'Entwickle $(\\hat{y} - y)^2$ (MSE-Loss-Term).',
        options: [
          '$\\hat{y}^2 - 2\\hat{y}y + y^2$',
          '$\\hat{y}^2 - y^2$',
          '$\\hat{y}^2 + y^2$',
          '$2\\hat{y} - 2y$',
        ],
        answer: '$\\hat{y}^2 - 2\\hat{y}y + y^2$',
        hints: [
          'Das ist die 2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$.',
          'Hier: $a = \\hat{y}$, $b = y$.',
          '$(\\hat{y} - y)^2 = \\hat{y}^2 - 2\\hat{y}y + y^2$.',
        ],
        explanation:
          '2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$. Mit $a=\\hat{y}$, $b=y$: $\\hat{y}^2 - 2\\hat{y}y + y^2$.',
      },
      {
        id: 'p0.term.ex6',
        difficulty: 4,
        conceptTags: ['binomial', 'factoring'],
        type: 'symbolic',
        prompt: 'Faktorisiere $a^2 - 25$ mithilfe der 3. binomischen Formel.',
        answer: '(a+5)(a-5)',
        acceptedAlternatives: ['(a-5)(a+5)', '(a+5)*(a-5)', '(a-5)*(a+5)'],
        hints: [
          '$25 = 5^2$, also $a^2 - 25 = a^2 - 5^2$.',
          '3. binomische Formel rückwärts: $a^2 - b^2 = (a+b)(a-b)$.',
          '$(a+5)(a-5)$.',
        ],
        explanation:
          '$a^2 - 25 = a^2 - 5^2 = (a+5)(a-5)$ — 3. binomische Formel als Faktorisierung.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## MSE und Backpropagation\n\nDer MSE-Loss (Mean Squared Error) ist $L = (\\hat{y} - y)^2$. Beim Training eines neuronalen Netzes berechnet Backpropagation die Ableitung nach $\\hat{y}$:',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{\\partial L}{\\partial \\hat{y}} = \\frac{\\partial}{\\partial \\hat{y}}(\\hat{y} - y)^2 = 2(\\hat{y} - y)$$',
      },
      {
        kind: 'callout',
        content:
          'Das Ergebnis $2(\\hat{y} - y)$ ist direkt aus der 2. binomischen Formel. Jedes Mal, wenn ein neuronales Netz trainiert wird und dabei MSE nutzt, steckt dieser Term im Update-Schritt: $w \\leftarrow w - \\eta \\cdot 2(\\hat{y} - y)$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.term.card1',
      front: '1. binomische Formel?',
      back: '$(a+b)^2 = a^2 + 2ab + b^2$',
      conceptTags: ['binomial'],
    },
    {
      id: 'p0.term.card2',
      front: '3. binomische Formel?',
      back: '$(a+b)(a-b) = a^2 - b^2$',
      conceptTags: ['binomial'],
    },
    {
      id: 'p0.term.card3',
      front: 'MSE-Loss-Formel (eine Stichprobe)?',
      back: '$L = (\\hat{y} - y)^2$',
      conceptTags: ['ml'],
    },
  ],

  learningOutcome:
    'Du kannst Terme ausmultiplizieren, ausklammern und die drei binomischen Formeln anwenden — und erkennst, wie diese Umformungen direkt im MSE-Loss und im Gradienten von Backpropagation auftauchen.',

  description:
    'Termumformungen sind das algebraische Handwerk des ML: Der MSE-Loss $(\\hat{y} - y)^2$ ist die zweite binomische Formel, sein Gradient $2(\\hat{y} - y)$ entsteht durch Ausklammern. Regularisierungsterme wie $\\lambda \\|w\\|^2 = \\lambda(w_1^2 + w_2^2 + \\ldots)$ werden durch Ausmultiplizieren vereinfacht.',

  conceptSteps: [
    {
      title: 'Was sind Terme und warum umformen?',
      preprompt: 'Gegeben: $3(x + 2) + x(x + 2)$. Kannst du das vereinfachen, ohne $x$ zu kennen? Was hilft dabei?',
      body: 'Ein **Term** ist ein mathematischer Ausdruck aus Zahlen, Variablen und Operationen. **Termumformungen** ändern die Form, nicht den Wert:\n\n- **Ausmultiplizieren**: Klammern auflösen\n- **Ausklammern**: Gemeinsamen Faktor herausziehen\n- **Binomische Formeln**: Kurzformeln für häufige Muster\n\nZiel: Terme vereinfachen, Gleichungen lösen, Ableitungen berechnen.',
      miniExample: '$3x + 6 = 3(x + 2)$ — ausklammern macht den gemeinsamen Faktor sichtbar.',
      selfCheck: 'Ist $2(x+3) = 2x + 6$ oder $2x + 3$? ($2x + 6$ — beide Terme werden multipliziert.)',
    },
    {
      title: 'Ausmultiplizieren mit dem Distributivgesetz',
      body: 'Das **Distributivgesetz** ist die Grundregel:\n\n$$a(b + c) = ab + ac$$\n\nBei zwei Klammern: **FOIL** (First, Outer, Inner, Last):\n\n$$(a + b)(c + d) = ac + ad + bc + bd$$\n\nJeder Term in der ersten Klammer wird mit jedem Term in der zweiten multipliziert.',
      miniExample: '$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$',
      selfCheck: 'Was ergibt $(x + 1)(x - 1)$? ($x^2 - x + x - 1 = x^2 - 1$ — Achtung: dritte binomische Formel!)',
    },
    {
      title: 'Ausklammern: Faktorisierung',
      body: '**Ausklammern** ist das Umgekehrte des Ausmultiplizierens. Man sucht den **größten gemeinsamen Faktor** aller Terme:\n\n$$ab + ac = a(b + c)$$\n\nMehrstufig:\n$$6x^2 + 9x = 3x(2x + 3)$$\n\nNützlich: Gemeinsamen Faktor $(x - a)$ erkennen, um Gleichungen zu lösen.',
      miniExample: '$x^2 - 4x = x(x - 4) = 0 \\Rightarrow x = 0$ oder $x = 4$',
      selfCheck: 'Wie lautet $4a^2b + 6ab^2$ ausgeklammert? ($2ab(2a + 3b)$ — ggT = $2ab$.)',
    },
    {
      title: 'Die drei binomischen Formeln',
      body: 'Die drei **binomischen Formeln** sind Kurzformeln für häufige Produkte:\n\n$$\\boxed{(a+b)^2 = a^2 + 2ab + b^2}$$\n$$\\boxed{(a-b)^2 = a^2 - 2ab + b^2}$$\n$$\\boxed{(a+b)(a-b) = a^2 - b^2}$$\n\nDie erste zwei haben ein **mittleres Glied** $\\pm 2ab$ — das wird am häufigsten vergessen!',
      miniExample: '$(3 + x)^2 = 9 + 6x + x^2$ \\quad$(5-2)^2 = 25 - 20 + 4 = 9$. Probe: $3^2 = 9$ ✓',
      selfCheck: 'Warum ist $(a+b)^2 \\neq a^2 + b^2$? (Beim Ausmultiplizieren entsteht das mittlere Glied $2ab$, das nicht wegfällt.)',
    },
    {
      title: 'ML-Anwendung: Loss-Funktionen und Gradienten',
      body: 'Der **MSE-Loss** $(\\hat{y} - y)^2$ ist die zweite binomische Formel:\n\n$$(\\hat{y} - y)^2 = \\hat{y}^2 - 2\\hat{y}y + y^2$$\n\nSein **Gradient** (Ableitung nach $\\hat{y}$) durch Ausklammern:\n\n$$\\frac{\\partial}{\\partial \\hat{y}}(\\hat{y}^2 - 2\\hat{y}y + y^2) = 2\\hat{y} - 2y = 2(\\hat{y} - y)$$\n\n**L2-Regularisierung** $\\lambda \\|w\\|^2 = \\lambda(w_1^2 + \\cdots + w_n^2)$ — Ausmultiplizieren macht die Struktur sichtbar. Der Gradient: $2\\lambda w_i$ für jedes Gewicht.',
      miniExample: 'Gradient von $L = (\\hat{y} - y)^2$ bei $\\hat{y} = 5$, $y = 3$: $2(5-3) = 4$. Schritt: $\\hat{y} \\leftarrow 5 - \\eta \\cdot 4$.',
    },
  ],

  codeBridges: [
    {
      title: 'Python: Binomische Formel und MSE-Gradient',
      lang: 'python',
      code: `import torch

# 2. Binomische Formel: (a - b)^2 = a^2 - 2ab + b^2
a, b = 5.0, 3.0
formel_links  = (a - b) ** 2                   # = 4.0
formel_rechts = a**2 - 2*a*b + b**2            # = 4.0
print(formel_links == formel_rechts)            # True ✓

# MSE-Loss = (y_hat - y)^2
y_hat = torch.tensor(5.0, requires_grad=True)
y     = torch.tensor(3.0)

L = (y_hat - y) ** 2  # = (5-3)^2 = 4.0
L.backward()          # Ableitung: d/dy_hat (y_hat - y)^2 = 2*(y_hat - y)
print(y_hat.grad)     # → tensor(4.)  = 2*(5-3) = 4  ✓

# Ausklammern: 2*(y_hat - y) ist der MSE-Gradient
gradient = 2 * (y_hat.item() - y.item())
print(gradient)       # 4.0 — identisch mit automatischer Berechnung`,
      annotation: '`(y_hat - y) ** 2` wendet buchstäblich $(a-b)^2$ an. `L.backward()` liefert $\\frac{\\partial}{\\partial \\hat{y}}(\\hat{y}-y)^2 = 2(\\hat{y}-y)$ — das Ergebnis des Ausmultiplizierens und anschließenden Ableitens. Das Ausklammern $2(\\hat{y}-y)$ spart in riesigen Netzen teure Re-Berechnungen.',
    },
  ],

  derivations: [
    {
      claim: 'Der MSE-Gradient ist $2(\\hat{y} - y)$',
      reasoning:
        'Entwickle $(\\hat{y} - y)^2$ mit der zweiten binomischen Formel: $\\hat{y}^2 - 2\\hat{y}y + y^2$. Leite nach $\\hat{y}$ ab (Summenregel + Potenzregel): $2\\hat{y} - 2y + 0 = 2(\\hat{y} - y)$. Das Ausklammern zeigt direkt, dass der Gradient proportional zum Vorhersagefehler $\\hat{y} - y$ ist.',
    },
    {
      claim: 'Erste binomische Formel aus dem Distributivgesetz',
      reasoning:
        '$(a+b)^2 = (a+b)(a+b)$. Mit FOIL: $a \\cdot a + a \\cdot b + b \\cdot a + b \\cdot b = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$. Das mittlere Glied $2ab$ entsteht weil $a \\cdot b$ und $b \\cdot a$ zusammengefasst werden.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$(a + b)^2 = a^2 + b^2$',
      correct: '$(a + b)^2 = a^2 + 2ab + b^2$',
      explanation:
        'Das mittlere Glied $2ab$ fehlt! Dieser Fehler tritt besonders häufig in ML-Kontexten auf, z.B. beim Ausmultiplizieren von Loss-Termen.',
    },
    {
      wrong: '$3(x + 2) = 3x + 2$',
      correct: '$3(x + 2) = 3x + 6$',
      explanation:
        'Das Distributivgesetz gilt für jeden Term in der Klammer: $3 \\cdot x + 3 \\cdot 2 = 3x + 6$.',
    },
    {
      wrong: '$(a + b)(a - b) = a^2 - 2ab - b^2$',
      correct: '$(a + b)(a - b) = a^2 - b^2$ (dritte binomische Formel)',
      explanation:
        'Bei der dritten Formel heben sich die mittleren Terme $(-ab + ab)$ gegenseitig auf. Es bleibt nur $a^2 - b^2$.',
    },
  ],

  furtherResources: [
    {
      title: 'Serlo: "Binomische Formeln" — serlo.org/mathe/binomische-formeln',
      type: 'article',
      note: 'Deutsche Referenz mit interaktiven Übungen und geometrischen Erklärungen',
    },
    {
      title: 'Khan Academy: "Polynomial multiplication" (Video-Serie)',
      type: 'video',
      note: 'Schritt-für-Schritt Ausmultiplizieren mit dem Distributivgesetz',
    },
    {
      title: 'BetterExplained: "Understanding the Binomial Theorem"',
      type: 'article',
      note: 'Intuitive Erklärung, warum $(a+b)^n$ so aussieht wie es aussieht',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.brueche',
      relation: 'requires',
      hint: 'Termumformungen mit Brüchen setzen Bruchrechnen voraus.',
    },
    {
      lessonId: 'p0.quadratische-gleichungen',
      relation: 'extends',
      hint: 'Quadratische Gleichungen werden durch Anwenden der binomischen Formeln und quadratische Ergänzung gelöst.',
    },
    {
      lessonId: 'p0.erste-ableitungen',
      relation: 'see-also',
      hint: 'Den MSE-Gradienten $2(\\hat{y}-y)$ erhält man durch Ausmultiplizieren und anschließendes Ableiten.',
    },
    {
      lessonId: 'p1.ableitungsregeln',
      relation: 'see-also',
      hint: 'Komplexere Terme in ML-Loss-Funktionen werden mit Produkt- und Kettenregel abgeleitet — das Ausmultiplizieren zeigt die Struktur.',
    },
  ],

  reflection: 'Termumformungen sind das algebraische Handwerk des ML. Wenn du den nächsten Backpropagation-Schritt siehst: $\\frac{\\partial}{\\partial \\hat{y}}(\\hat{y} - y)^2 = 2(\\hat{y} - y)$ — das ist die zweite binomische Formel plus Potenzregel. Wie viele Millionen Male führt ein modernes Sprachmodell pro Sekunde diese Umformung durch?',
}
