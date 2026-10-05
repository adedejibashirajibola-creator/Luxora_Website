const roomType = document.getElementById("roomType");
const travellers = document.getElementById("travelers");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const bookingBox = document.getElementById("bookingBox");

bookingBox.addEventListener("submit", function(event) {
    event.preventDefault();

    const checkInValue = checkin.value;
    const checkOutValue = checkout.value;
    const roomTypeValue = roomType.value;
    const travellersValue = travellers.value;

    if (!checkInValue || !checkOutValue) {
        alert("Date Missing");
    } else {
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);

        if (checkInDate < checkOutDate) {
            let roomPrice;

            if (roomTypeValue === "Standard Room") {
                roomPrice = 35000;
            } else if (roomTypeValue === "Deluxe Room") {
                roomPrice = 50000;
            } else if (roomTypeValue === "Executive Suite") {
                roomPrice = 80000;
            }

            const difference = checkOutDate - checkInDate;
            const nights = difference / (1000 * 60 * 60 * 24);
            const totalPrice = roomPrice * nights;

            alert(`Room: ${roomTypeValue}
Guests: ${travellersValue}
Nights: ${nights}
Total: ₦${totalPrice}`);
        } else {
            alert("Invalid Booking");
        }
    }
});

function exploreButton(button) {
    let standardName = document.getElementById("standardName").textContent;
    let standardPrice = document.getElementById("standardPrice").textContent;
    let deluxeName = document.getElementById("deluxeName").textContent;
    let deluxePrice = document.getElementById("deluxePrice").textContent;
    let executiveName = document.getElementById("executiveName").textContent;
    let executivePrice = document.getElementById("executivePrice").textContent;

    if (button.id === "standard") {
        alert(`Room Type: ${standardName}
Price: ${standardPrice}`);
    } else if (button.id === "deluxe") {
        alert(`Room Type: ${deluxeName}
Price: ${deluxePrice}`);
    } else if (button.id === "executive") {
        alert(`Room Type: ${executiveName}
Price: ${executivePrice}`);
    }
}
