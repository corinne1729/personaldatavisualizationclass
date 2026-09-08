let happyBool = false

function setup(){
	createCanvas(windowWidth,windowHeight)
	background(255)
}

function draw(){
	background(255)

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
	ellipse(width/2,height/2,250,250)

	fill(0)
	ellipse(width/2-50,height/2-40,25,25)
	ellipse(width/2+50,height/2-40,25,25)

	noFill()
	arc(width/2,height/2+50,100,60,PI,2*PI)
}

function happyFace(){
	fill(255,220,150)
	stroke(0)
	ellipse(width/2,height/2,250,250)

	fill(0)
	ellipse(width/2-50,height/2-40,25,25)
	ellipse(width/2+50,height/2-40,25,25)

	noFill()
	arc(width/2,height/2+20,100,60,0,PI)
}

function mousePressed(){
	happyBool = !happyBool
}