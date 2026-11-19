let table;
let dateMenu;
let selectedDay = 0;

let images = [];
let dots = [];
let ads = [];
let popups = [];

let startTime = 0;
let walkTime = 18000; 

// ads
let nextAdTime = 1800; 
let adGap = 2000;     

// phone message
let showPhoneMessage = false;
let phoneAnswered = false;
let phoneOff = false;

async function setup() {
  createCanvas(900, 600).parent("sketch-holder");
  rectMode(CENTER);
  imageMode(CENTER);

  for (let i = 1; i <= 10; i++) {
    images.push(await loadImage(i + ".png"));
  }

  table = await loadTable("PDC.csv", ",", "header");

  dateMenu = createSelect();
  dateMenu.parent("controls");
  for (let i = 0; i < table.getRowCount(); i++) {
    dateMenu.option(table.getString(i, "Date"), i);
  }
  dateMenu.changed(changeDay);

  makeDay();
}

function draw() {
  if (!table) return;

  let elapsed = millis() - startTime;
  let progress = constrain(elapsed / walkTime, 0, 1);
  let visibleDots = floor(dots.length * progress);
  let steps = getSteps(selectedDay);

  
  if (!phoneOff && elapsed < walkTime && elapsed > nextAdTime) {
    ads.push({
      x: random(110, width - 110),
      y: random(110, height - 110),
      img: random(images),
      closed: false
    });
    adGap = max(250, adGap * 0.85);
    nextAdTime = nextAdTime + adGap;
  }

  // phone message at 4/5 of the walk on days over 14,000 steps
  if (steps > 14000 && progress >= 0.8 && !phoneAnswered) {
    showPhoneMessage = true;
  }

  // background gets red 
  let redAmount = constrain((ads.length - 5) / 10, 0, 1);
  if (phoneOff) redAmount = 0;
  let bg = lerpColor(color(20, 23, 25), color(220, 20, 20), redAmount);
  background(bg);
  select("body").style("background", bg.toString());

  // walking dots
  noStroke();
  fill(90, 210, 170);
  for (let i = 0; i < visibleDots; i++) {
    ellipse(dots[i].x, dots[i].y, 18, 18);
  }

  // ads
  for (let ad of ads) {
    if (!ad.closed) {
      fill(235);
      rect(ad.x, ad.y, 220, 220);
      image(ad.img, ad.x, ad.y, 200, 200);
    }
  }


  if (!phoneOff) {
    for (let p of popups) {
      let age = elapsed - p.start;
      if (age > 0 && age < 4000 && !p.closed) {
        fill(235);
        rect(p.x, p.y, 300, 300);
        fill(100, 220, 165);
        rect(p.x, p.y - 136, 300, 28);
        fill(13, 23, 25);
        textAlign(LEFT);
        textSize(16);
        text("AD", p.x - 140, p.y - 130);
        image(p.img, p.x, p.y + 14, 260, 260);
      }
    }
  }

  // text
  fill(220, 240, 225);
  textAlign(LEFT);
  textSize(13);
  text("DAILY WALKING JOURNEY", 35, 35);
  textSize(26);
  text(steps.toLocaleString() + " STEPS", 35, 75);
  textSize(14);
  text(table.getString(selectedDay, "Date"), 35, 100);
  textSize(11);
  text("click an ad to close it", 35, 165);

  // phone message
  if (showPhoneMessage) {
    fill(0, 150);
    rect(width / 2, height / 2, width, height);

    fill(235);
    rect(width / 2, height / 2, 440, 220);

    fill(13, 23, 25);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Do you want to power\nyour phone off?", width / 2, height / 2 - 35);

    fill(100, 220, 165);
    rect(width / 2 - 100, height / 2 + 55, 170, 46);
    rect(width / 2 + 100, height / 2 + 55, 170, 46);

    fill(13, 23, 25);
    textSize(15);
    text("Yes, power off", width / 2 - 100, height / 2 + 55);
    text("Not now", width / 2 + 100, height / 2 + 55);
  }
}

function getSteps(row) {
  return Number(table.getString(row, "Daily Steps").replace(/,/g, ""));
}

function makeDay() {
  dots = [];
  ads = [];
  popups = [];

  nextAdTime = 2500;
  adGap = 2500;
  showPhoneMessage = false;
  phoneAnswered = false;
  phoneOff = false;

  let steps = getSteps(selectedDay);

  // random of the walk placement
  let x = random(100, 800);
  let y = random(200, 550);
  let angle = random(TWO_PI);
  let turn = 0;

  for (let i = 0; i < steps / 100; i++) {
    dots.push({ x: x, y: y });

    // every 20 dots pick a new way to turn
    if (i % 20 == 0) {
      turn = random(-0.4, 0.4);
    }
    angle = angle + turn;

    x = x + cos(angle) * 22;
    y = y + sin(angle) * 22;

    // if it hits an edge, turn toward the middle
    if (x < 40 || x > width - 40 || y < 130 || y > height - 40) {
      angle = atan2(350 - y, 450 - x);
      x = constrain(x, 40, width - 40);
      y = constrain(y, 130, height - 40);
    }
  }

 
  for (let i = 0; i < steps / 500; i++) {
    popups.push({
      start: random(2500, walkTime - 4000),
      x: random(150, width - 150),
      y: random(150, height - 150),
      img: random(images),
      closed: false
    });
  }

  startTime = millis();
}

function mousePressed() {
  // phone message buttons
  if (showPhoneMessage) {
    if (abs(mouseX - (width / 2 - 100)) < 85 && abs(mouseY - (height / 2 + 55)) < 23) {
      phoneOff = true;
      for (let ad of ads) {
        ad.closed = true;
      }
    }
    if (abs(mouseX - (width / 2 + 100)) < 85 && abs(mouseY - (height / 2 + 55)) < 23) {
      phoneAnswered = true;
    }
    if (phoneOff) {
      phoneAnswered = true;
    }
    if (phoneAnswered) {
      showPhoneMessage = false;
    }
    return;
  }

//clsoings ads
  for (let i = ads.length - 1; i >= 0; i--) {
    if (!ads[i].closed && abs(mouseX - ads[i].x) < 110 && abs(mouseY - ads[i].y) < 110) {
      ads[i].closed = true;
      return;
    }
  }

 
  for (let p of popups) {
    if (abs(mouseX - p.x) < 150 && abs(mouseY - p.y) < 150) {
      p.closed = true;
    }
  }
}

function changeDay() {
  selectedDay = Number(dateMenu.value());
  makeDay();
}
//make background red when more than 10 ads pop up
//intro explain it
//permission ot turn phone off when gets to intense and then birds chirp 