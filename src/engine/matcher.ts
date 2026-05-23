// Normalise and compare math answers with tolerance

const NUMERIC_TOLERANCE = 1e-6

export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,/g, '.')           // German decimal comma → dot
    .replace(/[{}\\]/g, '')       // strip LaTeX braces/backslash
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, '*')
    .replace(/\*/g, '')           // remove multiplication signs
    .replace(/\s/g, '')
}

export function checkAnswer(
  userInput: string,
  correct: string | number | string[],
  alternatives?: string[],
): boolean {
  if (typeof correct === 'number') {
    return checkNumeric(userInput, correct)
  }

  if (Array.isArray(correct)) {
    return correct.every((c, i) => {
      const ui = Array.isArray(userInput) ? (userInput as string[])[i] : userInput
      return checkStringAnswer(ui ?? '', c)
    })
  }

  if (checkStringAnswer(userInput, correct)) return true

  if (alternatives) {
    return alternatives.some(alt => checkStringAnswer(userInput, alt))
  }

  return false
}

function checkStringAnswer(input: string, expected: string): boolean {
  const ni = normalizeAnswer(input)
  const ne = normalizeAnswer(expected)
  if (ni === ne) return true

  // Try numeric fallback if both look like numbers
  const ni_num = parseFloat(ni)
  const ne_num = parseFloat(ne)
  if (!isNaN(ni_num) && !isNaN(ne_num)) {
    return Math.abs(ni_num - ne_num) <= NUMERIC_TOLERANCE
  }

  return false
}

function checkNumeric(input: string, expected: number): boolean {
  const normalised = input.replace(',', '.').trim()
  const parsed = parseFloat(normalised)
  if (isNaN(parsed)) return false
  return Math.abs(parsed - expected) <= NUMERIC_TOLERANCE
}

export function checkMCAnswer(userChoice: string, correct: string): boolean {
  return normalizeAnswer(userChoice) === normalizeAnswer(correct)
}

export function checkOrderAnswer(userOrder: string[], correct: string[]): boolean {
  if (userOrder.length !== correct.length) return false
  return userOrder.every((v, i) => normalizeAnswer(v) === normalizeAnswer(correct[i] ?? ''))
}
