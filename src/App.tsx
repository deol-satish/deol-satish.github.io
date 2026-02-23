import { Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Projects from './pages/Projects'
import Publications from './pages/Publications'
import Experience from './pages/Experience'
import Finance from './pages/Finance'
import './App.css'

const TEXTURE_CLASS: Record<string, string> = {
  none: 'texture-none',
  dots: 'texture-dots',
  grid: 'texture-grid',
  spaceships: 'texture-spaceships',
}

function App() {
  const { texture } = useTheme()
  const textureClass = TEXTURE_CLASS[texture] ?? 'texture-none'
  return (
    <div className={`flex min-h-screen flex-col theme-app-bg ${textureClass} text-zinc-900 dark:text-zinc-100`}>
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-start pb-20">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
