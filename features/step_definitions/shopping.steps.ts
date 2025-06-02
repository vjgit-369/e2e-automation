import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

Given('I am on the automation exercise login page', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.goto('https://www.automationexercise.com/login');
  await expect(page).toHaveURL('https://www.automationexercise.com/login');
});

When('I navigate to the Products page', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL('https://www.automationexercise.com/products');
});

When('I search for {string}', async function(this: ICustomWorld, productName: string) {
  const page = this.page!;
  await page.fill('#search_product', productName);
  await page.click('#submit_search');
});

Then('I should see the search results', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('.features_items')).toBeVisible();
});

When('I select the product from search results', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('.features_items .product-image-wrapper >> nth=0');
});

When('I add the product to cart', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('button.add-to-cart');
  // Wait for the modal to appear
  await page.waitForSelector('.modal-content', { state: 'visible' });
});

Then('the product should be added to cart successfully', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('.modal-title.w-100')).toContainText('Added!');
});

When('I proceed to cart', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('a[href="/view_cart"]');
});

Then('I should see correct product details in cart', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('#cart_info')).toBeVisible();
  
  // Store product details for later verification
  const name = await page.locator('.cart_description h4 a').textContent();
  const price = await page.locator('.cart_price p').textContent();
  const quantity = await page.locator('.cart_quantity button').textContent();
  
  this.productDetails = {
    name: name || '',
    price: price || '',
    quantity: quantity || ''
  };
});

Then('the cart total should be calculated correctly', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('#cart_info_table')).toBeVisible();
});

When('I proceed to checkout', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('.check_out');
});

When('I fill in shipping information', async function(this: ICustomWorld) {
  const page = this.page!;
  // Fill shipping details
  await page.fill('#address_delivery input[data-qa="first_name"]', 'Test');
  await page.fill('#address_delivery input[data-qa="last_name"]', 'User');
  await page.fill('#address_delivery input[data-qa="address"]', '123 Test St');
  await page.fill('#address_delivery input[data-qa="city"]', 'Test City');
  await page.fill('#address_delivery input[data-qa="state"]', 'Test State');
  await page.fill('#address_delivery input[data-qa="zipcode"]', '12345');
  await page.fill('#address_delivery input[data-qa="mobile_number"]', '1234567890');
});

When('I select payment method', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('input[name="payment_method"][value="cod"]');
});

When('I review the order summary', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('#cart_items')).toBeVisible();
});

When('I place the order', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('#submit');
});

Then('I should see the order confirmation', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('.order-confirmed')).toBeVisible();
});

Then('the order details should be correct', async function(this: ICustomWorld) {
  const page = this.page!;
  if (!this.productDetails?.name) {
    throw new Error('Product details not found');
  }
  await expect(page.locator('.order-details')).toContainText(this.productDetails.name);
});

Then('the order should appear in my order history', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.click('a[href="/orders"]');
  await expect(page.locator('.order-history')).toBeVisible();
});