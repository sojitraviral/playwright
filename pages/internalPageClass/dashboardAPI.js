import BasePage from '../basePage';
import LoginPageAPI from './loginPageAPI';
const { request, expect } = require('@playwright/test');

export default class DashboardPageAPI extends BasePage {

    constructor(page) {
        super();
        this.page = page;
    }

    async addToCart() {
        const lp = new LoginPageAPI();
        const token = await lp.loginMethod();

        const url = 'https://rahulshettyacademy.com/api/ecom/user/add-to-cart';
        const data = {
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
        const headers = {
            'Authorization': token,
        }
        const req = await request.newContext();
        const response = await req.post(url, { data, headers });
        await expect(response.status()).toBe(200);
        const body = await response.json()
        expect(body.message).toBe("Product Added To Cart");

        console.log("bosy",body);
    }

}