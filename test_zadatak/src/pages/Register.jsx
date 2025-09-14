import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [summary, setSummary] = useState('')
  const [size, setSize] = useState('') // samo za company
  const [role, setRole] = useState('candidate') // candidate | company

  function onSubmit(e) {
    e.preventDefault()
    alert(`Submitted as ${role} (UI only). API integration comes next.`)
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 620 }}>
          <h2 style={{ marginBottom: 8 }}>Create an account</h2>
          <p
            style={{
              color: 'var(--muted)',
              marginTop: 0,
              marginBottom: 18
            }}
          >
            Sign up to track your job applications.
          </p>

          <form
            onSubmit={onSubmit}
            className="card"
            style={{ display: 'grid', gap: 12 }}
          >
            {/* Toggle Candidate/Company */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`btn ${
                  role === 'candidate' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`btn ${
                  role === 'company' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                Company
              </button>
            </div>

            {/* Conditional fields */}
            {role === 'candidate' ? (
              <>
                <label>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Full name
                  </div>
                  <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Short summary (optional)
                  </div>
                  <textarea
                    className="input"
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write a short bio about yourself…"
                  />
                </label>
              </>
            ) : (
              <>
                <label>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Company name
                  </div>
                  <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Company Inc."
                    required
                  />
                </label>
                <label>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Company summary (optional)
                  </div>
                  <textarea
                    className="input"
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="A short description of your company…"
                  />
                </label>
                <label>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Company size
                  </div>
                  <select
                    className="input"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </label>
              </>
            )}

            {/* Shared fields */}
            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Email</div>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Password</div>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" type="submit">
                Create account
              </button>
              <Link className="btn btn-ghost" to="/login">
                Login
              </Link>
            </div>
          </form>

          <p style={{ marginTop: 12 }}>
            Already have an account? <Link to="/">Back to home</Link>
          </p>
        </div>
      </section>
    </>
  )
}
