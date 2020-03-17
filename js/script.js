var feedbackLink = document.querySelector(".contact__button"); 
var feedbackForm = document.querySelector(".feedback-form");

var cart = document.querySelector(".user-navigation__button--cart");
var itemsCounter = (document.getElementById("itemsCounter"));

var bookmarksButtons = Array.prototype.slice.call(document.querySelectorAll(".button--bookmark"));

var mapLink = document.querySelector(".map__link");
var modalMap = document.querySelector(".modal-map");

var modals = Array.prototype.slice.call(document.querySelectorAll(".modal"));

var buttons = Array.prototype.slice.call(document.querySelectorAll(".button--to-cart"));

var added = document.querySelector(".added-to-cart");

var modalCheckoutButton = added.querySelector(".modal-checkout");

var proceedShopping = added.querySelector(".close-modal-button");

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
  });
});

bookmarksButtons.forEach(function(el) {
  el.addEventListener("click", function() {
    var bookmarks = document.getElementById("bookmarksQuantity");
    bookmarks.innerHTML++;
  });
});