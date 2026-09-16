export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-10 lg:px-14 pt-6 pb-6">
      <h1 className="text-3xl lg:text-4xl font-black text-tovo-text">{title}</h1>
      {subtitle && <p className="text-tovo-text-secondary mt-1.5">{subtitle}</p>}
    </div>
  )
}
