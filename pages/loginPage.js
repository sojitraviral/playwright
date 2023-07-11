import BasePage from './basePage';

import { request } from '@playwright/test';

export default class LoginPage extends BasePage {

    constructor() {
        super();
        // this.context = context;
    }

    async login(context) {
        const url = 'https://rahulshettyacademy.com/api/ecom/auth/login';
        const data = {
            userEmail: 'viral@gmail.com',
            userPassword: 'Viral123',
        };
        const req = await request.newContext()
        const response = await req.post(url, { data });
        const {token}  = await response.json();
       
       await context.addInitScript(item => {window.localStorage.setItem('token',item)},token);
       
       
       return context.newPage();
    }
}