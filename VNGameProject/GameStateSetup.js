/*
    State one is the simple screens to progress through in the beginning of the game. 
*/
function preloadStateOne(){
    splash = loadImage("https://acelaena.github.io/assets3/splash.PNG");
    thumb = loadImage("https://acelaena.github.io/assets3/thumb.PNG");
    
    icons[0] = loadImage("https://acelaena.github.io/assets3/home.svg");
    icons[1] = loadImage("https://acelaena.github.io/assets3/notif.PNG");
    icons[2] = loadImage("https://acelaena.github.io/assets3/mail.PNG");
    icons[3] = loadImage("https://acelaena.github.io/assets3/post.svg");
    icons[4] = loadImage("https://acelaena.github.io/assets3/logout.PNG");
    icons[5] = loadImage("https://acelaena.github.io/assets3/white.PNG");
}
function setupStateOne(){
    // Setup Simple Screens -- ZERO
    screensList.push(new SimpleScreen("title"));
    screensList[screenCount].draw = function() {
        image(splash, CANVAS_LEFT, 0, 960, 600);
        if(this.next != null){
            this.preload();
        }
    }
    screenCount++;
    
    //ONE
    screensList.push(new SimpleScreen("warning"));
    screensList[screenCount].load = function() {
        this.data = loadImage("https://acelaena.github.io/assets3/warning.PNG"); 
    }
    screensList[screenCount].draw = function() {
        image(this.data, CANVAS_LEFT, 0, 960, 600);
        this.preload();
    }
    screensList[screenCount-1].next = screensList[screenCount]; 
    screenCount++;
    
    //TWO
    screensList.push(new SimpleScreen("controls"));
    screensList[screenCount].load = function() {
        this.data = loadImage("https://acelaena.github.io/assets3/instruction.PNG"); 
    }
    screensList[screenCount].draw = function() {
        image(this.data, CANVAS_LEFT, 0, 960, 600);
        if(this.next != null){
            this.preload();
        }
    }
    screensList[screenCount-1].next = screensList[screenCount]; 
    screenCount++;
}

/*
    State Two is wendy's intro + first comic pages
*/
function setupStateTwo(){
    w.push(new Wendy([0,1], ["Hey! I'm Wendy of WendyWonderly. Professional designer, illustrator, comic artist, and avid video gamer.", "Well, self proclaimed professional comic artist. Today's the release of my debut comic!"]));
    
    //simple screen for intro
    screensList.push(new SimpleScreen("intro"));
    screensList[screenCount].load = function() {
        this.hasWendy = true;
        if(debug){
            console.log("intro load"); 
        }
    }
    screensList[screenCount].draw = function() {
        fontStyle(16,"#000",CENTER);
        text("Press Space to Continue" , center_x-250, CANVAS_HEIGHT-80, 500);
        console.log(w[0]);
        w[wendyCounter].wendyText();
        canAccessControls = true; 

        if(this.next != null){
            this.preload();
        }
    }
    screensList[screenCount-1].next = screensList[screenCount]; 
    screenCount++;  
 
    //Load chapter one page urls (5)
    for (var i = 1; i<=5; i++){
        c1pgs[i-1] = "https://acelaena.github.io/assets3/1-"+ i + ".PNG";
    } 
    
    //setup comic screen
    screensList.push(new ComicScreen("comic 1", c1pgs, CANVAS_LEFT, 0, 960, 600));
    screensList[screenCount].load = function() {
        this.nxPage = loadImage(this.pages[this.curPageInd+1]);
        this.curPage = loadImage(this.pages[this.curPageInd]);
    }
    screensList[screenCount].draw = function() {
        this.drawPage();
    }
    screensList[screenCount-1].next = screensList[screenCount]; 
    screenCount++;
}

