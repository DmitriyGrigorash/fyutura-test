import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { getInvoices } from '../actions';


class Invoices extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { invoices: 0 };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.props.getInvoices();
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
    invoices: []
};
Invoices.propTypes = {
    invoices: PropTypes.array.isRequired,
    getInvoices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    invoices: state.invoices
});

const mapDispatchToProps = dispatch => ({
    getInvoices: () => dispatch(getInvoices())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoices);
