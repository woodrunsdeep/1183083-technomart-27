var feedbackLink = document.querySelector(".contact__button"); 
var feedbackForm = document.querySelector(".feedback-form");

var cart = document.querySelector(".user-navigation__button--cart");
var itemsCounter = (document.getElementById("itemsCounter"));

var bookmarks = document.getElementById("bookmarksQuantity");

var bookmarksButtons = Array.prototype.slice.call(document.querySelectorAll(".button--bookmark"));

var mapLink = document.querySelector(".map__link");
var modalMap = document.querySelector(".modal-map");

var modals = Array.prototype.slice.call(document.querySelectorAll(".modal"));

var buttons = Array.prototype.slice.call(document.querySelectorAll(".button--to-cart"));

var added = document.querySelector(".added-to-cart");

var modalCheckoutButton = added.querySelector(".modal-checkout");

var proceedShopping = added.querySelector(".close-modal-button");

var products = Array.prototype.slice.call(document.querySelectorAll(".product"));

if (feedbackForm !== null) {
  var username = feedbackForm.querySelector("[name=username]");
  var email = feedbackForm.querySelector("[name=email]");
  var message = feedbackForm.querySelector("[name=message]");
  var isStorageSupport = true;
  var storage = "";
  
  try {
    storage = localStorage.getItem("username");
  } catch (err) {
    isStorageSupport = false;
  }
}

if (feedbackLink !== null) {
  feedbackLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackForm.classList.add("modal-show");

    if (storage) {
      username.value = storage;
    } else {
      username.focus();
    }
  });
}

if (feedbackForm !== null) {
  feedbackForm.addEventListener("submit", function(evt) {
    if (!username.value || !email.value || !message.value) {
      evt.preventDefault();
      feedbackForm.classList.remove("modal-error");
      feedbackForm.offsetWidth = feedbackForm.offsetWidth;
      feedbackForm.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
          localStorage.setItem("username", username.value);
        }
      }
  });
}

if (mapLink !== null) {
  mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalMap.classList.add("modal-show");
  });
}

modals.forEach(function(el) {
  var closeModal = el.querySelector(".close-button");
  closeModal.addEventListener("click", function(evt) {
    evt.preventDefault();
    el.classList.remove("modal-show");
    el.classList.remove("modal-error");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (el.classList.contains("modal-show")) {
        el.classList.remove("modal-show");
        el.classList.remove("modal-error");
      }
    }
  });
});

/* Обработчик событий на кнопки "Купить"  
      - появление
      - изменение кол-ва добавленных товаров
      - изменение цвета кнопки "Корзина"
      - фокус на кнопке "Оформить заказ"
      - закрытие окна по нажатию "Продолжить покупки" */

buttons.forEach(function(el) {
  el.addEventListener("click", function() {
    added.classList.add("modal-show");
    itemsCounter.innerHTML++;
    cart.classList.add("user-navigation__button--cart-non-empty");
    modalCheckoutButton.focus();
    proceedShopping.addEventListener("click", function (evt) {
      evt.preventDefault();
      added.classList.remove("modal-show");
    });
    proceedShopping.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 13 || evt.keyCode === 32) {
        evt.preventDefault();
        added.classList.remove("modal-show");
      }
    });
  });
});

bookmarksButtons.forEach(function(el) {
  el.addEventListener("click", function() {
    bookmarks.innerHTML++;
  });
});

function showBtn(product) {
  var productImage = product.querySelector(".product__image");
  var actionButtons = Array.prototype.slice.call(product.querySelectorAll(".action-buttons__button"));
  var buttonWrapper = product.querySelector(".action-buttons");
  
  actionButtons.forEach(function(el) {
    el.addEventListener("focus", function(evt) {
      productImage.classList.add("product__image--hidden");
      buttonWrapper.classList.add("action-buttons--show");
    });
    el.addEventListener("blur", function(evt) {
      productImage.classList.remove("product__image--hidden");
      buttonWrapper.classList.remove("action-buttons--show");
    });
  });
}

