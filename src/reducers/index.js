import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

/* Reducers */
import invoices from './invoices';
import customers from './customers';
import products from './products';


const rootReducer = combineReducers({
    routing,
    invoices,
    customers,
    products
});

export default rootReducer;
