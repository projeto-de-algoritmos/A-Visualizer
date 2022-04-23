import { useEffect, useRef, useState } from "react";
import MazeGenerator from 'generate-maze';
import MazeModel from './../model/Maze';
import Cell from "../model/Cell";

const Maze = function(){
  const width = 800, height = 600, gridWith = width / 100, gridHeight = height / 100;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSolving, setIsSolving] = useState(false);
  const [maze, setMaze] = useState<MazeModel | null>(null);
  var lastFrameUpdate = 0;
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    setContext(canvas.getContext("2d"));
  }, [canvasRef]);

  useEffect(() => {
    if(!context) return;
    setIsLoading(false);
  }, [context]);
  
  useEffect(() => {
    maze?.drawMaze();
  }, [maze]);

  const generateMaze = () => {
    if(!context) return;
    const grid: Array<Array<Cell>> = MazeGenerator(gridWith, gridHeight, true, new Date().getMilliseconds());
    const maze = new MazeModel(grid, context, height, width);
    setMaze(maze);
    console.log(maze);
  }

  const animate = (timeStamp: number) => {
    if(!maze) return
    if(timeStamp - lastFrameUpdate < 1000/2) {
      requestAnimationFrame(animate);
      return;
    }
    lastFrameUpdate = timeStamp;
    const ended = maze.update();
    maze.drawMaze();
    if(!ended){
      requestAnimationFrame(animate);
    }
    else {
      maze.drawMaze();
      setIsSolving(false);
    }
  }

  const solveMaze = () => {
    if(!maze) return;
    setIsSolving(true);
    requestAnimationFrame(animate);
  }

  return (<>
    <div style={{display: "flex", justifyContent: "center", marginBlock: "16px"}}>
      <button disabled={isLoading || isSolving} onClick={generateMaze}>Generate Maze</button>
      <button disabled={isLoading || isSolving} onClick={solveMaze} > Solve Maze </button>
    </div>
    <canvas style={{display: "block", margin: "0 auto"}} ref={canvasRef} width={width} height={height} />
  </>);
  
}

export default Maze;
