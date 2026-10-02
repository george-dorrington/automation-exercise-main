import type { Locator, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) { }

  get title() {
    return this.page.getByRole('heading', { name: 'AutomationExercise' });
  }

  get subtitle() {
    return this.page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' });
  }

  loggedInAs(name: string) {
    return this.page.getByText(`Logged in as ${name}`);
  }
  
  async clickProduct(productId: string) {
    const product = this.getProduct(productId);

    await product.hover();
    await product.locator(`.product-overlay [data-product-id="${productId}"]`).click();
  }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async clickCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }

  async clickSignupLogin() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async clickDeleteAccount() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }

  private getProduct(productId: string): Locator {
    const productCards = this.page.locator('.features_items .single-products');
    const productLink = this.page.locator(`[data-product-id="${productId}"]`);

    return productCards.filter({ has: productLink });
  }
}