import type { Page } from '@playwright/test';

export class AccountDeletedPage {
  constructor(private readonly page: Page) { }

  get heading() {
    return this.page.getByRole('heading', { name: 'ACCOUNT DELETED!' });
  }

  async clickContinue() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
