import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/usersSlice";
import { ShoppingBag, UserCircle, Search, LogOut } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const currentUser = useSelector((state) => state.Users.currentUser);
    const dispatch = useDispatch();

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #eee",
                padding: "10px 30px",
                fontFamily: "Helvetica Neue, sans-serif",
            }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* קבוצה ימנית: ניווט */}
                <div className="d-flex align-items-center">
                    <Link className="nav-link me-4" to="/products" style={{ color: "#333", fontWeight: "400" }}>
                        מוצרים
                    </Link>
                    <Link className="nav-link me-4" to="/" style={{ color: "#333", fontWeight: "400" }}>
                        בית
                    </Link>
                </div>

                {/* קבוצה אמצעית: לוגו/כותרת */}
                <div className="navbar-brand mx-auto" style={{ fontWeight: "600", fontSize: "20px", color: "#333" }}>
                    GlassStyle
                </div>

                {/* קבוצה שמאלית: אייקונים + משתמש */}
                <div className="d-flex align-items-center gap-3">

                    <Link className="nav-link" to="/cart" title="עגלה">
                        <ShoppingBag size={22} color="#333" />
                    </Link>

                    {/* משתמש מחובר */}
                    {currentUser && currentUser.username ? (
                        <div className="d-flex align-items-center gap-2">
                            <span
                                style={{
                                    color: "#4CAF50",
                                    fontWeight: "300",
                                    fontSize: "15px",
                                    marginInlineStart: "8px",
                                }}
                                title="משתמש מחובר"
                            >
                                {currentUser.username}
                            </span>

                            <button
                                onClick={() => dispatch(logout())}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    backgroundColor: "#f5f5f5",
                                    border: "1px solid #ccc",
                                    borderRadius: "20px",
                                    padding: "4px 10px",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                                title="התנתק"
                            >
                                <LogOut size={16} />
                                התנתקות
                            </button>
                        </div>
                    ) : (
                        <Link className="nav-link" to="/login" title="התחברות">
                            <UserCircle size={22} color="#333" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
