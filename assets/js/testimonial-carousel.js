(function () {
  const registry = new WeakMap();

  function initCarousel(root) {
    const track = root.querySelector(".carousel-track");
    const dotsContainer = root.querySelector(".carousel-dots");
    const prevBtn = root.querySelector(".carousel-prev");
    const nextBtn = root.querySelector(".carousel-next");

    if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

    const slides = track.querySelectorAll(".carousel-slide");
    const total = slides.length;
    let index = 0;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === index ? "true" : "false");
      });
      slides.forEach(function (slide, i) {
        slide.setAttribute("aria-hidden", i !== index ? "true" : "false");
      });
    }

    function goTo(i) {
      index = ((i % total) + total) % total;
      update();
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });

    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    registry.set(root, { goTo: goTo, getIndex: function () { return index; } });
    update();
  }

  document.querySelectorAll(".testimonial-carousel").forEach(initCarousel);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const root =
      document.activeElement &&
      document.activeElement.closest &&
      document.activeElement.closest(".testimonial-carousel");
    if (!root) return;
    const inst = registry.get(root);
    if (!inst) return;
    e.preventDefault();
    if (e.key === "ArrowLeft") inst.goTo(inst.getIndex() - 1);
    else inst.goTo(inst.getIndex() + 1);
  });
})();
