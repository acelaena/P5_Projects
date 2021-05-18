class SimpleScreen{
    /*
        Container class for screens. One way advancement through screens with a single key press.
    */
    constructor(name){
        this.draw = function() {
            // Fill in this function after creation. 
        };
        this.preload = function() {
            this.next.load();
        };
        this.load = function(){
            // Fill in this function after creation. 
        };
        this.postload = function(){
            // fill in this function after creation.
            // postload is executed once as the screen changes
        }
        this.next = null;
        this.toNextKey = ' '; 
        this.data;
        this.name = name; 
        this.hasWendy = false;
    }
}
    
    
