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

async function req(base, path, { method='GET', body, auth=false } = {}) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: headers(auth),
    body: body ? JSON.stringify(body) : undefined
  })
  let data
  try { data = await res.json() } catch (_) {}
  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

// AUTH endpoints
export const registerUser = (payload) => req(AUTH_BASE, '/auth/signup', { method: 'POST', body: payload })
export const loginUser    = (payload) => req(AUTH_BASE, '/auth/login',  { method: 'POST', body: payload })

// Primeri za kasnije:
export const getJobs      = (q='') => req(API_BASE, `/jobs${q ? `?q=${encodeURIComponent(q)}` : ''}`)
