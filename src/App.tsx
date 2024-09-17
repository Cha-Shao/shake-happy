import SceneProvider from './components/SceneProvider'
import Scene from './components/Scene'
import { useEffect, useState } from 'react'

function App() {
  const [gravity, setGravity] = useState<{ x: number, y: number }>({ x: 0, y: 1 })

  const handleMotionEvent = (e: DeviceMotionEvent) => {
    setGravity({
      x: e.accelerationIncludingGravity?.x || 0,
      y: e.accelerationIncludingGravity?.y || 1
    })
  }

  useEffect(() => {
    window.addEventListener('devicemotion', handleMotionEvent)

    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent)
    }
  })

  return (<>
    <SceneProvider>
      <Scene />
    </SceneProvider>
    <div style={{
      position: 'fixed',
      background: 'black',
      top: '0',
      left: '0',
      color: 'white',
    }}>
      [{gravity.x}, {gravity.y}]
    </div>
    <div
      id='debug'
      style={{
        position: 'fixed',
        inset: '0',
        opacity: '0.5',
        pointerEvents: 'none',
      }}
    />
  </>)
}

export default App
