
function Bird(container, top = 300, left = 150){
    this.parentElem = container;
    this.bird;
    this.HEIGHT = 48;
    this.WIDTH = 65;
    this.left = left;
    this.top = top;
    this.UP_DIFF = 80;
    this.upSpeed = 7;
    this.initialFallSpeed = 4;
    this.fallSpeed = 2;
    this.flying = false;
    this.FPS = 60;
    this.FLY_UP_INTERVAL = 1000 / this.FPS;
    this.backgroundPositions = ['0% 0%', '0% 50%', '0% 100%'];
    

    this.init = function(){
        this.bird = document.createElement('div');
        this.bird.style.position = 'absolute';
        this.bird.style.left = this.left + 'px';
        this.bird.style.top = this.top + 'px';
        this.bird.style.width = this.WIDTH + 'px';
        this.bird.style.height = this.HEIGHT + 'px';
        this.bird.style.zIndex = '1'
        this.bird.style.background = 'url(images/bird.png)';

        this.bird.style.backgroundSize = 'cover';
       
        this.draw()

        this.parentElem.appendChild(this.bird);
     
    }

    
    
    
    

    this.draw = function(){
        this.bird.style.left = this.left + 'px';
        this.bird.style.top = this.top + 'px';
    }

    this.flyUp = function(){
        this.fallSpeed = this.initialFallSpeed;
        this.flying = true;
        var nextTop = this.top - this.UP_DIFF;
        
        var bgCounter = 0; 

        var id = setInterval(gravity.bind(this), this.FLY_UP_INTERVAL);

        function gravity(){


           

            if(this.top <= nextTop){
                this.top = nextTop;
                this.flying = false;
                clearInterval(id);
            }
            else{
                this.top -= this.upSpeed;
                bgCounter = (bgCounter + 1) % 2;
                
                var index;
                if(bgCounter < 3){
                    index = 1;
                }
                else if(bgCounter >= 3 && bgCounter < 6){
                    index = 2;
                }
                else{
                    index = 0;
                }
                
                this.bird.style.backgroundPosition = this.backgroundPositions[index];
              
                this.draw();
            }
        }
    }

    this.dropDown = function(){
        if(!this.flying){
            this.top += this.fallSpeed;
            this.fallSpeed += 0.03;
          
            
                     
            this.draw();
        }
    }

   
}