let ellipseX = 200
let ellipseY = 400
function setup(){
  createCanvas(600,6000)
}

function draw(){
  if(mouseX > 300 || mouseY > 300){
    background(201,119,30)
  }else{
     background(16,163,144)
  }

 // if(mouseIsPressed == true){
   // ellipseX = 500
  //  ellipseY = 100
//  }else{
  //  ellipseX = 200
  //  ellipseY = 400
//  }
  textSize(50)
  fill(0)
  text("hi corinne",50,60)
  fill(random(255),random(255), random(255))
  ellipse(mouseX,mouseY,60,60)
  if(keyIsPressed == true){
    ellipseX = 500
    ellipseY = 100
  }else{
    ellipseX = 200
    ellipseY = 400
  }
 
  ellipse(ellipseX,ellipseY,50,50)


}