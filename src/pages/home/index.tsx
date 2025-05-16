import React from 'react'
// import ThreeModel from '@/components/ThreeModel'
import Button from '@/components/Button'
import { invoke } from '@tauri-apps/api/core'

const App: React.FC = () => {
  const onClick = async () => {
    const c = await invoke('add', { a: 1, b: 2 })
    console.log('add', c)
    const res = await invoke('greet', { name: 'Tauri' })
    const value = await invoke('read_gpio', { pin: 12 })
    console.log(res, value)
  }

  return (
    <div style={{ height: 400 }}>
      {/* <ThreeModel /> */}
      <Button onClick={onClick} />
    </div>
  )
}

export default App
