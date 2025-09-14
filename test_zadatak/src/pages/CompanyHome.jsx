import { useMemo, useState } from 'react'
import Header from '../components/Header'

export default function CompanyHome(){
  // Placeholder state — kasnije zamenjujemo Xano pozivima
  const [jobs, setJobs] = useState([
    { id: 101, title: 'Frontend Developer', location:'Remote', type:'Full-time', salary:'$2.5k–$3.5k', summary:'React + Vite, modern UI', created_at:'2025-09-01' },
    { id: 102, title: 'UI/UX Designer', location:'Belgrade', type:'Contract', salary:'$2k–$2.8k', summary:'Figma, design systems', created_at:'2025-09-05' },
  ])

  const [applicationsByJob, setApplicationsByJob] = useState({
    101: [
      { id: 1, user_id: 501, candidate:{ full_name:'Ana Marković', headline:'Junior FE Dev', summary:'React basics, CSS, Git' }, status:'Applied' },
      { id: 2, user_id: 502, candidate:{ full_name:'Milan Ilić', headline:'Mid FE Dev', summary:'React, TS, Testing' }, status:'Interview' },
    ],
    102: [
      { id: 3, user_id: 503, candidate:{ full_name:'Teodora Petrović', headline:'UI/UX', summary:'Wireframes, prototypes' }, status:'Applied' },
    ]
  })

  const [selectedJobId, setSelectedJobId] = useState(101)
  const apps = useMemo(() => applicationsByJob[selectedJobId] ?? [], [applicationsByJob, selectedJobId])

  const [selectedCandidateId, setSelectedCandidateId] = useState(null)
  const selectedCandidate = useMemo(()=>{
    return apps.find(a => a.id === selectedCandidateId) || null
  },[apps, selectedCandidateId])

  // Add job (UI only)
  function onAddJob(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const title = form.get('title')?.toString().trim()
    const location = form.get('location')?.toString().trim()
    const type = form.get('type')?.toString()
    const salary = form.get('salary')?.toString().trim()
    const summary = form.get('summary')?.toString().trim()
    if(!title) return alert('Title is required')
    const newJob = {
      id: Math.floor(Math.random()*100000),
      title, location, type, salary, summary,
      created_at: new Date().toISOString().slice(0,10)
    }
    setJobs(prev => [newJob, ...prev])
    e.currentTarget.reset()
    setSelectedJobId(newJob.id)
  }

  // Edit job inline (title only for demo)
  function updateJobTitle(id, nextTitle){
    setJobs(prev => prev.map(j => j.id===id ? {...j, title: nextTitle} : j))
  }

  // Company actions on candidate
  function setStatus(appId, next){
    setApplicationsByJob(prev => {
      const copy = {...prev}
      copy[selectedJobId] = (copy[selectedJobId]||[]).map(a => a.id===appId ? {...a, status: next} : a)
      return copy
    })
  }

  return (
    <>
      <Header/>

      <section className="section">
        <div className="container">

          <div className="home-header">
            <div>
              <h2 style={{margin:0}}>Company Dashboard</h2>
              <p className="muted">Post jobs, review candidates, and manage interviews.</p>
            </div>
          </div>

          {/* Add Job Posting */}
          <div className="card" style={{marginBottom:16}}>
            <h3 style={{marginTop:0}}>Add Job Posting</h3>
            <form onSubmit={onAddJob} style={{display:'grid', gap:10}}>
              <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:10}}>
                <input name="title" className="input" placeholder="Job title *" required />
                <input name="location" className="input" placeholder="Location" />
                <select name="type" className="input">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', gap:10}}>
                <input name="salary" className="input" placeholder="Salary range e.g. $2k–$3k" />
                <input name="summary" className="input" placeholder="Short summary (optional)" />
              </div>
              <div style={{display:'flex', justifyContent:'flex-end', gap:10}}>
                <button className="btn btn-primary" type="submit">Publish job</button>
              </div>
            </form>
          </div>

          {/* My Job Postings + Candidates */}
          <div className="company-grid">
            {/* Left: My postings */}
            <div className="card">
              <div className="list-head">
                <h3 style={{margin:0}}>My Job Postings</h3>
              </div>
              <div className="jobs-list">
                {jobs.map(job=>(
                  <article
                    key={job.id}
                    className={`job-row ${selectedJobId===job.id ? 'active' : ''}`}
                    onClick={()=>{ setSelectedJobId(job.id); setSelectedCandidateId(null); }}
                  >
                    <input
                      className="input job-title-input"
                      value={job.title}
                      onChange={e=>updateJobTitle(job.id, e.target.value)}
                    />
                    <div className="muted">{job.location} • {job.type}</div>
                    <div className="muted">{job.salary}</div>
                  </article>
                ))}
                {jobs.length===0 && <div className="muted">No postings yet.</div>}
              </div>
            </div>

            {/* Middle: Candidates for selected job */}
            <div className="card">
              <div className="list-head">
                <h3 style={{margin:0}}>Applicants</h3>
                <div className="muted">Job ID: {selectedJobId}</div>
              </div>

              <div className="apps-list">
                {apps.map(a=>(
                  <article
                    key={a.id}
                    className={`card app-row clickable`}
                    onClick={()=>setSelectedCandidateId(a.id)}
                  >
                    <div className="app-main">
                      <div className="app-title">{a.candidate.full_name}</div>
                      <div className="muted">{a.candidate.headline}</div>
                    </div>
                    <span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span>
                  </article>
                ))}
                {apps.length===0 && <div className="muted">No applicants yet.</div>}
              </div>
            </div>

            {/* Right: Candidate details */}
            <div className="card">
              <div className="list-head">
                <h3 style={{margin:0}}>Candidate Details</h3>
              </div>

              {!selectedCandidate ? (
                <div className="muted">Select a candidate to view details.</div>
              ) : (
                <div className="candidate-details">
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <div style={{width:40,height:40,borderRadius:999,background:'#e5fbe1',display:'grid',placeItems:'center',fontWeight:800}}>
                      {selectedCandidate.candidate.full_name.slice(0,1)}
                    </div>
                    <div>
                      <div style={{fontWeight:800}}>{selectedCandidate.candidate.full_name}</div>
                      <div className="muted">{selectedCandidate.candidate.headline}</div>
                    </div>
                  </div>
                  <p style={{marginTop:10}}>{selectedCandidate.candidate.summary}</p>

                  <div style={{display:'flex', gap:10, marginTop:10}}>
                    <button className="btn btn-primary" onClick={()=>setStatus(selectedCandidate.id, 'Interview')}>
                      Invite to interview
                    </button>
                    <button className="btn btn-ghost" onClick={()=>setStatus(selectedCandidate.id, 'Rejected')}>
                      Reject
                    </button>
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
