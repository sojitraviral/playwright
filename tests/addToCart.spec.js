const { test, expect } = require('@playwright/test');
const { LoginPage, DashboardPage, CartPage } = require('../pages');


test('sign in', async ({ context }) => {

  const lp = new LoginPage();
  const page =await lp.login(context);

  const ac = new DashboardPage(page);
  const cp = new CartPage(page);

  await page.goto('https://rahulshettyacademy.com/client/');

  await ac.addToCart(['zara coat 3', 'adidas original']);

  await expect(ac.getButton('cart').locator('label')).toHaveText('2');
  await ac.getButton('cart').click();

  await cp.validateItemDetails({ item1: ["#6262e95ae26b7e1a10e89bf0", "zara coat 3", "MRP $ 31500", "In Stock", "Buy Now", "btn btn-danger"], item2: ["#6262e990e26b7e1a10e89bfa", "adidas original", " MRP $ 31500", " In Stock", "Buy Now", "btn btn-danger"] })

  await cp.validateButtonName("Continue Shopping", "Checkout");


  await cp.deleteAllItem();

});


