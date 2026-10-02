import type { Page } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) { }

  async fillAccountDetails(details: AccountDetails) {
    await this.selectTitle(details.title);
    await this.fillName(details.name);
    await this.fillPassword(details.password);
    await this.fillFirstName(details.firstName);
    await this.fillLastName(details.lastName);
    await this.fillAddress(details.address);
    await this.selectCountry(details.country);
    await this.fillState(details.state);
    await this.fillCity(details.city);
    await this.fillZipcode(details.zipcode);
    await this.fillMobileNumber(details.mobileNumber);
  }

  async selectTitle(title: 'Mr' | 'Mrs') {
    await this.page.locator(`input[name="title"][value="${title}"]`).check();
  }

  async fillName(name: string) {
    await this.page.getByTestId('name').fill(name);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId('password').fill(password);
  }

  async fillFirstName(firstName: string) {
    await this.page.getByTestId('first_name').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.getByTestId('last_name').fill(lastName);
  }

  async fillAddress(address: string) {
    await this.page.getByTestId('address').fill(address);
  }

  async selectCountry(country: string) {
    await this.page.getByTestId('country').selectOption(country);
  }

  async fillState(state: string) {
    await this.page.getByTestId('state').fill(state);
  }

  async fillCity(city: string) {
    await this.page.getByTestId('city').fill(city);
  }

  async fillZipcode(zipcode: string) {
    await this.page.getByTestId('zipcode').fill(zipcode);
  }

  async fillMobileNumber(mobileNumber: string) {
    await this.page.getByTestId('mobile_number').fill(mobileNumber);
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
