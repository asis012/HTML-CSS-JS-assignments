(function() {
  var count = 0;
  var collied = false;
  function Box(parentElement) {
    this.x = 10;
    this.y = 10;
 
    this.width = 40;
    this.height = 50;
    this.dx = 20;
    this.dy = 20;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.boxes = [];

    this.init = function() {
      var box = document.createElement('div');

      box.style.height = this.height + 'px';
      box.style.width = this.width + 'px';
      box.classList.add('box');


     this.element = box;
      
     
      
     
      
    
    
      
      this.draw();
      this.element.style.backgroundImage = "url('ant.png')";
      this.element.style.backgroundSize = "cover";
      this.element.style.backgroundRepeat = "no-repeat";
      this.element.onclick = function(e){
        
        boxClicked(e.target)
      }
      function boxClicked(element){
        element.style.backgroundImage = "url('splat.png')";
        element.style.width = "60"
        element.style.height = "50"
        
        
      }
      
      
     
     
      return this;
    };

    this.setPostion = function(x, y) {
      this.x = x;
      this.y = y;
    };

    // this.boxClicked = function() {
      
    //   this.box.style.display = 'none';
    // };

    this.draw = function() {
      if (
        0 < this.x &&
        10 < this.y &&
        this.x < parentElement.offsetWidth &&
        this.y  < parentElement.offsetHeight
      ) {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.parentElement.appendChild(this.element);
        
        
      }

      
      
    
    
    };

    this.move = function() {
      this.x = this.x + this.dx * 0.6;
      this.y = this.y + this.dy * 1.5;

      this.draw();
    };

    this.overlap = function(boxes) {
      for (j = 0; j < boxes.length; j++) {
        if (
          this.x < boxes[j].x + boxes[j].width &&
          this.x + this.width > boxes[j].x &&
          this.y < boxes[j].y + boxes[j].height &&
          this.y + boxes[j].height > boxes[j].y
        ) {
          collied = true;

          return true;
        }
      }
    };

    this.checkCollisions = function(boxes) {
      var boxright = this.x + this.element.offsetWidth;
      var boxbottom = this.y + this.element.offsetHeight;

      if (boxright >= parentElement.offsetWidth) {
        this.dx = -1;
      } else if (this.x < 0) {
        this.dx = +1;
      }

      if (boxbottom >= parentElement.offsetHeight) {
        this.dy = -1;
      } else if (this.y < 0 ) {
        this.dy = +1;
      }

      this.move();

      for (var j = 0; j < boxes.length; j++) {
        if (this !== boxes[j]) {
          if (
            this.x < boxes[j].x + boxes[j].width &&
            this.x + this.width > boxes[j].x &&
            this.y < boxes[j].y + boxes[j].height &&
            this.y + this.height > boxes[j].y
          ) {
            this.dx = -this.dx;
            this.dy = -this.dy;
            this.move();
          }
        }
      }
    };
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Game(parentElement, boxCount) {
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;

    this.startGame = function() {
      for (var i = 0; i < this.boxCount; i++) {
        while (count < this.boxCount) {
          var box = new Box(parentElement).init();

          box.setPostion(
            getRandomArbitrary(0, MAX_WIDTH),
            getRandomArbitrary(0, MAX_HEIGHT)
          );
            
          if (!box.overlap(boxes)) {
            
            this.boxes = true;
            count++;
            boxes.push(box);
          }
        }
      }
      this.moveBoxes();
      setInterval(this.moveBoxes.bind(this), 25);
    };
  

    this.moveBoxes = function() {
      for (var i = 0; i < this.boxCount; i++) {
        boxes[i].checkCollisions(boxes);
      }
    };


    
  }

  var parentElement = document.getElementById('app');

  new Game(parentElement).startGame();
})();
