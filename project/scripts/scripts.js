// Module to handle modals for music tracks
const modalModule = (() => {
    // Open modal
    function openModal(trackId) {
        document.getElementById(`${trackId}-modal`).style.display = "flex";
    }

    // Close modal
    function closeModal(trackId) {
        document.getElementById(`${trackId}-modal`).style.display = "none";
    }

    return { openModal, closeModal };
})();

// Module to handle form submission and validation
const formModule = (() => {
    // Display form data on form action page (simulation)
    function handleSubmit(event) {
        event.preventDefault(); // Prevent form from submitting traditionally
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };
        alert(`Thank you, ${formData.name}! Your message has been received.`);
    }

    return { handleSubmit };
})();

// Module to handle loading and displaying tracks with API data
const trackModule = (() => {
    async function fetchTrackData() {
        try {
            const response = await fetch("https://api.rayrae/Zaraj-call"); 
            const data = await response.json();
            displayTracks(data);
            saveVisitTime();
        } catch (error) {
            console.error("Error fetching track data:", error);
        }
    }

    function displayTracks(tracks) {
        const trackList = document.querySelector(".track-list");
        trackList.innerHTML = tracks
            .map(
                (track, index) => `
            <div class="track-item" onclick="modalModule.openModal('track${index + 1}')">
                <h3>${track.title}</h3>
                <p>Genre: ${track.genre}</p>
                <div class="modal" id="track${index + 1}-modal">
                    <div class="modal-content">
                        <span class="close" onclick="modalModule.closeModal('track${index + 1}')">&times;</span>
                        <h3>${track.title}</h3>
                        <p>${track.description}</p>
                    </div>
                </div>
            </div>`
            )
            .join("");
    }

    return { fetchTrackData };
})();

// Module to handle visit tracking with local storage
const visitModule = (() => {
    function saveVisitTime() {
        const visitTime = new Date().toLocaleString();
        localStorage.setItem("lastVisit", visitTime);
        displayLastVisit();
    }

    function displayLastVisit() {
        const lastVisit = localStorage.getItem("lastVisit");
        if (lastVisit) {
            document.getElementById("last-visit").innerText = `Last visited on: ${lastVisit}`;
        }
    }

    return { saveVisitTime, displayLastVisit };
})();

// Event listener for form submission
document.getElementById("contact-form").addEventListener("submit", formModule.handleSubmit);

// Fetch track data and handle visit time on page load
window.addEventListener("load", () => {
    trackModule.fetchTrackData();
    visitModule.displayLastVisit();
});
