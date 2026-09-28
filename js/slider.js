(function () {
  var track = document.querySelector(".slider__track");
  var arrows = document.querySelectorAll(".slider__arrow");
  var dots = document.querySelectorAll(".slider__dot");

  if (!track || arrows.length < 2) return;

  var realSlides = Array.prototype.slice.call(track.children);
  var total = realSlides.length;

  if (total === 0) return;

  var firstClone = realSlides[0].cloneNode(true);
  var lastClone = realSlides[total - 1].cloneNode(true);
  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");
  track.appendChild(firstClone);
  track.insertBefore(lastClone, realSlides[0]);

  // Real slide 0 now lives at extended index 1 (index 0 is the prepended
  // clone of the last slide, index total+1 is the appended clone of the first).
  var currentIndex = 1;
  var isAnimating = false;

  function setPosition(index, animate) {
    if (!animate) track.style.transition = "none";
    track.style.transform = "translateX(-" + index * 100 + "%)";
    if (!animate) {
      track.offsetHeight; // force reflow so the jump applies before re-enabling the transition
      track.style.transition = "";
    }
  }

  function updateDots(index) {
    var realIndex = ((index - 1) % total + total) % total;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("slider__dot--active", i === realIndex);
    }
  }

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    setPosition(currentIndex, true);
    updateDots(currentIndex);
  }

  track.addEventListener("transitionend", function (event) {
    if (event.target !== track || event.propertyName !== "transform") return;

    if (currentIndex === total + 1) {
      currentIndex = 1;
      setPosition(currentIndex, false);
    } else if (currentIndex === 0) {
      currentIndex = total;
      setPosition(currentIndex, false);
    }

    isAnimating = false;
  });

  arrows[0].addEventListener("click", function () {
    goTo(currentIndex - 1);
  });

  arrows[1].addEventListener("click", function () {
    goTo(currentIndex + 1);
  });

  setPosition(currentIndex, false);
  updateDots(currentIndex);
})();
