import React from 'react'
import style from './index.module.css'

type Props = {
  label?: string
  value?: number
  unit?: string
}

const App: React.FC<Props> = (props) => {
  const {} = props
  return (
    <div className={style.statistic}>
      <div className={style.header}>
        <div className={style.label}>{props.label}</div>
        <div className={style.unit}>{props.unit}</div>
      </div>
      <div className={style.value}>{props.value}</div>
    </div>
  )
}

export default App
