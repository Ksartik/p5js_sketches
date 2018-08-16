let b, c = 0, lastX, lastY, mx = -1, my = -1;
let lines = [];
let cre = 0;
let startG = 0;
let grd, buttonBool = 0;

function setup(){
    createCanvas(windowWidth - 100, windowHeight - 100);
    b = createButton('Start Game');
    b.mousePressed(gameButtonPress);
    b.mouseClicked(gameButtonClick);
    grd = height - 100;
}

function gameButtonClick() {
    if (buttonBool == 1) {
        startG = 0;
        b.html('Start Game');
        buttonBool = 0;
    }
}
function gameButtonPress() {
    if(buttonBool == 0) {
        startG = 1; 
        b.html('   ');
        let i = 0;
        while(i < lines.length) {
                lines.splice(i,1);
            }
            else {
                i++;
            }
        }
    }
}

function draw(){
    background(255);
    push();
    fill(0);
    rect(0, grd, width, height);
    pop();
    for(let i = 0; i < lines.length; i++){
        lines[i].drawLine();
    }
    for(let i = 0; i < lines.length; i++){
        let x = mouseX, y = mouseY, x1 = lines[i].x1, y1 = lines[i].y1, x2 = lines[i].x2, y2 = lines[i].y2;
        if(dist(x,y,x1,y1) < 8){
            ellipse(x1, y1, 10, 10);
            mx = x1;
            my = y1;
        }
        else if(dist(x,y,x2,y2) < 8){
            ellipse(x2, y2, 10, 10);
            mx = x2;
            my = y2;
        }
        else {
            mx = -1;
            my = -1;
        }
    }
    if(startG == 1) {
        let t = 0;
        for(let i = 0 ; i < lines.length; i++) {
            if(lines[i].col == cre) {
                t = 1;
                break;
            }
        }
        if(t == 0) {
            if (cre == 0) {
                push();
                fill(255,0,0);
                text('RED WINS!', width/2 - 50, height/2 - 50);
                pop();
                textSize(100);
                textAlign(CENTER);
                c = 0;
                cre = 0;
                b.html('RETRY');
                buttonBool = 1;
            }
            else {
                push();
                fill(0,0,255);
                text('BLUE WINS!', width/2 - 50, height/2 - 50);
                pop();
                textSize(100);
                textAlign(CENTER);
                c = 1;
                cre = 1;
                b.html('RETRY');
                buttonBool = 1;
            }
        }
    }
}

function mouseClicked(){
    if(startG == 1){
        for(let i = 0; i < lines.length; i++){
            if(lines[i].touch() && lines[i].col == cre){
                lines.splice(i, 1);
                let j = 0;
                while(j < lines.length) {
                    if(!(connectedToGround(j, lines))){
                        lines.splice(j,1);
                    }
                    else {
                        j++;
                    }
                }
                cre = (cre + 1)%2;
                break;
            }
        }
    }
}

function mousePressed(){
    if(startG == 0){
        if (mx >= 0 && my >= 0){
            lastX = mx;
            lastY = my;
            mx = -1;
            my = -1;
        }
        else if(mouseY > grd) {
            lastX = mouseX;
            lastY = grd;
        }
        else{
                lastX = mouseX;
                lastY = mouseY;
        }
    }
}

// function mouseDragged() {
//     mx = mouseX;
//     my = mouseY;
// }

function mouseReleased(){
    if(startG == 0){
        if (mx >= 0 && my >= 0){
            let t = c;
            lines.push(new Line(lastX, lastY, mx, my, t));
            c = (c + 1) % 2;
            mx = -1;
            my = -1;
        }
        else if((mouseY > grd)) {
            let t = c;
            lines.push(new Line(lastX, lastY, mouseX, grd, t));
            c = (c + 1) % 2;
            mx = -1;
            my = -1;
        }
        else{
            let t = c;
            lines.push(new Line(lastX, lastY, mouseX, mouseY, t));
            c = (c + 1) % 2;
        }
    }
}

class Line {
    constructor(x1, y1, x2, y2, u){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.col = u;
    }
    drawLine(){
        push();
        strokeWeight(4);
        if(this.col == 0){
            stroke(0,0,255);
        }
        else{
            stroke(255,0,0);
        }
        line(this.x1, this.y1, this.x2, this.y2);
        pop();
        push();
        fill(0);
        ellipse(this.x1, this.y1, 5, 5);
        ellipse(this.x2, this.y2, 5, 5);
        pop();
    }
    touch() {
        let x = mouseX, y = mouseY;
        let d3 = dist(this.x1, this.y1, this.x2, this.y2);
        let d1 = dist(this.x1, this.y1, x, y);
        let d2 = dist(this.x2, this.y2, x, y);
        return (d1 + d2 - d3 < 4);
    }
}

function connectedToGround(k,lns) {
    let cb = 0, lns1 = [];
    let l = lns[k];
    if (l.y1 == grd || l.y2 == grd) {
        cb = 1;
    }
    else {
        for(let i = 0; i < lns.length; i++) {
            if(i != k) {
                lns1.push(lns[i]);
            }
        }
        for(let i = 0; i < lns1.length ; i++) {
            if (isconnected(l, lns1[i])) {
                cb = cb || connectedToGround(i,lns1);
            }
        }
    }
    return cb;
}

function isconnected(line1, line2) {
    return ((line1.x1 == line2.x1) && (line1.y1 == line2.y1)) || ((line1.x1 == line2.x2) && (line1.y1 == line2.y2)) || ((line1.x2 == line2.x1) && (line1.y2 == line2.y1)) || ((line1.x2 == line2.x2) && (line1.y2 == line2.y2));
}
