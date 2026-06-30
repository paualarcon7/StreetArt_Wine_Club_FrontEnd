// ─────────────────────────────────────────────────────────────────────────
// DEMO DATA — Static wine catalog used to keep the live demo working without
// a backend. The original backend (Railway) and its seed source were free
// tiers that expired, so this dataset replaces them for showcase purposes.
// The full backend code still lives in the StreetArt_Wine_Club_BackEnd repo.
// ─────────────────────────────────────────────────────────────────────────

const img = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`

const IMAGES = [
  '1510812431401-41d2bd2722f3',
  '1553361371-9b22f78e8b1d',
  '1474722883778-792e7990302f',
  '1506377247377-2a5b3b417ebb',
  '1568213816046-0ee1c42bd559',
  '1547595628-c61a29f496f0',
  '1598306442928-4d90f32c6866',
  '1516594915697-87eb3b1c14ea',
  '1543418219-44e30b057fea',
]

const n = (s) => ({ name: s })

const raw = [
  { name: 'Malbec Reserva', price: 4500, volume: 750, quantity: 6, stock: 24, winery: ['Bodega Mural'], type: 'Red', grapes: ['Malbec'], state: 'Mendoza', region: 'Valle de Uco', details: 'A bold, velvety Malbec with notes of ripe plum, violets and a touch of oak. The flagship of our cellar.' },
  { name: 'Cabernet Sauvignon', price: 5200, volume: 750, quantity: 6, stock: 18, winery: ['Viñas del Grafiti'], type: 'Red', grapes: ['Cabernet Sauvignon'], state: 'Mendoza', region: 'Luján de Cuyo', details: 'Structured and elegant, with blackcurrant, bell pepper and firm tannins. Ages beautifully.' },
  { name: 'Torrontés', price: 3200, volume: 750, quantity: 6, stock: 30, winery: ['Finca Aerosol'], type: 'White', grapes: ['Torrontés'], state: 'Salta', region: 'Cafayate', details: 'Aromatic and floral, with jasmine, white peach and a crisp, refreshing finish. Argentina’s signature white.' },
  { name: 'Chardonnay', price: 3800, volume: 750, quantity: 6, stock: 22, winery: ['Bodega Mural'], type: 'White', grapes: ['Chardonnay'], state: 'Mendoza', region: 'Tupungato', details: 'Bright and balanced, with green apple, citrus and a subtle creamy texture from light oak ageing.' },
  { name: 'Pinot Noir', price: 6100, volume: 750, quantity: 6, stock: 12, winery: ['Patagonia Stencil'], type: 'Red', grapes: ['Pinot Noir'], state: 'Río Negro', region: 'Alto Valle', details: 'Delicate and silky, with red cherry, raspberry and earthy nuances from cool Patagonian vineyards.' },
  { name: 'Rosé de Malbec', price: 2900, volume: 750, quantity: 6, stock: 35, winery: ['Viñas del Grafiti'], type: 'Rosé', grapes: ['Malbec'], state: 'Mendoza', region: 'Valle de Uco', details: 'Pale salmon in colour, with strawberry, watermelon and a dry, vibrant palate. Perfect for warm afternoons.' },
  { name: 'Bonarda', price: 3400, volume: 750, quantity: 6, stock: 20, winery: ['Finca Aerosol'], type: 'Red', grapes: ['Bonarda'], state: 'San Juan', region: 'Valle del Tulum', details: 'Juicy and approachable, with red plum, blackberry and soft tannins. An underrated Argentine gem.' },
  { name: 'Sauvignon Blanc', price: 3600, volume: 750, quantity: 6, stock: 26, winery: ['Bodega Mural'], type: 'White', grapes: ['Sauvignon Blanc'], state: 'Mendoza', region: 'Valle de Uco', details: 'Zesty and herbaceous, with grapefruit, lime and a mineral edge. Crisp from start to finish.' },
  { name: 'Syrah', price: 4100, volume: 750, quantity: 6, stock: 0, winery: ['Pedernal Ink'], type: 'Red', grapes: ['Syrah'], state: 'San Juan', region: 'Valle de Pedernal', details: 'Powerful and spicy, with black pepper, dark fruit and smoky depth from high-altitude vines.' },
  { name: 'Espumante Brut Nature', price: 5400, volume: 750, quantity: 6, stock: 16, winery: ['Bodega Mural'], type: 'Sparkling', grapes: ['Chardonnay', 'Pinot Noir'], state: 'Mendoza', region: 'Tupungato', details: 'Traditional-method sparkling with fine bubbles, green apple, brioche and a bone-dry finish.' },
  { name: 'Blend Insignia', price: 7800, volume: 750, quantity: 3, stock: 9, winery: ['Viñas del Grafiti'], type: 'Red', grapes: ['Cabernet Sauvignon', 'Malbec', 'Merlot'], state: 'Mendoza', region: 'Luján de Cuyo', details: 'Our premium icon blend: layered, complex and built to age, with cassis, cocoa and sweet spice.' },
  { name: 'Late Harvest Torrontés', price: 4700, volume: 500, quantity: 6, stock: 14, winery: ['Finca Aerosol'], type: 'Dessert', grapes: ['Torrontés'], state: 'Salta', region: 'Cafayate', details: 'A luscious dessert wine with honey, apricot and orange blossom, balanced by lively acidity.' },
]

export const WINES = raw.map((w, i) => ({
  id: i + 1,
  name: w.name,
  price: w.price,
  image: img(IMAGES[i % IMAGES.length]),
  volume: w.volume,
  quantity: w.quantity,
  stock: w.stock,
  details: w.details,
  winery: w.winery,
  grapes: w.grapes.map(n),
  types: [n(w.type)],
  regions: [n(w.region)],
  states: [n(w.state)],
}))

// Distinct values for the admin/reference endpoints (/types, /grapes, etc.)
const uniq = (arr) => Array.from(new Set(arr)).map((name, i) => ({ id: i + 1, name }))
export const TYPES = uniq(WINES.flatMap((w) => w.types.map((t) => t.name)))
export const GRAPES = uniq(WINES.flatMap((w) => w.grapes.map((g) => g.name)))
export const REGIONS = uniq(WINES.flatMap((w) => w.regions.map((r) => r.name)))
export const STATES = uniq(WINES.flatMap((w) => w.states.map((s) => s.name)))
