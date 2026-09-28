(function () {
  var header = document.querySelector(".site-header");
  var button = document.querySelector(".burger-button");
  var drawer = document.getElementById("nav-drawer");

  if (!header || !button || !drawer) return;

  var isOpen = false;

  function openMenu() {
    isOpen = true;
    header.classList.add("is-menu-open");
    drawer.classList.add("is-open");
    button.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close menu");
    window.CoffeeHouse.lockScroll();
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    header.classList.remove("is-menu-open");
    drawer.classList.remove("is-open");
    button.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    window.CoffeeHouse.unlockScroll();
  }

  button.addEventListener("click", function () {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  drawer.addEventListener("click", function (event) {
    if (event.target.closest(".nav-drawer__link")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", function (event) {
    if (event.matches) {
      closeMenu();
    }
  });
})();
