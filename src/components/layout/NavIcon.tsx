const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function NavIcon({ icon, size = 22 }: { icon: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24' }

  switch (icon) {
    case 'search':
      return (
        <svg {...props} {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      )
    case 'home':
      return (
        <svg {...props} {...common}>
          <path d="M4 11.5L12 4l8 7.5" />
          <path d="M6 10v9a1 1 0 0 0 1 1h3v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3a1 1 0 0 0 1-1v-9" />
        </svg>
      )
    case 'movies':
      return (
        <svg {...props} {...common}>
          <path d="M4 8l1.8-4h3l-1.8 4M9.8 8l1.8-4h3l-1.8 4M15.6 8l1.8-4h1.6a1 1 0 0 1 1 1v3" />
          <rect x="3.5" y="8" width="17" height="12" rx="1.5" />
        </svg>
      )
    case 'shows':
      return (
        <svg {...props} {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M9 21h6M12 17v4" />
          <path d="M10.3 8.3l4 2.2-4 2.2z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'apps':
      return (
        <svg {...props} {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
        </svg>
      )
    case 'library':
      return (
        <svg {...props} {...common}>
          <path d="M6 3.5h9a1.5 1.5 0 0 1 1.5 1.5v15.5L12 17.5l-4.5 2.5V5A1.5 1.5 0 0 1 9 3.5" transform="translate(-1.5 0)" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...props} {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7L6.3 6.3" />
        </svg>
      )
    default:
      return (
        <svg {...props} {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}
