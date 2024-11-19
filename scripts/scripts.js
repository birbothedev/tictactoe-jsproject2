const title = document.getElementById('title');
title.style.visibility = 'hidden';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; 

let isXTurn = true;

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; 
    title.style.visibility = 'visible';
    gameContainer.style.visibility = 'visible';
    startGame();
});

function startGame(){
    playerTile();
    computerTile();
}


function playerTile(){
    let playerTilePlacement = document.querySelectorAll('.tiles');
    playerTilePlacement.forEach(tile => {
        tile.addEventListener('click', function(){
            if (!tile.hasChildNodes() && isXTurn){
                const xImage = document.createElement('img');
                xImage.src = "images/x.png";
                xImage.alt = "x image";
                xImage.className = "imagesClass";
                tile.appendChild(xImage);
                isXTurn = false;
            } else {
                console.log("occupied");
            }
        });
    });
}

function computerTile(){
    let computerTilePlacement = document.querySelectorAll('.tiles');
    computerTilePlacement.forEach(tile =>{
        if (!tile.hasChildNodes() && !isXTurn){
            const oImage = document.createElement('img');
            oImage.src = "images/o.png";
            oImage.alt = "o image";
            oImage.className = "imagesClass";
            tile.appendChild(oImage);
            isXTurn = true;
        }
    });
}

