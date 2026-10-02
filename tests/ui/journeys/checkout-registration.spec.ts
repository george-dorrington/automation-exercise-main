import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { AccountDeletedPage } from '../pages/AccountDeletedPage';
import { CheckoutPage } from '../pages/CheckoutPage';
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
    const checkoutPage = new CheckoutPage(page);
    const viewCartPage = new ViewCartPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const paymentPage = new PaymentPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);
    const accountDeletedPage = new AccountDeletedPage(page);

    const { email, account, card } = createCheckoutTestData();

    await homePage.clickProduct('1');
    await homePage.clickContinueShopping();
    await homePage.clickProduct('2');
    await homePage.clickContinueShopping();
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.cart).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();
    await viewCartPage.clickRegisterLogin();

    await loginPage.startSignup(account.name, email);

    await signupPage.fillAccountDetails(account);
    await signupPage.clickCreateAccount();

    await expect(accountCreatedPage.heading).toBeVisible();
    await accountCreatedPage.clickContinue();

    await expect(homePage.loggedInAs(account.name)).toBeVisible();
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.cart).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();
    await expectCheckoutAddresses(checkoutPage, account);

    await checkoutPage.fillComment('Please leave the package at the front door.');
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
    
    await homePage.clickProduct('1');
    await homePage.clickContinueShopping();
    await homePage.clickProduct('2');
    await homePage.clickContinueShopping();
    await homePage.clickCart();

    await expect(viewCartPage.heading).toBeVisible();
    await expect(viewCartPage.cart).toHaveCount(2);
    await viewCartPage.clickProceedToCheckout();

    await expectCheckoutAddresses(checkoutPage, account);
    await checkoutPage.fillComment('Please leave the package at the front door.');
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

async function expectCheckoutAddresses(checkoutPage: CheckoutPage, accountDetails: AccountDetails) {
  for (const addressSection of [checkoutPage.deliveryAddress(), checkoutPage.billingAddress()]) {
    await expect(addressSection).toContainText(accountDetails.firstName);
    await expect(addressSection).toContainText(accountDetails.lastName);
    await expect(addressSection).toContainText(accountDetails.address);
    await expect(addressSection).toContainText(accountDetails.city);
    await expect(addressSection).toContainText(accountDetails.state);
    await expect(addressSection).toContainText(accountDetails.zipcode);
    await expect(addressSection).toContainText(accountDetails.country);
    await expect(addressSection).toContainText(accountDetails.mobileNumber);
  }
}

async function expectOrderConfirmed(orderPlacedPage: OrderPlacedPage) {
  await expect(orderPlacedPage.heading).toBeVisible();
  await expect(orderPlacedPage.confirmationMessage).toBeVisible();
}