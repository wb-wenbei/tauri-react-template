import React, { useMemo } from 'react'
import style from './index.module.less'
import { SAVED_DATA_LIST } from '@/constants'
import useSystemStore from '@/stores/system'
import { updateOptionsValues } from '@/utils'

const App: React.FC = () => {
  const { deviceList } = useSystemStore()

  const dataList = useMemo(() => {
    return updateOptionsValues(deviceList, SAVED_DATA_LIST)
  }, [deviceList])

  return (
    <div className={style.container}>
      {dataList.map((item) => (
        <div className={style.card}>
          <div className={style.header}>
            <div className={style.label}>{item.title}</div>
            <div className={style.unit}>{item.unit}</div>
          </div>
          <div className={style.value}>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default App
