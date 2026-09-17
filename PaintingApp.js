
let scarf
let lineBrushBool = false
let ellipseBrushBool = false
let imageBrushBool = false


async function setup(){
createCanvas(windowWidth,windowHeight)
background(255)
scarf = await loadImage('images/snowmanscarf.png')
 print(scarf)
 imageMode(CENTER)
}
function draw (){
	if(lineBrushBool == true){
		lineBrush()
	}
	if(ellipseBrushBool == true){
		ellipseBrush()

	}
	if(imageBrushBool == true){
		imageBrush()

	}



}


function lineBrush(){
		stroke(random(255),random(255), random(255))
	if(mouseIsPressed){
		line(pmouseX,pmouseY,mouseX,mouseY)
	}
}

function ellipseBrush(){
if(mouseIsPressed){
	fill(random(255),random(255), random(255))
	ellipse(mouseX,mouseY,20,20)
}
}

function imageBrush(){
	if(mouseIsPressed){
 	image(scarf,mouseX,mouseY,40,40)
 }
	
}
function keyPressed(){
	if(key === 'l'){
		lineBrushBool = true
		ellipseBrushBool = false
		imageBrushBool = false

	}
	if(key === 'e'){
		ellipseBrushBool = true
		lineBrushBool = false
		imageBrushBool = false
	}
	if(key === 's'){
		imageBrushBool = true
		lineBrushBool = false
		ellipseBrush = false
	}
	if(key === 'c'){
		ellipseBrushBool = false
		lineBrushBool = false
		imageBrushBool = false
		background(255)
	}
}


