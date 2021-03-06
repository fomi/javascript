var bubbles = [];
var width = 400;
var height = 400;
var n_bubbles = 50;
var b1,b2;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    for (var i = 0; i < n_bubbles; i++) {
        bubbles.push(new Bubble(random(0, height), random(0, width)));
    }
    var reload = select("#reload");
    reload.mousePressed(reload_fx);
}

function draw() {
    background(0);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].display();
        for (var j = 0; j < bubbles.length; j++) {
            if (bubbles[i].intersects(bubbles[j]) && i != j) {
                bubbles[i].changeColor();
                bubbles[j].changeColor();              
            }
        }
    }
}

function reload_fx() {
    bubbles.splice(0, bubbles.length);
    for (var i = 0; i < n_bubbles; i++) {
        bubbles.push(new Bubble(random(0, height), random(0, width)));
    }
}
