import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ShoppingBag } from 'lucide-react';
import User from './User';
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #eee",
                padding: "10px 30px", // הקטנת padding אנכי
                fontFamily: "Helvetica Neue, sans-serif",
            }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* קבוצה שמאלית: אייקונים + משתמש */}
                <div className="d-flex align-items-center gap-3">
                    <Link className="nav-link" to="/cart" title="עגלה">
                        <ShoppingBag size={22} color="#333" />
                    </Link>
                    <User />
                </div>

                {/* קבוצה ימנית: ניווט */}
                <div className="d-flex align-items-center">
                    <Link className="nav-link me-4" to="/products" style={{ color: "#333", fontWeight: "400" }}>
                        מוצרים
                    </Link>
                    <Link className="nav-link me-4" to="/" style={{ color: "#333", fontWeight: "400" }}>
                        בית
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;