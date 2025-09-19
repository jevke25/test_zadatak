import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const navigate = useNavigate()

  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [role, setRole]   = useState(() => localStorage.getItem('role'))
  const [open, setOpen]   = useState(false)

  const isAuthed = !!token
  const isCompany = role === 'company'

  // sync with localStorage changes (login/logout/register)
  useEffect(() => {
    const onAuth = () => {
      setToken(localStorage.getItem('token'))
      setRole(localStorage.getItem('role'))
    }
    window.addEventListener('storage', onAuth)
    window.addEventListener('auth-updated', onAuth)
    return () => {
      window.removeEventListener('storage', onAuth)
      window.removeEventListener('auth-updated', onAuth)
    }
  }, [])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.dispatchEvent(new Event('auth-updated'))
    setOpen(false)
    navigate('/')
  }

  // close mobile menu on route changes via links
  function closeMenu() { setOpen(false) }

  return (
    <header className="site-header">
      <div className="container header-bar">
        <Link className="logo" to="/" onClick={closeMenu}>TestZadatak</Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {!isCompany && <Link to="/"        >Find jobs</Link>}
          {!isCompany && <Link to="/home"    >My applications</Link>}
          { isCompany && <Link to="/company" >Dashboard</Link>}
        </nav>

        {/* Desktop auth */}
        <div className="auth-desktop">
          {!isAuthed ? (
            <>
              <Link className="btn btn-ghost"   to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          ) : (
            <button className="btn btn-ghost" onClick={logout}>Logout</button>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(s => !s)}
        >
          <span/>
          <span/>
          <span/>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-menu-inner container">
          <nav className="mobile-links" onClick={closeMenu}>
            {!isCompany && <Link to="/">Find jobs</Link>}
            {!isCompany && <Link to="/home">My applications</Link>}
            { isCompany && <Link to="/company">Dashboard</Link>}
          </nav>

          <div className="mobile-auth">
            {!isAuthed ? (
              <>
                <Link className="btn btn-ghost"   to="/login" onClick={closeMenu}>Login</Link>
                <Link className="btn btn-primary" to="/register" onClick={closeMenu}>Register</Link>
              </>
            ) : (
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
