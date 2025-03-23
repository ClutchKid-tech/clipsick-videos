const clipsickData = {
    "Fortnite": [
        { id: 3, title: "Build Battle Win", views: 700, url: "https://via.placeholder.com/200?text=Video+3" }
    ],
    "Minecraft": [
        { id: 4, title: "Creeper Surprise", views: 400, url: "https://via.placeholder.com/200?text=Video+4" }
    ],
    "Call of Duty": [
        { id: 6, title: "Last Second Grenade", views: 600, url: "https://via.placeholder.com/200?text=Video+6" }
    ],
    "Apex Legends": [
        { id: 9, title: "Wraith Portal Play", views: 800, url: "https://via.placeholder.com/200?text=Video+9" }
    ]
};

const gameList = document.getElementById("game-list");
const videoGrid = document.getElementById("video-grid");

Object.keys(clipsickData).forEach(game => {
    const li = document.createElement("li");
    const button = document.createElement("button"); // Use a button for accessibility
    button.textContent = game;
    button.addEventListener("click", () => loadVideos(game));
    li.appendChild(button);
    gameList.appendChild(li);
});

function loadVideos(game) {
    videoGrid.innerHTML = "";
    clipsickData[game].forEach(video => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
            <img src="${video.url}" alt="${video.title}">
            <div class="video-details">
              <h3>${video.title}</h3>
              <p>${video.views} views</p>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

loadVideos("Fortnite"); // Load Fortnite videos initially
