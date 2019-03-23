
const invoices = (state = [], action) => {
    switch (action.type) {
        case 'GET_INVOICES':
            return action.invoices;
        default:
            return state;
    }
};

export default invoices;
