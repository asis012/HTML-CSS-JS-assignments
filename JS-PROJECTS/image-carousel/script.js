var imageWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
var slides = document.getElementsByTagName('img');
var dot = document.getElementsByTagName('span');
for (i = 0; i < slides.length; i++) {
  slides[i].style.left = i * 600 + 'px';
}
imageWrapper.style.width = slides.length * 600 + 'px';

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

  imageWrapper.style.left = '-' + (slideIndex - 1) * 600 + 'px';
  currentSlide(slideIndex);
}
function currentSlide(n) {
  imageWrapper.style.left = '-' + (n - 1) * 600 + 'px';
  switch (n) {
    case 1:
      dot[n - 1].style.background = 'grey';
      dot[n].style.background = '#bbb';
      dot[n + 1].style.background = '#bbb';
      console.log(1);
      break;
    case 2:
      dot[0].style.background = '#bbb';
      dot[2].style.background = '#bbb';
      dot[1].style.background = 'grey';
      break;
    case 3:
      dot[2].style.background = 'grey';
      dot[0].style.background = '#bbb';
      dot[1].style.background = '#bbb';
      break;
    default:
      break;
  }
}
