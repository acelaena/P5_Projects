//Enums
const NEUTRAL = 0;
const HAPPY = 1;
const EXCITED = 2;
const THINK = 3; 
const DEPRESSED = 4;
const CRY = 5;
const FRUSTRATED = 6;
const ANGRY = 7;
const FEAR = 8;
var wendy_sprite = [];


class Wendy{
    /*
        Uhh wendy class so things wont loop forever
    */
    constructor(expressionArr, wordArr){
        this.exp = expressionArr;
        this.word = wordArr;
        this.counter = 0;
        console.log(this.counter);
    }
    
    wendyText(){        
        if (this.counter < this.word.length){
            hasText = true;
            wendyBox(this.exp[this.counter], this.word[this.counter]);
            this.counter++;
        } else { 
            hasText = false; 
            wendyCounter++;
            if (debug){
                console.log("Wendy Counter: "+wendyCounter);
            }
        }
    }
}

function wendyPreload(){
    var i;
    for (i = 0; i<9; i++){
        wendy_sprite[i] = loadImage("https://acelaena.github.io/assets3/exp_"+ i + ".PNG");
    } 
}

function wendyClickableSetup(){
    textClicker = new Clickable(); 
    textClicker.color = TRANSPARENT; 
    textClicker.text = '';
    textClicker.strokeWeight = 0;  
    textClicker.resize(960, 150);
    textClicker.cornerRadius = 20;
    textClicker.locate(CANVAS_LEFT, 450);
    textClicker.onPress = function(){  //When myButton is pressed
        drawAgain = true;
        console.log("clicky!");
    }    
}

function wendyBox(expression, words){
    image(wendy_sprite[expression], CANVAS_LEFT+50, 160, 300, 300);
    fill(TEAL);
    rect(CANVAS_LEFT, 450, 960, 150, 20);
    fontStyle(24);
    text(words, CANVAS_LEFT+60, 480, 860, 130);
}



