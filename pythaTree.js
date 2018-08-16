let ncount = 2;
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
}

var  theta1 = Math.PI/4, theta2 = Math.PI/4;

function draw(){
    translate(width/2, height - 100);
    push();
    rect(-25, -25, 50, 50);
    pytha(-25, -25, 25,- 25, 0);
}

function pytha(x1, y1, x2, y2, count){
    let mtheta = atan((y2 - y1)/(x1 - x2));
    let m1 = tan(mtheta + theta1), m2 = tan(mtheta - theta2);
    let c1 = y1 + m1*x1, c2 = y2 + m2*x2;
    let x3 = (c1 - c2)/(m1 - m2), y3 = c1 - m1*x3;

    triangle(x1,y1,x2,y2,x3,y3);
    //let b = dist(x1,y1,x3,y3), c = dist(x3,y3,x2,y2);

    upsquare(x1, y1, x3, y3);
    upsquare(x3, y3, x2, y2);

    count++;

    if(count < ncount){
        pytha(x1 + y3 - y1, y1 + x1 - x3, x3 + y3 - y1, y3 + x1 - x3, count);
        pytha(x3 + y2 - y3, y3 + x3 - x2, x2 + y2 - y3, y2 + x3 - x2, count);
    }
}

function upsquare(x1, y1, x2, y2){
    let a = dist(x1, y1, x2, y2);
    //line(x1, y1, x2, y2);
    push();
    translate(x1, y1);
    rotate(-Math.PI/2);
    line(0, 0, x2 - x1, y2 - y1);
    pop();

    let xt = -y1 + y2 + x1, yt = -x2 + x1 + y1;
    push();
    translate(xt, yt);
    rotate(-Math.PI/2);
    line(0, 0, x1 - xt, y1 - yt);
    pop();

    push();
    translate(x2, y2);
    rotate(Math.PI/2);
    line(0, 0, x1 - x2, y1 - y2);
    pop();
}