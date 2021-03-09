/**
	Project 1 - Vale Pet Shelter
	by Acelaena

    Overview:
    A not-so simple tamagotchi-like game that illustrates states and non-linear progression. 

	Notes:
    - info interface is in need of heavy cleanup
    - did not have time to do random events :(
    - this code is so messy I am going to need a week to clean it up 
*/

const BGCOL = '#e8f6ce';
var IMGSIZE = 300; //default; is set to min(IMGSIZE, SCREENSIZE/3);
const WAIT = 500;
var SCREENSIZE; //== min(width, height) -- makes a square active area

//game handlers
var pet;
var drawFunction;
var prevState;
var timer_wait;
var sun = 0; 
var out = false;
var dayCount = 0; 
var adopted = false;
var a; 

//controls
var buttons = []; 
var input; 
var controls;
var adoptSwitch = false;

//output imgs
var msgs = []; 
var backgrounds = [];
var actionbtns = [];
var people = [];
var phone;
var adopters = ["Michael" , "Hayden", "Mona"];


/** Setup **/
function petSetup(){
    let p = rand(0,4); // 6 possible pets
    let pImg = ["https://acelaena.github.io/assets2/kitty.PNG",
                "https://acelaena.github.io/assets2/rexlapis.PNG", 
                "https://acelaena.github.io/assets2/bunpup.PNG",
                "https://acelaena.github.io/assets2/bird.PNG",
                "https://acelaena.github.io/assets2/kitty.PNG" ];
    let pSpe = ["calico winged messenger kitty",
                "black heraldic leonine",
                "long-eared florapup",
                "sunset plumed firebird",
                "gold seraph tree serpent" ];
    let pSha = [95, 90, 95, -1, -1]; 
    
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
        drawFunction = drawInfoScreen;
        prevState = drawActionScreen;
    } 
}

function drawInfoScreen(){ 
    image(controls, width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE*2/5); 
    
    pet.placePet(width/2-SCREENSIZE/2, SCREENSIZE*2/5+50)
    
    fill('#000');
    textSize(20);
    textStyle(BOLD);
    text(pet.name, width/2-SCREENSIZE/2+IMGSIZE+50, SCREENSIZE*2/5 + 80);
    textSize(12);
    textStyle(ITALIC);
    text(pet.species, width/2-SCREENSIZE/2+IMGSIZE+50, SCREENSIZE*2/5 + 100);
    
    /*
        personality values:
            0 - confident, alpha animal
            1 - shy, skittish
            2 - extroverted, friendly
            3 - independent, laidback, lazy
            4 - adaptable, fits in different enviornments  
    */
    var personalities = [
                        pet.name + " is confident and bold. When presented with opportunities, they always take it. A true alpha animal.",
                        pet.name + " is a bit shy. With enough coaxing (and treats) they can be convinced to come out of their shell. Sometimes, they can be a bit skittish, especially around other animals.", 
                        pet.name + " is extroverted and friendly. They'll get along well with any other animals, but may be too rambunctious for young children.", 
                        pet.name + " is very independent. That is to say, they don't care about anything or anyone and live in their own little world. A bit lazy too.",
                        pet.name + " is an outgoing, adaptable, animal who loves to please. Typically very calm, but will be energetic when presented with playtime."
                        ];
    
    textSize(14);
    textStyle(NORMAL);
    text(personalities[pet.personality], width/2-SCREENSIZE/2+IMGSIZE+50, SCREENSIZE*2/5 + 140, SCREENSIZE - (width/2-SCREENSIZE/2+IMGSIZE+50));
    
    //todo: exit graphics, 
}

