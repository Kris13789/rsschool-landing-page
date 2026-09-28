(function () {
  var tabsContainer = document.querySelector(".tabs");
  var panels = document.querySelectorAll(".category-panel");

  if (!tabsContainer || panels.length === 0) return;

  var products = [];

  function createCard(product) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "product-card";
    card.setAttribute("data-product-id", product.id);

    var image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "product-card__image";

    var body = document.createElement("div");
    body.className = "product-card__body";

    var textWrap = document.createElement("div");

    var title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = product.name;

    var description = document.createElement("p");
    description.className = "product-card__description";
    description.textContent = product.description;

    var price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = window.CoffeeHouse.formatPrice(product.price);

    textWrap.appendChild(title);
    textWrap.appendChild(description);
    body.appendChild(textWrap);
    body.appendChild(price);
    card.appendChild(image);
    card.appendChild(body);

    card.addEventListener("click", function () {
      if (window.CoffeeHouse.openProductModal) {
        window.CoffeeHouse.openProductModal(product);
      }
    });

    return card;
  }

  function renderCategory(categoryName) {
    var grid = document.querySelector('[data-category-grid="' + categoryName + '"]');
    var showMoreButton = document.querySelector('[data-category-showmore="' + categoryName + '"]');
    if (!grid) return;

    grid.innerHTML = "";
    var items = products.filter(function (product) {
      return product.category === categoryName;
    });

    for (var i = 0; i < items.length; i++) {
      grid.appendChild(createCard(items[i]));
    }

    if (showMoreButton) {
      showMoreButton.hidden = items.length <= 4;
    }
  }

  function resetPanel(panel) {
    panel.classList.remove("is-expanded");
  }

  function initTabs() {
    tabsContainer.addEventListener("click", function (event) {
      var tab = event.target.closest(".tab");
      if (!tab) return;

      var tabs = tabsContainer.querySelectorAll(".tab");
      for (var i = 0; i < tabs.length; i++) {
        var isActive = tabs[i] === tab;
        tabs[i].classList.toggle("is-active", isActive);
        tabs[i].setAttribute("aria-selected", String(isActive));
      }

      var category = tab.getAttribute("data-category");
      for (var j = 0; j < panels.length; j++) {
        var panel = panels[j];
        var show = panel.id === "category-" + category;
        panel.hidden = !show;
        if (show) resetPanel(panel);
      }
    });
  }

  function initShowMoreButtons() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest(".show-more");
      if (!button) return;

      var panel = button.closest(".category-panel");
      if (!panel) return;

      panel.classList.add("is-expanded");
    });
  }

  function initResizeReset() {
    window.matchMedia("(max-width: 768px)").addEventListener("change", function () {
      for (var i = 0; i < panels.length; i++) {
        resetPanel(panels[i]);
      }
    });
  }

  fetch("data/products.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      products = data;
      window.CoffeeHouse.products = products;

      var categories = ["coffee", "tea", "dessert"];
      for (var i = 0; i < categories.length; i++) {
        renderCategory(categories[i]);
      }

      initTabs();
      initShowMoreButtons();
      initResizeReset();
    })
    .catch(function () {
      for (var i = 0; i < panels.length; i++) {
        var grid = panels[i].querySelector(".category-grid");
        if (grid) grid.textContent = "Unable to load the menu right now.";
      }
    });
})();
