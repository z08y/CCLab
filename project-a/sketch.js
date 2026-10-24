let progress = 0;
let angle1 = 0;
let angle2 = 0;
let bodyscale = 1;

//let limbopacity = 140;
let stringtip = -90;

function setup() {
    createCanvas(800, 500);
    angleMode(DEGREES);


}

function draw() {
    background(0);
    let freq = frameCount * 1.5;
    let amp = 0.1;
    let sinValue = sin(freq) * amp * 150;
    let cosValue = cos(freq) * amp * 50;
    let trsinValue = noise(frameCount * 0.2) * 50;
    let trcosValue = noise(frameCount * 0.5) * 60;
    let limbopacity = map(mouseY, 190, 430, 200, 0);
    let flicker = map(mouseY, 190, 430, 0, 80);
    drawCreature(
        width / 2,
        height / 2,
        sinValue,
        cosValue,
        trsinValue,
        trcosValue,
        flicker,
        limbopacity
    );
}

function drawCreature(
    x,
    y,
    sinValue,
    cosValue,
    trsinValue,
    trcosValue,
    flicker,
    limbopacity,
    finalopacity
) {
    push();
    translate(x, y);

    // DRAW YOUR CREATURE HERE
    // create additional functions below and call here:
    drawBody(trsinValue, trcosValue, sinValue, cosValue, limbopacity);
    drawArm1(flicker, sinValue);
    drawArm2(flicker, sinValue);
    drawHabitat(limbopacity, trcosValue, cosValue);
    drawFinal(finalopacity, limbopacity);

    pop();
}

// DEFINE ADDITIONAL FUNCTIONS HERE
function drawBody(trsinValue, trcosValue, sinValue, cosValue, limbopacity) {
    if (
        mouseX > 350 &&
        mouseX < 450 &&
        mouseY > 190 &&
        mouseY <= 500 &&
        mouseIsPressed
    ) {
        //console.log(bodyscale);
        bodyscale = map(mouseY, 200, 501, 1, 6);

        push();
        translate(0, 30);
        translate(0, 0);

        scale(bodyscale);
        let c1 = color(91, 66, 105, 180);
        let c2 = color(250, 0);
        let amt = map(mouseY, 200, 420, 0, 1);
        let interColor = lerpColor(c1, c2, amt);

        fill(interColor);
        stroke(78, 88, 185, limbopacity);
        strokeWeight(2);
        beginShape();

        splineVertex(-32 + trsinValue, -84 + trcosValue);
        splineVertex(-110 + trcosValue, -142 + trsinValue);
        splineVertex(-143 + trsinValue, -86 + trcosValue);
        splineVertex(-119 + trcosValue, -17 + trsinValue);
        splineVertex(-56 + trsinValue, 35 + trcosValue);
        splineVertex(-22 + trcosValue, 101 + trsinValue);
        splineVertex(8 + trsinValue, 166 + trcosValue);
        splineVertex(41 + trcosValue, 101 + trsinValue);
        splineVertex(48 + trsinValue, 19 + trcosValue);
        splineVertex(102 + trcosValue, -46 + trsinValue);
        splineVertex(120 + trcosValue, -114 + trsinValue);
        splineVertex(102 + trcosValue, -176 + trsinValue);
        splineVertex(43 + trsinValue, -199 + trcosValue);
        splineVertex(0 + trcosValue, -146 + trsinValue);

        endShape(CLOSE);
        pop();
    } else {
        push();
        translate(0, 30);
        translate(-384, -245);

        scale(0.9);
        fill(91, 66, 105, 140);
        stroke(78, 88, 185);
        strokeWeight(2);
        blendMode(ADD);
        beginShape();
        splineVertex(384, 245 - sinValue);

        splineVertex(306 - sinValue, 187);
        splineVertex(273 + sinValue, 243 - sinValue);
        splineVertex(297, 312 - sinValue);
        splineVertex(360 + sinValue, 364);

        splineVertex(394, 430 - sinValue);

        splineVertex(424 - sinValue, 495 + sinValue);

        splineVertex(457 - sinValue, 430);
        splineVertex(464, 348 - sinValue);
        splineVertex(518, 283 - sinValue);
        splineVertex(536 + sinValue, 215 - sinValue);
        splineVertex(518 - sinValue, 153 + sinValue);
        splineVertex(459 + sinValue, 130 - sinValue);
        splineVertex(416, 183 + sinValue);
        endShape(CLOSE);
        pop();
    }
}

