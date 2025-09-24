document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#homeSlider", {
    loop: true,
    speed: 1000,
    slidesPerView: 2,
    spaceBetween: 16,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: "#homeSlider .swiper-pagination", clickable: true },
    navigation: {
      nextEl: "#homeSlider .swiper-button-next",
      prevEl: "#homeSlider .swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0;
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.add("animate");
      setTimeout(() => this.classList.remove("animate"), 300);

      const popup = this.parentElement.querySelector(".mini-popup");
      if (popup) {
        popup.classList.remove("show");

        setTimeout(() => {
          popup.classList.add("show");

          setTimeout(() => {
            popup.classList.remove("show");
          }, 1000);
        }, 100);
      }
      cartCount++;
      cart = document.querySelector(".cart-badge");
      cart.textContent = cartCount;
    });
  });
});
