export const getCustomers = (customers) => ({
    type: 'GET_CUSTOMERS',
    customers
});

export const fetchCustomer = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/customers', {method: 'GET'})
            .then(response => response.json())
            .then(json => dispatch(getCustomers(json)));
    };
};
