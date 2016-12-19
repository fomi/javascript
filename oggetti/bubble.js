var radius = 10;

function Bubble(x, y) {
    this.x = x;
    this.y = y;
    this.col = color(0, 127, 255, 100);
    this.cflag = true;

    this.display = function() {
        //stroke(0, 127, 255);
        // strokeWeight(1);
        // noFill();
        fill(this.col);
        ellipse(this.x, this.y, 2 * radius, 2 * radius);
    };

    this.ccolor = function() {
        if (this.cflag == true) {
            this.col = color(255, 0, 0, 100);
            this.cflag = false;
        } else {
            this.col = color(0, 127, 255, 100);
            this.cflag = true;
        }
    };

    this.move = function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    };

    this.start = function() {
        this.x = random(10, 395);
        this.y = random(10, 395);
        this.col = color(0, 255, 0, 100);
    };

    this.restart = function() {
        if (this.x >= height || this.y >= width) {
            // console.log("restart maggiore");
            this.start();
        };
        if (this.x <= 0 || this.y <= 0) {
            // console.log("restart minore");
            this.start();
        };
    };
}
