import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCustomer } from '../actions';
import { connect } from 'react-redux';


class NewInvoice extends Component {
    constructor( props ) {
        super( props );
    }
    componentDidMount() {
        this.props.fetchCustomer();
    }
    render() {
        return (
            <section>
                asdas
            </section>
        );
    }
}
NewInvoice.defaultProps = {
    customers: []
};
NewInvoice.propTypes = {
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
)(NewInvoice);
