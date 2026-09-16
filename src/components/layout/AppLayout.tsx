import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { TopNav } from './TopNav'
import { PageTransition } from './PageTransition'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-tovo-bg text-tovo-text">
      <TopNav />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </div>
  )
}
