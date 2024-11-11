const title = document.getElementById('title');
title.style.visibility = 'hidden';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; 

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; 
    title.style.visibility = 'visible';
    gameContainer.style.visibility = 'visible';
});
