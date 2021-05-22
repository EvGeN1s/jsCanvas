var GAME = {
  width: 700,
  height: 500,
  fps: 1000 / 60,
  canvasContext: null,
  background: new Image(),
}

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
  update();
}

function draw() {
  GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height + SCORE.height);
  GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);  //Рисуем фон

  drawRect(SCORE.x, SCORE.y, SCORE.width, SCORE.height,'#172940');
  GAME.canvasContext.fillStyle = '#172940';
  GAME.canvasContext.strokeRect(SCORE.x, SCORE.y, SCORE.width, SCORE.height);


  GAME.canvasContext.font = "30px Arial";
  GAME.canvasContext.textAlign = 'center';
  GAME.canvasContext.fillStyle = '#fff';
  GAME.canvasContext.fillText('Your score:' + SCORE.count,
    SCORE.x + SCORE.width / 2,
    SCORE.y + SCORE.height / 2 + 15);

  drawRect(BLOCK.x, BLOCK.y, BLOCK.width, BLOCK.height);

  drawGround();
}

function update() {
  if (Math.floor(BLOCK.y + BLOCK.height) >= GAME.height) {
    addToGround();
    BLOCK = createBlock();

    draw();
  }
  if (BLOCK.x + BLOCK.width >= GAME.width) {
    BLOCK.x = GAME.width - BLOCK.width;
    draw();
  }
  if (BLOCK.x <= 0) {
    BLOCK.x = 0;
    draw();
  }

  // Если блок присоединился к земле
  if (GROUND[BLOCK.x / BLOCK.speed][Math.floor((BLOCK.y + BLOCK.width) / BLOCK.speed)] === 1) {
    addToGround();
    BLOCK = createBlock();
  }

  checkGroundLine();
  BLOCK.y += 2;

  for (let i = 0; i < (GAME.width / BLOCK.speed);i ++){
    if(GROUND[i][1] === 1)
    {
       alert(' You was nice \n  Your score:' + SCORE.count + '\n  Restart page to try again');
    }
  }

}

function createBlock() {
  let x = 250;
  let y = 0;
  let width = 50;
  let height = 50;
  return new Block(x, y, width, height);
}

function addToGround() {
  SCORE.count += 1;
  GROUND[BLOCK.x / BLOCK.speed][Math.floor(BLOCK.y / BLOCK.speed)] = 1;
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
      clearLine(j);
      moveDownGround(j);
      SCORE.count += 10;
    }
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
    BLOCK.y = BLOCK.y + BLOCK.speed;
  } else if (event.key === "ArrowRight") {
    BLOCK.x = BLOCK.x + BLOCK.speed;
    //Если блок ударился о левый край земли
    if ((GROUND[BLOCK.x / BLOCK.speed][Math.floor(BLOCK.y / BLOCK.speed)] === 1)
      || ((GROUND[BLOCK.x / BLOCK.speed][Math.floor(BLOCK.y / BLOCK.speed) - 1] === 1)))
    {
      BLOCK.x -= BLOCK.speed;
      draw();
    }
  } else if (event.key === "ArrowLeft") {
    BLOCK.x = BLOCK.x - BLOCK.speed;
    //Если блок ударился о правый край земли
    if ((GROUND[BLOCK.x / BLOCK.speed][Math.floor(BLOCK.y / BLOCK.speed)] === 1)
      || ((GROUND[BLOCK.x / BLOCK.speed][Math.floor(BLOCK.y / BLOCK.speed) - 1] === 1)))
    {
      BLOCK.x += BLOCK.speed;
      draw();
    }
  }
}