/*
    State Three:
    TODO: screen 1: Wendy talks about how excited she is to post her comic. Twitter-like interface to post
     > comments start rolling in after clicking post button
    TODO: Screen 2: click on comments button, comments scroll 
    screen 3: simpleScreen: "8 months later..."
    screen 4: wendy: Beginning of the end... last arc of my comic! hehe, this is where it gets good! 
    screen 5: comic screen chapter 32s
    TODO: screen 6: Click post
    TODO: screen 7: comments(2) and mail(1) available
    >> can lose up to 2 motivation and gain 1 motivation
*/
function setupStateThree(){
    
    w.push(new Wendy([2,5,2], ["I'm so excited for the world to see my comic!", "It's been my dream for so long... I feel like I could cry..", "All that's left is to click the post button!"]));
    
    //setup screen 1
    screensList.push(new SimpleScreen("first post"));
    screensList[screenCount].load = function() {
        this.hasWendy = true;
        // continue by post button
        this.toNextKey = null;
        if(debug){
            console.log("first post load"); 
        }
    }
    screensList[screenCount].draw = function() {
        //bg
        drawSMBG();
        // content 
        drawHomeContent(1, "Artist: WendyWonderly\t\t\t Posted: XX, YY, 20ZZ \nBookmarks: 0 \t\t\t\t\t Likes: 0\n\nAspiring fashion designer Emily May nails an \ninternship at Aelvyra Fashion Co., a world-\nrenowned high fashion brand. But something \nseems strange about the CEO, Analine... ");
        
        fill("#000");
        w[wendyCounter].wendyText();
        
        if(this.next != null){
            this.preload();
        }
        if(!hasText){
            hasPostButton = true;
        }
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
    w.push(new Wendy([2, 1], ["Wow! There's comments already!", "Let's click on the bell icon to check our notifications..."]));
    w.push(new Wendy([4], ["Aww, that's it... Well, time to log off for tonight!"]));
    //setup screen 2 
    screensList.push(new SocialMediaScreen("ch1 post", 1, "Artist: WendyWonderly\t\t\t Posted: XX, YY, 20ZZ \nBookmarks: 0 \t\t\t\t\t Likes: 0\n\nAspiring fashion designer Emily May nails an \ninternship at Aelvyra Fashion Co., a world-\nrenowned high fashion brand. But something \nseems strange about the CEO, Analine... ", ["Meepvee", "Wow... the art is so gorgeous!", "Tuffy", "Can't wait to see more!", "Ceylon", "Ahhh Emily is so cute! Must protecc!"]));
    screensList[screenCount].load = function() {
        this.hasWendy = true;
        // continue by logout button
        this.toNextKey = null;
        this.commentsUnread = false;
        if(debug){
            console.log("first post load"); 
        }
    }
    screensList[screenCount].draw = function() {
        this.drawSMPage();
        
        fill("#000");
        if(!this.commentsUnread && wendyCounter < 4){
            hasSMButtons = false;
            w[wendyCounter].wendyText();
        }
        if(!hasText){
            //literally held together by hot glue and dreams
            if (wendyCounter < 4){ this.commentsUnread = true; }
            hasSMButtons = true;
            drawAgain = true;
        }
        
        
        if(this.next != null){
            this.preload();
        }
        
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
    
    
    //setup screen 3
    screensList.push(new SimpleScreen("timeskip"));
    screensList[screenCount].load = function() {
        //Nothing to see here...
        if(debug){
            console.log("timeskip load"); 
        }
    }
    screensList[screenCount].draw = function() {
        fill("#000");
        rect(CANVAS_LEFT, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        fontStyle(24,"#FFF",CENTER, BOLD);
        text("8 months later..." , center_x-250, center_y-80, 500);
        fontStyle(16,"#FFF",CENTER);
        text("Press Space to Continue" , center_x-250, CANVAS_HEIGHT-80, 500);
        textAlign(LEFT);
        
        if(this.next != null){
            this.preload();
        }
        
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
    
    w.push(new Wendy([2,3], ["Beginning of the end... last arc of my comic!", "Hehe, this is where it gets good!"]));
    
    //setup screen 4
    screensList.push(new SimpleScreen("wendy comment"));
    screensList[screenCount].load = function() {
        this.hasWendy = true;
        if(debug){ console.log("wendy comment load"); }
    }
    screensList[screenCount].draw = function() {
        //continue text goes behind wendy textbox
        fontStyle(16,"#000",CENTER);
        text("Press Space to Continue" , center_x-250, CANVAS_HEIGHT-80, 500);
        w[wendyCounter].wendyText();
        
        if(this.next != null){
            this.preload();
        }
        
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
    //Load chapter 32 page urls (3)
    for (var i = 1; i<=3; i++){
        c32pgs[i-1] = "https://acelaena.github.io/assets3/32-"+ i + ".PNG";
    } 
    
    //setup screen 5
    screensList.push(new ComicScreen("comic 32", c32pgs, CANVAS_LEFT, 0, 960, 600));
    screensList[screenCount].load = function() {
        this.nxPage = loadImage(this.pages[this.curPageInd+1]);
        this.curPage = loadImage(this.pages[this.curPageInd]);
    }
    screensList[screenCount].draw = function() {
        this.drawPage();
    }
    screensList[screenCount-1].next = screensList[screenCount]; 
    screenCount++;
    
    //setup screen 6
    screensList.push(new SimpleScreen("ch32 post"));
    screensList[screenCount].load = function() {
        // continue by post button
        this.toNextKey = null;
        if(debug){ console.log("ch32 post load"); }
    }
    screensList[screenCount].draw = function() {
        //bg
        drawSMBG();
        
        //box
        drawHomeContent(32, "Artist: WendyWonderly\t\t\t Posted: XX, YY, 20ZZ \nBookmarks: 65024 \t\t\t\t Likes: 184032 \nBackers: 10809\n\nAspiring fashion designer Emily May nails an \ninternship at Aelvyra Fashion Co., a world-\nrenowned high fashion brand. But something \nseems strange about the CEO, Analine... ");
        
        fill("#000");
        hasPostButton = true;
        
        if(this.next != null){
            this.preload();
        }
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
    //setup screen 6
    screensList.push(new SocialMediaScreen("ch32 sm", 32, "Artist: WendyWonderly\t\t\t Posted: XX, YY, 20ZZ \nBookmarks: 65024 \t\t\t\t Likes: 184032 \nBackers: 10809\n\nAspiring fashion designer Emily May nails an \ninternship at Aelvyra Fashion Co., a world-\nrenowned high fashion brand. But something \nseems strange about the CEO, Analine... ",  ["Ceylon", "Uhh is nobody seeing the HUGE RED FLAGS?? Emily is CHILD CODED, NO ADULT is shorter than 5'5\" and she's even smaller than that in some panels!\nEdit: What the fuck you guys are disgusting how could you possibly ship these two like it's normal. There's a five hundred year difference.", "Ashe", "Holy shit… Analine was sus but I didn't expect that bomb drop...", "AnaLumi4Lyfe", "No way. AnaLumi is the only healthy relationship in this comic. AnaEmi shippers can go to hell where filthy $&#(@ like them fucking belong.", "Jeanie9264", "AN43M! SHIPPERS DNI, GO FUCKING D!E \n\nEDIT: WENDYWONDERLY THAT INCLUDES YOU", "Meepvee", "great chapter, as always!"] ));
    screensList[screenCount].load = function() {
        // continue by post button
        this.toNextKey = null;
        if(debug){ console.log("ch32 sm load"); }
    }
    screensList[screenCount].draw = function() {
        this.drawSMPage();
        hasSMButtons = true;
        
        if(this.next != null){
            this.preload();
        }
    }
    screensList[screenCount].postload = function() {
        if(this.commentsUnread) {
            motivation++;
        } else {
            motivation -=2;
        }
    }
    screensList[screenCount-1].next = screensList[screenCount];
    screenCount++;
    
}


