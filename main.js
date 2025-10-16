document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#homeSlider", {
    loop: true,
    speed: 1000,
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: false,
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

      const buttonWrapper = this.parentElement;
      let popup = buttonWrapper.querySelector(".mini-popup");

      if (!popup) {
        popup = document.createElement("div");
        popup.className = "mini-popup success";
        popup.innerHTML = `
          <i class="fas fa-check"></i>
          <p>Товар додано!</p>
        `;
        buttonWrapper.appendChild(popup);
      }

      popup.classList.remove("show");
      setTimeout(() => {
        popup.classList.add("show");
        setTimeout(() => {
          popup.classList.remove("show");
        }, 1000);
      }, 100);

      cartCount++;
      const cart = document.querySelector(".cart-badge");
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
  constructor(container) {
    this.comparison =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!this.comparison) {
      console.error("BeforeAfterSlider: Container not found");
      return;
    }

    this.imageAfter = this.comparison.querySelector(".image-after");
    this.sliderLine = this.comparison.querySelector(".slider-line");
    this.sliderButton = this.comparison.querySelector(".slider-button");

    this.labelBefore = this.comparison.querySelector(".label-before");
    this.labelAfter = this.comparison.querySelector(".label-after");

    if (!this.imageAfter || !this.sliderLine || !this.sliderButton) {
      console.error("BeforeAfterSlider: Required elements not found");
      return;
    }

    this.isDragging = false;
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseUp = this.stopDragging.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.boundHandleTouchEnd = this.stopDragging.bind(this);

    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  updateSlider(clientX) {
    const rect = this.comparison.getBoundingClientRect();

    if (rect.width === 0) {
      console.warn("BeforeAfterSlider: Container width is 0");
      return;
    }

    let position = ((clientX - rect.left) / rect.width) * 100;
    position = this.clampPosition(position);
    this.applySliderPosition(position);

    this.updateLabelsVisibility(position);
  }

  clampPosition(position) {
    return Math.max(0, Math.min(100, position));
  }

  applySliderPosition(position) {
    this.sliderLine.style.left = position + "%";
    this.imageAfter.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  }

  updateLabelsVisibility(position) {
    const threshold = 15;
    if (this.labelBefore) {
      if (position < threshold) {
        this.labelBefore.classList.add("hidden");
      } else {
        this.labelBefore.classList.remove("hidden");
      }
    }

    if (this.labelAfter) {
      if (position > 100 - threshold) {
        this.labelAfter.classList.add("hidden");
      } else {
        this.labelAfter.classList.remove("hidden");
      }
    }
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
      e.preventDefault();
      this.updateSlider(e.touches[0].clientX);
    }
  }

  handleClick(e) {
    if (
      e.target === this.sliderButton ||
      this.sliderButton.contains(e.target)
    ) {
      return;
    }
    this.updateSlider(e.clientX);
  }

  handleTouchStart(e) {
    this.startDragging();
    e.preventDefault();
  }

  attachEventListeners() {
    this.sliderButton.addEventListener("mousedown", () => this.startDragging());
    document.addEventListener("mousemove", this.boundHandleMouseMove);
    document.addEventListener("mouseup", this.boundHandleMouseUp);

    this.comparison.addEventListener("click", (e) => this.handleClick(e));

    this.sliderButton.addEventListener("touchstart", (e) =>
      this.handleTouchStart(e)
    );

    document.addEventListener("touchmove", this.boundHandleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", this.boundHandleTouchEnd);
  }
  destroy() {
    document.removeEventListener("mousemove", this.boundHandleMouseMove);
    document.removeEventListener("mouseup", this.boundHandleMouseUp);
    document.removeEventListener("touchmove", this.boundHandleTouchMove);
    document.removeEventListener("touchend", this.boundHandleTouchEnd);

    console.log("BeforeAfterSlider destroyed");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const slider1 = new BeforeAfterSlider("#comparison");
});

function createPopup(type) {
  if (type !== "success") {
    return;
  }
  const popup = document.createElement("div");
  popup.className = "subscribe-success-popup";
  popup.textContent = "Дякуємо за підписку!";
  const subscriptionContent = document.querySelector(".subscription-section");
  subscriptionContent.appendChild(popup);
  setTimeout(() => popup.classList.add("active"), 10);
  setTimeout(() => {
    popup.classList.remove("active");
    setTimeout(() => popup.remove(), 300);
  }, 2000);
}

function subscribeSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  createPopup("success");
  e.target.reset();
}
