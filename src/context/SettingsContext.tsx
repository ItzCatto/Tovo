import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type TextSize = 'Standard' | 'Large' | 'Extra Large'

interface LiveSettings {
  textSize: TextSize
  highContrast: boolean
  brightness: number
  captions: boolean
  setTextSize: (v: TextSize) => void
  setHighContrast: (v: boolean) => void
  setBrightness: (v: number) => void
  setCaptions: (v: boolean) => void
}

const TEXT_SCALE: Record<TextSize, number> = {
  Standard: 1,
  Large: 1.1,
  'Extra Large': 1.24,
}

const STORAGE_KEY = 'tovo-live-settings'

function loadInitial(): { textSize: TextSize; highContrast: boolean; brightness: number; captions: boolean } {
  const fallback = { textSize: 'Large' as TextSize, highContrast: false, brightness: 68, captions: true }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) }
  } catch {
    return fallback
  }
}

const SettingsContext = createContext<LiveSettings | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(loadInitial, [])
  const [textSize, setTextSize] = useState<TextSize>(initial.textSize)
  const [highContrast, setHighContrast] = useState(initial.highContrast)
  const [brightness, setBrightness] = useState(initial.brightness)
  const [captions, setCaptions] = useState(initial.captions)

  useEffect(() => {
    document.documentElement.style.setProperty('--user-text-scale', String(TEXT_SCALE[textSize]))
  }, [textSize])

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal')
  }, [highContrast])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ textSize, highContrast, brightness, captions }))
    } catch {
      /* private browsing / storage disabled — live settings just won't persist */
    }
  }, [textSize, highContrast, brightness, captions])

  const value: LiveSettings = {
    textSize,
    highContrast,
    brightness,
    captions,
    setTextSize,
    setHighContrast,
    setBrightness,
    setCaptions,
  }

  return (
    <SettingsContext.Provider value={value}>
      <div style={{ filter: `brightness(${0.55 + (brightness / 100) * 0.6})` }}>{children}</div>
    </SettingsContext.Provider>
  )
}

export function useLiveSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useLiveSettings must be used within SettingsProvider')
  return ctx
}
