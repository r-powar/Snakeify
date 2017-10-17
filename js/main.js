
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        game.init();
    });

    document.addEventListener("keydown", function (evnt) {
        var keyDirection = evnt.keyCode;
        console.log("Direction:", direction);
        if (keyDirection === 37 && direction !== 'right') {
            direction = 'left';
        } else if (keyDirection === 38 && direction !== 'down') {
            direction = 'up';
        } else if (keyDirection === 39 && direction !== 'left') {
            direction = 'right';
        } else if (keyDirection === 40 && direction !== 'up') {
            direction = 'down';
        }
    });

})();




