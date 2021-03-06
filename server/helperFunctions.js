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


var helperFunctions = function(){
    
    var stepRange = 1;
    var fireRange = 3;

    var endGame = function(tiles){
        var tiles = tiles;
        var bAssets = 0;
        var bTanks = 0;
        var rAssets = 0;
        var rTanks = 0;

        for(var i=0;i<tiles.length;i++){
            for(var j=0;j<tiles[0].length;j++){
                if(tiles[i][j] == "BA")
                    bAssets+=1;
                else if(tiles[i][j]=="RA")
                    rAssets+=1;
                else if(tiles[i][j]=="BT")
                    bTanks+=1;
                else if(tiles[i][j]=="RT")
                    rTanks+=1;
            }
        }
        if(bAssets == 0 || bTanks == 0 || rAssets == 0 || rTanks == 0)
            return true;
        return false;
    };

    var validateMove = function(tiles, move, playerTank){
        var initX = move[0],
            initY = move[1];
        console.log(initX); 
        console.log(initY);
        if(initX < 0 || initX >= tiles.length){
            return false;
        }
        if(initY < 0 || initY >= tiles[0].length){
            return false;
        }
        if(tiles[initX][initY] != playerTank){
            return false;
            console.log("Invalid Move");
        }
        if(move[3] == 1){
            return true;
        }
        else if(move[3] == 0){
            if(move[2] == 1){
                if((initX - stepRange) >= 0){
                    var tileCode = tiles[initX-stepRange][initY];
                    if(tileCode == "GR" || tileCode == "FR"){
                        return true;
                    }
                }
            }
            else if(move[2] == -1){
                if((initX + stepRange) < tiles.length){
                    var tileCode = tiles[initX+stepRange][initY];
                    if(tileCode == "GR" || tileCode == "FR"){
                        return true;
                    }
                }
            }
            else if(move[2] == 2){
                if((initY + stepRange) < tiles[0].length){
                    var tileCode = tiles[initX][initY+stepRange];
                    if(tileCode == "GR" || tileCode == "FR"){
                        return true;
                    }
                }
            }
            else if(move[2] == -2){
                if((initY - stepRange) >= 0){
                    var tileCode = tiles[initX][initY-stepRange];
                    if(tileCode == "GR" || tileCode == "FR"){
                        return true;
                    }
                }
            }
        }
        return false;
    };

    var makeMove = function(tiles, move){
        
        // Return a 2d array updating the board state
        
        var initX = move[0],
            initY = move[1];

            // Make a Valid Move
            if(move[2] == 1)
            {
                if(move[3] == 0){
                    // Move towards North
                    tiles[initX-stepRange][initY] = tiles[initX][initY];
                    tiles[initX][initY] = "GR";
                }
                else{
                    // Fire towards North
                    for(var i=1;i<=fireRange;i++){
                        if((initX - i) >= 0){
                            tiles[initX-i][initY] = "FR";
                        }
                    }
                }
            }
            else if(move[2] == -1)
            {
                if(move[3] == 0){
                    // Move towards South
                    tiles[initX+stepRange][initY] = tiles[initX][initY];
                    tiles[initX][initY] = "GR";
                }
                else{
                    // Fire towards South
                    for(var i=1;i<=fireRange;i++){
                        if((initX + i) < tiles.length){
                            tiles[initX+i][initY] = "FR";
                        }
                    }
                }
            }
            else if(move[2] == 2)
            {
                if(move[3] == 0){
                    // Move towards East
                    tiles[initX][initY+stepRange] = tiles[initX][initY];
                    tiles[initX][initY] = "GR";
                }
                else{
                    // Fire towards East
                    for(var i=1;i<=fireRange;i++){
                        if((initY + i) < tiles[0].length){
                            tiles[initX][initY+i] = "FR";
                        }
                    }
                }
            }
            else if(move[2] == -2)
            {
                if(move[3] == 0){
                    // Move towards West
                    tiles[initX][initY-stepRange] = tiles[initX][initY];
                    tiles[initX][initY] = "GR";
                }
                else{
                    // Fire towards West
                    for(var i=1;i<=fireRange;i++){
                        if((initY - i) >= 0){
                            tiles[initX][initY-i] = "FR";
                        }
                    }
                }
            }

        return tiles;
    };

    return{
        validateMove: validateMove,
        makeMove: makeMove,
        endGame: endGame
    }
};
exports.helperFunctions = helperFunctions;
