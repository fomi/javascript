var bgcolor;
var button;
var txt;

function setup() {
    // createCanvas(400, 400);
    bgcolor = color(10);

    createP("2. Javascript");

    button = createElement('button', 'Change background color');
    button.mousePressed(changeStyle);

    txt = createP('some text');
    txt.mouseOver(changeStyle);
    txt.mouseOut(reverseStyle);
    // txt.style('background-color','green');      //implementazione css in javascript
    // txt.style('color','black');         //se fatto da javascrit va a sovrascrivere quello in html

    /*Modifiche di elementi dichiarati in HTML tramite javascript*/

    var title = select(".titleClass");
    title.style('color','yellow');
    title.style('background','black');
    title.style('width','500px');


    title = select("#titleID2");
    title.style('color','black');
    title.style('background','yellow');
    title.style('width','500px');

    /*selectAll funzione per selezionare tutti gli elementi con un determinato tag html
      ritorna un array di elementi, per modificare questi devo accedervi come per un array
    */
      title = selectAll("li");
      for(var i=0;i<title.length;i++){
        title[i].style('font-size','15px');
      }
}

function changeStyle(){
  txt.style('background-color','green');
  txt.style('color','black');
  txt.style('padding','2px');
}

function reverseStyle(){
  txt.style('background-color','white');
  txt.style('color','black');
  txt.style('padding','0px');
}

function draw() {
    // background(bgcolor);
    // fill(255, 0, 0);
    // ellipse(100, 100, 50, 50);

}
