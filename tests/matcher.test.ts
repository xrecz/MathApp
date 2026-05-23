import { describe, it, expect } from 'vitest'
import { checkAnswer, normalizeAnswer, checkMCAnswer, checkOrderAnswer } from '../src/engine/matcher'

describe('Answer Matcher', () => {
  describe('normalizeAnswer', () => {
    it('trims and lowercases', () => {
      expect(normalizeAnswer('  ABC  ')).toBe('abc')
    })

    it('replaces German decimal comma with dot', () => {
      expect(normalizeAnswer('0,75')).toBe('0.75')
    })

    it('strips LaTeX backslash and braces', () => {
      expect(normalizeAnswer('\\frac{1}{2}')).toBe('frac12')
    })
  })

  describe('checkAnswer - numeric', () => {
    it('accepts exact numeric match', () => {
      expect(checkAnswer('0.75', 0.75)).toBe(true)
    })

    it('accepts German decimal comma', () => {
      expect(checkAnswer('0,75', 0.75)).toBe(true)
    })

    it('rejects wrong number', () => {
      expect(checkAnswer('0.5', 0.75)).toBe(false)
    })

    it('accepts integers', () => {
      expect(checkAnswer('7', 7)).toBe(true)
    })

    it('rejects text for numeric', () => {
      expect(checkAnswer('abc', 7)).toBe(false)
    })
  })

  describe('checkAnswer - string', () => {
    it('accepts exact string match', () => {
      expect(checkAnswer('3x+2', '3x+2')).toBe(true)
    })

    it('accepts from alternatives list', () => {
      expect(checkAnswer('y=3x+2', '3x+2', ['y=3x+2', 'f(x)=3x+2'])).toBe(true)
    })

    it('rejects wrong string', () => {
      expect(checkAnswer('2x+3', '3x+2')).toBe(false)
    })

    it('is case insensitive after normalization', () => {
      expect(checkAnswer('3X+2', '3x+2')).toBe(true)
    })
  })

  describe('checkMCAnswer', () => {
    it('matches LaTeX options with normalization', () => {
      expect(checkMCAnswer('$\\frac{1}{2}$', '$\\frac{1}{2}$')).toBe(true)
    })

    it('rejects different option', () => {
      expect(checkMCAnswer('$\\frac{1}{4}$', '$\\frac{1}{2}$')).toBe(false)
    })
  })

  describe('checkOrderAnswer', () => {
    it('accepts correct order', () => {
      expect(checkOrderAnswer(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true)
    })

    it('rejects wrong order', () => {
      expect(checkOrderAnswer(['b', 'a', 'c'], ['a', 'b', 'c'])).toBe(false)
    })

    it('rejects different length', () => {
      expect(checkOrderAnswer(['a', 'b'], ['a', 'b', 'c'])).toBe(false)
    })
  })
})
