

function Bubble(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.col = color(0, 127, 255, 155);

    this.display = function() {
        // stroke(255, 255, 255);
        strokeWeight(0);
        fill(this.col);
        ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
    };

    this.update = function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    };

    this.changeColor = function() {
        this.col = color(random(0, 255), random(0, 255), random(0, 255))
    };

    this.intersects = function(other){
      var d = dist(this.x,this.y,other.x,other.y);
      if(d < this.radius + other.radius + 4){
        return true;
      }else{
        return false;
      }
    }
}
