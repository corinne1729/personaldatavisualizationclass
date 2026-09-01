let armsUp = false;
let smiling = false;
let scarf

let snowflake;

async function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER)
 scarf = await loadImage('images/snowmanscarf.png')
  print(scarf)
  imageMode(CENTER)

  // Create a snowflake image/graphic
  snowflake = createGraphics(80, 80);
  snowflake.stroke(255);
  snowflake.strokeWeight(3);

  // Draw snowflake
  snowflake.line(40, 10, 40, 70);
  snowflake.line(10, 40, 70, 40);
  snowflake.line(20, 20, 60, 60);
  snowflake.line(60, 20, 20, 60);
}

function draw() {
  background(139, 179, 217);

  // Snowflake image
  image(snowflake, 40, 50);
  image(snowflake, 480, 80);

  // Base circle
  strokeWeight(5);
  fill(255);
  stroke(0);
  ellipse(300, 600, 275, 240);

  // Middle circle
  ellipse(300,390, 210, 180);

  // Top circle
  ellipse(300, 240, 115, 115);

  // Black buttons
  stroke(0);
  strokeWeight(15);
  point(300, 680);
  point(300, 610);
  point(300, 540);
  point(300, 450);
  point(300, 394);
  point(300, 340);

  // Carrot nose
  stroke(237, 128, 12);
  fill(242, 158, 68);
  strokeWeight(1);
  triangle(250, 245, 300, 240, 300, 250);

  // Eyes
  stroke(0);
  strokeWeight(15);
  point(278, 226);
  point(320, 226);

  // Mouth
  stroke(0);
  strokeWeight(5);
  noFill();

  if (smiling) {
    // Smile
    arc(300, 255, 60, 35, 0, PI);
     image(scarf, windowWidth/2, windowHeight/2, 90,90)
  } else {
    // Resting mouth
    line(270, 265, 330, 265);
  }

  // Arms
  stroke(0);
  strokeWeight(5);

  if (armsUp) {
    // Arms up
    line(205, 350, 120, 280);
    line(395, 350, 480, 280);
  } else {
    // Arms down
    line(205, 350, 100, 375);
    line(395, 350, 490, 375);
  }
 // image(scarf, windowWidth/2, windowHeight/2)
}

// Mouse event
function mousePressed() {
  armsUp = !armsUp;
}

// Keyboard event
function keyPressed() {
  if (key === 's' || key === 'S') {
    smiling = true;
  }

  if (key === 'r' || key === 'R') {
    smiling = false;
   
  }
  
}