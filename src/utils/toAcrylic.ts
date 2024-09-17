import { Canvas, FabricImage } from "fabric"

const toAcrylic = async (
  imagePath: string,
  scale: number = 1
) => {
  return await FabricImage.fromURL(imagePath).then(
    img => {
      const maxDimension = 256 * scale
      const scaleFactor = maxDimension / Math.max(img.width, img.height)
      img.scale(scaleFactor)

      img.set({
        left: 8,
        shadow: {
          color: 'black',
          blur: 8,
        }
      })

      const canvas = new Canvas(
        void 0,
        {
          width: img.width * scaleFactor + 16,
          height: img.height * scaleFactor + 16,
        }
      )

      canvas.add(img)

      canvas.renderAll()

      return canvas.toDataURL()
    })
}

export default toAcrylic