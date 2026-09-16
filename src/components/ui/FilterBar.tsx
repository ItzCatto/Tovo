import { useFocusable } from '../../hooks/useFocusable'

interface FilterChipProps {
  label: string
  active: boolean
  onSelect: () => void
}

function FilterChip({ label, active, onSelect }: FilterChipProps) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter: onSelect })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className={`tv-focus focusable shrink-0 px-4 py-2 rounded-full text-[0.9rem] font-medium border transition-colors ${
        active
          ? 'bg-tovo-amber border-tovo-amber text-black'
          : 'bg-tovo-surface border-white/10 text-tovo-text-secondary'
      }`}
    >
      {label}
    </button>
  )
}

export function FilterBar({
  options,
  active,
  onChange,
}: {
  options: string[]
  active: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto px-10 lg:px-14 pb-6 mask-fade-r">
      {options.map((opt) => (
        <FilterChip key={opt} label={opt} active={opt === active} onSelect={() => onChange(opt)} />
      ))}
    </div>
  )
}
