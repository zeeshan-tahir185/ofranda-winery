export const locales = ["ro", "ru", "en", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const contact = {
  email: "office@ofranda.com",
  phone: "+373 600 00 000",
  phoneHref: "+37360000000",
  location: "Republic of Moldova",
};

export const nav = {
  left: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "The Land", href: "#land" },
    { label: "Our People", href: "#people" },
  ],
  right: [
    { label: "Wines", href: "#wines" },
    { label: "News & Events", href: "#news" },
    { label: "Contact", href: "#contact" },
  ],
};

export const chapters = [
  {
    numeral: "I.",
    title: ["What organic", "truly means"],
    body: [
      "No synthetic herbicides, no chemical fertilisers, no shortcuts. Every vine is tended by hand, and the soil is nourished with compost, cover crops and patience.",
      "Certified by ECOCERT, our vineyard is proof that a wine can be honest from the root to the glass.",
    ],
    image: "/media/hands-grapes.jpg",
    caption: "Hands",
    art: "sprout",
  },
  {
    numeral: "II.",
    title: ["Why we chose", "the ecological path"],
    body: [
      "We wanted to make wine from a living vineyard. From healthy soil comes fruit of greater vitality, richer in minerals and more deeply rooted in its own terroir. This is what we want to taste.",
      "Our commitment is a long-term one. We do this for the people who will work this land long after us.",
    ],
    image: "/media/land-rows.jpg",
    caption: "Roots",
    art: "roots",
  },
  {
    numeral: "III.",
    title: ["Towards", "biodynamic winemaking"],
    body: [
      "Biodynamics views the vineyard as a complete, living organism, where soil, plants, animals and natural rhythms are interconnected. We are now in the process of achieving biodynamic certification and have already completed the first stages.",
      "The health of the soil, the vineyard's biodiversity and the quality of the wine are inseparable. Where the land is alive, the wine is authentic.",
    ],
    image: "/media/leaves.jpg",
    caption: "Cycles",
    art: "cycles",
  },
] as const;

export const landFacts = [
  { label: "Origin", value: "Republic of Moldova" },
  { label: "Since", value: "2016" },
  { label: "Grapes", value: "Fetească Neagră, Cabernet Sauvignon, Rara Neagră" },
  { label: "Farming", value: "Certified organic, biodynamic in progress" },
];

export const timeline = [
  { year: "2016", text: "The first vines are planted and Ofranda begins." },
  { year: "2024", text: "The vineyard is certified organic by ECOCERT." },
  { year: "Today", text: "Stage three of four on the path to biodynamics." },
];

export const wines = [
  {
    name: "Humma",
    style: "Vin roșu sec",
    vintage: "2024",
    grapes: "Fetească Neagră · Cabernet Sauvignon · Rara Neagră",
    text: "A deep, quiet red born of three grapes and one hillside. Dark cherry, wild herbs and a long, earthy finish.",
    image: "/media/humma.jpg",
  },
  {
    name: "Fetească Neagră",
    style: "Vin roșu sec",
    vintage: "2024",
    grapes: "Fetească Neagră",
    text: "The native grape of our land. Black plum, violet and a soft spice, held together by fine, living tannins.",
    image: "/media/humma.jpg",
  },
  {
    name: "Rara Neagră",
    style: "Vin roșu sec",
    vintage: "2024",
    grapes: "Rara Neagră",
    text: "Light on its feet and full of character. Red berries, rose petal and the freshness of a cool morning.",
    image: "/media/humma.jpg",
  },
  {
    name: "Cabernet Sauvignon",
    style: "Vin roșu sec",
    vintage: "2024",
    grapes: "Cabernet Sauvignon",
    text: "Structured and patient. Blackcurrant, cedar and graphite, shaped slowly in oak.",
    image: "/media/humma.jpg",
  },
  {
    name: "Rosé",
    style: "Vin rose sec",
    vintage: "2024",
    grapes: "Fetească Neagră · Rara Neagră",
    text: "Pale, bright and quietly generous. Wild strawberry, citrus peel and a mineral close.",
    image: "/media/humma.jpg",
  },
];

export const news = [
  {
    category: "Winery",
    date: "October 14, 2026",
    title: "The 2026 harvest, picked by hand",
    text: "Six weeks, one row at a time. A look at how this year's grapes came in from the vineyard.",
    image: "/media/basket.jpg",
  },
  {
    category: "Certification",
    date: "September 2, 2026",
    title: "Stage three on the path to biodynamics",
    text: "What the third stage of certification means for the soil, the vines and the wine.",
    image: "/media/clusters.jpg",
  },
  {
    category: "Events",
    date: "August 21, 2026",
    title: "An evening tasting among the vines",
    text: "Our first open tasting at the winery, with the people who make the wine.",
    image: "/media/grapes-dark.jpg",
  },
];

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
];
