var dog, dogImage, happyDogImage;
var  database;
var foodS, foodStock;
var Food;
var FeedTime;
var changeState, readState;
var bedroomImg, gardenImg, washroomImg;
var gameState;
var lastFed;

    function preload()
    {
      dogImage = loadImage("images/dogImg.png");
      happyDogImage = loadImage("images/dogImg1.png");

      bedroomImg = loadImage("images/BedRoom.png");
      gardenImg = loadImage("images/Garden.png");
      washroomImg = loadImage("images/WashRoom.png");
    }

    function setup() 
    {
      createCanvas(800, 600);
      imageMode(CENTER);
      
      database = firebase.database();

      dog = createSprite(700, 250, 100, 100);
      dog.addImage(dogImage);
      dog.scale = 0.3;

      foodObj = new food();

      foodStock = database.ref('Food');
      foodStock.on("value", readStock);
      
      feed = createButton("Feed the dog");
      feed.position(250, 50);
      feed.mousePressed(feedDog);

      addFood = createButton("Add Food");
      addFood.position(350, 50);
      addFood.mousePressed(addFoodS);

      readState = database.ref('gameState');
      readState.on("value", function(data)
      {
        gameState = data.val();
      })
    }

function draw() 
{ 
  background(46, 139, 87);
  imageMode(CENTER);

  foodObj.display();

  currentTime = hour();
  if(currentTime === (lastFed + 1))
  {
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime === (lastFed + 2))
  {
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    update("Bathing");
    foodObj.washroom();
  }
  else
  {
    update("Hungry");
    foodObj.display();
  }


  if(gameState !== "Hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else
  {
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }

  drawSprites();
}

function update(state)
{
  database.ref('/').update(
  {
    gameState: state
  }
  )
}

function readStock(data)
{
  foodS = data.val();
}

function feedDog()
{
  dog.addImage(happyDogImage);

  foodS = foodS - 1
 
  database.ref('/').update({
    foodStock: foodS,
    FeedTime: hour()
  })
}

function addFoodS()
{
  foodS++

  dog.addImage(dogImage);

  database.ref('/').update(
  {
    foodStock: foodS
  });
}