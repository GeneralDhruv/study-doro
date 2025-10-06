import React, { useEffect, useRef, useState } from 'react'
import chime from '../assets/sounds/end-chime.mp3'
import click from '../assets/sounds/tick.mp3'
import '../styles/timer.css'

const clamp = (n, a, b) => Math.max(a, Math.min(b, n))

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function TimerDisplay() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const chimeRef = useRef(null)
  const clickRef = useRef(null)

  useEffect(() => {
    chimeRef.current = new Audio(chime)
    clickRef.current = new Audio(click)
    chimeRef.current.volume = 0.6
    clickRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (chimeRef.current) chimeRef.current.play().catch(() => {})
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  // handle control events from Controls.jsx
  useEffect(() => {
    function onToggle() {
      if (clickRef.current) { clickRef.current.currentTime = 0; clickRef.current.play().catch(()=>{}) }
      setRunning(r => !r)
    }
    function onAdd(e) {
      if (!running) {
        setSecondsLeft(prev => clamp(prev + (e?.detail?.sec || 60), 5, 8 * 3600))
        if (clickRef.current) { clickRef.current.currentTime = 0; clickRef.current.play().catch(()=>{}) }
      }
    }
    function onSub(e) {
      if (!running) {
        setSecondsLeft(prev => clamp(prev - (e?.detail?.sec || 60), 5, 8 * 3600))
        if (clickRef.current) { clickRef.current.currentTime = 0; clickRef.current.play().catch(()=>{}) }
      }
    }
    function onReset() {
      if (clickRef.current) { clickRef.current.currentTime = 0; clickRef.current.play().catch(()=>{}) }
      setRunning(false)
      setSecondsLeft(25 * 60)
    }

    window.addEventListener('pomo:toggle', onToggle)
    window.addEventListener('pomo:add', onAdd)
    window.addEventListener('pomo:sub', onSub)
    window.addEventListener('pomo:reset', onReset)

    return () => {
      window.removeEventListener('pomo:toggle', onToggle)
      window.removeEventListener('pomo:add', onAdd)
      window.removeEventListener('pomo:sub', onSub)
      window.removeEventListener('pomo:reset', onReset)
    }
  }, [running])

  function onWheel(e) {
    e.preventDefault()
    if (running) return
    const delta = e.deltaY
    const step = e.ctrlKey ? 10 : e.shiftKey ? 60 : 60
    const change = delta < 0 ? step : -step
    setSecondsLeft(prev => clamp(prev + change, 5, 8 * 3600))
    if (clickRef.current) {
      clickRef.current.currentTime = 0
      clickRef.current.play().catch(() => {})
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        setRunning(r => !r)
      } else if ((e.key === 'r' || e.key === 'R')) {
        setRunning(false)
        setSecondsLeft(25 * 60)
      } else if (e.key === 'ArrowUp' && !running) {
        setSecondsLeft(prev => clamp(prev + 60, 5, 8 * 3600))
      } else if (e.key === 'ArrowDown' && !running) {
        setSecondsLeft(prev => clamp(prev - 60, 5, 8 * 3600))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running])

  return (
    <div className="timer-root">
      <div
        className={`timer-display ${running ? 'running' : ''}`}
        onWheel={onWheel}
        title="Scroll to change time (Shift = 1 min, Ctrl = 10 sec). Space to start/pause."
      >
        {formatDuration(secondsLeft)}
      </div>
      <div className="hint">Scroll the time to set it • Space to start/pause • Shift = 1 min</div>
    </div>
  )
}
