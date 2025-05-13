import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/usersSlice";
import { LogOut } from "lucide-react";

const User = () => {
    const currentUser = useSelector((state) => state.Users.currentUser);
    const dispatch = useDispatch();

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {currentUser && currentUser.username ? (
                <>
                    <span
                        style={{
                            color: "#4CAF50", // ירוק עדין
                            fontFamily: "Helvetica Neue, sans-serif",
                            fontWeight: "300",
                            fontSize: "16px",
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
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f2f2f2"}
                    >
                        <LogOut size={16} />
                        התנתקות
                    </button>
                </>
            ) : (
                <span style={{ color: "#aaa" }}>משתמש לא מחובר</span>
            )}
        </div>
    );
};

export default User;
