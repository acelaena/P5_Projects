var xWidth = 50;
var yHeight = 50;
var scaleFactor = 10;

function mouseClicked() {
}

// Setup code goes here
function setup() {
    createCanvas(scaleFactor * xWidth, scaleFactor * yHeight);
    textSize(20);
    textAlign(CENTER);
 }

class Pixel {
  constructor(xCoord, yCoord, color) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    fill(color); 
    rect(xCoord * scaleFactor, yCoord * scaleFactor, scaleFactor, scaleFactor);
  }
  setColor(color) {
    fill(color); 
    rect(this.xCoord * scaleFactor, this.yCoord * scaleFactor, scaleFactor, scaleFactor);
  }
}

// Draw code goes here
function draw() {
    background('#0000');
    fill('#FFF0');
    strokeWeight(10);
    rect(0, 0, width, height);
    stroke('#0000');
    
    var pixelCanvas = new Array(yHeight);
    for (var i = 0; i < pixelCanvas.length; i++) {
        pixelCanvas[i] = new Array(xWidth);
    }
    
    fill(color((i+1)*5, (j+1)*5, 255-(i+j)*2)); 
    rect(0 * scaleFactor, 0 * scaleFactor, scaleFactor, scaleFactor);
    for(var i = 0; i < yHeight; i++){ //rows
        for (var j = 0; j < xWidth; j++) { //columns
            pixelCanvas[j][i] = new Pixel(j, i, color((i+1)*5, (j+1)*5, 255-(i+j)*2));
        }
    }

    pixelCanvas[20][40].setColor(color(255,10,0));
    
    
    fill('white');
    text("dummyText", width/2, height/4);
}

//        console.log(pxcolor);
