import { useNavigate } from 'react-router-dom'
import type { ContentItem } from '../../data/types'
import { PosterArt } from './PosterArt'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useFocusable } from '../../hooks/useFocusable'

export function Hero({ item }: { item: ContentItem }) {
  const navigate = useNavigate()
  const watch = useFocusable<HTMLButtonElement>({
    id: `hero-watch-${item.id}`,
    onEnter: () => navigate(`/title/${item.id}`),
    focusOnMount: true,
  })
  const info = useFocusable<HTMLButtonElement>({
    id: `hero-info-${item.id}`,
    onEnter: () => navigate(`/title/${item.id}`),
  })

  return (
    <section className="relative h-[38rem] lg:h-[44rem] w-full overflow-hidden">
      <PosterArt title={item.title} seed={item.paletteSeed} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-tovo-bg via-tovo-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-tovo-bg/90 via-tovo-bg/10 to-transparent" />
      </PosterArt>

      <div className="relative h-full flex flex-col justify-end px-10 lg:px-14 pb-14 max-w-2xl">
        <div className="flex items-center gap-2 mb-4 animate-fade-up">
          <Badge tone="amber">{item.match}% Match</Badge>
          <Badge>{item.rating}</Badge>
          <span className="text-tovo-text-secondary text-sm">{item.year}</span>
          <span className="text-tovo-text-secondary text-sm">&middot;</span>
          <span className="text-tovo-text-secondary text-sm">{item.genres.join(', ')}</span>
        </div>

        <h1
          className="text-5xl lg:text-6xl font-black text-tovo-text leading-[1.05] mb-4 text-balance animate-fade-up"
          style={{ animationDelay: '40ms' }}
        >
          {item.title}
        </h1>

        <p
          className="text-tovo-text-secondary text-lg leading-relaxed mb-8 line-clamp-3 text-balance animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          {item.description}
        </p>

        <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '120ms' }}>
          <Button
            ref={watch.ref}
            dataFocused={watch.focused}
            onMouseEnter={watch.onMouseEnter}
            onClick={() => navigate(`/title/${item.id}`)}
            size="lg"
            variant="primary"
          >
            <PlayIcon /> Watch Now
          </Button>
          <Button
            ref={info.ref}
            dataFocused={info.focused}
            onMouseEnter={info.onMouseEnter}
            onClick={() => navigate(`/title/${item.id}`)}
            size="lg"
            variant="secondary"
          >
            <InfoIcon /> More Info
          </Button>
        </div>
      </div>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
    </svg>
  )
}
