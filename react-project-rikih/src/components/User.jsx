import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/usersSlice";
import { LogOut, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const User = () => {
    const currentUser = useSelector((state) => state.Users.currentUser);
    const dispatch = useDispatch();

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {currentUser && currentUser.username ? (
                <>
                    <button
                        onClick={() => dispatch(logout())}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "#f2f2f2",
                            color: "#333",
                            border: "1px solid #ccc",
                            borderRadius: "20px",
                            padding: "5px 12px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e0e0e0")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f2f2f2")
                        }
                    >
                        <LogOut size={16} />
                        התנתקות
                    </button>
                    <span
                        style={{
                            color: "#333", // צבע שחור
                            fontFamily: "'Roboto', sans-serif", // גופן Roboto
                            fontWeight: "400", // כתב רגיל
                            fontSize: "1.2em", // גודל קטן יותר
                        }}
                        title="משתמש מחובר"
                    >
                        שלום, {currentUser.username}
                    </span>
                </>
            ) : (
                <Link
                    to="/login"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                    }}
                    title="התחברות"
                >
                    <UserCircle size={22} />
                </Link>
            )}
        </div>
    );
};

export default User;