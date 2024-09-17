type Point = { x: number, y: number }

function QuickHull(points: Point[]): Point[] {
  if (points.length < 2) {
    throw new Error("2 points")
  }

  const convexHull: Point[] = []

  // Find leftmost and rightmost points
  let leftMost = points[0]
  let rightMost = points[0]
  for (const point of points) {
    if (point.x < leftMost.x) {
      leftMost = point
    }
    if (point.x > rightMost.x) {
      rightMost = point
    }
  }

  convexHull.push(leftMost)
  convexHull.push(rightMost)

  const S1 = points.filter(p => isRightOfLine(leftMost, rightMost, p))
  const S2 = points.filter(p => isRightOfLine(rightMost, leftMost, p))

  FindHull(S1, leftMost, rightMost, convexHull)
  FindHull(S2, rightMost, leftMost, convexHull)

  return convexHull
}

function FindHull(points: Point[], P: Point, Q: Point, hull: Point[]): void {
  if (points.length === 0) {
    return
  }

  // Find the farthest point from the line segment PQ
  let farthestPoint = points[0]
  let maxDistance = -Infinity
  for (const point of points) {
    const distance = distanceFromLine(P, Q, point)
    if (distance > maxDistance) {
      maxDistance = distance
      farthestPoint = point
    }
  }

  hull.splice(hull.indexOf(Q), 0, farthestPoint)

  const S1 = points.filter(p => isRightOfLine(P, farthestPoint, p))
  const S2 = points.filter(p => isRightOfLine(farthestPoint, Q, p))

  FindHull(S1, P, farthestPoint, hull)
  FindHull(S2, farthestPoint, Q, hull)
}

function isRightOfLine(A: Point, B: Point, P: Point): boolean {
  return (B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x) > 0
}

function distanceFromLine(A: Point, B: Point, P: Point): number {
  return Math.abs((B.y - A.y) * P.x - (B.x - A.x) * P.y + B.x * A.y - B.y * A.x) /
    Math.sqrt((B.y - A.y) ** 2 + (B.x - A.x) ** 2)
}

export default QuickHull

// 示例使用
const points: Point[] = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 1 },
  { x: 0, y: 3 },
  { x: 3, y: 3 },
]

const convexHull = QuickHull(points)
console.log(convexHull)