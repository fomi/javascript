var dropZone;

function setup() {
    var c = createCanvas(500, 500).id("canvas");
    c.drop(gotFileCanvas);
    c.style("border-style", "dashed");

    var p = createP(" ").id("paragrafo");
    p.style("border-style", "dashed");
    p.style("width", "50%");
    p.style("padding", "16px");

    dropZone = select('#dropZone')
    dropZone.dragOver(highLight);
    dropZone.dragLeave(unHighLight);
    dropZone.drop(gotFile, unHighLight);
}

function highLight() {
    dropZone.style('background-color', 'gray');
}

function unHighLight() {
    dropZone.style('background-color', 'white');
}


function gotFile(file) {
    /* inserisce un'immagine droppata nella pagina */
    var tmp = file.type;
    if (tmp == "image") {
        var img = createImg(file.data);
        img.parent('paragrafo');
    } else {
        console.log("Not a image.");
    }
}

function gotFileCanvas(file) {
    /* disegna l'immagine droppata nel canvas */
    var tmp = file.type;
    if (tmp == "image") {
        var img = createImg(file.data).hide();
        image(img, 0, 0, width, height);
        img.remove();  
    } else {
        console.log("Not a image.");
    }
}
