const initialState = {
  products: null,
  error: null, 
  categories: null,
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
        case 'FETCH_PRODUCTS_ERROR':  
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};