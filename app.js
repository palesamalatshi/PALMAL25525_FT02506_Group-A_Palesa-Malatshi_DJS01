// Use your provided podcasts array imported from data.js
// Assume genres array is also provided for mapping genre IDs/names

const podcastGrid = document.getElementById('podcastGrid');
const modal = document.getElementById('podcastModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = modal.querySelector('.close');
const genreFilter = document.getElementById('genreFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');

// Populate genres filter dynamically from genres list
function populateGenreFilter() {
  genres.forEach(g => {
    const option = document.createElement('option');
    option.value = g.title;
    option.textContent = g.title;
    genreFilter.appendChild(option);
  });
}

// Render podcasts to grid
function renderGrid(list) {
  podcastGrid.innerHTML = '';
  if (list.length === 0) {
    podcastGrid.innerHTML = '<p>No podcasts found.</p>';
    return;
  }
  list.forEach(pod => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${pod.image}" alt="${pod.title} cover" />
      <div class="title">${pod.title}</div>
      <div>${pod.seasons} seasons</div>
      <div class="tags">
        ${pod.genres.map(id => {
          const genreObj = genres.find(g => g.id === id);
          return `<span class="tag">${genreObj ? genreObj.title : 'N/A'}</span>`;
        }).join('')}
      </div>
      <small>Updated: ${new Date(pod.updated).toLocaleDateString()}</small>
    `;

    card.onclick = () => openModal(pod);
    podcastGrid.appendChild(card);
  });
}

// Modal open
function openModal(podcast) {
  modal.classList.remove('hidden');
  modalBody.innerHTML = `
    <div class="modal-header">
      <img src="${podcast.image}" alt="cover" />
      <div class="modal-details">
        <h2 id="modalTitle">${podcast.title}</h2>
        <p>${podcast.description}</p>
        <div class="tags">
          ${podcast.genres.map(id => {
            const genreObj = genres.find(g => g.id === id);
            return `<span class="tag">${genreObj ? genreObj.title : 'N/A'}</span>`;
          }).join('')}
        </div>
        <div class="updated">📅 Last updated: ${new Date(podcast.updated).toLocaleDateString()}</div>
      </div>
    </div>
    <div class="seasons">
      <h3>Seasons</h3>
      ${podcastSeasonsHTML(podcast.id)}
    </div>
  `;
}

// Helper to build seasons HTML
function podcastSeasonsHTML(podcastId) {
  const seasonEntry = seasons.find(s => s.id === podcastId);
  if (!seasonEntry) return '<p>No seasons available</p>';
  return seasonEntry.seasonDetails.map(season => `
    <div class="season-item">
      <div class="season-info">
        <h4>${season.title}</h4>
        <p>${season.episodes} episodes</p>
      </div>
    </div>
  `).join('');
}

// Close modal
closeBtn.onclick = () => modal.classList.add('hidden');
modal.onclick = e => {
  if (e.target === modal) modal.classList.add('hidden');
};

// Filtering logic including search and sorting
function applyFilters() {
  let filtered = [...podcasts];

  // Filter by genre
  if (genreFilter.value !== 'all') {
    filtered = filtered.filter(p => {
      return p.genres.some(id => {
        const genreObj = genres.find(g => g.id === id);
        return genreObj && genreObj.title === genreFilter.value;
      });
    });
  }

  // Search filter
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sorting
  if (sortFilter.value === 'recent') {
    filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  } else if (sortFilter.value === 'seasons') {
    filtered.sort((a, b) => b.seasons - a.seasons);
  }

  renderGrid(filtered);
}

genreFilter.onchange = applyFilters;
sortFilter.onchange = applyFilters;
searchInput.oninput = applyFilters;

// Initialize app
populateGenreFilter();
applyFilters();
