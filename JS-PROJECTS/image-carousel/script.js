var imageWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
var slides = document.getElementsByTagName('img');
var dot = document.getElementsByTagName('span');
var imageWidth = 600;

for (i = 0; i < slides.length; i++) {
  slides[i].style.left = i * imageWidth + 'px';
}
imageWrapper.style.width = slides.length * imageWidth + 'px';

var slideIndex = 1;
slideShow(slideIndex);

function slide(n) {
  slideShow((slideIndex += n));
}

function slideShow(n) {
  var i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  imageWrapper.style.left = '-' + (slideIndex - 1) * imageWidth + 'px';
  currentSlide(slideIndex);
}

function currentSlide(n) {
  imageWrapper.style.left = '-' + (n - 1) * imageWidth + 'px';
  

for (i = 0; i < slides.length; i++) {
  dot[i].style.background = '#bbb';
}
dot[n - 1].style.background = 'grey';
}
