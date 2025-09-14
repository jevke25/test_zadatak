import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    // Za sada samo dizajn/žica. API poziv dodajemo posle (Xano /auth/login).
    alert(`Login submit for ${email} (UI only)`)
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <h2 style={{ marginBottom: 8 }}>Sign in</h2>
          <p style={{ color: 'var(--muted)', marginTop: 0, marginBottom: 18 }}>
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={onSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
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

            <button className="btn btn-primary" type="submit">Sign in</button>
          </form>

          <p style={{ marginTop: 12 }}>
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </section>
    </>
  )
}
