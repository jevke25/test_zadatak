import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateThankYouMessage } from '../services/openai';

export default function JobCard({ 
  brand='Microsoft', 
  title='Senior UI Designer', 
  city='Glendale, CA', 
  type='Full-time', 
  price='$20K',
  id 
}){
  const [isApplying, setIsApplying] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (isApplied) return;
    
    setIsApplying(true);
    
    try {
      // Simuliramo apliciranje
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generišemo zahvalnicu
      const candidateName = localStorage.getItem('userName') || 'Dragi kandidat';
      const message = await generateThankYouMessage(title, brand, candidateName);
      
      setThankYouMessage(message);
      setIsApplied(true);
      setShowThankYou(true);
      
      // Sakrijemo zahvalnicu nakon 5 sekundi
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
      
    } catch (error) {
      console.error('Greška pri apliciranju:', error);
      alert('Došlo je do greške pri apliciranju. Molimo pokušajte ponovo.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <motion.article 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <h3>{title}</h3>
      <p>Take advantage of a rare opportunity to start from the ground up and build…</p>
      <div className="meta">
        <span>{brand}</span>
        <span>• {city}</span>
        <span>• {type}</span>
      </div>
      <div className="price">{price} <span style={{fontWeight:600,color:'#64748b',fontSize:14}}>Monthly</span></div>
      <div className="actions">
        <motion.button 
          className={`btn ${isApplied ? 'btn-primary' : 'btn-ghost'}`}
          onClick={handleApply}
          disabled={isApplying}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isApplying ? 'Applying...' : isApplied ? 'Applied ✓' : 'Apply Now'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="thank-you-message"
            style={{
              marginTop: '16px',
              padding: '12px',
              background: 'linear-gradient(135deg, #e8f5e8, #f0f9ff)',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#065f46' }}>
              🎉 Zahvalnica
            </div>
            <div style={{ color: '#374151' }}>
              {thankYouMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
