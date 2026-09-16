export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  return (
    <div className={`h-1 rounded-full bg-white/20 overflow-hidden ${className ?? ''}`}>
      <div
        className="h-full rounded-full bg-tovo-amber"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  )
}
