import SceneProvider from "./components/SceneProvider"
import Scene from "./components/Scene"
import Webcam from "react-webcam"
import { useRef, useState } from "react"

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
        position: "fixed",
        left: "0",
        bottom: "0",
        fontSize: "0.5rem",
        zIndex: 3,
      }}>
        <p>程序：<a href="https://space.bilibili.com/23265721" target="_blank">叉烧</a></p>
        <p>绘制：<a href="https://weibo.com/u/6574434688" target="_blank">朝一</a></p>
        <p>Github：<a href="https://github.com/Cha-Shao/shake-happy" target="_blank">shake-happy</a></p>
        <p>图像禁止盈利</p>
      </div>
      <div style={{
        position: "fixed",
        inset: "0",
        zIndex: 2,
      }}>
        <SceneProvider>
          <Scene />
        </SceneProvider>
      </div>
      {useCamera && (
        <Webcam
          style={{
            position: "fixed",
            inset: "0",
            zIndex: 1,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "#f0f0f6",
          }}
          videoConstraints={{
            facingMode: "environment",
          }}
          onUserMediaError={() => setUseCamera(false)}
        />
      )}
      <div
        id="debug"
        style={{
          position: "fixed",
          inset: "0",
          opacity: "0.5",
          pointerEvents: "none",
        }}
      />
    </main>
  )
}

export default App
