var ship;                 //navicella giocatore
var gamePanel;            //pannello di vittoria/sconfitta
var gamePoints;           // punti giocatore
var lasers = [];          //array laser della navicella
var alienLasers = [];     //array laser degli alieni
var aliensFleet = [];     //flotta alieni
var direction;            //direzione movimento alieni +1dx -1sx

var laserShotTimer;       //timer per sparare laser dalla nave de giocatore

var moveAlienFlag;        //se 1 la flotta aliena viene shiftata verso il basso
var aliensFleetRow;       //numero di righe di alieni nella flotta
var aliensPerRow;         //numero di alieni per riga
var distBetwRow;          //distanza alieni fra le righe in pixel
var alienDestCounter;     //numero di navicelle aliene colpite
var speedFlag;            //var condizione aumento velocità alieni

var rand;                 //variabile random per generazione laser alieni
var shipHP;               //punti vita della navicella
var lasersCrashFlag;      //per lo scontro fra laser, se 1 lo scontro è avvenuto e vengono eliminati i lasers dagli array

var motherShips = [];      //array delle navicelle madri aliene
var moShipFlag;            //variabile di condizione generazione navi madri

var backgImage;            //immagine di background
var alienModel0;          //modello alieni
var alienModel1;          //modello alieni
var alienModel2;          //modello nave madre
var shipModel;            //modello nave giocatore
var shipHPModel;          //modello navicella per vita nave giocatore
var scoreModel;           //scritta score punteggio
var expModel = [];        //array con modelli esplosioni
var gamePanGOModel;       //modello pannello game over
var gamePanViModel;       //modello pannello vittoria

var gameStartModel = [];  //array contenente tutti i modelli della schermata iniziale
var gameStatus;
/*   GameStatus:
0 primo avvio
1 gioco
2 game over
3 vittoria
4 restart del gioco
5 restart successivo al primo
6 legenda comandi    */

var explosion = [];       //array delle esplosioni nave/laser laser/laser
var hitShipFlag;          //flag se la nave viene colpita   //OK

var textGameFont;         //font per punteggio a 8 bit
/////
var stopInputFlag;        //flag per immissione del nome giocatore
var nameString;           //stringa contenente il nome giocatore
var player;
var sendFlag;
/////

function preload(){
    loadModTextFont();
}

function setup() {
    nameString="";          //nome giocatore non nel gameSetup() perchè non deve essere cancellato
    player = new Player();
    sendFlag = 1;
    gameSetup();            //setup variabili del gioco
}

function draw() {
    background(backgImage);
    switch(gameStatus){
      case 0:   //SCHERMATA DI INIZIO
        gamePanel.firstStartPanel();
        console.log('press enter');
        noLoop();
        break;

      case 1:   //GIOCO
        autoFire();                 //fuoco automatico della nave
        alienLasersShot();          //colpi delle navi aliene
        shipLaserShot();            //colpi della navicella
        gameConditionStats();       //condizioni di vittoria/sconfitta
        moveAliensY();              //movimento verticale alieni
        moveAliensX();              //movimento orizzontale alieni
        gameCommand();              //comandi di gioco
        lasersCrashs();             //scontro fra laser
        getMotShip();               //creazione delle navi madri bonus
        aliSpeedIncr();             //incremento della velocità degli alieni in base a quelli colpiti
        ship.show();                //visualizzazione della navicella
        showExplosions();           //visualizza e elimina le esplosioni
        break;

      case 2:   //GAME OVER
        deleteAll();
        gamePanel.statusRect(gameStatus);
        gamePanel.show(gamePoints,ship.hp,nameString);
        noLoop();
        break;

      case 3:   //VITTORIA
        deleteAll();
        player.name=nameString;                            //assegnazione nome preso in input e punteggio giocatore
        player.score=gamePoints;
        sendPlayerStatToServer(player);                     //funzione invio file a php
        gamePanel.statusRect(gameStatus);                   //settaggio del riquadro di vittoria
        gamePanel.show(gamePoints,ship.hp,nameString);      //mostra pannello info
        gamePanel.loadFile();                              //caricamento del rank
        noLoop();
        break;

      case 4:   //RESTART DEI DATI DI GIOCO
        gameSetup();
        gameStatus=5;
        break;

      case 5:   //RIAVVIO SUCCESSIVO AL PRIMO
        gamePanel.startPanel();
        noLoop();
        break;

      case 6:   //LEGENDA COMANDI INSERIMENTO NOME
        stopInputFlag =0;   //disattivazione del flag di stop dell'input
        sendFlag=1;         //attivazione del flag di invio dei dati del giocatore
        gamePanel.gameCommand(nameString);
        break;

      case 7:   //RANK
        gamePanel.playerRankPanel();          //mostra pannello di rank dei giocatori
        noLoop();
        break;
    }
}

