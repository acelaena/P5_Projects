/**
	Project 1 - Vale Pet Shelter
	by Acelaena

    Overview:
    A simple color-picker game that makes use of p5.clickable and p5.timer. 
    You have two seconds, get picking! 

	Notes:
    IMPORTANT NOTE:: PLEASE CLONE THE ENTIRE REPOSITORY 
    - to save myself a little sanity, all classes are now in JS_Classes so I don't accidentally modify 
    the wrong copy of the classes and continue scratching my head at why a bug still exists when I 
    definitely fixed it. 
    - i also modified p5.clickable and p5.timer. 
*/

const BGCOL = '#e8f6ce';
var PXSIZE = 100;   //default; is set to min(PXSIZE, SCREENSIZE/3);
const WAIT = 2000;
const PXWIDTH = 3;
const PXHEIGHT = 2;
var OFFX; //offsets for pixel grid
var OFFY; 


//game handlers
var timer_wait;
var randColor = [];
var variColor = [];

var rand_coord_x;
var rand_coord_y; 
var pixel_canvas; 

var points = 0; 
var lives = 5; 
var newSlide = true;
var gameOver = false;


//controls
var clicker; 
var click1;
var newSlide = true;

/**
    Keyboard navigation support. 
*/
function keyTyped() {
    console.log("key typed: "+ key);
}
 
/**
    Mouse navigation support.
*/
function mousePressed() {
    if (clicker.outsideClickable()){
        lives--;
        newSlide = true;
        if (lives <= 0){ gameOver = true; }
    }
}

//function outsideClickable(){
//    return (mouseX < clicker.x || mouseX > clicker.x+PXSIZE) || (mouseY < clicker.y || mouseY > clicker.y+PXSIZE);
//}

function setup() {
    //remove scrollbar width because p5 smelly and I cant do my elegant no-scrollbar trick
    createCanvas(windowWidth-12, windowHeight-12);
    background(BGCOL);
    frameRate(20);
    //constant setup
    PXSIZE = min(PXSIZE, min(width, height)/3);
    OFFX = width/2 - PXWIDTH*PXSIZE/2;
    OFFY = height/2 - PXHEIGHT*PXSIZE/2;
    textSize(24);

    //timer setup
    timer_wait = new Timer(WAIT);
    
    //create canvas
    pixel_canvas = new PixelCanvas(PXWIDTH, PXHEIGHT, PXSIZE, '#000', OFFX, OFFY);
    pixel_canvas.setPixel(2,1, color(255, 255, 0));
    
    //clicker setup 
    clicker = new Clickable(); 
    clicker.color = '#0000'; 
    clicker.text = '';
    clicker.strokeWeight = 0;  
    clicker.resize(PXSIZE,PXSIZE);
    clicker.cornerRadius = 0;
    clicker.onPress = function(){  //When myButton is pressed
        newSlide = true;
        points++;
    }  
//    clicker.onOutsidePress = function(){
//        lives--;
//        newSlide = true;
//        if (lives <= 0){ gameOver = true; }
//    }
}

function draw() {
    fill('#000'); 
    strokeWeight(0);
    textAlign(CENTER);
    text("Click the color that looks different from the rest!", width/2, 50);
    
    if (gameOver){
        background(BGCOL);
        textAlign(CENTER);
        text("GAME OVER D:\n Refresh to play again!", width/2, height/2);
        newSlide = false;
        noLoop();
        textAlign(LEFT);
    }
    
    if (newSlide){
        background(BGCOL);
        for (var i = 0; i < 3; i++){
            randColor[i] = rand(25, 230);
            variColor[i] = rand(5, 25); 
            if (flip()){ variColor[i] = -variColor[i]; }
        }
    
        for(i = 0; i < PXHEIGHT; i++){ //rows
            for (var j = 0; j < PXWIDTH; j++) { //columns
                pixel_canvas.setPixel(j, i, color(randColor[0], randColor[1], randColor[2]));
            }
        }
        
        rand_coord_x = rand(0, PXWIDTH-1);
        rand_coord_y = rand(0, PXHEIGHT-1);
        pixel_canvas.setPixel(rand_coord_x, rand_coord_y, color(randColor[0]+variColor[0], randColor[1]+variColor[1], randColor[2]+variColor[2]));
        
        clicker.locate(OFFX + rand_coord_x*PXSIZE, OFFY + rand_coord_y*PXSIZE);
        timer_wait.reset();
        
        newSlide = false; 
    }
    fill('#000'); 
    strokeWeight(0);
    text("Points: " + points, width/2-300, 100);
    text("Lives: " + lives, width/2+300, 100);
    clicker.draw(); 
    
//    console.log(timer_wait.getRemainingTime());
    if (timer_wait.expired()){
        lives--; 
        newSlide = true;
        if (lives <= 0){ gameOver = true; }
    }
}
