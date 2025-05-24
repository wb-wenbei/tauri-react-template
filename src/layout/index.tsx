import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import styles from './index.module.less'
import Toggle from '@/components/Toggle'
import SvgIcon from '@/components/Icon'
import { useThemeStore } from '@/stores/theme'
import type { ThemeMode } from '@/stores/theme'
import useUserStore from '@/stores/user'
import useSystemStore from '@/stores/system'

const App: React.FC = () => {
  const themeStore = useThemeStore()
  const { theme, setTheme } = themeStore
  const { customerId } = useUserStore()
  const { systemInfo, updateDeviceInfo, updateDeviceList } = useSystemStore()

  useEffect(() => {
    updateDeviceInfo()
  }, [updateDeviceInfo])

  useEffect(() => {
    updateDeviceList(customerId)
  }, [customerId, updateDeviceList])

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.header}>
        <div className={styles.title}>
          {systemInfo?.icon_url && <img src={systemInfo?.icon_url} alt="" />}
          <div>{systemInfo?.company_name}</div>
          <div>测流式生物倍增反应系统</div>
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
