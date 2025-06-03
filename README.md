# E2E Automation with Playwright

This project demonstrates end-to-end testing of an e-commerce website using Playwright with JavaScript and implements the Page Object Model pattern.

## Features

- Page Object Model implementation
- End-to-end test coverage for shopping flow
- Allure reporting integration
- Automated user registration and checkout process
- Screenshot capture on test failure

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/vjgit-369/E2E_Ecom_POM.git
cd E2E_Ecom_POM
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/e2e-shopping.spec.js
```

## Generate Allure Report

1. Run tests with Allure reporter:
```bash
npx playwright test
```

2. Generate the report:
```bash
npx allure generate allure-results -o allure-report --clean
```

3. Open the report:
```bash
npx allure open allure-report
```

## Project Structure

```
├── tests/
│   ├── pageObjects/
│   │   ├── BasePage.js
│   │   ├── RegistrationPage.js
│   │   └── ShoppingPage.js
│   └── e2e-shopping.spec.js
├── playwright.config.js
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests.