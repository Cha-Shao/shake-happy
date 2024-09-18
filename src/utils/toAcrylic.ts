import { Canvas, FabricImage } from "fabric"

const toAcrylic = async (
  imagePath: string,
  width: number
) => {
  return await FabricImage.fromURL(imagePath).then(
    img => {
      const scale = width / img.width
      img.scale(scale)

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
          width: img.width * scale + 16,
          height: img.height * scale + 16,
        }
      )

      canvas.add(img)

      canvas.renderAll()

      return canvas.toDataURL()
    })
}

export default toAcrylic