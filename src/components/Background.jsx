import React from 'react'
import bg from '../assets/backgrounds/rainy-lofi.gif'
import '../styles/timer.css' // ensures some base styles load

export default function Background() {
  return (
    <div
      className="bg-layer"
      style={{
        backgroundImage: `url(${bg})`,
      }}
      aria-hidden
    />
  )
}
