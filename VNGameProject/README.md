## Project 2 - Social Justice Visual Novel
#### by Alina Xia

### Overview
A visual novel-type game in which you follow the story of Wendy (WendyWonderly), a comic artist, who's struggling to tell the story he/she/they want to tell because of online social justice marauders harrassing them. The events in this game are based on real events and anectdotes I've experienced or witnessed.


### Technical Details
>> Custom Classes: 

Wendy.js: A container class for storing Wendy objects. Each Wendy object represents one continuous set of text boxes, and I chose to use Wendy objects so each one could be uniquely tracked and executed only once. 

SimpleScreen.js: A container class for screens. The main backbone of the state machine architecture. It functions somewhat like a linked list; with a linked next screen. By modifiying the linked screen, branching game paths can be easily achieved. 

ComicScreen.js: A "subclass" of Simple Screen that supports pagination of comics. To conserve memory usage, only adjacent pages are loaded. This comes with the caveat that on slow connections pages may not be loaded at all if you scroll too fast, since the program only draws each page once.

SocialMediaScreen.js: A "subclass" of SimpleScreen that handles the social media portion of the game. Supports pagination of comments and NPC interaction by messages. 

GameStateSetup.js: A massive collection of setup scripts to be called in the main sketch setup(). Really, it /could/ all belong in the main sketch setup, but for organization's sake it's organized separately


### Notes
Okay man I have a lot to say. 

To explain a little of how the Screens classes work, let's start with SimpleScreen. 

- draw() is pretty self explanatory; it is the main function that is called within the greater draw() in Sketch.js. I shaved off a lot of draw resource usage by defining a global variable drawAgain, which should be updated every time something is updated, so I don't waste resources on unnecessary redraws. However, this means if images are taking a long time to load, they may not be drawn in time as I only draw each screen once. 

- preload()/load(), I haven't really found a best way to do it yet. Ideally, it would be called once and only once the first time draw() is called, but draw() is called multiple times, and that consumes more and more resources the more I linger on one draw page. Perhaps a flag to say "yes, my shit is loaded, I don't need to make 1000 variables holding my loaded image in memory" 

- postload() was a last minute addition because I realized I needed functionality to process the state of my state machine as it's transitioning between states. Not a lot uses it right now, but maybe I could retroactively add it to stuff so it frees up some memory used. 

- hasWendy is a flag used to keep track if I should de-increment the auto increment whenever a Wendy object is placed but not completely read. Used pretty much only when swapping to the controls screen mid-game. 

Moving onto ComicScreen: 

- Several variables and functions used to keep track of what page it's on to minimize ram usage. It preloads the adjacent pages, and discards the other pages to mimize ram usage. 
- ComicEnd is another flag used to keep track of whether going to the next page is available or not. 

SocialMediaScreen: 
This class is a bit unfinished, so to say, as I wanted to implement messages (NPC interaction) and posts (something like twitter). Just like reading the comments, taking actions there will affect wendy's motivation. You also always have the option to log out to preserve the sanity (as a smart person would do).

- Contains several variables to keep track of comments. To prevent motivation from being affected by the same thing multiple times, I implemented postload(), so I can look at the final state of the state machine and apply those changes as it transitions to a new state. 













