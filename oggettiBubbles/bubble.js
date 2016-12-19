var radius = 10;

function Bubble(x, y) {
    this.x = x;
    this.y = y;
    this.lifespan = 255;
    this.col = color(0,127,255, this.lifespan);

    this.display = function() {
        // stroke(255, 255, 255);
        strokeWeight(0);
        // noFill();
        // noStroke();

        var r= red(this.col);
        var g= green(this.col);
        var b= blue(this.col);

        fill(r,g,b,this.lifespan);
        ellipse(this.x, this.y, 2 * radius, 2 * radius);
    };

    this.update = function() {
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
        this.lifespan = this.lifespan - 1;

        // this.col = color(0,127,0,this.lifespan);
        // console.log(this.lifespan);
    };

    this.isFinished = function(){
      if(this.lifespan<0){
        return true;
      }else{
        return false;
      }
    };

    this.ccolor = function() {
        if (green(this.col) == 127) {
            this.col = color(255, 0, 0, this.lifespan);
        } else {
            this.col = color(0, 127, 255, this.lifespan);
        }
    };

    this.start = function() {
        this.x = random(10, 395);
        this.y = random(10, 395);
        this.lifespan = 255;
        this.col = color(0, 255, 0, this.lifespan);
    };

    this.restart = function() {
        if (this.x >= height || this.y >= width) {
            this.lifespan=255;
            this.start();
        };
        if (this.x <= 0 || this.y <= 0) {
            this.lifespan=255;
            this.start();
        };
    };
}
