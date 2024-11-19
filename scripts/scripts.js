const title = document.getElementById('title');
title.style.visibility = 'hidden';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; 
const choiceOptions = document.getElementById('choiceOptions');
choiceOptions.style.visibility = 'hidden';
const turnTitle = document.getElementById('turnTitle');

let isPlayerTurn = true;
let playerChoice = "";
let computerChoice = "";

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; 
    choiceOptions.style.visibility = 'visible';
    let oChoice = document.getElementById('oImage');
    oChoice.addEventListener('click', function() {
        playerChoice = "o";
        computerChoice = "x";
        startGame();
    });
    let xChoice = document.getElementById('xImage');
    xChoice.addEventListener('click', function() {
        playerChoice = "x";
        computerChoice = "o";
        startGame();
    });
});

function startGame(){
    title.style.visibility = 'visible';
    gameContainer.style.visibility = 'visible';
    choiceOptions.style.display = 'none';
    turnTitle.textContent = "Player Turn";
    playerTile();
    computerTile();
}

function playerTile(){
    let playerTilePlacement = document.querySelectorAll('.tiles');
    playerTilePlacement.forEach(tile => {
        tile.addEventListener('click', function(){
            if (!tile.hasChildNodes() && isPlayerTurn){
                const playerImage = document.createElement('img');
                playerImage.src = `images/${playerChoice}.png`;
                playerImage.alt = `${playerChoice} image`;
                playerImage.className = "imagesClass";
                tile.appendChild(playerImage);
                isPlayerTurn = false;
                console.log("Computer turn!");
                setTimeout(function(){
                    turnTitle.textContent = "Computer Turn";
                }, 200);
                setTimeout(function(){
                    computerTile();
                }, 1000);
                checkGameCompletion();
            } else {
                console.log("occupied");
            }
        });
    });
}

function computerTile(){
    let computerTilePlacement = document.querySelectorAll('.tiles');
    let tilesArray = Array.from(computerTilePlacement).filter(tile => !tile.hasChildNodes());

    if (tilesArray.length > 0 && !isPlayerTurn){
        randomTileIndex = Math.floor(Math.random() * tilesArray.length);
        let randomEmptyTile = tilesArray[randomTileIndex];

        const computerImage = document.createElement('img');
        computerImage.src = `images/${computerChoice}.png`;
        computerImage.alt = `${computerChoice} image`;
        computerImage.className = "imagesClass";
        randomEmptyTile.appendChild(computerImage);
        setTimeout(function(){
            turnTitle.textContent = "Player Turn";
        }, 200);

        isPlayerTurn = true;
        checkGameCompletion();
    }
}

function checkGameCompletion(){
    return
}

