import { useFocusable } from '../../hooks/useFocusable'

const ROWS = ['1234567890', 'QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

interface KeyboardProps {
  onChar: (char: string) => void
  onBackspace: () => void
  onClear: () => void
}

function Key({ label, wide, onEnter }: { label: string; wide?: boolean; onEnter: () => void }) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={onEnter}
      className={`tv-focus focusable h-11 lg:h-12 rounded-lg bg-tovo-surface text-tovo-text font-semibold text-[0.95rem] flex items-center justify-center ${
        wide ? 'px-6' : 'w-9 lg:w-10'
      }`}
    >
      {label}
    </button>
  )
}

export function Keyboard({ onChar, onBackspace, onClear }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2.5 items-start">
      {ROWS.map((row, i) => (
        <div key={row} className="flex gap-2.5" style={{ paddingLeft: `${i * 0.9}rem` }}>
          {row.split('').map((char) => (
            <Key key={char} label={char} onEnter={() => onChar(char)} />
          ))}
        </div>
      ))}
      <div className="flex gap-2.5 mt-1">
        <Key label="Space" wide onEnter={() => onChar(' ')} />
        <Key label="Delete" wide onEnter={onBackspace} />
        <Key label="Clear" wide onEnter={onClear} />
      </div>
    </div>
  )
}
