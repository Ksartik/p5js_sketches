let b, nodes = [], k = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    b = createButton('Start connecting');
    b.mouseClicked(connectNodes);
}

function draw() {

}

function mouseClicked() { 
    if(k == 0){
        nodes.push(new node(mouseX, mouseY));
        noStroke();
        fill(255);
        ellipse(mouseX, mouseY, 8, 8);
    }
}

class node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function connectNodes() {
    k = 1;
    let r = int(random(0, nodes.length));
    let unreached = nodes;
    let reached = [];
    reached.push(unreached[r]);
    unreached.splice(r, 1);
    while(unreached.length > 0){
        let start = reached[0];
        let end = unreached[0];
        let endi = 0;
        let dis = dist(start.x, start.y, end.x, end.y);
        for(let i = 0; i < reached.length; i++){
            for(let j = 0; j < unreached.length; j++) {
                let sti = reached[i];
                let eni = unreached[j];
                let disi = dist(sti.x, sti.y, eni.x, eni.y);
                if(disi < dis) {
                    start = sti;
                    end = eni;
                    endi = j;
                    dis = disi;
                }
            }
        }
        reached.push(end);
        unreached.splice(endi, 1);
        stroke(255,0, 0);
        strokeWeight(2);
        line(start.x, start.y, end.x, end.y);
    }
}