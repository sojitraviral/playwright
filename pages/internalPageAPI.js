import { expect, request } from '@playwright/test';

export default class InternalPageAPI {

    constructor() {
        this.token;
        this.headers;
    }

    async login() {
        const url = 'https://rahulshettyacademy.com/api/ecom/auth/login';
        const data = {
            userEmail: 'viral@gmail.com',
            userPassword: 'Viral123',
        };
        const req = await request.newContext();
        const response = await req.post(url, { data });
        const { token } = await response.json();
        this.token = token;
        this.headers = {
            'Authorization': token,
        };
        return token;
    }

    async addToCart(data) {

        const url = 'https://rahulshettyacademy.com/api/ecom/user/add-to-cart';
        const req = await request.newContext();

        const response = await req.post(url, { data, headers: this.headers });
        expect(response.status()).toBe(200);
        const body = await response.json()
        expect(body.message).toBe("Product Added To Cart");

    }

    async cartCount() {
        const cartCountUrl = 'https://rahulshettyacademy.com/api/ecom/user/get-cart-count/646a8fc4568c3e9fb1725b37';

        const req = await request.newContext();
        const response = await req.get(cartCountUrl, { headers: this.headers });
        expect(response.status()).toBe(200);
        const body1 = await response.json()
        console.log("body1", body1);
    }

    async itemDelete() {
        const url = 'https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/646a8fc4568c3e9fb1725b37/6262e95ae26b7e1a10e89bf0';

        const req = await request.newContext();
        const response = await req.delete(url, { headers: this.headers });
        console.log("res", response);
        expect(response.status()).toBe(200);
        const body1 = await response.json()
        expect(body1.message).toBe("Product Removed from cart");

        console.log("body1", body1);
    }
}