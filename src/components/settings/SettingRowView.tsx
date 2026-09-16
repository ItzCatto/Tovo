import { useState } from 'react'
import type { SettingRow } from '../../data/types'
import { useFocusable } from '../../hooks/useFocusable'

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

function ToggleControl({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial)
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter: () => setOn((v) => !v) })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={`tv-focus focusable w-14 h-8 rounded-full flex items-center px-1 transition-colors ${
        on ? 'bg-tovo-amber justify-end' : 'bg-tovo-elevated-2 justify-start'
      }`}
    >
      <span className="w-6 h-6 rounded-full bg-white block" />
    </button>
  )
}

function SelectControl({ initial, options }: { initial: string; options: string[] }) {
  const [idx, setIdx] = useState(Math.max(0, options.indexOf(initial)))
  const step = (dir: 1 | -1) => setIdx((i) => (i + dir + options.length) % options.length)

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
      <span className="text-tovo-text-secondary min-w-[9rem] text-center">{options[idx]}</span>
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

function SliderControl({ initial }: { initial: number }) {
  const [value, setValue] = useState(initial)
  const step = (delta: number) => setValue((v) => Math.min(100, Math.max(0, v + delta)))

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
        <div className="h-full bg-tovo-amber rounded-full" style={{ width: `${value}%` }} />
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

export function SettingRowView({ row }: { row: SettingRow }) {
  return (
    <RowShell label={row.label} description={row.description}>
      {row.type === 'toggle' && <ToggleControl initial={Boolean(row.value)} />}
      {row.type === 'select' && <SelectControl initial={String(row.value)} options={row.options ?? []} />}
      {row.type === 'slider' && <SliderControl initial={Number(row.value)} />}
      {row.type === 'action' && <ActionControl label={row.label} />}
      {row.type === 'info' && <span className="text-tovo-text-secondary text-sm">{row.value}</span>}
    </RowShell>
  )
}
