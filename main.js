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

document.addEventListener("DOMContentLoaded", function () {
  function updateHeaderWishlistIcon() {
    const activeWishlistItems = document.querySelectorAll(
      ".wishlist-btn.active"
    );
    const headerWishlistIcon = document.querySelector(
      ".header-right .fa-heart"
    );

    if (activeWishlistItems.length > 0) {
      headerWishlistIcon.classList.remove("fa-regular");
      headerWishlistIcon.classList.add("fa-solid");
      headerWishlistIcon.style.color = "#f44336";
    } else {
      headerWishlistIcon.classList.remove("fa-solid");
      headerWishlistIcon.classList.add("fa-regular");
      headerWishlistIcon.style.color = "";
    }
  }

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".wishlist-btn");
    if (!btn) return;

    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    btn.classList.toggle("active");

    const isActive = btn.classList.contains("active");
    btn.setAttribute("aria-pressed", String(isActive));

    updateHeaderWishlistIcon();
  });

  updateHeaderWishlistIcon();
});

function updateBadges() {
  const newBadges = document.querySelectorAll(".badge-new");
  newBadges.forEach((badge) => {
    badge.textContent = "Новинка";
  });

  const saleBadges = document.querySelectorAll(".badge-sale");
  saleBadges.forEach((badge) => {
    badge.textContent = "Акція";
  });
}
updateBadges();


class BeforeAfterSlider {
  constructor(containerId) {
    this.comparison = document.getElementById(containerId);
    this.imageAfter = document.getElementById("imageAfter");
    this.sliderLine = document.getElementById("sliderLine");
    this.sliderButton = document.getElementById("sliderButton");
    this.isDragging = false;

    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  updateSlider(clientX) {
    const rect = this.comparison.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;

    // Обмежуємо позицію від 0 до 100
    position = this.clampPosition(position);

    this.applySliderPosition(position);
  }

  clampPosition(position) {
    return Math.max(0, Math.min(100, position));
  }

  applySliderPosition(position) {
    this.sliderLine.style.left = position + "%";
    this.imageAfter.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  }

  startDragging() {
    this.isDragging = true;
  }

  stopDragging() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      this.updateSlider(e.clientX);
    }
  }

  handleTouchMove(e) {
    if (this.isDragging) {
      this.updateSlider(e.touches[0].clientX);
    }
  }

  handleClick(e) {
    this.updateSlider(e.clientX);
  }

  handleTouchStart(e) {
    this.startDragging();
    e.preventDefault();
  }

  attachEventListeners() {
    // Обробка миші
    this.sliderButton.addEventListener("mousedown", () => this.startDragging());
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    document.addEventListener("mouseup", () => this.stopDragging());

    // Клік по контейнеру
    this.comparison.addEventListener("click", (e) => this.handleClick(e));

    // Обробка дотику (мобільні пристрої)
    this.sliderButton.addEventListener("touchstart", (e) =>
      this.handleTouchStart(e)
    );
    document.addEventListener("touchmove", (e) => this.handleTouchMove(e));
    document.addEventListener("touchend", () => this.stopDragging());
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new BeforeAfterSlider("comparison");
});
