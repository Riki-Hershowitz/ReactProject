import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import beforeGlasses from '../images/demo-before.png';
import afterGlasses from '../images/demo-after.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import img4 from '../images/4.png';

const HomePage = () => {
  const wrapperRef = useRef();

  const handleMouseMove = (e) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    wrapper.style.setProperty('--clip-width', `${percentage}%`);
  };

  const handleMouseLeave = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.setProperty('--clip-width', `50%`);
  };

  return (
    <div className="homepage-container">

      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-between p-5 bg-light flex-wrap-reverse">
        <motion.div
          className="text-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="display-4 fw-bold">ברוכים הבאים ל-VisionPro</h1>
          <p className="lead">התאמה חכמה של משקפיים לפי מראה הפנים שלך</p>
          <button className="btn btn-primary mt-3" onClick={() => window.location.href = '/products'}>
            לעיון בקולקציה
          </button>
        </motion.div>

        <motion.div
          className="comparison-image-wrapper"
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={beforeGlasses} alt="לפני" className="comparison-image" />
          <img src={afterGlasses} alt="אחרי" className="comparison-image clipped" />
          <div className="divider-line" />
        </motion.div>
      </div>

      {/* Why Us Section */}
      <section className="why-section bg-white py-5 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="mb-4">?למה לבחור ב-VisionPro</h2>
          <ul className="list-unstyled lead">
            <li>התאמה מדויקת של משקפיים לפי מבנה פנים</li>
            <li>חוויה אינטראקטיבית וחיה</li>
            <li>אפשרות לנסות קולקציות שונות בלחיצת כפתור</li>
            <li>מותאם לעדכונים עתידיים באתר</li>
          </ul>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="products-section bg-light py-5">
        <div className="container">
          <h3 className="text-center mb-5">מוצרים נבחרים</h3>
          <div className="row text-center">
            {[
              { image: img2 ,name: 'Classic Clear', desc: 'מסגרת עדינה ונקייה' },
              { image: img3 ,name: 'Urban Sun', desc: 'משקיות עם הגנה מלאה' },
              { image: img4 ,name: 'FlexFit', desc: 'משקפי עבודה קשוחים' },
            ].map((product, index) => (
              <motion.div
                className="col-md-4 mb-4"
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <img src={product.image} alt={product.name} className="card-img-top" />
                    <h5 className="card-title fw-bold">{product.name}</h5>
                    <p className="card-text">{product.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
