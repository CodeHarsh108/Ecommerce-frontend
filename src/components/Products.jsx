import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions/index.js";
import React from 'react';

const Products = () => {
    const { products, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Dispatching fetchProducts...");
        dispatch(fetchProducts());
    }, [dispatch]);

    if (!products && !error) {
        return <div className="text-center py-20">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
                <span className="text-red-500 text-lg font-medium">
                    Failed to load products. Check console for details.
                </span>
            </div>
        );
    }

    return (
        <div className="lg:px-14 sm:px-6 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {products.map((item, i) => (
                        <ProductCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;