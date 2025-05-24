import React from 'react'
import styles from './index.module.css'
import DataList from './components/DataList'
import RunData from './components/RunData'
import SavedData from './components/SavedData'
import ModeControl from './components/ModeControl'
import { ONLINE_DATA_IN_LIST, ONLINE_DATA_OTHER_LIST, ONLINE_DATA_OUT_LIST } from '@/constants'
import ThreeModel from '@/components/ThreeModel'
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

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <RunData />
        <SavedData />
        <div className={styles.model}>
          <ThreeModel />
        </div>
      </div>
      <DataList options={ONLINE_DATA_IN_LIST} />
      <DataList options={ONLINE_DATA_OUT_LIST} />
      <DataList options={ONLINE_DATA_OTHER_LIST} />
      <ModeControl />
    </div>
  )
}

export default App
