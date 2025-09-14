import { useState } from 'react'
import Header from '../components/Header'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [summary, setSummary] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    // Za sada samo UI (bez API poziva).
    // Ovde ćemo sutra ubaciti poziv ka Xano /auth/signup.
    alert('Submitted (UI only). API integration comes next.')
  }

  return (
    <>
      <Header/>
      <section className="section">
        <div className="container" style={{maxWidth:620}}>
          <h2 style={{marginBottom:8}}>Create an account</h2>
          <p style={{color:'var(--muted)',marginTop:0,marginBottom:18}}>Sign up to track your job applications.</p>

          <form onSubmit={onSubmit} className="card" style={{display:'grid',gap:12}}>
            <label>
              <div style={{fontWeight:600,marginBottom:6}}>Full name</div>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
            </label>

            <label>
              <div style={{fontWeight:600,marginBottom:6}}>Email</div>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>

            <label>
              <div style={{fontWeight:600,marginBottom:6}}>Password</div>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
            </label>

            <label>
              <div style={{fontWeight:600,marginBottom:6}}>Short summary (optional)</div>
              <textarea className="input" rows={4} value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Write a short bio about yourself…" />
            </label>

            <button className="btn btn-primary" type="submit">Create account</button>
          </form>

          <p style={{marginTop:12}}>
            Already have an account? <a href="/">Back to home</a>
          </p>
        </div>
      </section>
    </>
  )
}
