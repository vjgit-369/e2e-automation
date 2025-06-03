class BasePage {
    constructor(page) {
        this.page = page;
        this.networkTimeout = 60000; // 60 seconds timeout for network operations
        this.elementTimeout = 30000; // 30 seconds timeout for element operations
    }

    async navigateTo(url) {
        await this.page.goto(url, { timeout: this.networkTimeout });
        await this.page.waitForLoadState('networkidle', { timeout: this.networkTimeout });
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { timeout: this.elementTimeout });
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle', { timeout: this.networkTimeout });
    }

    async click(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    async fill(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    async getText(selector) {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }

    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }
}

module.exports = { BasePage }; 