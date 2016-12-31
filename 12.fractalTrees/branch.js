

function Branch(begin,end){
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.show = function(){
    stroke(255);
    strokeWeight(4);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }

  this.branchA = function(){

    var dir = p5.Vector.sub(this.end,this.begin);   //vettore direzione
    dir.rotate(PI/4);
    dir.mult(0.7);
    var newEndPoint = p5.Vector.add(this.end,dir);
    var b = new Branch(this.end,newEndPoint);
    return b;
  }

  this.branchB = function(){

    var dir = p5.Vector.sub(this.end,this.begin);   //vettore direzione
    dir.rotate(-PI/4);
    dir.mult(0.7);
    var newEndPoint = p5.Vector.add(this.end,dir);
    var b = new Branch(this.end,newEndPoint);
    return b;
  }

  this.jitter = function(){
    this.end.x += random(-0.1,0.1);
      this.end.y += random(-0.1,0.1);
  }
}
