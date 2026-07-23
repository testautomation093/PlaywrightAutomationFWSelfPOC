import { test, expect } from '../src/fixtures/pageFixtures.js';

test.beforeEach(async ({loginPage})=>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
}); 

test("Verify Search Functionality Header Test", async ({homePage, searchResultsPage})=>
{
    await homePage.doSearch("macbook");  // This search will land me to the Search Results Page. So, I need to destructure the SearchResultsPage object from the fixtures.
    let searchResultsHeader = await searchResultsPage.getSearchResultsPageHeader();
    expect(searchResultsHeader).toContain("Search - macbook");
});

test ("Verify Search Functionality Results Count Test", async ({homePage, searchResultsPage})=>
{
    await homePage.doSearch("macbook");
    let searchResultsCount = await searchResultsPage.getSearchResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);
});

/**
 * Here I am using the page destructured object that playwright test runner gives to me in the test function.
 */
test ("Verify Click Product Is Landing onto Product Page", async ({homePage, searchResultsPage, page})=>
{
    await homePage.doSearch("macbook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    await expect(page).toHaveTitle("MacBook Pro");
});
