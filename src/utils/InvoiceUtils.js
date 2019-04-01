import _ from 'lodash';

export default class InvoiceUtils {
    static updateInvoiceProductsData(products, id, selectedProducts, amount) {
        const selected = _.find(products, (el) => el.id === id);
        if(amount) {
            selected.amount = amount;
        }
        const updatedProducts =  _.uniqBy([...selectedProducts, selected ], 'id');
        const totalPrice = updatedProducts.reduce((acc, current) => {
            const productSumPrice = current.price * current.amount;
            return acc + productSumPrice;
        }, 0).toFixed(2);
        return {
            updatedProducts,
            totalPrice
        };
    }
    static getDiscount(invoiceTotal, value) {
        const discount = invoiceTotal * value / 100;
        return (invoiceTotal - discount).toFixed(2);
    }
}
