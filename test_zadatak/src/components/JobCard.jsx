export default function JobCard({ brand='Microsoft', title='Senior UI Designer', city='Glendale, CA', type='Full-time', price='$20K'}){
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>Take advantage of a rare opportunity to start from the ground up and build…</p>
      <div className="meta">
        <span>{brand}</span>
        <span>• {city}</span>
        <span>• {type}</span>
      </div>
      <div className="price">{price} <span style={{fontWeight:600,color:'#64748b',fontSize:14}}>Monthly</span></div>
      <div className="actions">
        <button className="btn btn-ghost">Apply Now</button>
      </div>
    </article>
  )
}
