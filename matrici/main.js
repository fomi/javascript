
var player = [];
var data;

function preload(){
  data = loadJSON("prova.json");
}

function setup(){
  var string = 'giorgio';
  for(var i = 0; i<data.players.length;i++){
    player[i] = data.players[i];
  }
  console.table(player);

  var tmp;

  for(var i = 0; i<7;i++){
    tmp = new Test('gio'+i,i*50);
    player.push(tmp);
  }
  console.table(player);

  var myJSON = JSON.stringify(player);
  // console.log(myJSON);

  // saveJSON(myJSON, '/prova.json');
  // saveJSONObject(myJSON,'data/prova.json');
  save(myJSON,"new.json")
  saveJSONArray(myJSON, "new.json")

  noLoop();
}
function drow(){

}
