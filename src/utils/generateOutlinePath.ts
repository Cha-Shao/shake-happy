import { Canvas, FabricImage } from "fabric"

interface Point {
  x: number
  y: number
}

async function generateOutlinePath(
  imagePath: string,
) {
  return await FabricImage.fromURL(imagePath)
    .then(img => {
      const canvas = new Canvas(
        void 0,
        {
          width: img.width,
          height: img.height,
        }
      )

      canvas.add(img)
      canvas.renderAll()

      const ctx = canvas.getContext()
      const imageData = ctx.getImageData(0, 0, img.width, img.height)
      const data = imageData.data

      // Find edges using a simple edge detection algorithm
      const edges: Point[] = []
      for (let y = 1; y < img.height - 1; y++) {
        for (let x = 1; x < img.width - 1; x++) {
          const index = (y * img.width + x) * 4
          const alpha = data[index + 3]
          if (alpha > 0) {
            edges.push({ x, y })
          }
        }
      }

      // return edges.map(point => [point.x, point.y].join(' ')).join(' ')

      // Simplify the path to 16 points using Douglas-Peucker Algorithm
      const simplifiedPath = simplifyPath(edges, 64)

      return simplifiedPath.map(point => [point.x, point.y].join(' ')).join(' ')
    })
}

function simplifyPath(points: Point[], maxPoints: number): Point[] {
  if (points.length <= maxPoints) {
    return points
  }

  const simplified: Point[] = []
  const step = Math.ceil(points.length / maxPoints)
  for (let i = 0; i < points.length; i += step) {
    simplified.push(points[i])
  }

  return simplified
}

export default generateOutlinePath
