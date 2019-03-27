export const getCustomers = (customers) => ({
    type: 'GET_CUSTOMERS',
    customers
});
export const getProducts = (products) => {
    const addAmountToProducts = products.map(item => ({...item, amount: 1}));
    return { type: 'GET_PRODUCTS', products: addAmountToProducts };
};

export const fetchCustomer = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/customers', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getCustomers(json)))
            .catch(err => err);
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
