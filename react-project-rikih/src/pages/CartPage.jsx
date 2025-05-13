import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import ProductCard from "../components/ProductCard";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const navigate = useNavigate(); // Hook for navigation

    const handleCheckout = () => {
        navigate("/checkout"); 
    };

    return(
        <div className="container mt-5 text-center" >
            <div className="row text-center">
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4 text-center">
                            <ProductCard product={product} context="cart" />
                        </div>
                    ))
                ) : (
                    <p>התחילו לאסוף מוצרים</p>
                )}
            </div>
            <h3 className="text-center">סכום לתשלום: ₪{totalPrice}</h3>
            <button className="btn btn-primary text-center" onClick={handleCheckout}>לתשלום</button>
        </div>
    );
}

export default CartPage;