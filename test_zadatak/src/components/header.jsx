import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <motion.header 
      className="site-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-bar">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link className="logo" to="/" onClick={closeMenu}>TestZadatak</Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {!isCompany && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">Find jobs</Link>
            </motion.div>
          )}
          {!isCompany && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/home">My applications</Link>
            </motion.div>
          )}
          { isCompany && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/company">Dashboard</Link>
            </motion.div>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="auth-desktop">
          {!isAuthed ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link className="btn btn-ghost" to="/login">Login</Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link className="btn btn-primary" to="/register">Register</Link>
              </motion.div>
            </>
          ) : (
            <motion.button 
              className="btn btn-ghost" 
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <motion.button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(s => !s)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span/>
          <span/>
          <span/>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="mobile-menu open" 
            role="dialog" 
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="mobile-menu-inner container"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="mobile-links" onClick={closeMenu}>
                {!isCompany && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/">Find jobs</Link>
                  </motion.div>
                )}
                {!isCompany && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/home">My applications</Link>
                  </motion.div>
                )}
                { isCompany && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/company">Dashboard</Link>
                  </motion.div>
                )}
              </nav>

              <div className="mobile-auth">
                {!isAuthed ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link className="btn btn-ghost" to="/login" onClick={closeMenu}>Login</Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link className="btn btn-primary" to="/register" onClick={closeMenu}>Register</Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.button 
                    className="btn btn-ghost" 
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