for (var i = 0; i < products.length; i++) {
  showBtn(products[i]);
}

var track = document.querySelector(".carousel__track");
var slides = Array.prototype.slice.call(document.querySelectorAll(".carousel__slide"));

var nextButton = document.querySelector(".carousel__button--next");
var prevButton = document.querySelector(".carousel__button--previous");

var dotsNav = document.querySelector(".carousel__nav");
var dots = Array.prototype.slice.call(document.querySelectorAll(".carousel__indicator"));

var slideWidth = slides[0].getBoundingClientRect().width;
var setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

var moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

var updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

var hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.setAttribute("disabled", "");
    nextButton.removeAttribute("disabled", "");
  } else if (targetIndex === slides.length - 1) {
    prevButton.removeAttribute("disabled", "");
    nextButton.setAttribute("disabled", "");
  } else {
    prevButton.removeAttribute("disabled", "");
    nextButton.removeAttribute("disabled", "");
  }
};

prevButton.addEventListener("click", e => {
  var currentSlide = track.querySelector(".current-slide");
  var prevSlide = currentSlide.previousElementSibling;
  var currentDot = dotsNav.querySelector(".current-slide");
  var prevDot = currentDot.previousElementSibling;
  var prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

nextButton.addEventListener("click", e => {
  var currentSlide = track.querySelector(".current-slide");
  var nextSlide = currentSlide.nextElementSibling;
  var currentDot = dotsNav.querySelector(".current-slide");
  var nextDot = currentDot.nextElementSibling;
  var nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

dotsNav.addEventListener("click", e => {
  var targetDot = e.target.closest("button");

  if (!targetDot) return;

  var currentSlide = track.querySelector(".current-slide");
  var currentDot = dotsNav.querySelector(".current-slide");
  var targetIndex = dots.findIndex(dot => dot === targetDot);
  var targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});


// var promoSliderButtons = Array.prototype.slice.call(document.querySelectorAll(".promo-slider-controls__item"));
// var slides = Array.prototype.slice.call(document.querySelectorAll(".promo-slide"));

// var slide1 = document.querySelector(".promo-slider__list .promo-slide-1");

// var slide2 = document.querySelector(".promo-slider__list .promo-slide-2");

// promoSliderButtons.forEach(function(el) {
//   el.addEventListener("click", function(evt) {
//     evt.preventDefault();
//     if (el.classList.contains("previous")) {
//       console.log("prev");
//       slide2.classList.toggle("promo-slide--no-show");
//       slide1.classList.toggle("promo-slide--show");
//       // slides[1].classList.remove("promo-slide--show");
//       // slides[0].classList.add("promo-slide--show");
//       // slides[0].classList.remove("promo-slide--no-show");
//       // slides[1].classList.add("promo-slide--no-show");
//       // slides[0].display="none";
//       // document.querySelector(".indicator").setAttribute("checked", "");
//       // document.querySelector(".indicator--second").removeAttribute("checked");
//       // slides[0].style.display="block";
//       // slides[1].style.display="none";
//       // slides[1].classList.remove("promo-slide--show");
//     } else {
//       console.log("next");
//       slide1.classList.toggle("promo-slide--no-show");
//       slide2.classList.toggle("promo-slide--show");
//       // slide1.style.display="none";
//       // slide2.style.display="block";

//       // slides[0].classList.add("promo-slide--no-show");
//       // slides[1].classList.add("promo-slide--show");
//       // document.querySelector(".indicator--second").setAttribute("checked", "");
//       // document.querySelector(".indicator").removeAttribute("checked");
//       // slides[1].style.display="block";
//       // slides[0].style.display="none";
//       // slides[0].classList.add("promo-slide--no-show");
//     }
//   });
// });

// // function changeSlide(slider)
