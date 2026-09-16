import type { AppEntry } from '../../data/types'
import { useFocusable } from '../../hooks/useFocusable'

export function AppTile({ app, size = 'md' }: { app: AppEntry; size?: 'md' | 'lg' }) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({
    id: `app-${app.id}`,
    onEnter: () => {
      /* app launching is wired up by the backend team — no-op placeholder */
    },
  })

  const dims = size === 'lg' ? 'w-28 h-28 lg:w-32 lg:h-32' : 'w-24 h-24'

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      className="tv-focus focusable shrink-0 flex flex-col items-center gap-2.5 rounded-2xl"
    >
      <div
        className={`${dims} rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-black/40 relative overflow-hidden`}
        style={{ background: `linear-gradient(155deg, ${app.accent}dd, ${app.accent}88)` }}
      >
        {app.glyph}
        {!app.installed && (
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-tovo-bg flex items-center justify-center text-tovo-amber text-xs font-bold">
            +
          </div>
        )}
      </div>
      <span className="text-[0.82rem] text-tovo-text-secondary max-w-[7rem] truncate">{app.name}</span>
    </button>
  )
}
