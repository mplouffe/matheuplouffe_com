/* PONG
 * The engine and mechanics of the game were taken from this tutorial:
 * https://robots.thoughtbot.com/pong-clone-in-javascript
 * I then adapted the game a bit so I could start and stop it
 * Added score keeping and end game menus
 * Version: 0.1
 * Date Created: 04.15.216
 * Last Update: 04.20.2016
 * Author: Matheu Plouffe
 */

// SETTING UP
// animation variables
var animate;
var stopAnimation;
var canvas;
var width;
var height;
var context;

// UI variables
var p1Score;
var p2Score;
var ui;

// game variables
var player;
var computer;
var ball;

/* setUpPong
 * sets everything up for the game including:
 * - turning off the current section element
 * - building the playing field
 * - setting up the animation and starting the game
 */
function setUpPong(){
	// turn off the page's natural section element
	var section = document.getElementsByTagName('section')[0];
	section.style.display = "none";

	// set up animate
	animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60) };
	stopAnimating = false;

	// create the canvas
	canvas = document.createElement('canvas');
	width = 400;
	height = 520;
	canvas.width = width;
	canvas.height = height;

	// set the context
	context = canvas.getContext('2d');

	// set up score and UI
	p1Score = 0;
	p2Score = 0;
	ui = document.createElement('p')

	// set up the player, computer, and ball
	player = new Player();
	computer = new Computer();
	ball = new Ball(200, 300);

	// set up the UI
	ui.setAttribute('class', 'pongUI');
	ui.innerHTML = p1Score + " | " + p2Score;

	// create the new section and build the playing field
	var pongSection = document.createElement('section');
	pongSection.appendChild(ui);
	pongSection.appendChild(canvas);
	document.getElementsByTagName('body')[0].insertBefore(pongSection, document.getElementsByTagName('aside')[0]);

	// start the animation
	animate(step);
};

// GAME ENGINE
/* step
 * the callback function that will drive the game engine
 */
var step = function() {
	if(!stopAnimating)
	{
		update();
		render();
		animate(step);
	}
};

/* update
 * calls update on all the game elements
 */
var update = function(){
	player.update();
	computer.update(ball);
	ball.update(player.paddle, computer.paddle);
};

/* render
 * renders the new positions of all the game elements after the update
 */
var render = function() {
	context.fillStyle = "#0080B1";
	context.fillRect(0,0,width, height);
	player.render();
	computer.render();
	ball.render();
};


// GAME OBJECTS
// Paddle - definition
function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}

// adding render method to the paddle object
Paddle.prototype.render = function() {
	context.fillStyle = "#FFF";
	context.fillRect(this.x, this.y, this.width, this.height);
};

// Player
function Player(){
	this.paddle = new Paddle(175, 500, 50, 10);
}

// Computer
function Computer(){
	this.paddle = new Paddle(175, 10, 50, 10);
}

// Adding a render method to the player object
Player.prototype.render = function() {
	this.paddle.render();
};

// Adding a render method to the computer object
Computer.prototype.render = function() {
	this.paddle.render();
};

// Ball
function Ball(x, y){
	this.x = x
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 3;
	this.radius = 5;
}

// Adding a render to the ball object
Ball.prototype.render = function(){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#000000";
	context.fill();
};

// Adding an update to the ball object
Ball.prototype.update = function(paddle1, paddle2){
	// move the ball based on its speed
	this.x += this.x_speed;
	this.y += this.y_speed;

	// calculate the edges of the ball collision detection
	var top_x = this.x - 5;
	var top_y = this.y - 5;
	var bottom_x = this.x + 5;
	var bottom_y = this.y + 5;

	// COLLISION DETECTION FOR PLAYING FIELD
	if(this.x - 5 < 0){
		// hitting the left wall
		this.x = 5;
		this.x_speed = -this.x_speed;
	} else if(this.x +5 > 400) {
		// hitting the right wall
		this.x = 395;
		this.x_speed = -this.x_speed;
	}
	
	// COLLISION DETECTION FOR THE END OF THE FIELD
	if(this.y < 0){
		// point scored for the player
		this.x_speed = 0;
		this.y_speed = 3;
		this.x = 200;
		this.y = 260;
		// update the scoreboard
		p1Score++;
		updateUI();
	}
	
	if(this.y > 520){
		// point scored for the computer
		this.x_speed = 0;
		this.y_speed = -3;
		this.x = 200;
		this.y = 260;
		// update the scoreboard
		p2Score++;
		updateUI();
	}

	// COLLISION DETECTION FOR BALL COLLIDING WITH PADDLES
	if(top_y > 300){
		if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
			// hit the player's paddle
			this.y_speed = -3;
			this.x_speed += (paddle1.x_speed / 2);
			this.y += this.y_speed;
		}
	} else {
		if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
			// hit the computer's paddle
			this.y_speed = 3;
			this.x_speed += (paddle2.x_speed / 2);
			this.y += this.y_speed;
		}
	}
};

