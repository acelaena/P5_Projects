
class Pet{
    /*
        Pet constructor. Image and species are defined on creation.
        Prompt for name
        
        personality values:
            0 - confident, alpha animal
            1 - shy, skittish
            2 - extroverted, friendly
            3 - independent, laidback, lazy
            4 - adaptable, fits in different enviornments  
    */
    constructor(image = null, species = null, name = null, shadowOffset = 90, imageWidth = 100, imageHeight = 100 ){
        this.image = image;
        this.species = species;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.shadowOffset = shadowOffset;
        
        this.name = name;
        this.personality = rand(0,4);
        this.hunger = 60;
        this.happiness = 60; 
        this.health = 60; 
        
        this.dirtiness = 0; 
        this.daysNotWalked = 0; 
        this.isWalked = false;
    }
    
    placePet(x, y, scale = 1){
        fill("#888a");
        strokeWeight(0);
        if (this.shadowOffset != -1){
            ellipse(x+(this.imageWidth*scale/2), y+(this.shadowOffset*this.imageHeight*scale/100), this.imageWidth*scale, this.imageHeight*scale/5);   
        }
        image(this.image, x, y, this.imageWidth*scale, this.imageHeight*scale);
    }
    
    drawStatus(x = 0, y = 50){
        var spacing = 5;
        var width = 200;
        var height = 12;

        //bar fill
        strokeWeight(0);
        fill('#13bf4c');
        rect(x, y, width/100 * this.health, height, 5);                //health
        rect(x+width+spacing, y, width/100*this.happiness, height, 5); //happiness
        rect(x+(width+spacing)*2, y, width/100*this.hunger, height, 5);//hunger

        //empty bars
        stroke('#044f19');
        strokeWeight(1);
        fill('#0000');    
        rect(x, y, width, height, 5);                      //health   
        rect(x+width+spacing, y, width, height, 5);        //happiness
        rect(x+(width+spacing)*2, y, width, height, 5);    //hunger
        stroke('#000');
        
        //text
        strokeWeight(0);
        fill('#044f19');
        textSize(14);
        textStyle(ITALIC);
        text("Health: " + this.health + "/100", x, y-spacing);
        text("Happiness: " + this.happiness + "/100", x+width+spacing, y-spacing);
        text("Hunger: "+ this.hunger + "/100", x+(width+spacing)*2, y-spacing);
        textStyle(NORMAL);
    }
    
    feed(){
        var outputStr;
        if(this.hunger >=85){ //overfed
            this.hunger = 100; 
            this.health -= 10;
            return this.name + " can't eat another bite..."; 
        } else if (this.hunger >= 80){ //stuffed 
            this.hunger += 15;
            this.health -= 5;
            return this.name + " is stuffed!"; 
        } else { //good amount of food
            this.hunger += 15;
            return this.name + " scarfed down the food!"; 
        }  
    }
    
    walk(){
        var outcome = rand(0,3); //roll outcomes
        var outputStr = [this.name +" had a great time on their walk!",
                         this.name +" was spooked by a toddler on their walk...", 
                         this.name +" stopped to eat the flowers on their walk.",
                         this.name +" splashed in a puddle on their walk."]
        this.daysNotWalked = 0;
        this.isWalked = true;
        
        //roll again for max spook/snacc chance based on personality
        if ((outcome != 1 && this.personality === 1) || (outcome != 2 && this.personality === 3)) {
            outcome = rand(0,3); 
        }
        
        //the lower your current stats are, the more stats you gain
        this.health += Math.floor((100 - this.health) / 10 + 1);
        this.happiness += Math.floor((100 - this.happiness) / 10 + 1);
        this.hunger -= 5;
        
        //specific outcome modifiers 
        if (outcome === 1){ //spook D:
            this.happiness -= 2;
        } else if (outcome === 2) { //snacc
            this.hunger += 1; 
        } else if (outcome === 3) { //splash
            dirtiness++;
        }
        return outputStr[outcome];
    }
    
    play(){
        if (this.health <= 20){
            return this.name + " is too sickly to play right now..."
        } 
        this.happiness += rand(5,10);
        this.hunger -= 5; 
        return this.name + " had a great time playing with you!"
    }
    
    bath(){
        this.happiness -= 10 + 5 - this.dirtiness;
        this.health += 5 + 2 * this.dirtiness; 
        return this.name + " might not like getting bathed, but they are squeaky clean and smelling great now!" 
    }
    
    age(){ // daily reset 
        var outputStr = [];
        //check hunger
        if (this.hunger <=40){ this.health -=1; }
        if (this.hunger <=20){ this.health -=2; }
        if (this.hunger <=10){ 
            this.health -=5;
            outputStr.push(this.name + " is starving...");
        }
        
        //check cleanliness
        if (this.dirtiness >=5){
            this.health -= (this.dirtiness - 4)*2;
            outputStr.push(this.name + " is getting pretty smelly...");
        }
        
        //check walked status
        if (!this.isWalked){
           this.daysNotWalked++; 
            if (this.daysNotWalked >=2){
                this.health -= 2; 
                this.happiness -=10; 
                outputStr.push(this.name + " is growing restless...");
            }
        } 
        
        //daily hunger/happiness loss
        this.hunger -= 10;
        this.happiness -= 10;
        
        return outputStr;
    }
}
    