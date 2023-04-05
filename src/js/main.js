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
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
