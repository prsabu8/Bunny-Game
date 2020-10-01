var bunny, bunny_running, bunny1;
var invisibleGround, bg, ground, house, house_image;

var mom, mom_happy, momImage1, momImage2, momImage3;


var obstaclesGroup, obstacleGroup, obstacle1, obstacle2, obstacle3;


var gameOver, gameOver_image;

var youWin, youWin_image;

var restart, restart_image;

var PLAY = 1, END = 0, HOME = 2;
var gameState = PLAY;


function preload(){
  bunny_running = loadAnimation("bunny1.png","bunny2.png");
  bunny1 = loadAnimation("bunny1.png");
  
  bg = loadImage("bg.jpg");
  house_image = loadImage("home.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");


  momImage1 = loadImage("mom1.png");
  momImage2 = loadImage("mom2.png");
  momImage3 = loadAnimation("mom2.png","mom3.png");

  gameOver_image = loadImage("gameOver.png");
  youWin_image = loadImage("youWin.png");
  restart_image = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  console.log(windowWidth);
  console.log(windowHeight);

  ground = createSprite(1050,350,1600,700);
  ground.addImage(bg);
  //ground.x  = ground.width/2;
  //ground.scale = 0.5;
  ground.velocityX = -2;
  
  bunny = createSprite(100,480,20,50);
  bunny.addAnimation("running", bunny_running);
  bunny.scale = 2;

  mom = createSprite(1020,60,20,50);
  mom.addImage(momImage2);
  mom.scale = 0.5;
  
  mom_happy = createSprite(550,500,20,50);
  mom_happy.addAnimation("happy",momImage3);
  mom_happy.scale = 1;
  mom_happy.visible = false;

  house = createSprite(1000,450,20,50);
  house.addImage(house_image);
  house.scale = 1;
  house.visible = false;

   
  invisibleGround = createSprite(700,480,1400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  obstacleGroup = new Group();
  
  
  gameOver = createSprite(800,250,40,10);
  gameOver.addImage(gameOver_image);
  gameOver.scale = 4;
  gameOver.visible = false;

  youWin = createSprite(800,250,40,10);
  youWin.addImage(youWin_image);
  youWin.scale = 1;
  youWin.visible = false;
  
  restart = createSprite(800,340,40,10);
  restart.addImage(restart_image);
  restart.scale = 0.3;
  restart.visible = false;
}

function draw() {
  background(180);

    if(gameState === PLAY)
    {
    
      if (ground.x < 300)
      {
        ground.x = 1050;
      }
      
      //jump when the space key is pressed
      if(keyDown("space") && bunny.y >=200)
      {
        bunny.velocityY = -12 ;
      }
    
      //add gravity
      bunny.velocityY = bunny.velocityY + 0.8;
         
      //spawn obstacles
      spawnObstacles1();
      spawnObstacles2();
      
      bunny.setCollider("circle", 0, 0, 20);

      //End the game when trex is touching the obstacle
      if(obstaclesGroup.isTouching(bunny) || obstacleGroup.isTouching(bunny))
      {
        mom.addImage(momImage1);
        gameOver.visible = true;   
        gameState = END;
      }

      if (frameCount > 10000) 
      {
        house.visible = true;
        mom_happy.visible = true;
        youWin.visible = true;
        obstaclesGroup.destroyEach();
        obstacleGroup.destroyEach();
        gameState = END;
      }
  }
  
  else if(gameState === END) 
  {
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    bunny.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);   
    
    //change the trex animation
     bunny.addAnimation("collided", bunny1);
     bunny.changeAnimation("collided", bunny1);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);   
  }
  
  if(mousePressedOver(restart)) 
  {
    reset();
  }
  
  bunny.collide(invisibleGround);

  drawSprites();
}

function spawnObstacles1() 
{
  if(frameCount % 200 === 0) 
  {
    var obstacle = createSprite(2000,380,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) 
    {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnObstacles2() 
{
  if(frameCount % 200 === 0) 
  {
    var obstacles = createSprite(2000, 480, 10, 40);
    obstacles.velocityX = -4;
    obstacles.addImage(obstacle3);

    obstacles.scale = 0.5;
    obstacles.lifetime = 500;

    obstacleGroup.add(obstacles);

  }
}

function reset () 
{
  gameState = PLAY;
  
  gameOver.visible = false;
  youWin.visible = false;
  restart.visible = false;
  
  ground.velocityX = -2;
  bunny.velocityY = -12;

  mom.addImage(momImage2);
  
  obstaclesGroup.destroyEach();
  obstacleGroup.destroyEach();
  house.visible = false;
  mom_happy.visible = false;
  
  bunny.changeAnimation("running", bunny_running);
  
}
