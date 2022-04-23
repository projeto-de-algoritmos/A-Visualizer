h = 600;
  const height = 600;
  const cellWidth = width / (width / 100);
  const cellHeight = height / (height / 100);
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [canvas, setCanvas] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [maze] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_util_mazeUtil__WEBPACK_IMPORTED_MODULE_1__.generateMaze)(width / 100, height / 100));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvas(canvas);
  }, [canvasRef]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (canvas == null) return;
    window.requestAnimationFrame(animate);
  }, [canvas]);

  const drawMazeCell = function (ctx, cell) {
    if (cell.top) {
      ctx.beginPath();
      ctx.moveTo(cell.x * cellWidth, cell.y * cellHeight);
      ctx.lineTo((cell.x + 1) * cellWidth, cell.y * cellHeight);
      ctx.stroke();
    }

    if (cell.right) {
      ctx.beginPath();
      ctx.moveTo((cell.x + 1) * cellWidth, cell.y * cellHeight);
      ctx.lineTo((cell.x + 1) * cellWidth, (cell.y + 1) * cellHeight);
      ctx.stroke();
    }

    if (cell.bottom) {
      ctx.beginPath();
      ctx.moveTo((cell.x + 1) * cellWidth, (cell.y + 1) * cellHeight);
      ctx.lineTo(cell.x * cellWidth, (cell.y + 1) * cellHeight);
      ctx.stroke();
    }

    if (cell.left) {
      ctx.beginPath();
      ctx.moveTo(cell.x * cellWidth, (cell.y + 1) * cellHeight);
      ctx.lineTo(cell.x * cellWidth, cell.y * cellHeight);
      ctx.stroke();
    }
  };

  const animate = function (timestamp) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";
    maze.forEach(row => {
      row.forEach(cell => {
        ctx.fillStyle = "white";
        ctx.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
        ctx.fillStyle = "black";
        drawMazeCell(ctx, cell);
      });
    });
    window.requestAnimationFrame(animate);
  };


