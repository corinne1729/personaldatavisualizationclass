

let table;
let selectedDay = 0;
let dateMenu;

let footprints = [];
let ads = [];

let startTime = 0;
let animationLength = 18000;

let progress = 0;

async function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("sketch-holder");
   one = await loadImage('1.png')
   two = await loadImage('2.png')
   three = await loadImage('3.png')
   four = await loadImage('4.png')
   five = await loadImage('5.png')
   six = await loadImage('6.png')
   seven = await loadImage('7.png')
   eight = await loadImage('8.png')
   nine = await loadImage('9.png')
   ten = await loadImage('10.png')

    createCanvas(100, 100);

  
  image(one, 0, 0);

  // Resize the image.
  one.resize(50, 100);

  // Display the resized image.
  image(one, 0, 0);


   for(let i = 0; i < 10; i++){
    furbyX.push(random(30, windowWidth-30))
    furbyY.push(random(30, windowHeight-30))
   }
}


  

  table = await loadTable("PDC.csv", "csv", "header");

  // Create drudown bar
  dateMenu = createSelect();
  dateMenu.parent("controls");

  for (let i = 0; i < table.getRowCount(); i++) {
    dateMenu.option(table.getString(i, "Date"), i);
  }

  dateMenu.changed(changeDay);

  makeFootprints();

  startTime = millis();

function draw() {
  background(13, 23, 25);

  if (!table) {
    return;
  }

  
  progress = (millis() - startTime) / animationLength;
  progress = constrain(progress, 0, 1);

  let steps = Number(table.getString(selectedDay, "Daily Steps"));

  let amount = ;


  noStroke();

  for (let i = 0; i < 25; i++) {
    fill(50, 130, 110, 15);
    ellipse(
      (i * 137) % width,
      (i * 83) % height,
      100,
      100
    );
  }

  noFill();
  stroke(70, 180, 140, 70);
  strokeWeight(2);

  beginShape();

  for (let i = 0; i < amount * progress; i++) {
    curveVertex(footprints[i].x, footprints[i].y);
  }

  endShape();

  
  noStroke();

  let visibleSteps = floor(amount * progress);

  for (let i = 0; i < visibleSteps; i++) {

    let x = footprints[i].x;
    let y = footprints[i].y;

  
    fill(60, 200, 150, 25);
    ellipse(x, y, 30, 30);

    
    let side = i % 2 == 0 ? -1 : 1;

    push();

    translate(x, y);
    rotate(side * 0.3);

    fill(90, 210, 170, 170);

    ellipse(0, 0, 8, 16);
    ellipse(3, -9, 6, 7);
    ellipse(-3, -10, 5, 6);

    pop();
  }

  for (let i = 0; i < ads.length; i++) {

    let ad = ads[i];

    if (visibleSteps > ad.showAt) {

      let x = footprints[ad.showAt].x;
      let y = footprints[ad.showAt].y;

      fill(100, 230, 180, 35);
      noStroke();
      ellipse(x, y, 115, 115);

    
      fill(235, 235, 225, 240);
      rectMode(CENTER);
      rect(x, y, 85, 85, 8);

      imageMode(CENTER);

      let img = ad.image;

      let scale = min(75 / img.width, 75 / img.height);

      image(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );

      fill(120, 240, 180);
      ellipse(x + 38, y - 38, 10, 10);
    }
  }

  fill(220, 240, 225);
  noStroke();

  textAlign(LEFT);
  textSize(13);
  text("DAILY WALKING JOURNEY", 35, 35);

  textSize(26);
  text(steps.toLocaleString() + " STEPS", 35, 75);

  textSize(14);
  fill(130, 190, 165);
  text(table.getString(selectedDay, "Date"), 35, 100);

  let adsSeen = 0;

  for (let i = 0; i < ads.length; i++) {
    if (visibleSteps > ads[i].showAt) {
      adsSeen++;
    }
  }

 

  
  noStroke();
  fill(60, 90, 80);
  rect(35, 165, 180, 5, 5);

  fill(100, 220, 165);
  rect(35, 165, 180 * progress, 5, 5);

}



function makeFootprints() {

  footprints = [];

  let steps = Number(table.getString(selectedDay, "Daily Steps"));

  let amount = floor(steps / 100);

  // Start near the left side of the screen
  let x = 100;
  let y = 300;

  for (let i = 0; i < amount; i++) {

    footprints.push({
      x: x,
      y: y
    });

    // Move in a random direction
    x += random(8, 15);
    y += random(-18, 18);

  
    if (x > 850) {
      x = 100;
      y += 35;
    }

    if (y < 190) {
      y = 190;
    }

    if (y > 550) {
      y = 550;
    }
  }

  
  for (let i = 0; i < ads.length; i++) {

    ads[i].showAt = floor(random(5, amount - 5));
  }
}


function changeDay() {

  selectedDay = Number(dateMenu.value());

  makeFootprints();

  startTime = millis();
}
