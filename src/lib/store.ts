type Listener<T> = (value: T) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Store<T extends Record<string, any>> {
  private state: T
  private listeners: Map<keyof T, Set<Listener<unknown>>> = new Map()

  constructor(initial: T) {
    this.state = { ...initial }
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key]
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value
    const subs = this.listeners.get(key)
    if (subs) subs.forEach(fn => fn(value))
  }

  subscribe<K extends keyof T>(key: K, fn: Listener<T[K]>): () => void {
    if (!this.listeners.has(key)) this.listeners.set(key, new Set())
    this.listeners.get(key)!.add(fn as Listener<unknown>)
    return () => this.listeners.get(key)?.delete(fn as Listener<unknown>)
  }
}

export interface AppState {
  route: string
  xp: number
  streak: number
  theme: 'dark' | 'light' | 'system'
  fontSize: 'S' | 'M' | 'L'
  haptics: boolean
  dailyGoalXp: number
  todayXp: number
}

export const store = new Store<AppState>({
  route: '/',
  xp: 0,
  streak: 0,
  theme: 'dark',
  fontSize: 'M',
  haptics: true,
  dailyGoalXp: 50,
  todayXp: 0,
})

export function navigate(path: string): void {
  window.history.pushState({}, '', path)
  store.set('route', path)
}
