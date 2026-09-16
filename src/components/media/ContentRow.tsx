import type { ContentItem } from '../../data/types'
import { ContentCard } from './ContentCard'

interface ContentRowProps {
  title: string
  items: ContentItem[]
  size?: 'md' | 'lg'
}

export function ContentRow({ title, items, size = 'md' }: ContentRowProps) {
  if (items.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="px-10 lg:px-14 mb-3 text-[1.3rem] font-bold text-tovo-text">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-10 lg:px-14 pb-2 mask-fade-r">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} size={size} />
        ))}
      </div>
    </section>
  )
}
