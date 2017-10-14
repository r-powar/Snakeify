document.addEventListener("DOMContentLoaded", function(){
    var canvasElement = document.getElementById('snakeCanvas');
    var ctx = canvasElement.getContext('2d');
    var boardWidth = canvasElement.width;
    var boardHeight = canvasElement.height;



    ctx.fillStyle = 'green';
    ctx.fillRect(5, 5, 10, 10);

    snakeFood(boardWidth, boardHeight, ctx);

});


function snakeFood(width, height, canvasElement){
    var randomX = Math.round(Math.random()*(width - 10)/10);
    var randomY = Math.round(Math.random()*(height - 10)/10);
    canvasElement.fillStyle = 'red';
    canvasElement.fillRect(randomX, randomY, 10, 10);
}
