import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage
{

    private readonly headers:Locator
    private readonly logoutLink: Locator

    constructor(page: Page)
    {
        super(page);
        this.headers = page.locator("h2");
        this.logoutLink = page.locator("(//a[text()='Logout'])[2]");
    }    

    async getHomePageTitle() : Promise<string>
    {
        console.log(`Home Page Title is : ${await this.page.title()}`);
        return await this.page.title();
    }

    async getHomePageHeaders() : Promise<string[]>
    {
        let headersList: string[] = await this.headers.allInnerTexts();
        return headersList;
    }

    async isLogOutLinkAvailable() : Promise<boolean>
    {
        return await this.logoutLink.isVisible();
    }

    async doSearch(searchText:string) : Promise<void>
    {
        console.log(`Searching for the Product : ${searchText}`);
        await this.searchBar.fill(searchText);
        await this.searchIcon.click();
    }











    
}