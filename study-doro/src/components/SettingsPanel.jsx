import React from 'react'
import '../styles/timer.css'

export default function SettingsPanel(){
  return (
    <div className="settings-panel">
      <div className="setting-row">Theme: <strong>Rainy Lofi</strong></div>
      <div className="setting-row">Sound: <strong>Chime</strong></div>
      <div style={{fontSize:12, opacity:0.8}}>More settings coming in v2</div>
    </div>
  )
}
