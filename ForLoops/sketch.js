const PXWIDTH = 50;
const PXHEIGHT = 50;
const SCALEFACTOR = 10;

var pixel_canvas


function mouseClicked(){
}

class Pixel {
    constructor(xpos, ypos, col, sca){
        this.xCoord = xpos;
        this.yCoord = ypos;
        this.scale = sca;
        fill(col); 
        rect(this.xCoord * this.scale, this.yCoord * this.scale, this.scale, this.scale);
    }
    
    setColor(col){
        erase();
        rect(this.xCoord * this.scale, this.yCoord * this.scale, this.scale, this.scale);
        noErase();
        fill(col); 
        rect(this.xCoord * this.scale, this.yCoord * this.scale, this.scale, this.scale);

    }
}

class PixelCanvas {
    constructor(xpx, ypx, sca){
        this.xWidth = xpx;
        this.yHeight = ypx;
        this.scale = sca;
        
        this.pixelCanvas = new Array(this.yHeight);
        for (var i = 0; i < this.pixelCanvas.length; i++){
            this.pixelCanvas[i] = new Array(this.xWidth);
        }
        
        for(i = 0; i < this.yHeight; i++){ //rows
            for (var j = 0; j < this.xWidth; j++) { //columns
                this.pixelCanvas[j][i] = new Pixel(j, i, color((i+1)*5, (j+1)*5, 255-(i+j)*2), this.scale);
            }
        }
    }
    
    getWidth(){
        return this.xWidth;
    }
    getHeight(){
        return this.yHeight;
    }
    getScale(){
        return this.scale;
    }
    
    setPixel(x, y, color){
        this.pixelCanvas[25][30].setColor(color);
    }
}   

// Setup code goes here
function setup() {
    createCanvas(SCALEFACTOR * PXWIDTH, SCALEFACTOR * PXHEIGHT);
    textSize(20);
    textAlign(CENTER);
    
    background('#0000');
    strokeWeight(0);
    
    
    pixel_canvas = new PixelCanvas(PXWIDTH, PXHEIGHT, SCALEFACTOR);
    pixel_canvas.setPixel(10,10, color(0, 0, 0, 50));
    
 }

// Draw code goes here
function draw() {
    //console.log("");
    //pixelCanvas[25][30].setColor(color(255,240,0));
    
    smooth();
    fill('white');
    text("dummyText", width/2, height/4);
}  
