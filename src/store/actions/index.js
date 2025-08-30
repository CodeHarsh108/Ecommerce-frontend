import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        console.log("API call initiated");
        const { data } = await api.get(`/public/products?${queryString}`);
        console.log("API response received:", data);
        
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage
        });
    } catch (error) {
        dispatch({
            type: "FETCH_PRODUCTS_ERROR",
            payload: error.message 
        });
        console.error("API Error:", error);  
    }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        console.log("Fetching categories...");
        const { data } = await api.get(`/public/categories`);        
        console.log("Categories API response:", data);
        
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content || data, // Handle both structures
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage
        });
        dispatch({ type: "CATEGORY_SUCCESS" });
    } catch (error) {
        console.error("Error fetching categories:", error);
        dispatch({
            type: "IS_ERROR",
            payload: error.message 
        });
    }
};