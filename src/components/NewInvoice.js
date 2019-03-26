import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCustomer, fetchProducts } from '../actions';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';


class NewInvoice extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            selectedProducts: []
        };
        this.handleProductsSelect = this.handleProductsSelect.bind(this);
    }
    componentDidMount() {
        this.props.fetchCustomer();
        this.props.fetchProducts();
    }
    handleProductsSelect(event) {
        event.persist();
        const { products } = this.props;
        const value = +event.target.value;
        const selectedProducts = products.find((el) => el.id === value);
        this.setState(prevState => ({
            selectedProducts: [...prevState.selectedProducts, selectedProducts]
        }));
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
