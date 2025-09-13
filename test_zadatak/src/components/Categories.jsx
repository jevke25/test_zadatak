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
    <section className="section">
      <div className="container">
        <h2>One platform <strong>Many Solutions</strong></h2>
        <div className="pills" style={{marginTop:10}}>
          {items.map(([title, meta])=>(
            <span key={title} className="pill">
              <span style={{width:8,height:8,background:'#1d4ed8',borderRadius:999}}/>
              {title}
              <span style={{color:'#64748b',fontWeight:500}}>• {meta}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
