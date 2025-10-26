// Import data from the data.js file
import { podcasts, genres as genreData } from './data.js';

// --- DOM ELEMENT REFERENCES ---
const podcastGrid = document.querySelector('[data-podcast-grid]');

// --- HELPER FUNCTIONS ---

/**
 * Maps genre IDs to their string titles for easy lookup.
 * @returns {Object<string, string>} An object where keys are genre IDs and values are genre titles.
 */
const getGenreMap = () => {
    const genreMap = {};
    for (const genre of genreData) {
        genreMap[genre.id] = genre.title;
    }
    return genreMap;
};

const genreMap = getGenreMap(); // Create the map once for efficiency

/**
 * Converts genre IDs from a podcast object into an array of genre titles.
 * @param {number[]} genreIds - An array of genre IDs (e.g., [1, 2]).
 * @returns {string[]} An array of genre titles (e.g., ["Personal Growth", "Investigative Journalism"]).
 */
const getGenreTitlesByIds = (genreIds) => {
    return genreIds.map(id => genreMap[id]).filter(Boolean); // .filter(Boolean) removes any undefined if ID not found
};

/**
 * Formats a UTC date string into a more human-readable format.
 * @param {string} dateString - The ISO 8601 date string.
 * @returns {string} A formatted date string (e.g., "3 Nov 2022").
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

// --- RENDER FUNCTIONS ---

/**
 * Creates the HTML for a single podcast preview card.
 * @param {object} podcast - The podcast data object.
 * @returns {HTMLElement} A div element representing the podcast preview card.
 */
const createPodcastPreview = (podcast) => {
    const element = document.createElement('div');
    element.className = 'preview-card';
    element.dataset.podcastId = podcast.id; // Crucial for modal functionality

    const genreTitles = getGenreTitlesByIds(podcast.genres);

    element.innerHTML = /*html*/ `
        <img src="${podcast.image}" alt="${podcast.title} cover" class="preview-card__image">
        <div class="preview-card__info">
            <h3 class="preview-card__title">${podcast.title}</h3>
            <p class="preview-card__meta">${podcast.seasons} Seasons</p>
            <div class="preview-card__genres">
                ${genreTitles.map(title => `<span class="genre-tag">${title}</span>`).join('')}
            </div>
            <p class="preview-card__updated">Updated: ${formatDate(podcast.updated)}</p>
        </div>
    `;
    return element;
};

/**
 * Renders all podcasts to the grid.
 * @param {object[]} podcastsToRender - An array of podcast objects to display.
 */
const renderPodcasts = (podcastsToRender) => {
    // Clear the grid before rendering new content
    podcastGrid.innerHTML = '';
    
    // Create a document fragment for performance. Appending to the DOM is slow, so we build everything in memory first.
    const fragment = document.createDocumentFragment();
    for (const podcast of podcastsToRender) {
        const previewElement = createPodcastPreview(podcast);
        fragment.appendChild(previewElement);
    }

    podcastGrid.appendChild(fragment);
};

// --- INITIAL LOAD ---
// Sort podcasts by most recently updated on initial load
const sortedPodcasts = [...podcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
renderPodcasts(sortedPodcasts);