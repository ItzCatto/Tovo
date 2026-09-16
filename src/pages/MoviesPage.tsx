import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { FilterBar } from '../components/ui/FilterBar'
import { ContentGrid } from '../components/media/ContentGrid'
import { movies } from '../data/content'

const GENRES = ['All', ...Array.from(new Set(movies.flatMap((m) => m.genres))).sort()]

export function MoviesPage() {
  const [genre, setGenre] = useState('All')

  const filtered = useMemo(
    () => (genre === 'All' ? movies : movies.filter((m) => m.genres.includes(genre))),
    [genre],
  )

  return (
    <div className="pb-16">
      <PageHeader title="Movies" subtitle={`${filtered.length} titles`} />
      <FilterBar options={GENRES} active={genre} onChange={setGenre} />
      <ContentGrid items={filtered} />
    </div>
  )
}
