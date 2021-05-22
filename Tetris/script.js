var GAME = {
  width: 500,
  height: 800,
  fps: 1000 / 60,
  canvasContext: null,
  background: new Image(),

}

var LEFT_SCORE = {
  x: 100,
  y: GAME.height,
  width: 150,
  height: 100,
  count: 0,
}

var RIGHT_SCORE = {
  x: 250,
  y: GAME.height,
  width: 150,
  height: 100,
  count: 0,
}

var BALL = {
  x: 250,
  y: 200,
  size: 15,
  color: "red",
  speed: 20,
  xDirection: 4,
  yDirection: 4
}

var PLAYER = {
  x: 50,
  y: 0,
  width: 20,
  height: 100,
  color: "green",
  yDirection: 0,
  speed: 40,
}

var BOT = {
  x: GAME.width - 50,
  y: 0,
  width: 20,
  height: 100,
  color: "blue",
  yDirection: 0,
  speed: 20,
}

function init() {
  GAME.background.src = "img/bg.png";

  var canvas = document.getElementById("canvas");
  _initCanvas(canvas);
  _initEventsListeners(canvas);

  GAME.background.onload = function () {
    setInterval(play, GAME.fps);
  }
}

function play() {
  draw();
  update();
}

function draw() {
  GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height + LEFT_SCORE.height);
  GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);  //Рисуем фон

  GAME.canvasContext.strokeStyle = 'red';
  GAME.canvasContext.strokeRect(LEFT_SCORE.x, LEFT_SCORE.y, LEFT_SCORE.width, LEFT_SCORE.height);
  GAME.canvasContext.strokeRect(RIGHT_SCORE.x, RIGHT_SCORE.y, RIGHT_SCORE.width, RIGHT_SCORE.height);//Рисуем поле счёта

  GAME.canvasContext.font = "30px Arial";
  GAME.canvasContext.textAlign = 'center';
  GAME.canvasContext.fillText(LEFT_SCORE.count,
    LEFT_SCORE.x + LEFT_SCORE.width / 2,
    LEFT_SCORE.y + LEFT_SCORE.height / 2 + 15);
  GAME.canvasContext.fillText(RIGHT_SCORE.count,
    RIGHT_SCORE.x + RIGHT_SCORE.width / 2,
    RIGHT_SCORE.y + RIGHT_SCORE.height / 2 + 15);//Отображаем счёт

  GAME.canvasContext.beginPath();
  GAME.canvasContext.fillStyle = BALL.color;
  GAME.canvasContext.arc(BALL.x, BALL.y, BALL.size, 0, 2 * Math.PI);
  GAME.canvasContext.fill();//Рисуем мячик

  GAME.canvasContext.fillStyle = PLAYER.color;
  GAME.canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height); //Рисуем игрока

  GAME.canvasContext.fillStyle = BOT.color;
  GAME.canvasContext.fillRect(BOT.x, BOT.y, BOT.width, BOT.height); //Рисуем бота
}

function update() {

  var playerCollision = _ballHasCollisionWithPlayer(BALL, PLAYER);
  var botCollision = _ballHasCollisionWithPlayer(BALL, BOT);

  // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
  if (BALL.y - BALL.size  < 0 || (BALL.y + BALL.size > GAME.height) || playerCollision || botCollision) {
    BALL.yDirection = -BALL.yDirection;
  }

  // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
  if (BALL.x < 0 || (BALL.x > GAME.width) || playerCollision || botCollision) {
    BALL.xDirection = -BALL.xDirection;
  }

  if (PLAYER.y + PLAYER.height > GAME.height) {
    PLAYER.y = GAME.height - PLAYER.height;
    draw();
  }

  if (BOT.y + BOT.height > GAME.height) {
    BOT.y = GAME.height - BOT.height;
    draw();
  }

  //
  if (BALL.x < 0) {
    LEFT_SCORE.count += 1;
    setStartPosition(BALL, PLAYER, BOT);


  }

  if (BALL.x > GAME.width) {
    RIGHT_SCORE.count += 1;
    setStartPosition(BALL, PLAYER, BOT);
  }

  // двигаем мячик на его скорость
  BALL.x += BALL.xDirection;
  BALL.y += BALL.yDirection;

  //меняем цвет шарика при изменении направления
  BALL.color = BALL.xDirection > 0 ? "red" : "magenta"

  //Двигаем игрока на его скорость
  PLAYER.y += PLAYER.yDirection;
  PLAYER.yDirection = 0;

  BOT.y = BALL.y - 5 * Math.random();
}

function setStartPosition(ball, player, bot) {
  //Ставим мяч на старт
  ball.x = 200;
  ball.y = 230;

  //Cтавим игрока в начальную позицию
  player.y = 250;

  //Ставим бота в начальную позицию
  bot.y = 250;

  draw();

}

function _ballHasCollisionWithPlayer(ball, p) {
  var xCollision = (ball.x + ball.size > p.x) && (ball.x < p.x + p.width);
  var yCollision = (ball.y + ball.size < p.height + p.y) && (ball.y >= p.y)
  return xCollision && yCollision;
}

function _initCanvas(canvas) {
  canvas.width = GAME.width;
  canvas.height = GAME.height + LEFT_SCORE.height;
  GAME.canvasContext = canvas.getContext("2d");
}

function _initEventsListeners(canvas) {
  document.addEventListener("keydown", _onDocumentKeyDown);
  canvas.addEventListener("mousemove", _onCanvasMouseMove);
}

function _onCanvasMouseMove(event) {
  PLAYER.y = event.clientY;
}

function _onDocumentKeyDown(event) {
  if (event.key === "ArrowUp") {
    PLAYER.yDirection = -PLAYER.speed;
  } else if (event.key === "ArrowDown") {
    PLAYER.yDirection = PLAYER.speed;
  }
}