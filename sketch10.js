let xt = [];
let yt = [];
let blocks = [];
let blockSize = 40;
let coin1;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    for(let i = 0; i < width/blockSize; i++){
        xt.push(i*blockSize);
    }
    for(let i = 0; i < height/blockSize; i++){
        yt.push(i*blockSize);
    }

    for(let i = 0; i < xt.length; i++){
        for(let j = 0; j < yt.length; j++){
            let b = {
                x : xt[i] + blockSize/2,
                y : yt[i] - blockSize/2
            }
            blocks.push(b);
        }
    }
    
    coin1 = new coin();
}

function draw() {
    for(let i = 0; i < xt.length; i++){
        line(xt[i], 0, xt[i], height);
    }
    for(let i = 0; i < yt.length; i++){
        line(0, yt[i], width, yt[i]);
    }
    coin1.drawCoin();
}

function mousePressed() {
    if(coin1.clicked(mouseX, mouseY)){
        return 1;
    }
    else{
        return 0;
    }
}

function mouseReleased() {
    let a = mousePressed();
    if(a == 1){
        coin1.move(mouseX, mouseY)
    }
}

class coin {
    constructor(){
        this.x = blocks[floor(blocks.length/2)].x;
        this.y = blocks[floor(blocks.length/2)].y;
        this.r = 10;
    }
    drawCoin(){
        ellipse(this.x, this.y, this.r, this.r);
    }
    clicked(x, y){
        if((x > this.x - blockSize/2 && x < this.x + blockSize/2 && y < this.y + blockSize/2 && y > this.y - blockSize/2)){
            return true;
        }
        else{
            return false;
        }
    }
    move(x, y){
        let X, Y;
        for(let i = 0; i < blocks.length; i++){
            if(x > blocks[i].x - blockSize/2 && x < blocks[i].x + blockSize/2 && y < blocks[i].y + blockSize/2 && y > blocks[i].y - blockSize/2){
                this.x = blocks[i].x;
                this.y = blocks[i].y;
                break;
            }
        }
    }
}