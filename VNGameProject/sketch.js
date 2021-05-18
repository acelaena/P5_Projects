/**
	Project 2 + 3
    Visual Novel project -- "London Night"
	by Acelaena

    Overview:

	Notes:

*/
//Canvas setup constants
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT= 600;
var center_x;
var center_y;
var CANVAS_LEFT;
const CANVAS_TOP = 0; 
const NOTBLACK = "#36393e";
const TRANSPARENT = "#0000";
const TEAL = "#3f9cc0";
const ROBIN = "#9fd9ea";
const CARMINE = "#e23";
const WHITETINT = "#fffa";
const BLACKTINT = "#000c";

//Game state handlers
var currentScreen; 
var screensList = [];
var drawFunction;
var drawAgain = false;
var hasText = false;
var canAccessControls = false;
var hasPostButton = false;
var hasSMButtons = false;

//Game Content handlers
var splash; 
var thumb;
var screenCount = 0;
var wendyCounter = 0;
var textClicker; 
var postClicker;
var smClickers = [];
var motivation = 5;
var relationship = 0;

//Big list of wendy objects!
var w = [];

//Big list of comic pages!
var c1pgs = [];
var c32pgs = [];
var c33pgs = [];
var c34pgs = [];
var c35pgs = [];

//Big list of icons!
var icons = [];

//debug variables
var n = 0;
var debug = false;
//DEBUG MODE HAS BUGS, PLEASE IGNORE THE BUGS THEY ARE NOT GAMEBREAKING THANKS

/*
    Keyboard navigation support. 
*/
function keyTyped() {
    console.log(key);
    //simple screen navigation
    
    //check if can move on
    if ((currentScreen.toNextKey != null && !hasText && 
         !currentScreen.name.includes("comic")) || 
        (currentScreen.name.includes("comic") && 
         currentScreen.comicEnd)){
        //check if correct key
        if ( key.toLowerCase() === currentScreen.toNextKey){
            nextScreen();
        }
    }
    
    //do not allow control access prior to first state two screen
    if (canAccessControls && key.toLowerCase() === 'i' && currentScreen.name != "controls"){
        //Save current screen state
        //de-increment automatic increments
        if(hasText){
            hasText = false;
            w[wendyCounter].counter--;
        }
        else if(!hasText && currentScreen.hasWendy){
            wendyCounter--;
            //w[wendyCounter].counter--;
        }
        
        //controls is screen index 2
        screensList[2].next = currentScreen; 
        currentScreen = screensList[2]; 
        
        if (debug) {
            console.log("Accessing controls...");
            console.log(screensList[2].next.name);
            console.log("was the previous screen.");
        }
        drawAgain = true;
    }
}
function keyPressed(){
    console.log(keyCode);
    if (currentScreen.name.includes("comic") || 
       currentScreen.name.includes("sm")){
        currentScreen.keyTypedHandler(keyCode);
    }
    
    if (debug){
        if (keyCode === ENTER){
            if (hasText){
                wendyCounter++;
            }
            nextScreen();
        }
    }
}

function nextScreen(){
    //move on if next isn't null
    if(currentScreen.next != null){
        let temp = currentScreen; 
        currentScreen = currentScreen.next; 
        temp.postload();
    }
    //enable redraw 
    drawAgain = true;

    //debug logs
    if (debug) {
        n++;
        console.log("new screen: "+ currentScreen.name);
        if (currentScreen.next != null){
            console.log("next screen: "+ currentScreen.next.name);
        } 

    }
}

/**
    Mouse navigation support.
*/
function mousePressed() {
    console.log("mouse clicked.");
}


function preload() {
    wendyPreload(); 
    preloadStateOne();
}

function setup() {
    createCanvas(windowWidth-12, windowHeight-12);
    center_x = width/2;
    center_y = height/2; 
    CANVAS_LEFT = center_x - CANVAS_WIDTH/2;
    n = 0;
    
    wendyClickableSetup();
    postClickableSetup();
    smClickableSetup();
    setupStateOne();
    setupStateTwo();
    setupStateThree();

    
    currentScreen = screensList[0];  
    if (debug) {
        console.log(screensList);
    }
    drawAgain = true;
    strokeWeight(0);
}

function draw() {
    if (drawAgain){
        //background fill
        fill("#ddd");
        rect(CANVAS_LEFT, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        //draw current screen
        if(debug){
            console.log(currentScreen);
        } else {
            console.log("Current Screen: "+ currentScreen.name);
        }
        currentScreen.draw();
        
        //don't redraw
        drawAgain = false; 
    }
    //draw clicker only if clicker available
    if (hasText){textClicker.draw();}
    if (hasPostButton){postClicker.draw();}
    if (hasSMButtons){
        for (var i=0; i<5; i++){
            smClickers[i].draw();
        }
        if(currentScreen.commentsUnread){
                fill("#e23");
                rect(CANVAS_LEFT+300, 560, 10, 10, 10); 
        }
    }
}
