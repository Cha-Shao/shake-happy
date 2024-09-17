import { useApp } from "@pixi/react"
import { useEffect } from "react"
import Game from "../logic/game"

const Scene = () => {
  const app = useApp()
  globalThis.__PIXI_APP__ = app

  useEffect(() => {
    const game = new Game(app)

    return () => game.destroy()
  }, [])

  return (<>
  </>)
}

export default Scene
