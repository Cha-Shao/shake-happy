import { useApp, useTick } from "@pixi/react"
import { useEffect, useRef, useState } from "react"
import Game from "../logic/game"

const groupList: Record<Group, string[]> = {
  zhao: Object.entries(
    import.meta.glob<{ default: string }>(
      '../assets/items/zhao/*.png',
      { eager: true }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ).map(([_key, value]) => value.default),
  shao: Object.entries(
    import.meta.glob<{ default: string }>(
      '../assets/items/shao/*.png',
      { eager: true }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ).map(([_key, value]) => value.default)
}

enum Group {
  zhao = 'zhao',
  shao = 'shao'
}

const Scene = () => {
  const app = useApp()

  const game = useRef<Game>()

  const [gravity, setGravity] = useState<{ x: number, y: number }>({ x: 0, y: 1 })

  // 素材列表

  const groupRaw = new URLSearchParams(window.location.search).get('group')
  const group = groupRaw && Object.keys(Group).includes(groupRaw)
    ? groupRaw as Group
    : Group.shao
  const itemList = groupList[group]

  const handleMotionEvent = (e: DeviceMotionEvent) => {
    setGravity({
      x: (e.accelerationIncludingGravity?.x ?? 0) * -0.2,
      y: (e.accelerationIncludingGravity?.y ?? 9.8) * 0.2
    })
  }

  useEffect(() => {
    game.current = new Game(app, itemList)

    window.addEventListener('devicemotion', handleMotionEvent)

    return () => {
      game.current?.destroy()
      window.removeEventListener('devicemotion', handleMotionEvent)
    }
  }, [app, itemList])

  useTick(() => {
    if (game.current) {
      game.current.gravity = gravity
    }
  })

  return (<>
  </>)
}

export default Scene
