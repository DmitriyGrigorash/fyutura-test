import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

/* Reducers */
import invoices from './invoices';


const rootReducer = combineReducers({
    routing,
    invoices
});

export default rootReducer;
