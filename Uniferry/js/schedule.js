const scheduleList = document.getElementById("scheduleList");

function getScheduleCard(vehicle) {
    const statusClass = vehicle.status === "Available" ? "available" : "unavailable";

    return `
    <div class="ferry-card">
        <h3>${vehicle.name}</h3>
        <p><strong>Route:</strong> ${vehicle.route}</p>
        <p><strong>Operating Time:</strong> ${vehicle.time}</p>
        <p><strong>Pickup Points:</strong> ${vehicle.stops.join(", ")}</p>
        <p><strong>Status:</strong> 
            <span class="badge ${statusClass}">${vehicle.status}</span>
        </p>
        <a href="vehicle.html?id=${vehicle.id}" class="btn">
            View Details
        </a>
    </div>
    `;
}

// Display all vehicle schedules
function displaySchedule() {
    scheduleList.innerHTML = ferries.map(vehicle => getScheduleCard(vehicle)).join("");
}

displaySchedule();
