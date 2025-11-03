import { type Locator, type Page } from '@playwright/test';

export class SandboxPage {
    readonly pastaCheckbox: Locator;

    constructor(readonly page: Page) {
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
    }

    async checkPastaCheckbox() {
        await this.pastaCheckbox.check();
    }
}

