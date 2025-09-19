const API_BASE = import.meta.env.VITE_API_MAIN

function authHeaders() {
  const t = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(t ? { Authorization: `Bearer ${t}` } : {})
  }
}

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders(), ...opts })
  let data
  try { data = await res.json() } catch (_) {}
  if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`)
  return data
}

// Jobs
export const getMyJobs = () => request('/jobs/mine')
export const createJob = (payload) =>
  request('/jobs', { method: 'POST', body: JSON.stringify(payload) })

// Applications for a job
export const getApplicantsForJob = (jobId, { q = '', status = '', job_field = '' } = {}) => {
  const params = new URLSearchParams()
  params.set('job_id', jobId)
  if (q) params.set('q', q)
  if (status) params.set('status', status)
  if (job_field) params.set('job_field', job_field)
  return request(`/applications?${params.toString()}`)
}

export const updateApplicationStatus = (applicationId, nextStatus) =>
  request(`/applications/${applicationId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: nextStatus })
  })

// All applicants across my jobs (frontend agregacija)
// Ako napraviš poseban Xano endpoint, zameni ovo jednim pozivom.
export async function getAllApplicantsAcrossJobs(filters = {}) {
  const jobs = await getMyJobs()
  const lists = await Promise.all(
    jobs.map(j => getApplicantsForJob(j.id, filters).catch(() => []))
  )
  const flat = lists.flat().map(a => ({ ...a, __job: jobs.find(j => j.id === a.job_id) }))
  return flat
}
