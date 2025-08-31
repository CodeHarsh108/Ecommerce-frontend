const initialState = {
  products: null,
  error: null, 
  categories: [],
  loading: false,
  categoryLoading: false,
  pagination: {
    pageNumber: 0,
    pageSize: 12,
    totalPages: 0,
    totalElements: 0,
    lastPage: false
  }
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                error: null, 
                pagination: {
                    pageNumber: action.pageNumber !== undefined ? action.pageNumber : state.pagination.pageNumber,
                    pageSize: action.pageSize !== undefined ? action.pageSize : state.pagination.pageSize,
                    totalPages: action.totalPages !== undefined ? action.totalPages : state.pagination.totalPages,
                    totalElements: action.totalElements !== undefined ? action.totalElements : state.pagination.totalElements,
                    lastPage: action.lastPage !== undefined ? action.lastPage : state.pagination.lastPage
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