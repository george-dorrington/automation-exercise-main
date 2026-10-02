import type { Page } from '@playwright/test';

export class ViewCartPage {
  constructor(private readonly page: Page) { }

  get heading() {
    return this.page.getByText('Shopping Cart', { exact: true });
  }

  get items() {
    const cartTable = this.page.getByRole('table');
    return cartTable.getByRole('row').filter({
      has: this.page.getByRole('img'),
    });
  }

  async clickProceedToCheckout() {
    await this.page.getByText('Proceed To Checkout', { exact: true }).click();
  }
}