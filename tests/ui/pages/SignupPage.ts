import type { Page } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) { }

  async fillAccountDetails(details: AccountDetails) {
    await this.page.locator(`input[name="title"][value="${details.title}"]`).check();
    await this.page.getByTestId('name').fill(details.name);
    await this.page.getByTestId('password').fill(details.password);
    await this.page.getByTestId('first_name').fill(details.firstName);
    await this.page.getByTestId('last_name').fill(details.lastName);
    await this.page.getByTestId('address').fill(details.address);
    await this.page.getByTestId('country').selectOption(details.country);
    await this.page.getByTestId('state').fill(details.state);
    await this.page.getByTestId('city').fill(details.city);
    await this.page.getByTestId('zipcode').fill(details.zipcode);
    await this.page.getByTestId('mobile_number').fill(details.mobileNumber);
  }

  async clickCreateAccount() {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
}

export type AccountDetails = {
  title: 'Mr' | 'Mrs';
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};
