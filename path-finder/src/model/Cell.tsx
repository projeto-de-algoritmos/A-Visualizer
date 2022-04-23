interface Cell {
  x: number;
  y: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  set: number;
  visited?: boolean;
  queued?: boolean;
}

export default Cell;
