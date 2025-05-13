import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../redux/slices/cartSlice";
import { setSelectedGlasses } from "../redux/slices/glassesSlice";

const ProductCard = ({ product, context = "store" }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const healthFund = useSelector((state) => state.Users.currentUser.healthFund);

  const price =
    healthFund === "Clalit"
      ? product.clalit
      : healthFund === "Maccabi"
      ? product.maccabi
      : healthFund === "Meuhedet"
      ? product.meuhedet
      : healthFund === "Leumit"
      ? product.leumit
      : product.price;

  const handleCardClick = () => setShowModal(true);

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (context === "store") {
      dispatch(setSelectedGlasses(product.image));
    } else {
      setShowModal(true);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addItem({ item: product, price }));
  };

  const handleAddQty = (e) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1, price }));
  };

  const handleRemoveQty = (e) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1, price }));
  };

  return (
    <>
      <div
        className="card mb-4 shadow-sm border-0"
        style={{ cursor: "pointer", maxWidth: "320px", margin: "auto" }}
        onClick={handleCardClick}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px", padding: "10px", overflow: "hidden" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "100%", objectFit: "contain" }}
            onClick={handleImageClick}
          />
        </div>
        <div className="card-body text-center">
          <div className="fw-bold text-uppercase text-secondary small mb-2">
            {product.name}
          </div>
          <div className="text-muted small mb-2">{product.description}</div>

          {healthFund ? (
            <>
              <div className="text-danger" style={{ textDecoration: "line-through" }}>
                {product.price} ₪
              </div>
              <div
                className="fw-bold bg-warning px-2 py-1 d-inline-block"
                style={{ fontSize: "1.3rem", border: "2px solid red" }}
              >
                {price} ₪
              </div>
              <div className="small text-muted">({healthFund})</div>
            </>
          ) : (
            <div className="fw-bold fs-5">{product.price} ₪</div>
          )}

          {context === "cart" ? (
            <div className="mt-3">
              <p className="mb-1">כמות: {product.quantity}</p>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-secondary" onClick={handleRemoveQty}>
                  -
                </button>
                <button className="btn btn-outline-secondary" onClick={handleAddQty}>
                  +
                </button>
              </div>
            </div>
          ) : (
            <Button variant="dark" className="mt-3" onClick={handleAddToCart}>
               הוסף לסל 🛒
            </Button>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={product.image} className="img-fluid mb-3" alt={product.name} />
          <p>{product.description}</p>
          <p>מחיר רגיל: {product.price} ₪</p>
          <p>כללית: {product.clalit} ₪</p>
          <p>מכבי: {product.maccabi} ₪</p>
          <p>מאוחדת: {product.meuhedet} ₪</p>
          <p>לאומית: {product.leumit} ₪</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCard;
