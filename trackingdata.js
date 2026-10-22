
function generatePath() {
  footprints = [];

  let steps = getSteps(selectedRow);
  let amount = steps / 100;
  let wholePrints = floor(amount);

  for (let i = 0; i < wholePrints; i++) {
    footprints.push(1);
  }

  if (amount - wholePrints > 0) {
    footprints.push(amount - wholePrints);
  }

  // Start at a random point on the screen
  let x = random(70, width - 70);
  let y = random(300, height - 100);

  let angle = random(TWO_PI);
  let spacing = 28;

  for (let i = 0; i < footprints.length; i++) {
    let turn = random(-0.65, 0.65);
    angle += turn;

    // Keep the walking path inside the screen
    let nextX = x + cos(angle) * spacing;
    let nextY = y + sin(angle) * spacing;

    if (
      nextX < 45 || nextX > width - 45 ||
      nextY < 270 || nextY > height - 50
    ) {
      angle += PI + random(-0.5, 0.5);
      nextX = x + cos(angle) * spacing;
      nextY = y + sin(angle) * spacing;
    }

    x = constrain(nextX, 45, width - 45);
    y = constrain(nextY, 270, height - 50);

    footprints[i] = {
      x: x,
      y: y,
      opacity: footprints[i],
      angle: angle + (i % 2 === 0 ? -0.3 : 0.3)
    };
  }
}

function draw() {
  background(18, 17, 25);

  if (!table || table.getRowCount() === 0) return;

  let date = table.getString(selectedRow, "Date");
  let steps = getSteps(selectedRow);
  let day = table.getString(selectedRow, "Day of Week");
  let activity = table.getString(selectedRow, "Activity Level");
  let location = table.getString(selectedRow, "Location");

  // Heading
  noStroke();
  fill(255, 225, 244);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("My Daily Footsteps", width / 2, 65);

  fill(255);
  textSize(19);
  text(day + ", " + date, width / 2, 115);

  textSize(25);
  text(steps.toLocaleString("en-US") + " steps", width / 2, 155);

  fill(245, 170, 220);
  textSize(16);
  text((steps / 100).toFixed(2) + " footprints", width / 2, 185);

  // Details in the top-left corner
  textAlign(LEFT, CENTER);
  fill(220);
  textSize(14);
  text("Activity: " + activity, 25, 35);
  text("Location: " + location, 25, 57);

  // Draw the winding walking path
  for (let i = 0; i < footprints.length; i++) {
    let foot = footprints[i];

    drawFootprint(
      foot.x,
      foot.y,
      foot.opacity,
      foot.angle
    );
  }

  fill(190);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Each footprint represents 100 steps",
       width / 2, height - 20);
}

function drawFootprint(x, y, opacity, angle) {
  push();
  translate(x, y);
  rotate(angle);

  noStroke();

  // Soft pink footprints
  fill(255, 160, 220, 230 * opacity);

  // Heel
  ellipse(0, 5, 10, 15);

  // Sole
  ellipse(0, -3, 12, 13);

  // Toes
  ellipse(-5, -10, 4, 5);
  ellipse(-2, -13, 4, 5);
  ellipse(2, -13, 4, 5);
  ellipse(5, -10, 4, 5);
  ellipse(7, -6, 3, 4);

  pop();
}

// Generate a new path whenever the date changes
function changeData() {
  selectedRow = Number(dateMenu.value());
  generatePath();
  redraw();
}
