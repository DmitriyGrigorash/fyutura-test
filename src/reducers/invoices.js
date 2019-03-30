const initialState = {
    invoices: [],
    currentInvoiceId: null,
    error: ''
};
const invoices = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INVOICES':
            return {...state, invoices: action.invoices};
        case 'GET_INVOICES_ERROR':
            return {...state, error: action.error};
        case 'POST_INVOICES_RESPONSE':
            return {...state, currentInvoiceId: action.res.id};
        case 'POST_INVOICES_ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default invoices;
