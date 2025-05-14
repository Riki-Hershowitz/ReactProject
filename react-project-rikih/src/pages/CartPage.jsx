import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const navigate = useNavigate(); // Hook for navigation

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div
            className="container mt-5 p-4 rounded shadow"
            style={{
                backgroundColor: "#fff",
                fontFamily: "Helvetica Neue, sans-serif",
                color: "#333",
            }}
        >
            <h2
                className="mb-4 text-center"
                style={{
                    fontWeight: "300",
                    color: "rgb(246, 188, 100)",
                }}
            >
                עגלת הקניות שלי
            </h2>
            <div className="row text-center">
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <div
                            key={product.id}
                            className="col-md-4 mb-4 text-center"
                        >
                            <ProductCard product={product} context="cart" />
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            color: "#aaa",
                            fontSize: "18px",
                            fontWeight: "300",
                        }}
                    >
                        התחילו לאסוף מוצרים
                    </p>
                )}
            </div>
            <h3
                className="text-center mt-4"
                style={{
                    fontWeight: "400",
                    color: "#333",
                }}
            >
                סכום לתשלום:{" "}
                <span
                    style={{
                        color: "rgb(246, 188, 100)",
                        fontWeight: "500",
                    }}
                >
                    ₪{totalPrice}
                </span>
            </h3>
            <div className="text-center mt-4">
                <button
                    className="btn"
                    onClick={handleCheckout}
                    style={{
                        backgroundColor: "rgb(246, 188, 100)",
                        border: "none",
                        color: "#fff",
                        fontWeight: "400",
                        padding: "10px 20px",
                        borderRadius: "25px",
                        transition: "background-color 0.3s",
                        boxShadow: "0 4px 6px rgba(246, 188, 100, 0.2)",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgb(230, 170, 90)")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "rgb(246, 188, 100)")
                    }
                >
                    לתשלום
                </button>
            </div>
        </div>
    );
};

export default CartPage;