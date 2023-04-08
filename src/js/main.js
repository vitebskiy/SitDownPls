// Селектор header (Регион)
const element = document.querySelector('#selectRegion');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: ''
});

// Селектор header (Поиск)
const element2 = document.querySelector('#selectCategory');
const choices2 = new Choices(element2, {
  searchEnabled: false,
  itemSelectText: ''
});


// Swiper hero
var swiper = new Swiper(".hero__swiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Swiper offers

var swiper2 = new Swiper('.offers__swiper', {
  slidesPerView: 3,
  loop: true,
  spaceBetween: 32,
  slidesPerGroup: 3,
  speed: 1000,
  pagination: {
    clickable: true,
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
  navigation: {
    nextEl: ".swiper-button-next, offers-button-next",
    prevEl: ".swiper-button-prev, offers-button-prev",
  }
});


// Swiper useful

var swiper3 = new Swiper('.useful__swiper', {
  slidesPerView: 2,
  loop: true,
  spaceBetween: 32,
  slidesPerGroup: 1,
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next, useful-button-next",
    prevEl: ".swiper-button-prev, useful-button-prev",
  }
});
