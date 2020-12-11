var bg, bgimg, bg2, bgimg2;

var harry, harryimg;

var deatheaters, deathimg;

var text1, textimg;

var lightningGroup;

var lightning1, lightning2, lightning3, lightning4;

var lightning5, lightning6;

var lightning;

//var spellimg, spell;

//var spell1img, spell1; 

var fireballimg1;
var fireballimg2;
var fireballimg3;
var fireballimg4;
var fireballimg5;
var fireballanimation;


var gameState = "start";

var scoreHarry = 500;

var scoreDeath = 200;

function preload(){
  bgimg = loadImage("Images/background.jpg");
  
  harryimg = loadImage("Images/harryonbroom.png");
  
  deathimg = loadImage("Images/HarryDeath.png");
  
  textimg = loadImage("Images/Chooseyourplayer.png");
  
  lightning1 = loadImage("Images/Lightning1.png");
  lightning2 = loadImage("Images/Lightning2.png");
  lightning3 = loadAnimation("Images/Lightning3.png", "Images/Lightning4.png");
  lightning4 = loadAnimation("Images/Lightning4.png", "Images/Lightning3.png");
  lightning5 = loadImage("Images/Lightning5.png");
  lightning6 = loadImage("Images/Lightning6.png");

  bgimg2 = loadImage("Images/Burrow.jpg");

  //spellimg = loadImage("Images/Spellbutton.jpg");

  //spell1img = loadImage("Images/Spell1.png");

  fireballimg1 = loadAnimation("Images/Fireball1.png", "Images/Fireball2.png", "Images/Fireball3.png", "Images/Fireball4.png", "Images/Fireball5.png");
}


function setup(){
  createCanvas(displayWidth, 400)
  
  bg = createSprite(displayWidth/2, 200, displayWidth, 400);
  bg.addImage(bgimg);
  bg.x = bg.width/2;
  bg.velocityX = -5;
  bg.scale = 1.8;
  
  harry = createSprite(displayWidth-660, 200, 30, 30);
  harry.addImage(harryimg);
  harry.scale = 0.3;
  
  deatheaters = createSprite(displayWidth-800, 190, 10, 10);
  deatheaters.addImage(deathimg);
  deatheaters.scale = 0.8;
  
  text1 = createSprite(displayWidth-750, 50, 50, 50);
  text1.addImage(textimg);
  text1.scale = 0.1;


  /*spell1 = createSprite(200, 200, 20, 20);
  spell1.addImage(spell1img);
  spell1.scale = 0.4;*/

  lightningGroup = new Group();
}

