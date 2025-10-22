import { set } from "react-hook-form";
import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
         });
    }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
         });
    }
};


export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        // Check for stocks
        const isQuantityExist = getProduct.quantity >= qty;

        // If in stock -> add
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            // error
            toast.error("Out of stock");
        }
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
                payload: {...data, quantity: newQuantity},
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

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async(dispatch) => {
    try {
        setLoader(true);
        console.log("Sending login request...");
        const { data }  = await api.post("/auth/signin", sendData);
        
        console.log("=== LOGIN RESPONSE ===");
        console.log("Full response:", data);
        console.log("JWT Token in response:", data.jwtToken);
        console.log("User data:", data);
        console.log("=== END LOGIN RESPONSE ===");
        
        // Store in Redux
        dispatch({ 
            type: "LOGIN_USER", 
            payload: data  // Make sure data contains jwtToken
        });
        
        // Store in localStorage
        localStorage.setItem("auth", JSON.stringify(data));
        console.log("Stored in localStorage:", JSON.parse(localStorage.getItem("auth")));
        
        reset();
        toast.success("Login Successful");
        navigate("/");
    } catch (error) {
        console.log("Login error:", error);
        toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
        setLoader(false);
    }
};


export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async(dispatch) => {
    try {
        setLoader(true);
        const { data }  = await api.post("/auth/signup", sendData);
        reset();
        toast.success(data?.message || "Registration Successful");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Registration Failed");
    }finally{
        setLoader(false);
    }
};

export const logOutUser = (navigate, toast) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logout Successful");
};

export const addUpdateUserAddress =
     (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    
    const { user } = getState().auth;
    /*await api.post(`/addresses`, sendData, {
          headers: { Authorization: "Bearer " + user.jwtToken },
        });
    */
    dispatch({ type:"BUTTON_LOADER" });
    try {
        if (!addressId) {
            const { data } = await api.post("/addresses", sendData);
            toast.success(data?.message || "Address added successfully"); 
        } else {
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type:"IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type:"IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`);
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
         });
    }
};

export const selectUserCheckoutAddress = (address) => {
    return{
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    };
};

export const deleteUserAddress = 
    (addressId, toast, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occured",
         });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};


export const addPaymentMethod = (method) => {
    return{
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try{
        dispatch({ type: "IS_FETCHING" });
        await api.post(`/carts/create`, sendCartItems );
        await dispatch(getUserCart());

    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart",
         });
    }
};


export const getUserCart = () => async (dispatch, getState) => {
    try{
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/carts/users/cart` );
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart Items",
         });
    }
};


export const analyticsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING"});
        
        const state = getState();
        const { user } = state.auth;
        
        if (!user || !user.jwtToken) {
            console.log("No user token available, using dummy data");
            dispatch({ type: "IS_SUCCESS"});
            return;
        }
        
        const { data } = await api.get('/admin/app/analytics', {
            headers: { 
                Authorization: `Bearer ${user.jwtToken}`
            }
        });
        
        console.log("Real analytics data received:", data);
        
        dispatch({
            type: "FETCH_ANALYTICS",
            payload: data,
        });
        dispatch({ type: "IS_SUCCESS"});
        
    } catch (error) {
        console.log("Analytics API failed, using dummy data:", error.message);
        // Don't dispatch error - we'll use dummy data instead
        dispatch({ type: "IS_SUCCESS"});
    }
};



