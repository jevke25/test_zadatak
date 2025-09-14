
import { Link } from 'react-router-dom'
export default function Header(){
  return (
    <header className="header container">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:36,height:36,borderRadius:8,background:'#c8ffbf',display:'grid',placeItems:'center',fontWeight:800,color:'#0a2e0a'}}>W</div>
        <strong>Test_platform</strong>
      </div>
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Find Jobs</a>
        <a href="#">Job Alerts</a>
        <a href="#">Find Candidates</a>
        <a href="#">Career Advice</a>
      </nav>
      <Link className="btn btn-primary" to="/register">Register Now</Link>
      
    </header>
  )
}
