import Cell from "./Cell";
import Heap from 'heap';

interface Point {
    x: number;
    y: number;
}

class Maze {
  grid;
  startPos;
  endPos;
  g_score;
  f_score;
  context;
  width;
  height;
  cellWidth;
  cellHeight;
  openSet;
  path;
  forwardPath;
  constructor(grid: Array<Array<Cell>>, context: CanvasRenderingContext2D, height: number, width: number) {
    this.grid = grid;
    this.startPos = { x: 0, y: 0 };
    this.endPos = { y: grid.length - 1, x: grid[0].length - 1 };
    this.context = context;
    this.width = width;
    this.height = height;
    this.cellHeight = this.height / grid.length;
    this.cellWidth = this.width / grid[0].length;
    this.path = new Array<Array<Cell>>();
    this.forwardPath = new Array<Cell>();
    this.g_score = new Array<Array<number>>();
    this.f_score = new Array<Array<number>>();
    for (var i = 0; i < grid.length; i++) {
      this.g_score[i] = new Array<number>(grid[i].length);
      this.f_score[i] = new Array<number>(grid[i].length);
      this.path[i] = new Array<Cell>(grid[i].length);
      for (var j = 0; j < grid[i].length; j++) {
        this.g_score[i][j] = Infinity;
        this.f_score[i][j] = Infinity;
      }
    }
     
    //a distância da celular inicial para a celula inicial é zero
    this.g_score[this.startPos.x][this.startPos.y] = 0;
    this.f_score[this.startPos.x][this.startPos.y] = this.findDistance(this.startPos, this.endPos);

    //cria uma fila de prioridade
    this.openSet = new Heap((a: Cell, b: Cell) => {
      if(this.f_score[a.y][a.x] - this.f_score[b.y][b.x] !== 0) {
        return this.f_score[a.y][a.x] - this.f_score[b.y][b.x];
      } else {
        return this.findDistance(a, this.endPos) - this.findDistance(b, this.endPos);
      }
    });
  }

  update() : Boolean {
    if(this.openSet.size() == 0){
      this.openSet.push(this.grid[this.startPos.y][this.startPos.x]);
      this.grid[this.startPos.y][this.startPos.x].queued = true;
    }
    var current = this.openSet.pop();
    if(current == null || current.x === this.endPos.x && current.y === this.endPos.y) {
      let current = this.endPos;
      while(current.x != this.startPos.x || current.y != this.startPos.y) {
        this.forwardPath.push(this.path[current.y][current.x]);
        current = this.path[current.y][current.x];
      }
      this.forwardPath.reverse();
      return true;
    }
    this.grid[current.y][current.x].visited = true;
    let neighbors = this.getNeighboors(current);
    neighbors.forEach((neighbor) => {
      console.log(neighbor);
      if(current == null) {
        return;
      }
      const temp_g_score = this.g_score[current.y][current.x] + 1;

      const temp_f_score = temp_g_score + this.findDistance(neighbor, this.endPos);
      if(temp_g_score < this.g_score[neighbor.y][neighbor.x]) {
        this.g_score[neighbor.y][neighbor.x] = temp_g_score;
        this.f_score[neighbor.y][neighbor.x] = temp_f_score;
        this.openSet.push(neighbor);
        this.grid[neighbor.y][neighbor.x].queued = true;
        this.path[neighbor.y][neighbor.x] = current;
      }
    });
    if(this.openSet.size() == 0){
      return true;
    }
    return false;
  }

  drawMaze() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    this.grid.forEach(row => {
      row.forEach(cell => {
        this.context.fillStyle = "white";
        this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
        this.context.fillStyle = "black";
        this.drawMazeCell(cell);
      });
    });
  };


  getNeighboors(cell: Cell){
    const neighbors = [];
    const {
      top, right, bottom, left, x, y
    } = cell;

    if (!left) {
      neighbors.push(this.grid[y][x - 1]);
    }

    if (!right) {
      neighbors.push(this.grid[y][x + 1]);
    }

    if (!top) {
      neighbors.push(this.grid[y - 1][x]);
    }

    if (!bottom) {
      neighbors.push(this.grid[y + 1][x]);
    }

    return neighbors;
  };

  findDistance(cell1: Cell | Point, cell2: Cell | Point){
    const x1 = cell1.x;
    const y1 = cell1.y;
    const x2 = cell2.x;
    const y2 = cell2.y;
    const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return distance;
  };


  drawMazeCell(cell: Cell) {
    let background = "white";
    if (cell.queued) {
      background = "yellow";
    }
    if (cell.visited) {
      background = "red";
    }
    if (cell.x === this.startPos.x && cell.y === this.startPos.y) {
      background = "green";
    }
    if (cell.x === this.endPos.x && cell.y === this.endPos.y) {
      background = "blue";
    }
    if(this.forwardPath.includes(cell)) {
      background = "orange";
    }
    this.context.fillStyle = background;
    this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
    if (cell.top) {
      this.context.beginPath();
      this.context.moveTo(cell.x * this.cellWidth, cell.y * this.cellHeight);
      this.context.lineTo((cell.x + 1) * this.cellWidth, cell.y * this.cellHeight);
      this.context.stroke();
    }

    if (cell.right) {
      this.context.beginPath();
      this.context.moveTo((cell.x + 1) * this.cellWidth, cell.y * this.cellHeight);
      this.context.lineTo((cell.x + 1) * this.cellWidth, (cell.y + 1) * this.cellHeight);
      this.context.stroke();
    }

    if (cell.bottom) {
      this.context.beginPath();
      this.context.moveTo((cell.x + 1) * this.cellWidth, (cell.y + 1) * this.cellHeight);
      this.context.lineTo(cell.x * this.cellWidth, (cell.y + 1) * this.cellHeight);
      this.context.stroke();
    }

    if (cell.left) {
      this.context.beginPath();
      this.context.moveTo(cell.x * this.cellWidth, (cell.y + 1) * this.cellHeight);
      this.context.lineTo(cell.x * this.cellWidth, cell.y * this.cellHeight);
      this.context.stroke();
    }
  };

}

export default Maze;
