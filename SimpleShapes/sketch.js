    var xCoord_A, xCoord_B, xCoord_C;
    var yCoord_A, yCoord_B, yCoord_C;

// Setup code goes here
function setup() {
  createCanvas(1200, 800);
    textSize(20);
    textAlign(CENTER);
    
    randomizeCoords();
 }

function randomizeCoords(){
    xCoord_A = Math.floor(Math.random() * 100); 
    yCoord_A = Math.floor(Math.random() * 100); 
    
    xCoord_B = Math.floor(Math.random() * 300) + 100;
    yCoord_B = Math.floor(Math.random() * 300) + 100;
    
    xCoord_C = Math.floor(Math.random() * 500) + 300;
    yCoord_C = Math.floor(Math.random() * 500) + 300;

}

function mouseClicked() {
    randomizeCoords();
}

// Draw code goes here
function draw() {

    background('#efca94');
    fill('#cf48a6');
    stroke('#0000');
    strokeWeight(10);
    circle(0,height/2,1200);
    
    fill('black');
    text("left-click to randomize rectangle placements!", width/2, height/4);
    
    fill('aquamarine');
    stroke('darkblue');
    rect(xCoord_A, yCoord_A, 55, 55, 20);
    rect(xCoord_A, yCoord_B, 55, 55, 20);
    rect(xCoord_A, yCoord_C, 55, 55, 20);
    
    fill('darkviolet');
    stroke('magenta');
    rect(xCoord_B, yCoord_A, 55, 55, 20);
    rect(xCoord_B, yCoord_B, 55, 55, 20);
    rect(xCoord_B, yCoord_C, 55, 55, 20);
    
    fill('yellow');
    stroke('darkcyan');
    rect(xCoord_C, yCoord_A, 55, 55, 20);
    rect(xCoord_C, yCoord_B, 55, 55, 20);
    rect(xCoord_C, yCoord_C, 55, 55, 20);
}