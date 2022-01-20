function load_images(){
    corona_img = new Image;
    corona_img.src = "Assets/corona.png";
    player_img = new Image;
    player_img.src = "Assets/character.png";
    finish_img = new Image;
    finish_img.src = "Assets/finish.png";
}

function init(){
    canvas = document.getElementById("myCanvas");
    W = 700;
    H = 400;
    canvas.width =  W;
    canvas.height = H;
    cs = 50;
    speed = 30;
    playerDirection = -1; // 1 means right, 0 means left
    gameOver = false;
    gameWon = false;
    
    //pen to draw on object
    pen = canvas.getContext('2d');
    // objects in a game
    player = {
        x : 10,
        y : 300, 
        
        movePlayer : function(){
            if(playerDirection == 1)
                this.x += speed;
            else if(playerDirection == 0)
                this.x -= speed;
//            playerDirection = -1;
            if(this.x <= 0)
                x = 10;
        }
        
    }
    corona1 = {
        x : 100,
        y : 25,
        dir : 1,
        
        c1Update : function(){
            if(this.dir == 1)
                this.y += speed;
            else
                this.y -= speed;
            if(this.y >= 400)
                this.dir = 0;
            if(this.y <= 0)
                this.dir = 1;
            console.log(this.x + " " + this.y );
            
        },
    }
    corona2 = {
        x : 300,
        y : 200,
        dir : 1,
        
        c2Update : function(){
            if(this.dir == 1)
                this.y += speed;
            else
                this.y -= speed;
            if(this.y >= 400)
                this.dir = 0;
            if(this.y <= 0)
                this.dir = 1;
            
            
        },
    }
    corona3 = {
        x : 500,
        y : 350,
        dir : 1,
        
        c3Update : function(){
            if(this.dir == 1)
                this.y += speed;
            else
                this.y -= speed;
            if(this.y >= 400)
                this.dir = 0;
            if(this.y <= 0)
                this.dir = 1;
            
        },
        
    }
    end = {
        x : 650,
        y : 300,
        
        
    }
    function keyPressed(e){
        if(e.key == "ArrowRight")
            playerDirection = 1;
        else if(e.key == "ArrowLeft")
            playerDirection = 0;
    }
    
    document.addEventListener('keydown', keyPressed);
    
}

function draw(){
    pen.clearRect(0, 0, W, H);
    //Player
    pen.drawImage(player_img, player.x, player.y, cs, cs);
    //Corona - Enemy
    pen.drawImage(corona_img, corona1.x , corona1.y, cs, cs);
    pen.drawImage(corona_img, corona2.x , corona2.y, cs, cs);
    pen.drawImage(corona_img, corona3.x , corona3.y, cs, cs);
    //Home - Finish point
    pen.drawImage(finish_img, end.x, end.y, cs, cs);
    
}

function collisionCheck(){
        if(Math.abs(player.x - corona1.x) <= cs && Math.abs(player.y - corona1.y) <= cs)
            gameOver = true;
        if(Math.abs(player.x - corona2.x) <= cs && Math.abs(player.y - corona2.y) <= cs)
            gameOver = true;
        if(Math.abs(player.x - corona3.x) <= cs && Math.abs(player.y - corona3.y) <= cs)
            gameOver = true;
        if(Math.abs(player.x - end.x) <= cs && Math.abs(player.y - end.y) <= cs)
            gameOver = true, gameWon = true;
    }

function update(){
    collisionCheck();
    corona1.c1Update();
    corona2.c2Update();
    corona3.c3Update();
    player.movePlayer();
    
    
}

function gameloop(){
    
    if(gameOver == true){
        clearInterval(g);
        if(gameWon == false)
            alert("Game Over");
        else
            alert("You Won");
    }
    else{
        draw();
        update();
    }
  
}

//-----------------------------

init();
var g = setInterval(gameloop, 100);
load_images();