import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import { fetchCustomer, fetchProducts, postFetchInvoice, putFetchInvoice } from '../actions';
import InvoiceUtils from '../utils/InvoiceUtils';

class NewInvoice extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            customerId: 0,
            selectedProducts: [],
            invoiceTotal: 0,
            invoiceTotalWithDiscount: 0,
            discount: 0,
        };
        this.handleProductsSelect = this.handleProductsSelect.bind(this);
        this.handleProductAmount = this.handleProductAmount.bind(this);
        this.handleDiscount = this.handleDiscount.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
        this.saveInvoice = this.saveInvoice.bind(this);
    }
    componentDidMount() {
        this.props.fetchCustomer();
        this.props.fetchProducts();
    }
    componentDidUpdate(prevProps, prevState) {
        const {customerId, discount, invoiceTotal, invoiceTotalWithDiscount} = this.state;
        const {currentInvoiceId, putInvoice, postInvoice} = this.props;
        const totalPrice = discount > 0 ? invoiceTotalWithDiscount : invoiceTotal;
        const data = {
            'customer_id': customerId,
            'discount': discount,
            'total': totalPrice
        };
        if (currentInvoiceId && prevState !== this.state) {
            putInvoice(data, currentInvoiceId);
        }
        if (prevState !== this.state && !currentInvoiceId) {
            postInvoice(data);
        }
    }
    saveInvoice() {
        const {customerId, discount, invoiceTotalWithDiscount, invoiceTotal} = this.state;
        const {currentInvoiceId, putInvoice, postInvoice} = this.props;
        const totalPrice = discount > 0 ? invoiceTotalWithDiscount : invoiceTotal;
        const data = {
            'customer_id': customerId,
            'discount': discount,
            'total': totalPrice
        };
        if (currentInvoiceId) {
            putInvoice(data, currentInvoiceId);
        } else {
            postInvoice(data);
        }
    }
    handleDiscount(event) {
        const value = +event.target.value;
        if (value > 100) {
            return;
        }

        const invoiceTotalWithDiscount = InvoiceUtils.getDiscount(this.state.invoiceTotal, value);
        this.setState( {
            invoiceTotalWithDiscount,
            discount: value,
        });
    }
    handleCustomer(event) {
        const value = +event.target.value;
        this.setState({customerId: value});
    }
    handleProductsSelect(event) {
        const id = +event.target.value;
        const {discount, selectedProducts} = this.state;
        const {products} = this.props;
        const {updatedProducts, totalPrice} = InvoiceUtils.updateInvoiceProductsData(products, id, selectedProducts);

        let price;
        if(discount !== 0) {
            price = InvoiceUtils.getDiscount(totalPrice, discount);
            this.setState({
                selectedProducts: updatedProducts,
                invoiceTotal: totalPrice,
                invoiceTotalWithDiscount: price
            });
        } else {
            this.setState({
                selectedProducts: updatedProducts,
                invoiceTotal: totalPrice
            });
        }
    }
    handleProductAmount(event) {
        const value = +event.target.value;
        const id = +event.target.id;
        const { discount, selectedProducts } = this.state;
        const {products} = this.props;
        const {updatedProducts, totalPrice} = InvoiceUtils.updateInvoiceProductsData(products, id, selectedProducts, value);

        let price;
        if(discount !== 0) {
            price = InvoiceUtils.getDiscount(totalPrice, discount);
            this.setState({
                selectedProducts: updatedProducts,
                invoiceTotal: totalPrice,
                invoiceTotalWithDiscount: price
            });
        } else {
            this.setState({
                selectedProducts: updatedProducts,
                invoiceTotal: totalPrice
            });
        }
    }
    render() {
        const { invoiceTotalWithDiscount, invoiceTotal, discount } = this.state;
        const totalPrice = discount !== 0 ? invoiceTotalWithDiscount : invoiceTotal;
        return (
            <Container>
                <Row>
                    <Col lg={6}>
                        <ButtonToolbar bsPrefix="invoice-buttons">
                            <Link to="/">
                                <Button variant="success" size="sm" type="button" onClick={this.saveInvoice}>
                                    Save invoice
                                </Button>
                            </Link>
                            <Button variant="primary" size="sm">Add new customer</Button>
                            <Button variant="primary" size="sm">Add new product</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Form.Group>
                            <Form.Label>Select customer</Form.Label>
                            <Form.Control as="select" onChange={this.handleCustomer}>
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
                                value={totalPrice}
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
    currentInvoiceId: PropTypes.any,
    fetchCustomer: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    postInvoice: PropTypes.func.isRequired,
    putInvoice: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    customers: state.customers.customers,
    currentInvoiceId: state.invoices.currentInvoiceId,
    products: state.products,
});

const mapDispatchToProps = dispatch => ({
    fetchCustomer: () => dispatch(fetchCustomer()),
    fetchProducts: () => dispatch(fetchProducts()),
    postInvoice: (invoice) => dispatch(postFetchInvoice(invoice)),
    putInvoice: (invoice, id) => dispatch(putFetchInvoice(invoice, id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewInvoice);
