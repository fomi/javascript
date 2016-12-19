var bubbles = [];
var width = 400;
var height = 400;
var n_bubbles = 200;

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < n_bubbles; i++) {
        bubbles.push(new Bubble(random(0, height), random(0, width)));
    }
    var reload = select("#reload");
    reload.mousePressed(reload_fx);
}

function mousePressed() {
    var d = 0;
    for (var i = 0; i < bubbles.length; i++) {
        d = dist(bubbles[i].x, bubbles[i].y, mouseX, mouseY);
        if (d < radius) {
            bubbles[i].ccolor();
        }
    }
};


function draw() {
    background(0);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
        bubbles[i].restart();
    }
}

function reload_fx() {
    bubbles.splice(0, bubbles.length);
    for (var i = 0; i < n_bubbles; i++) {
        bubbles.push(new Bubble(random(0, height), random(0, width)));
    }
}


// function mouseDragged() {    //funzione con scorrimento del mouse
//     bubbles.push(new Bubble(mouseX, mouseY));
// }

// function keyPressed() {   //funzione che si attia con la tastiera
//     bubbles.splice(0, bubbles.length);
// }
