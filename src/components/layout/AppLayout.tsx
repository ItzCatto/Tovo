import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { SideNav } from './SideNav'
import { PageTransition } from './PageTransition'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-tovo-bg text-tovo-text">
      <SideNav />
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}
