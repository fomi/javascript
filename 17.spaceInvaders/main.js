var ship;
var aliens = [];
var lasers = [];

function setup() {
    createCanvas(600, 500);
    ship = new Ship();
    // laser = new Laser(150,500);
    for (var i = 0; i < 10; i++) {
        aliens[i] = new Alien((((600 / 10) * i) + 30), 30);
    }
}

function draw() {
    background(150);

    for (var i = 0; i < aliens.length; i++) {
        aliens[i].show();
    }

    for (var i = 0; i < lasers.length; i++) {
        lasers[i].show();
        lasers[i].move();
        for (var j = aliens.length-1; j >=0; j--) {
            if (lasers[i].hit(aliens[j])) {
                console.log("BOOOOOOM");
                aliens.splice(j, 1);
            }
        }
    }

    for (var i = lasers.length-1; i >=0; i--) {
        lasers[i].life();
        if (lasers[i].toDelete) {
            lasers.splice(i, 1);
        }
    }

    ship.show();

    if(keyIsDown(LEFT_ARROW)){
      ship.move(-1);
    }
    if(keyIsDown(RIGHT_ARROW)){
      ship.move(1);
    }

}

function keyPressed() {
    // if (keyCode == LEFT_ARROW) {
    //     ship.move(-1);
    // }
    // if (keyCode == RIGHT_ARROW) {
    //     ship.move(1);
    // }
    if (keyCode == UP_ARROW) {
        var laser = new Laser(ship.x, ship.y);
        lasers.push(laser);
        console.log(lasers.length);
    }

}
