var bubbles = [];
var width = 400;
var height = 400;
var n_bubbles = 50;
var flower = [];

function preload() {
    for (var i = 0; i < 3; i++) {
        flower[i] = loadImage('images/flower' + i + '.jpg')
    }
}

function setup() {
    createCanvas(400, 400);

    var reload = select("#reload");
    reload.mousePressed(reload_fx);
}

function mousePressed() {
    var r = floor(random(0, flower.length));
    var b = new Bubble(mouseX, mouseY, flower[r]);
    if (mouseX >= 0 && mouseX <= 400 && mouseY >= 0 && mouseY <= 400) {
        bubbles.push(b);
        console.log("x=", mouseX);
        console.log("y=", mouseY);
        console.log("n°=", bubbles.length);
    }

}

function draw() {
    background(0);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].display();
    }
}

function reload_fx() {
    bubbles.splice(0, bubbles.length);
}
