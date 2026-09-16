import { apps } from '../../data/apps'
import { AppTile } from './AppTile'

export function AppsRow() {
  return (
    <section className="mb-10">
      <h2 className="px-10 lg:px-14 mb-3 text-[1.3rem] font-bold text-tovo-text">Apps</h2>
      <div className="flex gap-5 overflow-x-auto px-10 lg:px-14 pb-2 mask-fade-r">
        {apps.map((app) => (
          <AppTile key={app.id} app={app} />
        ))}
      </div>
    </section>
  )
}
