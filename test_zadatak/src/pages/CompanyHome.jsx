import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">

          <motion.div 
            className="home-header"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Company Dashboard</h2>
              <p className="muted">Post jobs, review candidates, and manage interviews.</p>
            </div>
          </motion.div>

          {/* Add Job */}
          <motion.div 
            className="card" 
            style={{ marginBottom: 16 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
                <motion.button 
                  className="btn btn-primary" 
                  type="submit" 
                  disabled={addLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {addLoading ? 'Publishing…' : 'Publish job'}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Filters + scope toggle */}
          <motion.div 
            className="card" 
            style={{ marginBottom: 12, display: 'grid', gap: 10 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
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
          </motion.div>

          <motion.div 
            className="company-grid"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Left: My postings */}
            <motion.div 
              className="card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="list-head">
                <h3 style={{ margin: 0 }}>My Job Postings</h3>
              </div>
              {jobsLoading ? (
                <div className="muted">Loading jobs…</div>
              ) : jobsError ? (
                <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>{jobsError}</div>
              ) : (
                <div className="jobs-list">
                  {jobs.map((job, index) => (
                    <motion.article
                      key={job.id}
                      className={`job-row ${selectedJobId === job.id && !showAll ? 'active' : ''}`}
                      onClick={() => { setSelectedJobId(job.id); setSelectedAppId(null); setShowAll(false) }}
                      title={job.summary}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div style={{ fontWeight: 700 }}>{job.title}</div>
                      <div className="muted">{job.location} • {job.type}</div>
                      <div className="muted">{job.salary}</div>
                    </motion.article>
                  ))}
                  {jobs.length === 0 && <div className="muted">No postings yet.</div>}
                </div>
              )}
            </motion.div>

            {/* Middle: Applicants */}
            <motion.div 
              className="card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
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
                  {apps.map((a, index) => (
                    <motion.article
                      key={a.id}
                      className="card app-row clickable"
                      onClick={() => setSelectedAppId(a.id)}
                      title={a.notes || ''}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
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
                    </motion.article>
                  ))}
                  {apps.length === 0 && <div className="muted">No applicants found.</div>}
                </div>
              )}
            </motion.div>

            {/* Right: Candidate details */}
            <motion.div 
              className="card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="list-head">
                <h3 style={{ margin: 0 }}>Candidate Details</h3>
              </div>
              {!selectedApp ? (
                <div className="muted">Select a candidate to view details.</div>
              ) : (
                <motion.div 
                  className="candidate-details" 
                  style={{ display: 'grid', gap: 10 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
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
                    <motion.button 
                      className="btn btn-primary" 
                      onClick={() => onStatus(selectedApp.id, 'Interview')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Invite to interview
                    </motion.button>
                    <motion.button 
                      className="btn btn-ghost" 
                      onClick={() => onStatus(selectedApp.id, 'Offer')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Offer
                    </motion.button>
                    <motion.button 
                      className="btn btn-ghost" 
                      onClick={() => onStatus(selectedApp.id, 'Rejected')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reject
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

        </div>
      </motion.section>
    </>
  )
}
