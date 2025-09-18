document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#homeSlider", {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: "#homeSlider .swiper-pagination", clickable: true },
    navigation: {
      nextEl: "#homeSlider .swiper-button-next",
      prevEl: "#homeSlider .swiper-button-prev",
    },
  });
});
