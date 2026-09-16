const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function CategoryIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24' }

  switch (icon) {
    case 'display':
      return (
        <svg {...props} {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      )
    case 'sound':
      return (
        <svg {...props} {...common}>
          <path d="M4 10v4h3l5 4V6L7 10H4z" />
          <path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" />
        </svg>
      )
    case 'network':
      return (
        <svg {...props} {...common}>
          <path d="M5 9a10 10 0 0 1 14 0M8 12.5a6 6 0 0 1 8 0" />
          <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
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
    case 'accounts':
      return (
        <svg {...props} {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
        </svg>
      )
    case 'privacy':
      return (
        <svg {...props} {...common}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        </svg>
      )
    case 'accessibility':
      return (
        <svg {...props} {...common}>
          <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
          <path d="M5 9h14M12 9v5M12 14l-3 6M12 14l3 6" />
        </svg>
      )
    case 'remote':
      return (
        <svg {...props} {...common}>
          <rect x="8" y="2.5" width="8" height="19" rx="3.5" />
          <circle cx="12" cy="8" r="1.3" fill="currentColor" stroke="none" />
          <path d="M9.5 13h5" />
        </svg>
      )
    case 'inputs':
      return (
        <svg {...props} {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M8 6V4.5M16 6V4.5" />
        </svg>
      )
    case 'system':
      return (
        <svg {...props} {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7L6.3 6.3" />
        </svg>
      )
    default:
      return <svg {...props} {...common}><circle cx="12" cy="12" r="8" /></svg>
  }
}
