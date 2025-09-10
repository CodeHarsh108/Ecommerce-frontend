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


export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    //Find the product
    const { products } = getState().products;
    const getProduct = products.find((item) => item.productId === data.productId);
    //Check for stocks
    const isQuantityExist = getProduct.quantity >= qty;
    //If in stock -> Add to cart
    if (isQuantityExist) {
        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity : qty }
        });
        toast.success(`${data.productName} added to cart!`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }else{
        toast.error(`Only ${getProduct.quantity} items in stock!`);
    }
    //If not in stock -> error
};

export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity + 1 },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };


    export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}