var bgcolor;
var button;
var slider;
var nameInput;
var nameP;

function setup() {
    canvas = createCanvas(400, 400);
    canvas.mouseOver(overP);
    canvas.mouseOut(outP);
    canvas.mousePressed(changeColor);

    bgcolor = color(10);

    createP('');

    button = createElement('button', 'Change bacground color');
    button.mousePressed(changeColor);

    nameP = createP('Your name!');
    nameP.mouseOver(overP);
    nameP.mouseOut(outP);


    slider = createSlider(10,200,47);
    slider.position(180,480);

    nameInput = createInput('Type your name');
    nameInput.changed(updateText);
    // nameInput.input(updateText);

}

function draw() {
    background(bgcolor);
    fill(255, 0, 0);
    ellipse(200, 200, slider.value(), slider.value());

}

function overP(){
    nameP.html('Mouse is over the paragraf.');
}

function outP() {
    nameP.html('Mouse is out the paragraf.');
}

function changeColor() {
    bgcolor = color(random(0,255));
}

function updateText(){
    nameP.html(nameInput.value());
}
