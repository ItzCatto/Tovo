export type ContentKind = 'movie' | 'show'

export interface ContentItem {
  id: string
  title: string
  kind: ContentKind
  year: number
  genres: string[]
  rating: string
  duration?: string
  seasons?: number
  description: string
  longDescription: string
  cast: string[]
  match: number
  criticScore: number
  paletteSeed: number
  featured?: boolean
}

export interface ContinueWatchingItem {
  contentId: string
  progress: number
  remaining: string
}

export interface AppEntry {
  id: string
  name: string
  accent: string
  glyph: string
  category: string
  installed: boolean
}

export interface SettingRow {
  id: string
  label: string
  description?: string
  type: 'toggle' | 'select' | 'action' | 'slider' | 'info'
  value?: string | number | boolean
  options?: string[]
}

export interface SettingCategory {
  id: string
  label: string
  icon: string
  groups: { title: string; rows: SettingRow[] }[]
}
