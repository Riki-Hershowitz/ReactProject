import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom"; // ייבוא useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // יצירת משתנה ניווט

    const handleRegister = (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        let healthFund = document.getElementById("healthFund").value;

        if (password !== confirmPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }

        if (healthFund === "none") {
            healthFund = "ללא";
        }

        dispatch(register({ username: name, email, password, healthFund }));
        navigate("/"); // מעבר לדף הבית לאחר ההרשמה
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const name = document.getElementById("loginName").value;
        const password = document.getElementById("loginPassword").value;
        dispatch(login({ username: name, password }));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
            }}
        >
            <div
                className="p-5 rounded shadow"
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    backgroundColor: "#fff",
                    fontFamily: "Helvetica Neue, sans-serif",
                }}
            >
                <h2
                    className="mb-4 text-center"
                    style={{ fontWeight: "300", color: "#333" }}
                >
                    {isRegistering ? "הרשמה" : "התחברות"}
                </h2>
                <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                    {isRegistering ? (
                        <>
                            <div className="mb-3">
                                <label
                                    htmlFor="registerName"
                                    className="form-label"
                                >
                                    שם
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerName"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="registerEmail"
                                    className="form-label"
                                >
                                    אימייל
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="registerEmail"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="registerPassword"
                                    className="form-label"
                                >
                                    סיסמה
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="registerPassword"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="confirmPassword"
                                    className="form-label"
                                >
                                    אישור סיסמה
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="healthFund"
                                    className="form-label"
                                >
                                    בחר קופת חולים
                                </label>
                                <select
                                    className="form-select"
                                    id="healthFund"
                                    required
                                >
                                    <option value="none">ללא</option>
                                    <option value="Clalit">כללית</option>
                                    <option value="Maccabi">מכבי</option>
                                    <option value="Meuhedet">מאוחדת</option>
                                    <option value="Leumit">לאומית</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label
                                    htmlFor="loginName"
                                    className="form-label"
                                >
                                    שם
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="loginName"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="loginPassword"
                                    className="form-label"
                                >
                                    סיסמה
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "rgb(246, 188, 100)",
                            border: "none",
                            color: "#fff",
                            fontWeight: "400",
                            padding: "10px",
                            borderRadius: "25px",
                            transition: "background-color 0.3s",
                            boxShadow:
                                "0 4px 6px rgba(246, 188, 100, 0.2)",
                        }}
                    >
                        {isRegistering ? "הרשם" : "התחבר"}
                    </button>
                </form>
                <p
                    className="text-center mt-4"
                    style={{ fontSize: "14px", color: "#555" }}
                >
                    {isRegistering ? "כבר יש לך חשבון?" : "אין לך חשבון?"}{" "}
                    <button
                        className="btn btn-link p-0"
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{
                            color: "rgb(246, 188, 100)",
                            fontWeight: "500",
                            textDecoration: "none",
                        }}
                    >
                        {isRegistering ? "התחבר" : "הרשם"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;