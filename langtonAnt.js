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
        ant = [((this.x - blockSize/2)/blockSize + rx), ((this.y - blockSize/2)/blockSize + ry)];
    }
}
