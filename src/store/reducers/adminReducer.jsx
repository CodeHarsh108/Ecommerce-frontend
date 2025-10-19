const initialState = {
    analytics: {},
    isUsingRealData: false
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ANALYTICS":
            return {
                ...state,
                analytics: action.payload,
                isUsingRealData: true
            };
        default:
            return state;
    }
};