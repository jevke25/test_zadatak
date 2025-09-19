import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import {
  getMyJobs,
  createJob,
  getApplicantsForJob,
  getAllApplicantsAcrossJobs,
  updateApplicationStatus
} from '../services/company'

export default function CompanyHome() {
  // Jobs
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [jobsLoading, setJobsLoading] = useState(true)
  const [jobsError, setJobsError] = useState('')

  // Applicants (for selected job)
  const [apps, setApps] = useState([])
  const [appsLoading, setAppsLoading] = useState(false)
  const [appsError, setAppsError] = useState('')

  // All applicants toggle
  const [showAll, setShowAll] = useState(false)

  // Filters
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [jobField, setJobField] = useState('')

  // Selected candidate
  const [selectedAppId, setSelectedAppId] = useState(null)

  // Add job form state
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState('')

  // Load jobs on mount
  useEffect(() => {
    let alive = true
    setJobsLoading(true)
    setJobsError('')
    getMyJobs()
      .then(data => {
        if (!alive) return
        setJobs(data || [])
        if (data?.length && !selectedJobId) setSelectedJobId(data[0].id)
      })
      .catch(err => alive && setJobsError(err.message || 'Failed to load jobs'))
      .finally(() => alive && setJobsLoading(false))
    return () => { alive = false }
  }, [])

  // Load applicants (selected job or all)
  useEffect(() => {
    let alive = true
    setAppsLoading(true)
    setAppsError('')
    const filters = { q, status, job_field: jobField }

    const load = async () => {
      if (showAll) {
        const list = await getAllApplicantsAcrossJobs(filters)
        return list
      } else if (selectedJobId) {
        const list = await getApplicantsForJob(selectedJobId, filters)
        return list
      }
      return []
    }

    load()
      .then(data => { if (alive) setApps(data || []) })
      .catch(err => alive && setAppsError(err.message || 'Failed to load applicants'))
      .finally(() => alive && setAppsLoading(false))

    return () => { alive = false }
  }, [selectedJobId, showAll, q, status, jobField])

  const selectedApp = useMemo(
    () => apps.find(a => a.id === selectedAppId) || null,
    [apps, selectedAppId]
  )

  async function onAddJob(e) {
    e.preventDefault()
    setAddError('')
    setAddLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      title: (fd.get('title') || '').toString().trim(),
      location: (fd.get('location') || '').toString().trim(),
      type: (fd.get('type') || '').toString(),
      salary: (fd.get('salary') || '').toString().trim(),
      summary: (fd.get('summary') || '').toString().trim(),
      job_field: (fd.get('job_field') || '').toString()
    }
    if (!payload.title) { setAddError('Title is required'); setAddLoading(false); return }
    try {
      const created = await createJob(payload)
      setJobs(prev => [created, ...prev])
      setSelectedJobId(created.id)
      e.currentTarget.reset()
    } catch (err) {
      setAddError(err.message || 'Failed to create job')
    } finally {
      setAddLoading(false)
    }
  }

  async function onStatus(appId, next) {
    try {
      await updateApplicationStatus(appId, next)
      // local update
      setApps(prev => prev.map(a => a.id === appId ? { ...a, status: next } : a))
      if (selectedAppId === appId) {
        // keep details in sync
        const updated = apps.find(a => a.id === appId)
        if (updated) updated.status = next
      }
    } catch (err) {
      alert(err.message || 'Failed to update status')
    }
  }

  return (
    <>
      <Header />

      <section className="section">
        <div className="container">

          <div className="home-header">
            <div>
              <h2 style={{ margin: 0 }}>Company Dashboard</h2>
              <p className="muted">Post jobs, review candidates, and manage interviews.</p>
            </div>
          </div>

          {/* Add Job */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ marginTop: 0 }}>Add Job Posting</h3>
            {addError && <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>{addError}</div>}
            <form onSubmit={onAddJob} style={{ display: 'grid', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 10 }}>
                <input name="title" className="input" placeholder="Job title *" required />
                <input name="location" className="input" placeholder="Location" />
                <select name="type" className="input" defaultValue="Full-time">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <select name="job_field" className="input" defaultValue="">
                  <option value="">Field…</option>
                  <option>Development</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}>
                <input name="salary" className="input" placeholder="Salary range e.g. $2k–$3k" />
                <input name="summary" className="input" placeholder="Short summary (optional)" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button className="btn btn-primary" type="submit" disabled={addLoading}>
                  {addLoading ? 'Publishing…' : 'Publish job'}
                </button>
              </div>
            </form>
          </div>

          {/* Filters + scope toggle */}
          <div className="card" style={{ marginBottom: 12, display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input className="input" placeholder="Search candidate…" value={q} onChange={e => setQ(e.target.value)} />
              <select className="input" value={jobField} onChange={e => setJobField(e.target.value)}>
                <option value="">All fields</option>
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">All statuses</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={showAll} onChange={e => setShowAll(e.target.checked)} />
                <span className="muted">Show applicants from all my jobs</span>
              </label>
            </div>
          </div>

          <div className="company-grid">
            {/* Left: My postings */}
            <div className="card">
              <div className="list-head">
                <h3 style={{ margin: 0 }}>My Job Postings</h3>
              </div>
              {jobsLoading ? (
                <div className="muted">Loading jobs…</div>
              ) : jobsError ? (
                <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>{jobsError}</div>
              ) : (
                <div className="jobs-list">
                  {jobs.map(job => (
                    <article
                      key={job.id}
                      className={`job-row ${selectedJobId === job.id && !showAll ? 'active' : ''}`}
                      onClick={() => { setSelectedJobId(job.id); setSelectedAppId(null); setShowAll(false) }}
                      title={job.summary}
                    >
                      <div style={{ fontWeight: 700 }}>{job.title}</div>
                      <div className="muted">{job.location} • {job.type}</div>
                      <div className="muted">{job.salary}</div>
                    </article>
                  ))}
                  {jobs.length === 0 && <div className="muted">No postings yet.</div>}
                </div>
              )}
            </div>

            {/* Middle: Applicants */}
            <div className="card">
              <div className="list-head">
                <h3 style={{ margin: 0 }}>Applicants</h3>
                {!showAll && selectedJobId && <div className="muted">Job ID: {selectedJobId}</div>}
                {showAll && <div className="muted">All my jobs</div>}
              </div>

              {appsLoading ? (
                <div className="muted">Loading applicants…</div>
              ) : appsError ? (
                <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>{appsError}</div>
              ) : (
                <div className="apps-list">
                  {apps.map(a => (
                    <article
                      key={a.id}
                      className="card app-row clickable"
                      onClick={() => setSelectedAppId(a.id)}
                      title={a.notes || ''}
                    >
                      <div className="app-main">
                        <div className="app-title">
                          {/* Ako Xano vraća candidate info kroz join, koristi npr. a.candidate.full_name */}
                          {a.candidate?.full_name || a.full_name || a.user_name || 'Candidate'}
                        </div>
                        <div className="muted">
                          {(a.__job?.title || a.job_title) ? (a.__job?.title || a.job_title) : 'Job'}{a.__job?.location ? ` • ${a.__job.location}` : ''}
                        </div>
                      </div>
                      <span className={`badge ${String(a.status || '').toLowerCase()}`}>{a.status}</span>
                    </article>
                  ))}
                  {apps.length === 0 && <div className="muted">No applicants found.</div>}
                </div>
              )}
            </div>

            {/* Right: Candidate details */}
            <div className="card">
              <div className="list-head">
                <h3 style={{ margin: 0 }}>Candidate Details</h3>
              </div>
              {!selectedApp ? (
                <div className="muted">Select a candidate to view details.</div>
              ) : (
                <div className="candidate-details" style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: '#e5fbe1', display: 'grid', placeItems: 'center', fontWeight: 800 }}>
                      {(selectedApp.candidate?.full_name || selectedApp.full_name || 'C').slice(0, 1)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800 }}>{selectedApp.candidate?.full_name || selectedApp.full_name || 'Candidate'}</div>
                      <div className="muted">{selectedApp.candidate?.headline || selectedApp.headline || ''}</div>
                    </div>
                  </div>

                  {selectedApp.candidate?.summary && <p style={{ marginTop: 10 }}>{selectedApp.candidate.summary}</p>}
                  {selectedApp.summary && !selectedApp.candidate?.summary && <p style={{ marginTop: 10 }}>{selectedApp.summary}</p>}

                  <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => onStatus(selectedApp.id, 'Interview')}>Invite to interview</button>
                    <button className="btn btn-ghost" onClick={() => onStatus(selectedApp.id, 'Offer')}>Offer</button>
                    <button className="btn btn-ghost" onClick={() => onStatus(selectedApp.id, 'Rejected')}>Reject</button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