function drawArm1(flicker, sinValue) {
    push();

    translate(-77, 20);
    scale(0.9);
    if (
        angle1 > -150 &&
        mouseX > 350 &&
        mouseX < 450 &&
        mouseY > 190 &&
        mouseY <= 500 &&
        mouseIsPressed
    ) {
        angle1 = map(mouseY, 190, 450, 0, -150);
    } else {
        if (angle1 < 0) {
            angle1 = angle1 + 5;
        }
    }
    rotate(angle1);
    fill(78, 88, 185, flicker);
    blendMode(ADD);
    stroke(78, 88, 185);
    strokeWeight(1.2);

    beginShape();

    splineVertex(0, 0);
    splineVertex(-24, -117 + sinValue);
    splineVertex(-128, -188 - sinValue);
    splineVertex(-287, -88);
    splineVertex(-262 + sinValue, 3 + sinValue);
    splineVertex(-126, 37);
    splineVertex(-114, 35);
    splineVertex(-180, 4 + sinValue);
    splineVertex(-256, -22);
    splineVertex(-243, -108);
    splineVertex(-186, -100);
    splineVertex(-90, -102 + sinValue);
    splineVertex(-60, -58);

    endShape(CLOSE);
    pop();
}

function drawArm2(flicker, sinValue) {
    push();
    translate(50, 20);
    scale(0.9);
    if (
        angle2 < 150 &&
        mouseX > 350 &&
        mouseX < 450 &&
        mouseY > 190 &&
        mouseY <= 500 &&
        mouseIsPressed
    ) {
        angle2 = map(mouseY, 190, 450, 0, 150);
    } else {
        if (angle2 > 0) {
            angle2 = angle2 - 5;
        }
    }

    rotate(angle2);
    blendMode(ADD);
    fill(78, 88, 185, flicker);

    //noFill();
    stroke(78, 88, 185);
    strokeWeight(1.2);

    beginShape();

    splineVertex(0, 0);
    splineVertex(-22, -88);
    splineVertex(21, -159);
    splineVertex(92, -167 + sinValue);
    splineVertex(140, -131);
    splineVertex(311, -80);
    splineVertex(231, -2);
    splineVertex(62 - sinValue, 19 + sinValue);
    splineVertex(163, -17);
    splineVertex(210, -65);
    splineVertex(119, -71 + sinValue);
    splineVertex(66, -125);
    splineVertex(38, -40);

    endShape(CLOSE);
    pop();
}

