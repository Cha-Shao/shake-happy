import { Sprite, Texture } from "pixi.js"
import { ForwardedRef, forwardRef, useState } from "react"
import { Sprite as SpriteComponent, useTick } from "@pixi/react"
import Game from "../logic/game"
import { Bodies, Composite } from "matter-js"

interface ItemProps {
  image: string
  game: Game
}

const Item = (
  {
    image,
    game,
  }: ItemProps,
  ref: ForwardedRef<Sprite>
) => {
  const rigidBody = Bodies.rectangle(
    0, 0, 64, 64,
    {
      friction: 1e-5,
      density: 0.05,
      label: "Item",
      restitution: 0.5
    }
  )
  Composite.add(game.engine.world, rigidBody)

  const [position, setPosition] = useState<[number, number]>([0, 0])
  const [rotation, setRotation] = useState<number>(0)

  useTick(() => {
    setPosition([rigidBody.position.x, rigidBody.position.y])
    setRotation(rigidBody.angle)
  })

  return (
    <SpriteComponent
      ref={ref}
      texture={Texture.from(image)}
      anchor={0.5}
      position={position}
      rotation={rotation}
    />
  )
}

export default forwardRef(Item)
