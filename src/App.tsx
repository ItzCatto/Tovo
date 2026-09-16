import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { BootScreen } from './components/boot/BootScreen'
import { HomePage } from './pages/HomePage'
import { MoviesPage } from './pages/MoviesPage'
import { ShowsPage } from './pages/ShowsPage'
import { AppsPage } from './pages/AppsPage'
import { LibraryPage } from './pages/LibraryPage'
import { SearchPage } from './pages/SearchPage'
import { SettingsPage } from './pages/SettingsPage'
import { TitlePage } from './pages/TitlePage'

function App() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{booting && <BootScreen />}</AnimatePresence>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/title/:id" element={<TitlePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
