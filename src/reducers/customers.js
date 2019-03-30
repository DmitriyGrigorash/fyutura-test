const initialState = {
    customers: [],
    error: ''
};

const customers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CUSTOMERS':
            return {...state, customers: action.customers};
        case 'GET_CUSTOMERS_ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default customers;
