import React, { useMemo } from 'react'
import style from './index.module.less'
import { updateOptionsValues } from '@/utils'
import useSystemStore from '@/stores/system'
import { DataItem } from '@/constants'

type Props = {
  options: DataItem[]
}
const App: React.FC<Props> = ({ options }) => {
  const { deviceList } = useSystemStore()

  const dataList = useMemo(() => {
    return updateOptionsValues(deviceList, options)
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
