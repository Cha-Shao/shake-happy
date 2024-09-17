import { Bodies, Body, Composite } from "matter-js"
import Game from "./game"

class Border {
  game: Game
  borders: Body[] = []

  constructor(game: Game) {
    this.game = game
    this.borders = [
      Bodies.rectangle(
        window.innerWidth / 2, -25, window.innerWidth, 50,
        {
          isStatic: true,
          label: "BorderTop",
        }
      ),
      Bodies.rectangle(
        window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50,
        {
          isStatic: true,
          label: "BorderBottom",
        }
      ),
      Bodies.rectangle(
        -25, window.innerHeight / 2, 50, window.innerHeight,
        {
          isStatic: true,
          label: "BorderLeft",
        }),
      Bodies.rectangle(
        window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight,
        {
          isStatic: true,
          label: "BorderRight",
        }
      ),
    ]
    Composite.add(
      this.game.engine.world,
      this.borders
    )
  }

  destroy() {
    Composite.remove(
      this.game.engine.world,
      this.borders
    )
  }
}

export default Border