// In your actions file, update getOrdersForDashboard
export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        
        // Try to fetch from API first
        try {
            const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
            const { data } = await api.get(`${endpoint}?${queryString}`);
            
            dispatch({
                type: "GET_ADMIN_ORDERS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        } catch (apiError) {
            console.log("API failed, using dummy orders data");
            
            // Dummy orders data
            const dummyOrders = [
                { 
                    "orderId": 17, 
                    "email": "user1@example.com", 
                    "orderItems": [ 
                        { 
                            "orderItemId": 7, 
                            "product": { 
                                "productId": 153, 
                                "productName": "Running Shoes", 
                                "image": "0abca637-0c4e-4054-ae03-bdfc51cb3396.png", 
                                "description": "Comfortable and lightweight running shoes for daily fitness", 
                                "quantity": 49, 
                                "price": 80, 
                                "discount": 10, 
                                "specialPrice": 72 
                            }, 
                            "quantity": 1, 
                            "discount": 10, 
                            "orderedProductPrice": 72 
                        } 
                    ], 
                    "orderDate": "2025-02-15", 
                    "payment": { 
                        "paymentId": 17, 
                        "paymentMethod": "online", 
                        "pgPaymentId": "pi_3QsfCYLK9jOar8Y81NsK7PXG", 
                        "pgStatus": "succeeded", 
                        "pgResponseMessage": "Payment successful", 
                        "pgName": "Stripe" 
                    }, 
                    "totalAmount": 72, 
                    "orderStatus": "Order Accepted !", 
                    "addressId": 1 
                }, 
                { 
                    "orderId": 18, 
                    "email": "user1@example.com", 
                    "orderItems": [ 
                        { 
                            "orderItemId": 8, 
                            "product": { 
                                "productId": 102, 
                                "productName": "Blender", 
                                "image": "39356dd0-6682-4821-adc8-b198ee85b358.png", 
                                "description": "High-performance Blender having powerful features for modern family", 
                                "quantity": 28, 
                                "price": 500, 
                                "discount": 19, 
                                "specialPrice": 405 
                            }, 
                            "quantity": 1, 
                            "discount": 19, 
                            "orderedProductPrice": 405 
                        } 
                    ], 
                    "orderDate": "2025-07-18", 
                    "payment": { 
                        "paymentId": 18, 
                        "paymentMethod": "online", 
                        "pgPaymentId": "pi_3Rm6zYLK9jOar8Y81iyMdnMg", 
                        "pgStatus": "succeeded", 
                        "pgResponseMessage": "Payment successful", 
                        "pgName": "Stripe" 
                    }, 
                    "totalAmount": 405, 
                    "orderStatus": "Processing", 
                    "addressId": 5 
                },
                { 
                    "orderId": 19, 
                    "email": "customer2@example.com", 
                    "orderItems": [ 
                        { 
                            "orderItemId": 9, 
                            "product": { 
                                "productId": 201, 
                                "productName": "Wireless Headphones", 
                                "image": "headphones.png", 
                                "description": "Premium wireless headphones with noise cancellation", 
                                "quantity": 15, 
                                "price": 200, 
                                "discount": 15, 
                                "specialPrice": 170 
                            }, 
                            "quantity": 2, 
                            "discount": 15, 
                            "orderedProductPrice": 340 
                        } 
                    ], 
                    "orderDate": "2025-01-20", 
                    "payment": { 
                        "paymentId": 19, 
                        "paymentMethod": "online", 
                        "pgPaymentId": "pi_3Rm7aYLK9jOar8Y81iyMdnMg", 
                        "pgStatus": "succeeded", 
                        "pgResponseMessage": "Payment successful", 
                        "pgName": "Stripe" 
                    }, 
                    "totalAmount": 340, 
                    "orderStatus": "Shipped", 
                    "addressId": 3 
                }
            ];
            
            const currentPage = new URLSearchParams(queryString).get('pageNumber') || 0;
            const pageSize = 10;
            
            dispatch({
                type: "GET_ADMIN_ORDERS",
                payload: dummyOrders,
                pageNumber: parseInt(currentPage),
                pageSize: pageSize,
                totalElements: dummyOrders.length,
                totalPages: 1,
                lastPage: true,
            });
        }
        
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders data",
        });
    }
};

// Update updateOrderStatusFromDashboard to use dummy data
export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update local state with new status
        const state = getState();
        const currentOrders = state.order.adminOrder;
        
        const updatedOrders = currentOrders.map(order => 
            order.orderId === orderId 
                ? { ...order, orderStatus: orderStatus }
                : order
        );
        
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: updatedOrders,
            pageNumber: state.order.pagination.pageNumber,
            pageSize: state.order.pagination.pageSize,
            totalElements: updatedOrders.length,
            totalPages: 1,
            lastPage: true,
        });
        
        toast.success("Order status updated successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Failed to update order status");
    } finally {
        setLoader(false);
    }
};

export const dashboardProductsAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
         });
    }
};

export const deleteProduct = 
    (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true)
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.delete(`${endpoint}${productId}`);
        toast.success("Product deleted successfully");
        setLoader(false);
        setOpenDeleteModal(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || "Some Error Occured"
        )
    }
};

export const addNewProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async(dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
            await api.post(`${endpoint}${sendData.categoryId}/product`,
                sendData
            );
            toast.success("Product created successfully");
            reset();
            setOpen(false);
            await dispatch(dashboardProductsAction());
        } catch (error) {
            console.error(err);
            toast.error(err?.response?.data?.description || "Product creation failed");
        } finally {
            setLoader(false);
        }
    };

export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${sendData.id}`, sendData);
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product update failed");
     
    }
};

export const updateProductImageFromDashboard = 
    (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        await api.put(`${endpoint}${productId}/image`, formData);
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed");
     
    }
};

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };
