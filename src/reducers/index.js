import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

/* Reducers */
import invoices from './invoices';
import customers from './customers';


const rootReducer = combineReducers({
    routing,
    invoices,
    customers
});

export default rootReducer;
