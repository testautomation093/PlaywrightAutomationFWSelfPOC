import { Locator, Page } from "@playwright/test";

export class BasePage
{

    protected readonly page:Page; // we are making it protected so that the child classes can access it. If we make it private then the child classes will not be able to access it.
   
    //common locators across all pages:
    protected readonly logo: Locator;
    protected readonly searchBar: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.logo = page.getByAltText('NLTECH Trainings Hub');
        this.searchBar = page.getByPlaceholder('Search');
        this.searchIcon = page.locator("button[type='submit']");
        this.currency = page.locator('#form-currency');
        this.footerLinks = page.locator('footer a');
        this.cartButton = page.locator('div#cart button');
    }

    //common locators/functionalities/actions
    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBar.isVisible();
    }

    async isCurrencyBoxVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    }

    async isCartButtonVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    }

    async getPageFootersCount(): Promise<number> {
        return await this.footerLinks.count();
    }

    async getPageFooters(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    //page level generic methods:
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }


}