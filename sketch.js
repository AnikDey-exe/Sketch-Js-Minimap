var child, gameState, graphics, img, density,canvas, ammo, ammoCount, shop1, top1, bottom1, left1, right1, child_img, enter_img, startBut_img, missionText_img, shopbut_img, ped1_img, shopText_img,enemyGroup, bulletGroup, mission1, mission2, mission3, mission4, mission5, destinationMarker, van_img, van;

function preload() {
    child_img = loadImage('child1.png');
    shopbut_img = loadImage('shopbutton.png');
    ped1_img = loadImage('ped1.png');
    shopText_img = loadImage('shoptext.png');
    missionText_img = loadImage('missiontext.png');
    startBut_img = loadImage('start.png');
    van_img = loadImage('van.png');
    enter_img = loadImage('enter.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  density = pixelDensity();

  img = createImage(width, height);
  img.loadPixels();
  background(rgb(25,138,59));
  //background(100);
  /*graphics = createGraphics(2000, 2000);
  graphics.background(rgb(25,138,59));

  

  

  minimap = createGraphics(1000,1000);*/

  gameState = "walk";

  enemyGroup = new Group();

  bulletGroup = new Group();

  child = createSprite(windowWidth/2,windowHeight/2,20,20);
  child.shapeColor = "red"; 
  child.addImage(child_img);
  child.scale = 0.3;

  ammoCount = 50;

  shop1 = createSprite(100, 300, 200, 100);
  shop1.shapeColor = "orange";

  shopButton = createSprite(child.x + windowWidth/2-100, child.y + windowHeight/2-100);
  shopButton.addImage(shopbut_img);
  shopButton.scale = 0.5;
  shopButton.visible = false;

  enterButton = createSprite(child.x + windowWidth/2-300, child.y + windowHeight/2-100);;
  enterButton.addImage(enter_img);
  enterButton.scale = 0.5;
  enterButton.visible = false;

  startButton = createSprite(-600, -100);
  startButton.addImage(startBut_img);
  startButton.scale = 0.5;
  startButton.visible = true;

  shopText = createSprite(100,300);
  shopText.addImage(shopText_img);
  shopText.scale = 0.2;

  mission = createSprite(-600, -300);
  mission.addImage(missionText_img);
  mission.scale = 0.7;

  top1 = createSprite(windowWidth/2, -1000, 10000, 100);
  top1.shapeColor = "black";
  
  bottom1 = createSprite(windowWidth/2, 1000, 10000, 100);
  bottom1.shapeColor = "black";
  
  right1 = createSprite(1000, windowHeight/2, 100, 10000);
  right1.shapeColor = "black";
  
  left1 = createSprite(-1000, windowHeight/2, 100, 10000);
  left1.shapeColor = "black";

  shopModal = createSprite(100, 300, 300, 400);
  shopModal.shapeColor = "yellow";
  shopModal.visible = false;
  
  mission1 = false;

  mission2 = false;

  mission3 = false;

  mission4 = false;

  mission5 = false;

  destinationMarker = createSprite(500, 400, 20, 20);
  destinationMarker.shapeColor = "yellow";
  destinationMarker.visible = false;

  van = createSprite(550, 400);
  van.addImage(van_img);
  van.scale = 0.5;
  van.visible = false;

  pointer = createSprite(child.x + windowWidth/2-100,child.y+windowHeight/2-475,10,10);
  pointer.shapeColor = "red";

  factory = createSprite(-700,-650,300,180);
  factory.shapeColor = "brown";

  house = createSprite(570, -300, 200, 400);
  house.shapeColor = "blue";

  //minimap = createGraphics(300,300);
  //loadMap();
}

function spawnEnemyLeft() {
    var enemy;
    if(World.frameCount % 20 == 0) {
        enemy = createSprite(random(-900,900),random(-900,900),10,10); 
        enemy.addImage(ped1_img); 
        enemy.scale = 0.5;
        enemy.velocityX = random(-10,10);
        enemy.velocityY = random(-10,10);
        enemy.lifetime = 500;
        enemy.setCollider("rectangle",25,-25,110,90,0);
        //enemy.debug  = true;
        enemyGroup.add(enemy);
    }
    
}

function loadMap() {
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
        let srcPixel = y * 4 * width * density ** 2 + x * 8 * density;
        let dstPixel = y * 4 * img.width + x * 8;
        for (let channel = 0; channel < 8; channel++) {
            img.pixels[dstPixel + channel] = pixels[srcPixel + channel];
        }
        }
    }
    img.updatePixels();
}

