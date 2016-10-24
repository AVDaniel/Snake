var border = document.getElementById("border");
var ctx = border.getContext("2d");
var currentY = 350;
var currentX = 350;
var RIGHTKEY = 39;
var LEFTKEY = 37;
var DOWNKEY = 40;
var UPKEY = 38;
var HEAD_WIDTH = 9;
var HEAD_HEIGHT = 9;
var DELTA = 1;
var score;
var appleRangeMaxPoint = 25;
var appleRangeMinPoint = 675;
var GREEN = "#00FF00";
var BLUE = "#0000FF";
var appleX = 0;
var appleY = 0;
var APPLE_SIZE = 10;
var t = 1 * APPLE_SIZE;
var score = 0;
var stack = new FiFoStack();
var snakeMovementFrequency = 0000005;
var previousKey;
var DELTA_STEP = 5;
var FAILSCREEN = document.getElementById("failscreen");
var level = 1;

updateLevel();

FAILSCREEN.style.visibility = "hidden";

drawHead(currentX, currentY);

function clearTailDotFromScreenAndArray() {
	var point = stack.pop();
	ctx.clearRect(point[0], point[1], HEAD_WIDTH, HEAD_HEIGHT);
}



function drawHead(x, y) {
	stack.unshift([x, y]);
	ctx.fillStyle=BLUE;
	ctx.fillRect(x, y, HEAD_WIDTH, HEAD_HEIGHT);
}


function createApple() {
	appleX = Math.floor(Math.random() * ((appleRangeMaxPoint-appleRangeMinPoint)+1) + appleRangeMinPoint);
	appleY = Math.floor(Math.random() * ((appleRangeMaxPoint-appleRangeMinPoint)+1) + appleRangeMinPoint);
	ctx.fillStyle=GREEN;
	ctx.fillRect(appleX, appleY, APPLE_SIZE, APPLE_SIZE);
}
createApple();
var pressedKey;
document.addEventListener("keydown", function snakeDirection() {
	pressedKey = event.keyCode;
});

var activateMoveSnake = setInterval(snakeMovement, snakeMovementFrequency);

function snakeMovement() {
	
	function isSnakeOnBorder() {
	if((currentX <= 0) || (currentY <=0) || (currentY >= 690) || (currentX >= 690)) {
		stopSnakeMovement();
		failscreen();
	}
	}
	
	isSnakeOnBorder();

	function isHeadOnBody() {
		if(stack.size > 0) {
			for(var i=0; i<=stack.size; i++) {
				if((stack.stac[i][0] == currentX) && (stack.stac[i][1] == currentY)) {
				killSnake();
				return;
			}
			}
		}
		else {
			return;
		}
		}
	isHeadOnBody();
	
	function handleSnakeOnApple() {
	if(isSnakeOnApple()) {
	pickupApple();
	createLevel();
	}
	}
	handleSnakeOnApple();
	
	if((pressedKey == RIGHTKEY) && (previousKey !== LEFTKEY)) {
			moveRight();
	}
	if((pressedKey == LEFTKEY) && (previousKey == RIGHTKEY)) {
			moveRight();
	}
	if((pressedKey == LEFTKEY) && (previousKey !== RIGHTKEY)) {
			moveLeft();
	}
	if((pressedKey == RIGHTKEY) && (previousKey == LEFTKEY)) {
			moveLeft();
	}
	if((pressedKey == UPKEY) && (previousKey !== DOWNKEY)) {
			moveUp();
	}
	if((pressedKey == DOWNKEY) && (previousKey == UPKEY)) {
			moveUp();
	}
	if((pressedKey == DOWNKEY) && (previousKey !== UPKEY)) {
		moveDown();
	}
	if((pressedKey == UPKEY) && (previousKey == DOWNKEY)) {
			moveDown();
		}
}


function moveRight() {
	clearTailDotFromScreenAndArray();
	currentX = currentX + DELTA;
	drawHead(currentX, currentY);
	previousKey = RIGHTKEY;
}
function moveLeft() {
	clearTailDotFromScreenAndArray();
	currentX = currentX - DELTA;
	drawHead(currentX, currentY);
	previousKey = LEFTKEY;
}
function moveUp() {
	clearTailDotFromScreenAndArray();
	currentY = currentY - DELTA;
	drawHead(currentX, currentY);
	previousKey = UPKEY;
}
function moveDown() {
	clearTailDotFromScreenAndArray();
	currentY = currentY + DELTA;
	drawHead(currentX, currentY);
	previousKey = DOWNKEY;
}

function isSnakeOnApple() {
	if ((appleY - t) < (currentY) && 
	(currentY) < (appleY + t) && 
	(appleX - t) < (currentX) && 
	(currentX) < (appleX + t)) {
		return true;
		}
}

function updateScore() {
	score = score + 1;
	document.getElementById("scoreNumber").innerHTML = score;
}

function pickupApple() {
	ctx.clearRect(appleX, appleY, APPLE_SIZE, APPLE_SIZE);
	createApple();
	updateScore();
	drawHead(currentX, currentY);
	if(previousKey == RIGHTKEY) {
		currentX = currentX + DELTA_STEP;
	}
	if(previousKey == LEFTKEY) {
		currentX = currentX - DELTA_STEP;
	}
	if(previousKey == UPKEY) {
		currentY = currentY - DELTA_STEP;
	}
	if(previousKey == DOWNKEY) {
		currentY = currentY + DELTA_STEP;	
	}
	drawHead(currentX, currentY);
}


function killSnake() {
	stopSnakeMovement();
	failscreen();
	
}

function stopSnakeMovement() {
	clearInterval(activateMoveSnake);	
}

function failscreen() {
	border.style.visibility = "hidden";
	FAILSCREEN.style.visibility = "visible";
}

function retry() {
	score = 0;
	location.reload();
}

function createLevel() {
	if(score == 5) {
		levelTwo();
	}
	if(score == 10) {
		levelThree();
	}
}
function levelTwo() {
	level = 2;
	updateLevel();
	DELTA++;
}
function levelThree() {
	level = 3;
	updateLevel();
	DELTA++;
}
function updateLevel() {
	document.getElementById("levelNumber").innerHTML = level;
}






	




