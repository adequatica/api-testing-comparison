# API Testing Comparison: Cypress vs. Playwright vs. Jest

There is an implementation of a bunch of the same tests for each framework: [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/), and [Jest](https://jestjs.io/) as a test runner + [Axios](https://axios-http.com/) as HTTP library.

Example API for testing: [OpenWeatherMap API](https://openweathermap.org/api), which requires a key for authorization (`API_KEY` env variable).

## How to Use

1. Clone repository
2. Install dependencies: `npm install`
3. Install Cypress as [per the documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#Installing)
4. Run all tests: `API_KEY={string} npm run test`

---

Read more in the article «[API Testing Comparison: Cypress vs. Playwright vs. Jest](https://adequatica.github.io/2023/07/02/api-testing-comparison-cypress-playwright-jest.html)».

Methods of gathering results for the article:

- `time API_KEY={string} npm run cypress:run`
- `time API_KEY={string} npm run test:playwright`
- `time API_KEY={string} npm run test:jest`

Resulting average results:

- Cypress:run command time: 12,96 sec
- Playwright command time: 3,21 sec
- Jest command time: 3,84 sec

This means that Сypress is 4 times slower than Playwright.
