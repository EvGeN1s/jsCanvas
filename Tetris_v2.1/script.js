var GAME = {
  width: 700,
  height: 800,
  fps: 1000 / 60,
  canvasContext: null,
  background: new Image(),
}

var FIGURE = new Figure(350, 0, 'line1');
FIGURE.setFigureParams();
FIGURE.createFigure();


var GROUND = [[]];

var SCORE = {
  x: 0,
  y: GAME.height,
  width: GAME.width,
  height: 100,
  count: 0,
}

var BLOCK = createBlock();

function init() {
  GAME.background.src = "img/bg3.png";

  var canvas = document.getElementById("canvas");
  _initCanvas(canvas);
  for (let i = 0; i < (GAME.width / BLOCK.speed); i++) {
    GROUND[i] = [];
    for (let j = 0; j < (GAME.height / BLOCK.speed); j++) {
      GROUND[i][j] = 0;
    }
  }

  _initEventsListeners();



  GAME.background.onload = () => {
    setInterval(play, GAME.fps);
  }
}

function play() {
  draw();
  for (let block of FIGURE.blocks) {
    update(block);
  }
}

function draw(block = BLOCK) {
  GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height + SCORE.height);
  GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);  //Рисуем фон

  GAME.canvasContext.strokeRect(SCORE.x, SCORE.y, SCORE.width, SCORE.height);

  GAME.canvasContext.font = "30px Arial";
  GAME.canvasContext.textAlign = 'center';
  GAME.canvasContext.fillText(SCORE.count,
    SCORE.x + SCORE.width / 2,
    SCORE.y + SCORE.height / 2 + 15);

  //drawRect(block.x, block.y, block.width, block.height);
  drawFigure();

  drawGround();
}

function update(block) {

  if (Math.floor(block.y + block.height) >= block.height) {
    addToGround();
    FIGURE.setFigureParams()
    FIGURE.createFigure();
    draw();
  }
  if (block.x + block.width >= GAME.width) {
    block.x = GAME.width - block.width;
    draw();
  }
  if (block.x <= 0) {
    block.x = 0;
    draw();
  }

  // Если блок присоединился к земле
  if (GROUND[block.x / block.speed][Math.floor((block.y + block.width) / block.speed)] === 1) {
    addToGround();
    //BLOCK = createBlock();
  }

  checkGroundLine();
  //BLOCK.y += 1;

}

function createBlock() {
  let x = 250;
  let y = 0;
  let width = 50;
  let height = 50;
  return new Block(x, y, width, height);
}

function addToGround() {

  for (let block of FIGURE.blocks) {
    console.log(block.x / block.speed, '  ', Math.floor(block.y / block.speed))
    GROUND[block.x / block.speed][Math.floor(block.y / block.speed)] = 1;
  }
}

function checkGroundLine() {
  for (let j = 0; j < (GAME.height / BLOCK.speed); j++) {
    let isFull = true;
    let i = 0;
    while ((isFull) && (i < (GAME.width / BLOCK.speed))) {
      isFull = (GROUND[i][j] === 1);
      i++;
    }
    if (isFull) {
      console.log('full');
      clearLine(j);
      moveDownGround(j);
      SCORE.count += 1;
    }
  }
}

function drawFigure() {
  for (let block of FIGURE.blocks) {
    drawRect(block.x, block.y, block.width, block.height)
  }
}
function drawRect(x, y, width, height, color = "red", lineColor = "#000") {
  GAME.canvasContext.beginPath();
  GAME.canvasContext.fillStyle = color;
  GAME.canvasContext.strokeStyle = lineColor;
  GAME.canvasContext.fillRect(x, y, width, height);
  GAME.canvasContext.strokeRect(x, y, width, height);
}

function drawGround() {
  GAME.canvasContext.beginPath();
  for (let j = 0; j < (GAME.height / BLOCK.speed); j++) {
    for (let i = 0; i < (GAME.width / BLOCK.speed); i++) {
      if (GROUND[i][j] === 1) {
        drawRect(i * BLOCK.speed, j * BLOCK.speed, BLOCK.width, BLOCK.height);
      }
    }
  }
}



function clearLine(currWidth){
  for (let i = 0; i < (GAME.width / BLOCK.speed);i ++){
    GROUND[i][currWidth] = 0;
  }
  draw()
}

function moveDownGround(currWidth){
  for (let j = currWidth; j > 1; j--) {
    for (let i = 0; i < (GAME.width / BLOCK.speed); i++) {
      GROUND[i][j] = GROUND[i][j - 1];
    }
  }
}

function _initCanvas(canvas) {
  canvas.width = GAME.width;
  canvas.height = GAME.height + SCORE.height;
  GAME.canvasContext = canvas.getContext("2d");
}

function _initEventsListeners() {
  document.addEventListener("keydown", _onDocumentKeyDown);
}

function _onDocumentKeyDown(event) {
  if (event.key === "ArrowDown") {
    FIGURE.moveDown();
  } else if (event.key === "ArrowRight") {
    FIGURE.moveRight()
    for (let block of FIGURE.blocks) {
      //Если блок ударился о левый край земли
      if ((GROUND[block.x / block.speed][Math.floor(block.y / BLOCK.speed)] === 1)
        || ((GROUND[block.x / block.speed][Math.floor(block.y / BLOCK.speed) - 1] === 1))) {
        block.x -= block.speed;
        draw();
      }
    }
  } else if (event.key === "ArrowLeft") {
    FIGURE.moveLeft();
    for (let block of FIGURE.blocks) {
      //Если блок ударился о правый край земли
      if ((GROUND[block.x / block.speed][Math.floor(block.y / BLOCK.speed)] === 1)
        || ((GROUND[block.x / block.speed][Math.floor(block.y / BLOCK.speed) - 1] === 1))) {
        block.x += block.speed;
        draw();
      }
    }
  }
}

