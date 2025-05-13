import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector , useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../redux/slices/usersSlice"; 

const Navbar = () => {
    const currentUser = useSelector((state) => state.Users.currentUser); 
    const dispatch = useDispatch(); 

    const handleMouseEnter = (e) => {
        const button = e.currentTarget.querySelector(".logout-button");
        if (button) {
            button.style.display = "block";
        }
    };

    const handleMouseLeave = (e) => {
        const button = e.currentTarget.querySelector(".logout-button");
        if (button) {
            button.style.display = "none";
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#A9D8FF" }}>
            <div className="container-fluid">
                {currentUser ? (
                    <div
                        style={{ position: "relative", display: "inline-block" }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h4
                            style={{ display: "inline-block", marginRight: "10px", color: "#4CAF50" }}
                            title="לחץ להתנתקות">{currentUser}</h4>
                        <button
                            style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                right: "-80px",
                                display: "none",
                                backgroundColor: "#FFCA28", // צבע חרדל
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            className="logout-button"
                            onClick={() => dispatch(logout())}
                        >
                            התנתקות
                        </button>
                    </div>
                ) : (
                    <h4 style={{ color: "#FFCA28" }}>משתמש לא מחובר</h4> // צבע חרדל למידע על המשתמש
                )}

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cart" style={{ color: "#4CAF50" }}>🛒</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products" style={{ color: "#4CAF50" }}>מוצרים</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{ color: "#4CAF50" }}>התחברות</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/" style={{ color: "#4CAF50" }}>בית</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
