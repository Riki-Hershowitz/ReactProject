import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector , useDispatch } from "react-redux";
import {addItem} from "../redux/slices/cartSlice";
import { setSelectedGlasses } from "../redux/slices/glassesSlice";

const ProductSubmission = ({ product, onSelectGlasses }) => {
  const [showModal, setShowModal] = useState(false);
    const healthFund = useSelector((state) => state.Users.currentUser.healthFund);
    console.log("קופת החולים של המשתמש:", healthFund); // לוג לבדיקת קופת החולים


    let price = product.price;
    
        if (healthFund === "Clalit") {
            price= product.clalit;
        } else if (healthFund === "Maccabi") {
            price= product.maccabi;
        } else if (healthFund === "Meuhedet") {
            price= product.meuhedet;
        } else if (healthFund === "Leumit") {
            price= product.leumit;
        }

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    dispatch(setSelectedGlasses(product.image)); // עדכון תמונת המשקפיים שנבחרה ב-Redux Store
  };

  const handleCardClick = () => {
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevent the modal from closing when clicking the button
  
      // Dispatch the addItem action with the product
      dispatch(addItem({ item: product }));
  };

const cardStyle = {
    cursor: "pointer",
    width: "20rem", // Increase the width of the card
    padding: "10px", // Add padding inside the card
    boxSizing: "border-box", // Ensure padding doesn't affect the width
};

const imageContainerStyle = {
    width: "100%",
    height: "200px", // Keep the fixed height for the image container
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px", // Add padding around the image
    boxSizing: "border-box", // Ensure padding doesn't affect the dimensions
};

return (
    <>
        <div
            className="card mb-4 shadow-sm"
            onClick={handleCardClick}
            style={cardStyle} // Use the defined cardStyle
        >
            <div style={imageContainerStyle}> {/* Use the defined imageContainerStyle */}
            <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          onClick={handleImageClick} // Handle image click
          style={{ cursor: "pointer" }}
        />
            </div>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                { healthFund !== "none" ? (
                <>
                    <p
                    className="card-text"
                    style={{
                        textDecoration: "line-through",
                        color: "red",
                        fontStyle: "italic",
                    }}
                    >
                    {product.price} ₪
                    </p>
                    <p className="card-text fw-bold text-success">
                    {price} ₪ <small className="text-muted">({healthFund})</small>
                    </p>
                </>
                ) : (
                <p className="card-text">{product.price} ₪</p>
                )}

            </div>
        </div>

        {/* Modal for product details */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    src={product.image}
                    className="img-fluid mb-3"
                    alt={product.name}
                />
                <p>{product.description}</p>
                <p>מחיר: {product.price} ₪</p>
                <p>מחיר עבור חברי כללית: {product.clalit} ₪</p>
                <p>מחיר עבור חברי מכבי: {product.maccabi} ₪</p>
                <p>מחיר עבור חברי מאוחדת: {product.meuhedet} ₪</p>
                <p>לאומית: {product.leumit} ₪</p>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="primary" onClick={handleAddToCart}>הוסף לסל</Button>
            </Modal.Footer>
        </Modal>
    </>
);
};

export default ProductSubmission;