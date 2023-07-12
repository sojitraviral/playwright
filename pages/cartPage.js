import BasePage from './basePage';

const { expect } = require('@playwright/test');

export default class CartPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    async validateItemDetails(itemDetails = {}) {
        const itemCount = Object.values(itemDetails).length;
        await expect(this.getButton('cart').locator('label')).toHaveText(`${itemCount}`);

        for (let i = 0; i < itemCount; i++) {
            const itemBlock = this.page.locator('.cart > ul').nth(i).filter({ has: this.page.locator('.cartSection') });

            const itemValue = Object.values(itemDetails)[i];
            // await expect(itemBlock.locator(".itemImg")).toHaveScreenshot({ path: itemValue[0], type: "jpeg" });
            await expect(itemBlock.locator("P").first()).toHaveText(itemValue[0]);
            await expect(itemBlock.locator("h3")).toHaveText(itemValue[1]);
            await expect(itemBlock.locator("P").nth(1)).toHaveText(itemValue[2]);
            await expect(itemBlock.locator(".stockStatus")).toHaveText(itemValue[3]);
            await expect(itemBlock.locator("button").first()).toHaveText(itemValue[4]);
            await expect(itemBlock.locator("button").last()).toHaveClass(itemValue[5]);
        }
    }

    async validateButtonName(buttonName = "", checkoutButton = "") {
        await expect(this.page.getByText(buttonName)).toBeVisible();
        await expect(this.page.getByText(checkoutButton)).toBeVisible();
    }

    async deleteAllItem() {
        const count = await this.page.locator('[class="btn btn-danger"]').count();
        for (let i = 0; i < count; i++) {
            await this.page.locator('[class="btn btn-danger"]').nth(i).click();
        }
        const emptyCartMsg = await this.page.locator(".wrap > div:nth-child(2)");
        await expect(emptyCartMsg.locator("h1")).toContainText("No Products in Your Cart !");
    }
}