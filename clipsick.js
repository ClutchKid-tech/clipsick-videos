const topTenGamesData = {
    "action": ["Grand Theft Auto V", "Call of Duty: Modern Warfare", "Fortnite", "Apex Legends", "Doom Eternal", "Cyberpunk 2077", "Assassin's Creed Valhalla", "Marvel's Spider-Man", "Elden Ring", "God of War Ragnarök"],
    "adventure": ["The Legend of Zelda: Breath of the Wild", "Red Dead Redemption 2", "The Last of Us Part II", "Uncharted 4: A Thief's End", "Minecraft", "Stardew Valley", "The Witcher 3: Wild Hunt", "Ghost of Tsushima", "Hollow Knight", "Outer Wilds"],
    "strategy": ["StarCraft II", "Age of Empires IV", "Civilization VI", "Crusader Kings III", "Total War: Warhammer III", "XCOM 2", "Stellaris", "Anno 1800", "Frostpunk", "Slay the Spire"]
    // Add more top ten game lists for other genres
};

async function searchYouTubeVideos(query) {
    const apiKey = null; // Replace with your actual Google API key if you want to use the YouTube API directly
    const maxResults = 10;
    const safeQuery = encodeURIComponent(query);

    if (apiKey) {
        // Using YouTube Data API (requires API key)
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${safeQuery}&maxResults=${maxResults}&type=video&key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items) {
                return data.items.map(item => `http://www.youtube.com/watch?v=${item.id.videoId}`);
            }
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
            return ["Error fetching videos."];
        }
    } else {
        // Using a simpler Google Search (less precise but doesn't require API key)
        const searchUrl = `https://www.google.com/search?q=${safeQuery}&tbm=vid`;
        return [`Search results for "${query}" on YouTube: <a href="${searchUrl}" target="_blank">${searchUrl}</a>`];
    }
    return;
}

function displayTopTenGames(genre) {
    console.log("displayTopTenGames called for:", genre); // Check if the function is called
    const mainContent = document.getElementById("main-content");
    console.log("mainContent element:", mainContent); // Check if the mainContent element is found
    mainContent.innerHTML = `<h2>Top Ten ${genre.charAt(0).toUpperCase() + genre.slice(1)} Games</h2><ul id="${genre}-top-games"></ul>`;
    const topGamesList = document.getElementById(`${genre}-top-games`);
    console.log("topGamesList element:", topGamesList); // Check if the topGamesList element is found
    const games = topTenGamesData[genre];
    console.log("games data:", games); // Check if the games data is retrieved

    if (games) {
        games.forEach(game => {
            const listItem = document.createElement("li");
            const gameButton = document.createElement("button");
            gameButton.textContent = game;
            gameButton.addEventListener("click", () => loadFunnyAndClutchMoments(game, genre));
            listItem.appendChild(gameButton);
            topGamesList.appendChild(listItem);
        });
    } else {
        mainContent.innerHTML = `<p>No top ten games found for ${genre}.</p>`;
        console.log("No top ten games found for genre:", genre); // Check if this branch is executed
    }
}

async function loadFunnyAndClutchMoments(game, genre) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `<h2>${game} - Funny & Clutch Moments</h2><div id="funny-moments"><h3>Top Ten Funniest Moments</h3><ul id="funny-videos"></ul></div><div id="clutch-moments"><h3>Top Ten Clutch Moments</h3><ul id="clutch-videos"></ul></div>`;
    const funnyVideosList = document.getElementById("funny-moments").querySelector("ul");
    const clutchVideosList = document.getElementById("clutch-moments").querySelector("ul");

    const funnyQuery = `Top 10 funniest moments in ${game} gameplay`;
    const clutchQuery = `Top 10 clutch moments in ${game} gameplay`;

    const funnyVideos = await searchYouTubeVideos(funnyQuery);
    const clutchVideos = await searchYouTubeVideos(clutchQuery);

    funnyVideos.forEach(url => {
        const listItem = document.createElement("li");
        listItem.innerHTML = typeof url === 'string' && url.startsWith('http') ? `<iframe width="560" height="315" src="${url.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>` : url;
        funnyVideosList.appendChild(listItem);
    });

    clutchVideos.forEach(url => {
        const listItem = document.createElement("li");
        listItem.innerHTML = typeof url === 'string' && url.startsWith('http') ? `<iframe width="560" height="315" src="${url.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>` : url;
        clutchVideosList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll('header nav ul li a');
    genreLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const genre = this.dataset.genre;
            console.log("Genre link clicked:", genre);
            displayTopTenGames(genre);
        });
    });
});
