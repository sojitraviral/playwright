import BasePage from './basePage';
const { request, expect } = require('@playwright/test');

export default class DashboardPage extends BasePage {

    constructor(page) {
        super();
        this.page = page;
    }

    async addToCart(itemName = []) {

        for (let i = 0; i < itemName.length; i++) {
            const item = this.page.locator('h5').getByText(itemName[i])
            await item.locator("../..").getByText(" Add To Cart").click();
            // await this.validateTosterMessage(' Product Added To Cart ');
        }
    }

    async validateCategoryBaseFilter(filterName = "") {
        const categories = this.page.locator('#sidebar').getByText(filterName);
        return await categories.locator("..").locator('input').check();
    }

    async globalSearch(searchName = "") {
        // valid search filter
        const text = [];
        await this.page.locator('#sidebar').locator('[name="search"]').type(searchName);
        await this.page.keyboard.press('Enter');

        const response = await this.page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() === 200);

        const searchItem = await this.page.locator('.card-body > h5').count();
        for (let i = 0; i < searchItem; i++) {
            await expect(this.page.locator('.card-body > h5').nth(i)).toContainText(searchName);
            text.push(await this.page.locator('.card-body > h5').nth(i).textContent());
        }

        return text;

    }
}