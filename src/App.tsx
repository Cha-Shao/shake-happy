import SceneProvider from './components/SceneProvider'
import Scene from './components/Scene'
import Webcam from 'react-webcam'
import { useRef, useState } from 'react'

function App() {
  const mainRef = useRef<HTMLDivElement>(null)

  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [useCamera, setUseCamera] = useState<boolean>(true)

  return (
    <main
      ref={mainRef}
      onClick={() => {
        if (!fullScreen) {
          mainRef.current?.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
        setFullScreen(mainRef.current === document.fullscreenElement)
      }}
    >
      <div style={{
        position: 'fixed',
        inset: '0',
        zIndex: 2,
      }}>
        <SceneProvider>
          <Scene />
        </SceneProvider>
      </div>
      {useCamera && (
        <Webcam
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: 1,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#f0f0f6',
          }}
          videoConstraints={{
            facingMode: 'environment',
          }}
          onUserMediaError={() => setUseCamera(false)}
        />
      )}
      <div
        id='debug'
        style={{
          position: 'fixed',
          inset: '0',
          opacity: '0.5',
          pointerEvents: 'none',
        }}
      />
    </main>
  )
}

export default App
