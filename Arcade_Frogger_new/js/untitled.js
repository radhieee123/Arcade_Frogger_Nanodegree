var Enemy = function(x, y, speed) {
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
	};

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y){
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt){
    // this.x = this.x + this.speed * dt;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(evt, x){
    switch(evt){
        case "up":
          console.log(this.x);
        case "down":
           console.log(this.x)
    }
};

var enemy1 = new Enemy(0 , 60, 60);
var enemy2 = new Enemy(0 , 140, 90);
var enemy3 = new Enemy(0 , 230, 160);

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(290, 300);
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});