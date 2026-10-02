import type { Page } from '@playwright/test';

export class ViewCartPage {
  constructor(private readonly page: Page) { }

  get heading() {
    return this.page.getByText('Shopping Cart', { exact: true });
  }

  get cart() {
  return this.page.locator('#cart_info_table tbody tr').filter({ has: this.page.locator('td') });
  }

  async clickRegisterLogin() {
    await this.page.getByRole('link', { name: 'Register / Login' }).click();
  }

  async clickProceedToCheckout() {
    await this.page.getByText('Proceed To Checkout', { exact: true }).click();
  }
}