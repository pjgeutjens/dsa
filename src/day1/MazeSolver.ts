const dir = [
  [0, 1], // down
  [1, 0], // right
  [0, -1], // up
  [-1, 0], // left
]


function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  // 1. Base case, off the map
  if (curr.x < 0 || curr.x > maze[0].length) {
    return false;
  }

  // 2. Base case, it's a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // 3. Base case, found the end
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end)
    return true;
  }

  // 4. Base case, been here before
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // PRE
  seen[curr.y][curr.x] = true;
  path.push(curr)
  // RECURSE
  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i]
    if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
      return true;
    }
  }
  // POST
  path.pop()

  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false))
  }

  walk(maze, wall, start, end, seen, path)

  return path;
}
