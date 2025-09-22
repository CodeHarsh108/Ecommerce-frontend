import { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/index.js";


const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts()); 
    },[dispatch])
    const { loading, error } = useSelector((state) => state.products);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-slate-700">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-red-600">Error: {error}</span>
            </div>
        );
    }

    return (
        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>

            <style>
                {`
                .home-gradient-bg {
                    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
                    border-radius: 1.5rem;
                    box-shadow: 0 8px 32px 0 rgba(60, 72, 88, 0.12);
                    padding: 2.5rem 1.5rem;
                    margin-bottom: 2rem;
                }
                .products-title {
                    font-family: 'Montserrat', sans-serif;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 8px rgba(60,72,88,0.08);
                }
                .products-subtitle {
                    font-size: 1.15rem;
                    color: #6366f1;
                    font-weight: 500;
                }
                .products-grid {
                    transition: box-shadow 0.3s;
                }
                .products-grid > div:hover {
                    box-shadow: 0 4px 24px 0 rgba(99,102,241,0.12);
                    transform: translateY(-4px) scale(1.03);
                    transition: all 0.2s;
                }
                `}
            </style>
            <div className="home-gradient-bg">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="products-title text-slate-800 text-5xl font-extrabold text-center">Products</h1>
                    <span className="products-subtitle">
                        Discover Our Exclusive Collection of Products
                    </span>
                </div>
            </div>
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                {products && products?.slice(0,8)
                    .map((item, i) => (
                        <ProductCard key={i} {...item} />
                    ))}
            </div>
        </div>
    );
};

export default Home;