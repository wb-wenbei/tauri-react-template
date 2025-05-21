import React from 'react'
import { BrowserRouter } from 'react-router'
import Routes from './routes'
import './theme.css'
import './App.css'

const App: React.FC = () => {
  return (
    <React.Suspense>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
