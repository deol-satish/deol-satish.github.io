import Starfield from 'react-starfield'
import { useTheme } from '../contexts/ThemeContext'

const THEME_BG: Record<string, string> = {
  light: '#fafafa',
  dark: '#09090b',
  red: '#fef2f2',
  blue: '#eff6ff',
  green: '#f0fdf4',
  yellow: '#fefce8',
}

const THEME_STAR_COLOR: Record<string, [number, number, number]> = {
  light: [80, 80, 120],
  dark: [255, 255, 255],
  red: [180, 80, 80],
  blue: [80, 120, 220],
  green: [80, 180, 100],
  yellow: [180, 150, 60],
}

export default function SpaceBackground() {
  const { colorTheme } = useTheme()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Starfield
        starCount={1000}
        starColor={THEME_STAR_COLOR[colorTheme] ?? [255, 255, 255]}
        speedFactor={0.05}
        backgroundColor={THEME_BG[colorTheme] ?? '#09090b'}
      />
    </div>
  )
}
