import React from 'react'
import style from './index.module.less'
import useSystemStore from '@/stores/system'
// import SvgIcon from '@/components/Icon'

const App: React.FC = () => {
  const { deviceInfo } = useSystemStore()
  const running = deviceInfo?.client?.Running
  const time = deviceInfo?.client?.UpTime

  return (
    <div className={style.container}>
      <div className={style.status}>
        {/* <SvgIcon name="running" /> */}
        {running ? '设备正在运行' : '设备已停止'}
      </div>
      <div>
        今日运行<span className={style.time}>{time || 0}</span>小时
      </div>
      <div>
        累计运行<span className={style.time}>{time || 0}</span>小时
      </div>
    </div>
  )
}

export default App
