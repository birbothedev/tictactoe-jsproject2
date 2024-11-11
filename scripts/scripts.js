const title = document.getElementById('title');
title.style.display = 'none';
const gameContainer = document.getElementById('gameContainer');
gameContainer.style.display = 'none';

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; 
    title.style.display = 'block';
    gameContainer.style.display = 'block';
});