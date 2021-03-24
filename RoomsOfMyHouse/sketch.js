/**
	RoomsOfMyHouse 
	by Acelaena

    Overview:
    A simple state machine that utilizes the classes in Rooms.js. 

	Notes:
    - Kitchen image source: https://www.extraspace.com/blog/home-organization/room-organization/design-a-minimalist-kitchen-with-these-ideas/
    - Bathroom image source: http://www.home-designing.com/modern-minimalist-bathroom-interior-design-decor-photos
    - office image source: https://www.spacejoy.com/interior-designs-blog/7-home-office-setups-to-get-you-inspired
    - p5 smelly I could do this faster with html/css/js

*/
var drawFunction;
var house; 
var currentRoom;
var imgSize;

let splash;
let blueprint;
let blueprint_mini;
let key_img = [];

function houseSetup(){
    house = new House(); 
    
    var greenhouse = new Room("Greenhouse", "An art studio filled with plants, art, and comfy furniture. One wall is filled with ceiling to floor windows,\n and the other is painted with a magical landscape. This probably used to be the living room.", loadImage('assets/greenhouse.PNG')); 
        house.addRoom(greenhouse);
        house.setEntrance(greenhouse);
    
    var kitchen = new Room("Kitchen", "A bare-minimum appearing kitchen. Everything is carefully stashed.", loadImage('assets/kitchen.PNG'));
        house.addRoom(kitchen);
        kitchen.setWest(greenhouse);
        greenhouse.setNorth(kitchen);

    var bathroom = new Room("Bathroom", "A minimalist bathroom with just a toilet, sink, and shower.", loadImage('assets/bathroom.PNG'));
        house.addRoom(bathroom);
        bathroom.setWest(kitchen);
        kitchen.setEast(bathroom);

    var bedroom = new Room("Bedroom", "Compared to the rest of the house, this room looks very lived-in. It's small, barely more than a bed and a closet, but the assortment of plushies take up the remaining space nicely.", loadImage('assets/bedroom.PNG'));
        house.addRoom(bedroom);
        bedroom.setWest(greenhouse);
        greenhouse.setSouth(bedroom);
    
    var office = new Room("Office", "Is this really an office..? The walls are covered in art, a whiteboard, and a mirror. On the desk is two oversized monitors, a Wacom Cintiq, and a mess of wires. The L shaped desk extension holds a tea kettle, a half eaten plate of food, and a mess of papers.", loadImage('assets/office.PNG'));
        house.addRoom(office);
        office.setNorth(bathroom);
        bathroom.setEast(office);
    
    var hallway = new Room("Hallway", "A corridor with doors on all sides. Were you expecting anything else?", loadImage('assets/hallway.PNG'));
        house.addRoom(hallway);
        kitchen.setSouth(hallway);
        hallway.setNorth(kitchen);
    
        bedroom.setNorth(hallway);
        hallway.setSouth(bedroom);
        office.setWest(hallway);
        hallway.setEast(office);
        greenhouse.setEast(hallway);
        hallway.setWest(greenhouse);
}


/*
    Draws an object of type Room to the canvas. 
*/
function drawRoom(){
    image(currentRoom.getImg(), 0, 0, imgSize, imgSize*5/9);    

    drawText();
    drawMinimap();
}

function drawText(){
    
    fill('#fff8');
    rect(0, height-200, width, 200);
    textAlign(CENTER);
    fill('#18134d');
    textSize(24);
    textStyle(BOLD);
    text(currentRoom.getName(), width/2, height-150);
    
    textSize(16);
    textStyle(ITALIC);
    text(currentRoom.getInfo(), 200, height-120, width-400, 100);
}

