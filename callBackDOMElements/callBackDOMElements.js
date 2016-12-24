var par;
var pars;
var canvas;

function setup() {
    canvas = createCanvas(100, 100);

    background(0);


    var div = createElement('div');

    /* .parent() rendo un elemento html creato in javascript figlio di un altro elemento
        creato in html
    */
    canvas.parent('canvasPar');

    for (var i = 0; i < 30; i++) {
        var par = createP('rainbow!');
        par.position(random(4, 370), random(0, 450));
        par.parent('divRandomPar');
    }

    pars = selectAll('p');

    for (var i = 0; i < pars.length; i++) {
        pars[i].mouseOver(highLight);
        pars[i].mouseOut(unHighLight);
    }

}


function highLight() {
    // this.style('padding','16pt');
    this.style('background-color', '#F0F');
}

function unHighLight() {
    // this.style('padding','0pt');
    this.style('background-color', '#FFF');
}
