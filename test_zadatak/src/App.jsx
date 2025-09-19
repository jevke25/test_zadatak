import { motion } from 'framer-motion';
import Header from './components/Header'
import Hero from './components/Hero'
import JobCard from './components/JobCard'
import Categories from './components/Categories'

export default function App(){
  return (
    <>
      <Header/>
      <Hero/>

      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Trending Jobs
          </motion.h2>
          <motion.a 
            href="#" 
            style={{color:'#1d4ed8',fontWeight:700,textDecoration:'none'}}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            See All Jobs
          </motion.a>
        </div>
        <div className="container">
          <div className="grid">
            <JobCard title="Senior UI Designer" brand="Microsoft" city="Glendale, CA" type="Full-time" price="$20K" id={1}/>
            <JobCard title="Product Designer" brand="Behance" city="Andover, MA" type="Remote" price="$25K" id={2}/>
            <JobCard title="Marketing Officer" brand="Mailchimp" city="Weston, MA" type="Full-time" price="$15K" id={3}/>
            <JobCard title="Frontend Developer" brand="Google" city="Mountain View, CA" type="Full-time" price="$30K" id={4}/>
            <JobCard title="Backend Engineer" brand="Amazon" city="Seattle, WA" type="Remote" price="$28K" id={5}/>
            <JobCard title="DevOps Specialist" brand="Netflix" city="Los Gatos, CA" type="Full-time" price="$32K" id={6}/>
            <JobCard title="Data Scientist" brand="Meta" city="Menlo Park, CA" type="Full-time" price="$35K" id={7}/>
            <JobCard title="UX Researcher" brand="Apple" city="Cupertino, CA" type="Hybrid" price="$26K" id={8}/>
            <JobCard title="Mobile Developer" brand="Uber" city="San Francisco, CA" type="Full-time" price="$29K" id={9}/>
            <JobCard title="Cloud Architect" brand="Salesforce" city="San Francisco, CA" type="Remote" price="$40K" id={10}/>
            <JobCard title="Security Analyst" brand="IBM" city="Armonk, NY" type="Full-time" price="$24K" id={11}/>
            <JobCard title="Product Manager" brand="Spotify" city="New York, NY" type="Hybrid" price="$33K" id={12}/>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Categories/>
      </motion.div>
    </>
  )
}
