// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
    navigationTimeout: 30000
  },
  projects: [{
    name: 'chromium',
    use: {
      browserName: 'chromium'
    }
  }]
}); 