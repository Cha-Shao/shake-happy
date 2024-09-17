import SceneProvider from './components/SceneProvider'
import Scene from './components/Scene'

function App() {
  return (<>
    <SceneProvider>
      <Scene />
    </SceneProvider>
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
