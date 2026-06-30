// ─────────────────────────────────────────────────────────────────────────
// DEMO BACKEND — A client-side axios adapter that replaces the (now offline)
// Railway API for showcase purposes. It serves the static catalog from
// wines.js and re-implements the server-side filtering client-side, so the
// public demo (catalog, filtering, sorting, search, product detail, cart)
// keeps working with no server. Unknown/user/admin endpoints resolve to safe
// empty values so the SPA never throws. Auth0 and PayPal use their own SDKs
// (not axios), so they are unaffected.
// ─────────────────────────────────────────────────────────────────────────
import { WINES, TYPES, GRAPES, REGIONS, STATES } from './wines'

function parse(config) {
  let pathname = config.url || ''
  let search = new URLSearchParams()
  try {
    const u = new URL(config.url, config.baseURL || 'http://demo.local')
    pathname = u.pathname
    search = u.searchParams
  } catch (_) { /* keep raw url */ }
  return { method: (config.method || 'get').toLowerCase(), pathname, search }
}

function filterNames(search) {
  let filters = []
  try { filters = JSON.parse(search.get('filter') || '[]') } catch (_) { filters = [] }
  const quantity = search.get('quantity')

  const has = (arr, value) => arr.some((x) => x.name === value)
  const matches = WINES.filter((w) => {
    const passDims = filters.every((f) => {
      if (!f.value || f.value === 'all') return true
      if (f.filter === 'Grape') return has(w.grapes, f.value)
      if (f.filter === 'State') return has(w.states, f.value)
      if (f.filter === 'Type') return has(w.types, f.value)
      return true
    })
    const passQty = !quantity || quantity === 'all' ? true : w.quantity === Number(quantity)
    return passDims && passQty
  })
  return matches.map((w) => w.name)
}

function route({ method, pathname, search }) {
  if (method === 'get') {
    if (pathname === '/products') return WINES
    if (pathname === '/products/filters') return filterNames(search)
    if (/^\/products\/\d+\/review$/.test(pathname)) return []
    const detail = pathname.match(/^\/products\/(\d+)$/)
    if (detail) return WINES.find((w) => w.id === Number(detail[1])) || {}
    if (pathname === '/types') return TYPES
    if (pathname === '/grapes') return GRAPES
    if (pathname === '/regions') return REGIONS
    if (pathname === '/states') return STATES
  }
  // Everything else (users, cart, orders, addresses, reviews POST, admin CRUD,
  // external geo API, etc.) → benign empty response so nothing crashes.
  return []
}

export function installDemoBackend(axios) {
  axios.defaults.adapter = (config) =>
    new Promise((resolve) => {
      const data = route(parse(config))
      resolve({
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        request: {},
      })
    })
}
