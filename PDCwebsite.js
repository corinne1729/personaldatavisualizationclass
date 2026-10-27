
let table;
let records = [];
let selectedDay = 0;

let particles = [];
let trails = [];
let glitchAmount = 0;

function preload() {
  table = loadTable("PDC.csv", "csv,header");
}

function setup() {
  let canvas = createCanvas(850, 500);
  canvas.parent("sketch-holder");

  pixelDensity(1);
  textFont("Courier New");

  // Read the CSV records
  if (table && table.getRowCount() > 0) {
    for (let i = 0; i < table.getRowCount(); i++) {
      let date = readCell(i, "Date", 0);
      let rawSteps = readCell(i, "Daily Steps", 1);
      let steps = Number(rawSteps.replace(/,/g, ""));

      if (!Number.isFinite(steps)) {
        steps = 0;
      }

      records.push({
        date: date || "RECORD_" + (i + 1),
        steps: steps,
        activity: readCell(i, "Activity Level", -1) || "UNCLASSIFIED",
        location: readCell(i, "Location", -1) || "UNKNOWN"
      });
    }
  }

  // Create moving particles
  for (let i = 0; i < 180; i++) {
    particles.push({
      x: random(20, width - 20),
      y: random(20, height - 20),
      size: random(2, 7),
      speed: random(0.2, 1.1),
      seed: random(1000)
    });
  }

  createDateButtons();
  updateRecord();
}

function readCell(row, columnName, fallbackColumn) {
  if (!table) {
    return "";
  }

  let columnIndex = table.columns.indexOf(columnName);

  if (columnIndex !== -1) {
    return String(table.getString(row, columnIndex) || "").trim();
  }

  if (
    fallbackColumn >= 0 &&
    fallbackColumn < table.getColumnCount()
  ) {
    return String(table.getString(row, fallbackColumn) || "").trim();
  }

  return "";
}

function draw() {
  background(255);

  drawGrid();
  drawParticles();
  drawCore();
  drawInterference();
  drawTrails();
  drawCoordinates();

  if (glitchAmount > 0) {
    glitchAmount *= 0.92;
  }

  if (glitchAmount < 0.02) {
    glitchAmount = 0;
  }
}

function drawGrid() {
  stroke(232);
  strokeWeight(1);

  for (let x = 0; x <= width; x += 25) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += 25) {
    line(0, y, width, y);
  }

  noFill();
  stroke(0);
  strokeWeight(1);
  rect(10, 10, width - 20, height - 20);
}

function drawParticles() {
  let record = records[selectedDay];

  if (!record) {
    return;
  }

  let amount = map(record.steps, 0, 15000, 20, particles.length);
  amount = constrain(amount, 20, particles.length);

  for (let i = 0; i < amount; i++) {
    let p = particles[i];

    p.x += sin(frameCount * 0.01 + p.seed) * p.speed * 0.2;
    p.y += cos(frameCount * 0.012 + p.seed) * p.speed * 0.2;

    if (p.x < 15) p.x = width - 15;
    if (p.x > width - 15) p.x = 15;
    if (p.y < 15) p.y = height - 15;
    if (p.y > height - 15) p.y = 15;

    noFill();
    stroke(0);
    strokeWeight(1);
    circle(p.x, p.y, p.size);
  }
}

function drawCore() {
  let record = records[selectedDay];

  if (!record) {
    noStroke();
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("NO RECORD", width / 2, height / 2);
    return;
  }

  let size = map(record.steps, 0, 15000, 35, 125);
  size = constrain(size, 35, 125);

  push();
  translate(width / 2, height / 2);
  rotate(sin(frameCount * 0.012) * 0.08);

  noFill();
  stroke(0);
  strokeWeight(1);

  beginShape();

  for (let i = 0; i < 100; i++) {
    let angle = map(i, 0, 100, 0, TWO_PI);

    let noiseValue = noise(
      cos(angle) * 1.3 + selectedDay,
      sin(angle) * 1.3,
      frameCount * 0.004
    );

    let radius = size * (0.5 + noiseValue);

    if (glitchAmount > 0.4) {
      radius += random(-glitchAmount * 20, glitchAmount * 20);
    }

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    curveVertex(x, y);
  }

  endShape(CLOSE);

  // Lines radiating from the central shape
  for (let i = 0; i < 12; i++) {
    let angle = i * TWO_PI / 12;
    let radius = size * 0.72;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    line(0, 0, x, y);
    circle(x, y, 4);
  }

  pop();
}

