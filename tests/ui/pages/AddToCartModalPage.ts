import type { Page } from '@playwright/test';

export class AddToCartModalPage {
  constructor(private readonly page: Page) { }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
}
