
var tree;
var max_dist = 200;
var min_dist = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tree = new Tree();
}


function draw() {
    background(51);
    tree.show();
    tree.grow();
    // noLoop();
}
