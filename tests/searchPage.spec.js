import { BasePage, LoginPage } from '../pages';
import { DashboardPage } from '../pages';
const { test, expect } = require('@playwright/test');

test("search filter", async ({ context }) => {

    const lp = new LoginPage();
    const page = await lp.login(context);
    const basePage = new BasePage(page);

    await page.goto('https://rahulshettyacademy.com/client/');

    // valid search filter
    await page.locator('#sidebar').locator('[name="search"]').type("zara");
    await page.keyboard.press('Enter');

    const response = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() === 200);
    // const body = await response.json();
    // await page.waitForLoadState();

    const searchItem = await page.locator('.card-body > h5').count();
    for (let i = 0; i < searchItem; i++) {
        await expect(page.locator('.card-body > h5').nth(i)).toContainText("zara");
    }

    //invalid search filter
    await page.locator('#sidebar').locator('[name="search"]').type("zaraqwe");
    await page.keyboard.press('Enter');

    const invalidResponse = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() == 200);
    const invalidbody = await invalidResponse.json();
    await basePage.validateTosterMessage("No Products Found");

    // //clear record filter
    await page.locator('#sidebar').locator('[name="search"]').dblclick();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Enter');

    const response1 = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() == 200);

    const searchItem1 = await page.locator('.card-body > h5').count();
    for (let i = 0; i < searchItem1; i++) {
        await expect(page.locator('.card-body > h5').nth(i)).toBeVisible();
    }

})

test("price filter", async ({ context }) => {

    const lp = new LoginPage();
    const page = await lp.login(context);

    await page.goto('https://rahulshettyacademy.com/client/');

    //minPrice and MaxPrice Filter
    await page.locator("#sidebar").locator('[name="minPrice"]').type("31500");
    await page.locator("#sidebar").locator('[name="maxPrice"]').type("31600");
    await page.keyboard.press('Enter');

    const response = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() === 200);
    const body = await response.json();
    console.log(body);
    // await page.waitForLoadState();

    const searchItemCount = await page.locator('.card-body').locator(".text-muted").count();

    // const searchItem = await page.locator('.card-body').locator(".text-muted").nth(1).textContent();
    // console.log("search", searchItem);

    for (let i = 0; i < searchItemCount; i++) {
        const searchItem = await page.locator('.card-body').locator(".text-muted").nth(i).textContent();
        const Price = Number(searchItem.replace('$ ', ''))
        expect(Price).toBeGreaterThanOrEqual(31500);
        expect(Price).toBeLessThanOrEqual(31600);
    }
})

test("same price filter", async ({ context }) => {

    const lp = new LoginPage();
    const page = await lp.login(context);
    const basePage = new BasePage(page);

    await page.goto('https://rahulshettyacademy.com/client/');

    //minPrice and MaxPrice Filter
    await page.locator("#sidebar").locator('[name="minPrice"]').type("31000");
    await page.locator("#sidebar").locator('[name="maxPrice"]').type("31000");
    await page.keyboard.press('Enter');

    const response = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() === 200);
    const body = await response.json();
    await page.waitForLoadState();
    console.log(body);
    await basePage.validateTosterMessage("No Products Found");

})

test.only("checkbox filter", async ({ context }) => {

    const lp = new LoginPage();
    const page = await lp.login(context);
    const ac = new DashboardPage(page);

    await page.goto('https://rahulshettyacademy.com/client/');

    await ac.validateCategoryBaseFilter("women");
    await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status() === 200);

    const searchItem1 = await page.locator('.card-body > h5').count();
    for (let i = 0; i < searchItem1; i++) {
        await expect(page.locator('.card-body > h5').nth(i)).toBeVisible();
    }
});