
var can;

function setup(){
  can = createCanvas(windowWidth,windowHeight);
  can.position(0,0);
  can.style('z-index','-1');
}


function draw(){
    background(220);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
