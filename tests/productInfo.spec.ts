import { test, expect } from '../src/fixtures/pageFixtures.js';

test.beforeEach(async ({loginPage})=>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});   


test("Verify Product Images Count", async ({homePage, searchResultsPage, productInfoPage})=>
{

    await homePage.doSearch("Macbook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    let imagesCount = await productInfoPage.getProductImagesCount();
    expect(imagesCount).toBeGreaterThan(0);

});

test("Verify Product Information", async ({homePage, searchResultsPage, productInfoPage})=>
{

    await homePage.doSearch("Macbook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    let productInfor = await productInfoPage.getProductCompleteInfo();
    console.log(productInfor);

    expect.soft(productInfor.get("Brand")).toBe("Apple");
    expect.soft(productInfor.get("Product Code")).toBe("Product 18");
    expect.soft(productInfor.get("Reward Points")).toBe("800");
    expect.soft(productInfor.get("Availability")).toBe("In Stock");
    expect.soft(productInfor.get("Product Price")).toBe("$2,000.00");

});

test("Check If Logo is Visible on Product Info Page", async ({productInfoPage})=>
{
    let isLogoVisible = await productInfoPage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
});

test("Check Count of Footers on the Product Page", async ({productInfoPage})=>
{
    let footersCount = await productInfoPage.getPageFootersCount();
    expect(footersCount).toBe(15);
});