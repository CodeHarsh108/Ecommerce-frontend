import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../store/actions/index.js";
import React from 'react';
import Filter from "./Filter.jsx";
import useProductFilter from "./useProductFilter.jsx";
import { Hourglass } from "react-loader-spinner";

const Products = () => {
    const { products, error, categories, categoryLoading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log("Categories:", categories);
    console.log("Category loading:", categoryLoading);

    // Loading state for categories
    if (categoryLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
                <span className="ml-4 text-gray-600">Please Wait...</span>
            </div>
        );
    }

    if (!products && !error) {
        return (
            <div className="flex justify-center items-center py-20">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
                <span className="ml-4 text-gray-600">Please Wait...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
                <span className="text-red-500 text-lg font-medium">
                    Failed to load products.
                </span>
            </div>
        );
    }

    return (
        <div className="lg:px-14 sm:px-6 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter categories={categories || []} loading={categoryLoading}/>
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {products && products.map((item, i) => (
                        <ProductCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;