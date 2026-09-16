import { useNavigate } from 'react-router-dom'
import type { ContentItem, ContinueWatchingItem } from '../../data/types'
import { PosterArt } from './PosterArt'
import { ProgressBar } from '../ui/ProgressBar'
import { useFocusable } from '../../hooks/useFocusable'

export function ContinueWatchingCard({ item, content }: { item: ContinueWatchingItem; content: ContentItem }) {
  const navigate = useNavigate()
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({
    id: `cw-${content.id}`,
    onEnter: () => navigate(`/title/${content.id}`),
  })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={() => navigate(`/title/${content.id}`)}
      className="tv-focus focusable group shrink-0 w-[24rem] text-left rounded-xl"
    >
      <PosterArt
        title={content.title}
        seed={content.paletteSeed}
        className={`aspect-video w-full rounded-xl shadow-lg shadow-black/40 transition-[filter] duration-200 ${
          focused ? 'brightness-110' : 'brightness-95'
        }`}
      >
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${focused ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
            <PlayIcon />
          </div>
        </div>
        <div className="absolute left-3 right-3 bottom-2.5">
          <p className="text-[1rem] font-semibold text-white leading-tight truncate mb-2">{content.title}</p>
          <ProgressBar progress={item.progress} />
        </div>
      </PosterArt>
      <div className="mt-2 px-0.5 text-[0.78rem] text-tovo-text-secondary">{item.remaining}</div>
    </button>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
