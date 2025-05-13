import React, { useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import GlassesOverlay from "../components/GlassesOverlay";
import ProductCard from "../components/ProductCard";


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

    const filteredProducts = selectCategory === "all"
        ? products
        : products.filter((product) => product.category === selectCategory);

    const displayedProducts = isSorted
        ? [...filteredProducts].sort((a, b) =>
            sortingForm === "FromLowToHigh"
                ? a.price - b.price
                : b.price - a.price
        )
        : filteredProducts;

    return (
        <div className="container mt-5">
            <GlassesOverlay />

            <div className="mb-4">
                <h2 className="mb-3">סינון לפי קטגוריה</h2>
                <div className="btn-group mb-2" role="group">
                    <button onClick={() => handleCategoryChange("men")} className="btn btn-outline-primary">גברים</button>
                    <button onClick={() => handleCategoryChange("women")} className="btn btn-outline-primary">נשים</button>
                    <button onClick={() => handleCategoryChange("kids")} className="btn btn-outline-primary">ילדים</button>
                    <button onClick={() => handleCategoryChange("all")} className="btn btn-outline-secondary">מחק סינון</button>
                </div>

                <h2 className="mt-4 mb-3">מיון</h2>
                <div className="btn-group" role="group">
                    <button onClick={handleDeleteSort} className="btn btn-outline-secondary">מחק מיון</button>
                    <button onClick={() => handleSortOrder("FromLowToHigh")} className="btn btn-outline-success">מהזול ליקר</button>
                    <button onClick={() => handleSortOrder("FromHighToLow")} className="btn btn-outline-success">מהיקר לזול</button>
                </div>
            </div>

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
