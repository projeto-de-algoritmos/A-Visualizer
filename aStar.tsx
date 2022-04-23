import { findDistance, getNeighboors } from "./mazeUtil";
import Heap from 'heap'; 
import MazeCell from "./MazeCell";

const aStar = (maze: Array<Array<MazeCell>>) => { 
  var start = maze[maze[0].length - 1][maze.length - 1];
  var end = maze[0][0];
  // armazena a distancia da posicao atual ate a posicao inicial
  var g_score = new Array(maze.length);
  var f_score = new Array(maze.length);
  for (var i = 0; i < maze.length; i++) {
    g_score[i] = new Array<Number>(maze[i].length);
    f_score[i] = new Array<Number>(maze[i].length);
    for (var j = 0; j < maze[i].length; j++) {
      g_score[i][j] = Infinity;
      f_score[i][j] = Infinity;
    }
  }

  //a distância da celular inicial para a celula inicial é zero
  g_score[start.x][start.y] = 0;
  f_score[start.y][start.y] = findDistance(start, end);

  //cria uma fila de prioridade
  var openSet = new Heap(function(a: MazeCell, b: MazeCell) {
    if(f_score[a.x][a.y] - f_score[b.x][b.y] !== 0) {
      return f_score[a.x][a.y] - f_score[b.x][b.y];
    } else {
      return findDistance(a, end) - findDistance(b, end);
    }
  });

  // variável para armazenar o caminho
  var path = new Array<Array<MazeCell>>(maze.length);
  for (var i = 0; i < maze.length; i++) {
    path[i] = new Array<MazeCell>(maze[i].length);
  }
  
  //adiciona a celula inicial na fila de prioridade
  openSet.push(start);

  //enquanto a fila de prioridade não estiver vazia
  do{
    let next = openSet.pop();
    if(next == null || next.x === end.x && next.y === end.y) {
      break;
    }
    //adiciona os vizinhos disponiveis na fila
    let neighbors = getNeighboors(next, maze);
    neighbors.forEach((neighbor) => {
      if(!next) return; 
      const temp_g_score = g_score[next.x][next.y] + 1;
      const temp_f_score = temp_g_score + findDistance(neighbor, end);
      if(temp_g_score < g_score[neighbor.x][neighbor.y]) {
        g_score[neighbor.x][neighbor.y] = temp_g_score;
        f_score[neighbor.x][neighbor.y] = temp_f_score;
        openSet.push(neighbor);
        path[neighbor.x][neighbor.y] = next;
      }
    });
  }  while(openSet.size() > 0);
  
  // Cria o vetor para armazenar o caminho
  const forwardPath = new Array<MazeCell>();
  let current = end;
  while(current.x !== start.x || current.y !== start.y) {
    forwardPath.push(current);
    current = path[current.x][current.y];
  }

  // Inverte o vetor para que o caminho seja retornado do final para o inicio
  forwardPath.reverse();
  return forwardPath;
}

export default aStar;
