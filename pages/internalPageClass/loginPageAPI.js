import BasePage from '../basePage';

import { expect, request } from '@playwright/test';

export default class LoginPageAPI {

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
        
        const response = await req.post(url, { data, headers:this.headers });
        expect(response.status()).toBe(200);
        const body = await response.json()
        expect(body.message).toBe("Product Added To Cart");

        console.log("bosy",body);
    }

}