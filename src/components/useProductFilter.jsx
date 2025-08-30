import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions/index.js";

const useProductFilter = () => {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage - 1);
        
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const sortBy = searchParams.get("sortBy") || "price";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
        
        if (categoryParams && categoryParams !== "all") {
            params.set("category", categoryParams);
        }
        
        if (keyword) {
            params.set("keyword", keyword);
        }
        
        const queryString = params.toString();
        console.log("Query String:", queryString);
        dispatch(fetchProducts(queryString));
    }, [dispatch, searchParams]);
};

export default useProductFilter;