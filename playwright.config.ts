import { defineConfig, devices, ReporterDescription } from "@playwright/test";

const reportType: ReporterDescription = process.env.CI && !process.env.REPORTER_HTML
    ? ["blob"]
    : ["html", { outputFolder: "./html-report" }];

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "my-allure-results",
        suiteTitle: false,
      },
    ],
    ['list'],
    reportType,
  ],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:4200',

    testIdAttribute: 'data-test-id',
    /*Collects a video of the process when a test fail*/
    video:'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    locale:'es-MX',
    actionTimeout: 60 * 1000,
    navigationTimeout: 300 * 1000,
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
//   webServer: {
//     command: 'npm run start',
//     url: 'http://127.0.0.1:3000',
//     reuseExistingServer: !process.env.CI,
//   },
});