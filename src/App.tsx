import SceneProvider from './components/SceneProvider'
import Scene from './components/Scene'
import Webcam from 'react-webcam'

function App() {
  return (<>
    <div style={{
      position: 'fixed',
      inset: '0',
      zIndex: 2,
    }}>
      <SceneProvider>
        <Scene />
      </SceneProvider>
    </div>
    <Webcam
      style={{
        position: 'fixed',
        inset: '0',
        zIndex: 1,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      videoConstraints={{
        facingMode: 'environment',
      }}
    />
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