function drawInterference() {
  let record = records[selectedDay];

  if (!record) {
    return;
  }

  let count = map(record.steps, 0, 15000, 5, 30);
  count = constrain(count, 5, 30);

  stroke(0, 35);
  strokeWeight(1);

  for (let i = 0; i < count; i++) {
    let x = random(15, width - 15);
    let y = random(15, height - 15);
    let lineLength = random(5, 45);

    line(x, y, min(x + lineLength, width - 15), y);
  }

  if (random(1) < glitchAmount * 0.5) {
    stroke(0);
    let y = random(20, height - 20);
    line(15, y, random(30, width - 15), y);
  }
}

function drawTrails() {
  noFill();

  for (let i = trails.length - 1; i >= 0; i--) {
    let t = trails[i];

    stroke(0, t.alpha);
    strokeWeight(1);
    circle(t.x, t.y, t.size);

    t.alpha -= 2;
    t.size += 0.15;

    if (t.alpha <= 0) {
      trails.splice(i, 1);
    }
  }
}

function drawCoordinates() {
  let record = records[selectedDay];

  if (!record) {
    return;
  }

  noStroke();
  fill(0);
  textSize(10);
  textAlign(LEFT, TOP);

  text("SEQ_" + String(selectedDay + 1).padStart(3, "0"), 22, 22);

  textAlign(LEFT, BOTTOM);
  text("X:" + int(record.steps % 999), 22, height - 20);

  push();
  translate(width - 18, height / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  text("RECORD_" + record.steps, 0, 0);
  pop();
}

function createDateButtons() {
  let list = document.getElementById("date-list");
  list.innerHTML = "";

  for (let i = records.length - 1; i >= 0; i--) {
    let button = document.createElement("button");

    button.className = "date-button";
    button.textContent = records[i].date;
    button.dataset.index = i;

    button.addEventListener("click", function () {
      selectedDay = Number(this.dataset.index);
      glitchAmount = 1;
      updateRecord();
    });

    list.appendChild(button);
  }
}

function updateSelectedButton() {
  let buttons = document.querySelectorAll(".date-button");

  buttons.forEach(function (button) {
    button.classList.toggle(
      "selected",
      Number(button.dataset.index) === selectedDay
    );
  });
}

function updateRecord() {
  if (records.length === 0) {
    document.getElementById("location").textContent = "NO RECORD";
    document.getElementById("current-date").textContent = "--";
    document.getElementById("record-count").textContent = "RECORDS_0";
    document.getElementById("status").textContent = "NO_DATA";
    return;
  }

  let record = records[selectedDay];

  document.getElementById("location").textContent = record.location;
  document.getElementById("current-date").textContent = record.date;
  document.getElementById("record-count").textContent =
    "RECORDS_" + records.length;
  document.getElementById("status").textContent = "SIGNAL_ACTIVE";

  updateSelectedButton();

  for (let p of particles) {
    p.x = random(20, width - 20);
    p.y = random(20, height - 20);
  }
}

function mousePressed() {
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    glitchAmount = 1;

    trails.push({
      x: mouseX,
      y: mouseY,
      size: 5,
      alpha: 255
    });
  }
}

function mouseDragged() {
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    trails.push({
      x: mouseX,
      y: mouseY,
      size: random(3, 10),
      alpha: 180
    });

    if (trails.length > 150) {
      trails.shift();
    }
  }

  return false;
}