function draw() {
  // loadMap();


    background(rgb(25, 138, 59));
    drawSprites();

    let aspect = width / height;
    image(img, child.x + windowWidth/2-320,child.y+windowHeight/2-550, 300, 300 / aspect, 10, 10, img.width * 10, img.height * 10);
    push();
    noFill();
    strokeWeight(3);
    rect(child.x + windowWidth/2-320,child.y+windowHeight/2-550, 300, 300 / aspect);
    pop();

    child.collide(top1);
    child.collide(bottom1);
    child.collide(left1);
    child.collide(right1);
    child.collide(shop1);

    //mission.debug = true;

    enemyGroup.collide(shop1);
    enemyGroup.collide(top1);
    enemyGroup.collide(bottom1);
    enemyGroup.collide(left1);
    enemyGroup.collide(right1);
    //enemyGroup.collide(bulletGroup);
    //isTouching(bulletGroup,enemyGroup);
   // enemyGroup.collide(child);

    van.collide(factory);
    child.collide(factory);

    van.collide(house);
    child.collide(house);

    if (bulletGroup.overlap(enemyGroup)) {
        //enemyGroup.setLifetimeEach(0);
        //    enemy.lifetime = 0;
        for (i = 0; i < enemyGroup.length; i++) {
            if (enemyGroup[i] && bulletGroup.overlap(enemyGroup[i])) {
                enemyGroup[i].destroy();
            }
        }
    }

    if(isTouching(bulletGroup, enemyGroup)) {
        enemyGroup.destroyEach();
        console.log("true")
    }

    

    if(isTouching(child, enemyGroup)) {
        enemyGroup.destroyEach();
        console.log("true")
    }

    if(isTouching(enemyGroup, child)) {
        console.log("True");
    }

    if(isTouching(enemyGroup, bottom1)) {
        enemyGroup.destroyEach();
    }

    if(gameState === "walk") {
      // background(rgb(25, 138, 59));
        let childPointer = map(10,0,100,0,width);
        

        /*graphics.ellipse(mouseX, mouseY, 50, 50);
       
        

        image(graphics, 200, 200, width, height, 0, 0, graphics.width, graphics.height);

        // Draw picture in picture
        let aspect = width / height;
        image(graphics, child.x + windowWidth/2-250,child.y+windowHeight/2-550, 200, 200 / aspect, 0, 0, graphics.width, graphics.height);
       image(child, child.x + windowWidth/2-250,child.y+windowHeight/2-550, 200, 200 / aspect, 0, 0, graphics.width, graphics.height);
        push();
        noFill();
        strokeWeight(3);
        rect(child.x + windowWidth/2-250,child.y+windowHeight/2-550, 200, 200 / aspect);
        pop();*/

        /*let minimapWidth = 100;
  let minimapHeight = 100;
  copy(0, 0, width, height, 
       width-minimapWidth, 
       height-minimapHeight, 
       minimapWidth, minimapHeight
      );
      rect(0, 0, 150, 100);*/
                    

        fill("white");
        textSize(30);
        text(ammoCount + " | ∞" ,child.x + windowWidth/2-100, child.y + windowHeight/2-30);

        shopButton.x = child.x + windowWidth/2-110;
        shopButton.y = child.y + windowHeight/2-140;

        shopModal.visible = false;
  
        spawnEnemyLeft();

        if(isTouching(child,shop1)) {
            shopButton.visible = true;
            if(mousePressedOver(shopButton)) {
                gameState = "shop";
            }
        }
        else {
            shopButton.visible = false;
        }

        if(keyDown("w")){
            child.y = child.y - 10;
            child.rotation = 360;
        }
        
        if(keyDown("s")){
            child.y = child.y + 10;
            child.rotation = 180;
        }
        
        if(keyDown("a")){
            child.x = child.x - 10;
            child.rotation = 270;
        }
        
        if(keyDown("d")){
            child.x = child.x + 10;
            child.rotation = 90;
        }
        
        if(keyDown("f")){
            if(ammoCount > 0){
            shoot();
            }
            
        }
        else if(mouseIsPressed){
            if(mouseButton === LEFT) {
                if(ammoCount > 0) {
                    shoot();
                }
            }
        }

        if(keyDown("r")) {
            ammoCount = 50;
        }

        camera.x = child.x;
        camera.y = child.y;

        if(isTouching(child, mission) && mission1 === false && mission2 === false && mission3 === false && mission4 === false && mission5 === false) {
            
            if(mousePressedOver(startButton)){
                gameState = "mission1Start";
            }
        }
        //fill(25, 138, 59);
        //ellipse(child.x + windowWidth/2-100,child.y+windowHeight/2-475,150,150);
        //minimap.background(rgb(25, 138, 59));
       // minimap.ellipse(child.x + windowWidth/2-100,child.y+windowHeight/2-475, 150, 150);
        //image(minimap, child.x + windowWidth/2-100,child.y+windowHeight/2-475, 150, 150);
       // image(minimap, 0, 0, 100, 100);
       pointer.x = child.x + windowWidth/2-100;
       pointer.y = child.y+windowHeight/2-475;
    }
    else if(gameState === "shop") {
        //background(rgb(25, 138, 59, 0.1));
        //background("green");

        fill("white");
        textSize(30);
        text(ammoCount + " | ∞" ,child.x + windowWidth/2-100, child.y + windowHeight/2-30);

        shopButton.visible = false;

        camera.x = child.x;
        camera.y = child.y;

        shopModal.x = child.x;
        shopModal.y = child.y;

        shopModal.visible = true;

        if(keyDown("l")) {
            gameState = "walk";
        }

    }
    else if(gameState === "mission1Start") {
       // background(rgb(25, 138, 59));
        destinationMarker.visible = true;
        van.visible = true;
        mission.visible = false;
        startButton.visible = false;
        line(child.x, child.y, destinationMarker.x, destinationMarker.y);
        fill("white");
        //textAlign(CENTER);
        textSize(30);
        text("Get In The Van", child.x + windowWidth/2 - 350, child.y + windowHeight/2 - 20);

        enterButton.x = child.x + windowWidth/2-110;
        enterButton.y = child.y + windowHeight/2-140;

        if(isTouching(child, destinationMarker) || isTouching(child, van)) {
            enterButton.visible = true;
            if(mousePressedOver(enterButton)) {
                gameState = "mission1DriveToFactory";
            }
        }
        else {
            enterButton.visible = false;
        }

        if(keyDown("w")){
            child.y = child.y - 10;
            child.rotation = 360;
        }
        
        if(keyDown("s")){
            child.y = child.y + 10;
            child.rotation = 180;
        }
        
        if(keyDown("a")){
            child.x = child.x - 10;
            child.rotation = 270;
        }
        
        if(keyDown("d")){
            child.x = child.x + 10;
            child.rotation = 90;
        }
        
        if(keyDown("f")){
            if(ammoCount > 0){
            shoot();
            }
            
        }

        if(keyDown("r")) {
            ammoCount = 50;
        }

        camera.x = child.x;
        camera.y = child.y;

        fill("white");
        textSize(30);
        text(ammoCount + " | ∞" ,child.x + windowWidth/2-100, child.y + windowHeight/2-30);

        shopButton.x = child.x + windowWidth/2-110;
        shopButton.y = child.y + windowHeight/2-140;

        shopModal.visible = false;
  
        spawnEnemyLeft();
    }
    else if(gameState === "mission1DriveToFactory") {
        //background(rgb(25, 138, 59));

        mission.visible = false;
        startButton.visible = false;

        destinationMarker.visible = true;
        van.visible = true;
        destinationMarker.x = -700;
        destinationMarker.y = -450;
        line(van.x, van.y, destinationMarker.x, destinationMarker.y);
        fill("white");
        //textAlign(CENTER);
        textSize(30);
        text("Pick Up The Goods From The Factory", van.x + windowWidth/2 - 500, van.y + windowHeight/2 - 20);

        enterButton.visible = false;

        camera.x = van.x;
        camera.y = van.y;
        child.visible = false;
        child.x = van.x;
        child.y = van.y

        if(keyDown("w")){
            van.y = van.y - 17.5;
            van.rotation = 360;
        }

        if(keyWentDown("w") && keyWentDown("d")) {
            van.x = van.x + 8.75;
            van.y = van.y - 8.75;
            van.rotation = 360/8;
        }
        
        if(keyDown("s")){
            van.y = van.y + 17.5;
            van.rotation = 180;
        }
        
        if(keyDown("a")){
            van.x = van.x - 17.5;
            van.rotation = 270;
        }
        
        if(keyDown("d")){
            van.x = van.x + 17.5;
            van.rotation = 90;
        }

        if(isTouching(van,destinationMarker)) {
            gameState = "mission1Deliver";
        }
    }
    else if(gameState === "mission1Deliver") {
        //background(rgb(25, 138, 59));

        mission.visible = false;
        startButton.visible = false;

        destinationMarker.visible = true;
        van.visible = true;
        destinationMarker.x = 400;
        destinationMarker.y = -300;
        line(van.x, van.y, destinationMarker.x, destinationMarker.y);
        fill("white");
        //textAlign(CENTER);
        textSize(30);
        text("Deliver The Fresh Produce To The Buyer", van.x + windowWidth/2 - 600, van.y + windowHeight/2 - 20);

        enterButton.visible = false;

        camera.x = van.x;
        camera.y = van.y;
        child.visible = false;
        child.x = van.x;
        child.y = van.y

        if(keyDown("w")){
            van.y = van.y - 17.5;
            van.rotation = 360;
        }

        if(keyWentDown("w") && keyWentDown("d")) {
            van.x = van.x + 8.75;
            van.y = van.y - 8.75;
            van.rotation = 360/8;
        }
        
        if(keyDown("s")){
            van.y = van.y + 17.5;
            van.rotation = 180;
        }
        
        if(keyDown("a")){
            van.x = van.x - 17.5;
            van.rotation = 270;
        }
        
        if(keyDown("d")){
            van.x = van.x + 17.5;
            van.rotation = 90;
        }

        if(isTouching(van,destinationMarker)) {
            gameState = "mission1Eliminate";
        }

    }
    else if(gameState = "mission1Eliminate") {
        mission.visible = false;
        startButton.visible = false;

        destinationMarker.visible = false;
        van.visible = false;
        destinationMarker.x = 400;
        destinationMarker.y = -300;
        fill("white");
        //textAlign(CENTER);
        textSize(30);
        text("Eliminate The Sourcing Campers", child.x + windowWidth/2 - 700, child.y + windowHeight/2 - 20);

        enterButton.visible = false;

        camera.x = child.x;
        camera.y = child.y;
        child.visible = true;

        if(keyDown("w")){
            child.y = child.y - 10;
            child.rotation = 360;
        }
        
        if(keyDown("s")){
            child.y = child.y + 10;
            child.rotation = 180;
        }
        
        if(keyDown("a")){
            child.x = child.x - 10;
            child.rotation = 270;
        }
        
        if(keyDown("d")){
            child.x = child.x + 10;
            child.rotation = 90;
        }
        
        if(keyDown("f")){
            if(ammoCount > 0){
            shoot();
            }
            
        }

        if(keyDown("r")) {
            ammoCount = 50;
        }

        
        fill("white");
        textSize(30);
        text(ammoCount + " | ∞" ,child.x + windowWidth/2-100, child.y + windowHeight/2-30);

    }
}

