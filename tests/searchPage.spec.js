import { LoginPage } from '../pages';
const { test, expect } = require('@playwright/test');

test("search filter", async ({ page }) => {

    const lp = new LoginPage(page);

    await page.goto('https://rahulshettyacademy.com/client/');

    await lp.login();
    await page.locator('#sidebar').locator('[name="search"]').type("zara");
    await page.keyboard.press('Enter');

    // const response = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.request().postData().includes('zara'));
    // const body =await response.json();

    const response = await page.waitForResponse(resp => resp.url().includes('/product/get-all-products') && resp.status()==200);
     const body =await response.json();
    await page.waitForLoadState();

    const searchItem =await page.locator('.card-body > h5').count();
    for (let i = 0; i < searchItem; i++) {
        await expect(page.locator('.card-body > h5').nth(i)).toHaveCount(body.count);
    }
    
})

// test("filter", async ({ page }) => {

//     const lp = new LoginPage(page);

//     await page.goto('https://rahulshettyacademy.com/client/');

//     await lp.login();
//     await page.pause();

//     // await page.locator('#sidebar >form > div > input').type("zara");
//     // await page.keyboard.press('Enter');

//     await page.locator("#sidebar").locator('[name="minPrice"]').type("31500");
//     await page.locator("#sidebar").locator('[name="maxPrice"]').type("31600");
//     await page.keyboard.press('Enter');
    
//     await page.pause();

// })