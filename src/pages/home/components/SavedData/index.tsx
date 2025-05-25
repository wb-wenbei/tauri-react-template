import React, { useEffect, useMemo, useState } from 'react'
import style from './index.module.less'
import { SAVED_DATA_LIST } from '@/constants'
import { getTimesToNow } from '@/utils'
import { getRunEfficiencyInfo } from '@/apis'

const App: React.FC = () => {
  const [data, setData] = useState<InfoItem[]>([])

  const dataList = useMemo(() => {
    return SAVED_DATA_LIST.map((item) => {
      const infoItem = data.find((i) => i.key === item.key)

      if (!infoItem) return { ...item, value: '--' }

      let value = infoItem?.value
      // 系统上线时间是一个时间戳，转换为距当前时间的天数
      if (item.key === 'up_time') value = getTimesToNow(value as number) as string
      return { ...item, value }
    })
  }, [data])

  useEffect(() => {
    const loadData = () => {
      getRunEfficiencyInfo().then((res) => {
        setData(res || {})
      })
    }

    loadData()
  }, [])

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
