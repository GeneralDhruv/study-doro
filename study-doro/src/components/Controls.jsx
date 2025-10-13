import React, { useContext } from 'react'
import '../styles/buttons.css'

// This component directly manipulates the Timer via simple DOM events for v1
// We'll use a simple approach: dispatch custom events the TimerDisplay can listen to.
// (Alternatively we can lift state up — but this keeps TimerDisplay unchanged for now.)

function sendEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function Controls() {
  return (
    <div className="controls">
      <button className="btn primary" onClick={() => sendEvent('pomo:toggle')}>
        Start / Pause
      </button>
      <button className="btn" onClick={() => sendEvent('pomo:add', { sec: 60 })}>
        +1 min
      </button>
      <button className="btn" onClick={() => sendEvent('pomo:sub', { sec: 60 })}>
        -1 min
      </button>
      <button className="btn" onClick={() => sendEvent('pomo:reset')}>
        Reset
      </button>
    </div>
  )
}
