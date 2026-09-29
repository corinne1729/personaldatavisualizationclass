let hatImg;

// Game variables
let score = 0;
let playerY;

// Falling Snowballs
let snowballX = [100, 250, 400, 550, 700];
let snowballY = [-50, -200, -350, -100, -250];
let snowballSpeed = [3, 4, 3.5, 5, 4.5];

// Falling Rocks
let rockX = [180, 480, 650];
let rockY = [-150, -400, -300];
let rockSpeed = [4, 5, 4.5];

// Game State variables
let startGameBool = true;
let winGameBool = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  playerY = height - 80;
}

function draw() {
  if (startGameBool == true) {
    startGame();
  }

  if (winGameBool == true) {
    winGame();
  }
}

function startGame() {
  background(160, 210, 255);

  // player
  if (hatImg) {
    image(hatImg, mouseX, playerY, 100, 100);
  } else {
    // Simple drawing fallback
    fill(255, 220, 180);
    ellipse(mouseX, playerY + 15, 50, 50); // Face
    fill(0);
    ellipse(mouseX - 10, playerY + 10, 6, 6); // Left eye
    ellipse(mouseX + 10, playerY + 10, 6, 6); // Right eye
    fill(34, 139, 34);
    triangle(
      mouseX - 35, playerY,
      mouseX + 35, playerY,
      mouseX, playerY - 45
    )
  }

  for (let i = 0; i < snowballX.length; i++) {
    snowballY[i] = snowballY[i] + snowballSpeed[i];

    // Draw Snowball
    fill(255);
    stroke(200);
    ellipse(snowballX[i], snowballY[i], 30, 30);

    // Collision check with player
    let d = dist(mouseX, playerY, snowballX[i], snowballY[i]);
    if (d < 45) {
      score = score + 1;
      snowballY[i] = random(-200, -50);
      snowballX[i] = random(50, width - 50);
    }

    // Reset if it goes off bottom of screen
    if (snowballY[i] > height + 20) {
      snowballY[i] = random(-200, -50);
      snowballX[i] = random(50, width - 50);
    }
  }

  // loop and collision
  for (let i = 0; i < rockX.length; i++) {
    rockY[i] = rockY[i] + rockSpeed[i];

    // Draw Rock
    fill(120);
    stroke(0);
    ellipse(rockX[i], rockY[i], 35, 35);

    // Collision check with player
    let d = dist(mouseX, playerY, rockX[i], rockY[i]);
    if (d < 45) {
      score = score - 5;
      rockY[i] = random(-300, -100);
      rockX[i] = random(50, width - 50);
    }

    // Reset if it goes off bottom of screen
    if (rockY[i] > height + 20) {
      rockY[i] = random(-300, -100);
      rockX[i] = random(50, width - 50);
    }
  }

  // Score display
  fill(0);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  textSize(16);
  text("Catch Snowballs (+1) | Avoid Rocks (-5)", 20, 55);
  textAlign(CENTER, CENTER);

  // Check Win Condition
  if (score >= 30) {
    startGameBool = false;
    winGameBool = true;
  }
}

function winGame() {
  background(34, 139, 34);

  fill(255);
  textSize(48);
  text("You Win!", width / 2, height / 2 - 40);

  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 20);
  text("Press 'r' to Play Again!", width / 2, height / 2 + 70);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    score = 0;
    
    // Reset positions
    for (let i = 0; i < snowballX.length; i++) {
      snowballY[i] = random(-300, -50);
      snowballX[i] = random(50, width - 50);
    }
    for (let i = 0; i < rockX.length; i++) {
      rockY[i] = random(-400, -100);
      rockX[i] = random(50, width - 50);
    }

    winGameBool = false;
    startGameBool = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  playerY = height - 80;
}