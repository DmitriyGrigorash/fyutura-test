import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCustomer, fetchProducts } from '../actions';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
// import _ from 'lodash';

import InvoiceUtils from '../utils/InvoiceUtils';

class NewInvoice extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            selectedProducts: [],
            invoiceTotal: 0,
            discount: 0
        };
        this.handleProductsSelect = this.handleProductsSelect.bind(this);
        this.handleProductAmount = this.handleProductAmount.bind(this);
        // this.handleDiscount = this.handleDiscount.bind(this);
    }
    componentDidMount() {
        this.props.fetchCustomer();
        this.props.fetchProducts();
    }
    // handleDiscount(event) {
    //     const value = +event.target.value;
    // }
    handleProductsSelect(event) {
        const { products } = this.props;
        const value = +event.target.value;
        this.setState(prevState => {
            const selected = InvoiceUtils.getSelectedProduct(products, value);
            const selectedProducts = InvoiceUtils.addProducts(prevState.selectedProducts, selected);
            const invoiceTotal = InvoiceUtils.countTotalPrice(selectedProducts);
            return {
                selectedProducts,
                invoiceTotal
            };
        });
    }
    handleProductAmount(event) {
        const value = +event.target.value;
        const id = +event.target.id;
        this.setState(prevState => {
            const selected = InvoiceUtils.getSelectedProduct(prevState.selectedProducts, id);
            selected.amount = value;
            const selectedProducts = InvoiceUtils.addProducts(prevState.selectedProducts, selected);
            const invoiceTotal = InvoiceUtils.countTotalPrice(selectedProducts);
            return {
                selectedProducts,
                invoiceTotal
            };
        });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col lg={6}>
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
                        <Form.Group>
                            <Form.Label>Invoice total</Form.Label>
                            <Form.Control
                                placeholder="Total: 0"
                                readOnly
                                type="text"
                                value={this.state.invoiceTotal}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Discount %</Form.Label>
                            <Form.Control
                                onChange={this.handleDiscount}
                                placeholder="Discount %"
                                type="number"
                                min={0}
                                max={100}
                                value={this.state.discount}
                            />
                        </Form.Group>
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
                                            type="number"
                                            min={1}
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
