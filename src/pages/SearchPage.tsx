import { useMemo, useState } from 'react'
import { Keyboard } from '../components/search/Keyboard'
import { ContentGrid } from '../components/media/ContentGrid'
import { FilterBar } from '../components/ui/FilterBar'
import { allContent } from '../data/content'
import { useFocusable } from '../hooks/useFocusable'

const RECENT_SEARCHES = ['Glass Horizon', 'sci-fi thrillers', 'Nine Rivers', 'documentaries']
const SUGGESTED_SEARCHES = ['New releases', 'Ironbloom', 'Award winners', 'Static Age']
const CATEGORIES = ['All', 'Movies', 'Shows']

function Chip({ label, onSelect }: { label: string; onSelect: () => void }) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter: onSelect })
  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className="tv-focus focusable shrink-0 px-4 py-2 rounded-full bg-tovo-surface text-tovo-text-secondary text-[0.88rem]"
    >
      {label}
    </button>
  )
}

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return allContent.filter((c) => {
      const matchesQuery = c.title.toLowerCase().includes(q) || c.genres.some((g) => g.toLowerCase().includes(q))
      const matchesCategory = category === 'All' || (category === 'Movies' ? c.kind === 'movie' : c.kind === 'show')
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="pb-16 px-10 lg:px-14 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,26rem)_1fr] gap-12">
        <div>
          <div className="mb-6 h-14 rounded-xl bg-tovo-surface border border-white/10 flex items-center px-5 gap-3">
            <SearchIcon />
            <span className={`text-lg ${query ? 'text-tovo-text' : 'text-tovo-text-muted'}`}>
              {query || 'Search movies, shows, genres...'}
            </span>
          </div>

          <Keyboard
            onChar={(c) => setQuery((q) => q + c)}
            onBackspace={() => setQuery((q) => q.slice(0, -1))}
            onClear={() => setQuery('')}
          />

          {!query && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-tovo-text-secondary text-sm font-semibold mb-2.5">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((s) => (
                    <Chip key={s} label={s} onSelect={() => setQuery(s)} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-tovo-text-secondary text-sm font-semibold mb-2.5">Suggested</h3>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SEARCHES.map((s) => (
                    <Chip key={s} label={s} onSelect={() => setQuery(s)} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {query && (
            <>
              <div className="mb-4">
                <FilterBar options={CATEGORIES} active={category} onChange={setCategory} />
              </div>
              {results.length > 0 ? (
                <ContentGrid items={results} />
              ) : (
                <p className="text-tovo-text-secondary">No results for &ldquo;{query}&rdquo;.</p>
              )}
            </>
          )}
          {!query && (
            <div className="h-full flex items-center justify-center text-tovo-text-muted text-lg pt-24">
              Start typing to search Tovo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" className="text-tovo-text-secondary" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-tovo-text-secondary" />
    </svg>
  )
}
