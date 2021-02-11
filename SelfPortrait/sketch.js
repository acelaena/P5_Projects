const PXWIDTH = 32;
const PXHEIGHT = 32;
const SCALEFACTOR = 10;

let pixel_canvas;
let black_jack;


function mouseClicked(){
}

class Pixel{
    constructor(xpos, ypos, col, sca = 10, xoff = 0, yoff = 0){
        this.xCoord = xpos;
        this.yCoord = ypos;
        this.scale = sca;
        this.xOffset = xoff;
        this.yOffset = yoff;
        fill(col); 
        rect(this.xCoord * this.scale + this.xOffset, this.yCoord * this.scale + this.yOffset, this.scale, this.scale);
    }
    
    setColor(col){
        erase();
        rect(this.xCoord * this.scale + this.xOffset, this.yCoord * this.scale + this.yOffset, this.scale, this.scale);
        noErase();
        fill(col); 
        rect(this.xCoord * this.scale + this.xOffset, this.yCoord * this.scale + this.yOffset, this.scale, this.scale);

    }
}

class PixelCanvas{
    constructor(xpx, ypx, sca = 10, bgcol = '#000', xoff = 0, yoff = 0){
        this.xWidth = xpx;
        this.yHeight = ypx;
        this.scale = sca;
        
        this.pixelCanvas = new Array(this.yHeight);
        for (var i = 0; i < this.pixelCanvas.length; i++){
            this.pixelCanvas[i] = new Array(this.xWidth);
        }
        
        for(i = 0; i < this.yHeight; i++){ //rows
            for (var j = 0; j < this.xWidth; j++) { //columns
                this.pixelCanvas[j][i] = new Pixel(j, i, bgcol, this.scale, xoff, yoff);
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
        if (x>= this.xWidth || y>= this.yHeight){
            console.log("pixel out of bounds.");
            return;
        }
        this.pixelCanvas[x][y].setColor(color);
    }
}   

function setCanvasBg(){
    var col_1 = [207, 234, 207];
    var col_2 = [232, 246, 207]; 
    var r, g, b = 0;
    
    for(var i = 0; i < pixel_canvas.getHeight(); i++){ //rows
        for (var j = 0; j < pixel_canvas.getWidth(); j++) { //columns
            r = col_1[0] + (col_2[0]-col_1[0])/pixel_canvas.getHeight()*i;
            g = col_1[1] + (col_2[1]-col_1[1])/pixel_canvas.getHeight()*i;
            b = col_1[2] + (col_2[2]-col_1[2])/pixel_canvas.getHeight()*i;

            pixel_canvas.setPixel(j, i, color(r,g,b));
        }
    }
}

function drawPortrait(){
    var i, j; 
    
    /*---- LAYER ONE ----*/ 
    //Black
    var blackStart = [14,11, 9, 8, 7, 6, 6, 5, 5, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 5, 6];
    var blackEnd   = [20,22,24,25,26,26,27,27,28,28,28,28,28,29,29,29,29,29,28,28,27,27,27,26,26];
    for(i = 0; i < blackStart.length; i++){
        for(j = blackStart[i]; j < blackEnd[i]; j++){
            pixel_canvas.setPixel(j, i+1, '#000');
        }
    }
    
    //Black singles
    pixel_canvas.setPixel(7, i+1, '#000');
    for(j = 9; j < 13; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    pixel_canvas.setPixel(17, i+1, '#000');
    pixel_canvas.setPixel(18, i+1, '#000');
    pixel_canvas.setPixel(22, i+1, '#000');
    pixel_canvas.setPixel(23, i+1, '#000');
    pixel_canvas.setPixel(25, i+1, '#000');
    pixel_canvas.setPixel(26, i+1, '#000');
    i++;
    
    for(j = 9; j < 18; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    pixel_canvas.setPixel(22, i+1, '#000');
    i++;
    
    pixel_canvas.setPixel(9, i+1, '#000');
    for(j = 11; j < 17; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    pixel_canvas.setPixel(22, i+1, '#000');
    i++;
    
    for(j = 8; j < 12; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    pixel_canvas.setPixel(13, i+1, '#000');
    pixel_canvas.setPixel(14, i+1, '#000');
    pixel_canvas.setPixel(23, i+1, '#000');
    pixel_canvas.setPixel(24, i+1, '#000');
    i++;
    
    for(j = 6; j < 12; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    for(j = 22; j < 29; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    i++;
    for(j = 4; j < 13; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    for(j = 21; j < 31; j++){
        pixel_canvas.setPixel(j, i+1, '#000');
    }
    
    //skintone
    var skin = color(255,241,219);
    var skinStart = [20,19,18,17,16,15,14,13,11,11, 7, 7, 7, 8, 8, 9,10,11,12,13];
    var skinEnd   = [21,21,22,22,22,22,22,23,23,23,23,23,22,22,21,20,21,20,19,17];
    for(i = 0; i < skinStart.length; i++){
        for(j = skinStart[i]; j < skinEnd[i]; j++){
            pixel_canvas.setPixel(j, i+7, skin);
        }
    }
    skinStart = [21,20,19,18,17,15,13,13];
    skinEnd   = [22,22,22,22,22,23,22,21];
    for(i = 0; i < skinStart.length; i++){
        for(j = skinStart[i]; j < skinEnd[i]; j++){
            pixel_canvas.setPixel(j, i+24, skin);
        }
    }
    //skin singles
    i = 12;
    pixel_canvas.setPixel(11, i, skin);
    i++;
    pixel_canvas.setPixel(10, i, skin);
    i++;
    pixel_canvas.setPixel(9, i, skin);
    pixel_canvas.setPixel(10, i, skin);
    pixel_canvas.setPixel(11, i, skin);
    
    i = 29;
    pixel_canvas.setPixel(12, i, skin);
    i++
    pixel_canvas.setPixel(12, i, skin);
    
    //blue
    var blue = color(13,25,148);
    
    i = 4;
    
    pixel_canvas.setPixel(9, i, blue);
    i++;
    
    pixel_canvas.setPixel(8, i, blue);
    i++;
    
    for(j = 0; j < 3; j++){
         pixel_canvas.setPixel(7+j, i, blue);
    }
    pixel_canvas.setPixel(24, i, blue);
    i++;
    
    pixel_canvas.setPixel(7, i, blue);
    pixel_canvas.setPixel(13, i, blue);
    pixel_canvas.setPixel(25, i, blue);
    i++;
    
    pixel_canvas.setPixel(7, i, blue);
    pixel_canvas.setPixel(11, i, blue);
    pixel_canvas.setPixel(12, i, blue);
    pixel_canvas.setPixel(25, i, blue);
    i++;
    
    pixel_canvas.setPixel(6, i, blue);
    pixel_canvas.setPixel(10, i, blue);
    pixel_canvas.setPixel(11, i, blue);
    pixel_canvas.setPixel(16, i, blue);
    pixel_canvas.setPixel(23, i, blue);
    pixel_canvas.setPixel(25, i, blue);
    i++;
    
    for(j = 0; j < 5; j++){
         pixel_canvas.setPixel(6+j, i, blue);
    }
    pixel_canvas.setPixel(13, i, blue);
    pixel_canvas.setPixel(15, i, blue);
    pixel_canvas.setPixel(23, i, blue);
    pixel_canvas.setPixel(25, i, blue);
    i++;
    
    for(j = 0; j < 5; j++){
         pixel_canvas.setPixel(5+j, i, blue);
    }
    pixel_canvas.setPixel(13, i, blue);
    pixel_canvas.setPixel(14, i, blue);
    pixel_canvas.setPixel(24, i, blue);
    pixel_canvas.setPixel(25, i, blue);
    i++;
    
    
    pixel_canvas.setPixel(5, i, blue);
    pixel_canvas.setPixel(6, i, blue);
    pixel_canvas.setPixel(8, i, blue);
    pixel_canvas.setPixel(24, i, blue);
    i++;
    
    pixel_canvas.setPixel(4, i, blue);
    pixel_canvas.setPixel(5, i, blue);
    i++;
    pixel_canvas.setPixel(4, i, blue);
    i++;
    
    /*---- LAYER TWO ----*/
    
    var brown = color(122,36,7);
    //eyes
    pixel_canvas.setPixel(16, i, '#FFF');
    pixel_canvas.setPixel(19, i, '#FFF');
    i++;
    
    pixel_canvas.setPixel(8, i, '#FFF');
    pixel_canvas.setPixel(10, i, '#FFF');
    
    i=11; 
    for(j = 0; j < 3; j++){
         pixel_canvas.setPixel(18+j, i, '#000');
    }
    i++;
    for(j = 0; j < 2; j++){
         pixel_canvas.setPixel(16+j, i, '#000');
    }
    i++;
    pixel_canvas.setPixel(15, i, '#000');
    i++;
    for(j = 0; j < 5; j++){
         pixel_canvas.setPixel(16+j, i, '#000');
    }
    i++;
    pixel_canvas.setPixel(15, i, '#000');
    pixel_canvas.setPixel(17, i, brown);
    pixel_canvas.setPixel(18, i, brown);
    i++;
    pixel_canvas.setPixel(9, i, brown);
    
    //nose
    for(j = 0; j < 4; j++){
        pixel_canvas.setPixel(12, i, '#000');
        i++;
    }
    for(j = 0; j < 2; j++){
         pixel_canvas.setPixel(13+j, i, '#000');
    }
    i++;
    i++;
    i++;
    for(j = 0; j < 3; j++){
         pixel_canvas.setPixel(13+j, i, '#000');
    }
}

function preload() {
    black_jack = loadFont('http://acelaena.github.io/fonts/BLACKJAR.TTF');
}

// Setup code goes here
function setup() {
    createCanvas(windowWidth, windowHeight-5);
    background('#fff3fa');
    strokeWeight(0);
    textAlign(CENTER);
    //color(0, 0, 0, 0)
    
    pixel_canvas = new PixelCanvas(PXWIDTH, PXHEIGHT, SCALEFACTOR, '#FFF', width/2 - (PXWIDTH*SCALEFACTOR/2), height/2 -(PXHEIGHT*SCALEFACTOR/2));
    
    textFont(black_jack);
    
    textSize(80);
    fill('#20225588');
    text("Believe in the me that \nbelieves in you. ", width/4, 40);
    
    textSize(50);
    fill('#20225564');
    text("I love deadlines.\n I love the whooshing sound \nthey make as they fly by. \n-Douglas Adams", width*3/4, 70);
    
    textSize(30);
    fill('#202255cf');
    text("the city looks\nso pretty\ndo you wanna\nburn it with\nme\n-Hollywood Undead", width/5, 230);
    
    textSize(45);
    fill('#20225532');
    text("creativity", width*4/5, 350);
    textSize(18);
    text("is closely linked to", width*4/5+100,360);
    textSize(36);
    text("insanity", width*4/5+130, 390);
    
    textSize(60);
    fill('#202255a6');
    text("I HAVE THE POWER OF GOD AND ANIME ON MY SIDE", width/2, height-100);
    
    setCanvasBg();
    drawPortrait();
    
 }

// Draw code goes here
function draw() {
    //console.log("");
    //pixelCanvas[25][30].setColor(color(255,240,0));
    
    smooth();
    fill('black');
    //text("dummyText", width/2, height/5);
}  
