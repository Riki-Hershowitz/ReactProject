import React from "react";

const CheckoutPage = () => {
    return(
        <div className="container mt-5">
            <h1 className="text-center">תשלום</h1>
            <form className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">שם מלא</label>
                    <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">אימייל</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">כתובת</label>
                    <input type="text" className="form-control" id="address" required />
                </div>
                <button type="submit" className="btn btn-primary">שלח</button>
            </form>
        </div>
    );
};

export default CheckoutPage;