  var string;
  var stopInputFlag;
function setup() {
  createCanvas(600, 500);
  stopInputFlag =0;
  string="";
}

function draw(){
  background(0);
  textSize(31);
  fill(255);
  text(string,150,150);


}

function keyPressed(){
  if(stopInputFlag!=1){
    if(keyCode>=48 && keyCode<=90){     //immissione di soli numeri o caratteri
      string+=key;
      console.log("Inserimento ", key);
    }
    if(keyCode == 8){
      string = string.slice(0, -1);
      console.log("Cancella ultimo carettere : ",string);
    }
    if(keyCode==ENTER){
      console.log("inserimento completato");
      console.log("La stringa: ",string);
      stopInputFlag=1;
  }

}
}

function myInputEvent() {
  console.log('you are typing: ', this.value());
}
