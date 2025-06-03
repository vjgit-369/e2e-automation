const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('./pageObjects/RegistrationPage');
const { ShoppingPage } = require('./pageObjects/ShoppingPage');

test.describe('E-commerce End-to-End Test Suite', () => {
    test('Complete shopping journey from registration to checkout', async ({ page }) => {
        // Initialize page objects
        const registrationPage = new RegistrationPage(page);
        const shoppingPage = new ShoppingPage(page);

        // Set default timeout
        test.setTimeout(120000);

        await test.step('User Registration', async () => {
            console.log('Starting user registration process...');
            await registrationPage.navigateToSignup();
            
            const timestamp = Date.now();
            const testUser = {
                name: 'Test User',
                email: `test${timestamp}@example.com`,
                password: 'password123',
                day: '1',
                month: '1',
                year: '1990',
                firstName: 'Test',
                lastName: 'User',
                company: 'Test Company',
                address1: '123 Test St',
                address2: 'Apt 4',
                country: 'United States',
                state: 'California',
                city: 'Los Angeles',
                zipcode: '90001',
                mobileNumber: '1234567890'
            };

            console.log(`Registering user with email: ${testUser.email}`);
            await registrationPage.fillSignupForm(testUser.name, testUser.email);
            await registrationPage.fillAccountDetails(testUser);

            const isAccountCreated = await registrationPage.verifyAccountCreated();
            expect(isAccountCreated, 'Account should be created successfully').toBeTruthy();
            
            await registrationPage.continueShopping();
        });

        await test.step('Product Selection and Cart Management', async () => {
            console.log('Starting shopping process...');
            await shoppingPage.navigateToProducts();
            
            console.log('Adding product to cart...');
            await shoppingPage.addProductToCart(0);
            
            console.log('Viewing cart...');
            await shoppingPage.viewCart();
        });

        await test.step('Checkout Process', async () => {
            console.log('Starting checkout process...');
            await shoppingPage.proceedToCheckout();
            
            console.log('Placing order...');
            await shoppingPage.placeOrder();
            
            const paymentDetails = {
                cardName: 'Test User',
                cardNumber: '4111111111111111',
                cardCvc: '123',
                expiryMonth: '12',
                expiryYear: '2025'
            };

            console.log('Filling payment details...');
            await shoppingPage.fillPaymentDetails(paymentDetails);
            
            console.log('Confirming payment...');
            await shoppingPage.confirmPayment();
            
            console.log('Verifying order success...');
            const isOrderSuccessful = await shoppingPage.verifyOrderSuccess();
            expect(isOrderSuccessful, 'Order should be placed successfully').toBeTruthy();
        });
    });
});