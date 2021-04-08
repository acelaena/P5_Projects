/**
	Project 2 
	by Acelaena

    Overview:

	Notes:

*/
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT= 600;
var center_x;
var center_y;
var CANVAS_LEFT;

const NEUTRAL = 0;
const HAPPY = 1;
const EXCITED = 2;
const THINK = 3; 
const DEPRESSED = 4;
const CRY = 5;
const FRUSTRATED = 6;
const ANGRY = 7;
const FEAR = 8;
var wendy_sprite = [];

var textClicker; 
var drawAgain = true;

var n;

/*
    Keyboard navigation support. While on a non-room screen, all keys will advance the screen.
*/
function keyTyped() {
    console.log(key);
}

function wendyBox(expression, words){
    image(wendy_sprite[expression], CANVAS_LEFT, 160, 300, 300);
    fill("#3f6680");
    rect(CANVAS_LEFT, 450, 960, 150, 20);
    fontStyle();
    text(words, CANVAS_LEFT+40, 460, 920, 130);
}
    
/**
    Mouse navigation support.
*/
function mousePressed() {
    console.log("mouse clicked.");
}


function preload() {
    var i;
    for (i = 0; i<9; i++){
        wendy_sprite[i] = loadImage("https://acelaena.github.io/assets3/exp_"+ i + ".PNG");
    }  
}

function setup() {
    createCanvas(windowWidth-12, windowHeight-12);
    center_x = width/2;
    center_y = height/2; 
    CANVAS_LEFT = center_x - CANVAS_WIDTH;
    n = 0;
    
    textClicker = new Clickable(); 
    textClicker.color = '#0000'; 
    textClicker.text = '';
    textClicker.strokeWeight = 0;  
    textClicker.resize(960, 150);
    textClicker.cornerRadius = 20;
    textClicker.locate(CANVAS_LEFT, 450);
    textClicker.onPress = function(){  //When myButton is pressed
        drawAgain = true;
        console.log("clicky!");
    }
}

function draw() {
    if (drawAgain){
        fill("#ddd");
        rect(CANVAS_LEFT, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        wendyBox(n,"Hello world! My name is Wendy!");
        drawAgain = false; 
        n++;
        if (n > 8){ n = 0;}
    }
    textClicker.draw();
}
