var bubbles = [];
var width = 400;
var height = 400;

function setup() {
    createCanvas(400, 400);
    var reload = select("#reload");
    reload.mousePressed(reload_fx);
}

function mousePressed() {
    bubbles.push(new Bubble(mouseX,mouseY));
}

function draw() {
    background(0);

    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
        bubbles[i].restart();
    }
}

function reload_fx(){
    bubbles.splice(0,bubbles.length);

    // for (var i = 0; i < bubbles.length; i++) {
    //     bubbles.splice(i,1);
    // }
}

function Bubble(x,y) {
    this.x = x;
    this.y = y;
    this.display = function() {
        stroke(0, 127, 255);
        strokeWeight(1);
        noFill();
        ellipse(this.x, this.y, 20, 20);
    };
    this.move = function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    };
    this.start = function() {
        this.x = random(10, 395);
        this.y = random(10, 395);
    };
    this.restart = function() {
        if (this.x >= height || this.y >= width) {
            console.log("restart maggiore:", this.x, this.y);
            this.start();
        };
        if (this.x <= 0 || this.y <= 0) {
            console.log("restart minore:", this.x, this.y);
            this.start();
        };
    }

}
