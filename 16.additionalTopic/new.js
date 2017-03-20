var x = 0;
var timer;
var counter = 0;
var interval;
var button;
var flag;

function setup() {
    createCanvas(500, 500);

    // setTimeout(rainbow, 3000);

    button = createButton("Start Timer");
    flag = 0;
    button.mousePressed(doTimerV2);
    timer = createP("timer");

    console.log(button.html());

}

function doTimer(){
  if(flag == 0){
      interval = setInterval(timeIt,500);
      button.html("Stop Timer");
      flag = 1;
  }else{
      clearInterval(interval);
      button.html("Start Timer");
      flag = 0;
  }
}

function doTimerV2(){
  var s = "Start Timer";

  if(button.html() == s){
      interval = setInterval(timeIt,500);
      button.html("Stop Timer");
  }else{
      clearInterval(interval);
      button.html("Start Timer");
  }
}

function timeIt(){
  timer.html(counter);
  counter++;
}

function rainbow(){
    createP("cacca");
}

function draw() {
    // timer.html(frameCount);
    background(51);
    stroke(255);
    line(x, 0, x, height);

    x = x + 3;
    if (x > width) {
        x = 0;
    }

}
