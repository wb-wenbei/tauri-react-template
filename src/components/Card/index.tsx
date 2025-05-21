import React from 'react'
import style from './index.module.css'

type Props = {
  title?: string
  action?: React.ReactNode
  children?: React.ReactNode
}

const App: React.FC<Props> = (props) => {
  const {} = props
  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.title}>{props.title}</div>
        <div className={style.action}>{props.action}</div>
      </div>
      <div className={style.content}>{props.children}</div>
    </div>
  )
}

export default App
