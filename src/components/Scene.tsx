import { useApp, useTick } from "@pixi/react"
import { useEffect, useRef, useState } from "react"
import Game from "../logic/game"

const Scene = () => {
  const app = useApp()

  const [gravity, setGravity] = useState<{ x: number, y: number }>({ x: 0, y: 1 })

  const game = useRef<Game>()

  const handleMotionEvent = (e: DeviceMotionEvent) => {
    setGravity({
      x: e.accelerationIncludingGravity?.x || 0,
      y: e.accelerationIncludingGravity?.y || 1
    })
  }

  useEffect(() => {
    // const game = new Game(app)
    game.current = new Game(app)

    window.addEventListener('devicemotion', handleMotionEvent)

    return () => {
      game.current?.destroy()
      window.removeEventListener('devicemotion', handleMotionEvent)
    }
  }, [app])

  useTick(() => {
    if (game.current) {
      game.current.gravity = gravity
    }
  })

  return (<>
  </>)
}

export default Scene
