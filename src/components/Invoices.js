import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';


import { fetchCustomer } from '../actions';


class Invoices extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchCustomer();
    }
    render() {
        return(
            <div>
                <ListGroup>
                    <ListGroup.Item eventKey="1">Invoice</ListGroup.Item>
                    <ListGroup.Item eventKey="2">Invoice2</ListGroup.Item>
                    <ListGroup.Item eventKey="3">Invoice3</ListGroup.Item>
                    <ListGroup.Item eventKey="4">Invoice4</ListGroup.Item>
                    <ListGroup.Item eventKey="5">Invoice5</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}
Invoices.defaultProps = {
    customers: []
};
Invoices.propTypes = {
    customers: PropTypes.array.isRequired,
    fetchCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    customers: state.customers
});

const mapDispatchToProps = dispatch => ({
    fetchCustomer: () => dispatch(fetchCustomer())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoices);
