import { PageHeader } from '../components/ui/PageHeader'
import { ContentGrid } from '../components/media/ContentGrid'
import { allContent } from '../data/content'
import { myListIds, downloadedIds } from '../data/library'

function byIds(ids: string[]) {
  return ids.map((id) => allContent.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => Boolean(c))
}

export function LibraryPage() {
  const myList = byIds(myListIds)
  const downloaded = byIds(downloadedIds)

  return (
    <div className="pb-16">
      <PageHeader title="Library" subtitle="Your saved titles and downloads" />

      <h2 className="px-10 lg:px-14 mb-4 text-[1.3rem] font-bold text-tovo-text">My List</h2>
      <div className="mb-12">
        <ContentGrid items={myList} />
      </div>

      <h2 className="px-10 lg:px-14 mb-4 text-[1.3rem] font-bold text-tovo-text">Downloaded</h2>
      <ContentGrid items={downloaded} />
    </div>
  )
}
