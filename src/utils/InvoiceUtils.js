import _ from 'lodash';

export default class InvoiceUtils {
    static getSelectedProduct(products, id) {
        return _.find(products, (el) => el.id === id);
    }
    static addProducts(selectedProducts, currentProd) {
        return _.uniqBy([...selectedProducts, currentProd ], 'id');
    }
    static countTotalPrice(selectedProducts) {
        const price = selectedProducts.reduce((acc, current) => {
            const productSumPrice = current.price * current.amount;
            return acc + productSumPrice;
        }, 0);
        return price.toFixed(2);
    }
    static getDiscount(invoiceTotal, value) {
        const discount = invoiceTotal * value / 100;
        return (invoiceTotal - discount).toFixed(2);
    }
}
