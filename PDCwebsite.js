

let table;
let dateMenu;
let selectedDay = 0;

let images = [];
let circles = [];
let ads = [];
let popups = [];

let startTime = 0;
let animationLength = 18000; 
let stepsPerCircle = 100; // 1 circle = 100 steps
let stepsPerAd = 1000;    // 1 ad = 1000 steps
let stepsPerPopup = 500;  // 1 pop-up = 500 steps
let popupTime = 4000;     // a pop-up stays for 4 seconds

async function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");
  rectMode(CENTER);
  imageMode(CENTER);

  // load images
  for (let i = 1; i <= 10; i++) {
    images.push(await loadImage(i + ".png"));
  }

  table = await loadTable("PDC.csv", ",", "header");

  // dropdown 
  dateMenu = createSelect();
  dateMenu.parent("controls");
  for (let i = 0; i < table.getRowCount(); i++) {
    dateMenu.option(table.getString(i, "Date"), i);
  }
  dateMenu.changed(changeDay);

  makeDay();
}

function draw() {
  background(13, 23, 25);
  if (!table) return;

  let elapsed = millis() - startTime;
  let progress = constrain(elapsed / animationLength, 0, 1);
  let visible = floor(circles.length * progress);

  
  noStroke();
  fill(90, 210, 170);
  for (let i = 0; i < visible; i++) {
    ellipse(circles[i].x, circles[i].y, 10, 10);
  }

  
  let adsSeen = 0;
  for (let ad of ads) {
    if (visible > ad.showAt && !ad.closed) {
      adsSeen++;
      fill(235, 235, 225);
      rect(ad.x, ad.y, 85, 85);
      drawImageFit(ad.image, ad.x, ad.y, 75);
    }
  }

  
  let popupsSeen = 0;
  for (let p of popups) {
    let age = elapsed - p.start;
    if (age > 0 && age < popupTime && !p.closed) {
      popupsSeen++;
      fill(235, 235, 225);
      rect(p.x, p.y, 130, 130);
      fill(100, 220, 165);
      rect(p.x, p.y - 58, 130, 14);
      fill(13, 23, 25);
      textSize(10);
      text("AD", p.x - 60, p.y - 54);
      drawImageFit(p.image, p.x, p.y + 6, 100);
    }
  }

 
  fill(220, 240, 225);
  textSize(13);
  text("DAILY WALKING JOURNEY", 35, 35);

  textSize(26);
  text(getSteps(selectedDay).toLocaleString() + " STEPS", 35, 75);

  textSize(14);
  text(table.getString(selectedDay, "Date"), 35, 100);
  
  textSize(11);
  text("click an ad to close it", 35, 165);
}


function drawImageFit(img, x, y, size) {
  let s = min(size / img.width, size / img.height);
  image(img, x, y, img.width * s, img.height * s);
}

function getSteps(row) {
  return Number(table.getString(row, "Daily Steps").replace(/,/g, ""));
}

function makeDay() {
  circles = [];
  ads = [];
  popups = [];

  let steps = getSteps(selectedDay);

  // random walk 
  let x = 100;
  let y = 300;
  for (let i = 0; i < floor(steps / stepsPerCircle); i++) {
    circles.push({ x: x, y: y });

    x += random(8, 15);
    y += random(-18, 18);

    if (x > 850) {
      x = 100;
      y += 35;
    }
    y = constrain(y, 190, 550);
  }

  
  let adCount = floor(steps / stepsPerAd);
  for (let i = 0; i < adCount; i++) {
    let spot = floor((i + 1) * circles.length / (adCount + 1));
    ads.push({
      showAt: spot,
      x: circles[spot].x,
      y: circles[spot].y + random([-1, 1]) * random(40, 70),
      image: random(images),
      closed: false
    });
  }

  
  let popupCount = floor(steps / stepsPerPopup);
  for (let i = 0; i < popupCount; i++) {
    popups.push({
      start: random(0.05, 0.9) * animationLength,
      x: random(280, 830),
      y: random(80, 530),
      image: random(images),
      closed: false
    });
  }

  startTime = millis();
}

// click an ad or pop-up to close it
function mousePressed() {
  for (let ad of ads) {
    if (abs(mouseX - ad.x) < 45 && abs(mouseY - ad.y) < 45) {
      ad.closed = true;
    }
  }
  for (let p of popups) {
    if (abs(mouseX - p.x) < 65 && abs(mouseY - p.y) < 65) {
      p.closed = true;
    }
  }
}

function changeDay() {
  selectedDay = Number(dateMenu.value());
  makeDay();
}