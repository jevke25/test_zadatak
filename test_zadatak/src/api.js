const AUTH_BASE = import.meta.env.VITE_API_AUTH;
const API_BASE = import.meta.env.VITE_API_MAIN;

// Register
export async function registerUser(data) {
  const res = await fetch(`${AUTH_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

// Login
export async function loginUser(data) {
  const res = await fetch(`${AUTH_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// Example: get all jobs
export async function getJobs() {
  const res = await fetch(`${API_BASE}/jobs`);
  if (!res.ok) throw new Error("Failed to load jobs");
  return res.json();
}
