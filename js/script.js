let cam;
const total = 100;
let offset = 0;

let m = 0;
let mchange = 0;

let globe = [];
for (let i = 0; i < total + 1; i++) {
  globe[i] = [];
}

let song;
let amplitude;

let img;

function preload() {
  song = loadSound("audil/music.mp3");
}

function setup() {
  amplitude = new p5.Amplitude();
  img = createImage(width, height); 
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("canvasContainer");
  cam = createEasyCam();
  background(0)

  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;

      let distance = dist(mouseX, mouseY, x, y);

      let r = map(distance, 0, img.width / 2, 100, 250);
      let g = 180;
      let b = map(distance, 0, img.width / 2, 230, 160);

      img.pixels[index + 0] = r; // R
      img.pixels[index + 1] = g; // G
      img.pixels[index + 2] = b; // B
      img.pixels[index + 3] = 255; // A
    }
  }
  img.updatePixels();

  image(img, 0, 0);
}

function supershape(theta, m, n1, n2, n3) {
  let t1 = abs(cos(m * theta / 4));
  t1 = pow(t1, n2);
  let t2 = abs(sin(m * theta / 4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  let r = pow(t3, -1 / n1);
  return r;
}

function mousePressed() {
  song.loop();
}

function draw() {
  let level = amplitude.getLevel();
  m = map(level, 0,1,0,8);

  background(0);
  noStroke();
  lights();
  let r = 200;

  for (let i = 0; i < total + 1; i++) {
    let lat = map(i, 0, total, -HALF_PI, HALF_PI);
    let r2 = supershape(lat, m, 10, 10, 10);

    for (let j = 0; j < total + 1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      let r1 = supershape(lon, m, 10, 10, 10);
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }

  offset += 10;
  for (let i = 0; i < total; i++) {
    let r = map(i, 0, total, 0, 255 * 6)
    let g = 100;
    let b = 150;
    fill((r+offset)%255,g,b)
    stroke(255);

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}