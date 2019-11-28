function carousel(id) {
  this.container = document.getElementsByClassName(
    'carousel-container' + id
  )[0];
  this.container.classList.add('carousel-container');
  this.imageWrapper = document.getElementsByClassName(
    'carousel-image-wrapper' + id
  )[0];
  this.imageWrapper.classList.add('carousel-image-wrapper');
  this.slides = document.getElementsByTagName('img');

  this.imageWidth = 680;
  this.imageWrapper.style.width =
    this.imageWrapper.childElementCount * this.imageWidth + 'px';
  this.slideIndex = 1;

  //basic initialization 
  this.init = function() {
    for (i = 0; i < this.imageWrapper.childElementCount; i++) {
      this.slides[i].style.left = i * this.imageWidth + 680 + 'px';
    }
    for (i = 0; i < this.imageWrapper.childElementCount; i++) {
      document.getElementById(id + 'span' + i).style.background = '#bbb';
    }
    document.getElementById(id + 'span0').style.background = 'grey';
  };


  //left arrow creation
  this.left = document.createElement('div');
  this.left.innerHTML =
    '<i class="fas fa-arrow-circle-left" aria-hidden="true"></i>';
  this.left.classList.add('left');
  this.container.appendChild(this.left);

   //right arrow creation
  this.right = document.createElement('div');
  this.right.innerHTML =
    '<i class="fas fa-arrow-circle-right" aria-hidden="true"></i>';
  this.right.classList.add('right');
  this.container.appendChild(this.right);

  //dot creation for indicidator
  this.dot = document.createElement('div');
  this.dot.classList.add('dot');
  this.container.appendChild(this.dot);

  //indicator creation
  for (i = 0; i < this.imageWrapper.childElementCount; i++) {
    this.span = document.createElement('span');
    this.span.innerHTML = '<i class="far fa-circle" aria-hidden="true"></i>';
    this.span.setAttribute('id', id + 'span' + i);
    this.dot.appendChild(this.span);
  }

  //add eventlistener when  arrow is clicked
  var that = this;
  this.left.addEventListener('click', function() {
    that.slide(-1);
  });
  this.slide = function(n) {
    this.slideShow((this.slideIndex += n));
  };

  //addevent listener when indiator is clicked
  var that = this;
  this.right.addEventListener('click', function() {
    that.slide(+1);
  });
  this.slide = function(n) {
    this.slideShow((this.slideIndex += n));
  };

  this.span1 = document.getElementById(id + 'span0');
  this.span1.addEventListener('click', () => {
    this.currentSlide(1);
  });

  this.span2 = document.getElementById(id + 'span1');
  this.span2.addEventListener('click', () => {
    this.currentSlide(2);
  });

  this.span3 = document.getElementById(id + 'span2');
  this.span3.addEventListener('click', () => {
    this.currentSlide(3);
  });

  //sliding images when arrow is clicked
  this.slideShow = function(n) {
    if (n > this.imageWrapper.childElementCount) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.imageWrapper.childElementCount;
    }
    this.imageWrapper.style.left ='-' + (this.slideIndex - 1) * this.imageWidth + 'px';
    this.imageWrapper.style.transition = '1s linear';
    this.spans = document.getElementsByTagName('span');
    for (i = 0; i < this.imageWrapper.childElementCount; i++) {
      document.getElementById(id + 'span' + i).style.background = '#bbb';
    }
    document.getElementById(
      id + 'span' + (this.slideIndex - 1)
    ).style.background = 'grey';
  };

  //sliding images when  indicator is clicked 
  this.currentSlide = function(n) {
    this.spans = document.getElementsByTagName('span');
    this.imageWrapper.style.left = '-' + (n - 1) * this.imageWidth + 'px';
    for (i = 0; i < this.imageWrapper.childElementCount; i++) {
      document.getElementById(id + 'span' + i).style.background = '#bbb';
    }
    document.getElementById(id + 'span' + (n - 1)).style.background = 'grey';
  };
}
//Object 1
var object1 = new carousel(0);
object1.init();

//object 2
// var object2 = new carousel(1)
// object2.init()
