/**
 * Created by rpowar on 10/14/17.
 */
var game = (function(){
    var snake = function() {
        var originalSnakeLen = 4;
        snakeBody = [];
        for(var i = originalSnakeLen - 1; i >= 0; i--){
            snakeBody.push({cordX: i, cordY: 0});
        }

    };

    var snakeFood = function(){
        var randomX = Math.round(Math.random()*(gameWidth - snakeSize)/snakeSize);
        var randomY = Math.round(Math.random()*(gameHeight - snakeSize)/snakeSize);
        foodCords = {
            x: randomX,
            y: randomY
        };

    };

    var genericPaintCell = function(element, xCord, yCord, color){
        element.fillStyle = color;
        element.fillRect(xCord * snakeSize, yCord * snakeSize, 10, 10);
        element.strokeStyle = 'black';
        element.strokeRect(xCord * snakeSize, yCord * snakeSize, 10, 10);
    };

    var play = function(){

        //var restartButton = document.getElementById('restart');
        //restartButton.disabled = true;

        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, gameWidth, gameHeight);
        ctx.strokeStyle = 'grey';
        ctx.strokeRect(0, 0, gameWidth, gameHeight);


        //position for snake head
        var snakeHeadX = snakeBody[0].cordX;
        var snakeHeadY = snakeBody[0].cordY;

        if(direction === 'right'){
            snakeHeadX++;
        }else if(direction === 'left'){
            snakeHeadX--;
        }else if(direction === 'up'){
            snakeHeadY--;
        }else if(direction === 'down'){
            snakeHeadY++;
        }

        if(snakeHeadX === -1 || snakeHeadX === gameWidth/snakeSize || snakeHeadY === -1 || snakeHeadY === gameHeight/snakeSize || checkCollison(snakeHeadX, snakeHeadY, snakeBody)){
            initializeGame();
            return;
        }

        if(snakeHeadX === foodCords.x && snakeHeadY === foodCords.y){
            var tail = {
                cordX : snakeHeadX,
                cordY : snakeHeadY
            };
            score++;

            snakeFood();
        }else{
            var tail = snakeBody.pop(); //pops out the last cell
            tail.cordX = snakeHeadX;
            tail.cordY = snakeHeadY;
        }


        snakeBody.unshift(tail);

        for(var i = 0; i < snakeBody.length; i++){
            var cords = snakeBody[i];
            genericPaintCell(ctx, cords.cordX, cords.cordY, 'white');
        }

        genericPaintCell(ctx, foodCords.x, foodCords.y, 'yellow');
        gameScore();
    };

    var gameScore = function(){
        var printScore = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(printScore, 175, gameHeight - 5);
    };

    var checkCollison = function(x, y, snake){
        for(var i = 0; i < snake.length; i++){
            if(snake[i].cordX === x && snake[i].cordY === y){
                return true;
            }
        }
        return false;
    };

    var initializeGame = function(){
        direction='down';
        snake();
        snakeFood();
        if(typeof run !== 'undefined'){
            clearInterval(run);
        }
        run = setInterval(play, 100);
    };

    return{
        init : initializeGame
    }

}());
