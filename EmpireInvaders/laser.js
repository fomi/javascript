function Laser(x, y) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.toDelete = false;

    this.showRedLaser = function() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.r, 8);
        rectMode(CENTER);
        noStroke();
    }

    this.showGreenLaser = function() {
        fill(51,255,51);
        rect(this.x, this.y, this.r, 8);
        rectMode(CENTER);
        noStroke();
    }

    this.move = function(direction) {      //-1 laser in su +1 laser in giù
        this.y += (4*direction);
    }

    this.hit = function(alien) {
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.r + alien.r) {
            this.toDelete = true;
            return true;
        } else {
            return false;
        }
    }

    this.life = function() {
        if (this.y < 0) {
            this.toDelete = true;
        }
    }
}
