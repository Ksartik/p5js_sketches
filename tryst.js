var stars = [];
function Star(){
    this.x = random(0,windowWidth);
    this.y = random(0,windowHeight);
    this.size = random(1,5);
    this.v = 5/(2*this.size);
    this.theta = random(0,2*Math.PI);
    this.drawStar = function() {
        fill(255,255,255);
        ellipse(this.x, this.y, this.size, this.size);
    }
    /*this.reflectStar = function() {
        if((this.x < 10) || (this.x > (width-10))){
            this.theta = Math.PI - this.theta;
        }
        else if((this.y < 10) || (this.y > (height-10))){
            this.theta = 2*Math.PI - this.theta;
        }
    }
    */
    this.move = function() {
        this.x = ((width + this.x + this.v*Math.cos(this.theta))% width);
        this.y = ((height + this.y + this.v*Math.sin(this.theta))%height);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for(var i = 0; i < 50; i++){
      stars.push(new Star());
    }
}

function draw() {
    background(20,17,40);
    for(var i = 0; i < stars.length; i++){
        stars[i].drawStar();
        /*if(stars[i].x < 0 || stars[i].x > width || stars[i].y < 0 || stars[i].y > height){
          stars.splice(i,1);
          i--;
        }*/
        stars[i].move();
        for(var j = i; j < stars.length; j++){
            joinStars(stars[i], stars[j]);
        }
    }
    /*if(stars.length < 30){
        for(k = 0; k < 30 - stars.length ; k++){
            stars.push(new Star());
        }
    }*/
    joinMouseStars();
}

function joinMouseStars() {
    for(var i = 0; i < stars.length; i++){
        var d = dist(mouseX, mouseY, stars[i].x, stars[i].y);
        if(d <= 200){
            var col = map(d, 0, 200, 255, 20);
            stroke(col);
            line(mouseX, mouseY, stars[i].x, stars[i].y);
        }
    }
}

function joinStars(s1, s2) {
    var d = dist(s1.x, s1.y, s2.x, s2.y);
    if(d <= 80){
        var col = map(d, 0, 80, 255, 20);
        stroke(col);
        line(s1.x, s1.y, s2.x, s2.y);
    }
}