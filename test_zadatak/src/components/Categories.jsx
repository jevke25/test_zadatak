import { motion } from 'framer-motion';

const items = [
  ['Marketing','58 Jobs Available'],
  ['Development','43 Jobs Available'],
  ['UI/UX Design','76 Jobs Available'],
  ['Human Research','120 Jobs Available'],
  ['Security','90 Jobs Available'],
  ['Business','33 Jobs Available'],
  ['Management','52 Jobs Available'],
  ['Finance','80 Jobs Available'],
]

export default function Categories(){
  return (
    <motion.section 
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          One platform <strong>Many Solutions</strong>
        </motion.h2>
        <div className="pills" style={{marginTop:10}}>
          {items.map(([title, meta], index) => (
            <motion.span 
              key={title} 
              className="pill"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{width:8,height:8,background:'#1d4ed8',borderRadius:999}}/>
              {title}
              <span style={{color:'#64748b',fontWeight:500}}>• {meta}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
