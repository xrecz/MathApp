import { formatDistanceToNow, format, isToday } from 'date-fns'
import { de } from 'date-fns/locale'

export function formatDue(epochMs: number): string {
  const d = new Date(epochMs)
  if (isToday(d)) return 'Heute'
  return formatDistanceToNow(d, { addSuffix: true, locale: de })
}

export function formatDate(epochMs: number): string {
  return format(new Date(epochMs), 'dd.MM.yyyy', { locale: de })
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} Min.`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} Std.` : `${h} Std. ${m} Min.`
}

export function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd')
}
