import type { Blessing, NavItem, PaletteSwatch, TimelineEvent } from "../types";

export const couple = {
  bride: "Fatima Kashif",
  groom: "Taimoor Asad",
  groomFather: "Sheikh Asadullah",
  brideFull: "Fatima Kashif",
  groomFull: "Taimoor Asad",
  monogramAlt: "F & T Wedding Monogram",
  monogramSrc:
    "https://lh3.googleusercontent.com/aida/AEtjO1V3zIb2DYn2WQYKcRMGhS4ljlPHsT_w6_16NQhBkANB-NJwXnB1V2b2NhXgpUctlT8l_Z79Ztz3ngrUkzmOLrVQqHMjy7H9orlaFfR67W0yUCE3o30k7Q7zsyxQwhDl_xF1i8KFiOx7GloTNeyWFjg8oi4vwCf8TfrPSMlSEhPotWczWEWh1yVtnEqc_4pTCi34FzLAzf6N3xzGdzouDlmpX1zQZ_3nGdP5NTOMzWE9PJOkVgmbvNQ6E2M",
} as const;

export const ceremony = {
  weekday: "SATURDAY",
  displayDate: "OCTOBER 10, 2026",
  city: "FLORENCE, ITALY",
  timeLabel: "Saturday",
  longDate: "Saturday, October 10, 2026",
  venueShort: "VILLA GAMBERAIA • SETTIGNANO",
  muhurtham: "Auspicious Twilight Muhurtham • Water Parterre Gardens",
  targetMs: new Date("October 10, 2026 07:00:00 GMT+5").getTime(),
} as const;

export const navItems: NavItem[] = [
  { path: "our-story", label: "Our Story" },
  { path: "events-timeline", label: "Events & Timeline" },
  { path: "venue-directions", label: "Venue & Directions" },
  { path: "dress-code", label: "Dress Code" },
  { path: "rsvp-guestbook", label: "RSVP & Guestbook" },
];

export const images = {
  hero: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtBPYWGTQa7pjGTwtLWyvbBnDUXTpV-JOiLaDMRk8_qdQPlx0ASpUgZO17uQNAqIL3zq9g1ke07WjE6DLSHqFKbBE595YjXp7Evu6AQ0rZzRc_UvPi8MKBwf2skllz14uW3PKJN1xbfBMSITWiMzUpKcuwjtFy8t2nVm6xZ2c-06HGWR7CEa0e_nhDzGNJpBJHap8SY3znJuNnIMjcNWKC27-FhqjFD24KRye1RY1riN_2qLjjaH3aaw",
    alt: "Romantic cinematic editorial portrait of bride Fatima in intricate delicate floral lace wedding gown and groom Taimoor in tailored champagne cream tuxedo suit smiling tenderly at each other amidst lavish ivory garden roses, pampas grass, warm Italian sunlight and soft bokeh fairy lights at Villa Gamberaia in Tuscany, warm golden hour romance",
  },
  story: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4tZWoBur-tqpQ1I0YwYDfPTXCTuR0GZmTxke7rghm_e9maxF_79mJiGijnJsLzUeJGsxMywUuGszaNvZTQpvaMZRWsnW1E5WLyxp6X_EVEO3xvnpKJ7enamadvE0u9NDvPpHc_OMJazaM9c8lFIe5L0Sd2IPQ_tA-8922pp4oO9rDPM1WK-MiJiAK6ZGiF7V7QyC1LFVjxi_dyQTr8wEFfm5fyrG-dkSu78Vpjtlnr5jEk8AwZnToDQ",
    alt: "Intimate romantic portrait of Fatima and Taimoor laughing together at sunset in Lake Como Italy, dressed in sophisticated quiet luxury neutral attire, soft golden lighting and tranquil waters reflecting mountains",
  },
  proposal: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKf2V1CVW3boi7Ie1aLxfnTkLxbqNcSORBu-SrCo_LfOWJrwa1KyxF9Lms2AcA51sQ45lvI-Uv7ZyrOjocbykPxsdlhjSU7B56zX5z6tgr20P03vtqwKlQPUxi6HZXHh0eMP9gMp5tY-X95_-3kWa1u1q7mGhHKSfj0hxGedMh_7Pe1nC9D82qV8YIF0WZGAoj1bgYL0Pwh7l8uQicdT4PeCyapSgVOFV3lA6pFRgsMPYmISF2361mCA",
    alt: "Delicate close-up of Taimoor slipping a classic emerald cut diamond engagement ring onto Fatima's finger beside blooming garden roses in vintage film grain",
  },
  map: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfbHUaa5RcaHKwUUmxNY5UCuZS0ufNZw3pQbkmEPjaG5j7-GmEO2QOPsVQIMP0gQZUHDjCew2-jdTZDmezqNskFbsHrWWMohvlEWIVm9wwunBcpa2oIV0PggFcmVMHNT7uMbzLK2VQ4VuADzLxAYFUAMvCBJ6uJeITd5KwiQpj2VA575L_i5LyrjUoB6uVF127RcuL-RmaUYHCDdomn64Ow04pWgupqZt14fQy_fPL6iM1M0PjVLakUw",
    alt: "Map of Bahawalpur Royal Marquee, Bahawalpur, Punjab, Pakistan",
  },
} as const;

