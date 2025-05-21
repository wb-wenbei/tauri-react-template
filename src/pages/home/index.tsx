import React from 'react'
import styles from './index.module.css'
// import ThreeModel from '@/components/ThreeModel'
// import Button from '@/components/Button'
// import { invoke } from '@tauri-apps/api/core'

const App: React.FC = () => {
  // const onClick = async () => {
  //   const c = await invoke('add', { a: 1, b: 2 })
  //   console.log('add', c)
  //   const res = await invoke('greet', { name: 'Tauri' })
  //   const value = await invoke('read_gpio', { pin: 12 })
  //   console.log(res, value)
  // }

  return <div className={styles.container}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}

export default App