/*
    Draws the current minimap. 
*/
function drawMinimap(){
    image(blueprint_mini, width-175, height-175, 150, 150); 
    image(key_img[0], width-114, height-187);
    image(key_img[1], width-187, height-114);
    image(key_img[2], width-114, height-44);
    image(key_img[3], width-44, height-114);
    
    
    //refactor later to put this data in room object
    if(currentRoom.name == "Greenhouse"){
        image(key_img[4], width-156, height-144);
    } else if (currentRoom.name == "Kitchen") {
        image(key_img[4], width-122, height-144);
    } else if (currentRoom.name == "Hallway") {
        image(key_img[4], width-112, height-128);
    } else if (currentRoom.name == "Bedroom") {
        image(key_img[4], width-122, height-110);
    } else if (currentRoom.name == "Office") {
        image(key_img[4], width-78, height-128);
    } else if (currentRoom.name == "Bathroom") {
        image(key_img[4], width-104, height-144);
    }
}

/*
    Draws the splash screen. 
*/
function drawSplash() {
   image(splash, 0, 0, imgSize, imgSize*5/9);

}

/*
    Draws the Info screen. 
*/
function drawInfo(){
    image(blueprint, 0, 0, imgSize, imgSize*5/9);
    fill('#fff8');
    rect(0, height-200, width, 200);
    
    fill(0);
    textStyle(ITALIC);
    textSize(22);
    var infoText = ["Use WASD directions to navigate the rooms of the house.", "Hit 'X' to return to the splash screen.", "Hit 'I' to return to the map screen.", "Click or press any key again to start house tour."] 
    for(var i = 0; i<infoText.length; i++){
        text(infoText[i], 175, height-150+i*30, width-350, 100);
    }
}

/**
    Keyboard navigation support. While on a non-room screen, all keys will advance the screen.
    
    On room screen:
    W = go north; if no north connecting room do nothing. 
    A = go west, ditto. 
    S = go south
    D = go east
    
    X = return to splash
    I = return to info/blueprint
*/
function keyTyped() {
    console.log("key typed: "+ key);
    if( drawFunction === drawSplash ) {
        drawFunction = drawInfo; 
        return;
    } else if( drawFunction === drawInfo ) {
        currentRoom = house.getEntrance();
        drawFunction = drawRoom; 
        return;
    } 

    if( key === 'w' ) {
        if (currentRoom.getNorth() === null){ 
            return; 
        } else {
            currentRoom = currentRoom.getNorth();
        }
    } else if( key === 'a' ) {
        if (currentRoom.getWest() === null){ return; }  
        else {
            currentRoom = currentRoom.getWest();
        }
    } else if( key === 's' ) {
        if (currentRoom.getSouth() === null){ return; }  
        else {
            currentRoom = currentRoom.getSouth();
        }
    } else if( key === 'd' ) {
        if (currentRoom.getEast() === null){ return; }  
        else {
            currentRoom = currentRoom.getEast();
        }
    }

    else if( key === 'x' ) {
        drawFunction = drawSplash;
    }
    else if( key === 'i' ) {
        drawFunction = drawInfo;
    }
}

    
/**
    Mouse navigation support. While on a non-room screen, clicking will advance the screen.
*/
function mousePressed() {
    if( drawFunction === drawSplash ) {
        drawFunction = drawInfo; 
    } else if( drawFunction === drawInfo ){
        currentRoom = house.getEntrance();
        drawFunction = drawRoom; 
  }
}



function preload() {
    splash = loadImage('assets/splash.PNG');
    blueprint = loadImage('assets/blueprint.PNG');
    blueprint_mini = loadImage('assets/blueprint_sm.PNG');
    key_img[0] = loadImage('assets/W.PNG');
    key_img[1] = loadImage('assets/A.PNG');
    key_img[2] = loadImage('assets/S.PNG');
    key_img[3] = loadImage('assets/D.PNG');
    key_img[4] = loadImage('assets/arrow.PNG');

    
}

function setup() {
    //remove scrollbar width because p5 smelly and I cant do my elegant no-scrollbar trick
  createCanvas(windowWidth-12, windowHeight-12);

  // Center our drawing objects
    textFont('Quicksand');
    textAlign(CENTER);
    textSize(24);
    
    imgSize = width;
    if (height > 5/9*width){
        imgSize = 9/5*height;
    }
    
    
    drawFunction = drawSplash;

    //setup house
    houseSetup();
    currentRoom = null;
}

function draw() {
    background('#e8f6ce');
    drawFunction();
}