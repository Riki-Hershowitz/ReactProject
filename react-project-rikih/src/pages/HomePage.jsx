import React from 'react';
import myImage from '../images/1.jpg';

const HomePage = () => {
  return (
    <div className="container mt-5">

      {/* Image Section */}
        <div className="text-center mb-5">
        <img src={myImage} class="img-fluid" alt="VisionPro"></img>
        </div>
        
      {/* Hero Section */}
      <div className="bg-light p-5 rounded mb-5 text-center">
        <h2 className="mb-3">קולקציית 2025 עכשיו באתר</h2>
        <button className="btn btn-primary">לעיון בקולקציה</button>
      </div>

      {/* Featured Products */}
      <div className="mb-5">
        <h3 className="mb-4">מוצרים נבחרים</h3>
        <div className="row">
          {[
            { name: 'Classic Clear', desc: 'מסגרת עדינה בסגנון נקי' },
            { name: 'Urban Sun', desc: 'משקפי שמש עם הגנה מלאה' },
            { name: 'FlexFit', desc: 'משקפי עבודה עמידים במיוחד' },
          ].map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
