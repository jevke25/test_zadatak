import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
              <h2 style={{margin:0}}>Welcome back 👋</h2>
              <p className="muted">Track your applications and find new roles in one place.</p>
            </div>
            <div className="home-actions">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="btn btn-ghost">Find Jobs</Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/my-applications" className="btn btn-primary">My Applications</Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div 
            className="stats-grid"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="card stat"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-num">{apps.length}</div>
              <div className="stat-label">Total Applications</div>
            </motion.div>
            <motion.div 
              className="card stat"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-num">{apps.filter(a=>a.status==='Interview').length}</div>
              <div className="stat-label">Interviews</div>
            </motion.div>
            <motion.div 
              className="card stat"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-num">{apps.filter(a=>a.status==='Applied').length}</div>
              <div className="stat-label">In Review</div>
            </motion.div>
          </motion.div>

          {/* Recent applications */}
          <motion.div 
            className="section" 
            style={{paddingTop:24}}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="list-head">
              <h3 style={{margin:0}}>Recent Applications</h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/my-applications" className="link">View all</Link>
              </motion.div>
            </div>

            <div className="apps-list">
              {apps.map((a, index) => (
                <motion.article 
                  key={a.id} 
                  className="card app-row"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="app-main">
                    <div className="app-title">{a.position}</div>
                    <div className="muted">{a.company}</div>
                  </div>
                  <span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span>
                  <div className="row-actions">
                    
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.section>
    </>
  )
}
