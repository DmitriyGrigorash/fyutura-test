import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';


// import { fetchInvoices } from '../actions';


export default class Invoices extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.props.fetchInvoices();
    }
    render() {
        return(
            <section>
                <ListGroup>
                    <ListGroup.Item eventKey="1">Invoice</ListGroup.Item>
                    <ListGroup.Item eventKey="2">Invoice2</ListGroup.Item>
                    <ListGroup.Item eventKey="3">Invoice3</ListGroup.Item>
                    <ListGroup.Item eventKey="4">Invoice4</ListGroup.Item>
                    <ListGroup.Item eventKey="5">Invoice5</ListGroup.Item>
                </ListGroup>
            </section>
        );
    }
}
