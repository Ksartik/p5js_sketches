let player1, player2;
let blockWidth, blockHeight;
let X = [];
let Y = [];
let k = 0;

function setup(){
    createCanvas(600,600);
    background(255);

    blockWidth = width/3;
    blockHeight = height/3;

    X[0] = 0;
    X[1] = X[0] + blockWidth;
    X[2] = X[1] + blockWidth;
    X[3] = width;

    Y[0] = 0;
    Y[1] = Y[0] + blockHeight;
    Y[2] = Y[1] + blockHeight;
    Y[3] = height;

    player1 = new player(1); 
    player2 = new player(2);
}

function draw(){
    if(player1.wins()){
        background(255, 0, 0);
        stroke(0);
        strokeWeight(0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text('GAME OVER!!! Player 1 wins!', width/2, height/2);
        fill(255,255,255);
    }
    else if(player2.wins()){
        background(0, 0, 255);
        stroke(0);
        strokeWeight(2);
        textSize(40);
        textAlign(CENTER, CENTER);
        text('GAME OVER!!! Player 2 wins!', width/2, height/2);
        fill(255,255,255);
    }
    else if(k == 9){
        background(0, 255, 0);
        stroke(0);
        strokeWeight(2);
        textSize(40);
        textAlign(CENTER, CENTER);
        text('GAME OVER!!! DRAW!', width/2, height/2);
        fill(255,255,255);
    }
    else{
        strokeWeight(6);
        stroke(0);
        line(X[1], Y[0], X[1], Y[3]);
        line(X[2], Y[0], X[2], Y[3]);
        line(X[0], Y[1], X[3], Y[1]);
        line(X[0], Y[2], X[3], Y[2]);
        player1.showMoves();
        player2.showMoves();
    }
}

function mouseClicked(){
    if(k % 2 == 0){
        if(player1.isMove(mouseX, mouseY) && player2.isMove(mouseX, mouseY)){
            player1.playMove(mouseX, mouseY);
            k = k + 1;
        }
    }
    else{
        if(player1.isMove(mouseX, mouseY) && player2.isMove(mouseX, mouseY)){
            player2.playMove(mouseX, mouseY);
            k = k + 1;
        }
    }
}

class player {
    constructor(n){
        this.playerN = n;
        this.blocksX = [];
        this.blocksY = [];
    }

    showMoves(){
        if(this.playerN == 2){
            for(let i = 0; i < this.blocksX.length ; i++){
                strokeWeight(8);
                stroke(0, 0, 255);
                line(this.blocksX[i] - blockWidth/2, this.blocksY[i] - blockHeight/2, this.blocksX[i] + blockWidth/2, this.blocksY[i] + blockHeight/2);
                line(this.blocksX[i] - blockWidth/2, this.blocksY[i] + blockHeight/2, this.blocksX[i] + blockWidth/2, this.blocksY[i] - blockHeight/2);
            }
        }
        else if(this.playerN == 1){
            for(let i = 0; i < this.blocksX.length ; i++){
                strokeWeight(8);
                stroke(255, 0, 0);
                ellipse(this.blocksX[i], this.blocksY[i], blockWidth, blockHeight);
            }
        }
    }

    isMove(x, y){
        let blockX1,blockX2, blockY1, blockY2;
        for(let i = 0; i < 3; i++){
            if(X[i] <= x  &&  x <= X[i+1]){
                blockX1 = X[i];
                blockX2 = X[i+1];
            }
        }
        for(let i = 0; i < 3; i++){
            if(Y[i] <= y && y <= Y[i+1]){
                blockY1 = Y[i];
                blockY2 = Y[i+1];
            }
        }

        for(let i = 0; i < this.blocksX.length; i++){
            if(((blockX1 + blockX2)/2 == this.blocksX[i]) && ((blockY1 + blockY2)/2 == this.blocksY[i])){
                return false;
            }
        }
        return true;
    }

    playMove(x, y){
        let blockX1,blockX2, blockY1, blockY2;
        for(let i = 0; i < 3; i++){
            if(X[i] <= x  &&  x <= X[i+1]){
                blockX1 = X[i];
                blockX2 = X[i+1];
            }
        }
        for(let i = 0; i < 3; i++){
            if(Y[i] <= y && y <= Y[i+1]){
                blockY1 = Y[i];
                blockY2 = Y[i+1];
            }
        }
        this.blocksX.push((blockX1 + blockX2)/2);
        this.blocksY.push((blockY1 + blockY2)/2);
    }

    wins(){
        for(let i = 0; i < this.blocksX.length ; i++){
            for(let j = i+1; j < this.blocksX.length ; j++){
                for(let k = j+1; k < this.blocksX.length; k++){
                    if((this.blocksX[i] == this.blocksX[j] && this.blocksX[j] == this.blocksX[k]) || (this.blocksY[i] == this.blocksY[j] && this.blocksY[j] == this.blocksY[k]) || (lieDiagonalFrame(this.blocksX[i], this.blocksY[i], this.blocksX[j], this.blocksY[j], this.blocksX[k], this.blocksY[k]))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

function lieDiagonalFrame(x1,y1,x2,y2,x3,y3){
    return ((y1 - height/width*x1 == 0) && (y2 - height/width*x2 == 0) && (y3 - height/width*x3 == 0)) || ((y1/height + x1/width == 1) && (y2/height + x2/width == 1) && (y3/height + x3/width == 1));
}