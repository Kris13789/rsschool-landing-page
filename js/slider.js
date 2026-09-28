(function () {
  var track = document.querySelector(".slider__track");
  var slides = document.querySelectorAll(".slider__slide");
  var arrows = document.querySelectorAll(".slider__arrow");
  var dots = document.querySelectorAll(".slider__dot");

  if (!track || slides.length === 0 || arrows.length < 2) return;

  var total = slides.length;
  var currentIndex = 0;

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = "translateX(-" + currentIndex * 100 + "%)";

    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("slider__dot--active", i === currentIndex);
    }
  }

  arrows[0].addEventListener("click", function () {
    goTo(currentIndex - 1);
  });

  arrows[1].addEventListener("click", function () {
    goTo(currentIndex + 1);
  });

  goTo(0);
})();
