import { Hero } from '../components/media/Hero'
import { ContinueWatchingRow } from '../components/media/ContinueWatchingRow'
import { ContentRow } from '../components/media/ContentRow'
import { AppsRow } from '../components/apps/AppsRow'
import { movies, shows, allContent } from '../data/content'

const featured = movies.find((m) => m.id === 'm-10')!
const recommended = allContent.filter((c) => c.id !== featured.id).slice(0, 10)
const popular = [...shows, ...movies].filter((c) => c.id !== featured.id).reverse().slice(0, 10)

export function HomePage() {
  return (
    <div className="pb-16">
      <Hero item={featured} />
      <div className="pt-8">
        <ContinueWatchingRow />
        <ContentRow title="Recommended For You" items={recommended} />
        <ContentRow title="Popular Right Now" items={popular} />
        <AppsRow />
      </div>
    </div>
  )
}
