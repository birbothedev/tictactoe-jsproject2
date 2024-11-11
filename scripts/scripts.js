const title = document.getElementById('title');
title.style.visibility = 'hidden'; // or opacity: 0;
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.visibility = 'hidden'; // or opacity: 0;

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; 
    title.style.visibility = 'visible'; // or opacity: 1;
    gameContainer.style.visibility = 'visible'; // or opacity: 1;
});
