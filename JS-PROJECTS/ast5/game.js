
function Game(){
    this.container;
    this.containerWidth;
    this.containerHeight;
    this.groundHeight = 70;
    this.backgroundWrapper;
    this.backgroundWrapperLeft = 0;
    this.backgroundSpeed = 1;
    
    this.baseWrapperLeft = 0;
    this.baseSpeed = 2;
    this.bird = null;
    
    this.pipeCounter = 1;
    this.pipeCounterLimit = 70;
    this.FPS = 60;
    this.FRAME_INTERVAL = 1000 / this.FPS; 
    this.gamePaused = true;
    this.upperPipes = [];
    this.lowerPipes = [];
    this.score = 0;
    

    
    this.initialStart = true;
    this.highScoreScore = 0;
    var that = this
    this.init = function(){  
        var that  = this


        this.addContainer();
        this.addBackgroundWrapper();
        this.addForegroundWrapper();

        this.firstScreen();
    }

    this.addContainer = function(){
        this.container = document.createElement('div');
        this.container.classList.add('game-container');

        document.body.appendChild(this.container);
        
        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width);
        this.containerHeight = parseInt(containerStyle.height);
    }

    this.firstScreen = function(){
        var logo = document.createElement('div');
        logo.style.position = 'absolute';
        logo.style.background = 'url(images/logo.png)';
        logo.style.backgroundSize = 'cover';
        logo.style.width = '300px';
        logo.style.height = '80px';
        logo.style.left = '95px';
        logo.style.top = '100px';
        this.container.appendChild(logo);

        var bird = new Bird(this.container, 250, 200);
        bird.init();

       

        var play = document.createElement('div');
        play.style.background = 'url(images/play.png)';
        play.style.position = 'absolute';
        play.style.top = '375px';
        play.style.left = '170px';
        play.style.width = '126px';
        play.style.height = '70px';
        play.style.backgroundSize = 'cover';
        this.container.appendChild(play);

        play.onclick = function(e){
            this.container.removeChild(logo);
            this.container.removeChild(bird.bird);
            this.container.removeChild(play);

            this.secondScreen();
        }.bind(this);
    }

    this.secondScreen = function(){      
        this.addScoreElement();

      

        this.createBird();

       

        document.onkeydown = this.keyPressEvents.bind(this);
    }


    this.start = function(){

        this.gamePaused = false;

        this.gameId = setInterval(this.play.bind(this), this.FRAME_INTERVAL);   
    }


    this.play = function(){

       
        if(this.bird.top > this.containerHeight - this.groundHeight - this.bird.HEIGHT){
           
            this.gamePaused = true;
            clearInterval(this.gameId);

            this.container.removeChild(this.Score);
            this.upperPipes = [];
            this.lowerPipes = [];

            if(this.score > this.highScoreScore){
                this.highScoreScore = this.score;
            }
            
            this.gameOver();
        }

        this.bird.dropDown();
        this.getReady
        if(!this.gamePaused){
            this.moveBackground();
            this.movebase();

            
            for(var i = 0; i < this.upperPipes.length; i++){
                
                this.movePipes(i);
                this.checkCollisionPipes(i);
                this.removePipes(i);

                if(this.upperPipes[i].left < (this.bird.left - this.bird.WIDTH / 2) && !this.upperPipes[i].hasPassed){
                    this.upperPipes[i].hasPassed = true;
                    this.score += 1;
                    this.Score.innerHTML = this.score;
                }
            }

            this.addPipes();
        }
    }

    this.gameOver = function(){
        
        var over = document.createElement('div');
        over.style.position = 'absolute';
        over.style.background = 'url(images/logo.png)';
        over.style.backgroundSize = 'cover';
        over.style.width = '300px';
        over.style.height = '65px';
        over.style.left = '125px';
        over.style.top = '100px';
        this.container.appendChild(over);

        var overScore = document.createElement('div');
        overScore.style.position = 'absolute';
        overScore.style.background = 'url(images/score.png)';
        overScore.style.backgroundSize = 'cover';
        overScore.style.width = '172px';
        overScore.style.height = '228px';
        overScore.style.left = '205px';
        overScore.style.top = '210px';
        this.container.appendChild(overScore);


        var score = document.createElement('div');
        score.innerHTML = this.score;
        score.style.position = 'absolute';
        score.style.top = '285px';
        score.style.left = '285px';
        score.style.fontSize = '30px';
        score.height = "200px"
        score.style.color = 'white';
        this.container.appendChild(score);


        var highScore = document.createElement('div');
        highScore.innerHTML = this.highScoreScore;
        highScore.style.position = 'absolute';
        highScore.style.top = '362px';
        highScore.style.left = '285px';
        highScore.style.fontSize = '30px';        
        highScore.style.color = 'white';
        this.container.appendChild(highScore);

        var play = document.createElement('div');
        play.style.background = 'url(images/play.png)';
        play.style.position = 'absolute';
        play.style.top = '450px';
        play.style.left = '220px';
        play.style.width = '126px';
        play.style.height = '70px';
        play.style.backgroundSize = 'cover';
        this.container.appendChild(play);

        play.onclick = function(e){
            this.container.removeChild(over);
            this.container.removeChild(play);
            this.container.removeChild(overScore);
            this.container.removeChild(score);
            this.container.removeChild(highScore);

            this.container.innerHTML = '';
            this.addBackgroundWrapper();
            this.addForegroundWrapper();
            this.secondScreen();
        }.bind(this);
    }

    this.checkCollisionPipes = function(i){
        if ((this.bird.left < this.upperPipes[i].left + this.upperPipes[i].width &&
            this.bird.left + this.bird.WIDTH > this.upperPipes[i].left &&
            this.bird.top < this.upperPipes[i].top + this.upperPipes[i].height &&
            this.bird.top + this.bird.HEIGHT > this.upperPipes[i].top) || 
            (this.bird.left < this.lowerPipes[i].left + this.lowerPipes[i].width &&
            this.bird.left + this.bird.WIDTH > this.lowerPipes[i].left &&
            this.bird.top < this.lowerPipes[i].top + this.lowerPipes[i].height &&
            this.bird.top + this.bird.HEIGHT > this.lowerPipes[i].top)) {

                
                this.gamePaused = true;
         }
    }

    this.movePipes = function(i){
        this.upperPipes[i].left -= this.baseSpeed + 3;
        this.upperPipes[i].draw(); 
        
        this.lowerPipes[i].left -= this.baseSpeed + 3;
        this.lowerPipes[i].draw(); 
    }

    this.removePipes = function(i){
        if(this.upperPipes[i].left <= -this.upperPipes[i].width){
            this.upperPipes[i].destroy();
            this.upperPipes.splice(i, 1);

            this.lowerPipes[i].destroy();
            this.lowerPipes.splice(i, 1);
        }
    }

    this.addPipes = function(){
        
        this.pipeCounter = (this.pipeCounter + 1) % this.pipeCounterLimit;

        if(this.pipeCounter == 0){

            var upperPipeHeight = getPipeHeight();
            var upperPipeTop = 0;
            var upperPipeSrc = 'url(images/pipe.png)';
            var upperPipe = new Pipe(this.container, this.containerWidth, upperPipeTop, upperPipeHeight, upperPipeSrc);
            upperPipe.init();

            var lowerPipeHeight = 400 - upperPipeHeight;
            var lowerPipeTop = this.containerHeight - this.groundHeight - lowerPipeHeight;
            var lowerPipeSrc = 'url(images/pipe.png)';
            var lowerPipe = new Pipe(this.container, this.containerWidth, lowerPipeTop, lowerPipeHeight, lowerPipeSrc);
            lowerPipe.init();

            this.upperPipes.push(upperPipe);
            this.lowerPipes.push(lowerPipe);

        }
    }

    function getPipeHeight(){
        var minHeight = 80;
        var maxHeight = 320;
        var height = Math.round(Math.random() * (maxHeight - minHeight) + minHeight);

        return height;
    }

    this.moveBackground = function(){

        if(this.backgroundWrapperLeft <= -500){
            this.backgroundWrapperLeft = 0;
        }
        else{
            this.backgroundWrapperLeft -= this.backgroundSpeed;
        }

        this.backgroundWrapper.style.left = this.backgroundWrapperLeft + 'px'; 

    }

    this.movebase = function(){

        if(this.baseWrapperLeft <= -500){
            this.baseWrapperLeft = 0;
        }
        else{
            this.baseWrapperLeft -= this.baseSpeed;
        }

        this.baseWrapper.style.left = this.baseWrapperLeft + 'px'; 
        
    }

    this.addScoreElement = function(){
        this.score = 0;

        this.Score = document.createElement('div');
        this.Score.style.color = 'white';
        this.Score.style.position = 'absolute';
        this.Score.style.top = '50px';
        this.Score.style.left = '235px';
        this.Score.style.zIndex = '1';
        this.Score.style.fontSize = '60px';
        this.Score.innerHTML = this.score;

        this.container.appendChild(this.Score);
    }

    this.addBackgroundWrapper = function(){
        this.backgroundWrapper = document.createElement('div');
        this.backgroundWrapper.style.position = 'relative';
        this.backgroundWrapper.style.left = this.backgroundWrapperLeft + 'px';
        this.backgroundWrapper.style.width = this.containerWidth * 2 + 'px';
        this.backgroundWrapper.style.height = this.containerHeight - this.groundHeight + 'px';

        this.container.appendChild(this.backgroundWrapper);

        var imgSrc = ['images/background.png'];

        this.backgroundWrapper.appendChild(this.getImage(this.containerWidth, this.backgroundWrapper.style.height, 
                                            imgSrc[0]));
                                            
        this.backgroundWrapper.appendChild(this.getImage(this.containerWidth, this.backgroundWrapper.style.height, 
            imgSrc[0]));
    }
    this.addForegroundWrapper = function(){
        this.baseWrapper = document.createElement('div');
        this.baseWrapper.style.position = 'relative';
        this.baseWrapper.style.left = this.baseWrapperLeft + 'px';
        this.baseWrapper.style.width = this.containerWidth * 2 + 'px';
        this.baseWrapper.style.height = this.groundHeight + 'px';

        this.container.appendChild(this.baseWrapper);

        var imgSrc = ['images/base.png'];

        this.baseWrapper.appendChild(this.getImage(this.containerWidth, this.baseWrapper.style.height, 
                                            imgSrc[0]));
                                            
        this.baseWrapper.appendChild(this.getImage(this.containerWidth, this.baseWrapper.style.height, 
            imgSrc[0]));
    }

    this.getImage = function(width, height, src){
        var img = document.createElement('img');
        img.style.cssFloat = 'left';
        img.style.width = width + 'px';
        img.style.height = height;
        
        img.setAttribute('src', src);

        return img;
    }

    this.createBird = function(){
        this.bird = new Bird(this.container);
        this.bird.init();
    }
    
    this.keyPressEvents = function(){
        var keyNumber = event.keyCode;

        switch (keyNumber) {

            case 38:
                //up arrow
                if(this.gamePaused){
                   
                    

                    this.start();
                }
                else if(!this.bird.flying && !this.gamePaused){
                    this.bird.flyUp();
                }
        }
    }
}

var game1 = new Game().init();
var game2 = new Game().init();