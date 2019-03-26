import React from 'react';
import { Route } from 'react-router';
import NewInvoice from '../components/NewInvoice';
import Invoices from '../components/Invoices';

export default ([<Route path="/" exact component={Invoices} key={1}/>,
	<Route path="/invoice" component={NewInvoice} key={2}/>]
);
