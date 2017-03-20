function Ship() {
    this.r = 10;
    this.x = width / 2;
    this.y = height - (this.r*2 + 5);


    this.show = function() {
        fill(50);
        rect(this.x, this.y, this.r*2, this.r*2);
        rectMode(CENTER);
        noStroke();
    }
    this.move = function(dir) {
        this.x += dir * 2;
    }
}
