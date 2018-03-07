var data;

function preload(){
  dataJS=loadJSON('rank0.json');
}

function setup(){

  show();
  var rank = [];
  for(var i=0;i<7;i++){
    tmp = dataJS[i];
    rank.push(tmp);
  }

  console.log(rank);

  noLoop();
}

function show(){
  var tmp;
  for(var i=0;i<7;i++){
    tmp = dataJS[i];
    console.log(tmp);
  }

}
