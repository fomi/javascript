function GamePanel(gameOverModel, victoryModeltory,shipModel,scoreModel,textGameFont,startModel){
    this.x = 300;
    this.y = 200;
    this.gameOverModel = gameOverModel;
    this.victoryModeltory = victoryModeltory;
    this.shipModel = shipModel;
    this.scoreModel = scoreModel;
    this.textGameFont = textGameFont;
    this.startModel = startModel;
    this.dataRankFlag =1;                             //flag per caricamento del rank da file, per eseguire un solo caricamento
    this.dataRank;

    this.firstStartPanel = function(){                //pannello inizio GAMESTATUS 0
        image(this.startModel[0],width/2-431/2,height/2-50/2);     //431x125p
        image(this.startModel[1],150,70);   //centro nave madre
        image(this.startModel[1],30,30);    //alta
        image(this.startModel[1],80,130);   //bassa
        image(this.startModel[2],250,150);  //alta caccia TIE
        image(this.startModel[2],230,50);   //bassa
        image(this.startModel[2],100,100);   //centrale
        image(this.startModel[3],30,130);   //basso
        image(this.startModel[3],140,30);   //alto
        image(this.startModel[4],490,45);   //alto
        image(this.startModel[4],450,90);   //centrale
        image(this.startModel[4],490,135);  //basso
        this.credits();
        this.pressEnter('Press ENTER');
    }
    this.pressEnter = function(_text){                //funzione press enter
      textSize(31);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text(_text,300,450);
    }
    this.credits = function(){                        //etichetta dei crediti
      textSize(20);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text('by FOMI',550,490);
    }
    this.startPanel = function(){                     //pannello inizio successivo al primo GAMESTATUS 5
        image(this.startModel[0],width/2-431/2,height/2-50/2);     //431x125p
        image(this.startModel[1],150,70);   //centro nave madre
        image(this.startModel[1],30,30);    //alta
        image(this.startModel[1],80,130);   //bassa
        image(this.startModel[2],250,150);  //alta caccia TIE
        image(this.startModel[2],230,50);   //bassa
        image(this.startModel[2],100,100);   //centrale
        image(this.startModel[3],30,130);   //basso
        image(this.startModel[3],140,30);   //alto
        image(this.startModel[4],490,45);   //alto
        image(this.startModel[4],450,90);   //centrale
        image(this.startModel[4],490,135);  //basso
        this.credits();
        this.startLabel();
    }
    this.startLabel = function(){                     //etichetta di this.startPanel()
      textSize(25);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text('Press ENTER for play',300,450);
      text('Press c for commands list and insert new name',300,470);
    }
    this.gameCommand = function(string){              //pannello comandi di gioco e inserimento nome
      textFont(this.textGameFont);
      textAlign(LEFT);
      fill(255);
      textSize(40);
      text('Game commands:',150,150);
      textSize(30);
      text('Left arrow --> move left',150,200);
      text('Right arrow --> move right',150,225);
      textSize(40);
      text('Insert your name: ',150,300);
      textSize(30);
      text(string,150,350);
      this.pressEnter('Quit and play press ENTER');
    }
    this.statusRect = function(gameStatus){               //setta il riquadro di fine gioco
      if(gameStatus == 2){   //this.flag == 1
        image(this.gameOverModel,width/2-this.x/2,height/2-this.y/2);
        this.pressEnter('Retry press ENTER');
      }
      if(gameStatus == 3){   //this.flag == 2
        image(this.victoryModeltory,width/2-this.x/2,height/2-this.y/2);
        this.pressEnter('Nice!!! Play again press ENTER');
      }
    }
    this.hitPointsPlayerNameLabel = function(hitPoints,playerName){
      textSize(31);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text(hitPoints,110,39);
      var tmp="Player: "+playerName;
      text(tmp,450,39);
      image(this.scoreModel,15,39-15);    //score model 60x17p
    }       //etichetta nome e punteggio giocatore
    this.shipHpIndicator = function(shipHp){                  //da controllare
      if(shipHp==3){
        image(this.shipModel,15,400);
        image(this.shipModel,15,425);
        image(this.shipModel,15,450);
      }else if(shipHp==2){
        image(this.shipModel,15,425);
        image(this.shipModel,15,450);
      }else{
        image(this.shipModel,15,450);
      }
    }
    this.show = function(hitPoints,shipHp,playerName){       //mostra riquadro e etichetta di fine gioco
      this.hitPointsPlayerNameLabel(hitPoints,playerName);
      this.shipHpIndicator(shipHp);
    }
    this.loadFile = function(){                               //carica file di RANK GAMESTATUS 3
      if(this.dataRankFlag==1){
        this.dataRank=loadJSON('rank.json');
        console.log(this.dataRank);
        this.dataRankFlag=0;
      }
    }
    this.playerRankPanel = function(){                       //pannello di rank GAMESTATUS 7
      textSize(60);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text('PLAYER RANK:',300,100);
      textSize(40);
      textAlign(CENTER);
      for(var i=0;i<7;i++){
        var tmp = (i+1)+ ". " + this.dataRank[i].name + "  " + this.dataRank[i].score ;
        text(tmp,300,150+(i*40));
      }
      textSize(25);
      textAlign(CENTER);
      fill(255);
      text('Press ENTER for play',300,450);
      this.dataRankFlag =1;
    }
}
