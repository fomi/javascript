var slider = [];
var angle = 151;

function setup() {
    noCanvas();
    createDiv("").id("sliderArray").style("all")
    for(var i=0;i<530;i++){
        slider[i] = createSlider(0, 255, 50);
        slider[i].parent("sliderArray");
        slider[i].style('left','100');

    }
}

function draw() {
  var x;
  var offSet=0;

  for(var i=0;i<slider.length;i++){
      x = map(sin(angle+offSet),-1,1,0,255);
      slider[i].value(x);
      offSet+=0.07;
  }
    angle +=0.07;
}
