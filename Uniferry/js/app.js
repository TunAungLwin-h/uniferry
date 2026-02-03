const ferryListDiv = document.getElementById("ferryList");
const searchBox = document.getElementById("searchBox");
const areaInput = document.getElementById("areaInput");

// Function to get current vehicle position text
function getTrackingText(ferry) {
    const current = ferry.stops[ferry.currentStopIndex];
    const nextIndex = (ferry.currentStopIndex + 1) % ferry.stops.length;
    const next = ferry.stops[nextIndex];
    return `${current} → ${next}`;
}

// Highlight matched pickup point
function formatStops(stops, area) {
    return stops.map(stop => {
        if (area && stop.toLowerCase().includes(area)) {
            return `<span class="highlight">${stop}</span>`;
        } else {
            return stop;
        }
    }).join(", ");
}

// Display ferry list dynamically
function displayFerries(list, areaFilter = "") {
    ferryListDiv.innerHTML = "";

    if (list.length === 0) {
        ferryListDiv.innerHTML = "<p>No vehicles found.</p>";
        return;
    }

    list.forEach(ferry => {
        const statusClass = ferry.status === "Available" ? "available" : "unavailable";

        const div = document.createElement("div");
        div.className = "ferry-card";

        div.innerHTML = `
    <h3>${ferry.name}</h3>
    <p><strong>Route:</strong> ${ferry.route}</p>
    <p><strong>Pickup Points:</strong> ${formatStops(ferry.stops, areaFilter)}</p>
    <p><strong>Time:</strong> ${ferry.time}</p>
    <p><strong>Contact:</strong> ${ferry.contact}</p>

    <span class="badge ${statusClass}">
        ${ferry.status}
    </span>

    <div class="tracking-box">
        <span class="tracking-label">Current Vehicle Position:</span>
        <span id="track-${ferry.id}">
            ${getTrackingText(ferry)}
        </span>
    </div>

    <br><br>
    <a href="vehicle.html?id=${ferry.id}" class="btn">
        View Details
    </a>
`;
        ferryListDiv.appendChild(div);
    });
}

// Filter vehicles by name or area and sort by closest match
function filterFerries() {
    const keyword = searchBox.value.toLowerCase();
    const area = areaInput.value.toLowerCase();

    // Filter vehicles
    let filtered = ferries.filter(ferry => {
        const matchName = ferry.name.toLowerCase().includes(keyword);
        const matchArea = area === "" ||
            ferry.stops.some(stop => stop.toLowerCase().includes(area));
        return matchName && matchArea;
    });

    // Sort: vehicles with the area earlier in their stops come first
    if (area !== "") {
        filtered.sort((a, b) => {
            const indexA = a.stops.findIndex(stop => stop.toLowerCase().includes(area));
            const indexB = b.stops.findIndex(stop => stop.toLowerCase().includes(area));
            return indexA - indexB; // lower index = closer to area
        });
    }

    displayFerries(filtered, area);
}

// Listen to input changes
searchBox.addEventListener("input", filterFerries);
areaInput.addEventListener("input", filterFerries);

// Display all ferries initially
displayFerries(ferries);

// ------------------- Simulated Tracking -------------------
setInterval(() => {
    ferries.forEach(ferry => {
        ferry.currentStopIndex = (ferry.currentStopIndex + 1) % ferry.stops.length;

        const trackEl = document.getElementById(`track-${ferry.id}`);
        if (trackEl) {
            trackEl.textContent = getTrackingText(ferry);
        }
    });
}, 5000);
