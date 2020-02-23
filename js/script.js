var feedbackLink = document.querySelector('.contact__button'); 

var popup = document.querySelector(".feedback-form");

var close = popup.querySelector(".close-button");

feedbackLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
});