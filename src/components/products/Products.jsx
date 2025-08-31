import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../store/actions/index.js";
import React from 'react';
import Filter from "../products/Filter.jsx"
import useProductFilter from "../../hooks/useProductFilter.jsx"
import { Hourglass } from "react-loader-spinner";
import Paginations from "../shared/Paginations.jsx";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const { products, error, categories, categoryLoading, pagination } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Add this useEffect to handle initial page load without page parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has('page')) {
            // If no page parameter, set it to 1
            params.set('page', '1');
            navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
        }
    }, [navigate]);

    console.log("Categories:", categories);
    console.log("Category loading:", categoryLoading);
    console.log("Pagination:", pagination);

    // Combined loading state
    if (categoryLoading || (!products && !error)) {
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
                {products && products.length > 0 ? (
                    <>
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {products.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                        </div>
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center pt-10">
                                <Paginations 
                                    numberOfPage={pagination.totalPages}
                                    totalProducts={pagination.totalElements}
                                    currentPage={pagination.pageNumber + 1} // Convert 0-based to 1-based
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center py-20">
                        <span className="text-gray-600 text-lg">No products found</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;