function shoot() {
  var ammo = createSprite(child.x, child.y, 10,10);
  ammo.lifetime = 100;
  if(child.rotation === 360 || keyDown("w")) {
      ammo.velocityY = -20;
  }
  else if(child.rotation === 90) {
      ammo.velocityX = 20;
  }
  else if(child.rotation === 180) {
    ammo.velocityY = 20;
  }
  else if(child.rotation === 270) {
        ammo.velocityX = -20;
  }

  ammo.shapeColor = "yellow";
  ammoCount = ammoCount - 1;

  bulletGroup.add(ammo);
}

function isTouching(object1,object2)
{
  if(object1.x - object2.x < object2.width/2 + object1.width/2 &&
    object2.x - object1.x < object2.width/2 + object1.width/2 &&
    object1.y - object2.y < object2.height/2 + object1.height/2 &&
    object2.y - object1.y < object2.height/2 + object1.height/2)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function bounceOff(object1,object2)
{
  if(object1.x - object2.x < object2.width/2 + object1.width/2 &&
    object2.x - object1.x < object2.width/2 + object1.width/2)
  {
    object1.velocityX = object1.velocityX * (-1);
    object2.velocityX = object2.velocityX * (-1);
  }

  if(object1.y - object2.y < object2.height/2 + object1.height/2 &&
    object2.y - object1.y < fixedRect.height/2 + object1.height/2)  
  {
    object1.velocityY = object1.velocityY * (-1);
    object2.velocityY = object2.velocityY * (-1);
  }

  if(object1.isTouching(topEdge)) 
  {
    object1.velocityY = 5;
  } 

  if(object1.isTouching(bottomEdge)) 
  {
    object1.velocityY = -5;
  }

  if(object2.isTouching(topEdge)) 
  {
    object2.velocityY = 5;
  } 

  if(object2.isTouching(bottomEdge))
  {
    object2.velocityY = -5;
  }
}

/*function save() {
    var save = {
        child: child,
        mission1: mission1
    }

    localStorage.setItem("save", JSON.stringify(save));
}

function load() {

    var savegame = JSON.parse(localStorage.getItem("save"));
     
  
    if (savegame != null && savegame != undefined){
    clearInterval(basicint);
    child = savegame.child;
    mission1 = savegame.mission1;
  
  }
  
  
  }
  
  setInterval(save, 10000);
  
  window.onload = function() {
    load();
    }*/