import Starfield from 'react-starfield'
import { useTheme } from '../contexts/ThemeContext'
import forestMisty from '../assets/backgrounds/forest-misty.jpg'
import forestRoad from '../assets/backgrounds/forest-road.jpg'
import forestSunrise from '../assets/backgrounds/forest-sunrise.jpg'
import forestLight from '../assets/backgrounds/forest-light.jpg'

const THEME_BG: Record<string, string> = {
  light: '#fafafa',
  dark: '#09090b',
  red: '#fef2f2',
  blue: '#eff6ff',
  green: '#f0fdf4',
  yellow: '#fefce8',
  forest: '#1a110a',
}

const THEME_STAR_COLOR: Record<string, [number, number, number]> = {
  light: [80, 80, 120],
  dark: [255, 255, 255],
  red: [180, 80, 80],
  blue: [80, 120, 220],
  green: [80, 180, 100],
  yellow: [180, 150, 60],
  forest: [220, 165, 110],
}

const BG_IMAGE_URL: Record<string, string> = {
  'forest-misty': forestMisty,
  'forest-road': forestRoad,
  'forest-sunrise': forestSunrise,
  'forest-light': forestLight,
}

// Images that need a dark gradient overlay to keep dark text readable.
// 'forest-light' is bright/airy so it works with any theme — no heavy overlay.
const DARK_OVERLAY_BG: Record<string, boolean> = {
  'forest-misty': true,
  'forest-road': true,
  'forest-sunrise': true,
  'forest-light': false,
}

export default function SpaceBackground() {
  const { colorTheme, backgroundImage } = useTheme()

  // 1. If user picked a forest image, show it (optionally with a darkening overlay)
  if (backgroundImage !== 'none' && BG_IMAGE_URL[backgroundImage]) {
    const url = BG_IMAGE_URL[backgroundImage]
    const useDarkOverlay = DARK_OVERLAY_BG[backgroundImage] ?? false
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundColor: useDarkOverlay ? '#0d0805' : '#e8eef0',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {useDarkOverlay && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10,6,3,0.45) 0%, rgba(10,6,3,0.25) 40%, rgba(10,6,3,0.55) 100%)',
            }}
          />
        )}
      </div>
    )
  }

  // 2. Forest color theme without an image: SVG/CSS fallback scene
  if (colorTheme === 'forest') {
    return <div aria-hidden="true" className="forest-background" />
  }

  // 3. Default: starfield
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
