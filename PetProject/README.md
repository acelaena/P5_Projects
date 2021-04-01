## Project 1 - Foster Pet Game
#### by Alina Xia


### Overview
A tamagotchi-like pet game that simulates taking care of a foster pet until it gets adopted. Pets and personalities are randomly generated, along with possible adopters, so that each experience is fresh. Personalities also affect how pets respond to certain actions! 


### Technical Details
The bulk of the pet handling script is in Pet.js. An object of class Pet is created, and interacting with the pet calls specific functions in this script to affect the pet's stats. 

Util.js contains some miscellaneous functions for better abstraction and readability. Mostly so I don't have to do random() math every single time I want a random integer between two numbers. 