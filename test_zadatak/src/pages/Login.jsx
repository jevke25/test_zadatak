import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    // TODO: ovde ćemo kasnije zvati Xano /auth/login
    localStorage.setItem('token', 'dev-token')
    navigate('/home')
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <h2>Sign in</h2>
          <form
            onSubmit={onSubmit}
            className="card"
            style={{ display: 'grid', gap: 12 }}
          >
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button className="btn btn-primary" type="submit">
              Sign in
            </button>
          </form>
          <p style={{ marginTop: 12 }}>
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </section>
    </>
  )
}
