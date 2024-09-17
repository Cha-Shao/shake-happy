// global.d.ts
import { Application } from "pixi.js";

declare global {
  interface Global {
    __PIXI_APP__: Application;
  }
}
