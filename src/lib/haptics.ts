import { store } from './store'

export function vibrate(pattern: number | number[] = 10): void {
  if (!store.get('haptics')) return
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const hapticSuccess = () => vibrate([10, 50, 10])
export const hapticError   = () => vibrate([50, 30, 50])
export const hapticTap     = () => vibrate(10)
