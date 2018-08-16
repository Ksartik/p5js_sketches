var x,y,theta,r,s;

function setup() {
    createCanvas(windowWidth, windowHeight);
    x =  random(0,width);
    y =  random(0,height);
    theta = random(0,2*Math.PI);
    r = 20;
    s = 5;
}

function draw() {
    background(255);
    drawBall();
    reflectBall();
    if(Math.pow((mouseX - x),2) + Math.pow((mouseY - y),2)  > 400){
        move();
    }
    else{
        mouseDragged();
    }
}

function move() {
    x = x + s*Math.cos(theta);
    y = y + s*Math.sin(theta);
}

function reflectBall() {
    if((x < 10) || (x > (width-10))){
        theta = Math.PI - theta;
    }
    else if((y < 10) || (y > (height-10))){
        theta = 2*Math.PI - theta;
    }
}

function drawBall() {
    strokeWeight(5);
    stroke(255,0,0);
    ellipse(x,y,40,40);
}

function mouseDragged() {
    x = mouseX;
    y = mouseY;
}