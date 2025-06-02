import { test, expect } from '@playwright/test';

test.describe('E2E Shopping Journey', () => {
  test('Complete shopping flow', async ({ page }) => {
    // User Registration
    await test.step('Register new user', async () => {
      await page.goto('https://www.automationexercise.com/login');
      await page.waitForLoadState('networkidle');
      
      // Fill signup form
      await page.fill("input[data-qa='signup-name']", 'Test User');
      await page.fill("input[data-qa='signup-email']", `test${Date.now()}@example.com`);
      await page.click("button[data-qa='signup-button']");
      
      // Wait for registration form and verify
      await page.waitForSelector('.login-form', { timeout: 30000 });
      
      // Fill registration form
      await page.check('#id_gender1, [name="title"][value="Mr"]');
      await page.fill('#password, [name="password"]', 'Test@123');
      
      // Select date of birth
      await page.selectOption('#days, [name="days"]', '1');
      await page.selectOption('#months, [name="months"]', '1');
      await page.selectOption('#years, [name="years"]', '2000');
      
      // Fill address information
      await page.fill('#first_name, [name="first_name"]', 'Test');
      await page.fill('#last_name, [name="last_name"]', 'User');
      await page.fill('#address1, [name="address1"]', '123 Test St');
      await page.selectOption('#country, [name="country"]', 'United States');
      await page.fill('#state, [name="state"]', 'California');
      await page.fill('#city, [name="city"]', 'Test City');
      await page.fill('#zipcode, [name="zipcode"]', '12345');
      await page.fill('#mobile_number, [name="mobile_number"]', '1234567890');
      
      // Submit the form
      await page.click('button[data-qa="create-account"], button[type="submit"]');
      
      // Wait for account creation confirmation
      await page.waitForSelector('h2.title:has-text("Account Created")', { timeout: 30000 });
      
      // Continue to homepage
      await page.click('[data-qa="continue-button"]');
      await page.waitForLoadState('networkidle');
    });

    // Product Search and Cart
    await test.step('Search and add product to cart', async () => {
      // Navigate to products page
      await page.click("a[href='/products']");
      await page.waitForURL('**/products');
      await page.waitForSelector('.features_items', { timeout: 30000 });
      
      // Get first product card and add to cart
      const firstProduct = page.locator('.features_items .product-image-wrapper').first();
      await firstProduct.waitFor({ state: 'visible' });
      await firstProduct.hover();
      await page.click('.add-to-cart, .productinfo a.btn');
      
      // Wait for modal and view cart
      await page.waitForSelector('.modal-content', { timeout: 30000 });
      await page.click('p.text-center a[href="/view_cart"]');
      await page.waitForLoadState('networkidle');
    });

    // Cart and Checkout
    await test.step('Complete checkout process', async () => {
      // Verify cart page and proceed to checkout
      await page.waitForSelector('#cart_info', { timeout: 30000 });
      await page.click('.btn.btn-default.check_out');
      
      // Handle login modal if it appears
      if (await page.isVisible('.modal-body p a')) {
        await page.click('.modal-body p a');
      }
      
      // Complete checkout process
      await page.waitForSelector('#cart_items', { timeout: 30000 });
      await page.click('.btn.btn-default.check_out');
      
      // Fill payment details
      await page.fill("input[name='name_on_card']", 'Test User');
      await page.fill("input[name='card_number']", '4111111111111111');
      await page.fill("input[name='cvc']", '123');
      await page.fill("input[name='expiry_month']", '12');
      await page.fill("input[name='expiry_year']", '2025');
      
      // Confirm order
      await page.click('#submit');
      
      // Wait for order confirmation message
      await page.waitForSelector('.title.text-center', { timeout: 30000 });
      const confirmationText = await page.textContent('.title.text-center');
      
      // Take a screenshot of the order confirmation
      await page.screenshot({ path: 'order-confirmation.png' });
      
      // Verify the exact confirmation message
      expect(confirmationText?.trim()).toContain('Order Placed!');
      
      // Wait for 5 seconds to see the confirmation message clearly
      await page.waitForTimeout(5000);
      
      // End test here - don't proceed further
      test.skip();
    });
  });
});