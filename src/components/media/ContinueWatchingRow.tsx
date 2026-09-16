import { continueWatching } from '../../data/apps'
import { getContentById } from '../../data/content'
import type { ContentItem } from '../../data/types'
import { ContinueWatchingCard } from './ContinueWatchingCard'

export function ContinueWatchingRow() {
  const items: { cw: (typeof continueWatching)[number]; content: ContentItem }[] = []
  for (const cw of continueWatching) {
    const content = getContentById(cw.contentId)
    if (content) items.push({ cw, content })
  }

  if (items.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="px-10 lg:px-14 mb-3 text-[1.3rem] font-bold text-tovo-text">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-auto px-10 lg:px-14 pb-2 mask-fade-r">
        {items.map(({ cw, content }) => (
          <ContinueWatchingCard key={cw.contentId} item={cw} content={content} />
        ))}
      </div>
    </section>
  )
}
