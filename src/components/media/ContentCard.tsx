import { useNavigate } from 'react-router-dom'
import type { ContentItem } from '../../data/types'
import { PosterArt } from './PosterArt'
import { useFocusable } from '../../hooks/useFocusable'

interface ContentCardProps {
  item: ContentItem
  size?: 'md' | 'lg'
}

export function ContentCard({ item, size = 'md' }: ContentCardProps) {
  const navigate = useNavigate()
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({
    id: `card-${item.id}`,
    onEnter: () => navigate(`/title/${item.id}`),
  })

  const width = size === 'lg' ? 'w-[22rem]' : 'w-[17.5rem]'

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={() => navigate(`/title/${item.id}`)}
      className={`tv-focus focusable group shrink-0 ${width} text-left rounded-xl`}
    >
      <PosterArt
        title={item.title}
        seed={item.paletteSeed}
        className={`aspect-video w-full rounded-xl shadow-lg shadow-black/40 transition-[filter] duration-200 ${
          focused ? 'brightness-110' : 'brightness-95'
        }`}
      >
        <div className="absolute left-3 right-3 bottom-2.5">
          <p className="text-[1rem] font-semibold text-white leading-tight truncate text-balance">{item.title}</p>
        </div>
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm">
          <StarIcon />
          <span className="text-[0.68rem] font-bold text-tovo-text">{item.criticScore.toFixed(1)}</span>
        </div>
        {item.match >= 90 && (
          <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm">
            <span className="text-[0.68rem] font-bold text-tovo-amber">{item.match}%</span>
          </div>
        )}
      </PosterArt>
      <div className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-tovo-text-secondary px-0.5">
        <span>{item.year}</span>
        <span className="opacity-50">&middot;</span>
        <span>{item.rating}</span>
        <span className="opacity-50">&middot;</span>
        <span className="truncate">{item.genres[0]}</span>
      </div>
    </button>
  )
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#C87532">
      <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.8l-6.1 3.4 1.5-6.9-5.2-4.7 6.9-.7z" />
    </svg>
  )
}
