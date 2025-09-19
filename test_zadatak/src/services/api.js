const AUTH_BASE = import.meta.env.VITE_API_AUTH
const API_BASE  = import.meta.env.VITE_API_MAIN

function headers(auth = false) {
  const h = { 'Content-Type': 'application/json' }
  if (auth) {
    const t = localStorage.getItem('token')
    if (t) h.Authorization = `Bearer ${t}`
  }
  return h
}

async function req(base, path, opts = {}) {
  const res = await fetch(`${base}${path}`, { headers: headers(opts.auth), ...opts })
  let data = {}
  try { data = await res.json() } catch (_) {}
  if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`)
  return data
}

// AUTH
export const registerUser = (payload) =>
  req(AUTH_BASE, '/auth/signup', { method: 'POST', body: JSON.stringify(payload) })
// očekuje { authToken, role } ili { authToken, role, ... }

export const loginUser = (payload) =>
  req(AUTH_BASE, '/auth/login', { method: 'POST', body: JSON.stringify(payload) })

