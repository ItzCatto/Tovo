interface TovoOwlProps {
  size?: number
  className?: string
  /** monochrome uses currentColor for the whole mark; brand punches amber pupils through */
  variant?: 'monochrome' | 'brand'
  animateBlink?: boolean
}

/**
 * Tovo's owl mark. A single rounded silhouette with the eyes and beak
 * knocked out as negative space, so it reads at nav-icon size and at
 * full boot-screen size from the same geometry.
 */
export function TovoOwl({
  size = 32,
  className,
  variant = 'monochrome',
  animateBlink = false,
}: TovoOwlProps) {
  const maskId = `owl-eyes-${variant}-${animateBlink ? 'anim' : 'static'}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="48" height="48" fill="white" />
        <polygon points="9,13 16,2 18,14" fill="black" />
        <polygon points="39,13 32,2 30,14" fill="black" />
        <rect x="6" y="9" width="36" height="35" rx="17.5" fill="white" />
        <g className={animateBlink ? 'origin-center animate-owl-blink' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx="17" cy="24.5" r="6.2" fill="black" />
          <circle cx="31" cy="24.5" r="6.2" fill="black" />
        </g>
        <polygon points="21.3,29.5 26.7,29.5 24,35" fill="black" />
      </mask>

      <g mask={`url(#${maskId})`}>
        <polygon points="9,13 16,2 18,14" fill="currentColor" />
        <polygon points="39,13 32,2 30,14" fill="currentColor" />
        <rect x="6" y="9" width="36" height="35" rx="17.5" fill="currentColor" />
      </g>

      {variant === 'brand' && (
        <g className={animateBlink ? 'origin-center animate-owl-blink' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx="17" cy="24.5" r="2.4" fill="currentColor" />
          <circle cx="31" cy="24.5" r="2.4" fill="currentColor" />
        </g>
      )}
    </svg>
  )
}
