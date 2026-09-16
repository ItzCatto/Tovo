import { Hero } from '../components/media/Hero'
import { ContinueWatchingRow } from '../components/media/ContinueWatchingRow'
import { ContentRow } from '../components/media/ContentRow'
import { TrendingRow } from '../components/media/TrendingRow'
import { AppsRow } from '../components/apps/AppsRow'
import { movies, allContent, getContentById } from '../data/content'
import { continueWatching } from '../data/apps'

const featured = movies.find((m) => m.id === 'm-10')!

function byGenre(genre: string) {
  return allContent.filter((c) => c.genres.includes(genre))
}

function topRated(kind: 'movie' | 'show') {
  return allContent
    .filter((c) => c.kind === kind)
    .slice()
    .sort((a, b) => b.criticScore - a.criticScore)
}

const trending = [...allContent].sort((a, b) => b.match - a.match).slice(0, 10)
const recommended = allContent.filter((c) => c.id !== featured.id).slice(0, 10)
const becauseWatchedId = continueWatching[0]?.contentId
const becauseWatched = becauseWatchedId ? getContentById(becauseWatchedId) : undefined
const becauseRow = becauseWatched
  ? allContent.filter((c) => c.id !== becauseWatched.id && c.genres.some((g) => becauseWatched.genres.includes(g))).slice(0, 10)
  : []
const scifiFantasy = [...byGenre('Sci-Fi'), ...byGenre('Fantasy')].filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
const dramas = byGenre('Drama')
const comedies = byGenre('Comedy')
const thrillers = [...byGenre('Thriller'), ...byGenre('Horror')].filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)

export function HomePage() {
  return (
    <div className="pb-16">
      <Hero item={featured} />
      <div className="pt-8">
        <ContinueWatchingRow />
        <TrendingRow title="Trending Now" items={trending} />
        <AppsRow />
        {becauseWatched && <ContentRow title={`Because You Watched ${becauseWatched.title}`} items={becauseRow} />}
        <ContentRow title="Recommended For You" items={recommended} />
        <ContentRow title="Top Rated Movies" items={topRated('movie')} />
        <ContentRow title="Top Rated TV Shows" items={topRated('show')} />
        <ContentRow title="Sci-Fi & Fantasy" items={scifiFantasy} />
        <ContentRow title="Dramas" items={dramas} />
        <ContentRow title="Comedies" items={comedies} />
        <ContentRow title="Thrillers & Horror" items={thrillers} />
      </div>
    </div>
  )
}
