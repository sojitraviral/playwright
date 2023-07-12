import BasePage from './basePage';
import LoginPage from './loginPage';
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
            await this.validateTosterMessage(' Product Added To Cart ');
        }
    }


}