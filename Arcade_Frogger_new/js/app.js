/*TODO: Some Global Variables like winner flag,lost flag,level*/
var score = 0;
var lostGame = 3;
var level = 1;
var speed = Math.floor(Math.random() * 101) + 40;

/*TODO:Enemy object details*/
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.x + speed;
};

/*Update the position of enemy with respect to two things:
    1) Changes position according to speed.
    2) Changes the position and gets back to position zero the canvas width is over.
*/
Enemy.prototype.update = function(dt) {
    this.x = this.x + speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
};

/*Render the enemy bug
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*TODO:Player Object Details*/
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
};

/* When the player gets a score(reaches water) it will call following function.
    1) Resets the position of player to the start position.
    2) Set the level as per the score secured by the player.
    3) Display the Score:
        - Erases the previous score by filling white rectangle on it.
        - Write the current new score on the white filled rectangle.
*/
Player.prototype.rendwin = function() {
    this.x = 290;
    this.y = 300;
    score++;
    if (score > 20) {
        level = 3;
    } else if (score > 10) {
        level = 2;
    } else {
        level = 1;
    }
    ctx.font = "bold 20px impact";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 50);
    console.log(score);
    ctx.fillStyle = "black";
    ctx.fillText("Score:" + score, 30, 18);
};

/*
    Renders the player images on canvas.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    Handles situation when a level changes.
*/
Player.prototype.levelHandle = function() {

    /*Display Level Number at top right corner of canvas 
    1)Select the font style and size
    2)Erase the previous level number with drawing white rectangle
    3)Write the current level number
    */
    ctx.font = "14px impact";
    ctx.fillStyle = "white";
    ctx.fillRect(430, 12, 435, 15);
    ctx.fillStyle = "black";
    ctx.fillText("LEVEL:" + level, 430, 14);

    /*Setting Up the speed of enemy bug according to the level*/
    if (level === 2) {
        speed = Math.floor(Math.random() * 101) + 140;
    } else if (level === 3) {
        speed = Math.floor(Math.random() * 101) + 180;
    } else {
        speed = Math.floor(Math.random() * 101) + 80;
    }
};

Player.prototype.update = function(string) {
    if (string === "up") {
        if (this.y > 20) {
            this.y = this.y - 70;
            console.log("Player y:" + this.y);
        } else if (this.y === 20) {
            this.y = this.y - 40;
            this.rendwin();
        }
    } else if (string === "down") {
        if (this.y <= 320) {
            this.y = this.y + 70;
            console.log("Player y:" + this.y);
        }
    } else if (string === "left") {
        if (this.x >= 80) {
            this.x = this.x - 70;
            console.log("Player x:" + this.x);
        }
    } else if (string === "right") {
        if (this.x <= 300) {
            this.x = this.x + 70;
            console.log("Player x:" + this.x);
        }
    }
    this.checkCollisions();
};

Player.prototype.handleInput = function(evt, x) {
    switch (evt) {
        case "up":
            player.update("up");
            break;
        case "down":
            player.update("down");
            break;
        case "left":
            player.update("left");
            break;
        case "right":
            player.update("right");
            break;
    }
};

/*Checking collisions using Axis-Aligned Bounding Box*/
Player.prototype.checkCollisions = function() {
    for (e = 0; e < 4; e++) {
        if (allEnemies[e].x < this.x + 50 && allEnemies[e].x + 50 > this.x &&
            allEnemies[e].y < this.y + 50 && allEnemies[e].y + 50 > this.y) {
            console.log("Detected!");
            this.reset();
        }
    }
};

Player.prototype.reset = function() {
    /*Brings the player back to starting position*/
    this.x = 290;
    this.y = 300;
    console.log("Game Reset");
    /*Decrement the lostGame Flag whenever collision detected*/
    lostGame--;

    /*As total of three chances are given, 
    IF-> the player still have chances left then:
    1) Erase the number of chances
    2) Writes the current number of chances left.

    ELSE-> the player has no chance left then:
    1) Erase the number of chances
    2) Let the user know that game will start again with score 0*/
    if (lostGame > 0) {
        console.log(lostGame);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 420, 50);
        ctx.font = "bold 20px impact";
        ctx.fillStyle = "black";
        ctx.fillText("Chance: " + lostGame, 190, 18);
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 420, 150);
        ctx.font = "bold 20px impact";
        ctx.fillStyle = "black";
        ctx.fillText("Game Reset & Score 0 ", 90, 18);
        score = 0;
        lostGame = 3;
    }
};

var Gem = function() {
    this.lastTime = Date.now();
};
Gem.prototype.render = function() {
    switch (level) {
        case 1:
            this.sprite = 'images/Green.png';
            break;
        case 2:
            this.sprite = 'images/Orange.png';
            break;
        case 3:
            this.sprite = 'images/Blue.png';
            break;
    }
    var now = Date.now();
    if (now - this.lastTime > 10000) {
    this.x = Math.floor(Math.random() * 101) + 101;
    this.y = Math.floor(Math.random() * 83) + 83;
    this.lastTime = now;
    }
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    this.grabGem();
};

Gem.prototype.grabGem = function() {
        if (player.x < this.x + 50 && player.x + 50 > this.x &&
            player.y < this.y + 50 && player.y + 50 > this.y) {
            this.gemReset();
        }
};
Gem.prototype.gemReset = function() {

    this.x=900;
    this.y=900;
    console.log("Grabbed!");
    score+=10;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 150);
    ctx.font = "bold 20px impact";
    ctx.fillStyle = "black";
    ctx.fillText("Bonus Points!!", 90, 18);
};

/*TODO:Object instantiate with some variables*/

var allEnemies = [];
var x, y, espeed;
var noEnemies = 4;
for (var i = 0; i < noEnemies; i++) {
    x = Math.floor(Math.random() * 100) + 105;
    y = Math.floor(Math.random() * 200) + 45;
    espeed = speed;
    var enemy = new Enemy(x, y, espeed);
    allEnemies.push(enemy);
}
var player = new Player(290, 300);
var gem = new Gem();

/*TODO:User input event handler*/

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});