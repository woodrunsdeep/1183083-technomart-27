// var feedbackLink = document.querySelector(".contact__button"); 

// if (feedbackLink !== null) {
//   var feedbackForm = document.querySelector(".feedback-form");
//   var close = feedbackForm.querySelector(".close-button");
  
//   var username = feedbackForm.querySelector("[name=username]");
//   var email = feedbackForm.querySelector("[name=email]");
//   var message = feedbackForm.querySelector("[name=message]");
  
//   feedbackLink.addEventListener("click", function(evt) {
//       evt.preventDefault();
//       feedbackForm.classList.add("modal-show");
//       username.focus();
//   });

//   close.addEventListener("click", function(evt) {
//       evt.preventDefault();
//       feedbackForm.classList.remove("modal-show");
//   });
// }

// feedbackForm.addEventListener("submit", )

var feedbackLink = document.querySelector(".contact__button"); 

var feedbackForm = document.querySelector(".feedback-form");

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

var itemsInCart = (document.getElementById("itemsCounter")).innerHTML;

var itemsQuantity = parseInt(itemsInCart);

var bookmarksButtons = Array.prototype.slice.call(document.querySelectorAll(".button--bookmark"));

var cart = document.querySelector(".user-navigation__button--cart");

var mapLink = document.querySelector(".map__link");

var modalMap = document.querySelector(".modal-map");

if (mapLink !== null) {
  mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalMap.classList.add("modal-show");
  });
}

var modals = Array.prototype.slice.call(document.querySelectorAll(".modal"));

modals.forEach(function(el) {
        var closeModal = el.querySelector(".close-button");
        closeModal.addEventListener("click", function(evt) {
            evt.preventDefault();
            el.classList.remove("modal-show");
        });

        window.addEventListener("keydown", function (evt) {
          if (evt.keyCode === 27) {
            evt.preventDefault();
            if (el.classList.contains("modal-show")) {
              el.classList.remove("modal-show");
            }
          }
        });
});

var buttons = Array.prototype.slice.call(document.querySelectorAll(".button--to-cart"));

var added = document.querySelector(".added-to-cart");

/*  Обработчик событий на кнопки "Купить"  
      - появление
      - изменение кол-ва добавленных товаров
      - изменение цвета кнопки "Корзина"
      - фокус на кнопке "Оформить заказ"  */

buttons.forEach(function(el) {
  el.addEventListener('click', function() {
    added.classList.add("modal-show");

    // itemsQuantity++;
    itemsCounter.innerHTML++;
    cart.classList.add("user-navigation__button--cart-non-empty");
    var modalCheckoutButton = added.querySelector(".modal-checkout");
    modalCheckoutButton.focus();
    var proceedShopping = added.querySelector(".close-modal-button");
    proceedShopping.addEventListener("click", function (evt) {
      evt.preventDefault();
      added.classList.remove("modal-show");
    });
  });
});

bookmarksButtons.forEach(function(el) {
  el.addEventListener('click', function() {
        var bookmarks = document.getElementById("bookmarksQuantity");
        var bookmarksCounter = parseInt(bookmarks.innerHTML);
        // bookmarksCounter++;
        bookmarks.innerHTML++;
      });
});