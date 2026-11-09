const reservationForm = document.querySelector(".guest-form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const guestEmail = document.querySelector("#guestEmail");
const guestPhone = document.querySelector("#guestPhone");
const submitButton = document.querySelector(".confirm-reservation");
const displayMessage = document.querySelector("#displayMessage");

if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const requiredFields = [firstName, lastName, guestEmail, guestPhone];
        if (requiredFields.some(function (field) { return !field.value.trim(); })) {
            displayMessage.textContent = "Kindly fill in all required fields.";
            return;
        }

        const email = guestEmail.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayMessage.textContent = "Enter a valid email address.";
            return;
        }

        const originalButtonContent = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.textContent = "Processing...";
        displayMessage.textContent = "";

        setTimeout(function () {
            displayMessage.textContent = "Thank you! Your reservation request has been received.";
            reservationForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;
        }, 1500);
    });
}