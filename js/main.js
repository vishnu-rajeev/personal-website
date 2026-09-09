/* Progressive enhancement — the site is fully functional without JS. */
(function () {
  "use strict";

  // Keep the footer copyright year current.
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Highlight the nav link for the section currently in view.
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  var linkById = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    if (id) linkById[id] = link;
  });

  var sections = Object.keys(linkById)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      if (match) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
