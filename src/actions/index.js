export const getCustomers = (customers) => ({
    type: 'GET_CUSTOMERS',
    customers
});
export const getProducts = (products) => ({
    type: 'GET_PRODUCTS',
    products
});

export const fetchCustomer = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/customers', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getCustomers(json)))
            .catch(err => console.error('#### customers request error', err));
    };
};

export const fetchProducts = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/products', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getProducts(json)))
            .catch(err => console.error('#### products request error', err));
    };
};
