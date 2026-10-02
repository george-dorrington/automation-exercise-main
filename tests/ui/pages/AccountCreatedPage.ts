import type { Page } from '@playwright/test';

export class AccountCreatedPage {
    constructor(private readonly page: Page) { }
    
    get heading() {
        return this.page.getByRole('heading', { name: 'Account Created!' });
    }

    async clickContinue() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
}