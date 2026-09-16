const PALETTES: [string, string][] = [
  ['#241a10', '#4a2f14'],
  ['#101c1e', '#1c3a3d'],
  ['#1c1420', '#3a2148'],
  ['#1a1414', '#3d1f1f'],
  ['#12181c', '#1f3550'],
  ['#1a1c12', '#3a3d1f'],
  ['#201414', '#4a2418'],
  ['#141c18', '#1f4436'],
  ['#1c1818', '#402d1a'],
  ['#10141c', '#233a5c'],
  ['#1e1610', '#4a3418'],
  ['#161420', '#2e2450'],
  ['#1a1010', '#4a1f1f'],
  ['#0f1a16', '#1c4a3a'],
  ['#1c1610', '#4a3820'],
  ['#141018', '#33203f'],
  ['#101818', '#1e3838'],
  ['#1c1412', '#4a2e20'],
  ['#12141c', '#28305c'],
  ['#181414', '#3d2222'],
]

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

interface PosterArtProps {
  title: string
  seed: number
  className?: string
  children?: React.ReactNode
}

export function PosterArt({ title, seed, className, children }: PosterArtProps) {
  const [from, to] = PALETTES[seed % PALETTES.length]
  const initial = title.trim().charAt(0).toUpperCase()

  // Only default to `relative` when the caller hasn't set their own
  // position utility — otherwise it collides with e.g. `absolute` and wins
  // the cascade regardless of class order, silently pulling the element
  // back into normal flow.
  const hasPositionClass = /(?:^|\s)(?:absolute|fixed|sticky|static)(?:\s|$)/.test(className ?? '')
  const positionClass = hasPositionClass ? '' : 'relative'

  return (
    <div
      className={`${positionClass} overflow-hidden ${className ?? ''}`}
      style={{ background: `linear-gradient(155deg, ${to}, ${from})` }}
    >
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <span
        aria-hidden="true"
        className="absolute -bottom-[0.15em] -left-[0.05em] font-black text-white/[0.08] leading-none select-none"
        style={{ fontSize: '5.5em' }}
      >
        {initial}
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
      {children}
    </div>
  )
}
