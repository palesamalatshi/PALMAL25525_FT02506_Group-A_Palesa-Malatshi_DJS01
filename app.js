/**
 * PodcastApp class encapsulates all UI rendering, filtering, sorting, search,
 * modal open/close logic, and data formatting for the podcast application.
 */
class PodcastApp {
  /**
   * Creates an instance of PodcastApp.
   * @param {Array} podcasts - Array of podcast objects
   * @param {Array} genres - Array of genre objects
   * @param {Array} seasons - Array of season objects linked to podcasts
   */
  constructor(podcasts, genres, seasons) {
    this.podcasts = podcasts;
    this.genres = genres;
    this.seasons = seasons;

    // DOM elements
    this.podcastsGrid = document.getElementById('podcastsGrid');
    this.genreFilter = document.getElementById('genreFilter');
    this.sortFilter = document.getElementById('sortPodcasts');
    this.searchInput = document.getElementById('searchInput');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalContent = document.getElementById('modalContent');
    this.modalClose = document.getElementById('modalClose');

    // Bind methods
    this.init = this.init.bind(this);
    this.renderPodcasts = this.renderPodcasts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.filterSortSearch = this.filterSortSearch.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getGenreNames = this.getGenreNames.bind(this);
    this.getSeasonsByPodcastId = this.getSeasonsByPodcastId.bind(this);

    document.addEventListener('DOMContentLoaded', this.init);
  }

  /**
   * Converts ISO date string to friendly relative time string
   * @param {string} dateString
   * @returns {string}
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  /**
   * Finds genre names given array of genre IDs
   * @param {Array<number>} genreIds
   * @returns {Array<string>}
   */
  getGenreNames(genreIds) {
    return genreIds.map(id => {
      const genre = this.genres.find(g => g.id === id);
      return genre ? genre.title : 'Unknown';
    });
  }

  /**
   * Retrieves seasons array for given podcast ID
   * @param {number|string} podcastId
   * @returns {Array<Object>}
   */
  getSeasonsByPodcastId(podcastId) {
    const seasonsEntry = this.seasons.find(s => String(s.id) === String(podcastId));
    return seasonsEntry ? seasonsEntry.seasonDetails : [];
  }

  /**
   * Renders podcast cards into DOM grid
   * @param {Array} list - list of podcast objects to display
   */
  renderPodcasts(list) {
    this.podcastsGrid.innerHTML = '';
    if (list.length === 0) {
      this.podcastsGrid.innerHTML = '<p>No podcasts found matching your criteria.</p>';
      return;
    }
    list.forEach(p => {
      const genres = this.getGenreNames(p.genres);
      const updated = this.formatDate(p.updated);

      const card = document.createElement('article');
      card.className = 'podcast-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for podcast ${p.title}`);

      card.innerHTML = `
        <div class="card-image">
          <img src="${p.image}" alt="${p.title} cover image" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${p.title}</h3>
          <div class="card-details">
            <div class="card-detail" title="${p.seasons} season${p.seasons !==1 ? 's' : ''}">
              <i class="fas fa-list-ol"></i><span>${p.seasons} season${p.seasons !==1 ? 's' : ''}</span>
            </div>
            <div class="card-detail" title="Last updated">
              <i class="fas fa-clock"></i><span>${updated}</span>
            </div>
          </div>
          <div class="genre-tags">${genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}</div>
          <div class="card-updated">${updated}</div>
        </div>`;

      // Open modal on click or keyboard enter
      card.addEventListener('click', () => this.openModal(p));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(p);
        }
      });

      this.podcastsGrid.appendChild(card);
    });
  }

  /**
   * Opens the modal with full podcast details
   * @param {Object} podcast
   */
  openModal(podcast) {
    const genres = this.getGenreNames(podcast.genres);
    const updated = this.formatDate(podcast.updated);
    const podcastSeasons = this.getSeasonsByPodcastId(podcast.id);

    const seasonsHTML = podcastSeasons.length ?
      podcastSeasons.map(s => `
        <div class="season-item">
          <div class="season-name">${s.title}</div>
          <div class="episode-count">${s.episodes} episode${s.episodes !== 1 ? 's' : ''}</div>
        </div>
      `).join('') :
      '<p>No seasons available</p>';

    this.modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-image">
          <img src="${podcast.image}" alt="${podcast.title} cover" loading="lazy" />
        </div>
        <div class="modal-title-section">
          <h2 class="modal-title">${podcast.title}</h2>
          <p class="modal-description">${podcast.description}</p>
          <div class="modal-genres">${genres.map(g => `<span class="modal-genre">${g}</span>`).join('')}</div>
          <div style="margin-top: 10px; color: var(--text-muted);"><i class="fas fa-clock"></i> Last updated: ${updated}</div>
        </div>
      </div>
      <div class="seasons-section">
        <h3 class="seasons-title">Seasons</h3>
        ${seasonsHTML}
      </div>
    `;

    this.modalOverlay.classList.add('active');
    this.modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  /**
   * Closes the modal and resets overlay state
   */
  closeModal() {
    this.modalOverlay.classList.remove('active');
    this.modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scroll
  }

  /**
   * Filters, sorts, and searches podcasts based on UI controls
   */
  filterSortSearch() {
    let filtered = [...this.podcasts];

    const genreValue = this.genreFilter.value;
    const sortValue = this.sortFilter.value;
    const searchTerm = this.searchInput.value.trim().toLowerCase();

    // Filter by genre
    if (genreValue !== 'all') {
      const genreId = parseInt(genreValue, 10);
      filtered = filtered.filter(p => p.genres.includes(genreId));
    }

    // Filter by search term in title or description
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort podcasts
    switch (sortValue) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'seasons':
        filtered.sort((a, b) => b.seasons - a.seasons);
        break;
      case 'updated':
      default:
        filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    this.renderPodcasts(filtered);
  }

  /**
   * Initializes the app:
   * - Populates filters
   * - Renders podcasts
   * - Binds event listeners
   */
  init() {
    // Populate genre filter options from genres array
    this.genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.title;
      this.genreFilter.appendChild(option);
    });

    // Initial render of all podcasts
    this.renderPodcasts(this.podcasts);

    // Event bindings
    this.genreFilter.addEventListener('change', this.filterSortSearch);
    this.sortFilter.addEventListener('change', this.filterSortSearch);
    this.searchInput.addEventListener('input', this.filterSortSearch);
    this.modalClose.addEventListener('click', this.closeModal.bind(this));
    this.modalOverlay.addEventListener('click', e => {
      if (e.target === this.modalOverlay) this.closeModal();
    });

    // Close modal on Esc key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
}

// Instantiate app with data from data.js
new PodcastApp(podcasts, genres, seasons);
