import Header from './components/Header'
import Hero from './components/Hero'
import JobCard from './components/JobCard'
import Categories from './components/Categories'

export default function App(){
  return (
    <>
      <Header/>
      <Hero/>

      <section className="section">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>Trending Jobs</h2>
          <a href="#" style={{color:'#1d4ed8',fontWeight:700,textDecoration:'none'}}>See All Jobs</a>
        </div>
        <div className="container">
          <div className="grid">
            <JobCard title="Senior UI Designer" brand="Microsoft" city="Glendale, CA" type="Full-time" price="$20K"/>
            <JobCard title="Product Designer" brand="Behance" city="Andover, MA" type="Remote" price="$25K"/>
            <JobCard title="Marketing Officer" brand="Mailchimp" city="Weston, MA" type="Full-time" price="$15K"/>
          </div>
        </div>
      </section>

      <Categories/>
    </>
  )
}
