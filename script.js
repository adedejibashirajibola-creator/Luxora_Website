// LUXORA homepage interactions
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("siteNavbar");
    const bookingForm = document.getElementById("bookingBox");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const roomType = document.getElementById("roomType");
    const bookingMessage = document.getElementById("bookingMessage");
    const currentYear = document.getElementById("currentYear");

    // Keep the navigation background visible after the visitor scrolls.
    function updateNavbar() {
        if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 35);
    }   
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Set today's date as the earliest selectable check-in date.
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().split("T")[0];

    if (checkin) {
        checkin.min = localToday;
        checkin.addEventListener("change", function () {
            if (checkout) {
                checkout.min = checkin.value || localToday;
                if (checkout.value && checkout.value <= checkin.value) {
                    checkout.value = "";
                }
            }
        });
    }
    if (checkout) checkout.min = localToday;

    // This is an estimate only; it does not create a real reservation.
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const start = new Date(checkin.value + "T00:00:00");
            const end = new Date(checkout.value + "T00:00:00");

            if (!checkin.value || !checkout.value) {
                bookingMessage.textContent = "Please select both your check-in and check-out dates.";
                bookingMessage.style.color = "#a13b32";
                return;
            }

            const nights = Math.round((end - start) / 86400000);
            if (!Number.isFinite(nights) || nights <= 0) {
                bookingMessage.textContent = "Your check-out date must be later than your check-in date.";
                bookingMessage.style.color = "#a13b32";
                return;
            }

            const prices = {
                standard: 35000,
                deluxe: 50000,
                executive: 80000
            };

            const selectedRoom = roomType.value;
            const total = prices[selectedRoom] * nights;
            const formattedTotal = new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 0
            }).format(total);

            bookingMessage.style.color = "#345b3b";
            bookingMessage.textContent = "Estimated stay: " + nights + " night(s) · " + formattedTotal +
                ". This is an estimate, not a confirmed reservation.";
        });
    }

    // Reveal content as it enters the viewport.
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("visible");
        });
    }

    if (currentYear) currentYear.textContent = new Date().getFullYear();

    // Close the mobile navigation after a same-page link is selected.
    document.querySelectorAll("#mainNav a[href^='#']").forEach(function (link) {
        link.addEventListener("click", function () {
            const nav = document.getElementById("mainNav");
            if (nav && nav.classList.contains("show") && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });
});
