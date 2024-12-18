import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  fullyParallel: true,
  retries: 1,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    ["@argos-ci/playwright/reporter", { uploadToArgos: !!process.env.CI, },],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
    ['html']
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
      : process.env.STAGING === '1' ? 'http://localhost:4202'
        : 'http://localhost:4200',

    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['Galaxy S9+']
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200'
  }
});
