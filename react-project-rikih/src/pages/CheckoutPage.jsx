import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const totalPrice = useSelector((state) => state.cart.totalPrice); // סכום לתשלום מה-Redux Store
    const currentUser = useSelector((state) => state.Users.currentUser);
    const navigate = useNavigate();


    useEffect(() => {
        if(totalPrice===0){
            alert("העגלה ריקה, אנא הוסף מוצרים לעגלה לפני התשלום.");
            navigate("/products"); // הפניה לדף המוצרים
        }
        if (!currentUser) {
            alert("עליך להתחבר או להירשם כדי לבצע תשלום.");
            navigate("/login"); // הפניה לדף ההתחברות
        }
    }, [currentUser, navigate]);

    // אימות פרטי כרטיס אשראי
    const validateCreditCard = (creditCardNumber) => /^[0-9]{16}$/.test(creditCardNumber); // מספר אשראי חייב להיות 16 ספרות
    const validateCVV = (cvv) => /^[0-9]{3,4}$/.test(cvv); // CVV חייב להיות 3 או 4 ספרות
    const validateExpiryDate = (expiryDate) => {
        const [month, year] = expiryDate.split("/");
        const currentDate = new Date();
        const expiry = new Date(`20${year}`, month - 1);
        return expiry > currentDate && month >= 1 && month <= 12;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const creditCard = document.getElementById("creditCard").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        if (!validateCreditCard(creditCard)) {
            alert("מספר האשראי שהוזן אינו תקין. אנא נסה שוב.");
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            alert("תוקף כרטיס האשראי שהוזן אינו תקין.");
            return;
        }

        if (!validateCVV(cvv)) {
            alert("קוד ה-CVV שהוזן אינו תקין.");
            return;
        }

        setPaymentSuccess(true);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">תשלום</h1>
            <h3 className="text-center">סכום לתשלום: ₪{totalPrice}</h3>
            {!paymentSuccess ? (
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="creditCard" className="form-label">מספר כרטיס אשראי</label>
                        <input type="text" className="form-control" id="creditCard" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">תוקף כרטיס (MM/YY)</label>
                        <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" placeholder="123" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cardHolderName" className="form-label">שם בעל הכרטיס</label>
                        <input type="text" className="form-control" id="cardHolderName" placeholder="שם מלא" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">שלם</button>
                </form>
            ) : (
                <div className="alert alert-success mt-4 text-center" role="alert">
                    התשלום בוצע בהצלחה!
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;