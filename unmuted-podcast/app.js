// Sample Podcast Data
const podcasts = [
  {
    title: "Women’s Voices",
    coverImage: "images/women_voices.jpg",
    genres: ["Women", "Empowerment", "Stories"],
    seasons: [
      {
        title: "Rising Strong",
        lastUpdated: new Date("2026-01-20"),
        episodes: [
          { title: "Breaking Barriers", duration: "30:45", description: "Inspiring stories of resilience" },
          { title: "Finding Your Voice", duration: "25:10", description: "Women speaking up" }
        ]
      }
    ]
  },
  {
    title: "LGBTQIA+ Stories",
    coverImage: "images/lgbtqia_stories.jpg",
    genres: ["LGBTQIA+", "Identity", "Empowerment"],
    seasons: [
      {
        title: "Coming Out",
        lastUpdated: new Date("2026-01-18"),
        episodes: [
          { title: "First Steps", duration: "28:50", description: "Sharing the journey of acceptance" }
        ]
      }
    ]
  }
];

// Utility Functions
function formatDate(date) {
  return date.toDateString();
}

// Render Podcast List
function renderPodcastList(podcasts, container) {
  container.innerHTML = '';
  podcasts.forEach(podcast => {
    const card = document.createElement('div');
    card.className = 'podcast-card';
    card.innerHTML = `
      <img src="${podcast.coverImage}" alt="${podcast.title} cover">
      <h3>${podcast.title}</h3>
      <p>${podcast.seasons.length} seasons</p>
      <p>Genres: ${podcast.genres.join(', ')}</p>
      <p>Last updated: ${formatDate(podcast.seasons[podcast.seasons.length-1].lastUpdated)}</p>
    `;
    card.addEventListener('click', () => openPodcastModal(podcast));
    container.appendChild(card);
  });
}

// Modal Logic
function openPodcastModal(podcast) {
  const modal = document.getElementById('podcastModal');
  modal.querySelector('.modal-title').textContent = podcast.title;
  modal.querySelector('.modal-image').src = podcast.coverImage;
  modal.querySelector('.modal-genres').textContent = "Genres: " + podcast.genres.join(', ');
  modal.querySelector('.modal-last-updated').textContent = "Last Updated: " +
    formatDate(podcast.seasons[podcast.seasons.length-1].lastUpdated);

  const seasonContainer = modal.querySelector('.modal-seasons');
  seasonContainer.innerHTML = '';
  podcast.seasons.forEach(season => {
    const seasonEl = document.createElement('div');
    seasonEl.innerHTML = `<h4>${season.title} (${season.episodes.length} episodes)</h4>`;
    const epList = document.createElement('ul');
    season.episodes.forEach(ep => {
      const epItem = document.createElement('li');
      epItem.textContent = `${ep.title} (${ep.duration}) - ${ep.description}`;
      epList.appendChild(epItem);
    });
    seasonEl.appendChild(epList);
    seasonContainer.appendChild(seasonEl);
  });

  modal.style.display = 'flex';
}

// Close modal
document.querySelector('.modal-close').addEventListener('click', () => {
  document.getElementById('podcastModal').style.display = 'none';
});

// Initial Render
renderPodcastList(podcasts, document.getElementById('podcast-container'));
