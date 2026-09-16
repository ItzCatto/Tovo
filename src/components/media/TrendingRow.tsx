import type { ContentItem } from '../../data/types'
import { ContentCard } from './ContentCard'

function RankNumber({ rank }: { rank: number }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 select-none font-black leading-none text-tovo-amber"
      style={{
        fontSize: '6rem',
        marginRight: rank >= 10 ? '-1.9rem' : '-1.15rem',
        // ContentCard's height includes a metadata line below the poster —
        // lift the number so it centers on the poster art, not the card.
        marginBottom: '1.75rem',
        textShadow: '0 8px 24px rgb(0 0 0 / 0.6)',
      }}
    >
      {rank}
    </span>
  )
}

export function TrendingRow({ title, items }: { title: string; items: ContentItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="px-10 lg:px-14 mb-3 text-[1.3rem] font-bold text-tovo-text">{title}</h2>
      <div className="flex items-end gap-4 overflow-x-auto px-10 lg:px-14 pb-2 mask-fade-r">
        {items.map((item, i) => (
          <div key={item.id} className="flex items-end shrink-0">
            <RankNumber rank={i + 1} />
            <ContentCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
