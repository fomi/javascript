function GamePanel(gameOverModel, victoryModeltory,shipModel,scoreModel,textGameFont,startModel){
    this.x = 300;
    this.y = 200;
    this.flag = 0;   //0 panel off, 1 game over, 2 victory
    this.gameOverModel = gameOverModel;
    this.victoryModeltory = victoryModeltory;
    this.shipModel = shipModel;
    this.scoreModel = scoreModel;
    this.textGameFont = textGameFont;
    this.startModel = startModel;

    this.firstStartPanel = function(){
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
    this.pressEnter = function(_text){
      textSize(31);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text(_text,300,450);
    }

    this.startPanel = function(){
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
    this.startLabel = function(){
      textSize(25);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text('Press ENTER for play',300,450);
      text('Press c for commands list',300,470);
    }

    this.gameCommand = function(){
      textFont(this.textGameFont);
      textAlign(LEFT);
      fill(255);
      textSize(40);
      text('Game commands:',150,150);
      textSize(30);
      text('Left arrow --> move left',150,200);
      text('Right arrow --> move right',150,225);
      this.pressEnter('Quit and play press ENTER');
    }
    this.credits = function(){
      textSize(20);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text('by FOMI',550,490);
    }

    this.statusRect = function(){     //setta il riquadro di fine gioco
      if(this.flag == 1){
        image(this.gameOverModel,width/2-this.x/2,height/2-this.y/2);
        this.pressEnter('Retry press ENTER');
      }
      if(this.flag == 2){
        image(this.victoryModeltory,width/2-this.x/2,height/2-this.y/2);
        this.pressEnter('Nice!!! Play again press ENTER');
      }
    }
    this.hitPointsLabel = function(hitPoints){
      textSize(31);
      textFont(this.textGameFont);
      textAlign(CENTER);
      fill(255);
      text(hitPoints,110,39);
      image(this.scoreModel,15,39-15);    //score model 60x17p
    }
    this.shipHpIndicator = function(shipHp){        //da controllare
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

    this.show = function(hitPoints,shipHp){       //mostra riquadro e etichetta di fine gioco
      this.hitPointsLabel(hitPoints);
      this.shipHpIndicator(shipHp);
    }

}
