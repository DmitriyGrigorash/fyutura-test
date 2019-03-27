import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCustomer, fetchProducts } from '../actions';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';


class NewInvoice extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            selectedProducts: [],
        };
        this.handleProductsSelect = this.handleProductsSelect.bind(this);
        this.handleProductAmount = this.handleProductAmount.bind(this);
    }
    componentDidMount() {
        this.props.fetchCustomer();
        this.props.fetchProducts();
    }
    handleProductsSelect(event) {
        const { products } = this.props;
        const value = +event.target.value;
        this.setState(prevState => {
            const selectedProduct = _.find(products, (el) => el.id === value);
            return {
                selectedProducts: _.uniqBy([...prevState.selectedProducts, {...selectedProduct, amount: 1} ], 'id')
            };
        });
    }
    handleProductAmount(event) {
        const value = +event.target.value;
        const id = +event.target.id;
        this.setState(prevState => {
            const selectedProduct = _.find(prevState.selectedProducts, (el) => el.id === id);
            selectedProduct.amount = value;
            return {
                selectedProducts: _.uniqBy([...prevState.selectedProducts, selectedProduct], 'id')
            };
        });
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
                                    {this.props.customers.map((val, i) => (
                                        <option key={i} value={val.id}>{val.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select products</Form.Label>
                                <Form.Control as="select" onChange={this.handleProductsSelect}>
                                    {this.props.products.map((val, i) => (
                                        <option key={i} value={val.id}>{val.name} - {val.price}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.selectedProducts.map((product, i) => (
                                <tr key={i}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Form.Control
                                            id={product.id}
                                            onChange={this.handleProductAmount}
                                            placeholder="Amount"
                                            size="sm"
                                            type="text"
                                            value={product.amount}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
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
