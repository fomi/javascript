function Explosion(x,y,model,clock){
  this.x = x;
  this.y = y;
  this.r = 5;
  this.model = model;
  this.color = [255,0,0];
  this.spawnTime = clock;

  this.show = function(){
    // this.debug();
    image(this.model,this.x-this.r,this.y-this.r );
  }

  this.debug = function(){
    fill(this.color)
    rect(this.x, this.y, this.r*2, this.r*2);
    rectMode(CENTER);
    noStroke();
    tint(255,255);
  }

}
