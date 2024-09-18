import { AppProvider, Stage } from "@pixi/react"
import { Application } from "pixi.js"
import { PropsWithChildren, useState } from "react"

const SceneProvider = ({
  children,
}: PropsWithChildren) => {
  const [app, setApp] = useState<Application>()

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        backgroundAlpha: 0
      }}
      onMount={setApp}
    >
      {app && (
        <AppProvider value={app}>
          {children}
        </AppProvider>
      )}
    </Stage>
  )
}

export default SceneProvider
