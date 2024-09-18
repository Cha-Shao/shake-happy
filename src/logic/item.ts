import { Bodies, Body, Composite } from "matter-js"
import Game from "./game"
import { SCALE_MODES, Sprite, Texture } from "pixi.js"
import toAcrylic from "../utils/toAcrylic"

class Item extends Sprite {
  game: Game
  rigidBody: Body

  constructor(
    image: string,
    game: Game,
    position: { x: number, y: number } = { x: 50, y: 50 },
    width: number
  ) {
    const texture = Texture.from(
      // image,
      image,
      {
        scaleMode: SCALE_MODES.NEAREST
      }
    )
    super(texture)
    this.game = game

    this.anchor.set(0.5)

    this.position.set(position.x, position.y)
    this.rigidBody = Bodies.polygon(
      position.x,
      position.y,
      8,
      128
    )
    this.init(image, width)
  }

  async init(image: string, width: number) {
    const texture = Texture.from(
      // image,
      await toAcrylic(
        image,
        width
      ),
      {
        scaleMode: SCALE_MODES.NEAREST
      }
    )
    this.texture = texture

    this.rigidBody = Bodies.polygon(
      this.rigidBody.position.x,
      this.rigidBody.position.y,
      8,
      width / 2,
      {
        angle: Math.random() * Math.PI * 2,
      }
    )
    Composite.add(
      this.game.engine.world,
      this.rigidBody
    )
  }

  update() {
    this.position.set(
      this.rigidBody.position.x,
      this.rigidBody.position.y
    )
    this.rotation = this.rigidBody.angle
  }

  destroy() {
    Composite.remove(
      this.game.engine.world,
      this.rigidBody
    )
  }
}

export default Item