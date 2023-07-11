import BasePage from './basePage';
const { request, expect } = require('@playwright/test');

export default class DashboardPage extends BasePage {

    constructor(page) {
        super();
        this.page = page;
    }


    async addToCart(itemName = []) {
        console.log("token", window.localStorage.getItem("token"));
        const url = 'https://rahulshettyacademy.com/api/ecom/user/add-to-cart';
        for (let i = 0; i < itemName.length; i++) {
            const data = {
                "_id": "646a8fc4568c3e9fb1725b37",
                "product": {
                    "_id": "6262e95ae26b7e1a10e89bf0",
                    "productName": itemName[i],
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
                'Authorization': window.localStorage.getItem('token'),
            }

            const req = await request.newContext()
            const response = await req.post(url, { data }, headers);
            console.log(response);

            // const { token } = await response.json();
        }


        // await context.addInitScript(item => { window.localStorage.setItem('token', item) }, token);


        // return context.newPage();;
    }

    // async addToCart(itemName = []) {
    //     for (let i = 0; i < itemName.length; i++) {
    //         const item = this.page.locator('h5').getByText(itemName[i])
    //         await item.locator("../..").getByText(" Add To Cart").click();
    //         await this.validateTosterMessage(' Product Added To Cart ');
    //     }
    // }


}