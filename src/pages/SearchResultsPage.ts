import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SearchResultsPage extends BasePage
{

    private readonly resultHeader:Locator   // This is the locator for the search results page header name
    private readonly searchResults: Locator


    constructor(page: Page)
    {   
        super(page);
        this.resultHeader = page.locator("h1"); 
        this.searchResults = page.locator("div.product-thumb");

    }    

    async getSearchResultsPageHeader() : Promise<string>
    {
        return await this.resultHeader.innerText();
    }

    async getSearchResultsCount() : Promise<number>
    {
        return await this.searchResults.count();
    }

    /**
     * In this method only we need to create the dynamic locator for the product name and click on it. 
     * We can't store this locator at class level otherwise product name will be hard coded.
     * @param productName
     */
    async selectAndClickOnProduct(productName:string) : Promise<void>
    {
        let productLocator:Locator = this.page.locator(`//a[text()='${productName}']`);
        console.log(`Clicking on the Product : ${productName}`);
        await productLocator.click();
    }

}