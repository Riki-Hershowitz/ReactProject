import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { register, login } from "../redux/slices/usersSlice";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName").value; // Get name
        const email = document.getElementById("registerEmail").value; // Get email
        const password = document.getElementById("registerPassword").value; // Get password
        const confirmPassword = document.getElementById("confirmPassword").value; // Get confirm password

        if (password !== confirmPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }

        dispatch(register({ username: name, email, password })); // Dispatch the register action
    };

    return (
        <div className="container mt-5">
            <div className="p-5 rounded mb-5 text-center">
                {isRegistering ? (
                    <>
                        <h2>הרשמה</h2>
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="registerName" className="form-label">שם</label>
                                <input type="text" className="form-control" id="registerName" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerEmail" className="form-label">אימייל</label>
                                <input type="email" className="form-control" id="registerEmail" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerPassword" className="form-label">סיסמה</label>
                                <input type="password" className="form-control" id="registerPassword" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">אישור סיסמה</label>
                                <input type="password" className="form-control" id="confirmPassword" required />
                            </div>
                            <button type="submit" className="btn btn-primary">הרשם</button>
                        </form>
                        <p className="mt-3">כבר יש לך חשבון? <button className="btn btn-link p-0" onClick={() => setIsRegistering(false)}>התחבר</button></p>
                    </>
                ) : (
                    <>
                        <h2>התחברות</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const name = document.getElementById("loginName").value; // Get name
                            const password = document.getElementById("loginPassword").value; // Get password
                            dispatch(login({ username: name, password })); // Dispatch the login action
                        }}>
                            <div className="mb-3">
                                <label htmlFor="loginName" className="form-label">שם</label>
                                <input type="text" className="form-control" id="loginName" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">סיסמה</label>
                                <input type="password" className="form-control" id="loginPassword" required />
                            </div>
                            <button type="submit" className="btn btn-primary">התחבר</button>
                        </form>
                        <p className="mt-3">אם אין לך חשבון, <button className="btn btn-link p-0" onClick={() => setIsRegistering(true)}>הרשמה</button></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;