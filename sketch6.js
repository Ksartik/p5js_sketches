let stars;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(15,14,27);
    stars = [];
    for(var i = 0; i < stars.length; i++){
        stars[i] = new Star();
    }
}

function draw() {
    for(var i = 0; i < stars.length; i++){
        stars[i].drawStar();
        stars[i].reflectStar();
        stars[i].move();
        for(var j = 0; j < stars.length; j++){
            joinStars(stars[i], stars[j]);
        }
    }
    joinMouseStars();
}

function joinMouseStars() {
    for(let i = 0; i < stars.length; i++){
        var d = distance(mouseX, mouseY, stars[i].x, stars[i].y);
        if(d <= 50){
            var col = map(d, 0, 50, 0, 255);
            fill(col);
            line(mouseX, mouseY, stars[i].x, stars[i].y);
        }
    }
}

function joinStars(s1, s2) {
    let d = distance(s1.x, s1.y, s2.x, s2.y);
    if(d <= 20){
        let col = map(d, 0, 20, 0, 255);
        fill(col);
        line(s1.x, s1.y, s2.x, s2.y);
    }
}

function distance(x1,y1,x2,y2) {
    return (pow(pow(x1 - x2, 2) + pow(y1 - y2, 2), 0.5));
}

class Star {
    constructor(){
        this.x = random(width);
        this.y = random(height);
        this.size = random(1,10);
        this.v = 10/this.size;
        this.theta = random(0,2*Math.PI);
    }
    
    get x(){return this.x}
    get y(){return this.y}

    drawStar() {
        fill(255,255,255);
        ellipse(this.x, this.y, this.size, this.size);
    }

    reflectStar() {
        if((this.x < 10) || (this.x > (width-10))){
            theta = Math.PI - theta;
        }
        else if((y < 10) || (y > (height-10))){
            theta = 2*Math.PI - theta;
        }
    }

    move() {
        this.x = this.x + this.v*Math.cos(this.theta);
        this.y = this.y + this.v*Math.sin(this.theta);
    }
}