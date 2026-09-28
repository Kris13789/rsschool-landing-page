(function () {
  var overlay = document.getElementById("product-modal-overlay");
  var modal = overlay ? overlay.querySelector(".modal") : null;
  var image = document.getElementById("modal-image");
  var title = document.getElementById("modal-title");
  var description = document.getElementById("modal-description");
  var sizeOptions = document.getElementById("modal-size-options");
  var additiveOptions = document.getElementById("modal-additive-options");
  var totalPrice = document.getElementById("modal-total-price");
  var closeButton = document.getElementById("modal-close-button");

  if (!overlay || !modal || !image || !title || !description || !sizeOptions || !additiveOptions || !totalPrice || !closeButton) {
    return;
  }

  var isOpen = false;
  var currentProduct = null;
  var selectedSizeKey = "s";
  var selectedAdditives = [];
  var triggerElement = null;

  var sizeKeys = ["s", "m", "l"];

  function recomputeTotal() {
    if (!currentProduct) return;

    var total = currentProduct.price + currentProduct.sizes[selectedSizeKey].addPrice;
    for (var i = 0; i < selectedAdditives.length; i++) {
      total += currentProduct.additives[selectedAdditives[i]].addPrice;
    }
    totalPrice.textContent = window.CoffeeHouse.formatPrice(total);
  }

  function renderSizeOptions() {
    sizeOptions.innerHTML = "";
    for (var i = 0; i < sizeKeys.length; i++) {
      (function (key) {
        var size = currentProduct.sizes[key];
        var option = document.createElement("button");
        option.type = "button";
        option.className = "modal__option";
        option.setAttribute("role", "radio");
        option.setAttribute("aria-checked", String(key === selectedSizeKey));
        option.textContent = key.toUpperCase() + " " + size.label;

        option.addEventListener("click", function () {
          selectedSizeKey = key;
          var buttons = sizeOptions.querySelectorAll(".modal__option");
          for (var j = 0; j < buttons.length; j++) {
            buttons[j].setAttribute("aria-checked", "false");
          }
          option.setAttribute("aria-checked", "true");
          recomputeTotal();
        });

        sizeOptions.appendChild(option);
      })(sizeKeys[i]);
    }
  }

  function renderAdditiveOptions() {
    additiveOptions.innerHTML = "";
    for (var i = 0; i < currentProduct.additives.length; i++) {
      (function (index) {
        var additive = currentProduct.additives[index];
        var option = document.createElement("button");
        option.type = "button";
        option.className = "modal__option";
        option.setAttribute("aria-pressed", "false");
        option.textContent = (index + 1) + ". " + additive.name;

        option.addEventListener("click", function () {
          var position = selectedAdditives.indexOf(index);
          if (position === -1) {
            selectedAdditives.push(index);
            option.setAttribute("aria-pressed", "true");
          } else {
            selectedAdditives.splice(position, 1);
            option.setAttribute("aria-pressed", "false");
          }
          recomputeTotal();
        });

        additiveOptions.appendChild(option);
      })(i);
    }
  }

  function openModal(product) {
    currentProduct = product;
    selectedSizeKey = "s";
    selectedAdditives = [];
    triggerElement = document.activeElement;

    image.src = product.image;
    image.alt = product.name;
    title.textContent = product.name;
    description.textContent = product.description;

    renderSizeOptions();
    renderAdditiveOptions();
    recomputeTotal();

    isOpen = true;
    overlay.hidden = false;
    window.CoffeeHouse.lockScroll();
    closeButton.focus();
  }

  function closeModal() {
    if (!isOpen) return;
    isOpen = false;
    overlay.hidden = true;
    window.CoffeeHouse.unlockScroll();
    if (triggerElement && typeof triggerElement.focus === "function") {
      triggerElement.focus();
    }
  }

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });

  closeButton.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      closeModal();
    }
  });

  window.CoffeeHouse = window.CoffeeHouse || {};
  window.CoffeeHouse.openProductModal = openModal;
})();
