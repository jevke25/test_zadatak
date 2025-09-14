import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CandidateHome() {
  // placeholder podaci; kasnije ćemo fetch sa Xano (/jobs, /applications)
  const [apps] = useState([
    { id: 1, company: 'Microsoft', position: 'Frontend Dev', status: 'Applied' },
    { id: 2, company: 'Mailchimp', position: 'UI Designer', status: 'Interview' },
    { id: 3, company: 'Behance', position: 'Product Designer', status: 'Rejected' },
  ])

  return (
    <>
      <Header/>

      <section className="section">
        <div className="container">
          <div className="home-header">
            <div>
              <h2 style={{margin:0}}>Welcome back 👋</h2>
              <p className="muted">Track your applications and find new roles in one place.</p>
            </div>
            <div className="home-actions">
              <Link to="/" className="btn btn-ghost">Find Jobs</Link>
              <Link to="/my-applications" className="btn btn-primary">My Applications</Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="stats-grid">
            <div className="card stat">
              <div className="stat-num">{apps.length}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="card stat">
              <div className="stat-num">{apps.filter(a=>a.status==='Interview').length}</div>
              <div className="stat-label">Interviews</div>
            </div>
            <div className="card stat">
              <div className="stat-num">{apps.filter(a=>a.status==='Applied').length}</div>
              <div className="stat-label">In Review</div>
            </div>
          </div>

          {/* Recent applications */}
          <div className="section" style={{paddingTop:24}}>
            <div className="list-head">
              <h3 style={{margin:0}}>Recent Applications</h3>
              <Link to="/my-applications" className="link">View all</Link>
            </div>

            <div className="apps-list">
              {apps.map(a => (
                <article key={a.id} className="card app-row">
                  <div className="app-main">
                    <div className="app-title">{a.position}</div>
                    <div className="muted">{a.company}</div>
                  </div>
                  <span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span>
                  <div className="row-actions">
                    
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
