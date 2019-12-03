;(function () {
  var keyPressed = false
  var gamePaused = true
  var hightScore = 0

  start(false)

  function Car (parentElement, backgroundUrl, left, bottom) {
    this.parentElement = parentElement

    this.backgroundUrl = backgroundUrl
    this.WIDTH = 200
    this.HEIGHT = 90
    this.leftPosition = left
    this.bottomPosition = bottom
    this.bullets = []
    this.firing = false
    this.bulletLimit = 10
    this.laneWidth = 200
    this.leftLanePosition = 45
    this.rightLanePosition = 425

    this.init = function () {
      this.create()
    }

    // create element(car/obtacles)
    this.create = function () {
      this.element = document.createElement('div')
      this.element.style.background = this.backgroundUrl
      this.element.style.backgroundSize = 'contain'
      this.element.style.backgroundRepeat = 'no-repeat'
      this.element.style.left = this.leftPosition + 'px'
      this.element.style.width = this.WIDTH + 'px'
      this.element.style.height = this.HEIGHT + 'px'
      this.element.style.position = 'absolute'
      this.draw()
      this.parentElement.appendChild(this.element)
    }

    this.fire = function () {
        this.bullet = document.createElement('div')
        this.bullet.style.width = '10px'
        this.bullet.style.height = '10px'
        this.bullet.style.borderRadius = '50%'
        this.bullet.style.backgroundColor = 'yellow'
        this.bullet.style.left = this.leftPosition + 30 + 'px'
        this.bullet.style.bottom = this.bottomPosition + 'px'
        this.bullet.style.position = 'absolute'
        this.parentElement.appendChild(this.bullet)
  
        this.bullets.push(this.bullet)
      }

    this.draw = function () {
      this.element.style.bottom = this.bottomPosition + 'px'
    }

    this.destroyBugs = function () {
      this.parentElement.removeChild(this.element)
    }

    this.destroybullet = function () {
        console.log("ok")
       // this.parentElement.removeChild(this.bullet)
      }
    // move right
    this.moveRight = function () {
      if (this.leftPosition < this.rightLanePosition) {
        keyPressed = true

        var id = setInterval(frame.bind(this), 10)

        var nextLeft = this.leftPosition + this.laneWidth

        function frame () {
          if (this.leftPosition >= nextLeft) {
            this.leftPosition = nextLeft
            this.element.style.left = this.leftPosition + 'px'

            keyPressed = false
            clearInterval(id)
          } else {
            this.leftPosition += 50
            this.element.style.left = this.leftPosition + 'px'
          }
        }
      }
    }

    this.bulletfire = function () {}
    // move left
    this.moveLeft = function () {
      if (this.leftPosition > this.leftLanePosition) {
        keyPressed = true
        var id = setInterval(frame.bind(this), 10)
        var nextLeft = this.leftPosition - this.laneWidth

        function frame () {
          if (this.leftPosition <= nextLeft) {
            this.leftPosition = nextLeft
            this.element.style.left = this.leftPosition + 'px'
            keyPressed = false
            clearInterval(id)
          } else {
            this.leftPosition -= 50
            this.element.style.left = this.leftPosition + 'px'
          }
        }
      }
    }

    
  }

  function Game (mLeft) {
    this.wrapperTop = -600
    this.obtacles = 1
    this.bugs = []
    this.speed = 20
    carsPassedScore = 0
    this.carsDestroyedScore = 0

    this.totalScore = 0
    this.bulletCounter = 5
    this.bulletCounterLimit = 20
    this.ammoLive = true
    this.ammoLiveCounter = 5



    this.ammoLiveLimit = 1000
    this.ammunitionElement

    this.init = function () {
      this.container = document.getElementById('app')
      this.container.style.height = '660px'
      this.container.style.overflow = 'hidden'
      this.container.style.marginLeft = mLeft
      this.containerWidth = this.containeroffsetWidth
      this.containerHeight = this.containeroffset

      this.roadWrapper()
      this.car(true, 245, 50)
      document.onkeydown = this.move.bind(this)
      this.gameId = setInterval(this.moveBackground.bind(this), 10)
    }

    this.moveBackground = function () {
      if (this.wrapperTop < 0) {
        this.wrapperTop += 20
      } else {
        this.wrapperTop = -600
      }
      this.wrapper.style.top = this.wrapperTop + 'px'

      this.bulletCounter = (this.bulletCounter + 1) % this.bulletCounterLimit

      if (this.player.firing) {
        if (
          this.player.bullets.length < this.player.bulletLimit &&
          this.bulletCounter == 0
        ) {
          this.player.fire()
        }

        for (var x = 0; x < this.player.bullets.length; x++) {
          this.player.bullets[x].style.bottom =
            parseInt(this.player.bullets[x].style.bottom) + 30 + 'px'
        }

        if (this.player.bullets.length > 0) {
          if (
            parseInt(
              this.player.bullets[this.player.bullets.length - 1].style.bottom
            ) > 1100
          ) {
          //  this.player.firing = false
          }
        }
      }

      // check collision
      for (var i = 0; i < this.bugs.length; i++) {
        var killed = false

        this.bugs[i].bottomPosition -= this.speed
        this.bugs[i].draw()

        if (
          this.player.leftPosition <
            this.bugs[i].leftPosition + this.bugs[i].WIDTH &&
          this.player.leftPosition + this.player.WIDTH >
            this.bugs[i].leftPosition &&
          this.player.bottomPosition <
            this.bugs[i].bottomPosition + this.bugs[i].HEIGHT &&
          this.player.bottomPosition + this.player.HEIGHT >
            this.bugs[i].bottomPosition
        ) {
          gamePaused = true

          clearInterval(this.gameId)

          start(true)
        }

        for (var y = 0; y < this.player.bullets.length; y++) {
          if (
            parseInt(this.player.bullets[y].style.left) <
              this.bugs[i].leftPosition + this.bugs[i].WIDTH &&
            parseInt(this.player.bullets[y].style.left) + 10 >
              this.bugs[i].leftPosition &&
            parseInt(this.player.bullets[y].style.bottom) <
              this.bugs[i].bottomPosition + this.bugs[i].HEIGHT &&
            parseInt(this.player.bullets[y].style.bottom) + 10 >
              this.bugs[i].bottomPosition
          ) {
            //  console.log("ok")
            this.bugs[i].destroyBugs()
            // console.log("destory")
             //this.parentElement.removeChild(this.player.bullets[y])
            // this.player.bullets[y].destroybullet()
             
            this.bugs.splice(i, 1)
            //this.bullets.splice(y, 1)
            // console.log(this.bugs)
            // UPDATE SCORE
            carsPassedScore += 1
            // console.log("ok")

            killed = true

            break
          }
        }
        if (!killed) {
          if (this.bugs[i].bottomPosition < -this.bugs[i].HEIGHT) {
            this.bugs[i].destroyBugs()
            this.bugs.splice(i, 1)
            carsPassedScore += 1
          }
        }
      }

      // add obtacles
      this.obtacles = (this.obtacles + 1) % 60

      if (this.obtacles == 0) {
        var carLeft = leftLane(random())
        this.car(false, carLeft, (this.obtaclesBottom = 450))
      }

      this.ammoLiveCounter = (this.ammoLiveCounter + 1) % this.ammoLiveLimit;

      if(this.ammoLiveCounter == 0){
          this.ammoLive = true;
          this.ammunitionElement.innerHTML = 'Live';
      }
    }

    function leftLane (lane = 3) {
      var leftPosition

      if (lane == 1) {
        leftPosition = 45
      } else if (lane == 2) {
        leftPosition = 245
      } else {
        leftPosition = 455
      }
      return leftPosition
    }

    function random () {
      var lane = Math.round(Math.random() * (3 - 1) + 1)
      return lane
    }

    // making div for road
    this.roadWrapper = function () {
      this.wrapper = document.createElement('div')
      this.wrapper.style.position = 'absolute'
      this.wrapper.style.width = this.containerWidth + 'px'
      this.wrapper.style.height = this.wrapperHeight + 'px'
      this.wrapper.style.top = this.wrapperTop + 'px'
      this.container.appendChild(this.wrapper)

      // adding background image
      var img = document.createElement('img')
      img.style.background = "url('road.png')"
      img.style.background = "url('road.png')"
      img.style.background = "url('road.png')"
      img.style.backgroundRepeat = 'repeat'
      img.style.width = 540 + 'px'
      img.style.height = 1600 + 'px'
      this.wrapper.appendChild(img)
    }

    this.car = function (isplayer, leftPosition, bottomPosition) {
      // for player
      if (isplayer) {
        this.player = new Car(
          this.container,
          'url(car.png)',
          leftPosition,
          bottomPosition
        )
        this.player.init()
      }
      // for obtacles
      else {
        var obstacle = new Car(
          this.container,
          'url(obstacle.png)',
          leftPosition,
          900
        )
        obstacle.init()
        this.bugs.push(obstacle)
      }
    }

    // move left right when arrow pressed
    this.move = function () {
      var key = event.keyCode
      switch (key) {
        case 37:
          if (!keyPressed && !gamePaused) {
            this.player.moveLeft()
            break
          }

        case 39:
          if (!keyPressed && !gamePaused) {
            this.player.moveRight()
            break
          }

        case 38:
          // space bar
          if (!keyPressed && !gamePaused && this.ammoLive) {
            this.player.firing = true

             this.ammoLive = false
          }
      }
    }
  }

  function start (gameOver) {
    if (!gameOver) {
      var firstScreen = document.getElementById('app')
      firstScreen.style.overflow = 'hidden'
      var play = document.createElement('button')
      play.innerHTML = 'PLAY Car Game'
      play.style.color = 'white'
      firstScreen.appendChild(play)

      play.onclick = function (e) {
        gamePaused = false
        new Game(10).init()
        // new Game(800).init()
      }
    } else {
      var firstScreen = document.getElementById('app')
      firstScreen.innerHTML = ''
      var over = document.createElement('h1')
      over.innerHTML = 'GAME OVER'
      over.style.color = 'white'
      over.style.textAlign = 'center'
      firstScreen.appendChild(over)

      var score = document.createElement('div')
      score.innerHTML = 'Score : ' + carsPassedScore
      score.style.color = 'white'
      score.style.textAlign = 'center'
      firstScreen.appendChild(score)

      if (hightScore < carsPassedScore) {
        hightScore = carsPassedScore
      }

      var highscore = document.createElement('div')
      highscore.innerHTML = 'HighScore : ' + hightScore

      highscore.style.color = 'white'
      highscore.style.textAlign = 'center'
      firstScreen.appendChild(highscore)

      var play = document.createElement('button')
      play.innerHTML = 'PLAY AGAIN'
      play.style.color = 'white'
      firstScreen.appendChild(play)
      play.onclick = function (e) {
        gamePaused = false

        var game1 = new Game().init()
      }
    }
  }
})()
