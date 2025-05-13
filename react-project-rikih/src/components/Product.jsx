import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../redux/slices/cartSlice";

const Product = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    if (!product) {
        console.error("Product is undefined");
        return null;
    }

    const handleAddToQuantity = (e) => {
        e.stopPropagation();
        dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }));
    };

    const handleReduceToQuantity = (e) => {
        e.stopPropagation();
        dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }));
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="card mb-4 shadow-sm" onClick={handleShowModal} style={{ cursor: "pointer" }}>
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">מחיר כולל: {product.totalPrice} ₪</p>
                    <p>כמות: {product.quantity}</p>
                    <button onClick={handleReduceToQuantity}>-</button>
                    <button onClick={handleAddToQuantity}>+</button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={product.image} className="img-fluid mb-3" alt={product.name} />
                    <p>{product.description}</p>
                    <p>מחיר עבור חברי כללית: {product.totalPrice - 10} ₪</p>
                    <p>מחיר עבור חברי מכבי: {product.totalPrice - 20} ₪</p>
                    <p>מחיר עבור חברי מאוחדת: {product.totalPrice - 30} ₪</p>
                    <p>מחיר עבור חברי לאומית: {product.totalPrice - 40} ₪</p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Product;