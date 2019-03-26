import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCustomer, fetchProducts } from '../actions';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';


class NewInvoice extends Component {
    constructor( props ) {
        super( props );
    }
    componentDidMount() {
        this.props.fetchCustomer();
        this.props.fetchProducts();
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col lg={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select customer</Form.Label>
                                <Form.Control as="select">
                                    {this.props.customers.map((val) => (
                                        <option value={val.id}>{val.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select products</Form.Label>
                                <Form.Control as="select">
                                    {this.props.products.map((val) => (
                                        <option value={val.id}>{val.name} - {val.price}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
NewInvoice.defaultProps = {
    customers: []
};
NewInvoice.propTypes = {
    customers: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    fetchCustomer: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    customers: state.customers,
    products: state.products,
});

const mapDispatchToProps = dispatch => ({
    fetchCustomer: () => dispatch(fetchCustomer()),
    fetchProducts: () => dispatch(fetchProducts())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewInvoice);
