var score;
var url = 'http://192.168.1.101/';
var data;

function setup(){
  score = getRndInteger(0,10000);
  createElement('p','Name ').id('pName');
  createElement('input').id('name').parent('#pName');
  createElement('p','Score: ' + score).id('pScore');
  createElement('button','Save').id('saveButton');
  var saveButton;

  var name = 'giorgio';
  var data = new DataOb(name,score);
  console.log(data);
  saveButton = select('#saveButton');
  saveButton.mousePressed(saveData);

}

function saveData(){


  httpPost(url,'json',data,ok(),err());
}

function ok(){
  console.log("FATTO");
}
function err(){
  console.log("ERRORE");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;          //funz generazione numero casuale
}
