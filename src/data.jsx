// data.jsx — coords, cities, KPIs, map paths

// Normalized coordinates on a 1920x1080 canvas for the world map
// (equirectangular-ish — hand-tuned for visual balance, not GIS accuracy)
const WORLD_VIEWBOX = { w: 1920, h: 1080 };

// KPIs — positioned on a 1920x1080 canvas. Avoid overlap with the map
// (France/Tunisia sit at roughly x:940-1020, y:320-420 after SceneWorld zoom crop,
// but we render KPIs around the map, not on it).
const KPIS = [
  // Left column — away from Europe
  { key: 'people',    value: '750',    unit: 'Personnes',            note: "Population équilibrée — 50% techniciens, 50% ingénieurs & experts",  pos: { x: 220, y: 430 },  size: 190 },
  { key: 'revenue',   value: '55',     unit: 'M€ de CA',             note: "Croissance ~10%/an, CA multiplié par 2 en 10 ans",                   pos: { x: 220, y: 720 },  size: 180 },
  // Top-right — above Europe
  { key: 'clients',   value: '+200',   unit: 'Clients',              note: "Partenaires industriels en France et à l'international",             pos: { x: 1560, y: 200 }, size: 190 },
  { key: 'sites',     value: '3',      unit: "Sites d'intégration",  note: "Cœur industriel : France + Tunisie",                                 pos: { x: 1720, y: 470 }, size: 170 },
  { key: 'studies',   value: '9',      unit: "Bureaux d'études",     note: "Ingénierie mécanique, électronique, logicielle",                     pos: { x: 1560, y: 720 }, size: 180 },
  { key: 'locations', value: '12',     unit: 'Implantations',        note: "Présence au plus près des clients",                                  pos: { x: 1260, y: 890 }, size: 170 },
];

// Country people-pins — positioned over the real world map.
// SVG viewBox: 30.767 241.591 784.077 458.627 →  mapped to 1920x1080 canvas.
// France center in svg ≈ (412, 400) → canvas ≈ (972, 372)
// Tunisia center in svg ≈ (430, 444) → canvas ≈ (1016, 477)
// We space labels: France label above, Tunisia label below-right.
// SVG viewBox 2000x857 rendered inside padding:100px 120px on 1920x1080.
// Inner box: 1680x880, offset (120,100); svg→canvas scale = 0.44 (height-limited)
// after aspectRatio preserve. Center of svg at x=1000 → canvas center x=960.
// France mainland svg center ≈ (995, 202) → canvas ≈ (957, 189) [tight to top]
// Tunisia svg center ≈ (1040, 295) → canvas ≈ (976, 230)
// Use left of map for FRANCE label (toward atlantic), right for Tunisia
const COUNTRY_PINS = [
  { key: 'france',  label: 'FRANCE',  people: 650, pos: { x: 960,  y: 360 }, labelDir: 'top-left' },
  { key: 'tunisia', label: 'TUNISIE', people: 100, pos: { x: 990,  y: 460 }, labelDir: 'bottom-right' },
];

// France cities (on the zoomed France view, coords in a 620x720 viewbox)
// Calibrated to match the realistic France path.
const FRANCE_VIEWBOX = { w: 620, h: 720 };
const FRANCE_CITIES = [
  { name: 'Cherbourg-en-Cotentin', pos: { x: 215, y: 155 }, type: 'implantation' },
  { name: 'Asnières',              pos: { x: 308, y: 198 }, type: 'bureau',      meta: 'Siège' },
  { name: 'Clamart',               pos: { x: 314, y: 212 }, type: 'bureau' },
  { name: 'Le Plessis-Pâté',       pos: { x: 324, y: 228 }, type: 'integration', meta: 'Site intégration' },
  { name: 'Longué-Jumelles',       pos: { x: 258, y: 288 }, type: 'integration' },
  { name: 'Bourges',               pos: { x: 330, y: 305 }, type: 'bureau' },
  { name: 'Roanne',                pos: { x: 378, y: 354 }, type: 'bureau' },
  { name: 'Lyon',                  pos: { x: 398, y: 378 }, type: 'bureau' },
  { name: 'Bordeaux',              pos: { x: 250, y: 430 }, type: 'implantation' },
  { name: 'Toulouse',              pos: { x: 298, y: 478 }, type: 'bureau' },
  { name: "Laudun-l'Ardoise",      pos: { x: 388, y: 445 }, type: 'implantation' },
  { name: 'Aix-en-Provence',       pos: { x: 430, y: 462 }, type: 'bureau' },
];

// Sites d'intégration (detail cards)
const INTEGRATION_SITES = [
  {
    country: 'FRANCE',
    city: 'Le Plessis-Pâté',
    headcount: '50 p.',
    label: 'Intégration MN — PC industriels, bancs de test',
    flag: '🇫🇷',
  },
  {
    country: 'FRANCE',
    city: 'Longué-Jumelles',
    headcount: '190 p.',
    label: 'Prototypage, proximité client, projet stratégique défense',
    flag: '🇫🇷',
  },
  {
    country: 'TUNISIE',
    city: 'Tunis',
    headcount: '90 p.',
    label: 'Best-cost pour la production série, réactivité',
    flag: '🇹🇳',
  },
];

Object.assign(window, {
  WORLD_VIEWBOX, KPIS, COUNTRY_PINS,
  FRANCE_VIEWBOX, FRANCE_CITIES,
  INTEGRATION_SITES,
});
