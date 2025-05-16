import React from 'react'
import { Outlet } from 'react-router'
import styles from './index.module.less'
import Toggle from '@/components/Toggle'
import SvgIcon from '@/components/Icon'
import { useThemeStore } from '@/stores/theme'
import type { ThemeMode } from '@/stores/theme'

const App: React.FC = () => {
  const themeStore = useThemeStore()
  const { theme, setTheme } = themeStore

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.header}>
        <div className={styles.title}>
          {/* <div>icon</div>
          <div>系统名称</div>
          <div>系统子名称</div> */}
        </div>
        <div>
          <Toggle
            value={theme}
            onChange={(e) => {
              setTheme(e as ThemeMode)
            }}
            options={[
              { label: <SvgIcon name="sun" />, value: 'light' },
              { label: <SvgIcon name="moon" />, value: 'dark' },
            ]}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
