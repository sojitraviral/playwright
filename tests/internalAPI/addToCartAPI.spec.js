const { test, expect } = require('@playwright/test');
import CartPageAPI from '../../pages/internalPageClass/cartPageAPI';
import DashboardPageAPI from '../../pages/internalPageClass/dashboardAPI';
import LoginPageAPI from '../../pages/internalPageClass/loginPageAPI';

const Itemdata = {
    "_id": "646a8fc4568c3e9fb1725b37",
    "product": {
        "_id": "6262e95ae26b7e1a10e89bf0",
        "productName": "zara coat 3",
        "productCategory": "fashion",
        "productSubCategory": "shirts",
        "productPrice": 31500,
        "productDescription": "zara coat 3",
        "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
        "productRating": "0",
        "productTotalOrders": "0",
        "productStatus": true,
        "productFor": "women",
        "productAddedBy": "admin@gmail.com",
        "__v": 0
    }
};
test('api sign in temp', async () => {

    const loginPage = new LoginPageAPI();
    await loginPage.login();
    await loginPage.addToCart(Itemdata)

});