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
                
        this.pixelCanvas = new Array(this.xWidth);
        for (var i = 0; i < this.pixelCanvas.length; i++){
            this.pixelCanvas[i] = new Array(this.yHeight);
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