const BGCOL = '#e8f6ce';
var IMGSIZE = 200; //default; is set to min(IMGSIZE, SCREENSIZE/3);
const WAIT = 5000;
var SCREENSIZE; //== min(width, height) -- makes a square active area

var pet;
var drawFunction;
var timer_wait;

/*
    0 - start screen phone
    1 - name screen submit
*/
var buttons = []; 
var input; 

/** Setup **/
function petSetup(){
    let p = rand(0,4); // 6 possible pets
    let pImg = ["https://acelaena.github.io/assets2/phone.PNG",
                "https://acelaena.github.io/assets2/phone.PNG", 
                "https://acelaena.github.io/assets2/phone.PNG",
                "https://acelaena.github.io/assets2/phone.PNG",
                "https://acelaena.github.io/assets2/phone.PNG" ];
    let pSpe = ["calico winged messenger kitty",
                "black longcat",
                "long-eared florapup",
                "sunset plumed firebird",
                "gold seraph tree serpent"];
    let pSha = [90, 90, 85, -1, -1]; 
    
    pet = new Pet(loadImage(pImg[p]), pSpe[p], null, pSha[p], IMGSIZE/2, IMGSIZE/2);
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
        text(prompt, width/2, height/2+imgSize/2);
        buttons[0].mousePressed(function() { console.log("here"); drawFunction = drawGetPet; this.remove()});
    }
    textAlign(LEFT);
    redraw();
}

function drawGetPet(){
    var txt = ["The shelter has brought over a "+ pet.species+".", "What would you like to name it?"];
    
    clearCanvas();
    input.show();
    buttons[1].show();
    
    textAlign(CENTER);
    for (var i = 0; i < txt.length; i++){
        text(txt[i], width/2, 100+ i*20);
    }
    
    fill('#000');
    text("yeet.", 50, 50);
}


function preload() {
}

function setup() {
    createCanvas(windowWidth-12, windowHeight-12);
    frameRate(2);
    noLoop();
    
    SCREENSIZE = min(width, height); 
    IMGSIZE = min(IMGSIZE, SCREENSIZE/3);
    
    
    petSetup();
    timer_wait = new Timer(WAIT);
    
    //Phone button - index 0
    buttons.push(createImg("https://acelaena.github.io/assets2/phone.PNG", "phone"));
    buttons[0].position(width/2-imgSize/2, height/2-imgSize/2);
    buttons[0].size(imgSize, imgSize);
    buttons[0].hide();
    
    
    //name screen interactibles
    buttons.push(createButton('Name!'));
    buttons[1].position(50, 65);
    buttons[1].hide();
    input = createInput();
    input.position(20, 65);
    input.hide();

    
}

function draw() {
    frameRate(2);
    background(BGCOL);
    drawFunction();
    

    
    //pet.drawStatus(10, 300, 150);
}



function main(){
    var event;
    var adopted = false;
    var i = 0;
    drawfunction = drawStartScreen(); //interact = return
    drawGetPet(); //input name = return
    drawPetProfile(); //hit i to get to this screen from any screen
    
    while(!adopted){ //start daily loop 
        event = rand(0,9); // 10% chance for each event; three events
        
        for (i = 0; i<3; i++){
            if (event === 2){ // friend visit -- day event, consumes one action
                drawVisitScreen();
                event++;
                continue;
            }
            
            let action = drawActionScreen(i); //action screen returns clicked action; i = time of day
        
            if (action === "feed"){
                let output = pet.feed();
            } else if (action === "walk") {
                //cont....
            }
            drawActionResults(action, output);
        }
        //end day
        drawEndofDay();
        if (event === 1){ //thunderstorm -- night event
            drawThunderScreen();
        }
        //new day, age pet
        drawMorningScreen(pet.age());
        
        if (event == 0){ // adoption -- morning event
            adopted = drawAdoptScreen();
        } 
    }
    
}