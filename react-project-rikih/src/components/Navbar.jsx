import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">VisionPro</Link> {/* Use Link for navigation */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">בית</Link> {/* Link to Home */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">מוצרים</Link> {/* Link to Products */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">אודות</Link> {/* Example for About */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cart">🛒</Link> {/* Example for Contact */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;