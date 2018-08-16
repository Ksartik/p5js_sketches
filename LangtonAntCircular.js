var blockSize = 20, cols, rows;
var blocks = [];
var ant;

function setup(){
    background(255);
    createCanvas(windowWidth, windowHeight);
    rows = floor(height/blockSize);
    cols = floor(width/blockSize);
    for(let j = 0; j < cols; j++){
        blocks[j] = [];
        for(let i = 0; i < rows; i++){
            blocks[j][i] = new Block(j*blockSize + blockSize/2, i*blockSize + blockSize/2);
        }
    }
    ant = [floor(cols/2), floor(rows/2)];
}


function draw(){
    blocks[ant[0]][ant[1]].changeColor();
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            blocks[i][j].drawBlock();
        }
    }
    blocks[ant[0]][ant[1]].moveRandom();
}

class Block {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.color = 1;
    }
    drawBlock(){
        push();
        fill(this.color*255);
        rectMode(CENTER);
        stroke(0);
        rect(this.x, this.y, blockSize, blockSize);
        pop();
    }
    changeColor(){
        this.color = (this.color + 1)%2;
    }
    moveRandom(){
        let rx = random([-1,0,1]);
        let ry = random([-1,0,1]);
        while(rx == 0 && ry == 0){
            rx = random([-1,0,1]);
            ry = random([-1,0,1]);
        }
        //let anti = (this.x - blockSize/2)/blockSize, antj = (this.y - blockSize/2)/blockSize;
        //blocks[anti + rx][antj + ry].changeColor();
        ant = [(cols + (this.x - blockSize/2)/blockSize + rx)%cols, (rows + (this.y - blockSize/2)/blockSize + ry) %rows];
    }
    // moveRandom(){
    //     let r = newRandom(this.x, this.y, blockSize);
    //     let rx = r[0];
    //     let ry = r[1];
    //     //let anti = (this.x - blockSize/2)/blockSize, antj = (this.y - blockSize/2)/blockSize;
    //     //blocks[anti + rx][antj + ry].changeColor();
    //     ant = [(cols + (this.x - blockSize/2)/blockSize + rx)%cols, (rows + (this.y - blockSize/2)/blockSize + ry) %rows];
    // }
}

function newRandom (x,y,n) {
    let p1 = map(dist((x+1)%n, y, mouseX, mouseY), n, 0, 0, 1);
    let p2 = map(dist(x, (y+1)%n, mouseX, mouseY), n, 0, 0, 1);
    let p3 = map(dist((x-1+n)%n, y, mouseX, mouseY), n, 0, 0, 1);
    let p4 = map(dist(x, ((y-1+n)%n), mouseX, mouseY), n, 0, 0, 1);

    let cp1 = 100*p1, cp2 = 100*(p1+p2), cp3 = 100*(p1 + p2 + p3), cp4 = 100*(p1 + p2 + p3 + p4);

    let r = random(cp4);

    if (r < cp1) {
        return [1, 0];
    }
    else if (r < cp2) {
        return [0, 1];
    }
    else if (r < cp3) {
        return [-1, 0];
    }
    else {
        return [0, -1];
    }
}