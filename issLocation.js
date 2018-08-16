var world_map, issX, issY;
function preload() {
    world_map = loadImage('Media/world-map.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setInterval(function() {loadJSON('http://api.open-notify.org/iss-now.json', moveISS)}, 1000);
}

function moveISS(data) {
    issX = map(data.iss_position.longitude,-180, 180, 0, width);
    issY = map(data.iss_position.latitude, -90, 90, 0, height);
}

function draw() {
    image(world_map, 0, 0, width, height);
    fill(0);
    ellipse(issX, issY, 5, 5);
}
