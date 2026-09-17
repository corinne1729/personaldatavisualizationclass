let xPos 
let yPos 

let xSpeed = 5
let ySpeed = 5

let score = 0

let mouseDistance

let ballSize = 50

let menuScreenBool = true
let startGameBool = false
let winGameBool = false

function setup(){
	createCanvas(windowWidth, windowHeight)
	xPos = windowWidth/2
	yPos = windowHeight/2
	

}


function draw(){
	if(menuScreenBool == true){
		startmenuScreenbool()
	}
 if(startGameBool == true){
 	startGame()

 }
 if(winGameBool == true){
 	winGame()
 }

	}
function menuScreen(){
	background(0)

	fill(255)
	text(20)
	text( ' Welcome to circle tag! Press the mouse to get started! ', 10 , 100)
	if(mouseisPressed){
		menuScreenBool = false
		startGameBool = true
	}
}

function startGame(){
	background(0)



	fill(255)
	textSize(20)
	text('Tag the ball with your mouse! Your score is '+ score+ ' points!',10,30)

	ellipse(xPos, yPos, ballSize, ballSize)
 mouseDist = dist(mouseX, mouseY, xPos, yPos)
	xPos = xPos + xSpeed
	yPos = yPos + ySpeed

	if(xPos >= windowWidth - ballSize/2 || xPos <= ballSize/2){
		xSpeed = xSpeed * -1
		fill(random(255), random(255), random(255))
	}

	if(yPos >= windowHeight -ballSize/2 || yPos <= ballSize/2){
		ySpeed = ySpeed * -1
		fill(random(255), random(255), random(255))
}

if(mouseDist < ballSize/2){
	score++
xPos = random(ballSize/2, windowWidth - ballSize/2)
yPos = random(ballSize/2, windowHeight - ballSize/2)

xSpeed = xSpeed * 1.3
ySpeed = ySpeed * 1.3
}
if(score == 5){
	startGameBool = false
	winGameBool = true
}
}
function winGame(){
	background(0)

	fill(255)
	text(20)
	text( ' You Win!', 10 , 100)

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}


