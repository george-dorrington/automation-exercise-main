import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddToCartModalPage } from '../pages/AddToCartModalPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { AccountDeletedPage } from '../pages/AccountDeletedPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutPromptModalPage } from '../pages/CheckoutPromptModalPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OrderPlacedPage } from '../pages/OrderPlacedPage';
import { PaymentPage, type CardDetails } from '../pages/PaymentPage';
import { SignupPage, type AccountDetails } from '../pages/SignupPage';
import { ViewCartPage } from '../pages/ViewCartPage';

test.describe('Checkout registration', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');

    await expect(page).toHaveURL('/');
    await expect(homePage.title).toBeVisible();
    await expect(homePage.subtitle).toBeVisible();
  });

  test('scenario 14 - register a new user whilst completing a checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const addToCartModalPage = new AddToCartModalPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutPromptModalPage = new CheckoutPromptModalPage(page);
    const viewCartPage = new ViewCartPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const paymentPage = new PaymentPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);
    const accountDeletedPage = new AccountDeletedPage(page);

    const { email, account, card } = createCheckoutTestData();

    await homePage.addProductToCart('1');
    await addToCartModalPage.clickContinueShopping();
    await homePage.addProductToCart('2');
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.items).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();
    await checkoutPromptModalPage.clickRegisterLogin();

    await loginPage.startSignup(account.name, email);

    await signupPage.fillAccountDetails(account);
    await signupPage.clickCreateAccount();

    await expect(accountCreatedPage.heading).toBeVisible();
    await accountCreatedPage.clickContinue();

    await expect(homePage.loggedInAs(account.name)).toBeVisible();
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.items).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();
    await expectCheckoutAddresses(checkoutPage, account);

    await checkoutPage.addComment('Please leave the package at the front door.');
    await checkoutPage.clickPlaceOrder();
    await expect(paymentPage.heading).toBeVisible();

    await paymentPage.fillOutCardDetails(card);
    await paymentPage.clickPayAndConfirmOrder();
    await expectOrderConfirmed(orderPlacedPage);

    await orderPlacedPage.clickContinue();
    await homePage.clickDeleteAccount();

    await expect(accountDeletedPage.heading).toBeVisible();
    await accountDeletedPage.clickContinue();
  });

  test('scenario 15 - register a new user before completing a checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const addToCartModalPage = new AddToCartModalPage(page);
    const checkoutPage = new CheckoutPage(page);
    const viewCartPage = new ViewCartPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const paymentPage = new PaymentPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);
    const accountDeletedPage = new AccountDeletedPage(page);

    const { email, account, card } = createCheckoutTestData();

    await homePage.clickSignupLogin();
    await loginPage.startSignup(account.name, email);
    await signupPage.fillAccountDetails(account);
    await signupPage.clickCreateAccount();

    await expect(accountCreatedPage.heading).toBeVisible();
    await accountCreatedPage.clickContinue();
    await expect(homePage.loggedInAs(account.name)).toBeVisible();
    
    await homePage.addProductToCart('1');
    await addToCartModalPage.clickContinueShopping();
    await homePage.addProductToCart('2');
    await addToCartModalPage.clickContinueShopping();
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.items).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();

    await expectCheckoutAddresses(checkoutPage, account);
    await checkoutPage.addComment('Please leave the package at the front door.');
    await checkoutPage.clickPlaceOrder();
    await expect(paymentPage.heading).toBeVisible();

    await paymentPage.fillOutCardDetails(card);
    await paymentPage.clickPayAndConfirmOrder();
    
    await expectOrderConfirmed(orderPlacedPage);

    await homePage.clickDeleteAccount();

    await expect(accountDeletedPage.heading).toBeVisible();
    await accountDeletedPage.clickContinue();
  });
});

// Support functions

function createCheckoutTestData(): {
  email: string;
  account: AccountDetails;
  card: CardDetails;
} {
  return {
    email: `${faker.string.uuid()}@example.com`,
    account: {
      title: 'Mr',
      name: faker.person.fullName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      country: 'New Zealand',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number(),
    },
    card: {
      nameOnCard: faker.person.fullName(),
      cardNumber: faker.string.numeric(16),
      cvc: faker.string.numeric(3),
      expiryMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
      expiryYear: (new Date().getFullYear() + 2).toString(),
    },
  };
}

async function expectCheckoutAddresses(checkoutPage: CheckoutPage, account: AccountDetails) {
  for (const addressSection of [checkoutPage.deliveryAddress(), checkoutPage.billingAddress()]) {
    await expect(addressSection).toContainText(account.firstName);
    await expect(addressSection).toContainText(account.lastName);
    await expect(addressSection).toContainText(account.address);
    await expect(addressSection).toContainText(account.city);
    await expect(addressSection).toContainText(account.state);
    await expect(addressSection).toContainText(account.zipcode);
    await expect(addressSection).toContainText(account.country);
    await expect(addressSection).toContainText(account.mobileNumber);
  }
}

async function expectOrderConfirmed(orderPlacedPage: OrderPlacedPage) {
  await expect(orderPlacedPage.heading).toBeVisible();
  await expect(orderPlacedPage.confirmationMessage).toBeVisible();
}
