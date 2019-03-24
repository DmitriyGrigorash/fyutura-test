import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchCustomer } from '../actions';


class Invoices extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { invoices: 0 };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.props.fetchCustomer();
    }
    render() {
        return(
            <div>
                <ListGroup as="ul">
                    <ListGroupItem>Invoice</ListGroupItem>
                    <ListGroupItem>Invoice</ListGroupItem>
                </ListGroup>;
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
