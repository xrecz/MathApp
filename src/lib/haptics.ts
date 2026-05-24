import { store } from './store'

const enabled = () => store.get('haptics')

export const haptic = {
  light:   () => { if (enabled()) navigator.vibrate?.(10)           },
  medium:  () => { if (enabled()) navigator.vibrate?.(20)           },
  success: () => { if (enabled()) navigator.vibrate?.([10, 30, 10]) },
  warning: () => { if (enabled()) navigator.vibrate?.([30, 50, 30]) },
  error:   () => { if (enabled()) navigator.vibrate?.([50, 100, 50]) },
}

// Legacy shims kept for existing callers
export const hapticSuccess = haptic.success
export const hapticError   = haptic.error
export const hapticTap     = haptic.light
export function vibrate(pattern: number | number[] = 10): void {
  if (enabled()) navigator.vibrate?.(pattern)
}
