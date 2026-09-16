import type { SettingCategory } from '../../data/types'
import { useFocusable } from '../../hooks/useFocusable'
import { CategoryIcon } from './CategoryIcon'

function SidebarItem({
  category,
  active,
  onSelect,
}: {
  category: SettingCategory
  active: boolean
  onSelect: () => void
}) {
  const { ref, focused, onMouseEnter } = useFocusable<HTMLButtonElement>({ onEnter: onSelect })

  return (
    <button
      ref={ref}
      data-focused={focused}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className={`tv-focus focusable w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
        active ? 'bg-tovo-amber-wash text-tovo-amber' : 'text-tovo-text-secondary'
      }`}
    >
      <CategoryIcon icon={category.icon} />
      <span className="font-medium">{category.label}</span>
    </button>
  )
}

export function SettingsSidebar({
  categories,
  activeId,
  onSelect,
}: {
  categories: SettingCategory[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="flex flex-col gap-1 w-72 shrink-0">
      {categories.map((cat) => (
        <SidebarItem key={cat.id} category={cat} active={cat.id === activeId} onSelect={() => onSelect(cat.id)} />
      ))}
    </nav>
  )
}
