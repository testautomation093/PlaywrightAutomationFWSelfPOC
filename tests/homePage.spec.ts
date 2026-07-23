import { test, expect } from '../src/fixtures/pageFixtures.js';

test.beforeEach(async ({loginPage})=>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});   

test("Home Page Title Test", async ({homePage})=> 
{
    let homeTitle=await homePage.getHomePageTitle();
    expect(homeTitle).toBe("My Account");
});

test("Home Page Logout Link Test", async ({homePage})=> 
{
    let isLogoutLinkVisible = await homePage.isLogOutLinkAvailable();
    expect(isLogoutLinkVisible).toBe(true);
});

test("Home Page Headers Test", async ({homePage})=> 
{
    let headers=await homePage.getHomePageHeaders();

    expect.soft(headers).toHaveLength(3);
    expect.soft(headers).toEqual(["My Orders", "My Affiliate Account", "Newsletter"]);

});