import {test as baseTest} from '@playwright/test'; // impoerting the test object from playwright and renaming it to baseTest so that I can extend it with my page fixtures
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductInfoPage } from '../pages/ProductInfoPage.js';


// defining types for page fixtures 
type pageFixtures = { 

    loginPage:LoginPage;
    homePage:HomePage;
    searchResultsPage:SearchResultsPage;
    productInfoPage:ProductInfoPage;
}

/**
 * Here I am extending the baseTest and overriding the test object that playwright gives to me with my page fixtures :
 * In this we are creating two async functions and giving them the function expression.
 * Why I am exporting this test object is because I want to use it in my test files and I want to use the page fixtures that I have defined here in my test files.
 */
export let test=baseTest.extend<pageFixtures>({

    loginPage: async ({ page }, use) => {   // Here I am defining the loginPage fixture by creating an async arrow function and then using the page object that playwright gives to me.
        let loginPage = new LoginPage(page);
        await use(loginPage);               // This use callback function is provided by playwright and from here I am passing the loginPage instance to the test function so that I can use it in my tests
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

     productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    }   
});

export { expect } from '@playwright/test'; // exporting the expect object from playwright so that I can use it in my test files
