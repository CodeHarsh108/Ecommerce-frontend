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

            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold text-center">Products</h1>
                    <span className="text-slate-700">
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