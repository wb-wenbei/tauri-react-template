import { lazy } from 'react'

const SVG: Record<string, React.FC> = {
  sun: lazy(() => import('@/assets/icons/sun.svg?react')),
  moon: lazy(() => import('@/assets/icons/moon.svg?react')),
  running: lazy(() => import('@/assets/icons/running.svg?react')),
}

export default SVG
