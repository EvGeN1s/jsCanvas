var GAME = {
    width: 500,
    height: 500,
    fps: 1000 / 60,
    canvasContext: null,
    background: new Image()
}

var BALL = {
    x: 100,
    y: 0,
    size: 20,
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
    GAME.background.src = "img/bg.png"

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventsListeners(canvas)

    GAME.background.onload = function(){
        setInterval(play, GAME.fps); 
    }    
}

function play() {
    draw();
    update();
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);  //Рисуем фон

    GAME.canvasContext.fillStyle = BALL.color;
    GAME.canvasContext.fillRect(BALL.x, BALL.y, BALL.size, BALL.size); //Рисуем мячик

    GAME.canvasContext.fillStyle = PLAYER.color;
    GAME.canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height); //Рисуем игрока

    GAME.canvasContext.fillStyle = BOT.color;
    GAME.canvasContext.fillRect(BOT.x, BOT.y, BOT.width, BOT.height); //Рисуем бота
}

function update() {

    var playerCollision = _ballHasCollisionWithPlayer(BALL, PLAYER);
    var botCollision = _ballHasCollisionWithPlayer(BALL, BOT);

    // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
    if (BALL.y < 0 || (BALL.y > GAME.height) || playerCollision || botCollision) {
        BALL.yDirection = -BALL.yDirection;
    }

    // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
    if (BALL.x < 0 || (BALL.x > GAME.width) || playerCollision || botCollision) {
        BALL.xDirection = -BALL.xDirection;
    }

    // двигаем мячик на его скорость
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;

    //меняем цвет шарика при изменении направления
	BALL.color = BALL.xDirection > 0 ? "red" : "magenta"

    //Двигаем игрока на его скорость
    PLAYER.y += PLAYER.yDirection;
    PLAYER.yDirection = 0;

    BOT.y = BALL.y
}

function _ballHasCollisionWithPlayer(ball, p) {
    var xCollision = (ball.x + ball.size > p.x) && (ball.x < p.x + p.width);
    var yCollision = (ball.y + ball.size < p.height + p.y) && (ball.y >= p.y)
    return xCollision && yCollision;
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
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