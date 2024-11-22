const title = document.getElementById('title');
title.style.visibility = 'hidden';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; 
const turnTitle = document.getElementById('turnTitle');
const playAgainButton = document.getElementById('playAgain');
playAgainButton.style.visibility = 'hidden';
const restartButton = document.getElementById('restart');
restartButton.style.visibility = 'hidden';
const gameOptions = document.getElementById('gameOptions');
const timer = document.getElementById('timer');
timer.style.visibility = 'hidden';

let isPlayerTurn = true;
let playerChoice = "";
let computerChoice = "";
let playerTwoChoice = ""; 
let gameFinished = false;
let winner = "";
let noWinner = false;
let hasAWinner = false;
let pVp = false;
let elapsedTime = 0;
let stopwatchInterval;

initialize();

function initialize(){
    const pVpButton = document.getElementById('playerVplayer');
    const pVcButton = document.getElementById('playerVcomputer');
    pVcButton.addEventListener('click', function(){
        gameOptions.style.visibility = 'hidden';
        choosePiece();
    });
    pVpButton.addEventListener('click', function(){
        gameOptions.style.visibility = 'hidden';
        pVp = true;
        choosePiece();
    });
    
}

function choosePiece(){
    let choosingPieces = Math.floor(Math.random() * 2);
    if (choosingPieces == 1){
        playerChoice = "o";
        computerChoice = "x";
        playerTwoChoice = "x";
        startGame();
    } else {
        playerChoice = "x";
        computerChoice = "o";
        playerTwoChoice = "o";
        startGame();
    }
}

function startGame(){
    title.style.visibility = 'visible';
    gameContainer.style.visibility = 'visible';
    restartButton.style.visibility = 'visible';
    timer.style.visibility = 'visible';
    if (pVp){
        startTimer();
        playerTile();
        playerTwoTile();
    } else {
        startTimer();
        playerTile();
        computerTile(); 
    }
    restartButtonPress();
}

function startTimer() {
    //start timer if not already running
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
        elapsedTime++; 

        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        // format minutes
        let formattedMinutes;
        if (minutes < 10) {
        formattedMinutes = '0' + minutes;
        } else {
        formattedMinutes = minutes;
        }

        // format seconds
        let formattedSeconds;
        if (seconds < 10) {
        formattedSeconds = '0' + seconds;
        } else {
        formattedSeconds = seconds;
        }
        document.getElementById('timer').textContent = formattedMinutes + ':' + formattedSeconds;
        }, 1000); 
    }
}

function stopTimer() {
    clearInterval(stopwatchInterval); 
    stopwatchInterval = null; 
}

function playerTile(){
    let playerTilePlacement = document.querySelectorAll('.tiles');
    turnTitle.textContent = "Player Turn";
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
                checkGameCompletion();
                if (pVp){
                    setTimeout(function () {
                    if (!gameFinished) {
                        turnTitle.textContent = "Player Two Turn";
                    }
                }, 200);
                setTimeout(function(){
                    playerTwoTile();
                }, 1500);
                } else {
                    setTimeout(function () {
                        if (!gameFinished) {
                            turnTitle.textContent = "Computer Turn";
                        }
                    }, 300);
                    setTimeout(function(){
                        computerTile();
                    }, 1500);
                }
            } else {
                console.log("occupied");
            }
        });
    });
}

//i know this is a lot of repeated code but i cant figure out how to combine these two functions lol
function playerTwoTile(){
    let playerTilePlacement = document.querySelectorAll('.tiles');
    playerTilePlacement.forEach(tile => {
        tile.addEventListener('click', function(){
            if (!tile.hasChildNodes() && !isPlayerTurn && !gameFinished){
                const playerTwoImage = document.createElement('img');
                playerTwoImage.src = `images/${playerTwoChoice}.png`;
                playerTwoImage.alt = `${playerTwoChoice} image`;
                playerTwoImage.className = "imagesClass";
                playerTwoImage.id = playerTwoChoice;
                tile.appendChild(playerTwoImage);
                isPlayerTurn = true;
                checkGameCompletion();
                setTimeout(function(){
                    playerTile();
                }, 300);
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
        isPlayerTurn = true;
        playerTile();
    }
}

//after every move, evaluate the row and column next to the piece to 
//see if there has been a win

function checkGameCompletion(){
    console.log("Checking for completion...");
    let gameBoard = document.querySelectorAll('.tiles');
    let gameBoardArray = Array.from(gameBoard);
    let emptyArray = Array.from(gameBoard).filter(tile => !tile.hasChildNodes());

    //decide who winner is
    const getTileID = (tile) => {
        if (tile.hasChildNodes()) {
            const id = tile.firstChild.id;
            if (id === playerChoice) {
                winner = "Player";
            } else if (id === playerTwoChoice) {
                winner = "Player Two";
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
    stopTimer();
    playAgainButton.style.visibility = 'visible';
    restartButton.style.visibility = 'hidden';
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

function restartButtonPress(){
    restartButton.addEventListener('click', function(){
        location.reload();
    });
}


