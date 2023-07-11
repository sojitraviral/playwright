const { expect } = require('@playwright/test');

export default class BasePage {

    constructor(page) {
        this.page = page;
    }

    async validateTosterMessage(message) {
        const toster = this.page.locator('#toast-container');
        await expect(toster).toHaveText(message);
        await expect(toster).not.toBeVisible()
    }

    getButton(btnName = '') {
        if (btnName == 'sign out') return this.page.getByText(' Sign Out ')
        return this.page.locator(`[routerlink='/dashboard/${btnName}']`)
    }
}