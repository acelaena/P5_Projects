/**
	RoomsOfMyHouse 
	by Acelaena

    Overview:
    A simple state machine that utilizes the classes in Rooms.js. 

	Notes:
	- None for now

*/
var drawFunction;
var house; 
var currentRoom;

let splash;
let blueprint;
let blueprint_mini;

function houseSetup(){
    house = new House(); 
    
    var greenhouse = new Room("Greenhouse", "An art studio filled with plants, art, and comfy furniture. One wall is filled with ceiling to floor windows, and the other is painted with a magical landscape. This probably used to be the living room.", loadImage('https://acelaena.github.io/assets/greenhouse.PNG')); 
        house.addRoom(greenhouse);
        house.setEntrance(greenhouse);
    
    var kitchen = new Room("Kitchen", "A bare-minimum appearing kitchen. Everything is carefully stashed.", loadImage('https://acelaena.github.io/assets/kitchen.PNG'));
        house.addRoom(kitchen);
        kitchen.setWest(greenhouse);
        greenhouse.setNorth(kitchen);

    var bathroom = new Room("Bathroom", "A minimalist bathroom with just a toilet, sink, and shower.", loadImage('https://acelaena.github.io/assets/bathroom.PNG'));
        house.addRoom(bathroom);
        bathroom.setWest(kitchen);
        kitchen.setEast(bathroom);

    var bedroom = new Room("Bedroom", "Compared to the rest of the house, this room looks very lived-in. It's small, barely more than a bed and a closet, but the bookcase and assortment of plushies take up the remaining space nicely.", loadImage('https://acelaena.github.io/assets/bedroom.PNG'));
        house.addRoom(bedroom);
        bedroom.setWest(greenhouse);
        greenhouse.setSouth(bedroom);
    
    var office = new Room("Office", "Is this really an office..? The walls are covered in art, a whiteboard, and a mirror. On the desk is two oversized monitors, a Wacom Cintiq, and a mess of wires. The L shaped desk extension holds a tea kettle, a half eaten plate of food, and a mess of papers.", loadImage('https://acelaena.github.io/assets/office.PNG'));
        house.addRoom(office);
        office.setNorth(bathroom);
        bathroom.setEast(office);
    
    var hallway = new Room("Hallway", "A corridor with doors on all sides. Were you expecting anything else?", loadImage('https://acelaena.github.io/assets/hallway.PNG'));
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
    image(currentRoom.getImg(), width/2, height-width*5/9, width, width*5/9);

    fill(0,0,0);
    textAlign(CENTER);

    textSize(24);
    textStyle(BOLD);
    text(currentRoom.getName(), width/2, 550);
    
    textSize(16);
    textStyle(ITALIC);
    text(currentRoom.getInfo(), 0, 570, width-40, 100);

    drawMinimap();
}

/*
    Draws the current minimap. 
*/
function drawMinimap(){
    mk = createGraphics(width, height);
    mk.ellipse(width-50, (width*5/9)-50, 80, 80);
 
    blueprint_mini.mask(mk); 
    image(blueprint_mini, width-50, (width*5/9)-50, 80, 80); 
}

/*
    Draws the splash screen. 
*/
function drawSplash() {
   image(splash, width/2, height/2);
}

/*
    Draws the Info screen. 
*/
function drawInfo(){
    image(blueprint, width/2, height/2);
    var infoText = ["Use WASD directions to navigate the rooms of the house.", "Hit 'X' to return to the splash screen, \nand I to return to this screen.", "Click or press any key again to start house tour."] 
    for(var i = 0; i<infoText.length; i++){
        text(infoText[i], width/2, height/3+i*50);
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
    splash = loadImage('https://acelaena.github.io/images/sketch.PNG');
    blueprint = loadImage('https://acelaena.github.io/assets/blueprint.PNG');
    blueprint_mini = loadImage('https://acelaena.github.io/assets/blueprint_sm.PNG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Center our drawing objects
    imageMode(CENTER);
    textAlign(CENTER);
    textSize(24);
    
    drawFunction = drawSplash;

    //setup house
    houseSetup();
    currentRoom = null;
}

function draw() {
    background('#e8f6ce');
    drawFunction();
}