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
    // Custom styles for enhanced beauty
    React.useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
            }
            .products-bg {
                background: rgba(255,255,255,0.85);
                border-radius: 24px;
                box-shadow: 0 8px 32px rgba(60, 72, 128, 0.12);
                padding: 2.5rem 2rem;
                margin-top: 2rem;
            }
            .product-card {
                transition: transform 0.2s, box-shadow 0.2s;
                border-radius: 18px;
                box-shadow: 0 4px 16px rgba(60, 72, 128, 0.08);
                background: #fff;
            }
            .product-card:hover {
                transform: translateY(-6px) scale(1.03);
                box-shadow: 0 12px 32px rgba(60, 72, 128, 0.18);
            }
            .filter-bar {
                background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
                border-radius: 16px;
                padding: 1.2rem 1.5rem;
                margin-bottom: 2rem;
                box-shadow: 0 2px 8px rgba(60, 72, 128, 0.10);
            }
            .pagination-bar {
                background: #f3f4f6;
                border-radius: 12px;
                padding: 0.8rem 1.2rem;
                box-shadow: 0 2px 8px rgba(60, 72, 128, 0.08);
            }
            .hourglass-loading {
                filter: drop-shadow(0 2px 8px #6366f1);
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
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