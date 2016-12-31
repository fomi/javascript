var tree = [];
var leaves = [];

var count = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    // slider = createSlider(0,TWO_PI,PI/2,0.01);
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - 100);
    var root = new Branch(a, b);

    tree[0] = root;

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (count < 7) {
        for (var i = tree.length - 1; i >= 0; i--) {
            if (!tree[i].finished) {
                tree.push(tree[i].branchA());
                tree.push(tree[i].branchB());
            }
            tree[i].finished = true;
        }
        count++;
        if (count === 7) {
            for (var i = 0; i < tree.length; i++) {
                if (!tree[i].finished) {
                    var leaf = tree[i].end.copy();
                    leaves.push(leaf);
                }
            }
            i = -1;
        }
    }
}

function draw() {
    background(30);
    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
        // tree[i].jitter();
    }
    for (var i = 0; i < leaves.length; i++) {
        fill(255, 255, 255, 100);
        noStroke();
        ellipse(leaves[i].x, leaves[i].y, 20, 20);
    }
}
