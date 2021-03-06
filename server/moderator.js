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



/*************************************
** NODE.JS REQUIREMENTS
*************************************/
var util = require("util"),
    io = require("socket.io");

var socket;


/************************************
** GAME VARIABLES
************************************/
var Board = require("./Board").Board;
var board = new Board(20, 40);
var ConfOne = require("./ConfOne").ConfOne;
var ConfTwo = require("./ConfTwo").ConfTwo;
var config = new ConfTwo(20, 40);
var bluePlayer = require("./bluePlayer").bluePlayer;
var blueBot = new bluePlayer();
var redPlayer = require("./redPlayer").redPlayer;
var redBot = new redPlayer();
var helperFunctions = require("./helperFunctions").helperFunctions;
var help = new helperFunctions();
var fired = false;

/************************************
** MAKE SOCKET CONNECTION
************************************/
function init(){
    
    socket = io.listen(8000);
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log level", 2);
    });
    board.initialSetup(config);
    setEventHandlers();
    setTimeout(function(){playGame();},5000);
};


/************************************
** BIND EVENT HANDLERS
************************************/
var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};
function onSocketConnection(client) {
   util.log("New Connection Established: "+client.id);
   client.on("disconnect", onClientDisconnect);
   sendData(client);
};
function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};


/*********************************
** SEND DATA TO CLIENT
*********************************/
function sendData(client){
    setInterval(function(){
        var boardData = JSON.stringify(board.getTiles());
        client.emit("makeMove", boardData);
        if(fired){
            client.emit("playSound");
            fired = false;
        }
    },10);
};


/**********************************
** MODERATOR - MAKE MOVES
**********************************/
function playGame(){
    var turn = true;
    var gameId = setInterval(function(){
        var move;
        if(turn){
            move = blueBot.makeMove(board.getTiles(),"BT");
            if(help.validateMove(board.getTiles(), move, "BT")){
                if(move[3] == 1){
                    fired = true;
                }
                board.update(help.makeMove(board.getTiles(), move));
            }
            console.log("Blue");
        }
        else{
            move = redBot.makeMove(board.getTiles(),"RT");
            if(help.validateMove(board.getTiles(), move, "RT")){
                if(move[3] == 1){
                    fired = true;
                }
                board.update(help.makeMove(board.getTiles(), move));
            }
            console.log("Red");
        }
        turn = !turn;
        if(help.endGame(board.getTiles())){
            clearInterval(gameId);
        }
    },50);
};

init();
