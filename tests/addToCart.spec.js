const { test, expect } = require('@playwright/test');
const { LoginPage, DashboardPage, CartPage } = require('../pages');

test('api sign in', async ({ context }) => {
  const lp = new LoginPage();
  const page = await lp.login(context);
  const ac = new DashboardPage(page);
  const cp = new CartPage(page);

  await page.goto('https://rahulshettyacademy.com/client/')

  await ac.addToCart(['zara coat 3', 'adidas original']);

  await expect(ac.getButton('cart').locator('label')).toHaveText('2');
  await ac.getButton('cart').click();

  // await cp.validateItemDetails({ item1: ["https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg","#6262e95ae26b7e1a10e89bf0", "zara coat 3", "MRP $ 31500", "In Stock"], item2:["https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg","#6262e990e26b7e1a10e89bfa", "adidas original", " MRP $ 31500", " In Stock"] })

  await cp.validateItemDetails({ item1: ["#6262e95ae26b7e1a10e89bf0", "zara coat 3", "MRP $ 31500", "In Stock", "Buy Now", "btn btn-danger"], item2: ["#6262e990e26b7e1a10e89bfa", "adidas original", " MRP $ 31500", " In Stock", "Buy Now", "btn btn-danger"] })

  await cp.validateButtonName("Continue Shopping", "Checkout");


  await cp.deleteAllItem();

});

test.only('api sign in temp', async ({ request }) => {
  
  const url = 'https://rahulshettyacademy.com/api/ecom/auth/login';
  const data = {
      userEmail: 'viral@gmail.com',
      userPassword: 'Viral123',
  };
  
  const response = await request.post(url, { data });
  const {token}  = await response.json();

  console.log(token);
  
  const data1 = {"_id":"646a8fc4568c3e9fb1725b37","product":{"_id":"6262e95ae26b7e1a10e89bf0","productName":"zara coat 3","productCategory":"fashion","productSubCategory":"shirts","productPrice":31500,"productDescription":"zara coat 3","productImage":"https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg","productRating":"0","productTotalOrders":"0","productStatus":true,"productFor":"women","productAddedBy":"admin@gmail.com","__v":0}}
  const response1 = await request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',{data1,headers:{Authorization:token}})

 console.log(await response1.json())

});
