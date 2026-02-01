// ================= UNMUTED PODCAST DATA ================= //
export const podcasts = [
  {
    id: "u001",
    title: "Women’s Voices",
    description:
      "A space for women to share stories of identity, power, healing, motherhood, sexuality, spirituality, and survival. Unfiltered and deeply personal.",
    seasons: 4,
    image: "https://images.pexels.com/photos/7586484/pexels-photo-7586484.jpeg",
    genres: [1, 4],
    updated: "2026-01-28T09:30:00.000Z",
  },
  {
    id: "u002",
    title: "Men & Masculinity",
    description:
      "Exploring what it means to be a man in today’s world—vulnerability, mental health, fatherhood, patriarchy, relationships, and redefining masculinity.",
    seasons: 3,
    image: "https://images.pexels.com/photos/9208206/pexels-photo-9208206.jpeg",
    genres: [1, 2],
    updated: "2026-01-25T14:15:00.000Z",
  },
  {
    id: "u003",
    title: "LGBTQIA Stories",
    description:
      "Queer joy, queer pain, queer love, and queer becoming. Stories from across the spectrum of sexuality and gender identity.",
    seasons: 3,
    image: "https://images.pexels.com/photos/8521273/pexels-photo-8521273.jpeg",
    genres: [3, 4],
    updated: "2026-01-30T12:00:00.000Z",
  },
  {
    id: "u004",
    title: "Living With Disability",
    description:
      "Real conversations about disability, accessibility, stigma, resilience, and living fully in a world not built for everyone.",
    seasons: 2,
    image: "https://images.pexels.com/photos/3162050/pexels-photo-3162050.jpeg",
    genres: [1, 5],
    updated: "2026-01-20T08:45:00.000Z",
  },
  {
    id: "u005",
    title: "GBV: Survival & Justice",
    description:
      "Stories of gender-based violence, survival, justice, court journeys, healing, and rebuilding. Content warnings apply.",
    seasons: 3,
    image: "https://images.pexels.com/photos/7699329/pexels-photo-7699329.jpeg",
    genres: [2, 4],
    updated: "2026-01-22T16:30:00.000Z",
  },
  {
    id: "u006",
    title: "Childhood & Healing",
    description:
      "Inner child work, childhood trauma, parenting wounds, generational cycles, and healing journeys across families and communities.",
    seasons: 3,
    image: "https://images.pexels.com/photos/7294038/pexels-photo-7294038.jpeg",
    genres: [1, 4],
    updated: "2026-01-26T11:00:00.000Z",
  },
  {
    id: "u007",
    title: "Inequality & Power",
    description:
      "Deep dives into class, race, gender, economics, colonialism, and who holds power—and who is silenced.",
    seasons: 2,
    image: "https://images.pexels.com/photos/8962469/pexels-photo-8962469.jpeg",
    genres: [2, 5],
    updated: "2026-01-18T10:15:00.000Z",
  },
  {
    id: "u008",
    title: "Love, Identity & Becoming",
    description:
      "Stories of love, self-discovery, spirituality, relationships, identity, and becoming who you truly are.",
    seasons: 4,
    image: "https://images.pexels.com/photos/1731750/pexels-photo-1731750.jpeg",
    genres: [1, 3],
    updated: "2026-01-29T13:50:00.000Z",
  },
];

// ================= THEMES (REPLACING GENRES) ================= //

export const genres = [
  {
    id: 1,
    title: "Healing & Growth",
    description:
      "Stories of recovery, therapy, spirituality, self-discovery, and becoming whole.",
    shows: ["u001", "u002", "u004", "u006", "u008"],
  },
  {
    id: 2,
    title: "Power & Justice",
    description:
      "Conversations about patriarchy, inequality, justice, gender politics, law, and systemic change.",
    shows: ["u002", "u005", "u007"],
  },
  {
    id: 3,
    title: "Identity & Sexuality",
    description:
      "Gender identity, sexuality, queerness, spirituality, and self-definition stories.",
    shows: ["u003", "u008"],
  },
  {
    id: 4,
    title: "Trauma & Survival",
    description:
      "Survivor stories, childhood trauma, GBV, abuse, grief, and pathways to healing.",
    shows: ["u001", "u003", "u005", "u006"],
  },
  {
    id: 5,
    title: "Disability & Access",
    description:
      "Disability justice, lived experiences, neurodiversity, accessibility, and inclusion.",
    shows: ["u004", "u007"],
  },
];

// ================= SEASONS (FULL FOR ALL SHOWS) ================= //

export const seasons = [
  {
    id: "u001",
    seasonDetails: [
      { title: "Season 1: Voices Unmuted", episodes: 12 },
      { title: "Season 2: Women & Power", episodes: 10 },
      { title: "Season 3: Bodies, Faith & Identity", episodes: 8 },
      { title: "Season 4: Motherhood & Becoming", episodes: 9 },
    ],
  },
  {
    id: "u002",
    seasonDetails: [
      { title: "Season 1: Redefining Masculinity", episodes: 10 },
      { title: "Season 2: Men, Love & Vulnerability", episodes: 9 },
      { title: "Season 3: Fatherhood & Healing", episodes: 7 },
    ],
  },
  {
    id: "u003",
    seasonDetails: [
      { title: "Season 1: Queer Becoming", episodes: 8 },
      { title: "Season 2: Love Beyond Norms", episodes: 9 },
      { title: "Season 3: Gender, Faith & Identity", episodes: 6 },
    ],
  },
  {
    id: "u004",
    seasonDetails: [
      { title: "Season 1: Living Disabled in an Ableist World", episodes: 10 },
      { title: "Season 2: Access, Advocacy & Power", episodes: 8 },
    ],
  },
  {
    id: "u005",
    seasonDetails: [
      { title: "Season 1: Survival Stories", episodes: 10 },
      { title: "Season 2: Justice & Legal Journeys", episodes: 8 },
      { title: "Season 3: Healing After Violence", episodes: 9 },
    ],
  },
  {
    id: "u006",
    seasonDetails: [
      { title: "Season 1: Inner Child", episodes: 10 },
      { title: "Season 2: Generational Trauma", episodes: 9 },
      { title: "Season 3: Reparenting & Healing", episodes: 8 },
    ],
  },
  {
    id: "u007",
    seasonDetails: [
      { title: "Season 1: Inequality & Systems", episodes: 10 },
      { title: "Season 2: Power, Capital & Colonialism", episodes: 8 },
    ],
  },
  {
    id: "u008",
    seasonDetails: [
      { title: "Season 1: Love Stories", episodes: 10 },
      { title: "Season 2: Identity Journeys", episodes: 9 },
      { title: "Season 3: Spirituality & Becoming", episodes: 8 },
      { title: "Season 4: Selfhood & Future Dreams", episodes: 7 },
    ],
  },
];
