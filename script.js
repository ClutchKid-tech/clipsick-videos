const videoData = {
    "Fortnite": [
        { id: 1, title: "Epic Sniper Clutch", views: 500, url: "https://via.placeholder.com/200?text=Video+1" },
        { id: 2, title: "Funny Fall Fail", views: 300, url: "https://via.placeholder.com/200?text=Video+2" },
        { id: 3, title: "Build Battle Win", views: 700, url: "https://via.placeholder.com/200?text=Video+3" }
    ],
    "Minecraft": [
        { id: 4, title: "Creeper Surprise", views: 400, url: "https://via.placeholder.com/200?text=Video+4" }
    ]
};

const gameList = document.getElementById("game-list");
const videoGrid = document.getElementById("video-grid");

Object.keys(videoData).forEach(game => {
    const li = document.createElement("li");
    li.textContent = game;
    li.addEventListener("click", () => loadVideos(game));
    gameList.appendChild(li);
});

function loadVideos(game) {
    videoGrid.innerHTML = "";
    videoData[game].forEach(video => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
            <img src="${video.url}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.views} views</p>
        `;
        videoGrid.appendChild(card);
    });
}

loadVideos("Fortnite");