function Alien(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.color = [0,0,255];
    this.speed = 0.4;
    this.points = 0;
    this.model;

    this.show = function() {
        if(this.r == 8){
          // this.debug0();
          image(this.model,this.x-this.r,this.y-this.r );
        }else{
          // this.debug1();
          image(this.model,this.x-this.r,this.y-(this.r-5) );
        }
    }

    this.moveAlien = function(dir){
        this.x += dir*this.speed;
    }

    this.debug0 = function(){
      fill(this.color)
      rect(this.x, this.y, this.r*2, this.r*2);
      rectMode(CENTER);
      noStroke();
    }

    this.debug1 = function(){
      fill(this.color)
      rect(this.x, this.y, this.r*2, this.r);
      rectMode(CENTER);
      noStroke();
    }
}
