var feedbackLink = document.querySelector(".contact__button"); 

var mapLink = document.querySelector(".map__link")

var popup = document.querySelector(".feedback-form");

var modalMap = document.querySelector(".modal-map");

var mapClose = modalMap.querySelector(".close-button");

var close = document.querySelector(".close-button");

var username = document.querySelector("[name=username]");

var email = document.querySelector("[name=email]");

var feedbackForm = document.querySelector(".feedback-form");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("username");
} catch (err) {
  isStorageSupport = false;
}

mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalMap.classList.add("modal-show");
});

mapClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    modalMap.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modalMap.classList.contains("modal-show")) {
        modalMap.classList.remove("modal-show");
      }
    }
  });

feedbackLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");

    if (storage) {
        login.value = storage;
    } else {
        username.focus();
    }

});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
});

feedbackForm.addEventListener("submit", function(evt) {
    if (!username.value || !email.value) {
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

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
      }
    }
  });