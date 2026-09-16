export type Direction = 'up' | 'down' | 'left' | 'right'

interface FocusEntry {
  ref: React.RefObject<HTMLElement | null>
  disabled: boolean
  onEnterRef: React.RefObject<(() => void) | undefined>
}

const registry = new Map<string, FocusEntry>()
const listeners = new Set<() => void>()
let focusedId: string | null = null
let idCounter = 0

export function generateFocusId(prefix = 'f') {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

function notify() {
  listeners.forEach((l) => l())
}

export function subscribeFocus(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getFocusedId() {
  return focusedId
}

export function registerFocusable(id: string, entry: FocusEntry) {
  registry.set(id, entry)
}

export function unregisterFocusable(id: string) {
  registry.delete(id)
  if (focusedId === id) {
    focusedId = null
    notify()
  }
}

function isVisible(el: HTMLElement) {
  if (!el.isConnected) return false
  const rect = el.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

export function setFocus(id: string | null, opts: { scroll?: boolean } = {}) {
  const { scroll = true } = opts
  if (id === focusedId) return
  if (id !== null) {
    const entry = registry.get(id)
    if (!entry || entry.disabled || !entry.ref.current || !isVisible(entry.ref.current)) return
  }
  focusedId = id
  notify()
  if (id && scroll) {
    const entry = registry.get(id)
    entry?.ref.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }
}

export function focusFirstAvailable(candidateIds: string[]) {
  for (const id of candidateIds) {
    const entry = registry.get(id)
    if (entry && !entry.disabled && entry.ref.current && isVisible(entry.ref.current)) {
      setFocus(id, { scroll: false })
      return true
    }
  }
  return false
}

function rectOf(id: string) {
  const entry = registry.get(id)
  const el = entry?.ref.current
  if (!el) return null
  return el.getBoundingClientRect()
}

/** Geometry-based spatial navigation: scores every visible focusable by
 * alignment + distance in the requested direction and jumps to the best one.
 * This lets rows, grids, and the persistent top nav all compose naturally
 * without manual wiring between sections. */
export function moveFocus(direction: Direction) {
  if (!focusedId) {
    // nothing focused yet — grab the first visible registered element
    for (const [id, entry] of registry) {
      if (!entry.disabled && entry.ref.current && isVisible(entry.ref.current)) {
        setFocus(id, { scroll: false })
        return
      }
    }
    return
  }

  const currentRect = rectOf(focusedId)
  if (!currentRect) return

  const curCenterX = currentRect.left + currentRect.width / 2
  const curCenterY = currentRect.top + currentRect.height / 2

  let bestId: string | null = null
  let bestScore = Infinity

  for (const [id, entry] of registry) {
    if (id === focusedId || entry.disabled || !entry.ref.current || !isVisible(entry.ref.current)) continue
    const rect = entry.ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = centerX - curCenterX
    const dy = centerY - curCenterY

    const EPS = 4
    let primary: number
    let secondary: number

    switch (direction) {
      case 'right':
        if (dx <= EPS) continue
        primary = dx
        secondary = Math.abs(dy)
        break
      case 'left':
        if (dx >= -EPS) continue
        primary = -dx
        secondary = Math.abs(dy)
        break
      case 'down':
        if (dy <= EPS) continue
        primary = dy
        secondary = Math.abs(dx)
        break
      case 'up':
        if (dy >= -EPS) continue
        primary = -dy
        secondary = Math.abs(dx)
        break
    }

    const score = primary + secondary * 2.5
    if (score < bestScore) {
      bestScore = score
      bestId = id
    }
  }

  if (bestId) setFocus(bestId)
}

type BackHandler = () => boolean | void
const backHandlers: BackHandler[] = []

export function pushBackHandler(handler: BackHandler) {
  backHandlers.push(handler)
  return () => {
    const idx = backHandlers.indexOf(handler)
    if (idx >= 0) backHandlers.splice(idx, 1)
  }
}

function handleBack() {
  for (let i = backHandlers.length - 1; i >= 0; i -= 1) {
    const result = backHandlers[i]()
    if (result !== false) return
  }
}

function triggerEnter() {
  if (!focusedId) return
  const entry = registry.get(focusedId)
  if (entry?.onEnterRef.current) {
    entry.onEnterRef.current()
  } else {
    entry?.ref.current?.click()
  }
}

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

function onKeyDown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement | null)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return

  if (e.key in KEY_MAP) {
    e.preventDefault()
    moveFocus(KEY_MAP[e.key])
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    triggerEnter()
  } else if (e.key === 'Backspace' || e.key === 'Escape') {
    e.preventDefault()
    handleBack()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeyDown)
}
