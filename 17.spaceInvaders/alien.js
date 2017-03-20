function Alien(x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;

    this.show = function() {
        fill(0, 255, 255);
        ellipse(this.x, this.y, this.r*2, this.r*2);
        ellipseMode(CENTER);
        noStroke();
    }

}
