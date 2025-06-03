const { BasePage } = require('./BasePage');

class ShoppingPage extends BasePage {
    constructor(page) {
        super(page);
        // Selectors
        this.productsLink = 'a[href="/products"]';
        this.addToCartButtons = '.add-to-cart';
        this.viewCartLink = 'a[href="/view_cart"]';
        this.continueShoppingButton = '.btn.btn-success.close-modal.btn-block';
        this.proceedToCheckoutButton = '.btn.btn-default.check_out';
        this.placeOrderButton = '.btn.btn-default.check_out';
        this.cardNameInput = 'input[name="name_on_card"]';
        this.cardNumberInput = 'input[name="card_number"]';
        this.cardCvcInput = 'input[name="cvc"]';
        this.cardExpiryMonthInput = 'input[name="expiry_month"]';
        this.cardExpiryYearInput = 'input[name="expiry_year"]';
        this.payAndConfirmButton = '#submit';
        this.successMessage = '.title.text-center';
    }

    async navigateToProducts() {
        await this.click(this.productsLink);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after navigating to products, proceeding with test...');
        }
    }

    async addProductToCart(productIndex) {
        const addToCartButtons = await this.page.$$(this.addToCartButtons);
        if (addToCartButtons[productIndex]) {
            await addToCartButtons[productIndex].click();
            try {
                await this.waitForNetworkIdle();
                // Wait for the modal to appear and click continue shopping
                await this.waitForElement(this.continueShoppingButton);
                await this.click(this.continueShoppingButton);
            } catch (error) {
                console.log('Network idle timeout after adding to cart, proceeding with test...');
            }
        }
    }

    async viewCart() {
        await this.click(this.viewCartLink);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after viewing cart, proceeding with test...');
        }
    }

    async proceedToCheckout() {
        await this.click(this.proceedToCheckoutButton);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after proceeding to checkout, proceeding with test...');
        }
    }

    async placeOrder() {
        await this.click(this.placeOrderButton);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after placing order, proceeding with test...');
        }
    }

    async fillPaymentDetails(paymentDetails) {
        await this.fill(this.cardNameInput, paymentDetails.cardName);
        await this.fill(this.cardNumberInput, paymentDetails.cardNumber);
        await this.fill(this.cardCvcInput, paymentDetails.cardCvc);
        await this.fill(this.cardExpiryMonthInput, paymentDetails.expiryMonth);
        await this.fill(this.cardExpiryYearInput, paymentDetails.expiryYear);
    }

    async confirmPayment() {
        await this.click(this.payAndConfirmButton);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after confirming payment, proceeding with test...');
        }
    }

    async verifyOrderSuccess() {
        try {
            await this.waitForNetworkIdle();
            await this.waitForElement(this.successMessage);
            const text = await this.getText(this.successMessage);
            console.log('Order success text:', text); // Debug log
            return text?.includes('Order Placed!') || false;
        } catch (error) {
            console.error('Error verifying order success:', error);
            // Take a screenshot for debugging
            try {
                await this.page.screenshot({ path: 'order-success-error.png' });
                console.log('Screenshot saved as order-success-error.png');
            } catch (screenshotError) {
                console.error('Failed to take error screenshot:', screenshotError);
            }
            return false;
        }
    }
}

module.exports = { ShoppingPage }; 