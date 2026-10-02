import type { Page } from '@playwright/test';

export class OrderPlacedPage {
  constructor(private readonly page: Page) { }

  get heading() {
    return this.page.getByRole('heading', { name: 'Order Placed!' });
  }

  get confirmationMessage() {
    return this.page.getByText('Congratulations! Your order has been confirmed!');
  }

  async clickContinue() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
