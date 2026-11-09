function sendMessage() {
    const name = document.querySelector("#contactName").value.trim();
    const email = document.querySelector("#contactEmail").value.trim();
    const subject = document.querySelector("#contactSubject").value.trim();
    const message = document.querySelector("#contactMessage").value.trim();
    const displayMessage = document.querySelector("#displayMessage");
    const button = document.querySelector(".send-message");
    if (!name || !email || !subject || !message) {
        displayMessage.textContent = "Please fill in all fields.";
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        displayMessage.textContent = "Enter a valid email address.";
        return;
    }
    button.disabled = true;
    button.textContent = "Sending...";
    setTimeout(function() {
        displayMessage.textContent = "Thank you! Your message has been received.";
        document.querySelector("#contactName").value = "";
        document.querySelector("#contactEmail").value = "";
        document.querySelector("#contactSubject").value = "";
        document.querySelector("#contactMessage").value = "";
        button.disabled = false;
        button.textContent = "Send Message";
    }, 1500);
}