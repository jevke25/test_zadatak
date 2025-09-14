import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { loginUser } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser({ email, password }) // { token, user:{role,...} }
      localStorage.setItem('token', data.token)
      localStorage.setItem('role',  data.user.role)
      navigate(data.user.role === 'company' ? '/company' : '/home')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <h2>Sign in</h2>

          {error && <div className="card" style={{ borderColor:'#fecaca', background:'#fef2f2' }}>{error}</div>}

          <form onSubmit={onSubmit} className="card" style={{ display:'grid', gap:12 }}>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
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
