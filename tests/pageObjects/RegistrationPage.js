const { BasePage } = require('./BasePage');

class RegistrationPage extends BasePage {
    constructor(page) {
        super(page);
        // Selectors
        this.signupNameInput = 'input[data-qa="signup-name"]';
        this.signupEmailInput = 'input[data-qa="signup-email"]';
        this.signupButton = '[data-qa="signup-button"]';
        this.genderRadio = '#id_gender1';
        this.passwordInput = '#password';
        this.daysSelect = '#days';
        this.monthsSelect = '#months';
        this.yearsSelect = '#years';
        this.newsletterCheckbox = '#newsletter';
        this.specialOffersCheckbox = '#optin';
        this.firstNameInput = '#first_name';
        this.lastNameInput = '#last_name';
        this.companyInput = '#company';
        this.address1Input = '#address1';
        this.address2Input = '#address2';
        this.countrySelect = '#country';
        this.stateInput = '#state';
        this.cityInput = '#city';
        this.zipcodeInput = '#zipcode';
        this.mobileNumberInput = '#mobile_number';
        this.createAccountButton = '[data-qa="create-account"]';
        this.accountCreatedText = 'h2.title';
        this.continueButton = '[data-qa="continue-button"]';
        this.accountCreationForm = '.login-form';
    }

    async navigateToSignup() {
        await this.navigateTo('https://www.automationexercise.com/login');
    }

    async fillSignupForm(name, email) {
        await this.waitForElement(this.signupNameInput);
        await this.fill(this.signupNameInput, name);
        await this.fill(this.signupEmailInput, email);
        await this.click(this.signupButton);
        try {
            await this.waitForNetworkIdle();
            // Wait for the registration form to appear
            await this.waitForElement(this.accountCreationForm);
        } catch (error) {
            console.log('Network idle timeout after signup, proceeding with test...');
        }
    }

    async fillAccountDetails(userDetails) {
        await this.waitForElement(this.genderRadio);
        await this.click(this.genderRadio);
        await this.fill(this.passwordInput, userDetails.password);
        await this.page.selectOption(this.daysSelect, userDetails.day);
        await this.page.selectOption(this.monthsSelect, userDetails.month);
        await this.page.selectOption(this.yearsSelect, userDetails.year);
        await this.click(this.newsletterCheckbox);
        await this.click(this.specialOffersCheckbox);
        await this.fill(this.firstNameInput, userDetails.firstName);
        await this.fill(this.lastNameInput, userDetails.lastName);
        await this.fill(this.companyInput, userDetails.company);
        await this.fill(this.address1Input, userDetails.address1);
        await this.fill(this.address2Input, userDetails.address2);
        await this.page.selectOption(this.countrySelect, userDetails.country);
        await this.fill(this.stateInput, userDetails.state);
        await this.fill(this.cityInput, userDetails.city);
        await this.fill(this.zipcodeInput, userDetails.zipcode);
        await this.fill(this.mobileNumberInput, userDetails.mobileNumber);
        await this.click(this.createAccountButton);
        try {
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Network idle timeout after account creation, proceeding with test...');
        }
    }

    async verifyAccountCreated() {
        try {
            // Wait for network idle with a longer timeout
            await this.waitForNetworkIdle();
            
            // Wait for the success message with explicit timeout
            await this.page.waitForSelector(this.accountCreatedText, {
                timeout: this.networkTimeout,
                state: 'visible'
            });

            // Get the text content and check for success message
            const text = await this.getText(this.accountCreatedText);
            console.log('Account creation text:', text); // Debug log
            
            // Check for various possible success messages
            const successMessages = [
                'ACCOUNT CREATED!',
                'ACCOUNT CREATED',
                'Account Created!',
                'Account Created'
            ];
            
            return successMessages.some(msg => text?.includes(msg)) || false;
        } catch (error) {
            console.error('Error verifying account creation:', error);
            // Take a screenshot for debugging
            try {
                await this.page.screenshot({ path: 'account-creation-error.png' });
                console.log('Screenshot saved as account-creation-error.png');
            } catch (screenshotError) {
                console.error('Failed to take error screenshot:', screenshotError);
            }
            return false;
        }
    }

    async continueShopping() {
        try {
            await this.waitForElement(this.continueButton);
            await this.click(this.continueButton);
            await this.waitForNetworkIdle();
        } catch (error) {
            console.log('Error during continue shopping, attempting to proceed:', error);
            // Try to click the button even if network idle fails
            try {
                await this.click(this.continueButton);
            } catch (clickError) {
                console.error('Failed to click continue button:', clickError);
            }
        }
    }
}

module.exports = { RegistrationPage }; 