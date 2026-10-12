
const $ = (id) => document.getElementById(id);

// Set the current year in the footer.
$("year").textContent = new Date().getFullYear();

// Calculate today's date in local time.
const now = new Date();
const today = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

$("date").min = today;

// Scroll to the appointment form.
function goToAppointment() {
    $("appointment").scrollIntoView({
        behavior: "smooth"
    });
}

// Select a doctor and move to the appointment form.
function bookDoctor(doctorName) {
    $("doctor").value = doctorName;
    goToAppointment();
}

// Search doctors by name or specialization.
function searchDoctors() {
    const query = $("search").value.toLowerCase().trim();
    const cards = document.querySelectorAll(".doctor");
    let visibleCount = 0;

    cards.forEach(card => {
        const searchableText = card.dataset.search.toLowerCase();
        const matches = searchableText.includes(query);

        card.style.display = matches ? "" : "none";

        if (matches) {
            visibleCount++;
        }
    });

    $("noResults").hidden = visibleCount !== 0;
}

// Handle appointment form submission.
$("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if ($("date").value < today) {
        $("message").textContent =
            "Please select today or a future date.";
        return;
    }

    const name = $("name").value.trim();
    const doctor = $("doctor").value;
    const date = $("date").value;
    const time = $("time").value;

    $("message").textContent =
        `Thank you, ${name}! Your demo appointment request ` +
        `with ${doctor} on ${date} at ${time} is ready. ` +
        `It has not been sent to a real hospital.`;

    this.reset();

    // Do not allow past dates after resetting.
    $("date").min = today;
});

// Demo login interaction.
function showLogin() {
    const username = prompt("Enter your email or username:");

    if (username === null) {
        return;
    }

    if (username.trim() === "") {
        alert("Please enter your email or username.");
        return;
    }

    alert(
        "Welcome, " + username +
        "! This is a demo login. " +
        "Real authentication needs a backend."
    );
}
