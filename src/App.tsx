import SceneProvider from './components/SceneProvider'
import Scene from './components/Scene'
import { useEffect } from 'react'

function App() {

  const setBackground = async () => {
    console.log('setBackground')
    // const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    //   .then(stream => stream)
    //   .catch(() => null)
    // if (stream) {
    //   const video = document.createElement('video')
    //   video.srcObject = stream
    //   video.onloadedmetadata = () => {
    //     video.play()
    //   }
    //   document.body.appendChild(video)
    // }
  }

  useEffect(() => {
    setBackground()
  }, [])

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
