import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Container, Row, Col } from 'react-bootstrap';


import { fetchInvoices } from '../actions';


class Invoices extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getInvoices();
    }
    render() {
        return(
            <Container>
                <Row>
                    <Col col={6}>
                        <Button variant="primary" size="lg" href="invoice">
                            New invoice
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h2>Invoices</h2>
                        <ListGroup>
                            {this.props.invoices.map((item, i) => (
                                <ListGroup.Item key={i} variant="primary">
                                    Customer id: {item.customer_id}. Total: {item.total}. Discount: {item.discount}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
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
    invoices: state.invoices.invoices,
});

const mapDispatchToProps = dispatch => ({
    getInvoices: () => dispatch(fetchInvoices()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoices);