function sendPlayerStatToServer(player){
  if(sendFlag==1){
    var myjson = JSON.stringify(player);
    console.log(myjson);
    request= new XMLHttpRequest();
    request.onreadystatechange = alertContents;
    request.open("POST", "playerScore.php", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(myjson);
    sendFlag=0;
  }
}
function alertContents() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
            alert(request.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
function loadModTextFont(){
  backgImage = loadImage('images/backg.png');               //immagine di background
  alienModel0 = loadImage('models/alien0_white.png');       //modello nave aliena
  alienModel1 = loadImage('models/alien1_white.png');       //modello nave aliena
  alienModel2 = loadImage('models/alien2_white_big.png');   //modello nave aliena
  shipModel = loadImage('models/ship.png');                 //modello nave giocatore
  gamePanGOModel = loadImage('images/gameOver.png');        //modello pannello game over
  gamePanViModel = loadImage('images/victory.png');         //modello pannello vittoria
  shipHPModel = loadImage('models/ship_hp.png');            //modello navicella per vita nave giocatore
  scoreModel = loadImage('images/score.png');               //scritta score punteggio
  textGameFont = loadFont('assets/font.ttf');               //font per punteggio a 8 bit

  gameStartModel[0]= loadImage('images/gameTitle.png');     //modelli schermata iniziale
  gameStartModel[1]= loadImage('models/alien2_white_bigger.png');
  gameStartModel[2]= loadImage('models/alien1_big.png');
  gameStartModel[3]= loadImage('models/alien0_big.png');
  gameStartModel[4]= loadImage('models/ship_start.png');

  var tmp;                          //caricamento dei modelli delle esplosioni
  for(var i = 0; i<7; i++){
    tmp = 'models/boom'+i+'.png';
    expModel[i] = loadImage(tmp);
  }
}
function autoFire(){
  if(laserShotTimer == 0){
    laserShotTimer = 1;
    var laser = new Laser(ship.x, ship.y);
    lasers.push(laser);
    setTimeout(changeLaserShotTimer,300);
  }
}
function gameSetup(){
  createCanvas(600, 500);     //creazione campo di gioco

  ship = new Ship();          //oggetto nave giocatore
  gamePanel = new GamePanel(gamePanGOModel, gamePanViModel,shipHPModel,scoreModel,textGameFont,gameStartModel);//oggetto pannello di gioco

  gamePoints=0;               //punti di gioco DEFAULT 0
  shipHP = 3;                 //vite della navicella DEFAULT 3
  ship.hp = shipHP;           //assegnazione punti vita all'oggetto ship
  ship.model = shipModel;     //assegnazione modello nave giocatore

  lasersCrashFlag = 0;        //variabile per lo scontro fra laser DEFAULT 0

  aliensFleetRow = 8;         //numero di righe di alieni nella flotta DEFAULT 8
  aliensPerRow = 10;           //numero di alieni per riga DEFAULT 10
  moveAlienFlag = 0;          //se 1 gli alieni vengono shiftati verso il basso DEFAULT 0
  direction = 1;              //direzione spostamento aliens DEFAULT 1
  distBetwRow = 20;           //distanza alieni fra le righe in pixel DEFAULT 20
  alienDestCounter = 0;       //numero di navicelle aliene colpite DEFAULT 0
  speedFlag = 0;              //var condizione aumento velocità alieni DEFAULT 0

  moShipFlag = 0;             //variabile di condizione generazione navi madri DEFAULT 0
  hitShipFlag = 0;            //flag se la nave viene colpita DEFAULT 0,1 colpita

  gameStatus=0;               //flag di gioco, per passare da status a status DEFAULT 0
  laserShotTimer = 0;         //timer per sparare laser dalla nave de giocatore DEFAULT 0
  stopInputFlag =1;           //flag di stop per immissione del nome giocatore, DEFAULT 1
  //nameString="";              //stringa che conterrà il nome del giocatore DEFAULT ""

  for(var i=0;i<aliensFleetRow;i++){
      aliensFleet[i] = [];    //creazione di array nested
    for(var j=0;j<aliensPerRow;j++){              //creazione flotta e assegnazione punti gioco
      aliensFleet[i][j] = new Alien((((300 / aliensPerRow) * j) + 10 + 100), (distBetwRow*(i+1))+40);
      aliensFleet[i][j].points = (80)-(i*10);

      if(i==0 || i==1 || i==4 || i==5){           //assegnazione dei modelli agli alieni in base alla riga
        aliensFleet[i][j].model = alienModel0;
      }
      if(i==2 || i==3 || i==6 || i==7){
        aliensFleet[i][j].model = alienModel1;
      }
    }
  }
}
function gameCommand(){
  if(keyIsDown(LEFT_ARROW)){          //comdando movimento sx
    ship.move(-1);
  }
  if(keyIsDown(RIGHT_ARROW)){         //comdando movimento sx
    ship.move(1);
  }
}
function changeLaserShotTimer(){
  laserShotTimer = 0;
}
function keyPressed() {
    //cattura input per nome del giocatore e lo aggiunge alla stringa nome,
    if(stopInputFlag!=1 && gameStatus!=1){
        if(keyCode>=48 && keyCode<=90 && nameString.length<10){     //immissione di soli numeri o caratteri non superando i 10 caratteri
          nameString=nameString+key;
        }
        if(keyCode == 8){                 //attivazione tasto di BACKSPACE se si è sbagliato il nome
          nameString=nameString.slice(0, -1);
        }
    }



    if(keyCode == ENTER){
        if(gameStatus==5 || gameStatus == 6){     //dalla legenda o da un avvio successivo al primo al gioco
          gameStatus = 1;
        }
        if(gameStatus==2 || gameStatus ==7){       //dalla gameover/rank ad un reavvio successivo al primo
          gameStatus = 4;
        }
        if(gameStatus==3){                        //schermata di classifica
          gameStatus = 7;
        }
        if(gameStatus==0){                        //dal primo avvio alla legenda dei comandi
          gameStatus = 6;
        }
        loop();
    }

    if(keyCode == 67){                            //67 è il tasto c, da un avvio successivo al primo alla legenda dei comandi
      if(gameStatus==5){
        gameStatus=6;
        console.log('cacca');
        nameString="";
      }
      loop();
    }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;          //funz generazione numero casuale
}
function alienLasersShot(){
  for(var i=0;i<aliensFleet.length;i++){
    for(var j=0;j<aliensFleet[i].length;j++){
      if(ship.x>=(aliensFleet[i][j].x)-100 && ship.x<=(aliensFleet[i][j].x)+100){
            rand = getRndInteger(0,1000);
            if(rand == 1){
              var laser = new Laser(aliensFleet[i][j].x, aliensFleet[i][j].y);
              alienLasers.push(laser);
              //scorre gli alieni presenti nella flotta, generato un numero casuale
              //se questo uguale a 1 viene sparato un laser
            }
      }
    }
  }

  //scorre i laser degli alieni al contrario, controllo se la nave giocatore viene colpita
  //eliminazione del laser, decremento vita giocatore e punti
  for (var k = alienLasers.length-1; k >=0 ; k--) {
      alienLasers[k].showGreenLaser();
      alienLasers[k].move(1);
      if(alienLasers[k].hit(ship)){
        gamePoints = gamePoints - 100;
        ship.hp--;
        hitShipFlag = 1;
        gamePauseHitShip(alienLasers[k].x,alienLasers[k].y);
        alienLasers.splice(k,1);

      }
  }
}
function shipLaserShot(){
  for (var k = 0; k < lasers.length; k++) {
      lasers[k].showRedLaser();
      lasers[k].move(-1);
      for(var i=0;i<aliensFleet.length;i++){
          //visualizzazione laser della nave, controllo se hittano un alieno
          for (var j = aliensFleet[i].length-1; j >=0; j--) {     //alieni normali
              if (lasers[k].hit(aliensFleet[i][j])) {
                gamePoints=gamePoints+aliensFleet[i][j].points;         //aggiornamento punti gioco
                getExplosion(lasers[k].x,lasers[k].y);
                aliensFleet[i].splice(j, 1);                            //eliminazione alieno
                alienDestCounter++;                                     //incremento contatore alieni uccisi per generazione navi madri
                if(aliensFleet[i].length == 0){     //molto importante questa condizione elimina la riga se il numero di elementi è zero
                  aliensFleet.splice(i,1);      //da riguardare lo splice sui laser dalla nave possibile ripetizione
                }
              }
          }
      }

      for(var l = motherShips.length-1; l>=0; l--){           //controllo se laser colpisce nave madre
        if (lasers[k].hit(motherShips[l])) {
          gamePoints=gamePoints+motherShips[l].points;        //aggiornamento punti gioco
          getExplosion(lasers[k].x,lasers[k].y);
          motherShips.splice(l, 1);
      }}

  }

  for (var i = lasers.length-1; i >=0; i--) {               //eliminazione dei laser fuori schermo
      lasers[i].life();
      if (lasers[i].toDelete) {
          lasers.splice(i, 1);
      }
  }
}
function moveAliensY(){
  for(var i=0;i<aliensFleet.length;i++){

      if(aliensFleet[i][aliensFleet[i].length-1].x >= 490){
        direction=-1;
        moveAlienFlag = 1;
      }
      if(aliensFleet[i][0].x <= 110  ){
        direction=1;
        moveAlienFlag = 1;
      }

  }

  if(moveAlienFlag == 1){
    for(var l=0;l<aliensFleet.length;l++){
      for(var k=0;k<aliensFleet[l].length;k++){
            aliensFleet[l][k].y = aliensFleet[l][k].y+20;
      }
    }
    moveAlienFlag = 0;
  }
}
function moveAliensX(){
  for(var i=0;i<aliensFleet.length;i++){
    for(var j=0;j<aliensFleet[i].length;j++){
      aliensFleet[i][j].show();
      aliensFleet[i][j].moveAlien(direction);
    }
  }
}
function deleteAll(){
  for (var k = alienLasers.length-1; k >=0 ; k--) {
    alienLasers.splice(k,1);
  }
  for (var k = lasers.length-1; k >=0 ; k--) {
    lasers.splice(k,1);
  }
  for (var k = aliensFleet.length-1; k >=0 ; k--) {
    aliensFleet.splice(k,1);
  }

}
function gameConditionStats(){
  if(aliensFleet.length != 0){
    if(aliensFleet[aliensFleet.length-1][0].y>=450 || ship.hp==0){     //game over se gli aliens arrivano in base o se la vita della nave è zero
        gameStatus = 2;
    }
  }
  if(aliensFleet.length==0){   ///modificato 7/03  && gamePanel.flag==0
      gameStatus = 3;
  }
  gamePanel.show(gamePoints,ship.hp,nameString);
}
function lasersCrashs(){
  //scorrimento dal fondo dei laser alieni e del giocatore, se si incontrano vengono eliminati
  //e visualizzata un'esplosione, inoltre vengono aggiunti due punti
  for(var i=alienLasers.length-1;i>=0;i--){
    for(var j=lasers.length-1;j>=0;j--){
      if( ( (lasers[j].x>=alienLasers[i].x-5)&&(lasers[j].x<=alienLasers[i].x+5) )
          &&
          ( (lasers[j].y>=alienLasers[i].y-5)&&(lasers[j].y<=alienLasers[i].y+5)   )
         ){
        getExplosion(lasers[j].x,lasers[j].y);
        lasers.splice(j,1);
        lasersCrashFlag =1;               //flag che identifica quando avviene una collisione
        gamePoints = gamePoints + 2;
      }
    }

    if(lasersCrashFlag == 1){
      alienLasers.splice(i,1);
      lasersCrashFlag = 0;
    }
  }
}
function getExplosion(laserX,laserY){
  var rand = getRndInteger(0,7);        //viene inizializzata esplosione
  explosion.push(new Explosion(laserX,laserY,expModel[rand],millis()));
}
function showExplosions(){
    for(var i=explosion.length-1;i>=0;i--){
      explosion[i].show();
      if(millis()>explosion[i].spawnTime+1000){
        explosion.splice(i,1);
      }
    }

}
function getMotShip(){

  if(alienDestCounter%10 == 0 && moShipFlag != alienDestCounter && alienDestCounter != 80){
    //genera navi madri ogni volta che vengono distrutti 10 alieni
    //condizione per evitare una generazione infinita di navi madri
    //condizione per evitare la generazione dell'ultima nave
    var mothAlien = new Alien(50,60);
    mothAlien.color = [255,0,0];
    mothAlien.r = 20;
    mothAlien.speed = 0.6;
    mothAlien.points = 500;
    mothAlien.model = alienModel2;

    motherShips.push( mothAlien );

    moShipFlag = alienDestCounter;

  }

  for(var i = motherShips.length -1 ; i>=0; i--){
    motherShips[i].show();
    motherShips[i].moveAlien(1);
    if(motherShips[i].x >= 532){
      motherShips.splice(i,1);
    }
  }
}
function aliSpeedIncr(){
  if(alienDestCounter%10 == 0 && speedFlag != alienDestCounter){
    for(var i = 0; i< aliensFleet.length; i++){
      for(var j=0; j< aliensFleet[i].length;j++){
        aliensFleet[i][j].speed += 0.2;
      }
    }
    speedFlag = alienDestCounter;
  }
}
function gamePauseHitShip(laserX,laserY){
  //se la nave viene colpita si ferma il gioco per 3 secondi e poi riprende
  if(hitShipFlag == 1 && ship.hp!=0){
    hitShipFlag=0;
    var boom = new Explosion(laserX,laserY,expModel[getRndInteger(0,7)],millis());
    boom.show();
    noLoop();
    setTimeout(loop, 3000);
  }else{
    hitShipFlag=0;
    var boom = new Explosion(laserX,laserY,expModel[getRndInteger(0,7)],millis());
    boom.show();
    // noLoop();
  }
}
