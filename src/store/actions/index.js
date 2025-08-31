import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        console.log("API call initiated with query:", queryString);
        const { data } = await api.get(`/public/products?${queryString}`);
        console.log("API response received:", data);
        console.log("Page number in response:", data.pageNumber);
        console.log("Total pages:", data.totalPages);
        
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
        console.error("API Error:", error);
        dispatch({
            type: "FETCH_PRODUCTS_ERROR",
            payload: error.message 
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        console.log("Fetching categories...");
        const { data } = await api.get(`/public/categories`);        
        console.log("Categories API response:", data);
        
        // Handle both array and paginated response structures
        const categories = Array.isArray(data) ? data : (data.content || data);
        
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: categories
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