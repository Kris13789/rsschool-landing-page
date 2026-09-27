(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  if (!toggle) return;

  function syncToggle() {
    var isDark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* localStorage unavailable (e.g. private mode) — theme still applies for this load */
    }
    syncToggle();
  });

  syncToggle();
})();
