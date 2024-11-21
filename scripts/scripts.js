const title = document.getElementById('title');
title.style.visibility = 'hidden';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; 
const choiceOptions = document.getElementById('choiceOptions');
choiceOptions.style.visibility = 'hidden';
const turnTitle = document.getElementById('turnTitle');
const playAgainButton = document.getElementById('playAgain');
playAgainButton.style.visibility = 'hidden';

let isPlayerTurn = true;
let playerChoice = "";
let computerChoice = "";
let gameFinished = false;
let winner = "";
let noWinner = false;
let hasAWinner = false;

initialize();

function initialize(){
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
    playAgain(); 
}

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
            if (!tile.hasChildNodes() && isPlayerTurn && !gameFinished){
                const playerImage = document.createElement('img');
                playerImage.src = `images/${playerChoice}.png`;
                playerImage.alt = `${playerChoice} image`;
                playerImage.className = "imagesClass";
                playerImage.id = playerChoice;
                tile.appendChild(playerImage);
                isPlayerTurn = false;
                console.log("Computer turn!");
                checkGameCompletion();
                setTimeout(function () {
                    if (!gameFinished) {
                        turnTitle.textContent = "Computer Turn";
                    }
                }, 300);
                setTimeout(function(){
                    computerTile();
                }, 1500);
            } else {
                console.log("occupied");
            }
        });
    });
}

function computerTile(){
    let computerTilePlacement = document.querySelectorAll('.tiles');
    let tilesArray = Array.from(computerTilePlacement).filter(tile => !tile.hasChildNodes());

    if (tilesArray.length > 0 && !isPlayerTurn && !gameFinished){
        randomTileIndex = Math.floor(Math.random() * tilesArray.length);
        let randomEmptyTile = tilesArray[randomTileIndex];

        const computerImage = document.createElement('img');
        computerImage.src = `images/${computerChoice}.png`;
        computerImage.alt = `${computerChoice} image`;
        computerImage.className = "imagesClass";
        computerImage.id = computerChoice;
        randomEmptyTile.appendChild(computerImage);
        checkGameCompletion();
        setTimeout(function () {
            if (!gameFinished) {
                turnTitle.textContent = "Player Turn";
            }
        }, 300);

        isPlayerTurn = true;
    }
}

//after every move, evaluate the row and column next to the piece to 
//see if there has been a win

function checkGameCompletion(){
    console.log("Checking for completion...");
    let gameBoard = document.querySelectorAll('.tiles');
    let gameBoardArray = Array.from(gameBoard);
    let emptyArray = Array.from(gameBoard).filter(tile => !tile.hasChildNodes());

    const getTileID = (tile) => {
        if (tile.hasChildNodes()) {
            const id = tile.firstChild.id;
            if (id === playerChoice) {
                winner = "Player";
            } else {
                winner = "Computer";
            }
            return id;
        }
        return null; 
    };

    for (i=0; i < gameBoardArray.length; i++){
        //columns
        if (i < 3 &&
            getTileID(gameBoardArray[i]) &&
            getTileID(gameBoardArray[i]) === getTileID(gameBoardArray[i+3]) &&
            getTileID(gameBoardArray[i+3]) === getTileID(gameBoardArray[i+6])){
                gameFinished = true;
                hasAWinner = true;
                gameOver();
                return
        } 
        //top right diagonal
        else if(i === 2 &&
            getTileID(gameBoardArray[i]) &&
            getTileID(gameBoardArray[i]) === getTileID(gameBoardArray[i+2]) &&
            getTileID(gameBoardArray[i+2]) === getTileID(gameBoardArray[i+4])){
                gameFinished = true;
                hasAWinner = true;
                gameOver();
                return
        } 
        //rows
        else if ( i % 3 ===0 &&
            getTileID(gameBoardArray[i]) &&
            getTileID(gameBoardArray[i]) === getTileID(gameBoardArray[i+1]) &&
            getTileID(gameBoardArray[i+1]) === getTileID(gameBoardArray[i+2])){
                gameFinished = true;
                hasAWinner = true;
                gameOver();
                return
        } 
        //top left diagonal
        else if (i === 0 &&
            getTileID(gameBoardArray[i]) &&
            getTileID(gameBoardArray[i]) === getTileID(gameBoardArray[i+4]) &&
            getTileID(gameBoardArray[i+4]) === getTileID(gameBoardArray[i+8])){
                gameFinished = true;
                hasAWinner = true;
                gameOver();
                return
        }
    }
    //tiles full but no winner
    if(emptyArray.length <= 0 && !hasAWinner){
        noWinner = true;
        gameFinished = true;
            gameOver();
            return
    }
}

function gameOver(){
    console.log("Game over!");
    playAgainButton.style.visibility = 'visible';
    if (!noWinner){
        turnTitle.textContent = `Winner: ${winner}!`;
    }
    else {
        turnTitle.textContent = `No Winner!`;
    }
    playAgain();
}

function playAgain(){
    playAgainButton.addEventListener('click', function(){
        location.reload();
    });
}

