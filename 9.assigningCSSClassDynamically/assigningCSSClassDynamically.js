var windowWidth = 200;
var windowHeight = 200;

function setup() {
  for(var i=0;i<100;i++){
    var p = createP('apple');
    var x = floor(random(0,windowWidth-100));
    var y = floor(random(0,windowHeight-100));
    p.position(x,y);
    p.class('apples');
  }
  for(var i=0;i<100;i++){
    var p = createP('blueberrie');
    var x = floor(random(0,windowWidth-100));
    var y = floor(random(0,windowHeight-100));
    p.position(x,y);
    p.class('blueberries');
    p.mousePressed(becomeApple);
  }

}

function becomeApple(){
  this.class('apples');
}