function drawHabitat(limbopacity, trcosValue, cosValue) {
    if (mouseX > 300 && mouseX < 500 && mouseY > 220 && mouseIsPressed) {
        stringtip = mouseY - 250;
        push();
        strokeWeight(1);
        stroke(200, limbopacity);
        noFill();
        //fill(200,limbopacity-100);
        translate(0, 0);
        spline(
            -400 + mouseY / 2,
            -250,
            -280 + cosValue,
            -210 - cosValue,
            -130 + cosValue,
            -190,
            mouseX - 400,
            stringtip
        );
        spline(
            -300 + mouseY / 2,
            -250,
            -220 + cosValue,
            -200 - cosValue,
            -100 + cosValue,
            -150,
            mouseX - 400,
            stringtip
        );
        spline(
            -370 + mouseY / 2,
            -250,
            -220 + cosValue,
            -180 - cosValue,
            -100 + cosValue,
            -180,
            mouseX - 400,
            stringtip
        );
        spline(
            -200 + mouseY / 2,
            -250,
            -150 + cosValue,
            -200 - cosValue,
            -30 + cosValue,
            -150,
            mouseX - 400,
            stringtip
        );
        spline(
            -100 + mouseY / 2,
            -250,
            -100 - cosValue,
            -200 + cosValue,
            -70 - cosValue,
            -170,
            mouseX - 400,
            stringtip
        );
        spline(
            50 - mouseY / 2,
            -250,
            20 - cosValue,
            -200 + cosValue,
            10 - cosValue,
            -170,
            mouseX - 400,
            stringtip
        );
        spline(
            300 - mouseY / 2,
            -250,
            220 + cosValue,
            -200 - cosValue,
            100 + cosValue,
            -150,
            mouseX - 400,
            stringtip
        );
        spline(
            200 - mouseY / 2,
            -250,
            170 + cosValue,
            -200 - cosValue,
            60 + cosValue,
            -150,
            mouseX - 400,
            stringtip
        );
        spline(
            400 - mouseY / 2,
            -250,
            280 + cosValue,
            -180 - cosValue,
            30 + cosValue,
            -190,
            mouseX - 400,
            stringtip
        );
        spline(
            360 - mouseY / 2,
            -250,
            300 + cosValue,
            -220,
            10 + cosValue,
            -190,
            mouseX - 400,
            stringtip
        );
        pop();
    } else {
        push();
        strokeWeight(0.7);
        stroke(255, 200);

        noFill();
        //fill(255,limbopacity);
        translate(0, 0);
        spline(
            -400,
            -250,
            -280 - trcosValue,
            -210 + trcosValue,
            -130 + trcosValue,
            -190,
            -30,
            -42 + trcosValue
        );
        spline(
            -300,
            -250,
            -220 - trcosValue,
            -200,
            -100 + trcosValue,
            -150,
            -30,
            -42 + trcosValue
        );
        spline(
            -370,
            -250,
            -220 - trcosValue,
            -180 - trcosValue,
            -100 + trcosValue,
            -180 - trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            -200,
            -250,
            -150 + trcosValue,
            -200 - trcosValue,
            -30 + trcosValue,
            -150 - trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            -100,
            -250,
            -100 + trcosValue,
            -200,
            -70 + trcosValue,
            -170 + trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            50,
            -250,
            20 + trcosValue,
            -200 - trcosValue,
            0 - trcosValue,
            -170 + trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            300,
            -250,
            220 + trcosValue,
            -200 + trcosValue,
            100 - trcosValue,
            -150 - trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            200,
            -250,
            170 + trcosValue,
            -200,
            0 + trcosValue,
            -150 - trcosValue,
            -30,
            -42 + trcosValue
        );
        spline(
            400,
            -250,
            280 + trcosValue,
            -180,
            30 + trcosValue,
            -190,
            -30,
            -42 + trcosValue
        );
        spline(
            360,
            -250,
            300 - trcosValue,
            -220,
            10 + trcosValue,
            -190,
            -30,
            -42 + trcosValue
        );
        pop();
    }
}
function drawFinal(finalopacity, limbopacity) {
    if (mouseX > 350 && mouseX < 450 && mouseY > 300 && mouseIsPressed) {
        for (let i = 0; i < 100; i++) {
            let targetX = random(-400, 400);
            let targetY = random(-250, 250);
            if (mouseY > 300) {
                progress += 0.0005;
            }

            if (progress >= 1) {
                progress = 1;
            }
            translate(0, 0);
            fill(255, limbopacity + 100);
            stroke(255, limbopacity);
            let x = lerp(-20, targetX, progress);
            let y = lerp(-20, targetY, progress);

            rect(x, y, 2, 2);
        }
    }
}
function mousePressed() {
    console.log("splineVertex(" + round(mouseX) + "," + round(mouseY) + ");");
}


