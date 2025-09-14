import { Link } from 'react-router-dom'

export default function Header(){
  const role = localStorage.getItem('role') // 'company' ili 'candidate' ili null

  return (
    <header className="header container">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:36,height:36,borderRadius:8,background:'#c8ffbf',display:'grid',placeItems:'center',fontWeight:800,color:'#0a2e0a'}}>W</div>
        <strong>AZIFA</strong>
      </div>

      {/* Sakrij mid-nav za company */}
      {role !== 'company' && (
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/">Find Jobs</Link>
          <Link to="/">Job Alerts</Link>
          <Link to="/">Find Candidates</Link>
          <Link to="/">Career Advice</Link>
        </nav>
      )}

      <div style={{display:'flex', gap:10}}>
        {role === 'company' ? (
          <>
            <Link className="btn btn-ghost" to="/company">Dashboard</Link>
            <button className="btn btn-ghost" onClick={()=>{
              localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href='/'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Sign in</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
