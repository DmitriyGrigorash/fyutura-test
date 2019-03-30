/* Customers */
const getCustomers = (customers) => ({
    type: 'GET_CUSTOMERS',
    customers
});
const getCustomersError = (error) => ({
    type: 'GET_CUSTOMERS_ERROR',
    error
});

/* Products */
const getProducts = (products) => {
    const addAmountToProducts = products.map(item => ({...item, amount: 1}));
    return { type: 'GET_PRODUCTS', products: addAmountToProducts };
};
const getInvoices = (invoices) => ({
    type: 'GET_INVOICES',
    invoices
});

/* Invoices */
const getInvoicesError = (error) => ({
    type: 'GET_INVOICES_ERROR',
    error
});
const postInvoicesResponse = (res) => ({
    type: 'POST_INVOICES_RESPONSE',
    res
});
const postInvoicesError = (error) => ({
    type: 'POST_INVOICES_ERROR',
    error
});

export const fetchCustomer = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/customers', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getCustomers(json)))
            .catch(err => dispatch(getCustomersError(err)));
    };
};


export const fetchProducts = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/products', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getProducts(json)))
            .catch(err => err);
    };
};


export const fetchInvoices = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/invoices')
            .then(response => response.json())
            .then(json => dispatch(getInvoices(json)))
            .catch(err => dispatch(getInvoicesError(err)));
    };
};
export const postFetchInvoice = (invoice) => {
    return dispatch => {
        return fetch('http://localhost:8000/api/invoices',
            { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(invoice) }
        ).then((response) => response.json())
        .then(response => dispatch(postInvoicesResponse(response)))
        .catch(error => dispatch(postInvoicesError(error)));
    };
};
export const putFetchInvoice = (invoice) => {
    return fetch('http://localhost:8000/api/invoices',
        { method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(invoice) }
    ).then((response) => response.json())
        .then(response => console.log('#### Success PUT response', response))
        .catch(error => console.error('ERROR PUT:', error));
};
