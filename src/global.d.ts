import { Application } from "pixi.js"

declare global {
  interface globalThis {
    __PIXI_APP__: Application
  }
}
