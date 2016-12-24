var list = ['black', 'purple', 'white', 'yellow', 'blue'];
var addButton;
var counter = 1;
var boxList;


function setup() {

    addButton = select('#add');

    addButton.mouseClicked(addElement);

    boxList = select('#list');

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
