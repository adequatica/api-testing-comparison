# API Testing Comparison: Cypress vs. Playwright vs. Jest

There is an implementation of a bunch of the same tests for each framework: [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/), and [Jest](https://jestjs.io/) as a test runner + [Axios](https://axios-http.com/) as HTTP library.

Read more in the article [API Testing Comparison: Cypress vs. Playwright vs. Jest](https://adequatica.medium.com/2ff1f80c5a7b?source=friends_link&sk=6c03a0985b92f5ba0dbe97d8f5ff70aa).

Example API for testing: [OpenWeatherMap API](https://openweathermap.org/api), which requires a key for authorization (`API_KEY` env variable).

## How to Use

1. Clone repository
2. Install dependencies: `npm install`
2. Install Cypress as [per the documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#Installing)
4. Run all tests: `API_KEY={string} npm run test`
