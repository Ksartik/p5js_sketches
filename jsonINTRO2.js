var Imap,city = [];
var weatherSymbols = {};
let t = 0;
function preload() {
    // Imap = loadImage('Media/Map-Satellite-India.jpg');
    Imap = loadImage('Media/india-map.jpg');
    weatherSymbols = {
        "few clouds" : loadImage('Media/cloudy.png'),
        "scattered clouds" : loadImage('Media/cloudy.png'),
        "broken clouds" : loadImage('Media/overcast.png'),
        "drizzle" : loadImage('Media/drizzle.png'),
        "dust" : loadImage('Media/dust.png'),
        "haze" : loadImage('Media/sunny-day.png'),
        "heavy rain" : loadImage('Media/heavy-rain.png'),
        "heavy snow" : loadImage('Media/heavy-snow.png'),
        "light rain" : loadImage('Media/light-rain.png'),
        "moderate rain" : loadImage('Media/light-rain.png'),
        "light snow" : loadImage('Media/light-snow.png'),
        "thunderstorm" : loadImage('Media/thunder.png'),
        "clear sky" : loadImage('Media/sunny-day.png'),
        "overcast clouds" : loadImage('Media/overcast.png'),
        "smoke" : loadImage('Media/dust.png')
    }
}
function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth/2,windowHeight);
    takeForecast();
    // setInterval(takeForecast,60000);
    setInterval(function(){location = location;},60000);
}

function takeForecast() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData); 
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    // loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Shimla&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    // loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Srinagar&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    // loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Patna&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Vishakhapatnam&appid=c85626dd4667316bcbe74aacb47d3417&units=metric',addData);
}

function addData(data) {
    city.push(new City(data));
}

class City {
    constructor(data) {
        this.data = data;
        this.y = map(data.coord.lat,37.1,8.067,50,height);
        this.x = map(data.coord.lon,68.1167,97.4167,0,width+10);
    }
    show() {
        // let mag = 10*this.data.wind.speed;
        arrow(this.x+10*sin(5*t)*cos(360-this.data.wind.deg), this.y+10*sin(5*t)*sin(360-this.data.wind.deg),3*this.data.wind.speed,this.data.wind.deg);
        push();
        imageMode(CENTER);
        image(weatherSymbols[this.data.weather[0].description],this.x,this.y)
        pop();
        // arrow(this.x, this.y,3*this.data.wind.speed,this.data.wind.deg);
    }
    over(a,b){
        return (dist(a,b,this.x,this.y)<10);
    }
}

function mouseClicked() {
    for(let i = 0; i <city.length; i++) {
        if(city[i].over(mouseX, mouseY)){
            console.log(city[i].data.name + ' ' + city[i].data.weather[0].main + ' ' + city[i].data.main.temp);
        }
    }
}

function draw(){
    background(255);
    image(Imap,0,0,width,height);
    for(let i = 0; i < city.length;i++) {
        city[i].show();
    }
    for(let i = 0; i <city.length; i++) {
        if(city[i].over(mouseX, mouseY)){
            push();
            fill(255,0,0);
            textSize(20);
            textStyle(BOLD);
            stroke(0);
            noStroke();
            // image(weatherSymbols[city[i].data.weather[0].main],mouseX+4,mouseY)
            text(city[i].data.name,mouseX+10,mouseY);
            // text(city[i].data.weather[0].main,mouseX+4,mouseY+12)
            text(city[i].data.main.temp + "°C",mouseX+10,mouseY+20);
            text("Humidity: " + city[i].data.main.humidity, mouseX+10,mouseY+40);
            pop();
        }
    }
    t += 0.1;
}

function arrow(x,y,mag,angle) {
    push();
    translate(x,y);
    rotate(360-angle);
    rectMode(CENTER);
    fill(0,180,255);
    noStroke();
    rect(0,0,mag,mag/3);
    // pop();
    // push();
    // translate(x+mag,y);
    // rotate(360-angle);
    triangle(mag/2,mag/3+2,mag/2,-mag/3-2,3*mag/2,0);
    pop();
}