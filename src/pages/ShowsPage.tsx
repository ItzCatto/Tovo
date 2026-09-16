import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { FilterBar } from '../components/ui/FilterBar'
import { ContentGrid } from '../components/media/ContentGrid'
import { shows } from '../data/content'

const GENRES = ['All', ...Array.from(new Set(shows.flatMap((s) => s.genres))).sort()]

export function ShowsPage() {
  const [genre, setGenre] = useState('All')

  const filtered = useMemo(
    () => (genre === 'All' ? shows : shows.filter((s) => s.genres.includes(genre))),
    [genre],
  )

  return (
    <div className="pb-16">
      <PageHeader title="TV Shows" subtitle={`${filtered.length} titles`} />
      <FilterBar options={GENRES} active={genre} onChange={setGenre} />
      <ContentGrid items={filtered} />
    </div>
  )
}
