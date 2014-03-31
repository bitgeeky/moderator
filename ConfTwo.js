var ConfTwo = function(r, c){

    var numPlayers = 5;
    var numAssets = 10;
    
    
    var redTanks = [[1,c/2],[2,c/2-1],[2,c/2],[2,c/2+1],[3,c/2]];
    var redAssets = [[1,2],[1,3],[2,2],[2,3],[3,2],[3,3],[2,1],[2,5],
        [1,4],[2,4],[3,4],
        [1,c-3],[2,c-4],[1,c-4],[3,c-4],[2,c-3],[3,c-3],[2,c-2],[2,c-6],
        [1,c-5],[2,c-5],[3,c-5]];
    
    
    var blueTanks = [[r-4,c/2],[r-3,c/2-1],[r-3,c/2],[r-3,c/2+1],[r-2,c/2]];
    var blueAssets = [[r-4,2],[r-3,2],[r-3,1],[r-3,3],[r-2,2],[r-2,3],
        [r-4,3],[r-2,4],[r-3,4],[r-4,4],[r-3,5],
        [r-4,c-3],[r-3,c-3],[r-3,c-4],[r-3,c-2],[r-2,c-3],
        [r-4,c-4],[r-2,c-4],[r-2,c-5],[r-3,c-5],[r-4,c-5],[r-3,c-6]];
    
    
    var walls = [];
    createWalls();
    function createWalls(){
        for(var i=5;i<r-5;i++){
            walls.push([i,c/4]);
            walls.push([i,c/4+1]);
            walls.push([i,3*c/4]);
            walls.push([i,3*c/4-1]);
        }
        for(var i=(c/4+4);i<(3*c/4-4);i++){
            walls.push([r/2-1,i]);
            walls.push([r/2,i]);
        }
    }
    
    return{
        numPlayers: numPlayers,
        numAssets: numAssets,
        redTanks: redTanks,
        redAssets: redAssets,
        blueTanks: blueTanks,
        blueAssets: blueAssets,
        walls: walls
    }
};

exports.ConfTwo = ConfTwo;
