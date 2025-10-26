// DOM Elements
const podcastGrid = document.getElementById('podcastsGrid');
const modal = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalContent');
const closeBtn = document.getElementById('modalClose');
const genreFilter = document.getElementById('genreFilter');
const sortFilter = document.getElementById('sortPodcasts');
const searchInput = document.getElementById('searchInput');

// Populate genre filter options
function populateGenreFilter() {
  genres.forEach(g => {
    const option = document.createElement('option');
    option.value = g.id;
    option.textContent = g.title;
    genreFilter.appendChild(option);
  });
}

// Render podcasts grid
function renderPodcastsGrid(podcasts) {
  podcastGrid.innerHTML = '';
  if (podcasts.length === 0) {
    podcastGrid.innerHTML = '<p>No podcasts found.</p>';
    return;
  }
  podcasts.forEach(pod => {
    const card = document.createElement('article');
    card.className = 'podcast-card';
    card.tabIndex = 0;
    card.role = 'button';
    card.ariaLabel = `Open details for podcast ${pod.title}`;
    card.innerHTML = `
      <div class="card-image"><img src="${pod.image}" alt="${pod.title} cover" loading="lazy" /></div>
      <div class="card-content">
        <h3 class="card-title">${pod.title}</h3>
        <div class="genre-tags">
          ${pod.genres.map(id => {
            const genreTitle = genres.find(g => g.id === id)?.title || 'Unknown';
            return `<span class="genre-tag">${genreTitle}</span>`;
          }).join('')}
        </div>
        <p>Seasons: ${pod.seasons}</p>
        <p class="card-updated">Last Updated: ${new Date(pod.updated).toLocaleDateString()}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(pod));
    podcastGrid.appendChild(card);
  });
}

// Open modal with details
function openModal(podcast) {
  const seasonEntry = seasons.find(s => s.id === podcast.id);
  const seasonHTML = seasonEntry ? seasonEntry.seasonDetails.map(season =>
    `<div class="season-item">
      <div class="season-info">
        <h4>${season.title}</h4>
        <p>${season.episodes} episodes</p>
      </div>
    </div>`).join('') : '<p>No seasons available</p>';

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-image">
        <img src="${podcast.image}" alt="${podcast.title} cover" />
      </div>
      <div class="modal-title-section">
        <h2 class="modal-title">${podcast.title}</h2>
        <p class="modal-description">${podcast.description}</p>
        <div class="modal-genres">${pod.genres.map(id => {
          const genreTitle = genres.find(g => g.id === id)?.title || 'Unknown';
          return `<span class="modal-genre">${genreTitle}</span>`;
        }).join('')}</div>
        <div style="margin-top: 10px; color: var(--text-muted);">
          <i class="fas fa-clock"></i> Last updated: ${new Date(podcast.updated).toLocaleDateString()}
        </div>
      </div>
    </div>
    <div class="seasons-section">
      <h3 class="seasons-title">Seasons</h3>
      ${seasonHTML}
    </div>
  `;
  document.body.style.overflow = 'hidden';
}

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeBtn.click();
  }
});

// Filter, sort, and search podcasts
function applyFilters() {
  let filtered = [...podcasts];

  // Filter by genre id
  if (genreFilter.value !== 'all') {
    const filterGenreId = parseInt(genreFilter.value, 10);
    filtered = filtered.filter(p => p.genres.includes(filterGenreId));
  }

  // Filter by search
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sorting
  if (sortFilter.value === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortFilter.value === 'seasons') {
    filtered.sort((a, b) => b.seasons - a.seasons);
  } else { // default recently updated
    filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }

  renderPodcastsGrid(filtered);
}

// Handlers for UI events
genreFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// Init
populateGenreFilter();
applyFilters();
