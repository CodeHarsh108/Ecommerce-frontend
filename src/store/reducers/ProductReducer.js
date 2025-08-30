const initialState = {
  products: null,
  error: null, 
  categories: [],
  loading: false,
  categoryLoading: false, // Separate loading state for categories
  pagination: {}
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                error: null, 
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalPages: action.totalPages,
                    totalElements: action.totalElements,
                    lastPage: action.lastPage
                }
            };
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                categoryLoading: false
            };
        case 'CATEGORY_LOADER':
            return {
                ...state,
                categoryLoading: true
            };
        case 'CATEGORY_SUCCESS':
            return {
                ...state,
                categoryLoading: false
            };
        case 'FETCH_PRODUCTS_ERROR':  
            return {
                ...state,
                error: action.payload
            };
        case 'IS_ERROR':
            return {
                ...state,
                categoryLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};