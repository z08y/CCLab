let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new zoeyToiletDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop

  //drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class zoeyToiletDancer {

  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.headF = 20;
    this.headM = -20;
    this.dressWiggle = 0;
    this.bounce = 0
    this.opacity = 0


  }
  update() {
    this.headF = 20 * sin(frameCount * 0.05);
    this.headM = -20 * sin(frameCount * 0.05);
    this.dressWiggle = sin(frameCount * 0.05) * 5;
    this.bounce = 15 * noise(0.1 * frameCount);
    this.opacity = 250 * sin(frameCount * 0.05);

  }
  display() {
    background(0);

    push();

    translate(this.x, this.y)

    // board
    strokeWeight(5)
    stroke(220)
    fill(250, this.opacity)
    rect(-90, -30, 200, 90)
    //arrow
    push()
    noStroke();
    fill(250)

    rect(75, 6, 20, 8)
    triangle(90, 20, 105, 10, 90, 0)
    pop();


    pop();


    push();

    translate(this.x, this.y + this.bounce);
    scale(1.2)

    noFill();

    //f
    push();
    strokeWeight(5)
    stroke(250);
    translate(10 + 10 * sin(frameCount * 0.05), 0)
    circle(this.headF, -10, 20);
    triangle(10 - this.dressWiggle, 30 - this.dressWiggle, 20, 5, 30 - this.dressWiggle, 30 + this.dressWiggle);


    line(0, 10, 20, 0);

    line(20, 0, 40, 10);

    pop()

    // m
    push();
    strokeWeight(5)
    stroke(250);
    translate(-10 - 10 * sin(frameCount * 0.05), 0)
    circle(this.headM, -10, 20);
    line(-20, 0, -20, 30);
    line(-20, 0, -40, 10);
    line(0, 10, -20, 0);
    pop()

  }


}