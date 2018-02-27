function Ship() {
    this.r = 12;
    this.x = width / 2;
    this.y = height - (this.r*2 + 5);
    this.hp = 3;
    this.model;

    this.show = function() {
        // this.debug();
        image(this.model,this.x-12,this.y-12);
    }

    this.move = function(dir) {
        this.x += dir * 2;
        if(this.x <= 70){
          this.x = 70;
        }
        if(this.x >= 530){
          this.x = 530;
        }
    }

    this.debug = function(){
      fill(50);
      rect(this.x, this.y, this.r*2, this.r*2);
      rectMode(CENTER);
      noStroke();
    }
}
