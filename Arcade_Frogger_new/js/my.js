// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.width=60;
    this.height=60;
    this.x = x;  
    this.y = y;    
    this.speed = speed;    
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  this.x=this.x+this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var player = function() {
    this.width=60;
    this.height=60;
    this.x=380;
    this.y=700;
    this.sprite = 'images/char-cat-girl.png';

};

player.prototype.update = function(dt) {
  this.x=this.x+this.speed*dt;
};

// Draw the enemy on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keyCode) {
    
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player=new player();
var enemy1=new Enemy(0,60,10);
var enemy2=new Enemy(0,100,20);
var enemy3=new Enemy(0,230,35);
var allEnemies=[];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
