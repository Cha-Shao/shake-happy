import { Bodies, Body, Composite, Vertices } from "matter-js"
import Game from "./game"
import { Sprite, Texture } from "pixi.js"
import generateOutlinePath from "../utils/generateOutlinePath"

class Item extends Sprite {
  game: Game
  rigidBody: Body

  constructor(
    image: string,
    game: Game,
    position: { x: number, y: number } = { x: 50, y: 50 },
    scale: number = 1
  ) {
    const texture = Texture.from(image)
    super(texture)
    this.game = game

    this.anchor.set(0.5)
    this.scale.set(scale)

    this.position.set(position.x, position.y)
    this.rigidBody = Bodies.rectangle(0, 0, 50, 50)
    this.init(image)
  }

  async init(image: string) {
    this.rigidBody = Bodies.fromVertices(
      this.position.x,
      this.position.y,
      [Vertices.fromPath(
        await generateOutlinePath(image)
          .then(points => points.map(p => [p.x * this.scale.x, p.y * this.scale.x].join(' ')).join(' ')),
        Bodies.rectangle(0, 0, 64, 64)
      )]
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