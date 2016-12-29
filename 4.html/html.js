var canvas;
var h1, h2;
var p;
var x =100;
var y=100;


function setup() {
    canvas = createCanvas(200, 200);
    canvas.position(400, 500); //.position --> posizione assoluta dell'elemento HTML
    createP("This is a paragraf created from javascript.");
    h1 = createElement('h3', 'h3 tag created from --> createElement function');
    h2 = createElement('h3', 'Waiting... one click!!!');
    p = createP("");
}

function mousePressed() {
    h2.html("Now i will show you my favorite number. "); //.html()  --> contenuto elemento
    p.html("My favorite number is " + random(0, 100));
}

function cacca(){
  p.html("cacca")
}

function draw() {
    background(200);
    fill(255, 0, 0);
    rect(x, y, 50, 50); //--> ora il rettangolo ha posizione relativa al canvas
    x += random(-2,2);
    y += random(-2,2);
}
