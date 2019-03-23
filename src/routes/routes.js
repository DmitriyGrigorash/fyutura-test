import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';
import Invoices from '../components/Invoices';

export default ([<Route path="/" exact component={App} />,
	<Route path="/invoices" component={Invoices} />]
);