function drawActionScreen(){
    if (!out){
        image(backgrounds[sun], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    } else {
        image(backgrounds[sun+3], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    }
    
    pet.placePet((width-IMGSIZE)/2, (height-IMGSIZE)*2/3);
    drawStats(msgs);
    drawActions(width/2-190, SCREENSIZE-40);
}

function drawEndOfDay(){
    image(backgrounds[6], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    drawStats(msgs);
}

function drawMorning(){
    image(backgrounds[7], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    drawStats(msgs);
}

function drawStats(tx){
    fill('#fff7');
    rect(width/2-325, height/2+IMGSIZE/3+60, 650, SCREENSIZE - (height/2+IMGSIZE/3+60) - 5);
    
    textAlign(CENTER);
    fill('#000');
    textSize(16);
    for (var i = 0; i < tx.length; i++){
        text(tx[i], width/2, height/2+IMGSIZE/3+90+i*20);
    }
    textAlign(LEFT);
    pet.drawStatus(width/2-305, SCREENSIZE - 70);
}

function drawActions(x, y){
    var spacing = 20;
    let width = 80;
    let height = 32;
    
    for (var i = 0; i<4; i++){
        fill("#0564CC");
        rect( x + (width + spacing)*i, y, width, height);
        image(actionbtns[i], x + (width + spacing)*i, y, width, height); 
    }
}

function drawBadEnd(){
    image(backgrounds[7], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    
    fill('#fff7');
    rect(width/2-325, height/2+IMGSIZE/3+60, 650, SCREENSIZE - (height/2+IMGSIZE/3+60) - 5);
    
    textAlign(CENTER);
    fill('#000');
    textSize(16);

    text(pet.name + " ran away...", width/2, height/2+IMGSIZE/3+90);

    textAlign(LEFT);
}

function drawGoodEnd(){
    image(backgrounds[7], width/2-SCREENSIZE/2, 0, SCREENSIZE, SCREENSIZE);
    fill('#fff7');
    rect(width/2-325, height/2+IMGSIZE/3+60, 650, SCREENSIZE - (height/2+IMGSIZE/3+60) - 5);
    
    textAlign(CENTER);
    fill('#000');
    textSize(16);

    text(pet.name + " was happily adopted by " + adopters[a]+ "!", width/2, height/2+IMGSIZE/3+90);

    textAlign(LEFT);
}

function drawAdoptScreen (){
    var adopterInfo = ["Hi, my name is Michael. I live with my girlfriend in a large apartment. I'm okay with anything, but my girlfriend would prefer a pet that's playful or good emotional support.", 
                    "Hi, my name is Hayden. I'm a college student living with two roommates. They've both agreed that taking care of a pet is not an issue, but we'd prefer something quieter and with less energy.", 
                    "Hi, my name is Mona. I'm a single mom with two kids. Since my kids can be a handful, I want to adopt a pet that can keep them occupied and be patient enough to handle them."]; 
    var preferences = [ [0, 3, 4], [1, 3, 4], [0, 2, 4] ];
    var txt; 
    
    fill('#fff7');
    rect(width/2-SCREENSIZE/2 + 10, 20, SCREENSIZE - 20, SCREENSIZE/7);
    image(people[a], width/2-SCREENSIZE/2 + 10, 20, SCREENSIZE/7, SCREENSIZE/7);
    fill('#000');
    textSize(14);
    text(adopterInfo[a], width/2-SCREENSIZE/2 + 125, 40, SCREENSIZE - 150);
    image(phone, width/2-IMGSIZE/2, SCREENSIZE/7 + 50, IMGSIZE, IMGSIZE);
    
    if (preferences[a].includes(pet.personality) && pet.adoptable()){
        //good 
        txt = [adopters[a] + " seems nice enough, but is " + pet.name + "a fitting pet for them?", "Hint: Press 'I' to check your pet info!" ];
        
        fill('#fff7');
        rect(width/2-325, height/2+IMGSIZE/3+60, 650, SCREENSIZE - (height/2+IMGSIZE/3+60) - 5);

        textAlign(CENTER);
        fill('#000');
        textSize(14);
        for (var i = 0; i < txt.length; i++){
            text(txt[i], width/2, height/2+IMGSIZE/3+90+i*20);
        }
        textAlign(LEFT);
        
        var x = width/2-150;
        var y = SCREENSIZE-40;

        for (var i = 0; i<3; i++){
            fill("#0564CC");
            rect( x + 100*i, y, 80, 32);
            image(actionbtns[i+4], x + 100 *i, y, 80, 32); 
        }
        adoptSwitch = true; 
        
    } else {
        txt = ["We met " + pet.name + ", but they're not what we're looking for in a pet...", "Click to continue..."];
        adopted = false; 
        adoptSwitch = true;
        
        fill('#fff7');
        rect(width/2-325, height/2+IMGSIZE/3+60, 650, SCREENSIZE - (height/2+IMGSIZE/3+60) - 5);

        textAlign(CENTER);
        fill('#000');
        textSize(14);
        for (var i = 0; i < txt.length; i++){
            text(txt[i], width/2, height/2+IMGSIZE/3+90+i*20);
        }
        textAlign(LEFT);
    }
}

/**
    Misc handlers. 
*/
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
        msgs.push("--Press Space to continue--");
        drawFunction = drawEndOfDay;
    }  
}

/**
    Keyboard navigation support. While on a non-room screen, all keys will advance the screen.
*/
function keyTyped() {
    console.log("key typed: "+ key);
    if (drawFunction === drawActionScreen){
        if (key.toLowerCase() == 'a'){
            msgs = [pet.feed()];
            out = false;
            tickTime();
        } else if (key.toLowerCase() == 's'){
            msgs = [pet.walk()];
            out = true;
            tickTime();
        } else if (key.toLowerCase() == 'd'){
            msgs = [pet.play()];
            out = true; 
            tickTime();
        } else if (key.toLowerCase() == 'f'){
            msgs = [pet.bath()];
            out = false;
            tickTime();
        } 
    }
    if (key == ' '){
        if (drawFunction === drawEndOfDay){
            msgs = pet.age(); //increment day
            dayCount++;
            if (pet.KILLGAME){ drawFunction = drawBadEnd; } 
            else {
                msgs.push("--Press Space to continue--");
                console.log("dirtiness: " + pet.dirtiness);
                drawFunction = drawMorning;
            }
        } else if (drawFunction === drawMorning){
            out = false; 
            if (dayCount >= 6){
                dayCount = 0; 
                drawFunction = drawAdoptScreen; 
            } else {
                msgs = ["What will you do this "+ timeOfDay(sun) +"?"];
                drawFunction = drawActionScreen;
            }
        }
    }
    
    //debug purposes
//    if (key === 'k'){
//        drawFunction = drawAdoptScreen;
//    }
    
    if (drawFunction === drawAdoptScreen && adoptSwitch){ 
        if(key === 'y'){
            adopted = true;
            drawFunction = drawGoodEnd;
        } else if( key === 'n'){
            adopted = false;
            adoptSwitch = false; 
            msgs.push("You have decided to not let go of "+pet.name);
            drawFunction = drawActionScreen;
        }
    }
    
    //info screen handling
    if (drawFunction === drawInfoScreen){
        if (key == 'x'){ drawFunction = prevState; }
    }
    if (key == 'i' && drawFunction != drawGetPet && drawFunction != drawInfoScreen && drawFunction != drawStartScreen){
        prevState = drawFunction;
        drawFunction = drawInfoScreen; 
    }
}

    
/**
    Mouse navigation support.
*/
function mousePressed() {
    if (drawFunction === drawAdoptScreen && adoptSwitch){
        adoptSwitch = false;
        if (adopted){
            drawFunction = drawGoodEnd;
        } else {
            drawFunction = drawActionScreen;
        }
        a = rand(0,2);
    }
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
    a = rand(0,2);
    
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
    
    //load bg, button imgs
    controls = loadImage("https://acelaena.github.io/assets2/info.PNG");
    
    backgrounds[0] = loadImage("https://acelaena.github.io/assets2/day_in.PNG");
    backgrounds[1] = loadImage("https://acelaena.github.io/assets2/twi_in.PNG");
    backgrounds[2] = loadImage("https://acelaena.github.io/assets2/night_in.PNG");
    backgrounds[3] = loadImage("https://acelaena.github.io/assets2/day_out.PNG");
    backgrounds[4] = loadImage("https://acelaena.github.io/assets2/twi_out.PNG");
    backgrounds[5] = loadImage("https://acelaena.github.io/assets2/night_out.PNG");
    backgrounds[6] = loadImage("https://acelaena.github.io/assets2/snooze.PNG");
    backgrounds[7] = loadImage("https://acelaena.github.io/assets2/dawn.PNG");
    
    actionbtns[0] = loadImage("https://acelaena.github.io/assets2/A.PNG");
    actionbtns[1] = loadImage("https://acelaena.github.io/assets2/S.PNG");
    actionbtns[2] = loadImage("https://acelaena.github.io/assets2/D.PNG");
    actionbtns[3] = loadImage("https://acelaena.github.io/assets2/F.PNG");
    actionbtns[4] = loadImage("https://acelaena.github.io/assets2/I.PNG");
    actionbtns[5] = loadImage("https://acelaena.github.io/assets2/Y.PNG");
    actionbtns[6] = loadImage("https://acelaena.github.io/assets2/N.PNG");
    actionbtns[7] = loadImage("https://acelaena.github.io/assets2/X.PNG");
    
    phone = loadImage("https://acelaena.github.io/assets2/phone.PNG");
    people[0] = loadImage("https://acelaena.github.io/assets2/michael.PNG");
    people[1] = loadImage("https://acelaena.github.io/assets2/hayden.PNG");
    people[2] = loadImage("https://acelaena.github.io/assets2/mona.PNG");

    drawFunction = drawStartScreen;
}

function draw() {
    frameRate(1);
    background(BGCOL);
    drawFunction();

}
