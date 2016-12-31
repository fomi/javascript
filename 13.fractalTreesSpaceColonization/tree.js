function Tree() {
    /* oggetto albero che contiene un array di foglie e rami */
    this.leaves = [];
    this.branches = [];

    for (var i = 0; i < 500; i++) { //creata una popolazione di foglie
        this.leaves.push(new Leaf());
    }

    /* creata la radice di partenza con 2 vettori uno direzione verso l'alto e
    un altro di posizione al centro del canvas */

    var pos = createVector(width / 2, height); //X
    var dir = createVector(0, -1);
    var root = new Branch(null, pos, dir);
    this.branches.push(root); //viene aggiunta la root all'array di rami

    /* viene cercata una foglia in tutto l'array leaves, con la distanza fra il
    vettore di posizione della radice e il vettore di posizione foglia minore
    della max_dist. Quindi viene aggiornata la variabile booleana found
     */
    var current = root;
    var found = false;
    while (!found) {
        for (var i = 0; i < this.leaves.length; i++) {
            var d = p5.Vector.dist(current.pos, this.leaves[i].pos)
            if (d < max_dist) {
                found = true;
            }
        }
    }

    /*se found e false allora richiama la funzione del branch .next() e prolungo
    il ramo verso la direzione precedente*/
    if (!found) {
        var branch = current.next();
        current = branch;
        this.branches.push(current);
    }

    this.grow = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var record = 100000000;
            for (var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var d = p5.Vector.dist(leaf.pos, branch.pos);
                if (d < min_dist) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                } else if (d > max_dist) {

                } else if (closestBranch == null || d < record) {
                    closestBranch = branch;
                    record = d;
                }
            }

            if (closestBranch != null) {
                var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;
            }
        }

        for (var i = this.leaves.length - 1; i >= 0; i--) {
            if (this.leaves[i].reached) {
                this.leaves.splice(i, 1);
            }
        }

        for (var i = this.branches.length - 1; i >= 0; i--) {
            var branch = this.branches[i];
            if (branch.count > 0) {
                branch.dir.div(branch.count+1);
                this.branches.push(branch.next());
                // var newPos = p5.Vector.add(branch.pos, branch.dir); //X
                // var newBranch = new Branch(branch, newPos, branch.dir.copy());
                // this.branches.push(newBranch);
            }
            branch.reset();
        }
    }
    this.show = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            this.leaves[i].show();
        }

        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }

    }

}
