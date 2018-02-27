var ship;                 //navicella giocatore
var gamePanel;            //pannello di vittoria/sconfitta
var gamePoints;           // punti giocatore
var lasers = [];          //array laser della navicella
var alienLasers = [];     //array laser degli alieni
var aliensFleet = [];     //flotta alieni
var direction;            //direzione movimento alieni +1dx -1sx

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

function preload(){
    loadModTextFont();

    gameStartModel[0]= loadImage('images/gameTitle.png');
    gameStartModel[1]= loadImage('models/alien2_white_bigger.png');
    gameStartModel[2]= loadImage('models/alien1_big.png');
    gameStartModel[3]= loadImage('models/alien0_big.png');
    gameStartModel[4]= loadImage('models/ship_start.png');

}

function setup() {
    gameStatus=0;          //flag di gioco, per passare da status a status DEFAULT 0
    gameSetup();          //setup variabili del gioco
}

function draw() {
    background(backgImage);
    switch(gameStatus){
      case 0:   //schermata di start
        gamePanel.firstStartPanel();
        console.log('press enter');
        noLoop();
        break;

      case 1:   //gioco
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

      case 2:   //game over
        deleteAll();
        gamePanel.flag=1;
        gamePanel.statusRect();
        gamePanel.show(gamePoints,ship.hp);
        noLoop();
        break;

      case 3:   //vittoria
        deleteAll();
        gamePanel.flag=2;
        gamePanel.statusRect();
        gamePanel.show(gamePoints,ship.hp);
        console.log('vittoria');
        gamePanel.flag=1;
        noLoop();
        break;

      case 4:   //restart del gioco
        gameStatus=5;
        gameSetup();
        break;

      case 5:   //schermata di riavvio successivo al primo
        gamePanel.startPanel();
        console.log('riavvio');
        noLoop();
        break;

      case 6:   //legenda comandi
        gamePanel.gameCommand();
        noLoop();
        break;
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

  var tmp;                          //caricamento dei modelli delle esplosioni
  for(var i = 0; i<7; i++){
    tmp = 'models/boom'+i+'.png';
    expModel[i] = loadImage(tmp);
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
  aliensPerRow = 10;          //numero di alieni per riga DEFAULT 10
  moveAlienFlag = 0;          //se 1 gli alieni vengono shiftati verso il basso DEFAULT 0
  direction = 1;              //direzione spostamento aliens DEFAULT 1
  distBetwRow = 20;           //distanza alieni fra le righe in pixel DEFAULT 20
  alienDestCounter = 0;       //numero di navicelle aliene colpite DEFAULT 0
  speedFlag = 0;              //var condizione aumento velocità alieni DEFAULT 0

  moShipFlag = 0;             //variabile di condizione generazione navi madri DEFAULT 0
  hitShipFlag = 0;            //flag se la nave viene colpita DEFAULT 0,1 colpita

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

function keyPressed() {
    if (keyCode == UP_ARROW) {                  //comdando spara laser
        var laser = new Laser(ship.x, ship.y);
        lasers.push(laser);
    }
    if(keyCode == 13){
        if(gameStatus==5 || gameStatus == 6){     //dalla legenda o da un avvio successivo al primo al gioco
          gameStatus = 1;
        }
        if(gameStatus==2 || gameStatus==3){       //dalla vittoria/gameover ad un reavvio successivo al primo
          gameStatus = 4;
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
        // gamePanel.flag=1;
        // aliensFleet.length=0 ;
        // alienLasers.length=0;
        // shipLaserShot.length=0;
        // motherShips.length=0;
        gameStatus = 2;
        // noLoop();
    }
  }

  if(aliensFleet.length==0 && gamePanel.flag==0){
      // gamePanel.flag = 2;
      // aliensFleet.length=0;
      // alienLasers.length=0;
      // shipLaserShot.length=0;
      // motherShips.length=0;
      gameStatus = 3;
      // noLoop();
  }

  gamePanel.show(gamePoints,ship.hp);

}

function lasersCrashs(){
  //scorrimento dal fondo dei laser alieni e del giocatore, se si incontrano vengono eliminati
  //e visualizzata un'esplosione, inoltre vengono aggiunti due punti
  for(var i=alienLasers.length-1;i>=0;i--){
    for(var j=lasers.length-1;j>=0;j--){
      if( ( (lasers[j].x>=alienLasers[i].x-10)&&(lasers[j].x<=alienLasers[i].x+10) )
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
      if(millis()>explosion[i].spawnTime+1500){
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
