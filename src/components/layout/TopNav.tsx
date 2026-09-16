import { NavLink } from 'react-router-dom'
import { TovoOwl } from '../icons/TovoOwl'
import { useFocusable } from '../../hooks/useFocusable'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/shows', label: 'TV Shows' },
  { to: '/apps', label: 'Apps' },
  { to: '/library', label: 'Library' },
]

function NavItem({ to, label }: { to: string; label: string }) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLAnchorElement>({ id: `nav-${to}` })

  return (
    <NavLink
      ref={ref}
      to={to}
      end={to === '/'}
      onMouseEnter={onMouseEnter}
      data-focused={focused}
      className={({ isActive }) =>
        `tv-focus focusable relative px-4 py-2 rounded-lg text-[1.05rem] font-medium tracking-wide whitespace-nowrap ${
          isActive ? 'text-tovo-text' : 'text-tovo-text-secondary'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-tovo-amber transition-opacity duration-200 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

export function TopNav() {
  const search = useFocusable<HTMLAnchorElement>({ id: 'nav-search' })
  const settings = useFocusable<HTMLAnchorElement>({ id: 'nav-settings' })

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-10 lg:px-14 h-20 lg:h-24 bg-gradient-to-b from-tovo-bg via-tovo-bg/95 to-transparent">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5 text-tovo-amber">
          <TovoOwl size={30} variant="brand" />
          <span className="text-xl font-bold tracking-tight text-tovo-text">Tovo</span>
        </div>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <NavLink
          ref={search.ref}
          to="/search"
          onMouseEnter={search.onMouseEnter}
          data-focused={search.focused}
          className="tv-focus focusable flex items-center justify-center w-12 h-12 rounded-full bg-tovo-surface text-tovo-text-secondary"
          aria-label="Search"
        >
          <SearchIcon />
        </NavLink>
        <NavLink
          ref={settings.ref}
          to="/settings"
          onMouseEnter={settings.onMouseEnter}
          data-focused={settings.focused}
          className="tv-focus focusable flex items-center justify-center w-12 h-12 rounded-full bg-tovo-surface text-tovo-text-secondary"
          aria-label="Settings"
        >
          <GearIcon />
        </NavLink>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7L6.3 6.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
