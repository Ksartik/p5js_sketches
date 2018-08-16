let mayushi, tuturu, tuturuUltra;
let img;

function preload(){
    mayushi = loadImage('Media/mayushi.jpg');
    tuturu = loadSound('Media/tuturu.wav');
    tuturuUltra = loadSound('Media/tuturuUltra.mp3');
} 


function setup(){
    createCanvas(windowWidth, windowHeight);
    img = new ImageObj(mayushi, 200);
}
let a, t = 0, k = 0, j = 0;

function draw(){
    background(255,255,255);
    translate(width/2, height/2);
    img.move();
}

function mouseClicked(){
    img.tuturu(mouseX, mouseY);
}

class ImageObj {
    constructor(img, r){
        this.x = - r/2;
        this.y = - r/2;
        this.r = r;
        this.im = img;
        this.tr = r;
    }
    tuturu(x,y){
        if(x > this.x + width/2 && x < this.x + width/2 + this.r && y > this.y + height/2 && y < this.y + this.r + height/2){
            if(k >= 5){
                if(j == 0){
                    a = 2;
                    tuturuUltra.setVolume(0.5);
                    tuturuUltra.play();
                    this.move = function() {
                        rotate(Math.PI/16*Math.sin(Math.PI*t/64));
                        image(this.im, -a, -a, a*2, a*2);
                        this.x = -a;
                        this.y = -a;
                        this.r = a*2;
                        a = a + 0.5;
                        t = t + 1;
                    }
                }
                j = j + 1;
            }
            else {
                this.move = function() {
                    a = Math.PI/8 * Math.sin((k+1)*Math.PI*t/64);
                    rotate(a);                
                    image(this.im, this.x, this.y, this.r, this.r);
                    if(a == Math.PI/8){
                        tuturu.setVolume(0.5);
                        tuturu.play();
                    }
                    t = t + 1;
                }
                k = k + 1;
            }
        }
        else {
            tuturuUltra.stop();
            tuturu.stop();
            this.x = -this.tr/2;
            this.y = -this.tr/2;
            this.r = this.tr;
            k = 0;
            j = 0;
            this.move = function() {
                image(this.im, this.x, this.y, this.r, this.r);
            }
        }
    }
    move(){
        image(this.im, this.x, this.y, this.r, this.r);
    }
}