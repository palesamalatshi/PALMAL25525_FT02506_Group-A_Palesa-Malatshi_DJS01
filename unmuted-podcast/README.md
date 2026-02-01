# Unmuted Podcast App

A **modular Vanilla JavaScript application** that displays a curated list of podcasts as cards and shows detailed information in a modal when a card is clicked. Designed for accessibility, clean UX, and easy maintainability.

---

## Features

- Dynamic rendering of **podcast cards** with cover images, titles, genres, and last updated dates.
- Modal with **detailed information**:
  - Full description
  - Genres/themes
  - Seasons and episode counts
- Clean **date formatting** for last updated timestamps.
- Modular design using **factory functions** for cards and modals.
- **Single Responsibility Principle (SRP)**-compliant utilities and components.
- Responsive design for **mobile and desktop**.
- Darkened background blur when modal is open for better focus.

---

## Project Structure

/src
│
├── components/
│ ├── createPodcastCard.js # Factory function to render podcast cards
│ └── createModal.js # Factory function to render modals
│
├── utils/
│ ├── DateUtils.js # Functions for formatting dates
│ └── GenreService.js # Helper functions for genre/theme mapping
│
├── views/
│ └── createGrid.js # Builds the main grid layout
│
├── data.js # Podcast, genres, and seasons data
└── index.js # Entry point; initializes grid and modal behavior


---

## How to Run

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Browse through podcast cards.
4. Click a podcast card to open the **modal** with detailed info.
5. Click the "×" button or the background to **close the modal**.

---

## Notes

- Each podcast has a **unique cover image** and **last updated date**.
- Genres are referred to as **themes** in the app.
- Responsive layout ensures usability on mobile and desktop.
- The modal automatically blurs the background content when open.

---

## Tech Stack

- **Vanilla JavaScript (ES6 modules)**
- **CSS Grid** for card layout
- **Flexbox** for modal and banner sections
- Optional: [Pexels](https://www.pexels.com/) images for podcast covers

---

## Future Improvements

- Filter podcasts by theme.
- Sort podcasts by last updated date.
- Add search functionality.
- Integrate with a backend API to fetch podcasts dynamically.
