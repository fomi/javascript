var list = ['black', 'purple', 'white', 'yellow', 'blue'];
var addButton;
var counter = 1;
var boxList;
var divListLink;
var clearImagesBut;
var clearImagesBut2;

var images = [];    //array a cui vengono aggiunte le immagini

function setup() {
    addButton = select('#add');
    addButton.mouseClicked(addElement);

    boxList = select('#list');
    divListLink = createDiv('List of paragraphs (of anchors and images)');
    divListLink.position(490, 50);

    clearImagesBut = select('#clearImages');
    clearImagesBut.parent(divListLink);
    clearImagesBut.mouseClicked(removeImages);

    clearImagesBut2 = select('#clearImages2');
    clearImagesBut2.parent(divListLink);
    clearImagesBut2.mouseClicked(removeImages2);

    for (var i = 0; i < 5; i++) {
        var p = createP('This is a link: ');
        p.style('background-color', 'gray');
        p.style('padding', '23px');
        p.parent(divListLink);

        var a = createA('#', 'orange');
        a.mousePressed(addPhoto);
        a.parent(p);
    }
}

function removeImages2() {
  /* rimuove i tag <img> dall'array images che è composto da tutti i tag che si
  creano cliccando sul link*/
    for(var i=0;i<images.length;i++){
      images[i].remove();
    }
}

function removeImages() {
  /* rimuove i tag <img> selezionandoli globalmente con selectAll()*/
    var tmp = selectAll('img');
    for(var i=0;i<tmp.length;i++){
      tmp[i].remove();
    }
}

function addPhoto() {
    var img = createImg('orange.png');
    img.size(100, 100);
    images.push(img);

    /* con this.parent chiedo a chi evoca la funzione chi è il suo parents in
    questo caso un anchor evoca addPhoto e la variabile paragraph diventa il
    paragrafo padre dell'anchor, poi con img.parent(paragraph) assegno
    l'immagine al paragrafo della anchor */

    var paragraph = this.parent();
    img.parent(paragraph);
}

function addElement() {

    var listTmp = floor(random(0, list.length))
    var tmp = createElement('li', 'Element --> ' + counter + ' ' + list[listTmp]);


    switch (list[listTmp]) {
        case 'black':
            tmp.style('background-color', 'black');
            tmp.style('color', 'white');
            break;
        case 'purple':
            tmp.style('background-color', 'purple');
            tmp.style('color', 'black');
            break;
        case 'white':
            tmp.style('background-color', 'white');
            tmp.style('color', 'black');
            break;
        case 'yellow':
            tmp.style('background-color', 'yellow');
            tmp.style('color', 'black');
            break;
        case 'blue':
            tmp.style('background-color', 'blue');
            tmp.style('color', 'black');
            break;
    }
    tmp.parent('list');
    counter++;
}
