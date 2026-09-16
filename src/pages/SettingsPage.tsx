import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { SettingsSidebar } from '../components/settings/SettingsSidebar'
import { SettingRowView } from '../components/settings/SettingRowView'
import { settingsCategories } from '../data/settings'

export function SettingsPage() {
  const [activeId, setActiveId] = useState(settingsCategories[0].id)
  const active = settingsCategories.find((c) => c.id === activeId) ?? settingsCategories[0]

  return (
    <div className="pb-16">
      <PageHeader title="Settings" />
      <div className="px-10 lg:px-14 flex gap-12">
        <SettingsSidebar categories={settingsCategories} activeId={activeId} onSelect={setActiveId} />
        <div className="flex-1 min-w-0 max-w-3xl">
          {active.groups.map((group) => (
            <div key={group.title} className="mb-8">
              <h3 className="text-tovo-text-secondary text-sm font-semibold uppercase tracking-wide mb-2">
                {group.title}
              </h3>
              <div className="rounded-xl bg-tovo-surface px-5">
                {group.rows.map((row) => (
                  <SettingRowView key={row.id} row={row} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
