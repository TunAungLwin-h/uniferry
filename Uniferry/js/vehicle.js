const params = new URLSearchParams(window.location.search);
const vehicleId = params.get("id");

const vehicle = ferries.find(v => v.id == vehicleId);

const container = document.getElementById("vehicleDetail");

if (!vehicle) {
    container.innerHTML = "<p>Vehicle not found.</p>";
} else {

    function getTrackingText() {
        const current = vehicle.stops[vehicle.currentStopIndex];
        const nextIndex =
            (vehicle.currentStopIndex + 1) % vehicle.stops.length;
        const next = vehicle.stops[nextIndex];
        return `${current} → ${next}`;
    }

    container.innerHTML = `
        <h2>${vehicle.name}</h2>
        <p><strong>Route:</strong> ${vehicle.route}</p>
        <p><strong>Operating Time:</strong> ${vehicle.time}</p>
        <p><strong>Contact:</strong> ${vehicle.contact}</p>
        <p><strong>Status:</strong> ${vehicle.status}</p>

        <h3>Pickup Points</h3>
        <ul>
            ${vehicle.stops.map(stop => `<li>${stop}</li>`).join("")}
        </ul>

        <div class="tracking-box">
            <span class="tracking-label">Current Vehicle Position:</span>
            <span id="track">${getTrackingText()}</span>
        </div>
    `;

    // Simulated tracking update
    setInterval(() => {
        vehicle.currentStopIndex =
            (vehicle.currentStopIndex + 1) % vehicle.stops.length;

        document.getElementById("track").textContent =
            getTrackingText();
    }, 5000);
}
