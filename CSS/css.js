var bgcolor;
var button;
var txt;

function setup() {
    createCanvas(400, 400);
    bgcolor = color(10);

    txt = createP('some text');
    txt.mouseOver(changeStyle);
    txt.mouseOut(reverseStyle);
    // txt.style('background-color','green');      //implementazione css in javascript
    // txt.style('color','black');         //se fatto da javascrit va a sovrascrivere quello in html
    button = createElement('button', 'Change bacground color');
    button.mousePressed(changeStyle);
}

function changeStyle(){
  txt.style('background-color','green');
  txt.style('color','black');
  txt.style('padding','24px');
}

function reverseStyle(){
  txt.style('background-color','white');
  txt.style('color','black');
  txt.style('padding','0px');
}

function draw() {
    background(bgcolor);
    fill(255, 0, 0);
    ellipse(100, 100, 50, 50);

}
