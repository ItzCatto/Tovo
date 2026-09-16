import type { ContentItem } from '../../data/types'
import { ContentCard } from './ContentCard'

export function ContentGrid({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return <p className="px-10 lg:px-14 text-tovo-text-secondary">Nothing here yet.</p>
  }

  return (
    <div className="px-10 lg:px-14 grid gap-x-4 gap-y-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(17.5rem, 1fr))' }}>
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  )
}
