var path, mainCyclist, gameOver;
var pathImg, gameOverImg, mainRacerImg1, mainRacerImg2;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

var cycleBell;

var pinkCG, yellowCG, redCG;

var pinkOpponentImg, yellowOpponentImg, redOpponentImg;
var pinkOpponentImg1, yellowOpponentImg1, redOpponentImg1;

var playerP, playerY, playerR;



function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  pinkOpponentImg = loadAnimation("images/opponent1.png", "images/opponent2.png");
  yellowOpponentImg = loadAnimation("images/opponent4.png", "images/opponent5.png");
  redOpponentImg = loadAnimation("images/opponent7.png", "images/opponent8.png");

  pinkOpponentImg1 = loadAnimation("images/opponent3.png");
  yellowOpponentImg1 = loadAnimation("images/opponent6.png");
  redOpponentIm1 = loadAnimation("images/opponent9.png");

  gameOverImg = loadImage("images/gameOver.png");
  
  
}

function setup() {

  createCanvas(1200, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);


  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  

}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {
    distance = distance + Math.round(getFrameRate() / 60);
    path.velocityX = -(5 + 2 * distance / 150);
    mainCyclist.y = World.mouseY;
    mainCyclist.debug = true;
    edges = createEdgeSprites();
    mainCyclist.collide(edges);


    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }



    var randCyclist = Math.round(random(1, 3));
    if (World.frameCount % 150 == 0) {

      if (randCyclist === 1) {
        pinkCyclists();
      } else if (randCyclist === 2) {
        yellowCyclists();
      } else if (randCyclist === 3) {
        redCyclists();
      }
    }
    if (pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      playerP.velocityY = 0;
      playerP.addAnimation("playerPRunning", pinkOpponentImg1);
    }
    if (yellowCG.isTouching(mainCyclist)) {
      gameState = END;
      playerY.velocityY = 0;
      playerY.addAnimation("playerYRunning", yellowOpponentImg1);
    }
    if (redCG.isTouching(mainCyclist)) {
      gameState = END;
      playerR.velocityY = 0;
      playerR.addAnimation("playerRRunning", redOpponentImg1);
    }

  } else if (gameState === END) {

    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning", mainRacerImg2);

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);

    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }

  }

}

function pinkCyclists() {
  playerP = createSprite(1050, Math.round(random(50, 250)), 10, 10);
  playerP.scale = 0.06;
  playerP.addAnimation("playerPRunning", pinkOpponentImg);
  playerP.velocityX = -(2 + 2 * distance / 150);
  playerP.setLifetime = 170;
  playerP.debug = true;
  pinkCG.add(playerP);


}

function yellowCyclists() {
  playerY = createSprite(1050, Math.round(random(50, 250)), 10, 10);
  playerY.scale = 0.06;
  playerY.addAnimation("playerYRunning", yellowOpponentImg);
  playerY.velocityX = -(2 + 2 * distance / 150);
  playerY.setLifetime = 170;
  playerY.debug = true;
  yellowCG.add(playerY);

}

function redCyclists() {
  playerR = createSprite(1050, Math.round(random(50, 250)), 10, 10);
  playerR.scale = 0.06;
  playerR.addAnimation("playerRRunning", redOpponentImg);
  playerR.velocityX = -(2 + 2 * distance / 150);
  playerR.setLifetime = 170;
  playerR.debug = true;
  redCG.add(playerR);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);

  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();

  distance = 0;
}


