import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) { }

  async startSignup(name: string, email: string) {
    await this.signupName(name);
    await this.signUpEmail(email);
    await this.clickSignup();
  }

  async signupName(name: string) {
    await this.page.getByTestId('signup-name').fill(name);
  }

  async signUpEmail(email: string) {
    await this.page.getByTestId('signup-email').fill(email);
  }

  async clickSignup() {
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }
}