// CONTROLS
// create an array of keys and add a key to it when it is pressed, remeove it when it is raised
var keysDown = {};

window.addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];
});

// add an update to Player object
// if left or right are pressed, move the paddle
Player.prototype.update = function(){
	for(var key in keysDown){
		var value = Number(key);
		if(value == 37){
			// left arrow
			this.paddle.move(-4, 0);
		} else if (value == 39) {
			// right arrow
			this.paddle.move(4, 0);
		} else {
			this.paddle.move(0, 0);
		}
	}
};

// add a move method to the paddle object
Paddle.prototype.move = function(x, y){
	// move the paddle
	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;

	// check for wall collisions
	if(this.x < 0) {
		// all the way to the left
		this.x = 0;
		this.x_speed = 0;
	} else if (this.x + this.width > 400) {
		// all the way to the right
		this.x = 400 - this.width;
		this.x_speed = 0;
	}
}

// Computer AI
// Computer will move to match the x position of the ball when the ball
// is on the computer's side of the field
Computer.prototype.update = function(ball){
	// get the y position of the ball
	var y_pos = ball.y;

	// if the y position is on the computer side of center
	if(y_pos < 260)
	{
		// calculate where the ball is relative to the paddle
		var x_pos = ball.x;
		var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);

		// set the speed towards the left or right
		if(diff < 0 && diff < -4) {
			// max speed left
			diff = -5;
		} else if(diff > 0 && diff > 4 ) {
			// max speed right
			diff = 5;
		}
		
		// move the paddle towards the ball
		this.paddle.move(diff, 0);

		// check for collision with walls
		if(this.paddle.x < 0 ){
			this.paddle.x = 0;
		} else if (this.paddle.x + this.paddle.width > 400){
			this.paddle.x = 400 - this.paddle.width;
		}
	}
};

/* update UI
 * updates the UI if a point was scored, and checks for end game conditions
 */
function updateUI(){
	// update score
	ui.innerHTML = p1Score + " | " + p2Score;

	// end game condition check
	if(p1Score >= 3){
		endGame(1);
	}
	if(p2Score >= 3){
		endGame(2);
	}
}

/* endGame
 * Stops the game engine and builds the game over screen
 */
function endGame(winner){
	// stop running the animation
	stopAnimating = true;

	// empty out the game field
	var section = document.getElementsByTagName('section')[1];
	section.innerHTML = "";

	// set up the game over screen
	// background
	var gameOverScreen = document.createElement('div');
	gameOverScreen.setAttribute('id', 'gameOverScreen');

	// title
	var gameOverTitle = document.createElement('h2');
	gameOverTitle.innerHTML = "Game Over";

	// you win / you loose message
	var gameOverWinner = document.createElement('h3');
	if(winner == 1){
		gameOverWinner.innerHTML = "You Win!";
	}
	else{
		gameOverWinner.innerHTML = "You Loose!";
	}

	// end game / new game buttons
	var endGameButton = document.createElement('button');
	endGameButton.setAttribute('id', 'end');
	endGameButton.setAttribute('class', 'pongGameButton')
	endGameButton.innerHTML = "End Game";
	endGameButton.addEventListener('click', gameOver);

	var newGameButton = document.createElement('button');
	newGameButton.setAttribute('id', 'newGame');
	newGameButton.setAttribute('class', 'pongGameButton')
	newGameButton.innerHTML = "New Game";
	newGameButton.addEventListener('click', restartGame);

	// build the game over screen and append it to the section
	gameOverScreen.appendChild(gameOverTitle);
	gameOverScreen.appendChild(gameOverWinner);
	gameOverScreen.appendChild(endGameButton);
	gameOverScreen.appendChild(newGameButton);
	section.appendChild(gameOverScreen);
}

/* gameOver
 * When 'end game' button is clicked:
 * - turns back on the page's section element
 * - removes the pong game field
 */
function gameOver(){
	// null the animation
	animate = null;

	// turn on the section
	document.getElementsByTagName('section')[0].style.display = "block";

	// remove the pong game field
	var pongSection = document.getElementsByTagName('section')[1];
	pongSection.parentNode.removeChild(pongSection);
}

/* restartGame
 * When 'new game' button is clicked:
 * - removes the pong game field
 * - calls the setUpPong method to rebuild and reset the pong field
 */
function restartGame(){
	// remove the pong game field
	var pongSection = document.getElementsByTagName('section')[1];
	pongSection.parentNode.removeChild(pongSection);

	// restart the game
	setUpPong();
}