import { test, expect } from '@playwright/test';

test.describe('Checkout registration', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Register a new user whilst completing a checkout', async ({ page }) => {
   // await page.goto('/');
  });

  test('Register a new user before completing a checkout', async ({ page }) => {
  //  await page.goto('/');
  });
});

