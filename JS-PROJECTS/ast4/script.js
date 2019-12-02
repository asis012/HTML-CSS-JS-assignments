(function() {

    var keyPressed = false;
    var gamePaused = true;
    
    start(false);
    
    function Car(parentElement, backgroundUrl, left, bottom){
        this.parentElement = parentElement;
        
        this.backgroundUrl = backgroundUrl;
        this.WIDTH = 70;
        this.HEIGHT = 90;
        this.leftPosition = left;
        this.bottomPosition = bottom;
        this.laneWidth = 200;
        this.leftLanePosition = 45;
        this.rightLanePosition = 425;
     
        this.init = function(){
            this.create();
        }
    
            //create element(car/obtacles)
            this.create = function(){
            this.element = document.createElement('div');
            this.element.style.background = this.backgroundUrl;
            this.element.style.backgroundSize = 'contain';
            this.element.style.backgroundRepeat = 'no-repeat';
            this.element.style.left = this.leftPosition + 'px';
            this.element.style.width = this.WIDTH + 'px';
            this.element.style.height = this.HEIGHT + 'px';
            this.element.style.position = 'absolute';
            this.draw();
            this.parentElement.appendChild(this.element);
        }
    

    
    
        this.draw = function(){
            this.element.style.bottom = this.bottomPosition + 'px';
        }
    
        //move right        
        this.moveRight = function(){
            if (this.leftPosition < this.rightLanePosition){
    
                keyPressed = true;
    
                var id = setInterval(frame.bind(this), 10);
                
                var nextLeft = this.leftPosition + this.laneWidth;
    
                function frame(){
    
                    if(this.leftPosition >= nextLeft){
                        this.leftPosition = nextLeft ;
                        this.element.style.left = this.leftPosition -20 + 'px';
                        keyPressed = false;
                        clearInterval(id);
                    }
                    else{
                        this.leftPosition += 400; 
                        this.element.style.left = this.leftPosition + 'px';
                    }
                }
            }
        }
    
    
        //move left
        this.moveLeft = function(){
            if (this.leftPosition > this.leftLanePosition){
                keyPressed = true;
                var id = setInterval(frame.bind(this), 10);
                var nextLeft = this.leftPosition - this.laneWidth;
                console.log(nextLeft)
                function frame(){
                    if(this.leftPosition <= nextLeft){
                        this.leftPosition = nextLeft;
                        this.element.style.left = this.leftPosition + 'px';
                        keyPressed = false;
                        clearInterval(id);
                    }
                    else{
                        this.leftPosition -= 450; 
                        this.element.style.left = this.leftPosition + 'px';
                    }
                }
            }
        }
    
            
        this.destroyBugs = function(){
            this.parentElement.removeChild(this.element);
        }
      
       
    }
    
    
    function Game(){
        this.wrapperTop = -600; 
        this.obtacles = 1;
        this.bugs = [];
        this.speed = 10;
        this.carsPassedScore = 0;

        
        this.init = function(){
            this.container = document.getElementById('app')
            this.container.style.height = '660px'
            this.container.style.overflow = 'hidden'
            this.containerWidth = this.containeroffsetWidth;
            this.containerHeight = this.containeroffset;
            this.roadWrapper();
            this.car(true, 245, 50);
            document.onkeydown = this.move.bind(this);
            this.gameId = setInterval(this.moveBackground.bind(this), 10);
    
        }
    
        this.moveBackground = function(){
            if(this.wrapperTop < 0){
                this.wrapperTop += this.speed;
            }
            else{
                this.wrapperTop = -600;
            }
            this.wrapper.style.top = this.wrapperTop + 'px';
    
    
            //check collision
            for(var i = 0; i < this.bugs.length; i++){
    
                
                this.bugs[i].bottomPosition -= this.speed;
                this.bugs[i].draw(); 
    
                
                if (this.player.leftPosition < this.bugs[i].leftPosition + this.bugs[i].WIDTH &&
                    this.player.leftPosition + this.player.WIDTH > this.bugs[i].leftPosition &&
                    this.player.bottomPosition  < this.bugs[i].bottomPosition + this.bugs[i].HEIGHT &&
                    this.player.bottomPosition + this.player.HEIGHT > this.bugs[i].bottomPosition) {
    
                  
                     gamePaused = true;
    
    
                     clearInterval(this.gameId);
    
                     start(true);
                 }
    
                 if(this.bugs[i].bottomPos < -this.bugs[i].HEIGHT){
                    this.bugs[i].destroyBugs();
                    this.bugs.splice(i, 1);
                }
            
            }
    
            //add obtacles
            this.obtacles = (this.obtacles + 1) % 60;
    
            if(this.obtacles == 0){
                var carLeft = leftLane(random());
                this.car(false, carLeft, this.obtaclesBottom = 450);
            }
    
        }
    
        function leftLane(lane){
            var leftPosition;
    
            if(lane == 1){
                leftPosition = 45;
            }
            else if(lane == 2){
                leftPosition = 245;
            }
            else{
                leftPosition = 395;
            }
            return leftPosition;
        }
    
        function random(){
            var lane = Math.round(Math.random() * (3 - 1   ) + 1);
            return lane;
        }
    
        //making div for road
        this.roadWrapper = function(){
            this.wrapper = document.createElement('div');
            this.wrapper.style.position = 'absolute';
            this.wrapper.style.width = this.containerWidth + 'px';
            this.wrapper.style.height =  this.wrapperHeight + 'px';
            this.wrapper.style.top = this.wrapperTop + 'px';
            this.container.appendChild(this.wrapper);


            //adding background image
            var img = document.createElement('img');
            img.style.background="url('road.png')"
            img.style.backgroundRepeat="repeat"
            img.style.width = 540 + 'px';
            img.style.height = 1600 + 'px';    
            this.wrapper.appendChild(img);

        }
    
    
        this.car = function(isplayer, leftPosition, bottomPosition){
            //for player
            if(isplayer){
                this.player = new Car(this.container, 'url(car.png)', leftPosition, bottomPosition);
                this.player.init();
            }
            //for obtacles
            else{
                var obstacle = new Car(this.container, 'url(obstacle.png)', leftPosition, 900);
                obstacle.init();
                this.bugs.push(obstacle);
            }
        }
    
        //move left right when arrow pressed
        this.move = function(){
            var key = event.keyCode;
            switch (key) {
    
                case 37:
                    if(!keyPressed && !gamePaused){
                        this.player.moveLeft();
                    }
                    break;
    
                case 39:
                    if(!keyPressed && !gamePaused){
                        this.player.moveRight();
                    }
                    break;
            }
        }
    
    }
    
    function start(gameOver){
    
        if(!gameOver){
            var firstScreen = document.getElementById('app');
            firstScreen.style.overflow = "hidden"
            var play = document.createElement('button');
            play.innerHTML = 'PLAY Car Game';
            play.style.color="white"
            firstScreen.appendChild(play);
    
            play.onclick = function(e){
                gamePaused = false;
                var game = new Game().init();
            };
        }
        else{
            var firstScreen = document.getElementById('app');
            firstScreen.innerHTML = '';
            var over = document.createElement('div');
            over.innerHTML = 'GAME OVER'
            over.style.color="white"
            over.style.textAlign = 'center';
            firstScreen.appendChild(over);
            var play = document.createElement('button');
            play.innerHTML = 'PLAY AGAIN'
            play.style.color="white"
            firstScreen.appendChild(play);
            play.onclick = function(e){
            gamePaused = false;
    
               
    
                var game = new Game().init();
            };
    
        }
    }
  
  })();
  