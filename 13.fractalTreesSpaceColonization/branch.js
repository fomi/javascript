/* oggetto ramo colllega due foglie */

function Branch(parent, pos, dir) {
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    this.originDir = this.dir.copy();
    this.count = 0;
    this.len = 2;

    this.reset = function() {
        this.dir = this.originDir.copy();
        this.count = 0;
    }

    this.next = function() {
        /* se in tree.js non ci sono due foglie ad una distanza minore della max_dist
        allora viene creati un nuovo ramo e replicato */
        var nextDir = p5.Vector.mult(this.dir, this.len);
        var nextPos = p5.Vector.add(this.pos, nextDir);
        var nextBranch = new Branch(this, nextPos, this.dir.copy());
        return nextBranch;
    }

    this.show = function() {
        if (parent != null) {
            stroke(255,255,255,100);
            strokeWeight(5);
            line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
        }
    }
}
