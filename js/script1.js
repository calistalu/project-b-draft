var song;
var img;
var backgroundImage;
var totalnum = 100;
var fft;
var particles = [];
var ang = 0;
var ren=[];
var imgIndex = 0;
var Mode = 0;
var drops = [];
var hasPlayed = false;

function preload() {
    song = loadSound("audio/music.mp3");
    img = loadImage('image/background.jpg'); 
    // for (var i = 1; i < 10; i++){
    //     ren[i] = loadImage('image/ren'+ i + '.pic.jpg')
    // }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    fft = new p5.FFT();
    let button = createButton('RAIN');
    button.position(width - 70, height - 30);
    button.mousePressed(changeMode);
}

function draw() {
    // imageMode(CENTER);

    // if( frameCount % 5 == 0){
    //   if(imgIndex < imgs.length -1) {
    //    imgIndex ++;
  
    //   }else{
    //     imgIndex = 0;
    //   }
    // }
    // image(ren[imgIndex], 200, 200, 200, 150 );

    image(img, 0, 0, width, height);
    background(0,150)
    fft.analyze();
    var amp = fft.getEnergy(20, 200);

    stroke(amp/1.5,100,150);
    strokeWeight(2);
    noFill();

    translate(width / 2, height / 2);


    var wave = fft.waveform();

    translate(0,100)
    rotate(ang)
    ang+=amp/250
    
    for (var t = -1; t <= 1; t += 2) {
        beginShape();
        for (var ii = 0; ii <= 180; ii += 0.5) {
            var index = floor(map(ii, 0, 180, 0, wave.length - 1));
            var r = map(wave[index], -1, 1, 150, 350);
            var x = r * sin(ii) * t;
            var y = r * cos(ii);
            vertex(x, y);
            fill(0,100)
        }
        endShape();
    
    }



    var p = new Particle();
    if(frameCount%20==0){
    particles.push(p);
    }


for (var i = particles.length - 1; i >= 0; i--) {

        particles[i].update();
        particles[i].show();

}
   
    if (Mode == 1){
        drops.push(new Drop(random(width), 0, 0))

    for (let i = 0; i < drops.length; i++) {
     drops[i].show();
        drops[i].update();
    }
    
    }
   
    
}
function mousePressed() {
    if (!hasPlayed) {
      song.play();
      hasPlayed = true;
    }
  }


class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.a = random(360);
        this.spd = 0.5;
        this.acc = random(0.01, 0.02);
      this.size=random(10,20)
    }

    update(cond) {
        this.x = this.r * sin(this.a);
        this.y = this.r * cos(this.a);
        this.r += this.spd;
        if (cond) {
            this.spd += this.acc;
        }
        if (this.x < -width / 2 || this.x > width / 2 || this.y < -width / 2  || this.y > width / 2 ){
            let index = particles.indexOf(this);
            particles.splice(index, 1);
        }
    }

    show() {
        noStroke();
        this.x = this.r * sin(this.a);
        this.y = this.r * cos(this.a);
        for(let i = 0; i<this.size; i+=0.4){
      fill(250, 248, 215,6);
      circle(this.x,this.y,i);
    }
    }
}

class Drop{
    constructor(x, y){
      this.pos = createVector(x, y)
      this.vel = createVector(0, random(3, 6))
      this.length = random(10, 20)
      this.strength = random(255)
    }
    show(){
      stroke(255, this.strength)
      line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.length)
    }
    
    update(){
      this.pos.add(this.vel)
     
      if (this.pos.y > height + 100){
        drops.shift()
      }
    }
  }

function changeMode() {
    mode = 1;
  }
  