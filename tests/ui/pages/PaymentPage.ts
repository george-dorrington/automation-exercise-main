import type { Page } from '@playwright/test';

export type CardDetails = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export class PaymentPage {
  constructor(private readonly page: Page) { }

  get heading() {
    return this.page.getByRole('heading', { name: 'Payment' });
  }

  async fillOutCardDetails(details: CardDetails) {
    await this.fillNameOnCard(details.nameOnCard);
    await this.fillCardNumber(details.cardNumber);
    await this.fillCvc(details.cvc);
    await this.fillExpiryMonth(details.expiryMonth);
    await this.fillExpiryYear(details.expiryYear);
  }

  async fillNameOnCard(name: string) {
    await this.page.getByTestId('name-on-card').fill(name);
  }

  async fillCardNumber(cardNumber: string) {
    await this.page.getByTestId('card-number').fill(cardNumber);
  }

  async fillCvc(cvc: string) {
    await this.page.getByTestId('cvc').fill(cvc);
  }

  async fillExpiryMonth(month: string) {
    await this.page.getByTestId('expiry-month').fill(month);
  }

  async fillExpiryYear(year: string) {
    await this.page.getByTestId('expiry-year').fill(year);
  }

  async clickPayAndConfirmOrder() {
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }
}