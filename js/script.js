var feedbackLink = document.querySelector(".contact__button"); 

var mapLink = document.querySelector(".map__link");

var popup = document.querySelector(".feedback-form");

var modalMap = document.querySelector(".modal-map");

if (modalMap !== null) {
  var mapClose = modalMap.querySelector(".close-button");
} 

var close = document.querySelector(".close-button");

var proceedShopping = document.querySelector(".close-modal-button");

var username = document.querySelector("[name=username]");

var email = document.querySelector("[name=email]");

var message = document.querySelector("[name=message]");

var feedbackForm = document.querySelector(".feedback-form");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("username");
} catch (err) {
  isStorageSupport = false;
}


if (mapLink !== null) {
  mapLink.addEventListener("click", function(evt) {
      evt.preventDefault();
      modalMap.classList.add("modal-show");
  });
}

if (mapLink !== null) {
  mapClose.addEventListener("click", function(evt) {
      evt.preventDefault();
      modalMap.classList.remove("modal-show");
  });
}

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modalMap.classList.contains("modal-show")) {
        modalMap.classList.remove("modal-show");
      }
    }
  });

if (feedbackLink !== null) {
  feedbackLink.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.add("modal-show");

      if (storage) {
          login.value = storage;
      } else {
          username.focus();
      }

  });
}

if (popup !== null) {
  close.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
  });
}


if (feedbackForm !== null) {
  feedbackForm.addEventListener("submit", function(evt) {
      if (!username.value || !email.value || !message.value) {
          evt.preventDefault();
          popup.classList.remove("modal-error");
          popup.offsetWidth = popup.offsetWidth;
          popup.classList.add("modal-error");
      } else {
          if (isStorageSupport) {
              localStorage.setItem("username", username.value);
          }
      }

  });
}

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
      }
    }
  });

var added = document.querySelector(".added-to-cart");

var buttons = document.querySelectorAll(".button--to-cart")
for (var button of buttons) {
  button.addEventListener('click', function(evt) {
    evt.preventDefault();
		added.classList.add("added-to-cart--show");
  })
}

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  added.classList.remove("added-to-cart--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (added.classList.contains("added-to-cart--show")) {
      added.classList.remove("added-to-cart--show");
    }
  }
});

proceedShopping.addEventListener("click", function (evt) {
  evt.preventDefault();
  added.classList.remove("added-to-cart--show");
})