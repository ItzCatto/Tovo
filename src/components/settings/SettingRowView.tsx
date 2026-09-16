import { useState } from 'react'
import type { SettingRow } from '../../data/types'
import { useFocusable } from '../../hooks/useFocusable'
import { useLiveSettings, type TextSize } from '../../context/SettingsContext'

function RowShell({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-8 py-4 border-b border-white/5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-tovo-text font-medium">{label}</p>
        {description && <p className="text-tovo-text-secondary text-sm mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0 flex items-center gap-3">{children}</div>
    </div>
  )
}

function ToggleControl({ initial, value, onChange }: { initial: boolean; value?: boolean; onChange?: (v: boolean) => void }) {
  const [internal, setInternal] = useState(initial)
  const on = value ?? internal
  const toggle = () => (onChange ? onChange(!on) : setInternal(!on))
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter: toggle })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={toggle}
      aria-pressed={on}
      className={`tv-focus focusable w-14 h-8 rounded-full flex items-center px-1 transition-colors ${
        on ? 'bg-tovo-amber justify-end' : 'bg-tovo-elevated-2 justify-start'
      }`}
    >
      <span className="w-6 h-6 rounded-full bg-white block" />
    </button>
  )
}

function SelectControl({
  initial,
  options,
  value,
  onChange,
}: {
  initial: string
  options: string[]
  value?: string
  onChange?: (v: string) => void
}) {
  const [internalIdx, setInternalIdx] = useState(Math.max(0, options.indexOf(initial)))
  const currentIdx = value !== undefined ? Math.max(0, options.indexOf(value)) : internalIdx
  const step = (dir: 1 | -1) => {
    const nextIdx = (currentIdx + dir + options.length) % options.length
    if (onChange) onChange(options[nextIdx])
    else setInternalIdx(nextIdx)
  }

  const prev = useFocusable<HTMLButtonElement>({ onEnter: () => step(-1) })
  const next = useFocusable<HTMLButtonElement>({ onEnter: () => step(1) })

  return (
    <div className="flex items-center gap-3">
      <button
        ref={prev.ref}
        data-focused={prev.focused}
        onMouseEnter={prev.onMouseEnter}
        onClick={() => step(-1)}
        className="tv-focus focusable w-8 h-8 rounded-full bg-tovo-elevated-2 flex items-center justify-center text-tovo-text"
        aria-label="Previous option"
      >
        &#8249;
      </button>
      <span className="text-tovo-text-secondary min-w-[9rem] text-center">{options[currentIdx]}</span>
      <button
        ref={next.ref}
        data-focused={next.focused}
        onMouseEnter={next.onMouseEnter}
        onClick={() => step(1)}
        className="tv-focus focusable w-8 h-8 rounded-full bg-tovo-elevated-2 flex items-center justify-center text-tovo-text"
        aria-label="Next option"
      >
        &#8250;
      </button>
    </div>
  )
}

function SliderControl({ initial, value, onChange }: { initial: number; value?: number; onChange?: (v: number) => void }) {
  const [internal, setInternal] = useState(initial)
  const current = value ?? internal
  const step = (delta: number) => {
    const next = Math.min(100, Math.max(0, current + delta))
    if (onChange) onChange(next)
    else setInternal(next)
  }

  const dec = useFocusable<HTMLButtonElement>({ onEnter: () => step(-10) })
  const inc = useFocusable<HTMLButtonElement>({ onEnter: () => step(10) })

  return (
    <div className="flex items-center gap-3">
      <button
        ref={dec.ref}
        data-focused={dec.focused}
        onMouseEnter={dec.onMouseEnter}
        onClick={() => step(-10)}
        className="tv-focus focusable w-8 h-8 rounded-full bg-tovo-elevated-2 flex items-center justify-center text-tovo-text"
        aria-label="Decrease"
      >
        &minus;
      </button>
      <div className="w-32 h-1.5 rounded-full bg-white/15 overflow-hidden">
        <div className="h-full bg-tovo-amber rounded-full" style={{ width: `${current}%` }} />
      </div>
      <button
        ref={inc.ref}
        data-focused={inc.focused}
        onMouseEnter={inc.onMouseEnter}
        onClick={() => step(10)}
        className="tv-focus focusable w-8 h-8 rounded-full bg-tovo-elevated-2 flex items-center justify-center text-tovo-text"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  )
}

function ActionControl({ label }: { label: string }) {
  const [done, setDone] = useState(false)
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({
    onEnter: () => {
      setDone(true)
      setTimeout(() => setDone(false), 1400)
    },
  })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={() => setDone(true)}
      className="tv-focus focusable px-4 py-2 rounded-lg bg-tovo-elevated-2 text-tovo-text text-sm font-medium min-w-[6rem]"
    >
      {done ? 'Done' : label}
    </button>
  )
}

/** A handful of settings have a real, visible effect on the app right away
 * (not just a stored value) — wired to SettingsContext instead of local
 * per-row state so the change is immediately visible everywhere. */
const LIVE_ROW_IDS = new Set(['high-contrast', 'text-size', 'brightness', 'captions'])

function LiveSettingControl({ row }: { row: SettingRow }) {
  const live = useLiveSettings()

  switch (row.id) {
    case 'high-contrast':
      return <ToggleControl initial={live.highContrast} value={live.highContrast} onChange={live.setHighContrast} />
    case 'text-size':
      return (
        <SelectControl
          initial={live.textSize}
          options={row.options ?? []}
          value={live.textSize}
          onChange={(v) => live.setTextSize(v as TextSize)}
        />
      )
    case 'brightness':
      return <SliderControl initial={live.brightness} value={live.brightness} onChange={live.setBrightness} />
    case 'captions':
      return <ToggleControl initial={live.captions} value={live.captions} onChange={live.setCaptions} />
    default:
      return null
  }
}

export function SettingRowView({ row }: { row: SettingRow }) {
  const isLive = LIVE_ROW_IDS.has(row.id)

  return (
    <div>
      <RowShell label={row.label} description={row.description}>
        {isLive && <LiveSettingControl row={row} />}
        {!isLive && row.type === 'toggle' && <ToggleControl initial={Boolean(row.value)} />}
        {!isLive && row.type === 'select' && <SelectControl initial={String(row.value)} options={row.options ?? []} />}
        {!isLive && row.type === 'slider' && <SliderControl initial={Number(row.value)} />}
        {row.type === 'action' && <ActionControl label={row.label} />}
        {row.type === 'info' && <span className="text-tovo-text-secondary text-sm">{row.value}</span>}
      </RowShell>
      {row.id === 'captions' && <CaptionPreview />}
    </div>
  )
}

function CaptionPreview() {
  const { captions } = useLiveSettings()
  if (!captions) return null

  return (
    <div className="pb-4 -mt-1">
      <div className="inline-block px-3 py-1.5 rounded bg-black/80 border border-white/10">
        <span className="text-white text-sm">This is how closed captions will look.</span>
      </div>
    </div>
  )
}
