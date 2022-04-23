
const generateMaze = (width, heigh) => {
  const maze = (0,generate_maze__WEBPACK_IMPORTED_MODULE_0__["default"])(width, height);
  return maze;
};

const getNeighboors = (cell, maze) => {
  const neighboors = [];
  const {
    x,
    y
  } = cell;
  const width = maze.length,
        height = maze.length;

  if (x > 0) {
    neighboors.push(maze[y][x - 1]);
  }

  if (x < width - 1) {
    neighboors.push(maze[y][x + 1]);
  }

  if (y > 0) {
    neighboors.push(maze[y - 1][x]);
  }

  if (y < height - 1) {
    neighboors.push(maze[y + 1][x]);
  }

  return neighboors;
};

const findDistance = (cell1, cell2) => {
  const x1 = cell1.x;
  const y1 = cell1.y;
  const x2 = cell2.x;
  const y2 = cell2.y;
  const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
  return distance;
};


t
