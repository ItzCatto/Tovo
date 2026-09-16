import { PageHeader } from '../components/ui/PageHeader'
import { AppTile } from '../components/apps/AppTile'
import { apps } from '../data/apps'

export function AppsPage() {
  return (
    <div className="pb-16">
      <PageHeader title="Apps" subtitle={`${apps.length} apps available`} />
      <div
        className="px-10 lg:px-14 grid gap-x-6 gap-y-10"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        {apps.map((app) => (
          <AppTile key={app.id} app={app} size="lg" />
        ))}
      </div>
    </div>
  )
}
