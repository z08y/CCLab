let speech;
let typedText = "";
let particles = [];
let traces = [];
let showCursor = true;
let enableType = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(255, 96, 2);
  speech = new p5.Speech();
  textSize(50);
  textWrap(CHAR); //wrap overflow text
}

function draw() {
  //fake cursor
  if (showCursor) {
    background(200); //accidentally wrapped background inside and i like it

    let fakecursorX = 30 + textWidth(typedText) + 4;
    let textHeight = textAscent(typedText) + textDescent(typedText);
    let fakecursorY = 40;
    if (fakecursorX >= windowWidth) {

      fakecursorY += textHeight;
    };

    let opacity = 255 * sin(frameCount * 0.08);
    fill(0, opacity);
    noStroke();
    rect(fakecursorX, fakecursorY, 3, 60);
  }

  //text
  fill(0);
  text(typedText, 30, 40, windowWidth); //wrap overflow text!

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.display();
  }
  for (let i = 0; i < traces.length; i++) {
    let t = traces[i];
    t.melt();
    t.display();
  }
}

//press backspace and melt!

function keyTyped() {
  //prevent displaying "enter"
  if (key.length === 1 && enableType) {
    typedText += key;
    let plus = constrain(typedText.length * 0.05, 0, 1.0);
    speech.setPitch(1.0 + plus);
    speech.setRate(1.0 + plus);
    speech.setVolume(0.1 + plus);
    speech.speak(typedText);
  }
  //melt animation
  if (keyCode === 13) {
    enableType = false;
    let plus = constrain(typedText.length * 0.02, 0, 1.0);
    speech.setPitch(2.0 - plus);
    speech.setRate(2.0 - plus);
    speech.setVolume(1 - plus);
    speech.speak(typedText);

    let x = 30;
    let y = 90;
    for (let i = 0; i < typedText.length; i++) {
      let typed = typedText[i];
      let w = textWidth(typed) + 5;
      particles.push(new Particle(typed, x, y));
      traces.push(new Trace(x, w));
      x += w;
    }
    showCursor = false;
  }
}

class Particle {
  constructor(typed, x, y) {
    this.typed = typed;
    this.x = x;
    this.y = y;
    this.ySpeed = random(4, 10);
    this.opacity = 255;
  }

  move() {
    this.y += this.ySpeed;
    this.opacity = map(this.y, 0, windowHeight, 255, 10);
  }

  display() {
    //stroke(255)
    fill(0, this.opacity);
    textSize(random(50, 53));
    text(this.typed, this.x, this.y);
  }
}
class Trace {
  constructor(x, w) {
    this.x = x;
    this.y = random(50, 80);
    this.w = w;
    this.h = 0;
    this.targetH = random(windowHeight / 4, windowHeight);
    this.opacity = 255;
    //melt sound effect
    this.osc = new p5.Oscillator("triangle");
    this.oscFreqValue = 400;
    this.oscAmpValue = 0;
    this.osc.freq(this.oscFreqValue);
    this.osc.amp(0);
    this.osc.start();
  }
  melt() {
    this.h = lerp(this.h, this.targetH, 0.03);
    this.opacity = lerp(this.opacity, 200, 0.02);
    //sound
    this.oscFreqValue = map(this.h, 0, windowHeight, 400, 10, true);
    this.oscAmpValue = map(this.h, 0, windowHeight, 1.0, 0.0, true);
    this.osc.freq(this.oscFreqValue, 0.1);
    this.osc.amp(this.oscAmpValue, 0.1);
  }
  display() {
    noStroke();
    fill(0, this.opacity);
    rect(this.x, this.y, this.w, this.h);
  }
}
// ?fake cursor follows text position since i wrapped overflow text
// ?rect trace follows particle y
//? typed text longer than trace
// ?not enough interaction

// text renderer
// fixed width font