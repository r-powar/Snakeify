/**
 * Created by rpowar on 10/14/17.
 */
var game = (function(){

    //create the snake
    var snake = function() {
        var originalSnakeLen = 4;
        snakeBody = [];
        for(var i = originalSnakeLen - 1; i >= 0; i--){
            snakeBody.push({cordX: i, cordY: 0});
        }

    };

    //generate the food for the game
    var snakeFood = function(){
        var randomX = Math.round(Math.random()*(gameWidth - snakeSize)/snakeSize);
        var randomY = Math.round(Math.random()*(gameHeight - snakeSize)/snakeSize);
        foodCords = {
            x: randomX,
            y: randomY
        };

    };

    //generic function to paint the shapes on canvas
    var genericPaintCell = function(element, xCord, yCord, color){
        element.fillStyle = color;
        element.fillRect(xCord * snakeSize, yCord * snakeSize, 10, 10);
        element.strokeStyle = 'black';
        element.strokeRect(xCord * snakeSize, yCord * snakeSize, 10, 10);
    };

    var play = function(){

        //snake playground
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, gameWidth, gameHeight);
        ctx.strokeStyle = 'grey';
        ctx.strokeRect(0, 0, gameWidth, gameHeight);


        //position for snake head
        var snakeHeadX = snakeBody[0].cordX;
        var snakeHeadY = snakeBody[0].cordY;

        //decrement/increment the snake head position based on direction
        if(direction === 'right'){
            snakeHeadX++;
        }else if(direction === 'left'){
            snakeHeadX--;
        }else if(direction === 'up'){
            snakeHeadY--;
        }else if(direction === 'down'){
            snakeHeadY++;
        }

        //check for collison/bounds of the game and restart the game
        if(snakeHeadX === -1 || snakeHeadX === gameWidth/snakeSize || snakeHeadY === -1 || snakeHeadY === gameHeight/snakeSize || checkCollison(snakeHeadX, snakeHeadY, snakeBody)){
            initializeGame();
            score = 0;
            return;
        }

        // if snake consumes the food increase the score and increase the snake body
        if(snakeHeadX === foodCords.x && snakeHeadY === foodCords.y){
            //create a new tail for the snake
            var tail = {
                cordX : snakeHeadX,
                cordY : snakeHeadY
            };
            score++;

            //creates new food
            snakeFood();
        }else{
            //pops out the last rectangle
            var tail = snakeBody.pop();
            tail.cordX = snakeHeadX;
            tail.cordY = snakeHeadY;
        }

        //increases the snake body
        snakeBody.unshift(tail);

        for(var i = 0; i < snakeBody.length; i++){
            var cords = snakeBody[i];
            genericPaintCell(ctx, cords.cordX, cords.cordY, 'white');
        }

        genericPaintCell(ctx, foodCords.x, foodCords.y, 'yellow');
        gameScore();
    };

    //calculate the score
    var gameScore = function(){
        var printScore = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(printScore, 175, gameHeight - 5);
    };

    //logic for snake colliding with itself
    var checkCollison = function(x, y, snake){
        for(var i = 0; i < snake.length; i++){
            if(snake[i].cordX === x && snake[i].cordY === y){
                return true;
            }
        }
        return false;
    };

    //initialize the game
    var initializeGame = function(){
        //default direction
        direction='down';
        snake();
        snakeFood();

        //moving the snake using timer
        if(typeof run !== 'undefined'){
            clearInterval(run);
        }
        run = setInterval(play, 100);
    };

    return{
        start : initializeGame
    }

}());
