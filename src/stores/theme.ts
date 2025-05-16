import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set((state) => ({ ...state, theme })),
    }),
    { name: 'theme' }
  )
)

export { useThemeStore }
