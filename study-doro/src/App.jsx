import React from 'react'
import Background from './components/Background'
import TimerDisplay from './components/TimerDisplay'
import Controls from './components/Controls'
import SettingsPanel from './components/SettingsPanel'
import './styles/variables.css'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Background />
      <header className="app-header">study-doro</header>

      <main className="main">
        <h2 className="subtitle">What do you want to focus on?</h2>

        <TimerDisplay />

        <div className="bottom-row">
          <Controls />
          <SettingsPanel />
        </div>
      </main>
    </div>
  )
}
