/**
	Project 1 - Vale Pet Shelter
	by Acelaena

    Overview:
    A not-so simple game that illustrates states and non-linear progression. 

	Notes:
    - Kitchen image source: https://www.extraspace.com/blog/home-organization/room-organization/design-a-minimalist-kitchen-with-these-ideas/
    - add navigation prompts
    - add low opacity background box behind text? how to do
    - p5 smelly I could do this faster with html/css/js
*/




const BGCOL = '#e8f6ce';
var IMGSIZE = 300; //default; is set to min(IMGSIZE, SCREENSIZE/3);
const WAIT = 200;
var SCREENSIZE; //== min(width, height) -- makes a square active area

var pet;
var drawFunction;
var timer_wait;

var buttons = []; 
var input; 

var msgs = []; 
var backgrounds = [];
var sun = 0; 
var actionbtns = [];

/** Setup **/
function petSetup(){
    let p = rand(0,4); // 6 possible pets
    let pImg = ["https://acelaena.github.io/assets2/kitty.PNG",
                "https://acelaena.github.io/assets2/kitty.PNG", 
                "https://acelaena.github.io/assets2/kitty.PNG",
                "https://acelaena.github.io/assets2/kitty.PNG",
                "https://acelaena.github.io/assets2/kitty.PNG" ];
    let pSpe = ["calico winged messenger kitty",
                "black heraldic nekomata",
                "spotted florapup",
                "sunset plumed firebird",
                "gold seraph tree serpent" ];
    let pSha = [100, 95, 85, -1, -1]; 
    
    pet = new Pet(loadImage(pImg[p]), pSpe[p], null, pSha[p], IMGSIZE, IMGSIZE);
}


/** Screens **/
function drawStartScreen(){
    var txt = ["You got a call from the shelter!", "It seems they have a new pet for you to foster."];
    var prompt = "Click on the phone to continue";
    
    textAlign(CENTER);
    for (var i = 0; i < txt.length; i++){
        text(txt[i], width/2, 100+ i*20);
    }
    buttons[0].show();
    
    console.log(timer_wait.getRemainingTime());
    if (timer_wait.expired()){
        text(prompt, width/2, height/2+IMGSIZE/2);
        buttons[0].mousePressed(function() { console.log("here"); drawFunction = drawGetPet; this.remove()});
    }
    textAlign(LEFT);
}

function drawGetPet(){
    var txt = ["The shelter has brought over a "+ pet.species+".", "What would you like to name it?"];
    
    input.show();
    buttons[1].show();
    buttons[1].mousePressed(namePet);
    
    textAlign(CENTER);
    for (var i = 0; i < txt.length; i++){
        text(txt[i], width/2, 100+ i*20);
    }
    pet.placePet((width-IMGSIZE)/2, (height-IMGSIZE)/2)
    
    
    textAlign(LEFT);
    fill('#000');
}

function namePet(){
    var input_text = input.value().trim();
    console.log("\""+input_text+"\"");
    if (input_text == null || input_text == ""){
        textAlign(CENTER);
        text("Please give your new friend a name!", width/2, height/2+IMGSIZE/2+100);
        textAlign(LEFT);
    } else {
        pet.name = input_text;
        input.remove(); buttons[1].remove();

        msgs = ["You just brought " +pet.name+" to their new home!", "What will you do this "+ timeOfDay(sun) +"?"];
        drawFunction = drawActionScreen;
    } 
}

function drawActionScreen(){
    textAlign(CENTER);
    fill('#000');
    textSize(16);
    
    //image(background[sun], 0, 0, SCREENSIZE, SCREENSIZE);
    pet.placePet((width-IMGSIZE)/2, (height-IMGSIZE)/3);
    for (var i = 0; i < msgs.length; i++){
        text(msgs[i], width/2, height/2+IMGSIZE/3+50+i*20);
    }
    textAlign(LEFT);
    
    
    pet.drawStatus(width/2-305, height/2+IMGSIZE/3+150);
    drawActions(width/2-190, height/2+IMGSIZE/3+170);
    
    
    fill('#000');
}

function drawActions(x, y){
    var spacing = 20;
    var width = 80;
    var height = 32;
    
    for (var i = 0; i<4; i++){
        fill("#0500CC");
        rect( x +(width + spacing)*i, y, width, height);
        //todo
        //image(actionbtns[0], x +(width + spacing)*i, y, width, height); 
    }
}

function timeOfDay(i){
    if (i===0){ return "morning"; } 
    else if (i===1){ return "afternoon"; }
    else { return "evening"; }
}
function tickTime(){
    if (sun===0 || sun===1) {
        console.log(sun);
        sun++;
        msgs.push("What will you do this "+ timeOfDay(sun) +"?");
    } 
    else {
        console.log(sun);
        sun=0;
        msgs.push("It's the end of the day! Time for bed...");
        //todo
        //drawFunction = drawEndOfDayScreen;
    }  
}



/**
    Keyboard navigation support. While on a non-room screen, all keys will advance the screen.
*/
function keyTyped() {
    console.log("key typed: "+ key);
    if (drawFunction === drawActionScreen){
        if (key == 'a'){
            msgs = [pet.feed()];
            tickTime();
        } else if (key == 's'){
            msgs = [pet.walk()];
            tickTime();
        } else if (key == 'd'){
            msgs = [pet.play()];
            tickTime();
        } else if (key == 'f'){
            msgs = [pet.bath()];
            tickTime();
        } 
    }
}

    
/**
    Mouse navigation support. While on a non-room screen, clicking will advance the screen.
*/
function mousePressed() {
//    if( t.expired && drawFunction === drawStartScreen ) {
//        drawFunction = drawGetPet; 
//    } else if( drawFunction === drawInfo ){
//        currentRoom = house.getEntrance();
//        drawFunction = drawRoom; 
//  }
}


function preload() {
}

function setup() {
    //remove scrollbar width because p5 smelly and I cant do my elegant no-scrollbar trick
    createCanvas(windowWidth-12, windowHeight-12);

    SCREENSIZE = min(width, height); 
    IMGSIZE = min(IMGSIZE, SCREENSIZE/3);
    textSize(16);
    
    petSetup();
    timer_wait = new Timer(WAIT);
    
    //Phone button - index 0
    buttons.push(createImg("https://acelaena.github.io/assets2/phone.PNG", "phone"));
    buttons[0].position(width/2-IMGSIZE/2, height/2-IMGSIZE/2);
    buttons[0].size(IMGSIZE, IMGSIZE);
    buttons[0].hide();
    
    //name screen interactibles - button index 1
    buttons.push(createButton('Name!'));
    input = createInput();
    buttons[1].position(width/2+(input.width-buttons[1].width)/2, height/2+IMGSIZE/2+50);
    buttons[1].hide();
    input.position(width/2-(input.width+buttons[1].width)/2, height/2+IMGSIZE/2+50);
    input.hide();
    
    //todo load bg, button imgs
    
    
    
    drawFunction = drawStartScreen;
}

function draw() {
    frameRate(1);
    background(BGCOL);
    drawFunction();
    

    
    //pet.drawStatus(10, 300, 150);
}
