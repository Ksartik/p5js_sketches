let asuka;
let objs = [];

function preload(){
    asuka = loadImage('Media/asuka.jpg');
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    for(let i = 0; i < 20; i++){
        objs.push(new imgobj(asuka));
    }
}

function draw(){
    background(0);
    for(let ob of objs){
        ob.draw_image();
        ob.move();
    }
}

function mouseClicked(){
    for(let ob of objs){
        ob.stopVibZoom(mouseX, mouseY);
    }
}

class imgobj {
    constructor(img) {
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(0,100);
        this.img = img;
    }
    move(){
        let r = random(-5,5);
        this.x = this.x + r;
        this.y = this.y + r;
    }
    draw_image(){
        image(this.img, this.x, this.y, this.r, this.r);
    }
    stopVibZoom(x,y){
        if(x > this.x && x < this.x + this.r && y > this.y && y < this.y + this.r){
            this.draw_image = function() {
                image(this.img, 30, 30, width-60, height-60);
            }
            this.move = function(){

            }
        }
        else{
            this.move = function() {
                let r = random(-5,5);
                this.x = this.x + r;
                this.y = this.y + r;
            }
            this.draw_image = function() {
                image(this.img, this.x, this.y, this.r, this.r);
            }
        }
    }
    
}