import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { ICustomWorld } from './custom-world';

let browser: Browser;

BeforeAll(async function() {
  // Launch browser with more explicit options
  browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    args: ['--disable-dev-shm-usage']
  });
});

AfterAll(async function() {
  if (browser) {
    await browser.close();
  }
});

Before(async function(this: ICustomWorld) {
  try {
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      acceptDownloads: true
    });
    this.page = await this.context.newPage();
  } catch (error) {
    console.error('Failed to create browser context or page:', error);
    throw error;
  }
});

After(async function(this: ICustomWorld) {
  try {
    await this.page?.close();
    await this.context?.close();
  } catch (error) {
    console.error('Failed to close browser context or page:', error);
  }
});