// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/kKT0v3qhIQY

var tree;
var max_dist = 400;
var min_dist = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tree = new Tree();
}

function draw() {
  background(51);
  tree.show();
  tree.grow();
}
