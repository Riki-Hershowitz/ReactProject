import React, { useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import GlassesOverlay from "../components/GlassesOverlay";
import ProductCard from "../components/ProductCard";
import { FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa";

const ProductsPage = () => {
    const products = useSelector((state) => state.products.products);
    const [selectCategory, setSelectCategory] = useState("all");
    const [isSorted, setIsSorted] = useState(false);
    const [sortingForm, setSortingForm] = useState("FromLowToHigh");

    const handleCategoryChange = (category) => setSelectCategory(category);
    const handleDeleteSort = () => setIsSorted(false);
    const handleSortOrder = (order) => {
        setSortingForm(order);
        setIsSorted(true);
    };

    const filteredProducts =
        selectCategory === "all"
            ? products
            : products.filter((product) => product.category === selectCategory);

    const displayedProducts = isSorted
        ? [...filteredProducts].sort((a, b) =>
              sortingForm === "FromLowToHigh" ? a.price - b.price : b.price - a.price
          )
        : filteredProducts;

    return (
        <div className="container mt-5">
            <GlassesOverlay />

            {/* סינון ומיון */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* מיון */}
                <div className="d-flex gap-3">
                    <button
                        onClick={handleDeleteSort}
                        className="btn sort-btn"
                    >
                        <FaTimes />
                    </button>
                    <button
                        onClick={() => handleSortOrder("FromLowToHigh")}
                        className="btn sort-btn"
                    >
                        <FaSortAmountUp />
                    </button>
                    <button
                        onClick={() => handleSortOrder("FromHighToLow")}
                        className="btn sort-btn"
                    >
                        <FaSortAmountDown />
                    </button>
                </div>

                {/* סינון לפי קטגוריה */}
                <div className="d-flex gap-3">
                    <button
                        onClick={() => handleCategoryChange("men")}
                        className="btn category-btn"
                    >
                        גברים
                    </button>
                    <button
                        onClick={() => handleCategoryChange("women")}
                        className="btn category-btn"
                    >
                        נשים
                    </button>
                    <button
                        onClick={() => handleCategoryChange("kids")}
                        className="btn category-btn"
                    >
                        ילדים
                    </button>
                    <button
                        onClick={() => handleCategoryChange("all")}
                        className="btn category-btn"
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>

            {/* מוצרים */}
            <div className="row">
                {Array.isArray(displayedProducts) && displayedProducts.length > 0 ? (
                    displayedProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard product={product} context="store" />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">לא נמצאו מוצרים להצגה.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;