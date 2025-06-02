# E2E Test Automation with Playwright

This project contains end-to-end tests for automationexercise.com using Playwright.

## Test Scenarios

The test suite covers the following E2E flow:
1. User Registration
2. Product Selection
3. Shopping Cart
4. Checkout Process
5. Order Confirmation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in headless mode:
```bash
npm run test
```

View HTML report:
```bash
npm run report
```

## Project Structure

- `tests/` - Test files
- `.github/workflows/` - GitHub Actions workflow
- `playwright.config.js` - Playwright configuration
- `package.json` - Project dependencies and scripts