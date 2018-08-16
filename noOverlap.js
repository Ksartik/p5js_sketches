let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    // for(let i = 0; i < 50; i++){
    //     let j = 0;
    //     let x = random(0, width);
    //     let y = random(0, height);
    //     let r = random(0, 20);
    //     while(j < i){
    //         let c = circles[j];
    //         if(dist(c.x, c.y, x, y) <= c.r + r) {
    //             x = random(0, width);
    //             y = random(0, height);
    //             r = random(0, 20);
    //         }
    //         else{
    //             j++;
    //         }
    //     }
    //     circles.push(new circle(x,y,r));
    //     push();
    //     fill(random(0,255), random(0,255), random(0,255));
    //     ellipse(x, y, r*2, r*2);
    //     pop();
    //}
}

function mouseClicked() {
    let x = mouseX, y = mouseY;
    for(let i = 0; i < circles.length; i++){
        let c = circles[i];
        if(dist(x, y, c.x, c.y) <= c.r){
            push();
            fill(255);
            stroke(255);
            ellipse(c.x,c.y,c.r*2,c.r*2);
            pop();
            circles.splice(i,1);
            break;
        }
    }
}

function draw() {
    let j = 0;
    let x = random(0, width);
    let y = random(0, height);
    let r = random(0, 20);
    while(j < circles.length){
        let c = circles[j];
        if(dist(c.x, c.y, x, y) <= c.r + r) {
            x = random(0, width);
            y = random(0, height);
            r = random(0, 20);
            j = 0;
        }
        else{
            j++;
        }
    }
    circles.push(new circle(x,y,r));
    push();
    noStroke();
    fill(random(0,255), random(0,255), random(0,255));
    ellipse(x, y, r*2, r*2);
    pop();
}

class circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
