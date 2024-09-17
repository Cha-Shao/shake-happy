const choice = <T>(
  arr: T[]
): T => arr[Math.floor(Math.random() * arr.length)]

export default choice
