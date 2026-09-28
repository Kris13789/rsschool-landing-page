(function () {
  window.CoffeeHouse = window.CoffeeHouse || {};

  var lockCount = 0;
  var savedPaddingRight = "";

  function lockScroll() {
    lockCount += 1;
    if (lockCount > 1) return;

    try {
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      savedPaddingRight = document.body.style.paddingRight;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + "px";
      }
    } catch (e) {}

    document.body.classList.add("scroll-locked");
  }

  function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount > 0) return;

    document.body.classList.remove("scroll-locked");
    try {
      document.body.style.paddingRight = savedPaddingRight;
    } catch (e) {}
  }

  function formatPrice(amount) {
    return "$" + Number(amount).toFixed(2);
  }

  window.CoffeeHouse.lockScroll = lockScroll;
  window.CoffeeHouse.unlockScroll = unlockScroll;
  window.CoffeeHouse.formatPrice = formatPrice;
})();