function draw(){
  background("black");
  drawSprites();
  
  if(mousePressedOver(harry) && gameState === "start"){
    harryPlayer();

    bg.velocityX = 0;

    gameState = "playHarry"
  }

  if(bg.x<200){
    bg.x = bg.width/2;
  } 



  if(gameState === "playHarry"){
    spawnLightning();


    //deatheaters.visible = false;
    bg.depth = deatheaters.depth;
    bg.depth += 5;
    harry.depth = bg.depth + 5

    textSize(20);
    text("Count:" + scoreHarry, camera.position.x-50, 320);

    if(keyIsDown(LEFT_ARROW)){
      harry.x = harry.x-3;
      camera.position.x = harry.x;
    }
    if(keyIsDown(RIGHT_ARROW)){
      harry.x = harry.x+3;
      camera.position.x = harry.x;
    }
    if(keyIsDown(DOWN_ARROW)){
      harry.y = harry.y+3;
    }
    if(keyIsDown(UP_ARROW)){
      harry.y = harry.y-3;
    }

    if(lightningGroup.isTouching(harry)){
      scoreHarry = scoreHarry - 5;
    }

    if(harry.x<0){
      gameState = "level1Harry";
    }
  }

  if(scoreHarry === 0){
    gameState = "loseHarry";
  }

  if(gameState === "loseHarry"){
    bg.visible = false;
    textSize(40)
    text("You lost! Try again!", displayWidth/2, 200);
    deatheaters.visible = false;
    harry.y = 320;
    lightning.visible = false;
  }


    else if(gameState === "level1Harry"){
      harryPlayer();
      deatheaters.x = camera.position.x-300;
      //console.log("deatheaters.x:" + deatheaters.x);
      bg.visible = false;
      bg2 = createSprite((displayWidth/2)-700, 200, displayWidth, 20);
      bg2.addImage(bgimg2);
      console.log(bg2.depth);
      bg2.scale = 1.2;
      harry.depth = bg2.depth;
      harry.depth = harry.depth+5;
      deatheaters.depth = harry.depth;

      firespellbutton = createImg("Images/Fireballbutton.png", "firebutton");
      firespellbutton.position((displayWidth/2)+350, 320)
      firespellbutton.size(60, 60);

      firespellbutton.mousePressed((()=>{
        var firespell = createSprite(harry.x, harry.y, 40, 40);
        firespell.addAnimation("f1", fireballimg1);
        firespell.velocityX = -4;
        firespell.depth = bg2.depth;
        firespell.depth = firespell.depth+100;
      }))



      textSize(20);
      text("Harry Count:" + scoreHarry, camera.position.x-100, 320);

      text("Deatheater Count:" + scoreDeath, camera.position.x-500, 320);



      /*fireballanimation = createSprite(200, 200, 20, 20);
      fireballanimation.addAnimation("fire1", fireballimg1);
      fireballanimation.addAnimation("fire2", fireballimg2);
      fireballanimation.addAnimation("fire3", fireballimg3);
      fireballanimation.addAnimation("fire4", fireballimg4);
      fireballanimation.addAnimation("fire5", fireballimg5);
      fireballanimation.velocityX = 5;*/



      
      /*if(fireballanimation.isTouching(harry)){
        scoreHarry = scoreHarry - 100;
      }*/

      /*if(fireballAnimation.isTouching(deatheaters)){
        scoreDeath = scoreDeath - 100;
      }*/
  
      if(keyIsDown(LEFT_ARROW)){
        harry.x = harry.x-3;
        camera.position.x = harry.x;
      }
  
      if(keyIsDown(RIGHT_ARROW)){
        harry.x = harry.x+3;
        camera.position.x = harry.x;
      }
  
      if(keyIsDown(DOWN_ARROW)){
        harry.y = harry.y+3;
      }
  
      if(keyIsDown(UP_ARROW)){
        harry.y = harry.y-3;
      }

      /*if(harry.x<0){
        gameState = "winHarry";
      }*/
    }

  if(frameCount % 60 === 0){
    deatheaters.y = harry.y;
  }
  /*if(gameState === "winHarry"){
    bg2.visible = false;
    text(30);
    text("You Win!!", displayWidth/2, 200);
  }*/

  /*if(gameState === "winHarry"){
    //bg2.visible = false;
    text(30);
    text("You Win!!", displayWidth/2, 200);
  }*/   
}

  function harryPlayer(){
    text1.visible = false;
    harry.debug=true;
  }



  function spawnLightning(){
    if(frameCount % 50 === 0){
      lightning = createSprite(Math.round(random(10,700)), Math.round(random(10,50)), 40, 40);
      lightning.depth = bg.depth;
      lightning.depth = lightning.depth+10;
        var rand = 
      Math.round(random(1,6));
        switch(rand){
          case 1:
      lightning.addImage(lightning1);
                    break;
          case 2:
      lightning.addImage(lightning2);
                    break;
          case 3:
      lightning.addAnimation("l3", lightning3);
                    break;
          case 4:
      lightning.addAnimation("l4", lightning4);
                    break;
          case 5:
      lightning.addImage(lightning5);
                    break;
          case 6:
      lightning.addImage(lightning6);
                    break;
        }
    lightning.lifetime = 50;
    lightningGroup.add(lightning);
    }
  }