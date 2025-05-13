import React from "react";
import { useSelector , useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../redux/slices/usersSlice"; // Import the logout action



const User = () => {
    const currentUser = useSelector((state) => state.Users.currentUser); // Get currentUser from Redux

    const dispatch = useDispatch(); // Initialize useDispatch

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
        <div className="container mt-5">
            {currentUser ? (
                <div
                    style={{ position: "relative", display: "inline-block" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <h2
                        style={{ display: "inline-block", marginRight: "10px" }}
                        title="לחץ להתנתקות"
                    >
                        🤩 {currentUser}
                    </h2>
                    <button
                        style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: "-80px",
                            display: "none",
                            backgroundColor: "#dc3545",
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
                <h2>🤔 משתמש לא מחובר</h2>
            )}
        </div>
    );
};

export default User;