class SocialMediaScreen{
    /*
        Container class for social media screens. 
        chNo: Integer of chapter number
        chDesc: chapter text description
        comments: array of comments in name, comment pairs. 
        messages: array of messages in name, message, message, delim format. 
        
    */
    constructor(name, chNo, chDesc, comments){
        this.name = name; 
        this.draw = function() {
            // Fill in this function after creation. 
        };
        this.preload = function() {
            this.next.load();
        };
        this.load = function(){
            // Fill in this function after creation. 
            // load is called in the preload of the previous screen. 
        };
        this.postload = function(){
            // fill in this function after creation.
            // postload is executed once as the screen changes
        }
        this.next = null;
        this.toNextKey = ' '; 
        this.data;
        this.hasWendy = false;
        this.chNo = chNo;
        this.chDesc = chDesc;
        this.currentTab = "home";
        this.comments = comments;
        this.commentsUnread = true;
        this.commentsPosition = 0;
    }
    
    drawSMPage(){
        drawSMBG();
        if (this.currentTab === "home"){
            drawHomeContent(this.chNo, this.chDesc);
        }
        if (this.currentTab === "comments"){
            drawCommentContent(this.comments, this.commentsPosition);
            this.commentsUnread = false;
        }
        if (this.currentTab === "messages"){
        
        }
    
    }
    
     keyTypedHandler(value){
        if(value === UP_ARROW ){ 
            this.commentsPosition -= 6; 
            //prevent overflow
            if (this.commentsPosition < 0 ){ this.commentsPosition = 0; } 
            drawAgain = true;
        }
        if(value === DOWN_ARROW ){
            //prevent overflow
            this.commentsPosition += 6; 
            //prevent overflow
            if (this.commentsPosition > this.comments.length-1  ){ this.commentsPosition = this.comments.length-7; } 
            drawAgain = true;
        }
    }
   
    
}
    
 function drawSMBG(){
        //bg
        fill(NOTBLACK);
        rect(CANVAS_LEFT, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fill(ROBIN);
        rect(CANVAS_LEFT+100, 0, CANVAS_WIDTH-200, CANVAS_HEIGHT);
    }

function drawHomeContent(chNo, chDesc){
    fill(WHITETINT);
    rect(CANVAS_LEFT+150, 150, CANVAS_WIDTH-300, 250, 20);
    image(thumb, CANVAS_LEFT+150, 150, 250, 250);
    fontStyle(36, "#000", LEFT, BOLD);
    text("LONDON NIGHT ch " +chNo, CANVAS_LEFT+410, 200);
    fontStyle();
    text(chDesc, CANVAS_LEFT+410, 250);  
}

function drawCommentContent(comments, position){
    fontStyle(36, "#000", LEFT, BOLD);
    text("Comments on LONDON NIGHT", CANVAS_LEFT+200, 40);
    let j = 0;
    
    for(var i = position; i<Math.min(position+6, comments.length-1); j++){
        fill(WHITETINT);
        rect(CANVAS_LEFT+150, 90+ j*150, CANVAS_WIDTH-300, 130, 20);
        
        fontStyle(16, "#000", LEFT, BOLD);
        text(comments[i], CANVAS_LEFT+170, 120+ j*150);
        fontStyle();
        text(comments[i+1], CANVAS_LEFT+170, 140+ j*150, CANVAS_WIDTH-340);
        
        i+=2;
    }
    
    if (i<comments.length-1){
        fill(WHITETINT);
        rect(CANVAS_LEFT+150, 90+ i/2*150, CANVAS_WIDTH-300, 130, 20);
        fontStyle(16, "#000", LEFT, BOLD);
        text(comments[i], CANVAS_LEFT+170, 120+ i/2*150);
        this.commentsUnread = true;
    }
    
}

function postClickableSetup(){
    postClicker = new Clickable();
    postClicker.color = "#e23";
    postClicker.text = "Post!"
    postClicker.strokeWeight = 0; 
    postClicker.resize(60, 40);
    postClicker.cornerRadius = 10;
    postClicker.locate(CANVAS_LEFT + 680, 400);
    postClicker.onPress = function(){
        //move on if next isn't null
        nextScreen();
        hasPostButton = false;
    }
}

function smClickableSetup(){
    var i;
    var j = 5;
    
    for (i=0; i<j; i++){
        smClickers.push(new Clickable());
        smClickers[i].color = "#0000";
        smClickers[i].image = icons[i];
        smClickers[i].text = "";
        smClickers[i].strokeWeight = 0;
        smClickers[i].resize(30, 30);
        let x = (CANVAS_LEFT+120) + (i*160) 
        smClickers[i].locate(x, 560);
    }
    //home
    smClickers[0].onPress = function(){
        currentScreen.currentTab = "home"; 
        drawAgain = true;
    };
    //comments
    smClickers[1].onPress = function(){
        console.log("comment click");
        currentScreen.currentTab = "comments";
        drawAgain = true;
    };
    //messages (also does nothing for now...
    smClickers[2].onPress = function(){}; 
    //post (does nothing for now?)
    smClickers[3].onPress = function(){}; 
    //logout = next screen 
    smClickers[4].onPress = function(){
        nextScreen();
        hasSMButtons = false;  
    };
    
}