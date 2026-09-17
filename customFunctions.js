let happyBool = false
let faceX

function setup(){
	createCanvas(windowWidth,windowHeight)
	background(100, 150, 245)
	faceX = width / 2
}

function draw(){
	background(100, 150, 245)

	if(happyBool == true){
		happyFace()
	}

	if(happyBool == false){
		sadFace()
	}
}

function sadFace(){
	fill(255,220,150)
	stroke(0)
	ellipse(faceX,height/2,250,250)

	fill(0)
	ellipse(faceX-50,height/2-40,25,25)
	ellipse(faceX+50,height/2-40,25,25)

	noFill()
	arc(faceX,height/2+50,100,60,PI,2*PI)
}

function happyFace(){
	fill(255,220,150)
	stroke(0)
	ellipse(faceX,height/2,250,250)

	fill(0)
	ellipse(faceX-50,height/2-40,25,25)
	ellipse(faceX+50,height/2-40,25,25)

	noFill()
	arc(faceX,height/2+20,100,60,0,PI)
}

function mousePressed(){
	happyBool = !happyBool
}

function keyPressed(){
	if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
		faceX -= 30
	} else if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
		faceX += 30
	}
}