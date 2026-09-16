export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'amber' }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[0.7rem] font-semibold tracking-wide border ${
        tone === 'amber'
          ? 'border-tovo-amber/40 text-tovo-amber bg-tovo-amber/10'
          : 'border-white/15 text-tovo-text-secondary'
      }`}
    >
      {children}
    </span>
  )
}
