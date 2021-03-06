/*
 * @overview AI Moderating Bot built using HTML5 Canvas, Node.js and Socket.IO
 * @version 0.0.1
 * @source https://github.com/bitgeeky/moderator
 *
 * @author Pankaj Malhotra(:bitgeeky)
 * @email mozpankaj1994@gmail.com
 */

/*
 * Copyright (c) 2014 Pankaj Malhotra
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */



/***********************************
** GAME VARIABLES
***********************************/
var canvas,
    ctx,
    fieldWidth,
    fieldHeight;

var wallImage = new Image();
wallImage.src = "images/brick.png";
var wallready = false;
wallImage.onload = function(){
    wallready = true;
};

var bluebotImage = new Image();
bluebotImage.src = "images/blue_bot.png";
var bluebotready = false;
bluebotImage.onload = function(){
    bluebotready = true;
};

var redbotImage = new Image();
redbotImage.src = "images/red_bot.png";
var redbotready = false;
redbotImage.onload = function(){
    redbotready = true;
};

var blueassetImage = new Image();
blueassetImage.src = "images/blue_building.png";
var blueassetready = false;
blueassetImage.onload = function(){
    blueassetready = true;
};

var redassetImage = new Image();
redassetImage.src = "images/red_building.png";
var redassetready = false;
redassetImage.onload = function(){
    redassetready = true;
};

var firedregionImage = new Image();
firedregionImage.src = "images/fired.png";
var firedregionready = false;
firedregionImage.onload = function(){
    firedregionready = true;
};

var fireSound = new Audio("music/fire.mp3"); 

// Field Division
var rows = 20,
    columns = 40,
    tileWidth,
    tileHeight,
    board;
var clientBoard;
var socket;


/*************************
**  Game Initialization
**************************/
function init(){
    // Declare canvas and rendering context
    canvas = document.getElementById("battleField");
    ctx = canvas.getContext("2d");
    
    // Initialize Board
    board = new Board(rows, columns);
    board.initialSetup();

    // Set canvas width and height
    canvas.width = fieldWidth = window.innerWidth;
    canvas.height = fieldHeight = window.innerHeight;
    
    // Set tile width and height
    tileWidth = fieldWidth / columns;
    tileHeight = fieldHeight / rows;
   
    // Initialize Socket Connection
    socket = io.connect("http://127.0.0.1", {port: 8000,transports: ["websocket"]});
    // Start listening for events
    setEventHandlers();
};


/*******************************
** Game Event Handlers
********************************/
var setEventHandlers = function(){
    // Window resize
    window.addEventListener("resize", onResize, false);
    socket.on("connect", onSocketConnected);
    socket.on("makeMove", onmakeMove);
    socket.on("playSound", onplaySound);
};
function onSocketConnected(){
    console.log("connected");
};
// Make Move - Update Board
function onmakeMove(data){
    var tiles = JSON.parse(data);
    board.update(tiles);
    clientBoard = board.getTiles();
};
// Play Firing Sound
function onplaySound(){
    fireSound.play();
};
// Browser window resize
function onResize(e){
    // Set canvas width and height on window resize
    canvas.width = fieldWidth = window.innerWidth;
    canvas.height = fieldHeight = window.innerHeight;
    
    //Set tile width and height on window resize
    tileWidth = fieldWidth / columns;
    tileHeight = fieldHeight / rows;
};


/******************************
** Game Animation Loop
******************************/
function animate(){
    //update(); Yet to write this function
    draw();
    
    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
};


/******************************
** Game Draw
******************************/
function draw(){
   
   //ctx.strokeStyle = '#000';
   //ctx.clearRect(0, 0, fieldWidth, fieldHeight);
   //ctx.beginPath();
   
   // Draw Grid

   // Horizontal Lines
   /*
   for(var x = 0; x < columns; x++) {
       ctx.moveTo(x * tileWidth, 0);
       ctx.lineTo(x * tileWidth, fieldHeight);
   }
   // Vertical Lines
   for(var y = 0; y < rows; y++) {
       ctx.moveTo(0, y * tileHeight);
       ctx.lineTo(fieldWidth, y * tileHeight);
   } 
   */
   // Fill Tiles
   if(clientBoard){
       for(var x = 0; x < rows; x++) {
       for(var y = 0; y < columns; y++) {
               ctx.fillStyle = '#009900';
           ctx.fillRect(y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
           if(clientBoard[x][y] == "GR"){
               ctx.fillStyle = '#009900';
           ctx.fillRect(y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
           }
           else if(clientBoard[x][y] == "FR"){
               if(firedregionready){
               ctx.drawImage(firedregionImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
           else if(clientBoard[x][y] == "RT"){
               if(redbotready){
               ctx.drawImage(redbotImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
           else if(clientBoard[x][y] == "BT"){
               if(bluebotready){
               ctx.drawImage(bluebotImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
           else if(clientBoard[x][y] == "RA"){
               if(redassetready){
               ctx.drawImage(redassetImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
           else if(clientBoard[x][y] == "BA"){
               if(blueassetready){
               ctx.drawImage(blueassetImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
           else if(clientBoard[x][y] == "WA"){
               if(wallready){
               ctx.drawImage(wallImage, y * tileWidth,
                   x * tileHeight,
                   tileWidth, tileHeight);
               }
           }
       }
   }
   }
   
   // Show Grid
   //ctx.stroke();
};
