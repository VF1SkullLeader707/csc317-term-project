// public/js/slider.js
(function () {
  const track = document.querySelector(".category-track");
  const slides = document.querySelectorAll(".category-slide");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (!track || slides.length === 0) return;

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  // Optional auto-slide
  setInterval(() => {
    index = (index + 1) % slides.length;
    update();
  }, 7000);
})();
