import { Engine, Render, Runner } from "matter-js"
import { Application, } from "pixi.js"
import Item from "./item"
import Border from "./border"
import SkadiImage from "../assets/skadi.png"
import ChenImage from "../assets/chen.png"
import GoldenGlowImage from "../assets/goldenglow.png"
import choice from "../utils/choice"

const itemList = [
  SkadiImage,
  ChenImage,
  GoldenGlowImage,
]
const area = window.innerWidth * window.innerHeight
const itemCount = 16
const itemWidth = Math.min(
  window.innerWidth,
  window.innerHeight,
  Math.sqrt(area * 0.8 / itemCount)
)
const itemScale = itemWidth / 256
const columnCount = Math.ceil(window.innerWidth / itemWidth)

class Game {
  pixi: Application
  engine: Engine
  border: Border
  elements: Item[] = []
  gravity = { x: 0, y: 1 }

  constructor(pixi: Application) {
    this.pixi = pixi
    this.engine = Engine.create({
      gravity: this.gravity
    })
    this.border = new Border(this)

    for (let i = 0; i < itemCount; i++) {
      const item = new Item(
        choice(itemList),
        this,
        {
          x: (i % columnCount + 0.5) * itemWidth,
          y: (Math.floor(i / columnCount) + 0.5) * itemWidth
        },
        itemScale
      )
      this.pixi.stage.addChild(item)
      this.elements.push(item)
    }

    // // 测试用 物理引擎可视化
    // const render = Render.create({
    //   element: document.getElementById('debug')!,
    //   engine: this.engine,
    //   options: {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     showVelocity: true,
    //     showAngleIndicator: true,
    //   },
    // })
    // Render.run(render)
    // // create runner
    // const runner = Runner.create()
    // Runner.run(runner, this.engine)

    // 设置渲染循环
    this.pixi.ticker.add(() => this.update())
  }

  update() {
    this.engine.gravity.x = this.gravity.x
    this.engine.gravity.y = this.gravity.y
    // 60 fps
    Engine.update(this.engine, 1e3 / 60)

    for (const element of this.elements) {
      element.update()
    }
  }

  destroy() {
    for (const element of this.elements) {
      element.destroy()
      this.elements = this.elements.filter(e => e !== element)
      this.pixi.stage.removeChild(element)
    }
    this.border.destroy()
  }
}

export default Game