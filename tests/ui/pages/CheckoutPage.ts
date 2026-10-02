import type { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) { }

  deliveryAddress() {
    return this.page.locator('#address_delivery');
  }

  billingAddress() {
    return this.page.locator('#address_invoice');
  }

  async fillComment(comment: string) {
    await this.page.locator('textarea[name="message"]').fill(comment);
  }

  async clickPlaceOrder() {
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }
}