import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getContentById } from '../data/content'
import { PosterArt } from '../components/media/PosterArt'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useFocusable } from '../hooks/useFocusable'
import { pushBackHandler } from '../lib/focusStore'

export function TitlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = id ? getContentById(id) : undefined

  useEffect(() => pushBackHandler(() => { navigate(-1) }), [navigate])

  const watch = useFocusable<HTMLButtonElement>({ id: 'title-watch', focusOnMount: true })
  const addList = useFocusable<HTMLButtonElement>({ id: 'title-add' })
  const back = useFocusable<HTMLButtonElement>({ id: 'title-back', onEnter: () => navigate(-1) })

  if (!item) {
    return (
      <div className="px-14 py-20 text-tovo-text-secondary">
        Title not found.
      </div>
    )
  }

  return (
    <div className="pb-20">
      <section className="relative h-[30rem] lg:h-[36rem] w-full overflow-hidden">
        <PosterArt title={item.title} seed={item.paletteSeed} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-tovo-bg via-tovo-bg/50 to-transparent" />
        </PosterArt>

        <button
          ref={back.ref}
          data-focused={back.focused}
          onMouseEnter={back.onMouseEnter}
          onClick={() => navigate(-1)}
          className="tv-focus focusable absolute top-8 left-10 lg:left-14 w-11 h-11 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-tovo-text"
          aria-label="Back"
        >
          <BackIcon />
        </button>
      </section>

      <div className="px-10 lg:px-14 -mt-24 relative max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Badge tone="amber">{item.match}% Match</Badge>
          <Badge>{item.rating}</Badge>
          <span className="text-tovo-text-secondary text-sm">{item.year}</span>
          <span className="text-tovo-text-secondary text-sm">&middot;</span>
          <span className="text-tovo-text-secondary text-sm">
            {item.kind === 'movie' ? item.duration : `${item.seasons} Season${item.seasons === 1 ? '' : 's'}`}
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-black text-tovo-text mb-3 text-balance">{item.title}</h1>

        <div className="flex flex-wrap gap-2 mb-5">
          {item.genres.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        <p className="text-tovo-text-secondary text-lg leading-relaxed mb-6 text-balance">{item.longDescription}</p>

        <p className="text-tovo-text-secondary mb-8">
          <span className="text-tovo-text font-medium">Cast: </span>
          {item.cast.join(', ')}
        </p>

        <div className="flex items-center gap-3">
          <Button ref={watch.ref} dataFocused={watch.focused} onMouseEnter={watch.onMouseEnter} size="lg" variant="primary">
            <PlayIcon /> Watch Now
          </Button>
          <Button ref={addList.ref} dataFocused={addList.focused} onMouseEnter={addList.onMouseEnter} size="lg" variant="secondary">
            <PlusIcon /> My List
          </Button>
        </div>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
