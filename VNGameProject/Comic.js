class Comic{
    /*
        Container class for comic chapters. Takes an array of page image urls
    */
    constructor(pages, x, y, wid, hei){
        this.pages = pages; 
        this.pvPage;
        this.nxPage = loadImage(pages[1]);
        this.curPage = loadImage(pages[0]);
        this.curPageInd = 0;
        this.choice;
        this.x = x;
        this.y = y;
        this.width = wid;
        this.height = hei;
    }
    
    /*
        Draws the current page on the screen. 
    */
    drawPage(){
        image(this.curPage, this.x, this.y, this.width, this.height);
    }
    
    nextPage(){
        this.curPageInd++;
        loadPages();
        drawPage();
    }
    prevPage(){
        this.curPageInd--;
        loadPages();
        drawPage();
    }
    
    /*
        Loads in adjacent pages to minimize ram usage
    */
    loadPages(){
        this.curPage = loadImage(pages[this.curPageInd]);
        
        if (this.curPageInd >0){
            this.pvPage = loadImage(pages[this.curPageInd-1]);
        }
        if (this.curPageInd < pages.length-1){
             this.nxPage = loadImage(pages[this.curPageInd+1]);
        }
    }
    

}
    