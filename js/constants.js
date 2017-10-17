/**
 * Created by rpowar on 10/14/17.
 */
var canvasElement = document.getElementById('snakeCanvas');
var ctx = canvasElement.getContext('2d');
var snakeSize = 10;
var snakeBody;
var gameWidth = canvasElement.width;
var gameHeight = canvasElement.height;
var score = 0;
var foodCords;
var direction;

