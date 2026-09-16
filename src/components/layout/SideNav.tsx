import { useSyncExternalStore } from 'react'
import { NavLink } from 'react-router-dom'
import { TovoOwl } from '../icons/TovoOwl'
import { NavIcon } from './NavIcon'
import { useFocusable } from '../../hooks/useFocusable'
import { getFocusedId, subscribeFocus } from '../../lib/focusStore'

const NAV_ITEMS = [
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/movies', label: 'Movies', icon: 'movies' },
  { to: '/shows', label: 'TV Shows', icon: 'shows' },
  { to: '/apps', label: 'Apps', icon: 'apps' },
  { to: '/library', label: 'Library', icon: 'library' },
]

function RailItem({
  to,
  label,
  icon,
  end,
  expanded,
}: {
  to: string
  label: string
  icon: string
  end?: boolean
  expanded: boolean
}) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLAnchorElement>({ id: `nav-${to}` })

  return (
    <NavLink
      ref={ref}
      to={to}
      end={end}
      onMouseEnter={onMouseEnter}
      data-focused={focused}
      className={({ isActive }) =>
        `tv-focus focusable relative flex items-center gap-4 h-14 rounded-xl px-[1.15rem] whitespace-nowrap overflow-hidden ${
          isActive ? 'text-tovo-amber' : 'text-tovo-text-secondary'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-tovo-amber" />}
          <span className="shrink-0 grid place-items-center w-6 h-6">
            <NavIcon icon={icon} />
          </span>
          <span
            className={`text-[1rem] font-medium transition-opacity duration-150 ${
              expanded ? 'opacity-100 delay-100' : 'opacity-0'
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}

export function SideNav() {
  const expanded = useSyncExternalStore(subscribeFocus, () => (getFocusedId() ?? '').startsWith('nav-'))
  const settings = useFocusable<HTMLAnchorElement>({ id: 'nav-/settings' })

  return (
    <div className="shrink-0 w-[5.5rem] h-screen sticky top-0 z-50">
      <nav
        className={`absolute inset-y-0 left-0 flex flex-col py-6 px-3.5 gap-2 bg-tovo-surface/95 backdrop-blur border-r border-white/5 transition-[width] duration-200 ease-out overflow-hidden ${
          expanded ? 'w-[14.5rem]' : 'w-[5.5rem]'
        }`}
      >
        <div className="flex items-center gap-3 h-14 px-[0.65rem] mb-4 shrink-0">
          <TovoOwl size={28} variant="brand" className="text-tovo-amber shrink-0" />
          <span className={`text-lg font-bold text-tovo-text transition-opacity duration-150 ${expanded ? 'opacity-100 delay-100' : 'opacity-0'}`}>
            Tovo
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <RailItem key={item.to} {...item} expanded={expanded} />
          ))}
        </div>

        <div className="mt-auto">
          <NavLink
            ref={settings.ref}
            to="/settings"
            onMouseEnter={settings.onMouseEnter}
            data-focused={settings.focused}
            className={({ isActive }) =>
              `tv-focus focusable relative flex items-center gap-4 h-14 rounded-xl px-[1.15rem] whitespace-nowrap overflow-hidden ${
                isActive ? 'text-tovo-amber' : 'text-tovo-text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-tovo-amber" />}
                <span className="shrink-0 grid place-items-center w-6 h-6">
                  <NavIcon icon="settings" />
                </span>
                <span className={`text-[1rem] font-medium transition-opacity duration-150 ${expanded ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                  Settings
                </span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
