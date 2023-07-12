import LoginPageAPI from "./loginPageAPI";
const { request, expect } = require('@playwright/test');

export default class CartPageAPI {
    constructor() {
    }

    async cartCount() {
        const lp = new LoginPageAPI();
        const token = await lp.loginMethod();

        const cartCountUrl = 'https://rahulshettyacademy.com/api/ecom/user/get-cart-count/646a8fc4568c3e9fb1725b37';
        const headers = {
            'Authorization': token,
        }

        const req = await request.newContext();
        const response = await req.get(cartCountUrl, { headers });
        console.log("res",response);
        await expect(response.status()).toBe(200);
        const body1 = await response.json()
        console.log("body1", body1);
    }

    async itemDelete(){
        const lp = new LoginPageAPI();
        const token = await lp.loginMethod();

        const url = 'https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/646a8fc4568c3e9fb1725b37/6262e95ae26b7e1a10e89bf0';
        const headers = {
            'Authorization': token,
        }

        const req = await request.newContext();
        const response = await req.delete(url, { headers });
        console.log("res",response);
        await expect(response.status()).toBe(200);
        const body1 = await response.json()
        expect(body1.message).toBe("Product Removed from cart");

        console.log("body1", body1);
    }

}