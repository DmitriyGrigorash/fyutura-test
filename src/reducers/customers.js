
const customers = (state = [], action) => {
    switch (action.type) {
        case 'GET_CUSTOMERS':
            return action.customers;
        default:
            return state;
    }
};

export default customers;
