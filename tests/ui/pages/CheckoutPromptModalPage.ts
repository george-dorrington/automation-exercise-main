import type { Page } from '@playwright/test';

export class CheckoutPromptModalPage {
  constructor(private readonly page: Page) { }

  async clickRegisterLogin() {
    await this.page.getByRole('link', { name: 'Register / Login' }).click();
  }
}
