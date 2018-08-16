let b, lastX, lastY, mx = -1, my = -1;
let red, blue, green, undo;
let lines = [];
let cre, c = [0,255,0];
let startG = 0;
let grd, buttonBool = 0;

function setup(){
    createCanvas(windowWidth, windowHeight - 50);
    b = createButton('Start Game');
    red = createButton('RED');
    green = createButton('GREEN');
    blue = createButton('BLUE');
    undo = createButton('UNDO');
    undo.style('translate', -60, height);
    red.style('translate',-width,height);
    green.style('translate',-width + 60, height);
    blue.style('translate',-width + 140, height);
    b.style('translate',-width/2 , height);
    b.mousePressed(gameButtonPress);
    // red.mouseReleased(function() {setTimeout(2); c = [255,0,0];});
    // green.mouseReleased(function() {setTimeout(2); c = [0,255,0];});
    // blue.mouseReleased(function() {setTimeout(2); c = [0,0,255];});
    undo.mousePressed(undoPress);
    red.mousePressed(function() { c = [255,0,0];});
    green.mousePressed(function() { c = [0,255,0];});
    blue.mousePressed(function() { c = [0,0,255];});
    b.mouseClicked(gameButtonClick);
    grd = height - 100;
}
function undoPress() {
    if(startG == 0) {
        lines.splice(lines.length-1,1);
    }
}

function gameButtonClick() {
    if (buttonBool == 1) {
        startG = 0;
        b.html('Start Game');
        red.html('RED');
        green.html('GREEN');
        blue.html('BLUE');
        undo.html('UNDO');
        buttonBool = 0;
        lines = [];
    }
}
function gameButtonPress() {
    if(buttonBool == 0) {
        startG = 1; 
        let r = int(random(0,2));
        if(r == 0) {
            cre = "0,0,255";
        }
        else {
            cre = "255,0,0";
        }
        b.html('   ');
        red.html('   ');
        green.html('   ');
        blue.html('   ');
        undo.html('   ');
        let i = 0;
        while(i < lines.length) {
            if(!(connectedToGround(i, lines))){
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
        if(dist(x,y,x1,y1) < 10){
            ellipse(x1, y1, 10, 10);
            mx = x1;
            my = y1;
        }
        else if(dist(x,y,x2,y2) < 10){
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
        if(cre == "255,0,0") {
            push();
            text("RED's chance", 10,10);
            textAlign(CENTER);
            pop();
        }
        else if (cre == "0,0,255") {
            push();
            text("BLUE's chance", 10,10);
            textAlign(CENTER);
            pop();
        }
        let t = 0;
        for(let i = 0 ; i < lines.length; i++) {
            if(lines[i].col.toString() == cre || lines[i].col.toString() == "0,255,0") {
                t = 1;
                break;
            }
        }
        if(t == 0) {
            if (cre == "0,0,255") {
                push();
                fill(255,0,0);
                textSize(50);
                text('RED WINS!', width/2 - 100, height/2);
                textAlign(CENTER);
                pop();
                setTimeout(5);
                c = [0,255,0];
                b.html('RETRY');
                buttonBool = 1;
            }
            else if(cre == "255,0,0") {
                push();
                fill(0,0,255);
                textSize(50);
                text('BLUE WINS!', width/2 - 100, height/2);
                textAlign(CENTER);
                pop();
                setTimeout(5);
                c = [0,255,0];
                b.html('RETRY');
                buttonBool = 1;
            }
        }
    }
}

function mouseClicked(){
    if(startG == 1){
        for(let i = 0; i < lines.length; i++){
            // if(lines[i].touch() && (lines[i].col == cre || lines[i].col == [0,255,0])){
            if(lines[i].touch() && (lines[i].col.toString() == cre || lines[i].col.toString() == "0,255,0")) {
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
                if (cre == "255,0,0") {
                    cre = "0,0,255";
                }
                else if (cre == "0,0,255") {
                    cre = "255,0,0";
                }
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
        else if(mouseY > grd && mouseY < grd + 100) {
            lastX = mouseX;
            lastY = grd;
        }
        else if(mouseY < grd + 100) {
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
            // let t = c;
            lines.push(new Line(lastX, lastY, mx, my, c));
            // c = (c + 1) % 2
            mx = -1;
            my = -1;
        }
        else if((mouseY > grd) && mouseY < grd + 100) {
            // let t = c;
            lines.push(new Line(lastX, lastY, mouseX, grd, c));
            // c = (c + 1) % 2;
            mx = -1;
            my = -1;
        }
        else if(mouseY < grd){
            // let t = c;
            lines.push(new Line(lastX, lastY, mouseX, mouseY, c));
            // c = (c + 1) % 2;
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
        // if(this.col == 0){
        //     stroke(0,0,255);
        // }
        // else{
        //     stroke(255,0,0);
        // }
        stroke(this.col[0], this.col[1], this.col[2]);
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