export const venue = {
  name: "Bahawalpur Royal Marquee",
  addressLine: "Bahawalpur, Punjab, Pakistan",
  cityLine: "Bahawalpur, Punjab, Pakistan",
  query: "Bahawalpur Royal Marquee",
  googleMaps: "https://maps.app.goo.gl/qMVgHWyKEtun2pGYA?g_st=iw",
  appleMaps: "https://maps.apple/p/UGL5mWYc2gyG24",
  mapsQuery:
    "Bahawalpur Royal Marquee, Multan road, Bahawalpur, Punjab, Pakistan",
  /** Google Maps embed zoom: 1 = world, 20 = street. Lower = more zoomed out. */
  mapsZoom: 13,
  description:
    "Multan road, near PSO Petrol Pump, Bahawalpur, Punjab, Pakistan",
  shuttle:
    "Complimentary Mercedes-Benz Sprinter shuttles depart continuously every 45 minutes from Hotel Lungarno (Piazza dei Rossi, Florence) directly to the Villa courtyard.",
} as const;

export const contacts = [
  {
    name: "Mian Kashif Manzoor",
    phone: "0301-4642300",
    whatsapp: "https://wa.me/923014642300",
  },
  {
    name: "Mian Asjad Faiz",
    phone: "0300-9689325",
    whatsapp: "https://wa.me/923009689325",
  },
] as const;

export const timelineEvents: TimelineEvent[] = [
  {
    id: "welcome",
    badge: "DAY 01",
    badgeTone: "muted",
    icon: "wine_bar",
    datetime: "7:00 PM",
    title: "Arrival",
  },
  {
    id: "ceremony",
    badge: "SACRED VOWS",
    badgeTone: "primary",
    icon: "favorite",
    datetime: " 08:00 PM",
    title: "Nikkah ",
    featured: true,
  },
  {
    id: "gala",
    badge: "CELEBRATION",
    badgeTone: "muted",
    icon: "nightlife",
    datetime: "08:30 PM",
    title: "Dinner ",
  },
  // {
  //   id: "brunch",
  //   badge: "FAREWELL",
  //   badgeTone: "muted",
  //   icon: "bakery_dining",
  //   datetime: "09:45 AM",
  //   title: "Marquee Closing Time",
  //   attire: "Casual and Comfortable",
  // },
];

export const palette: PaletteSwatch[] = [
  { name: "Warm Champagne", hex: "#E8C5B0" },
  { name: "Antique Ivory", hex: "#FAF7F2" },
  { name: "Soft Sage", hex: "#A8BBA2" },
  { name: "Rose Dust", hex: "#D8A48F" },
];

export const initialBlessings: Blessing[] = [
  {
    id: "beatrice",
    author: "Countess Beatrice D'Este",
    timeLabel: "2 hours ago",
    message:
      "May your love bloom as eternally as the Tuscan olive groves. We cannot wait to raise a glass in Florence!",
  },
  {
    id: "montgomery",
    author: "Julian & Clara Montgomery",
    timeLabel: "Yesterday",
    message:
      "Fatima, our sweet sister, seeing you find your forever match in Taimoor is the greatest joy of our family. Cheers to the great journey ahead!",
  },
  {
    id: "rossi",
    author: "Marco Rossi & Elena",
    timeLabel: "2 days ago",
    message:
      "Benvenuti in famiglia, Fatima! Get ready for endless pasta and decades of laughter together Taimoor.",
  },
];

export const entrees = [
  "Tuscan Truffle Beef Filet",
  "Wild Mediterranean Seabass",
  "Acquerello Saffron & Morel Risotto (Vegan)",
] as const;

export const partySizes = [
  { value: "1", label: "1 Guest (Solo)" },
  { value: "2", label: "2 Guests (Couple)" },
  { value: "3", label: "3 Guests (With Family)" },
  { value: "4", label: "4 Guests" },
] as const;
