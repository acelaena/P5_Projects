class ComicScreen{
    /*
        Container class for comic chapters. Takes an array of page image urls
        name = page name
        page = array of page urls
        
    */
    constructor(name, pages, x, y, wid, hei){
        this.name = name;
        this.pages = pages; 
        this.pvPage = null; 
        this.nxPage = null; 
        this.curPage = null; 
        this.curPageInd = 0; 
        this.choice  = null;
        this.x = x;
        this.y = y;
        this.width = wid;
        this.height = hei;
        this.draw = function() {
            // Fill in this function after creation. 
        };
        this.preload = function() {
            this.next.load();
        };
        this.load = function(){
            // Fill in this function after creation. 
        };
        this.postload = function(){
            // fill in this function after creation.
            // postload is executed once as the screen changes
        }
        // next screen
        this.next = null; 
        //flag to move onto next screen
        this.comicEnd = false;
        // screen advancement handled separately
        this.toNextKey = " "; 
        this.hasWendy = false;

    }
    
    /*
        Draws the current page on the screen. 
    */
    drawPage(){
        image(this.curPage, this.x, this.y, this.width, this.height);
        if (this.comicEnd){
            fill(BLACKTINT);
            rect(center_x-140, 558, 280, 30, 10);
            fontStyle(20, "#ddd", CENTER, BOLDITALIC);
            text("Press Space to Continue", center_x, 580);
            fontStyle();
        }
    }
    
    /*
        Page Navigation functions. 
        Loads pages one ahead of time to minimize ram usage
        don't go too fast, because it only draws each page once. 
    */
    nextPage(){
        //get page from already loaded memory
        this.pvPage = this.curPage;
        this.curPage = this.nxPage;
        //load new page ahead of time
        this.curPageInd++;
        //don't load if index out of bounds
        if (this.curPageInd < this.pages.length-1){
            this.nxPage = loadImage(this.pages[this.curPageInd+1]);
        } 
        //finally draw it
        this.drawPage();
    }
    prevPage(){
        //get page from already loaded memory
        this.nxPage = this.curPage;
        this.curPage = this.pvPage;
        //load new page ahead of time
        this.curPageInd--;
        //don't load if negative index
        if (this.curPageInd >0){
            this.pvPage = loadImage(this.pages[this.curPageInd-1]);
        }
        //finally draw it
        this.drawPage();
    }
    
    /*
        A function to call within sketch's keyTyped, to handle keypresses to this specific class. 
    */
    keyTypedHandler(value){
        if(value === LEFT_ARROW ){ 
            //prevent overflow
            if (this.curPageInd >0){ this.prevPage(); } 
            drawAgain = true;
        }
        if(value === RIGHT_ARROW ){
            //prevent overflow
            if (this.curPageInd < this.pages.length-1){this.nextPage();}
            else {
                console.log("Next enabled.");
                this.comicEnd = true;
                if(this.next != null){
                    this.preload();
                }
            }
            drawAgain = true;
        }
    }
    
    /*
        Choice handler. 
        int choices - 1-3 possible choices. 
    */
    choice(choices, choiceText, pgs1, pgs2 = null, pgs3 = null){
        //parameter validation; 
        if (choices >= 2 && pgs2 == null){ return; }
        if (choices == 3 && pgs3 == null){ return; }
        if (choices > 3) { return; }
        
    }
}
    