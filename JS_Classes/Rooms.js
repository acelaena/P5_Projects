/**
    Rooms.js use a modified map data structure. 
    
    House holds an array of all the rooms in a house, but does not need to link them. House also defines which room to start with when entering a house. 
    Rooms may link up to 4 other rooms, one in each cardinal direction. 


*/

class House{
    constructor(){
        this.rooms = [];
        this.entrance = null; 
    }
    
    getRoom(i){
        return this.rooms[i];
    }
    getCount(){
        return this.rooms.length;
    }
    getEntrance(){
        return this.entrance;
    }
    
    addRoom(room){
        this.rooms.push(room);
    }
    setEntrance(room){
        this.entrance = room;
    }
}   

class Room{
    constructor(name, info, img){
        this.name = name;
        this.info = info; 
        this.img = img;
        
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null; 
    }
    
    setLinks (n, s, e, w){
        this.north = n;
        this.south = s;
        this.east = e;
        this.west = w; 
    }
    setNorth(room){
        this.north = room;
    }
    setSouth(room){
        this.south = room;
    }
    setEast(room){
        this.east = room;
    }
    setWest(room){
        this.west = room;
    }
    
    getInfo(){
        return this.info; 
    }
    getName(){
        return this.name; 
    }
    getImg(){
        return this.img;
    }
    getNorth(){
        return this.north;
    }
    getSouth(){
        return this.south;
    }
    getEast(){
        return this.east;
    }
    getWest(){
        return this.west;
    }
    
}