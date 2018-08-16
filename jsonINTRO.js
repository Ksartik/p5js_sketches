var spaceData;
var d = 8;
let a = [],b = [];
let v0 = 1;
let vx = [], vy = [];
let t = 0;
let x,y;
function setup() {
    createCanvas(windowWidth, windowHeight);
    loadJSON('http://api.open-notify.org/astros.json', gotData);
    angleMode(DEGREES);
}

function gotData(data) {
    spaceData = data;
    // let ang = 360/data.number;
    // randomSeed(14);
    for(let i = 0; i < data.number; i++) {
        a.push(random(d/2, width -d/2));
        b.push(random(d/2, height- d/2));
        vx.push(v0*cos(random(0,360)));
        vy.push(v0*sin(random(0,360)));
    }
    // for(let i = 0; i < data.number ; i++) {
    //     let x = createElement('h1',data.people[i].name);
    //     let y = createP(data.people[i].craft);
    // }
}

function draw() {
    background(0);
    if(spaceData) {
        fill(255);
        for(let i = 0; i < spaceData.number; i++) {
            a[i] += vx[i];
            b[i] += vy[i];
            if ((a[i] < d) || (a[i] > width-d)) {
                vx[i] = -vx[i];
            }
            else if((b[i] < d) || (b[i] > height-d)){
                vy[i] = -vy[i];
            }
            ellipse(a[i],b[i],d);
            let st = spaceData.people[i].name;
            let flname = st.split(' ');
            text(flname[0], a[i], b[i]);
            text(flname[1], a[i], b[i]+12);
            for(let j = 0; j < spaceData.number; j++) {
                if(j != i && dist(a[i], b[i], a[j],b[j]) < 8){
                    console.log(st + ' says hello to ' + spaceData.people[j].name);
                }
            }
        }
    }
}