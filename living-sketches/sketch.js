// original images
let scannedImages = [];
// cropped parts of images
let mouth;
let talk;

// current indices for animation
let currentMouthIndex = 0;
let currentTalkIndex = 0;
// talk position and speed for movement
let talkY = 0;
let talkSpeedY = 0;
let mouthScale = 1;

let blured = (frameCount % 160) / 160 * 10;
async function setup() {
  createCanvas(800, 500);
  // load all images first
  const imagePromises = [];
  for (let i = 0; i < 5; i++) {
    imagePromises.push(loadImage("assets/image" + i + ".jpg"));
  }
  scannedImages = await Promise.all(imagePromises);
  // erase background and crop images
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 10);
  // crop parts of images
  // how to use: crop(imageArray, x, y, width, height);
  mouth = crop(scannedImages, 9, 30, 550, 360);
  talk = crop(scannedImages, 10, 250, 50, 800);

}

function draw() {
  background(178, 42, 30);

  //image(scannedImages[0], 0, 0);
  // EXAMPLES: MOUTH
  // update mouth index
  currentMouthIndex = floor((frameCount / 20) % mouth.length);
  // display mouth
  scale(5)

  image(
    mouth[currentMouthIndex],
    width / 2 - 350,
    0,
    mouth[0].width * 0.25 * mouthScale,
    mouth[0].height * 0.25 * mouthScale
  );

  for (let i = 0; i < 5; i++) {

    // TALK
    // update talk index (animation only has 4 frames)
    currentTalkIndex = floor((frameCount / 20) % talk.length);
    // move talk
    talkY += talkSpeedY;
    talkSpeedY += 0.01;
    let talkScale = 1 - 0.2 * currentTalkIndex;
    if (talkY > 500) {
      talkY = 0;
      talkSpeedY = 0;
    }
    // display talk
    push();
    translate(0, 0 - i * 10);
    rotate(radians((i - 2) * 10));

    imageMode(CENTER);

    image(

      talk[currentTalkIndex],
      width / 2 - 330,
      95,
      talk[0].width * 0.25 * talkScale,
      talk[0].height * 0.25 * talkScale
    );
    if (currentTalkIndex === 3) {
      let blurred = (frameCount / 20) % talk.length;
      filter(BLUR, blurred);
    }
    //let blurred = ((frameCount - 1) / 20) % talk.length;
    //filter(BLUR, blurred - 1);
    pop();

  }

}

// IMAGE PROCESSING FUNCTIONS
// You shouldn't need to modify these helper functions:
function crop(images, x, y, width, height) {
  const croppedImages = [];

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    croppedImages.push(images[imageIndex].get(x, y, width, height));
  }

  return croppedImages;
}
function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();
    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned :D
}
