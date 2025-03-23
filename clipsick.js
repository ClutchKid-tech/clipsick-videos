const clipsickData = {
    "Action Games": [
        { id: 1, title: "Epic Boss Fight", views: 1200, embedUrl: "YOUR_ACTION_VIDEO_EMBED_URL_1" },
        { id: 2, title: "High-Speed Chase", views: 950, embedUrl: "YOUR_ACTION_VIDEO_EMBED_URL_2" },
        // Add more action game videos here
    ],
    "Adventure Games": [
        { id: 3, title: "Exploring Ancient Ruins", views: 780, embedUrl: "YOUR_ADVENTURE_VIDEO_EMBED_URL_1" },
        { id: 4, title: "Unraveling the Mystery", views: 620, embedUrl: "YOUR_ADVENTURE_VIDEO_EMBED_URL_2" },
        // Add more adventure game videos here
    ],
    "Strategy Games": [
        { id: 5, title: "Flawless Victory", views: 1500, embedUrl: "YOUR_STRATEGY_VIDEO_EMBED_URL_1" },
        { id: 6, title: "Building the Ultimate Base", views: 1100, embedUrl: "YOUR_STRATEGY_VIDEO_EMBED_URL_2" },
        // Add more strategy game videos here
    ],
    // Add more game genres and their videos here
};

function loadVideos(genre, videos) {
    const videoGrid = document.querySelector(`#${genre.toLowerCase().replace(/ /g, '-')}-games .video-grid`);

    if (!videoGrid) {
        console.error(`Video grid not found for genre: ${genre}`);
        return;
    }

    videoGrid.innerHTML = ""; // Clear previous videos

    if (videos && videos.length > 0) {
        videos.forEach(video => {
            const videoContainer = document.createElement("div");
            videoContainer.className = "video-container";
            videoContainer.innerHTML = `
                <iframe width="560" height="315" src="${video.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="video-details">
                    <h3>${video.title}</h3>
                    <p>${video.views} views</p>
                </div>
            `;
            videoGrid.appendChild(videoContainer);
        });
    } else {
        videoGrid.innerHTML = "<p>No videos available for this genre yet.</p>";
    }
}

// Load videos for each genre
for (const genre in clipsickData) {
    if (clipsickData.hasOwnProperty(genre)) {
        loadVideos(genre, clipsickData[genre]);
    }
}
